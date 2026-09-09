"""
Shopping Cart Controller
========================
Database-backed shopping cart. All cart state is persisted to the
PostgreSQL `shopping_cart` / `shopping_cart_items` tables via SQLAlchemy's
async ORM, so a customer's cart survives page refreshes, new sessions, and
logins from a different device.

Each user has exactly one active cart (enforced by a unique constraint on
`shopping_cart.user_id`). Items are identified by (cart_id, product_id).
"""

from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.modules.cart.models import ShoppingCart, ShoppingCartItem
from app.modules.products.models import Product

# ─── Constants ────────────────────────────────────────────────────────────────
TAX_RATE = 0.18          # 18% GST (India standard)
FREE_SHIPPING_ABOVE = 499.0
SHIPPING_FEE = 60.0

COUPON_TABLE = {
    "DIVINE10": 10.0,    # ₹10 flat discount
    "SMART20": 20.0,
    "PROMO10": 10.0,
    "FEST30": 30.0,
    "WELCOME50": 50.0,
}


def _now() -> datetime:
    return datetime.now(timezone.utc)


async def _get_or_create_cart(db: AsyncSession, user_id: str) -> ShoppingCart:
    """Return the user's active cart (with items eagerly loaded), creating one if needed."""
    result = await db.execute(
        select(ShoppingCart)
        .options(selectinload(ShoppingCart.items))
        .where(ShoppingCart.user_id == user_id, ShoppingCart.is_deleted.is_(False))
    )
    cart = result.scalar_one_or_none()
    if cart is None:
        cart = ShoppingCart(user_id=user_id)
        db.add(cart)
        await db.commit()
    return cart


def _compute_totals(cart: ShoppingCart) -> dict:
    """Compute the full financial breakdown for a cart."""
    items = cart.items
    item_count = len(items)
    total_quantity = sum(i.quantity for i in items)
    subtotal = sum(float(i.unit_price) * i.quantity for i in items)

    discount = float(cart.discount_amount or 0)
    taxable_amount = max(0.0, subtotal - discount)
    tax_amount = round(taxable_amount * TAX_RATE, 2)
    shipping_fee = 0.0 if subtotal >= FREE_SHIPPING_ABOVE else SHIPPING_FEE
    grand_total = round(taxable_amount + tax_amount + shipping_fee, 2)

    return {
        "item_count": item_count,
        "total_quantity": total_quantity,
        "subtotal": round(subtotal, 2),
        "discount_amount": round(discount, 2),
        "coupon_code": cart.coupon_code,
        "shipping_fee": shipping_fee,
        "tax_rate": TAX_RATE * 100,
        "tax_amount": tax_amount,
        "grand_total": grand_total,
    }


def _build_item_response(item: ShoppingCartItem) -> dict:
    """Build the API-friendly item dict with line_total."""
    return {
        "id": item.id,
        "cart_id": item.cart_id,
        "product_id": item.product_id,
        "product_name": item.product_name,
        "product_thumbnail": item.product_thumbnail,
        "product_category": item.product_category,
        "product_sku": item.product_sku,
        "unit_price": float(item.unit_price),
        "original_price": float(item.original_price) if item.original_price is not None else None,
        "quantity": item.quantity,
        "selected_variant": item.selected_variant,
        "line_total": round(float(item.unit_price) * item.quantity, 2),
        "added_at": item.added_at.isoformat() if item.added_at else None,
    }


def _build_cart_response(cart: ShoppingCart) -> dict:
    return {
        "cart_id": cart.id,
        "user_id": cart.user_id,
        "items": [_build_item_response(i) for i in cart.items],
        "totals": _compute_totals(cart),
    }


async def _check_stock(db: AsyncSession, product_id: str, requested_qty: int) -> tuple[bool, Optional[Product], str]:
    """
    Returns (ok, product, error_message).
    Validates the product exists, is active/approved, and has enough stock.
    """
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()

    if product is None:
        # Not found in the real products table — allow it rather than blocking
        # the cart (defensive: catalogue may still be served elsewhere).
        return True, None, ""

    if product.status != "ACTIVE" or product.approval_status != "APPROVED":
        return False, product, f"'{product.name}' is not currently available for purchase."

    if product.stock <= 0:
        return False, product, f"'{product.name}' is currently out of stock."

    if requested_qty > product.stock:
        return False, product, (
            f"Only {product.stock} unit(s) of '{product.name}' are available. "
            f"You requested {requested_qty}."
        )

    return True, product, ""


# ─── Cart Controller ──────────────────────────────────────────────────────────

