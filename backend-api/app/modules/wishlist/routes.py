from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.database.session import get_db
from app.modules.auth.models import User
from app.modules.wishlist.controller import WishlistController
from app.modules.wishlist.schemas import WishlistAddSchema

router = APIRouter()


@router.get("/", response_model=dict, summary="Get my wishlist")
async def get_wishlist(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    items = await WishlistController.list_wishlist(db, current_user.id)
    return {"success": True, "message": "Wishlist retrieved", "data": items}


@router.post("/", response_model=dict, summary="Add product to wishlist")
async def add_to_wishlist(
    payload: WishlistAddSchema, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    await WishlistController.add_item(db, current_user.id, payload.product_id)
    items = await WishlistController.list_wishlist(db, current_user.id)
    return {"success": True, "message": "Added to wishlist", "data": items}


@router.delete("/{product_id}", response_model=dict, summary="Remove product from wishlist")
async def remove_from_wishlist(
    product_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    try:
        await WishlistController.remove_item(db, current_user.id, product_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    items = await WishlistController.list_wishlist(db, current_user.id)
    return {"success": True, "message": "Removed from wishlist", "data": items}
