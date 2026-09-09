from fastapi import APIRouter, Depends, Query, HTTPException, UploadFile, File
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.products.controllers.product_controller import ProductController
from app.modules.products.schemas.product import ProductCreateSchema, ProductEditRequestSchema, ProductApprovalActionSchema, ProductRejectionActionSchema
from app.core.storage import storage_service
from app.core.deps import get_optional_user
from app.database.session import get_db
from app.modules.auth.models import User
from app.modules.vendors.controller import VendorController

router = APIRouter()

async def _resolve_vendor_identity(db: AsyncSession, current_user: Optional[User] = None) -> tuple[str, str]:
    if current_user:
        try:
            vendor = await VendorController.get_vendor_by_user_id(db, current_user.id)
            if vendor:
                return vendor.id, vendor.name
        except Exception:
            pass
    return "ven_1", "Vedic Crafts Heritage"

# 0. Upload Product Image Endpoint (Local Storage / Static Server)
@router.post("/upload-image", response_model=dict)
async def upload_product_image(file: UploadFile = File(...)):
    url = await storage_service.upload_image(file, subfolder="products")
    return {
        "success": True,
        "message": "Image uploaded successfully to local backend storage",
        "url": url
    }

# 1. Public Storefront Endpoint for DivineKart (STRICTLY APPROVED LIVE PRODUCTS ONLY)
@router.get("/", response_model=dict)
async def get_approved_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    sort: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=100),
):
    res = await ProductController.list_approved_products(
        category=category, search=search, sort=sort, page=page, limit=limit
    )
    return {
        "success": True,
        "message": "Approved storefront products fetched",
        "data": res["items"],
        "meta": {
            "page": res["page"],
            "limit": res["limit"],
            "total": res["total"],
            "total_pages": res["total_pages"],
            "has_more": res["has_more"],
        },
    }

# 2. Vendor Endpoint for DivineVendor (Submit Product)
@router.post("/vendor/submit", response_model=dict)
async def vendor_submit_product(
    payload: ProductCreateSchema,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    vendor_id, vendor_name = await _resolve_vendor_identity(db, current_user)
    res = await ProductController.vendor_submit_product(payload, vendor_id=vendor_id, vendor_name=vendor_name)
    return {"success": True, "message": "Product submitted for approval", "data": res}

# 3. Vendor Endpoint for DivineVendor (Submit Product Edit Change Request)
@router.post("/vendor/{product_id}/edit-request", response_model=dict)
async def vendor_submit_edit_request(
    product_id: str,
    payload: ProductEditRequestSchema,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    try:
        res = await ProductController.vendor_submit_edit_request(product_id, payload)
        return {"success": True, "message": "Edit change request submitted to DivineAdmin for approval", "data": res}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# 4. Vendor Endpoint for DivineVendor (List Vendor Products)
@router.get("/vendor/my-products", response_model=dict)
async def list_vendor_products(
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    vendor_id, _vendor_name = await _resolve_vendor_identity(db, current_user)
    data = await ProductController.list_vendor_products(vendor_id=vendor_id, status=status)
    return {"success": True, "message": "Vendor products loaded", "data": data}

# 5. Admin Endpoint for DivineAdmin (Approval Queue)
@router.get("/admin/approval-queue", response_model=dict)
async def get_admin_approval_queue(status: Optional[str] = None):
    data = await ProductController.list_admin_approval_queue(status=status)
    return {"success": True, "message": "Admin approval queue loaded", "data": data}

# 6. Admin Endpoint for DivineAdmin (Change Requests Queue)
@router.get("/admin/change-requests", response_model=dict)
async def get_admin_change_requests():
    data = await ProductController.list_admin_change_requests()
    return {"success": True, "message": "Product change requests loaded", "data": data}

# 7. Admin Endpoint for DivineAdmin (Approve Product Change Request)
@router.post("/admin/change-requests/{request_id}/approve", response_model=dict)
async def admin_approve_change_request(request_id: str, action: ProductApprovalActionSchema):
    try:
        res = await ProductController.admin_approve_change_request(request_id, action)
        return {"success": True, "message": "Product edit request approved & live product updated on DivineKart", "data": res}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# 8. Admin Endpoint for DivineAdmin (Reject Product Change Request)
@router.post("/admin/change-requests/{request_id}/reject", response_model=dict)
async def admin_reject_change_request(request_id: str, action: ProductRejectionActionSchema):
    try:
        res = await ProductController.admin_reject_change_request(request_id, action)
        return {"success": True, "message": "Product edit request rejected", "data": res}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# 9. Admin Endpoint for DivineAdmin (Approve Product Creation)
@router.post("/admin/{product_id}/approve", response_model=dict)
async def admin_approve_product(product_id: str, action: ProductApprovalActionSchema):
    try:
        res = await ProductController.admin_approve_product(product_id, action)
        return {"success": True, "message": "Product approved & published to DivineKart", "data": res}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# 10. Admin Endpoint for DivineAdmin (Reject Product Creation)
@router.post("/admin/{product_id}/reject", response_model=dict)
async def admin_reject_product(product_id: str, action: ProductRejectionActionSchema):
    try:
        res = await ProductController.admin_reject_product(product_id, action)
        return {"success": True, "message": "Product rejected with reason", "data": res}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# 11. Admin Endpoint for DivineAdmin (Request Changes on Product)
@router.post("/admin/{product_id}/request-changes", response_model=dict)
async def admin_request_changes(product_id: str, action: ProductApprovalActionSchema):
    try:
        res = await ProductController.admin_request_changes(product_id, action)
        return {"success": True, "message": "Changes requested from vendor", "data": res}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# 12. Admin Endpoint for DivineAdmin (Approval Audit History)
@router.get("/admin/approval-history", response_model=dict)
async def get_approval_history(product_id: Optional[str] = None):
    data = await ProductController.get_approval_history(product_id=product_id)
    return {"success": True, "message": "Approval history loaded", "data": data}

# 13. Delete Product Endpoint (Vendor or Admin)
@router.delete("/{product_id}", response_model=dict)
@router.delete("/vendor/{product_id}", response_model=dict)
@router.delete("/admin/{product_id}", response_model=dict)
async def delete_product(product_id: str):
    try:
        res = await ProductController.delete_product(product_id)
        return {"success": True, "message": "Product deleted successfully from marketplace", "data": res}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# Single product detail endpoint (must be LAST to avoid catching admin/* or vendor/* routes)
@router.get("/{product_id}", response_model=dict)
async def get_product_by_id(product_id: str):
    data = await ProductController.list_admin_approval_queue()
    for p in data:
        if p["id"] == product_id or p["slug"] == product_id:
            return {"success": True, "message": "Product retrieved", "data": p}
    raise HTTPException(status_code=404, detail="Product not found")
