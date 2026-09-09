import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any, Optional, Union

import bcrypt
from jose import JWTError, jwt

from app.core.config import settings

# Calling bcrypt directly rather than via passlib.CryptContext: passlib 1.7.x's
# bcrypt backend probes bcrypt's internals in a way that's incompatible with
# bcrypt>=4 (raises on its own self-test), so it never actually verifies.


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def create_access_token(
    subject: Union[str, Any],
    role: str,
    extra_claims: Optional[dict] = None,
    expires_delta: Optional[timedelta] = None,
) -> str:
    """Short-lived JWT carrying identity + role claims (OIDC-ID-token-like)."""
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode = {"exp": expire, "sub": str(subject), "role": role, "type": "access"}
    if extra_claims:
        to_encode.update(extra_claims)
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_access_token(token: str) -> Optional[dict]:
    """Verify signature + expiry. Returns the payload, or None if invalid/expired."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except JWTError:
        return None
    if payload.get("type") != "access":
        return None
    return payload


def generate_opaque_token(num_bytes: int = 48) -> str:
    """Cryptographically random opaque token for refresh/verification tokens.

    Deliberately not a JWT: refresh/reset tokens are single-use, revocable,
    and looked up by hash — an opaque secret avoids leaking claims and keeps
    the DB as the single source of truth for validity.
    """
    return secrets.token_urlsafe(num_bytes)


def hash_token(token: str) -> str:
    """SHA-256 hash for storing refresh/verification/OTP secrets at rest —
    the raw value is only ever seen once, by the client that requested it."""
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def generate_otp_code(length: int = 6) -> str:
    return "".join(str(secrets.randbelow(10)) for _ in range(length))
