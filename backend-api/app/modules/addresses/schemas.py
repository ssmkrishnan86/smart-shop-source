from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AddressCreateSchema(BaseModel):
    label: str = "Home"
    full_name: str
    phone: str
    street: str
    city: str
    state: str
    zip_code: str
    country: str = "India"
    is_default: bool = False


class AddressUpdateSchema(BaseModel):
    label: Optional[str] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None
    is_default: Optional[bool] = None


class AddressResponseSchema(BaseModel):
    id: str
    label: str
    full_name: str
    phone: str
    street: str
    city: str
    state: str
    zip_code: str
    country: str
    is_default: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
