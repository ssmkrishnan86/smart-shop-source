import sys
import os

# Add project root directory to sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# Ensure user site-packages are accessible
user_site = os.path.expanduser(r"~\AppData\Roaming\Python\Python314\site-packages")
if os.path.exists(user_site) and user_site not in sys.path:
    sys.path.insert(0, user_site)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.v1.router import api_v1_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Enterprise Multi-Vendor eCommerce Platform Backend API Layer for Customer Web, Vendor Portal, and Admin Portal",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Middleware allowing client portals. An explicit origin allow-list
# (rather than "*") is required for cookie-based auth: browsers refuse to
# honor allow_credentials=True together with a wildcard origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.SSO_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure images directory exists
images_dir = os.path.join(BASE_DIR, "app", "images")
os.makedirs(images_dir, exist_ok=True)

# Mount Static Files for serving local product images directly from backend-api
app.mount("/images", StaticFiles(directory=images_dir), name="images")

# Mount API v1 Routes
app.include_router(api_v1_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": "1.0.0",
        "database": "PostgreSQL (smartshop_db)",
        "storage": "Local Static File Storage (app/images/products/)"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
