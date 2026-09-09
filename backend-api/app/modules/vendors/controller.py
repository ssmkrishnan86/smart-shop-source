from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.vendors.models import Vendor


def _vendor_dict(v: Vendor) -> dict:
    return {
        "id": v.id,
        "name": v.name,
        "slug": v.slug,
        "logo": v.logo,
        "banner": v.banner,
        "description": v.description,
        "category": v.category,
        "status": v.status,
        "rating": float(v.rating or 0),
        "gst_number": v.gst_number,
        "pan_number": v.pan_number,
        "phone": v.phone,
        "email": v.email,
        "street": v.street,
        "city": v.city,
        "state": v.state,
        "zip_code": v.zip_code,
        "created_at": v.created_at,
    }


class VendorController:

    @staticmethod
    async def get_vendor_by_user_id(db: AsyncSession, user_id: str) -> Optional[Vendor]:
        result = await db.execute(
            select(Vendor).where(Vendor.user_id == user_id, Vendor.is_deleted.is_(False))
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def get_my_vendor(db: AsyncSession, user_id: str) -> dict:
        vendor = await VendorController.get_vendor_by_user_id(db, user_id)
        if vendor is None:
            raise ValueError("No vendor store is associated with this account yet.")
        return _vendor_dict(vendor)
