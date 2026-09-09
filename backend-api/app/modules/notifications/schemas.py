from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class NotificationResponseSchema(BaseModel):
    id: str
    title: str
    message: str
    type: str
    link: Optional[str] = None
    is_read: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class NotificationListResponseSchema(BaseModel):
    items: List[NotificationResponseSchema]
    unread_count: int
    meta: dict
