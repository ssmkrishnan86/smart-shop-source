from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class VendorMeResponseSchema(BaseModel):
    id: str
    name: str
    slug: str
    logo: Optional[str] = None
    banner: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    status: str
    rating: float
    gst_number: Optional[str] = None
    pan_number: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    created_at: Optional[datetime] = None
