import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.modules.addresses.models import Address
from app.modules.auth.models import User
from app.modules.cart.controller import CartController
from app.modules.notifications.models import Notification
from app.modules.orders.models import (
    Order,
    VendorSubOrder,
    OrderItem,
    OrderTimelineLog,
    InventoryReservation,
    VendorSettlementLedger,
)
from app.modules.products.models import Product
from app.modules.vendors.models import Vendor


def _timeline_dict(log: OrderTimelineLog) -> dict:
    return {
        "id": log.id,
        "sub_order_id": log.sub_order_id,
        "actor_type": log.actor_type,
        "actor_name": log.actor_name,
        "event_name": log.event_name,
        "description": log.description,
        "created_at": log.created_at.isoformat() if log.created_at else None,
    }


def _order_item_dict(item: OrderItem) -> dict:
    return {
        "id": item.id,
        "order_id": item.order_id,
        "sub_order_id": item.sub_order_id,
        "vendor_id": item.vendor_id,
        "product_id": item.product_id,
        "product_name": item.product_name,
        "product_image": item.product_image,
        "price": float(item.price),
        "quantity": item.quantity,
        "subtotal": float(item.subtotal or (item.price * item.quantity)),
    }


def _sub_order_dict(sub: VendorSubOrder) -> dict:
    return {
        "id": sub.id,
        "parent_order_id": sub.parent_order_id,
        "sub_order_number": sub.sub_order_number,
        "vendor_id": sub.vendor_id,
        "vendor_name": sub.vendor_name,
        "vendor_status": sub.vendor_status,
        "fulfillment_status": sub.fulfillment_status,
        "shipment_status": sub.shipment_status,
        "subtotal": float(sub.subtotal or 0),
        "discount": float(sub.discount or 0),
        "shipping_fee": float(sub.shipping_fee or 0),
        "tax": float(sub.tax or 0),
        "total": float(sub.total or 0),
        "courier_partner": sub.courier_partner,
        "tracking_number": sub.tracking_number,
        "pickup_date": sub.pickup_date.isoformat() if sub.pickup_date else None,
        "shipped_date": sub.shipped_date.isoformat() if sub.shipped_date else None,
        "estimated_delivery_date": sub.estimated_delivery_date.isoformat() if sub.estimated_delivery_date else None,
        "delivered_at": sub.delivered_at.isoformat() if sub.delivered_at else None,
        "cancellation_reason": sub.cancellation_reason,
        "return_reason": sub.return_reason,
        "commission_rate": float(sub.commission_rate or 8.0),
        "platform_commission": float(sub.platform_commission or 0),
        "applicable_fees": float(sub.applicable_fees or 0),
        "vendor_payable_amount": float(sub.vendor_payable_amount or 0),
        "settlement_status": sub.settlement_status,
        "return_window_closes_at": sub.return_window_closes_at.isoformat() if sub.return_window_closes_at else None,
        "created_at": sub.created_at.isoformat() if sub.created_at else None,
        "items": [_order_item_dict(i) for i in (sub.items or [])],
    }


def _order_dict(order: Order) -> dict:
    return {
        "id": order.id,
        "order_number": order.order_number,
        "user_id": order.user_id,
        "customer_name": order.customer_name,
        "customer_email": order.customer_email,
        "customer_phone": order.customer_phone,
        "shipping_address": {
            "street": order.street,
            "city": order.city,
            "state": order.state,
            "zip_code": order.zip_code,
        },
        "order_status": order.order_status,
        "status": order.order_status,  # backward compatibility alias
        "payment_status": order.payment_status,
        "fulfillment_status": order.fulfillment_status,
        "shipment_status": order.shipment_status,
        "return_status": order.return_status,
        "refund_status": order.refund_status,
        "payment_method": order.payment_method,
        "payment_gateway_ref": order.payment_gateway_ref,
        "subtotal": float(order.subtotal or 0),
        "discount": float(order.discount or 0),
        "shipping_fee": float(order.shipping_fee or 0),
        "tax": float(order.tax or 0),
        "total": float(order.total or 0),
        "tracking_number": order.tracking_number,
        "courier_partner": order.courier_partner,
        "created_at": order.created_at.isoformat() if order.created_at else None,
        "sub_orders": [_sub_order_dict(s) for s in (order.sub_orders or [])],
        "items": [_order_item_dict(i) for i in (order.items or [])],
        "timeline_logs": [_timeline_dict(t) for t in (order.timeline_logs or [])],
    }


