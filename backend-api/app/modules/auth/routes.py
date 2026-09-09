from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.deps import get_current_user
from app.database.session import get_db
from app.modules.auth.controllers.auth_controller import AuthController
from app.modules.auth.models import User
from app.modules.auth.schemas.auth import (
    ChangePasswordRequest,
    ForgotPasswordRequest,
    LoginRequest,
    MessageResponse,
    RegisterRequest,
    ResetPasswordRequest,
    SendOtpRequest,
    SessionInfo,
    TokenResponse,
    UpdateProfileRequest,
    UserResponse,
    VerifyEmailRequest,
    VerifyOtpRequest,
)

router = APIRouter()


def _client_ip(request: Request) -> Optional[str]:
    return request.client.host if request.client else None


def _set_refresh_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key=settings.REFRESH_COOKIE_NAME,
        value=token,
        httponly=True,
        secure=False,  # dev over http://localhost; set True once served over HTTPS
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        path="/api/v1/auth",
    )


def _clear_refresh_cookie(response: Response) -> None:
    response.delete_cookie(key=settings.REFRESH_COOKIE_NAME, path="/api/v1/auth")


# ─── Registration / Login ──────────────────────────────────────────────────────

@router.post("/register", response_model=TokenResponse, summary="Register")
async def register(payload: RegisterRequest, request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    try:
        session = await AuthController.register(db, payload, request.headers.get("user-agent"), _client_ip(request))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    _set_refresh_cookie(response, session["refresh_token"])
    return TokenResponse(access_token=session["access_token"], expires_in=session["expires_in"], user=session["user"])


@router.post("/login", response_model=TokenResponse, summary="Login")
async def login(payload: LoginRequest, request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    try:
        session = await AuthController.login(db, payload, request.headers.get("user-agent"), _client_ip(request))
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
    _set_refresh_cookie(response, session["refresh_token"])
    return TokenResponse(access_token=session["access_token"], expires_in=session["expires_in"], user=session["user"])


# ─── Refresh / Logout — also powers cross-app SSO ──────────────────────────────
# The refresh cookie is host-only for "localhost" (no explicit Domain set), so
# it is already shared across every localhost port (DivineKart :3000,
# DivineAdmin :3001, DivineVendor :3002). Any app can call POST /refresh on
# boot to silently redeem an existing session — that is the SSO mechanism.

@router.post("/refresh", response_model=TokenResponse, summary="Refresh access token / silent SSO session check")
async def refresh(request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    raw_token = request.cookies.get(settings.REFRESH_COOKIE_NAME)
    if not raw_token:
        raise HTTPException(status_code=401, detail="No active session.")
    try:
        session = await AuthController.refresh(db, raw_token, request.headers.get("user-agent"), _client_ip(request))
    except ValueError as e:
        _clear_refresh_cookie(response)
        raise HTTPException(status_code=401, detail=str(e))
    _set_refresh_cookie(response, session["refresh_token"])
    return TokenResponse(access_token=session["access_token"], expires_in=session["expires_in"], user=session["user"])


@router.post("/logout", response_model=MessageResponse, summary="Logout (current session)")
async def logout(request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    raw_token = request.cookies.get(settings.REFRESH_COOKIE_NAME)
    await AuthController.logout(db, raw_token)
    _clear_refresh_cookie(response)
    return MessageResponse(message="Logged out successfully.")


@router.post("/logout-all", response_model=MessageResponse, summary="Logout from all devices/apps")
async def logout_all(
    response: Response, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    await AuthController.logout_all(db, current_user)
    _clear_refresh_cookie(response)
    return MessageResponse(message="Logged out from all devices.")


# ─── Profile ────────────────────────────────────────────────────────────────

@router.get("/me", response_model=UserResponse, summary="Current user profile")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserResponse, summary="Update profile")
async def update_me(
    payload: UpdateProfileRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AuthController.update_profile(db, current_user, payload)


# ─── Password management ───────────────────────────────────────────────────────

@router.post("/change-password", response_model=MessageResponse, summary="Change password")
async def change_password(
    payload: ChangePasswordRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        await AuthController.change_password(db, current_user, payload.current_password, payload.new_password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return MessageResponse(message="Password changed successfully. You've been logged out on other devices.")


@router.post("/forgot-password", summary="Forgot password")
async def forgot_password(payload: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)):
    dev_token = await AuthController.forgot_password(db, payload.email)
    body = {"message": "If an account exists for this email, a password reset link has been sent."}
    if dev_token:
        body["dev_only_reset_token"] = dev_token
    return body


@router.post("/reset-password", response_model=MessageResponse, summary="Reset password")
async def reset_password(payload: ResetPasswordRequest, db: AsyncSession = Depends(get_db)):
    try:
        await AuthController.reset_password(db, payload.token, payload.new_password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return MessageResponse(message="Password reset successfully. Please log in with your new password.")


# ─── Email verification ─────────────────────────────────────────────────────

@router.post("/verify-email/send", summary="Send email verification link")
async def send_email_verification(
    db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    try:
        dev_token = await AuthController.send_email_verification(db, current_user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": "Verification email sent.", "dev_only_verification_token": dev_token}


@router.post("/verify-email", response_model=MessageResponse, summary="Verify email")
async def verify_email(payload: VerifyEmailRequest, db: AsyncSession = Depends(get_db)):
    try:
        await AuthController.verify_email(db, payload.token)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return MessageResponse(message="Email verified successfully.")


# ─── Mobile OTP verification ────────────────────────────────────────────────

@router.post("/verify-otp/send", summary="Send mobile OTP")
async def send_otp(
    payload: SendOtpRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        dev_code = await AuthController.send_otp(db, current_user, payload.phone)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": "OTP sent.", "dev_only_otp_code": dev_code}


@router.post("/verify-otp", response_model=MessageResponse, summary="Verify mobile OTP")
async def verify_otp(
    payload: VerifyOtpRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        await AuthController.verify_otp(db, current_user, payload.code)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return MessageResponse(message="Mobile number verified successfully.")


# ─── Security Settings: active sessions ────────────────────────────────────

@router.get("/sessions", response_model=list[SessionInfo], summary="List active sessions")
async def list_sessions(
    request: Request, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    current_raw = request.cookies.get(settings.REFRESH_COOKIE_NAME)
    return await AuthController.list_sessions(db, current_user, current_raw)


@router.delete("/sessions/{session_id}", response_model=MessageResponse, summary="Revoke a session")
async def revoke_session(
    session_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    try:
        await AuthController.revoke_session(db, current_user, session_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return MessageResponse(message="Session revoked.")


# ─── Super Admin Staff & Role Management ────────────────────────────────────

from pydantic import BaseModel, EmailStr


class CreateAdminUserSchema(BaseModel):
    email: EmailStr
    first_name: str
    last_name: Optional[str] = ""
    password: str
    role: str = "SUPER_ADMIN"


class UpdateRoleSchema(BaseModel):
    role: str


@router.get("/admin/users", response_model=dict, summary="Super Admin: List internal admin staff users")
async def list_admin_users(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    data = await AuthController.list_admin_users(db)
    return {"success": True, "message": "Admin users retrieved", "data": data}


@router.post("/admin/users", response_model=dict, summary="Super Admin: Create a new internal admin staff member")
async def create_admin_user(
    payload: CreateAdminUserSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        data = await AuthController.create_admin_user(db, payload)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"success": True, "message": f"Admin user {payload.email} created successfully", "data": data}


@router.put("/admin/users/{user_id}/role", response_model=dict, summary="Super Admin: Edit staff assigned permission role")
async def update_user_role(
    user_id: str,
    payload: UpdateRoleSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        data = await AuthController.update_user_role(db, user_id, payload.role)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"success": True, "message": f"Role updated to {payload.role}", "data": data}


@router.delete("/admin/users/{user_id}", response_model=dict, summary="Super Admin: Remove admin staff member")
async def delete_admin_user(
    user_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        await AuthController.delete_admin_user(db, user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"success": True, "message": "Admin staff user deleted successfully"}


class CustomerBanSchema(BaseModel):
    action: str  # BAN or UNBAN
    reason: Optional[str] = None


@router.get("/admin/customers", response_model=dict, summary="Super Admin: List marketplace customers")
async def list_customers(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    data = await AuthController.list_customers(db)
    return {"success": True, "message": "Customers loaded", "data": data}


@router.put("/admin/customers/{customer_id}/ban", response_model=dict, summary="Super Admin: Ban or Unban marketplace customer")
async def toggle_customer_ban(
    customer_id: str,
    payload: CustomerBanSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        data = await AuthController.toggle_customer_ban(db, customer_id, payload.action, payload.reason or "")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"success": True, "message": f"Customer account {payload.action.lower()}ned successfully", "data": data}


