from pydantic import BaseModel, field_validator
from typing import Optional, List
from datetime import datetime


# ─── Request Schemas ──────────────────────────────────────────────────────────

class CartItemAddSchema(BaseModel):
    product_id: str
    product_name: str
    product_thumbnail: Optional[str] = None
    product_category: Optional[str] = None
    product_sku: Optional[str] = None
    unit_price: float
    original_price: Optional[float] = None
    quantity: int = 1
    selected_variant: Optional[str] = None

    @field_validator("quantity")
    @classmethod
    def quantity_must_be_positive(cls, v: int) -> int:
        if v < 1:
            raise ValueError("Quantity must be at least 1")
        return v

    @field_validator("unit_price")
    @classmethod
    def price_must_be_positive(cls, v: float) -> float:
        if v <= 0:
            raise ValueError("Unit price must be greater than 0")
        return v


class CartItemUpdateSchema(BaseModel):
    quantity: int

    @field_validator("quantity")
    @classmethod
    def quantity_must_be_non_negative(cls, v: int) -> int:
        if v < 0:
            raise ValueError("Quantity cannot be negative")
        return v


class CouponApplySchema(BaseModel):
    coupon_code: str


# ─── Response Schemas ─────────────────────────────────────────────────────────

class CartItemResponseSchema(BaseModel):
    id: str
    cart_id: str
    product_id: str
    product_name: str
    product_thumbnail: Optional[str] = None
    product_category: Optional[str] = None
    product_sku: Optional[str] = None
    unit_price: float
    original_price: Optional[float] = None
    quantity: int
    selected_variant: Optional[str] = None
    line_total: float
    added_at: Optional[str] = None

    class Config:
        from_attributes = True


class CartTotalsSchema(BaseModel):
    item_count: int
    subtotal: float
    discount_amount: float
    coupon_code: Optional[str] = None
    shipping_fee: float
    tax_rate: float
    tax_amount: float
    grand_total: float


class CartResponseSchema(BaseModel):
    cart_id: str
    user_id: str
    items: List[CartItemResponseSchema]
    totals: CartTotalsSchema

    class Config:
        from_attributes = True


class CartCountResponseSchema(BaseModel):
    user_id: str
    item_count: int
    total_quantity: int