class OrderController:
    @staticmethod
    async def list_orders(
        db: AsyncSession,
        user_id: str,
        page: int = 1,
        limit: int = 10,
        status: Optional[str] = None,
        sort: str = "-created_at",
    ) -> dict:
        query = (
            select(Order)
            .options(
                selectinload(Order.items),
                selectinload(Order.sub_orders).selectinload(VendorSubOrder.items),
                selectinload(Order.timeline_logs),
            )
            .where(Order.user_id == user_id, Order.is_deleted.is_(False))
        )
        if status:
            query = query.where(Order.order_status == status)

        if sort == "-created_at":
            query = query.order_by(Order.created_at.desc())
        else:
            query = query.order_by(Order.created_at.desc())

        result = await db.execute(query)
        orders = result.scalars().all()
        return {
            "orders": [_order_dict(o) for o in orders],
            "total": len(orders),
            "page": page,
            "limit": limit,
        }

    @staticmethod
    async def get_order(db: AsyncSession, user_id: str, order_id: str) -> dict:
        result = await db.execute(
            select(Order)
            .options(
                selectinload(Order.items),
                selectinload(Order.sub_orders).selectinload(VendorSubOrder.items),
                selectinload(Order.timeline_logs),
            )
            .where(
                Order.id == order_id,
                Order.user_id == user_id,
                Order.is_deleted.is_(False),
            )
        )
        order = result.scalar_one_or_none()
        if order is None:
            raise ValueError("Order not found.")
        return _order_dict(order)

    @staticmethod
    async def create_order_from_cart(db: AsyncSession, user: User, payload) -> dict:
        cart_data = await CartController.get_cart(db, user.id)
        if not cart_data["items"]:
            raise ValueError("Your cart is empty.")

        # Resolve Shipping Address
        if payload.address_id:
            result = await db.execute(
                select(Address).where(
                    Address.id == payload.address_id, Address.user_id == user.id, Address.is_deleted.is_(False)
                )
            )
            addr = result.scalar_one_or_none()
            if addr is None:
                raise ValueError("Selected address not found.")
            full_name, phone = addr.full_name, addr.phone
            street, city, state, zip_code = addr.street, addr.city, addr.state, addr.zip_code
        else:
            if not all([payload.street, payload.city, payload.state, payload.zip_code, payload.phone]):
                raise ValueError("A shipping address (or saved address_id) is required.")
            full_name = payload.full_name or f"{user.first_name} {user.last_name}"
            phone, street, city, state, zip_code = (
                payload.phone, payload.street, payload.city, payload.state, payload.zip_code,
            )

        totals = cart_data["totals"]
        now_dt = datetime.now(timezone.utc)
        order_num = f"DK{now_dt.year}{uuid.uuid4().hex[:6].upper()}"

        # Parent Order Record
        order = Order(
            order_number=order_num,
            user_id=user.id,
            customer_name=full_name,
            customer_email=user.email,
            customer_phone=phone,
            street=street,
            city=city,
            state=state,
            zip_code=zip_code,
            order_status="CONFIRMED",
            status="CONFIRMED",
            payment_status="PAID",
            fulfillment_status="UNFULFILLED",
            shipment_status="NOT_SHIPPED",
            return_status="NONE",
            refund_status="NONE",
            payment_method=payload.payment_method or "UPI",
            payment_gateway_ref=f"PG_TXN_{uuid.uuid4().hex[:10].upper()}",
            subtotal=totals["subtotal"],
            discount=totals["discount_amount"],
            shipping_fee=totals["shipping_fee"],
            tax=totals.get("tax_amount", 0),
            total=totals["grand_total"],
        )
        db.add(order)
        await db.flush()

        # Group Cart Items by Vendor ID
        vendor_items_map = {}
        default_vendor_res = await db.execute(select(Vendor).limit(1))
        default_vendor = default_vendor_res.scalar_one_or_none()
        def_v_id = default_vendor.id if default_vendor else "ven_1"
        def_v_name = default_vendor.name if default_vendor else "Vedic Crafts Heritage"

        for item in cart_data["items"]:
            raw_prod_id = item.get("product_id")
            product = None
            if raw_prod_id:
                p_check = await db.execute(select(Product).where(Product.id == raw_prod_id))
                product = p_check.scalar_one_or_none()

            if product:
                v_id = product.vendor_id or def_v_id
                v_name = product.vendor_name or def_v_name
            else:
                v_id = def_v_id
                v_name = def_v_name

            if v_id not in vendor_items_map:
                vendor_items_map[v_id] = {"vendor_name": v_name, "items": []}
            vendor_items_map[v_id]["items"].append((item, product))

        # Create Vendor Sub-Orders & Order Items + Reserve Inventory
        sub_order_index = 1
        for v_id, v_data in vendor_items_map.items():
            sub_num = f"{order_num}-V{sub_order_index}"
            sub_order_index += 1
            v_name = v_data["vendor_name"]

            # Calculate Sub-order totals
            v_subtotal = sum(float(i[0]["unit_price"]) * i[0]["quantity"] for i in v_data["items"])
            v_tax = round(v_subtotal * 0.18, 2)
            v_shipping = 0.0 if v_subtotal >= 499 else 60.0
            v_total = round(v_subtotal + v_tax + v_shipping, 2)

            # Commission lookup
            v_res = await db.execute(select(Vendor).where(Vendor.id == v_id))
            vendor_obj = v_res.scalar_one_or_none()
            comm_rate = float(vendor_obj.commission_rate) if vendor_obj and vendor_obj.commission_rate else 8.00
            platform_comm = round(v_subtotal * (comm_rate / 100.0), 2)
            vendor_payable = round(v_subtotal - platform_comm, 2)

            sub_order = VendorSubOrder(
                parent_order_id=order.id,
                sub_order_number=sub_num,
                vendor_id=v_id,
                vendor_name=v_name,
                vendor_status="NEW",
                fulfillment_status="UNFULFILLED",
                shipment_status="NOT_SHIPPED",
                subtotal=v_subtotal,
                discount=0,
                shipping_fee=v_shipping,
                tax=v_tax,
                total=v_total,
                commission_rate=comm_rate,
                platform_commission=platform_comm,
                applicable_fees=0,
                vendor_payable_amount=vendor_payable,
                settlement_status="PENDING",
            )
            db.add(sub_order)
            await db.flush()

            for item_dict, product_obj in v_data["items"]:
                valid_prod_id = product_obj.id if product_obj else None
                unit_price = float(item_dict["unit_price"])
                qty = item_dict["quantity"]
                item_subtotal = round(unit_price * qty, 2)

                order_item = OrderItem(
                    order_id=order.id,
                    sub_order_id=sub_order.id,
                    vendor_id=v_id,
                    product_id=valid_prod_id,
                    product_name=item_dict["product_name"],
                    product_image=item_dict.get("product_thumbnail"),
                    price=unit_price,
                    quantity=qty,
                    subtotal=item_subtotal,
                )
                db.add(order_item)

                # Inventory Reservation Logic
                if valid_prod_id:
                    res_record = InventoryReservation(
                        product_id=valid_prod_id,
                        order_id=order.id,
                        sub_order_id=sub_order.id,
                        reserved_quantity=qty,
                        status="RESERVED",
                    )
                    db.add(res_record)

                    if product_obj and product_obj.stock >= qty:
                        product_obj.stock -= qty

            # Timeline Log for Vendor Notification
            db.add(
                OrderTimelineLog(
                    order_id=order.id,
                    sub_order_id=sub_order.id,
                    actor_type="SYSTEM",
                    actor_name="Order Service",
                    event_name="Vendor Notified",
                    description=f"Sub-order #{sub_num} allocated to {v_name} with {len(v_data['items'])} product(s).",
                )
            )

        # Initial Order Timeline Audit Logs
        db.add(
            OrderTimelineLog(
                order_id=order.id,
                actor_type="CUSTOMER",
                actor_name=full_name,
                event_name="Order Placed",
                description=f"Customer placed order #{order_num} for total ₹{totals['grand_total']}.",
            )
        )
        db.add(
            OrderTimelineLog(
                order_id=order.id,
                actor_type="SYSTEM",
                actor_name="Payment Gateway",
                event_name="Payment Confirmed",
                description=f"Payment verified successfully via {payload.payment_method or 'UPI'}. Ref: {order.payment_gateway_ref}",
            )
        )
        db.add(
            OrderTimelineLog(
                order_id=order.id,
                actor_type="SYSTEM",
                actor_name="Inventory Engine",
                event_name="Inventory Reserved",
                description="Stock quantities reserved across vendor warehouses.",
            )
        )

        # Generate Notifications
        db.add(
            Notification(
                user_id=user.id,
                title="Order Placed Successfully",
                message=f"Your order #{order_num} has been confirmed. Vendor sub-orders are being processed.",
                type="ORDER",
                link=f"/account/orders/{order.id}",
            )
        )

        await db.commit()
        await CartController.clear_cart(db, user.id)
        return await OrderController.get_order(db, user.id, order.id)

    @staticmethod
    async def list_vendor_sub_orders(db: AsyncSession, vendor_id: str, status: Optional[str] = None) -> list[dict]:
        query = (
            select(VendorSubOrder)
            .options(
                selectinload(VendorSubOrder.items),
                selectinload(VendorSubOrder.parent_order),
            )
            .where(VendorSubOrder.vendor_id == vendor_id)
            .order_by(VendorSubOrder.created_at.desc())
        )
        if status:
            query = query.where(VendorSubOrder.vendor_status == status)

        result = await db.execute(query)
        sub_orders = result.scalars().all()
        return [_sub_order_dict(s) for s in sub_orders]

    @staticmethod
    async def update_vendor_sub_order_status(
        db: AsyncSession,
        vendor_id: str,
        sub_order_id: str,
        new_status: str,
        courier_partner: Optional[str] = None,
        tracking_number: Optional[str] = None,
        estimated_delivery_days: int = 4,
    ) -> dict:
        result = await db.execute(
            select(VendorSubOrder)
            .options(
                selectinload(VendorSubOrder.items),
                selectinload(VendorSubOrder.parent_order).selectinload(Order.sub_orders),
            )
            .where(VendorSubOrder.id == sub_order_id, VendorSubOrder.vendor_id == vendor_id)
        )
        sub_order = result.scalar_one_or_none()
        if not sub_order:
            raise ValueError("Vendor sub-order not found or unauthorized.")

        old_status = sub_order.vendor_status
        sub_order.vendor_status = new_status
        sub_order.updated_at = datetime.now(timezone.utc)

        # Status logic mappings
        if new_status == "ACCEPTED":
            sub_order.fulfillment_status = "PROCESSING"
            event_name = "Vendor Accepted"
            desc = f"{sub_order.vendor_name} accepted sub-order #{sub_order.sub_order_number} for processing."
        elif new_status == "PACKED":
            sub_order.fulfillment_status = "PACKED"
            event_name = "Order Packed"
            desc = f"{sub_order.vendor_name} packed sub-order #{sub_order.sub_order_number} and generated packing slip."
        elif new_status == "SHIPPED":
            sub_order.fulfillment_status = "FULFILLED"
            sub_order.shipment_status = "SHIPPED"
            sub_order.courier_partner = courier_partner or "BlueDart Express"
            sub_order.tracking_number = tracking_number or f"BD-{uuid.uuid4().hex[:8].upper()}"
            sub_order.shipped_date = datetime.now(timezone.utc)
            sub_order.estimated_delivery_date = datetime.now(timezone.utc) + timedelta(days=estimated_delivery_days)
            event_name = "Order Shipped"
            desc = f"{sub_order.vendor_name} shipped sub-order #{sub_order.sub_order_number} via {sub_order.courier_partner} (AWB: {sub_order.tracking_number})."
        elif new_status == "DELIVERED":
            sub_order.fulfillment_status = "FULFILLED"
            sub_order.shipment_status = "DELIVERED"
            sub_order.delivered_at = datetime.now(timezone.utc)
            sub_order.return_window_closes_at = datetime.now(timezone.utc) + timedelta(days=7)
            event_name = "Order Delivered"
            desc = f"Sub-order #{sub_order.sub_order_number} delivered to customer. 7-day return window started."
        else:
            event_name = f"Status: {new_status}"
            desc = f"Sub-order status updated from {old_status} to {new_status}."

        # Audit Timeline Log
        db.add(
            OrderTimelineLog(
                order_id=sub_order.parent_order_id,
                sub_order_id=sub_order.id,
                actor_type="VENDOR",
                actor_name=sub_order.vendor_name,
                event_name=event_name,
                description=desc,
            )
        )

        # Recalculate Parent Order Status
        parent = sub_order.parent_order
        if parent and parent.sub_orders:
            all_statuses = [s.vendor_status for s in parent.sub_orders]
            if all(st == "DELIVERED" for st in all_statuses):
                parent.order_status = "DELIVERED"
                parent.status = "DELIVERED"
                parent.shipment_status = "DELIVERED"
                parent.fulfillment_status = "FULFILLED"
            elif any(st in ["SHIPPED", "DELIVERED"] for st in all_statuses):
                parent.order_status = "PARTIALLY_SHIPPED" if not all(st == "SHIPPED" for st in all_statuses) else "SHIPPED"
                parent.status = parent.order_status
                parent.shipment_status = "SHIPPED"
            elif any(st in ["PACKED", "PROCESSING"] for st in all_statuses):
                parent.order_status = "PROCESSING"
                parent.status = "PROCESSING"
                parent.fulfillment_status = "PROCESSING"

        await db.commit()
        return _sub_order_dict(sub_order)

    @staticmethod
    async def cancel_order(db: AsyncSession, user_id: str, order_id: str, reason: str = "Customer requested cancellation") -> dict:
        result = await db.execute(
            select(Order)
            .options(
                selectinload(Order.items),
                selectinload(Order.sub_orders),
                selectinload(Order.reservations),
            )
            .where(Order.id == order_id, Order.user_id == user_id)
        )
        order = result.scalar_one_or_none()
        if not order:
            raise ValueError("Order not found.")

        if order.order_status in ["SHIPPED", "DELIVERED", "COMPLETED"]:
            raise ValueError("Order cannot be cancelled after shipment. Please initiate a return instead.")

        order.order_status = "CANCELLED"
        order.status = "CANCELLED"
        order.fulfillment_status = "CANCELLED"
        order.refund_status = "INITIATED"

        # Release stock back to products
        for res_rec in (order.reservations or []):
            if res_rec.status == "RESERVED":
                res_rec.status = "RELEASED"
                prod_check = await db.execute(select(Product).where(Product.id == res_rec.product_id))
                prod = prod_check.scalar_one_or_none()
                if prod:
                    prod.stock += res_rec.reserved_quantity

        for sub in (order.sub_orders or []):
            sub.vendor_status = "CANCELLED"
            sub.fulfillment_status = "CANCELLED"
            sub.cancellation_reason = reason

        db.add(
            OrderTimelineLog(
                order_id=order.id,
                actor_type="CUSTOMER",
                actor_name=order.customer_name,
                event_name="Order Cancelled",
                description=f"Order cancelled by customer. Reason: {reason}. Stock released to inventory.",
            )
        )

        await db.commit()
        return await OrderController.get_order(db, user_id, order.id)

    @staticmethod
    async def admin_list_orders(
        db: AsyncSession,
        page: int = 1,
        limit: int = 20,
        order_status: Optional[str] = None,
        payment_status: Optional[str] = None,
    ) -> dict:
        query = select(Order).options(
            selectinload(Order.items),
            selectinload(Order.sub_orders).selectinload(VendorSubOrder.items),
            selectinload(Order.timeline_logs),
        ).where(Order.is_deleted.is_(False))

        if order_status:
            query = query.where(Order.order_status == order_status)
        if payment_status:
            query = query.where(Order.payment_status == payment_status)

        query = query.order_by(Order.created_at.desc())
        result = await db.execute(query)
        orders = result.scalars().all()

        return {
            "orders": [_order_dict(o) for o in orders],
            "total": len(orders),
            "page": page,
            "limit": limit,
        }

    @staticmethod
    async def list_vendor_returns(db: AsyncSession, vendor_id: str) -> list[dict]:
        query = (
            select(VendorSubOrder)
            .options(
                selectinload(VendorSubOrder.items),
                selectinload(VendorSubOrder.parent_order),
            )
            .where(VendorSubOrder.vendor_id == vendor_id)
            .order_by(VendorSubOrder.updated_at.desc())
        )
        result = await db.execute(query)
        sub_orders = result.scalars().all()

        returns_list = []
        for s in sub_orders:
            is_return = s.vendor_status in ["RETURN_REQUESTED", "RETURN_APPROVED", "RETURN_REJECTED"] or bool(s.return_reason)
            if not is_return:
                continue
            
            status = "PENDING_REVIEW"
            if s.vendor_status == "RETURN_APPROVED":
                status = "APPROVED"
            elif s.vendor_status == "RETURN_REJECTED":
                status = "REJECTED"

            returns_list.append({
                "id": s.id,
                "return_id": f"RET-{s.id[:6].upper()}",
                "sub_order_id": s.id,
                "order_number": s.parent_order.order_number if s.parent_order else s.sub_order_number,
                "customer_name": s.parent_order.customer_name if s.parent_order else "Customer",
                "customer_email": s.parent_order.customer_email if s.parent_order else "",
                "item_name": s.items[0].product_name if s.items else "Product Item",
                "item_image": s.items[0].product_image if s.items else None,
                "amount": float(s.total or 0),
                "reason": s.return_reason or "Product color/size variance claim",
                "status": status,
                "created_at": s.created_at.isoformat() if s.created_at else None,
                "rejection_reason": s.cancellation_reason if s.vendor_status == "RETURN_REJECTED" else None,
            })
        return returns_list

    @staticmethod
    async def process_vendor_return_action(
        db: AsyncSession, vendor_id: str, return_id: str, action: str, rejection_reason: Optional[str] = None
    ) -> dict:
        result = await db.execute(
            select(VendorSubOrder)
            .options(
                selectinload(VendorSubOrder.items),
                selectinload(VendorSubOrder.parent_order),
            )
            .where(VendorSubOrder.id == return_id, VendorSubOrder.vendor_id == vendor_id)
        )
        sub_order = result.scalar_one_or_none()
        if not sub_order:
            # Fallback lookup by ID alone if vendor matching fails in dev
            sub_res = await db.execute(
                select(VendorSubOrder)
                .options(
                    selectinload(VendorSubOrder.items),
                    selectinload(VendorSubOrder.parent_order),
                )
                .where(VendorSubOrder.id == return_id)
            )
            sub_order = sub_res.scalar_one_or_none()

        if not sub_order:
            raise ValueError("Return claim request not found.")

        act = action.upper()
        if act == "APPROVE":
            sub_order.vendor_status = "RETURN_APPROVED"
            sub_order.fulfillment_status = "RETURNED"
            if sub_order.parent_order:
                sub_order.parent_order.return_status = "APPROVED"
                sub_order.parent_order.refund_status = "PROCESSED"
            event_name = "Return Approved"
            desc = f"Vendor approved return & refund of ₹{sub_order.total} for sub-order #{sub_order.sub_order_number}."
        else:
            sub_order.vendor_status = "RETURN_REJECTED"
            sub_order.cancellation_reason = rejection_reason or "Inspection condition check failed."
            if sub_order.parent_order:
                sub_order.parent_order.return_status = "REJECTED"
            event_name = "Return Rejected"
            desc = f"Vendor rejected return for sub-order #{sub_order.sub_order_number}. Reason: {sub_order.cancellation_reason}."

        db.add(
            OrderTimelineLog(
                order_id=sub_order.parent_order_id,
                sub_order_id=sub_order.id,
                actor_type="VENDOR",
                actor_name=sub_order.vendor_name,
                event_name=event_name,
                description=desc,
            )
        )
        await db.commit()
        return {
            "id": sub_order.id,
            "return_id": f"RET-{sub_order.id[:6].upper()}",
            "status": "APPROVED" if act == "APPROVE" else "REJECTED",
            "action": act,
            "sub_order_number": sub_order.sub_order_number,
        }

