from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Numeric, String, Text
from datetime import datetime

from app.database.session import Base


class Vendor(Base):
    """Real `vendors` table — also registers `vendors` in shared metadata so
    other modules (orders) can FK to it."""

    __tablename__ = "vendors"

    id = Column(String(50), primary_key=True)
    user_id = Column(String(50), ForeignKey("users.id", ondelete="CASCADE"))
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    logo = Column(String(500))
    banner = Column(String(500))
    description = Column(Text)
    category = Column(String(100))
    status = Column(String(50), nullable=False, default="PENDING_VERIFICATION")
    commission_rate = Column(Numeric(5, 2), nullable=False, default=8.00)
    rating = Column(Numeric(3, 2), default=5.00)
    gst_number = Column(String(50))
    pan_number = Column(String(50))
    phone = Column(String(50))
    email = Column(String(255))
    street = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))
    zip_code = Column(String(20))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    is_deleted = Column(Boolean, nullable=False, default=False)