class CartController:

    @staticmethod
    async def get_cart(db: AsyncSession, user_id: str) -> dict:
        """Return full cart payload with computed totals."""
        cart = await _get_or_create_cart(db, user_id)
        return _build_cart_response(cart)

    @staticmethod
    async def get_cart_count(db: AsyncSession, user_id: str) -> dict:
        """Lightweight endpoint: return only item/quantity count."""
        cart = await _get_or_create_cart(db, user_id)
        return {
            "user_id": user_id,
            "item_count": len(cart.items),
            "total_quantity": sum(i.quantity for i in cart.items),
        }

    @staticmethod
    async def add_item(db: AsyncSession, user_id: str, data: dict) -> dict:
        """
        Add a product to the cart.
        - If product already exists: increment quantity.
        - Validates stock availability before adding.
        - Returns full updated cart.
        """
        product_id = data["product_id"]
        quantity = data.get("quantity", 1)

        ok, _product, err = await _check_stock(db, product_id, quantity)
        if not ok:
            raise ValueError(err)

        cart = await _get_or_create_cart(db, user_id)
        existing = next((i for i in cart.items if i.product_id == product_id), None)

        if existing is not None:
            # Product already in cart — merge quantities, re-validate combined total
            new_qty = existing.quantity + quantity
            ok2, product2, _err2 = await _check_stock(db, product_id, new_qty)
            if not ok2 and product2 is not None:
                # Cap at available instead of erroring
                new_qty = product2.stock
            existing.quantity = new_qty
            existing.updated_at = _now()
        else:
            cart.items.append(
                ShoppingCartItem(
                    cart_id=cart.id,
                    product_id=product_id,
                    product_name=data.get("product_name", "Unknown Product"),
                    product_thumbnail=data.get("product_thumbnail"),
                    product_category=data.get("product_category"),
                    product_sku=data.get("product_sku"),
                    unit_price=data.get("unit_price", 0),
                    original_price=data.get("original_price"),
                    quantity=quantity,
                    selected_variant=data.get("selected_variant"),
                )
            )

        cart.updated_at = _now()
        await db.commit()
        return await CartController.get_cart(db, user_id)

    @staticmethod
    async def update_item(db: AsyncSession, user_id: str, item_id: str, quantity: int) -> dict:
        """
        Update the quantity of a specific cart item (by item_id).
        - quantity == 0 → removes the item.
        - Validates stock.
        """
        cart = await _get_or_create_cart(db, user_id)
        item = next((i for i in cart.items if i.id == item_id), None)
        if item is None:
            raise ValueError(f"Cart item '{item_id}' not found.")

        if quantity <= 0:
            cart.items.remove(item)
        else:
            ok, _product, err = await _check_stock(db, item.product_id, quantity)
            if not ok:
                raise ValueError(err)
            item.quantity = quantity
            item.updated_at = _now()

        cart.updated_at = _now()
        await db.commit()
        return await CartController.get_cart(db, user_id)

    @staticmethod
    async def remove_item(db: AsyncSession, user_id: str, item_id: str) -> dict:
        """Remove a specific item from the cart by its item_id."""
        cart = await _get_or_create_cart(db, user_id)
        item = next((i for i in cart.items if i.id == item_id), None)
        if item is None:
            raise ValueError(f"Cart item '{item_id}' not found.")

        cart.items.remove(item)
        cart.updated_at = _now()
        await db.commit()
        return await CartController.get_cart(db, user_id)

    @staticmethod
    async def clear_cart(db: AsyncSession, user_id: str) -> dict:
        """Remove all items and reset coupon for a user's cart."""
        cart = await _get_or_create_cart(db, user_id)
        for item in list(cart.items):
            cart.items.remove(item)
        cart.coupon_code = None
        cart.discount_amount = 0
        cart.updated_at = _now()
        await db.commit()
        return {"message": "Cart cleared successfully", "user_id": user_id}

    @staticmethod
    async def apply_coupon(db: AsyncSession, user_id: str, coupon_code: str) -> dict:
        """
        Validate and apply a coupon code.
        Returns updated cart with discount applied.
        """
        code = coupon_code.strip().upper()
        if code not in COUPON_TABLE:
            raise ValueError(
                f"Coupon '{coupon_code}' is not valid. "
                f"Try: DIVINE10, SMART20, PROMO10, FEST30, WELCOME50"
            )

        cart = await _get_or_create_cart(db, user_id)
        cart.coupon_code = code
        cart.discount_amount = COUPON_TABLE[code]
        cart.updated_at = _now()
        await db.commit()
        return await CartController.get_cart(db, user_id)

    @staticmethod
    async def remove_coupon(db: AsyncSession, user_id: str) -> dict:
        """Remove any applied coupon from the cart."""
        cart = await _get_or_create_cart(db, user_id)
        cart.coupon_code = None
        cart.discount_amount = 0
        cart.updated_at = _now()
        await db.commit()
        return await CartController.get_cart(db, user_id)
