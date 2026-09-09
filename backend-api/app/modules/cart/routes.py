from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.modules.cart.controller import CartController
from app.modules.cart.schemas import (
    CartItemAddSchema,
    CartItemUpdateSchema,
    CouponApplySchema,
)

router = APIRouter()


# ─── 1. Get full cart (with totals) ──────────────────────────────────────────
@router.get("/{user_id}", response_model=dict, summary="Get User Cart")
async def get_cart(user_id: str, db: AsyncSession = Depends(get_db)):
    """
    Retrieve the full cart for a user including all items and computed totals
    (subtotal, discount, GST, shipping, grand total).
    """
    data = await CartController.get_cart(db, user_id)
    return {"success": True, "message": "Cart retrieved successfully", "data": data}


# ─── 2. Get cart count (lightweight — for badge update) ──────────────────────
@router.get("/{user_id}/count", response_model=dict, summary="Get Cart Item Count")
async def get_cart_count(user_id: str, db: AsyncSession = Depends(get_db)):
    """Lightweight endpoint: returns only item count and total quantity."""
    data = await CartController.get_cart_count(db, user_id)
    return {"success": True, "message": "Cart count retrieved", "data": data}


# ─── 3. Add item to cart ──────────────────────────────────────────────────────
@router.post("/{user_id}/items", response_model=dict, summary="Add Item to Cart")
async def add_item_to_cart(user_id: str, item: CartItemAddSchema, db: AsyncSession = Depends(get_db)):
    """
    Add a product to the cart. If the product already exists, quantity is merged.
    Validates inventory availability before adding.
    """
    try:
        data = await CartController.add_item(db, user_id, item.model_dump())
        return {"success": True, "message": "Item added to cart", "data": data}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ─── 4. Update cart item quantity ─────────────────────────────────────────────
@router.put("/{user_id}/items/{item_id}", response_model=dict, summary="Update Cart Item Quantity")
async def update_cart_item(
    user_id: str, item_id: str, body: CartItemUpdateSchema, db: AsyncSession = Depends(get_db)
):
    """
    Update quantity of an existing cart item. Set quantity to 0 to remove.
    Validates stock before updating.
    """
    try:
        data = await CartController.update_item(db, user_id, item_id, body.quantity)
        return {"success": True, "message": "Cart item updated", "data": data}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ─── 5. Remove specific item from cart ───────────────────────────────────────
@router.delete("/{user_id}/items/{item_id}", response_model=dict, summary="Remove Cart Item")
async def remove_cart_item(user_id: str, item_id: str, db: AsyncSession = Depends(get_db)):
    """Remove a specific item from the cart by its item ID."""
    try:
        data = await CartController.remove_item(db, user_id, item_id)
        return {"success": True, "message": "Item removed from cart", "data": data}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


# ─── 6. Clear entire cart ─────────────────────────────────────────────────────
@router.delete("/{user_id}", response_model=dict, summary="Clear Cart")
async def clear_cart(user_id: str, db: AsyncSession = Depends(get_db)):
    """Remove all items from the cart and reset any applied coupon."""
    data = await CartController.clear_cart(db, user_id)
    return {"success": True, "message": "Cart cleared successfully", "data": data}


# ─── 7. Apply coupon code ─────────────────────────────────────────────────────
@router.post("/{user_id}/coupon", response_model=dict, summary="Apply Coupon Code")
async def apply_coupon(user_id: str, body: CouponApplySchema, db: AsyncSession = Depends(get_db)):
    """
    Validate and apply a coupon code to the cart.
    Valid codes: DIVINE10, SMART20, PROMO10, FEST30, WELCOME50
    """
    try:
        data = await CartController.apply_coupon(db, user_id, body.coupon_code)
        return {
            "success": True,
            "message": f"Coupon '{body.coupon_code.upper()}' applied successfully!",
            "data": data,
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ─── 8. Remove coupon code ────────────────────────────────────────────────────
@router.delete("/{user_id}/coupon", response_model=dict, summary="Remove Coupon Code")
async def remove_coupon(user_id: str, db: AsyncSession = Depends(get_db)):
    """Remove the currently applied coupon from the cart."""
    data = await CartController.remove_coupon(db, user_id)
    return {"success": True, "message": "Coupon removed", "data": data}
