from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class WishlistAddSchema(BaseModel):
    product_id: str


class WishlistItemResponseSchema(BaseModel):
    id: str
    product_id: str
    added_at: Optional[datetime] = None
    product_name: Optional[str] = None
    product_thumbnail: Optional[str] = None
    product_price: Optional[float] = None
    product_original_price: Optional[float] = None
    product_category: Optional[str] = None
    product_stock: Optional[int] = None
