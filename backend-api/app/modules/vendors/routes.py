from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import require_roles
from app.database.session import get_db
from app.modules.auth.models import User
from app.modules.vendors.controller import VendorController

router = APIRouter()

MOCK_VENDORS = [
    {
        "id": "ven_1",
        "name": "Vedic Crafts Heritage",
        "slug": "vedic-crafts-heritage",
        "logo": "/images/ganesha_idol.jpg",
        "category": "Idols & Puja Samagri",
        "rating": 4.9,
        "commission_rate": 8.0,
        "verified": True
    }
]

@router.get("/", response_model=dict)
async def list_vendors():
    return {"success": True, "message": "Vendors fetched", "data": MOCK_VENDORS}


@router.get("/me", response_model=dict, summary="My vendor store (authenticated vendor owner)")
async def get_my_vendor(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_roles("VENDOR_OWNER", "SUPER_ADMIN")),
):
    try:
        vendor = await VendorController.get_my_vendor(db, current_user.id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"success": True, "message": "Vendor store retrieved", "data": vendor}
