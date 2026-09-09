from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.products.models import Product
from app.modules.wishlist.models import WishlistItem


class WishlistController:

    @staticmethod
    async def list_wishlist(db: AsyncSession, user_id: str) -> list[dict]:
        result = await db.execute(
            select(WishlistItem, Product)
            .outerjoin(Product, Product.id == WishlistItem.product_id)
            .where(WishlistItem.user_id == user_id)
            .order_by(WishlistItem.added_at.desc())
        )
        items = []
        for wishlist_item, product in result.all():
            items.append(
                {
                    "id": wishlist_item.id,
                    "product_id": wishlist_item.product_id,
                    "added_at": wishlist_item.added_at,
                    "product_name": product.name if product else None,
                    "product_thumbnail": product.thumbnail if product else None,
                    "product_price": float(product.price) if product else None,
                    "product_original_price": (
                        float(product.original_price) if product and product.original_price is not None else None
                    ),
                    "product_category": product.category if product else None,
                    "product_stock": product.stock if product else None,
                }
            )
        return items

    @staticmethod
    async def add_item(db: AsyncSession, user_id: str, product_id: str) -> None:
        existing = await db.execute(
            select(WishlistItem).where(WishlistItem.user_id == user_id, WishlistItem.product_id == product_id)
        )
        if existing.scalar_one_or_none() is not None:
            return  # already wishlisted — idempotent
        db.add(WishlistItem(user_id=user_id, product_id=product_id))
        await db.commit()

    @staticmethod
    async def remove_item(db: AsyncSession, user_id: str, product_id: str) -> None:
        result = await db.execute(
            select(WishlistItem).where(WishlistItem.user_id == user_id, WishlistItem.product_id == product_id)
        )
        item = result.scalar_one_or_none()
        if item is None:
            raise ValueError("Item not found in wishlist.")
        await db.delete(item)
        await db.commit()
