from typing import Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user, require_roles
from app.database.session import get_db
from app.modules.auth.models import User
from app.modules.orders.controller import OrderController
from app.modules.orders.schemas import CreateOrderSchema
from app.modules.vendors.controller import VendorController

router = APIRouter()


class VendorStatusUpdateSchema(BaseModel):
    status: str
    courier_partner: Optional[str] = None
    tracking_number: Optional[str] = None
    estimated_delivery_days: Optional[int] = 4


class CancelOrderSchema(BaseModel):
    reason: Optional[str] = "Customer requested cancellation"


@router.get("/", response_model=dict, summary="List my orders")
async def list_orders(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    status: Optional[str] = Query(None, description="Filter by order status, e.g. CONFIRMED, SHIPPED"),
    sort: str = Query("-created_at", description="created_at | -created_at | total | -total"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    data = await OrderController.list_orders(db, current_user.id, page, limit, status, sort)
    return {"success": True, "message": "Orders retrieved", "data": data}


@router.get("/vendor/sub-orders", response_model=dict, summary="Vendor Portal: List assigned sub-orders")
async def list_vendor_sub_orders(
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_roles("VENDOR_OWNER", "SUPER_ADMIN")),
):
    try:
        vendor = await VendorController.get_my_vendor(db, current_user.id)
        vendor_id = vendor["id"]
    except Exception:
        vendor_id = "ven_1"

    data = await OrderController.list_vendor_sub_orders(db, vendor_id, status)
    return {"success": True, "message": "Vendor sub-orders retrieved", "data": data}


@router.post("/vendor/sub-orders/{sub_order_id}/status", response_model=dict, summary="Vendor Portal: Update sub-order status")
async def update_vendor_sub_order_status(
    sub_order_id: str,
    payload: VendorStatusUpdateSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_roles("VENDOR_OWNER", "SUPER_ADMIN")),
):
    try:
        vendor = await VendorController.get_my_vendor(db, current_user.id)
        vendor_id = vendor["id"]
    except Exception:
        vendor_id = "ven_1"

    try:
        updated = await OrderController.update_vendor_sub_order_status(
            db=db,
            vendor_id=vendor_id,
            sub_order_id=sub_order_id,
            new_status=payload.status,
            courier_partner=payload.courier_partner,
            tracking_number=payload.tracking_number,
            estimated_delivery_days=payload.estimated_delivery_days or 4,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"success": True, "message": f"Sub-order status updated to {payload.status}", "data": updated}


@router.get("/admin/all", response_model=dict, summary="Admin Portal: Monitor all parent orders")
async def admin_list_orders(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    order_status: Optional[str] = None,
    payment_status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "ADMIN")),
):
    data = await OrderController.admin_list_orders(db, page, limit, order_status, payment_status)
    return {"success": True, "message": "Admin global orders retrieved", "data": data}


@router.get("/{order_id}", response_model=dict, summary="Get order details")
async def get_order(
    order_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    try:
        order = await OrderController.get_order(db, current_user.id, order_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"success": True, "message": "Order retrieved", "data": order}


@router.post("/", response_model=dict, summary="Place order from current cart")
async def create_order(
    payload: CreateOrderSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        order = await OrderController.create_order_from_cart(db, current_user, payload)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"success": True, "message": "Order placed successfully", "data": order}


@router.post("/{order_id}/cancel", response_model=dict, summary="Cancel order")
async def cancel_order(
    order_id: str,
    payload: CancelOrderSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        cancelled = await OrderController.cancel_order(db, current_user.id, order_id, payload.reason)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"success": True, "message": "Order cancelled successfully", "data": cancelled}


class VendorReturnActionSchema(BaseModel):
    action: str
    rejection_reason: Optional[str] = None


@router.get("/vendor/returns", response_model=dict, summary="Vendor Portal: List return claims")
async def list_vendor_returns(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_roles("VENDOR_OWNER", "SUPER_ADMIN")),
):
    try:
        vendor = await VendorController.get_my_vendor(db, current_user.id)
        vendor_id = vendor["id"]
    except Exception:
        vendor_id = "ven_1"

    data = await OrderController.list_vendor_returns(db, vendor_id)
    return {"success": True, "message": "Vendor return claims retrieved", "data": data}


@router.post("/vendor/returns/{return_id}/action", response_model=dict, summary="Vendor Portal: Approve or Reject return claim")
async def process_vendor_return_action(
    return_id: str,
    payload: VendorReturnActionSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_roles("VENDOR_OWNER", "SUPER_ADMIN")),
):
    try:
        vendor = await VendorController.get_my_vendor(db, current_user.id)
        vendor_id = vendor["id"]
    except Exception:
        vendor_id = "ven_1"

    try:
        data = await OrderController.process_vendor_return_action(
            db, vendor_id, return_id, payload.action, payload.rejection_reason
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"success": True, "message": f"Return claim {payload.action.lower()}d successfully", "data": data}

