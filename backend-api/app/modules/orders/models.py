import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship

from app.database.session import Base
from app.modules.products.models import Product  # noqa: F401
from app.modules.vendors.models import Vendor  # noqa: F401


class Order(Base):
    __tablename__ = "orders"

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_number = Column(String(50), unique=True, nullable=False)
    user_id = Column(String(50), ForeignKey("users.id"))
    customer_name = Column(String(255), nullable=False)
    customer_email = Column(String(255), nullable=False)
    customer_phone = Column(String(50))
    street = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))
    zip_code = Column(String(20))
    
    # Separated Granular Multi-Statuses
    order_status = Column(String(50), nullable=False, default="CONFIRMED")
    status = Column(String(50), nullable=False, default="CONFIRMED")  # Backward compatibility alias
    payment_status = Column(String(50), nullable=False, default="PAID")
    fulfillment_status = Column(String(50), nullable=False, default="UNFULFILLED")
    shipment_status = Column(String(50), nullable=False, default="NOT_SHIPPED")
    return_status = Column(String(50), nullable=False, default="NONE")
    refund_status = Column(String(50), nullable=False, default="NONE")

    payment_method = Column(String(50), nullable=False, default="UPI")
    payment_gateway_ref = Column(String(100))
    subtotal = Column(Numeric(10, 2), nullable=False)
    discount = Column(Numeric(10, 2), default=0)
    shipping_fee = Column(Numeric(10, 2), default=0)
    tax = Column(Numeric(10, 2), default=0)
    total = Column(Numeric(10, 2), nullable=False)
    tracking_number = Column(String(100))
    courier_partner = Column(String(100))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    is_deleted = Column(Boolean, nullable=False, default=False)

    sub_orders = relationship("VendorSubOrder", back_populates="parent_order", cascade="all, delete-orphan")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    timeline_logs = relationship("OrderTimelineLog", back_populates="order", cascade="all, delete-orphan")
    reservations = relationship("InventoryReservation", back_populates="order", cascade="all, delete-orphan")


class VendorSubOrder(Base):
    __tablename__ = "vendor_sub_orders"

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    parent_order_id = Column(String(50), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    sub_order_number = Column(String(50), unique=True, nullable=False)
    vendor_id = Column(String(50), ForeignKey("vendors.id"))
    vendor_name = Column(String(255), nullable=False)
    vendor_status = Column(String(50), nullable=False, default="NEW")
    fulfillment_status = Column(String(50), nullable=False, default="UNFULFILLED")
    shipment_status = Column(String(50), nullable=False, default="NOT_SHIPPED")
    subtotal = Column(Numeric(10, 2), nullable=False, default=0)
    discount = Column(Numeric(10, 2), default=0)
    shipping_fee = Column(Numeric(10, 2), default=0)
    tax = Column(Numeric(10, 2), default=0)
    total = Column(Numeric(10, 2), nullable=False, default=0)
    courier_partner = Column(String(100))
    tracking_number = Column(String(100))
    pickup_date = Column(DateTime(timezone=True))
    shipped_date = Column(DateTime(timezone=True))
    estimated_delivery_date = Column(DateTime(timezone=True))
    delivered_at = Column(DateTime(timezone=True))
    cancellation_reason = Column(Text)
    return_reason = Column(Text)
    commission_rate = Column(Numeric(5, 2), default=8.00)
    platform_commission = Column(Numeric(10, 2), default=0)
    applicable_fees = Column(Numeric(10, 2), default=0)
    vendor_payable_amount = Column(Numeric(10, 2), default=0)
    settlement_status = Column(String(50), default="PENDING")
    return_window_closes_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    parent_order = relationship("Order", back_populates="sub_orders")
    items = relationship("OrderItem", back_populates="sub_order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String(50), ForeignKey("orders.id", ondelete="CASCADE"))
    sub_order_id = Column(String(50), ForeignKey("vendor_sub_orders.id", ondelete="CASCADE"))
    vendor_id = Column(String(50), ForeignKey("vendors.id"))
    product_id = Column(String(50), ForeignKey("products.id"))
    product_name = Column(String(255), nullable=False)
    product_image = Column(String(500))
    price = Column(Numeric(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    subtotal = Column(Numeric(10, 2), nullable=False, default=0)

    order = relationship("Order", back_populates="items")
    sub_order = relationship("VendorSubOrder", back_populates="items")


class OrderTimelineLog(Base):
    __tablename__ = "order_timeline_logs"

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String(50), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    sub_order_id = Column(String(50))
    actor_type = Column(String(50), nullable=False, default="SYSTEM")
    actor_name = Column(String(255), nullable=False, default="System Engine")
    event_name = Column(String(100), nullable=False)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    order = relationship("Order", back_populates="timeline_logs")


class InventoryReservation(Base):
    __tablename__ = "inventory_reservations"

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    product_id = Column(String(50), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    order_id = Column(String(50), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    sub_order_id = Column(String(50))
    reserved_quantity = Column(Integer, nullable=False)
    status = Column(String(50), nullable=False, default="RESERVED")
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    order = relationship("Order", back_populates="reservations")


class VendorSettlementLedger(Base):
    __tablename__ = "vendor_settlement_ledger"

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    vendor_id = Column(String(50), ForeignKey("vendors.id"), nullable=False)
    sub_order_id = Column(String(50), ForeignKey("vendor_sub_orders.id", ondelete="CASCADE"), nullable=False)
    gross_amount = Column(Numeric(10, 2), nullable=False)
    commission_amount = Column(Numeric(10, 2), nullable=False)
    fee_amount = Column(Numeric(10, 2), nullable=False, default=0)
    net_payable = Column(Numeric(10, 2), nullable=False)
    status = Column(String(50), nullable=False, default="PENDING")
    settled_at = Column(DateTime(timezone=True))
    payout_id = Column(String(50))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

