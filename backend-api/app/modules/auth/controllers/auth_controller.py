"""
Auth Controller
===============
Real, database-backed authentication and account-session logic: password
hashing/verification, short-lived JWT access tokens, opaque rotating refresh
tokens (session store + SSO + logout/revocation), password reset, email
verification, and mobile OTP verification.

Delivery of reset links / verification tokens / OTP codes is simulated —
logged server-side (`logger.info(...)`) and returned to the caller alongside
a `dev_only_*` field — since no real email/SMS provider is wired into this
project. Everything else (hashing, expiry, rotation, revocation, DB
persistence) is real. The `dev_only_*` fields must be removed before this
runs against a real mail/SMS provider in production.
"""

import logging
from datetime import datetime, timedelta, timezone
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import (
    create_access_token,
    generate_opaque_token,
    generate_otp_code,
    get_password_hash,
    hash_token,
    verify_password,
)
from app.modules.auth.models import OtpCode, RefreshToken, User, UserVerificationToken

logger = logging.getLogger("smartshop.auth")


def _user_response_dict(user: User) -> dict:
    return {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "role": user.role,
        "phone": user.phone,
        "avatar": user.avatar,
        "email_verified": user.email_verified,
        "phone_verified": user.phone_verified,
        "created_at": user.created_at,
    }


def _issue_access_token(user: User) -> tuple[str, int]:
    access_token = create_access_token(subject=user.id, role=user.role)
    return access_token, settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60


async def _create_refresh_token(
    db: AsyncSession, user: User, user_agent: Optional[str], ip: Optional[str]
) -> str:
    raw = generate_opaque_token()
    db.add(
        RefreshToken(
            user_id=user.id,
            token_hash=hash_token(raw),
            user_agent=user_agent,
            ip_address=ip,
            expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        )
    )
    await db.commit()
    return raw


async def _issue_session(
    db: AsyncSession, user: User, user_agent: Optional[str], ip: Optional[str]
) -> dict:
    access_token, expires_in = _issue_access_token(user)
    refresh_token = await _create_refresh_token(db, user, user_agent, ip)
    return {
        "access_token": access_token,
        "expires_in": expires_in,
        "refresh_token": refresh_token,
        "user": _user_response_dict(user),
    }


