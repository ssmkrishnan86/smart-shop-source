from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.notifications.models import Notification


def _notification_dict(n: Notification) -> dict:
    return {
        "id": n.id,
        "title": n.title,
        "message": n.message,
        "type": n.type,
        "link": n.link,
        "is_read": n.is_read,
        "created_at": n.created_at,
    }


class NotificationController:

    @staticmethod
    async def list_notifications(
        db: AsyncSession, user_id: str, page: int = 1, limit: int = 20, unread_only: bool = False
    ) -> dict:
        query = select(Notification).where(Notification.user_id == user_id)
        count_query = select(func.count()).select_from(Notification).where(Notification.user_id == user_id)
        if unread_only:
            query = query.where(Notification.is_read.is_(False))
            count_query = count_query.where(Notification.is_read.is_(False))

        total = (await db.execute(count_query)).scalar_one()
        result = await db.execute(
            query.order_by(Notification.created_at.desc()).offset((page - 1) * limit).limit(limit)
        )
        items = [_notification_dict(n) for n in result.scalars().all()]

        unread_result = await db.execute(
            select(func.count())
            .select_from(Notification)
            .where(Notification.user_id == user_id, Notification.is_read.is_(False))
        )
        unread_count = unread_result.scalar_one()

        return {
            "items": items,
            "unread_count": unread_count,
            "meta": {
                "page": page,
                "limit": limit,
                "total": total,
                "total_pages": max(1, -(-total // limit)),
            },
        }

    @staticmethod
    async def mark_as_read(db: AsyncSession, user_id: str, notification_id: str) -> None:
        result = await db.execute(
            select(Notification).where(Notification.id == notification_id, Notification.user_id == user_id)
        )
        notif = result.scalar_one_or_none()
        if notif is None:
            raise ValueError("Notification not found.")
        notif.is_read = True
        await db.commit()

    @staticmethod
    async def mark_all_as_read(db: AsyncSession, user_id: str) -> None:
        result = await db.execute(
            select(Notification).where(Notification.user_id == user_id, Notification.is_read.is_(False))
        )
        for notif in result.scalars().all():
            notif.is_read = True
        await db.commit()

    @staticmethod
    async def delete_notification(db: AsyncSession, user_id: str, notification_id: str) -> None:
        result = await db.execute(
            select(Notification).where(Notification.id == notification_id, Notification.user_id == user_id)
        )
        notif = result.scalar_one_or_none()
        if notif is None:
            raise ValueError("Notification not found.")
        await db.delete(notif)
        await db.commit()
