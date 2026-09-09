from pydantic import BaseModel
from typing import Optional, List

class ProductApprovalActionSchema(BaseModel):
    comments: Optional[str] = "Approved by Administrator"
    admin_name: Optional[str] = "Super Admin"

class ProductRejectionActionSchema(BaseModel):
    reason: str
    admin_name: Optional[str] = "Super Admin"

class ProductCreateSchema(BaseModel):
    name: str
    price: float
    category: str
    brand: Optional[str] = "DivineKart Artisan"
    description: Optional[str] = ""
    short_description: Optional[str] = ""
    stock: Optional[int] = 10
    thumbnail: Optional[str] = "/images/ganesha_idol.jpg"

class ProductEditRequestSchema(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    description: Optional[str] = None
    thumbnail: Optional[str] = None

class ProductResponseSchema(BaseModel):
    id: str
    vendor_id: str
    vendor_name: str
    name: str
    slug: str
    description: str
    short_description: Optional[str] = None
    price: float
    original_price: float
    discount_percentage: int
    category: str
    brand: Optional[str] = None
    sku: str
    stock: int
    rating: float
    review_count: int
    status: str
    approval_status: str  # PENDING_APPROVAL, APPROVED, REJECTED, NEEDS_REVISION
    rejection_reason: Optional[str] = None
    approval_comments: Optional[str] = None
    approved_by: Optional[str] = None
    thumbnail: str
    is_featured: bool

class ProductChangeRequestResponseSchema(BaseModel):
    id: str
    product_id: str
    vendor_id: str
    vendor_name: str
    product_name: str
    current_name: str
    proposed_name: str
    current_price: float
    proposed_price: float
    current_category: str
    proposed_category: str
    current_stock: int
    proposed_stock: int
    current_thumbnail: Optional[str] = None
    proposed_thumbnail: Optional[str] = None
    status: str
    admin_comments: Optional[str] = None
    created_at: str

class ProductApprovalLogSchema(BaseModel):
    id: str
    product_id: str
    product_name: str
    admin_name: str
    previous_status: str
    new_status: str
    comments: str
    created_at: str
