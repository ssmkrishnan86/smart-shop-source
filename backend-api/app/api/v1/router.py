from fastapi import APIRouter
from app.modules.auth.routes import router as auth_router
from app.modules.products.routes import router as products_router
from app.modules.categories.routes import router as categories_router
from app.modules.vendors.routes import router as vendors_router
from app.modules.orders.routes import router as orders_router
from app.modules.payments.routes import router as payments_router
from app.modules.cart.routes import router as cart_router
from app.modules.addresses.routes import router as addresses_router
from app.modules.wishlist.routes import router as wishlist_router
from app.modules.notifications.routes import router as notifications_router
from app.modules.coupons.routes import router as coupons_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_v1_router.include_router(products_router, prefix="/products", tags=["Products"])
api_v1_router.include_router(categories_router, prefix="/categories", tags=["Categories"])
api_v1_router.include_router(vendors_router, prefix="/vendors", tags=["Vendors"])
api_v1_router.include_router(orders_router, prefix="/orders", tags=["Orders"])
api_v1_router.include_router(payments_router, prefix="/payments", tags=["Payments"])
api_v1_router.include_router(cart_router, prefix="/cart", tags=["Shopping Cart"])
api_v1_router.include_router(addresses_router, prefix="/addresses", tags=["Addresses"])
api_v1_router.include_router(wishlist_router, prefix="/wishlist", tags=["Wishlist"])
api_v1_router.include_router(notifications_router, prefix="/notifications", tags=["Notifications"])
api_v1_router.include_router(coupons_router, prefix="/coupons", tags=["Coupons"])


