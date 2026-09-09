import uuid
from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.database.session import Base
from app.modules.auth.models import User  # noqa: F401 — registers `users` for the FK below


class ShoppingCart(Base):
    __tablename__ = "shopping_cart"
    __table_args__ = (UniqueConstraint("user_id", name="uq_shopping_cart_user"),)

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(50), ForeignKey("users.id", ondelete="CASCADE"))
    session_id = Column(String(255))
    coupon_code = Column(String(50))
    discount_amount = Column(Numeric(10, 2), nullable=False, default=0)
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    is_deleted = Column(Boolean, nullable=False, default=False)

    items = relationship(
        "ShoppingCartItem", back_populates="cart", cascade="all, delete-orphan"
    )


class ShoppingCartItem(Base):
    __tablename__ = "shopping_cart_items"
    __table_args__ = (UniqueConstraint("cart_id", "product_id", name="uq_cart_product"),)

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    cart_id = Column(String(50), ForeignKey("shopping_cart.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(String(50), nullable=False)
    product_name = Column(String(255), nullable=False)
    product_thumbnail = Column(String(500))
    product_category = Column(String(100))
    product_sku = Column(String(100))
    unit_price = Column(Numeric(10, 2), nullable=False)
    original_price = Column(Numeric(10, 2))
    quantity = Column(Integer, nullable=False, default=1)
    selected_variant = Column(String(255))
    added_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    cart = relationship("ShoppingCart", back_populates="items")
