import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Boolean
from app.database.session import Base

class BaseModelMixin(Base):
    __abstract__ = True

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    is_deleted = Column(Boolean, default=False, nullable=False)
