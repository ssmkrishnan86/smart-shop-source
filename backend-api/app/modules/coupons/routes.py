import uuid
from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user, require_roles
from app.database.session import get_db
from app.modules.auth.models import User
from app.modules.vendors.controller import VendorController

router = APIRouter()

# In-memory store for coupons in dev mode
INITIAL_COUPONS = [
    {
        "id": "coup_1",
        "code": "DIVINE20",
        "discountType": "PERCENTAGE",
        "discountValue": 20,
        "discountDisplay": "20% OFF",
        "minPurchase": 999,
        "maxDiscount": 500,
        "usesCount": 142,
        "maxUses": 500,
        "expiryDate": "2026-12-31",
        "status": "ACTIVE",
        "vendorId": "ven_1",
    },
    {
        "id": "coup_2",
        "code": "FESTIVE10",
        "discountType": "PERCENTAGE",
        "discountValue": 10,
        "discountDisplay": "10% OFF",
        "minPurchase": 499,
        "maxDiscount": 250,
        "usesCount": 88,
        "maxUses": 200,
        "expiryDate": "2026-10-15",
        "status": "ACTIVE",
        "vendorId": "ven_1",
    },
    {
        "id": "coup_3",
        "code": "FLAT200",
        "discountType": "FLAT",
        "discountValue": 200,
        "discountDisplay": "₹200 OFF",
        "minPurchase": 1499,
        "maxDiscount": None,
        "usesCount": 35,
        "maxUses": 100,
        "expiryDate": "2026-09-01",
        "status": "ACTIVE",
        "vendorId": "ven_1",
    },
]

COUPONS_DB = list(INITIAL_COUPONS)


class CreateCouponSchema(BaseModel):
    code: str
    discountType: str = "PERCENTAGE"  # PERCENTAGE or FLAT
    discountValue: float
    minPurchase: float = 0.0
    maxDiscount: Optional[float] = None
    maxUses: Optional[int] = 100
    expiryDate: Optional[str] = "2026-12-31"


@router.get("/", response_model=dict, summary="List active & vendor coupons")
async def list_coupons(
    current_user: User = Depends(get_current_user),
):
    return {"success": True, "message": "Coupons retrieved", "data": COUPONS_DB}


@router.post("/", response_model=dict, summary="Create a new promotional coupon code")
async def create_coupon(
    payload: CreateCouponSchema,
    current_user: User = Depends(require_roles("VENDOR_OWNER", "SUPER_ADMIN", "ADMIN")),
):
    clean_code = payload.code.strip().upper()
    if not clean_code:
        raise HTTPException(status_code=400, detail="Coupon code cannot be empty.")

    # Check duplicate code
    if any(c["code"] == clean_code for c in COUPONS_DB):
        raise HTTPException(status_code=400, detail=f"Coupon code '{clean_code}' already exists.")

    disc_display = (
        f"{payload.discountValue:.0f}% OFF"
        if payload.discountType.upper() == "PERCENTAGE"
        else f"₹{payload.discountValue:.0f} OFF"
    )

    new_coupon = {
        "id": f"coup_{uuid.uuid4().hex[:8]}",
        "code": clean_code,
        "discountType": payload.discountType.upper(),
        "discountValue": payload.discountValue,
        "discountDisplay": disc_display,
        "minPurchase": payload.minPurchase,
        "maxDiscount": payload.maxDiscount,
        "usesCount": 0,
        "maxUses": payload.maxUses or 100,
        "expiryDate": payload.expiryDate or "2026-12-31",
        "status": "ACTIVE",
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "vendorId": "ven_1",
    }
    COUPONS_DB.insert(0, new_coupon)
    return {"success": True, "message": f"Coupon code {clean_code} created successfully", "data": new_coupon}


@router.post("/{coupon_id}/toggle-status", response_model=dict, summary="Toggle coupon status ACTIVE/INACTIVE")
async def toggle_coupon_status(
    coupon_id: str,
    current_user: User = Depends(require_roles("VENDOR_OWNER", "SUPER_ADMIN", "ADMIN")),
):
    item = next((c for c in COUPONS_DB if c["id"] == coupon_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Coupon not found.")

    item["status"] = "INACTIVE" if item["status"] == "ACTIVE" else "ACTIVE"
    return {"success": True, "message": f"Coupon status updated to {item['status']}", "data": item}


@router.delete("/{coupon_id}", response_model=dict, summary="Delete coupon")
async def delete_coupon(
    coupon_id: str,
    current_user: User = Depends(require_roles("VENDOR_OWNER", "SUPER_ADMIN", "ADMIN")),
):
    global COUPONS_DB
    item = next((c for c in COUPONS_DB if c["id"] == coupon_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Coupon not found.")

    COUPONS_DB = [c for c in COUPONS_DB if c["id"] != coupon_id]
    return {"success": True, "message": f"Coupon {item['code']} deleted", "data": item}
