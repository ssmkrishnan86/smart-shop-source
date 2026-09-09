from typing import Optional

from pydantic import BaseModel


class CreateOrderSchema(BaseModel):
    address_id: Optional[str] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    payment_method: str = "UPI"