class AuthController:

    # ─── Registration / Login ──────────────────────────────────────────────

    @staticmethod
    async def register(db: AsyncSession, payload, user_agent: Optional[str], ip: Optional[str]) -> dict:
        existing = await db.execute(select(User).where(User.email == payload.email))
        if existing.scalar_one_or_none() is not None:
            raise ValueError("An account with this email already exists.")

        user = User(
            email=payload.email,
            password_hash=get_password_hash(payload.password),
            first_name=payload.first_name,
            last_name=payload.last_name,
            phone=payload.phone,
            role=payload.role or "CUSTOMER",
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
        return await _issue_session(db, user, user_agent, ip)

    @staticmethod
    async def login(db: AsyncSession, payload, user_agent: Optional[str], ip: Optional[str]) -> dict:
        result = await db.execute(select(User).where(User.email == payload.email))
        user = result.scalar_one_or_none()
        if user is None or not verify_password(payload.password, user.password_hash):
            raise ValueError("Invalid email or password.")
        if not user.is_active or user.is_deleted:
            raise ValueError("This account has been deactivated.")

        user.last_login_at = datetime.now(timezone.utc)
        await db.commit()
        return await _issue_session(db, user, user_agent, ip)

    # ─── Refresh / Logout / Sessions ───────────────────────────────────────

    @staticmethod
    async def refresh(
        db: AsyncSession, raw_refresh_token: str, user_agent: Optional[str], ip: Optional[str]
    ) -> dict:
        result = await db.execute(
            select(RefreshToken).where(RefreshToken.token_hash == hash_token(raw_refresh_token))
        )
        token_row = result.scalar_one_or_none()
        now = datetime.now(timezone.utc)
        if token_row is None or token_row.revoked_at is not None or token_row.expires_at < now:
            raise ValueError("Session expired. Please log in again.")

        user_result = await db.execute(select(User).where(User.id == token_row.user_id))
        user = user_result.scalar_one_or_none()
        if user is None or not user.is_active or user.is_deleted:
            raise ValueError("Session expired. Please log in again.")

        # Rotate on use: revoke the presented token, issue a fresh one. Limits
        # the blast radius of a stolen refresh token to a single use.
        token_row.revoked_at = now
        await db.commit()
        return await _issue_session(db, user, user_agent, ip)

    @staticmethod
    async def logout(db: AsyncSession, raw_refresh_token: Optional[str]) -> None:
        if not raw_refresh_token:
            return
        result = await db.execute(
            select(RefreshToken).where(RefreshToken.token_hash == hash_token(raw_refresh_token))
        )
        token_row = result.scalar_one_or_none()
        if token_row is not None and token_row.revoked_at is None:
            token_row.revoked_at = datetime.now(timezone.utc)
            await db.commit()

    @staticmethod
    async def logout_all(db: AsyncSession, user: User) -> None:
        now = datetime.now(timezone.utc)
        result = await db.execute(
            select(RefreshToken).where(RefreshToken.user_id == user.id, RefreshToken.revoked_at.is_(None))
        )
        for token_row in result.scalars().all():
            token_row.revoked_at = now
        await db.commit()

    @staticmethod
    async def list_sessions(db: AsyncSession, user: User, current_raw_token: Optional[str]) -> list[dict]:
        now = datetime.now(timezone.utc)
        result = await db.execute(
            select(RefreshToken)
            .where(RefreshToken.user_id == user.id, RefreshToken.revoked_at.is_(None), RefreshToken.expires_at > now)
            .order_by(RefreshToken.created_at.desc())
        )
        current_hash = hash_token(current_raw_token) if current_raw_token else None
        return [
            {
                "id": t.id,
                "user_agent": t.user_agent,
                "ip_address": t.ip_address,
                "created_at": t.created_at,
                "expires_at": t.expires_at,
                "is_current": t.token_hash == current_hash,
            }
            for t in result.scalars().all()
        ]

    @staticmethod
    async def revoke_session(db: AsyncSession, user: User, session_id: str) -> None:
        result = await db.execute(
            select(RefreshToken).where(RefreshToken.id == session_id, RefreshToken.user_id == user.id)
        )
        token_row = result.scalar_one_or_none()
        if token_row is None:
            raise ValueError("Session not found.")
        token_row.revoked_at = datetime.now(timezone.utc)
        await db.commit()

    # ─── Profile ────────────────────────────────────────────────────────────

    @staticmethod
    async def update_profile(db: AsyncSession, user: User, payload) -> dict:
        if payload.first_name is not None:
            user.first_name = payload.first_name
        if payload.last_name is not None:
            user.last_name = payload.last_name
        if payload.phone is not None and payload.phone != user.phone:
            user.phone = payload.phone
            user.phone_verified = False  # changing the number invalidates prior verification
        if payload.avatar is not None:
            user.avatar = payload.avatar
        await db.commit()
        await db.refresh(user)
        return _user_response_dict(user)

    # ─── Password management ───────────────────────────────────────────────

    @staticmethod
    async def change_password(db: AsyncSession, user: User, current_password: str, new_password: str) -> None:
        if not verify_password(current_password, user.password_hash):
            raise ValueError("Current password is incorrect.")
        user.password_hash = get_password_hash(new_password)
        await db.commit()
        await AuthController.logout_all(db, user)  # force re-login everywhere else

    @staticmethod
    async def forgot_password(db: AsyncSession, email: str) -> Optional[str]:
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if user is None:
            return None  # never reveal whether an email is registered

        raw = generate_opaque_token(32)
        db.add(
            UserVerificationToken(
                user_id=user.id,
                token_hash=hash_token(raw),
                purpose="PASSWORD_RESET",
                expires_at=datetime.now(timezone.utc) + timedelta(hours=settings.VERIFICATION_TOKEN_EXPIRE_HOURS),
            )
        )
        await db.commit()
        logger.info("[DEV EMAIL] Password reset token for %s: %s", email, raw)
        return raw

    @staticmethod
    async def reset_password(db: AsyncSession, raw_token: str, new_password: str) -> None:
        result = await db.execute(
            select(UserVerificationToken).where(
                UserVerificationToken.token_hash == hash_token(raw_token),
                UserVerificationToken.purpose == "PASSWORD_RESET",
            )
        )
        token_row = result.scalar_one_or_none()
        now = datetime.now(timezone.utc)
        if token_row is None or token_row.used_at is not None or token_row.expires_at < now:
            raise ValueError("This reset link is invalid or has expired.")

        user_result = await db.execute(select(User).where(User.id == token_row.user_id))
        user = user_result.scalar_one_or_none()
        if user is None:
            raise ValueError("This reset link is invalid or has expired.")

        user.password_hash = get_password_hash(new_password)
        token_row.used_at = now
        await db.commit()
        await AuthController.logout_all(db, user)

    # ─── Email verification ────────────────────────────────────────────────

    @staticmethod
    async def send_email_verification(db: AsyncSession, user: User) -> str:
        if user.email_verified:
            raise ValueError("Email is already verified.")
        raw = generate_opaque_token(32)
        db.add(
            UserVerificationToken(
                user_id=user.id,
                token_hash=hash_token(raw),
                purpose="EMAIL_VERIFY",
                expires_at=datetime.now(timezone.utc) + timedelta(hours=settings.VERIFICATION_TOKEN_EXPIRE_HOURS),
            )
        )
        await db.commit()
        logger.info("[DEV EMAIL] Email verification token for %s: %s", user.email, raw)
        return raw

    @staticmethod
    async def verify_email(db: AsyncSession, raw_token: str) -> None:
        result = await db.execute(
            select(UserVerificationToken).where(
                UserVerificationToken.token_hash == hash_token(raw_token),
                UserVerificationToken.purpose == "EMAIL_VERIFY",
            )
        )
        token_row = result.scalar_one_or_none()
        now = datetime.now(timezone.utc)
        if token_row is None or token_row.used_at is not None or token_row.expires_at < now:
            raise ValueError("This verification link is invalid or has expired.")

        user_result = await db.execute(select(User).where(User.id == token_row.user_id))
        user = user_result.scalar_one_or_none()
        if user is None:
            raise ValueError("This verification link is invalid or has expired.")

        user.email_verified = True
        token_row.used_at = now
        await db.commit()

    # ─── Mobile OTP verification ───────────────────────────────────────────

    @staticmethod
    async def send_otp(db: AsyncSession, user: User, phone: Optional[str]) -> str:
        target_phone = phone or user.phone
        if not target_phone:
            raise ValueError("No phone number on file. Provide one to verify.")

        code = generate_otp_code()
        db.add(
            OtpCode(
                user_id=user.id,
                phone=target_phone,
                code_hash=hash_token(code),
                expires_at=datetime.now(timezone.utc) + timedelta(minutes=settings.OTP_EXPIRE_MINUTES),
            )
        )
        await db.commit()
        logger.info("[DEV SMS] OTP for %s (%s): %s", user.email, target_phone, code)
        return code

    @staticmethod
    async def verify_otp(db: AsyncSession, user: User, code: str) -> None:
        result = await db.execute(
            select(OtpCode)
            .where(OtpCode.user_id == user.id, OtpCode.verified_at.is_(None))
            .order_by(OtpCode.created_at.desc())
        )
        otp_row = result.scalars().first()
        now = datetime.now(timezone.utc)
        if otp_row is None or otp_row.expires_at < now:
            raise ValueError("No pending OTP found. Please request a new code.")

        if otp_row.attempts >= 5:
            raise ValueError("Too many incorrect attempts. Please request a new code.")

        if hash_token(code) != otp_row.code_hash:
            otp_row.attempts += 1
            await db.commit()
            raise ValueError("Incorrect OTP code.")

        otp_row.verified_at = now
        user.phone = otp_row.phone
        user.phone_verified = True
        await db.commit()

    @staticmethod
    async def list_admin_users(db: AsyncSession) -> list[dict]:
        query = select(User).where(
            User.role.in_([
                "SUPER_ADMIN",
                "ADMIN",
                "CATALOG_MANAGER",
                "FINANCE_AUDITOR",
                "ORDER_OPERATOR",
                "VENDOR_MANAGER",
                "CUSTOMER_SUPPORT",
            ])
        ).order_by(User.created_at.desc())
        result = await db.execute(query)
        users = result.scalars().all()
        return [_user_response_dict(u) for u in users]

    @staticmethod
    async def create_admin_user(db: AsyncSession, payload) -> dict:
        existing = await db.execute(select(User).where(User.email == payload.email.strip().lower()))
        if existing.scalar_one_or_none():
            raise ValueError(f"User with email '{payload.email}' already exists.")

        user = User(
            email=payload.email.strip().lower(),
            first_name=payload.first_name.strip(),
            last_name=payload.last_name.strip() if payload.last_name else "",
            hashed_password=get_password_hash(payload.password),
            role=payload.role.upper(),
            email_verified=True,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
        return _user_response_dict(user)

    @staticmethod
    async def update_user_role(db: AsyncSession, user_id: str, new_role: str) -> dict:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            raise ValueError("User not found.")

        user.role = new_role.upper()
        await db.commit()
        await db.refresh(user)
        return _user_response_dict(user)

    @staticmethod
    async def delete_admin_user(db: AsyncSession, user_id: str) -> None:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            raise ValueError("User not found.")

        await db.delete(user)
        await db.commit()

    @staticmethod
    async def list_customers(db: AsyncSession) -> list[dict]:
        query = select(User).where(User.role == "CUSTOMER").order_by(User.created_at.desc())
        result = await db.execute(query)
        users = result.scalars().all()
        return [_user_response_dict(u) for u in users]

    @staticmethod
    async def toggle_customer_ban(db: AsyncSession, user_id: str, action: str, reason: str = "") -> dict:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            raise ValueError("Customer not found.")

        if action.upper() == "BAN":
            user.is_active = False
        else:
            user.is_active = True

        await db.commit()
        await db.refresh(user)
        return _user_response_dict(user)


