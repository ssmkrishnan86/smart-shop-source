from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.database.session import get_db
from app.modules.auth.models import User
from app.modules.notifications.controller import NotificationController

router = APIRouter()


@router.get("/", response_model=dict, summary="List my notifications")
async def list_notifications(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    unread_only: bool = Query(False),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    data = await NotificationController.list_notifications(db, current_user.id, page, limit, unread_only)
    return {"success": True, "message": "Notifications retrieved", "data": data}


@router.post("/{notification_id}/read", response_model=dict, summary="Mark notification as read")
async def mark_as_read(
    notification_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    try:
        await NotificationController.mark_as_read(db, current_user.id, notification_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"success": True, "message": "Marked as read"}


@router.post("/read-all", response_model=dict, summary="Mark all notifications as read")
async def mark_all_as_read(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    await NotificationController.mark_all_as_read(db, current_user.id)
    return {"success": True, "message": "All notifications marked as read"}


@router.delete("/{notification_id}", response_model=dict, summary="Delete notification")
async def delete_notification(
    notification_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    try:
        await NotificationController.delete_notification(db, current_user.id, notification_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"success": True, "message": "Notification deleted"}
