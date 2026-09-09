import os
import uuid
import shutil
from abc import ABC, abstractmethod
from fastapi import UploadFile, HTTPException
from PIL import Image, ImageOps

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".svg"}
MAX_FILE_SIZE = 15 * 1024 * 1024  # 15 MB allowed for raw upload prior to optimization
TARGET_IMAGE_SIZE = (800, 800)     # Standardized 1:1 square dimensions for DivineKart

class BaseStorageService(ABC):
    @abstractmethod
    async def upload_image(self, file: UploadFile, subfolder: str = "products") -> str:
        pass

class LocalStorageService(BaseStorageService):
    def __init__(self, base_dir: str = None, base_url: str = "http://localhost:8000"):
        if base_dir is None:
            # Resolves to app/images directory in backend-api
            app_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            base_dir = os.path.join(app_dir, "images")
        
        self.base_dir = base_dir
        self.base_url = base_url.rstrip("/")

        # Frontend public images directory for automatic dual-sync
        project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        self.frontend_images_dir = os.path.join(project_root, "frontend-web", "public", "images")

    def _optimize_and_resize_image(self, file_stream, output_path: str, target_size=TARGET_IMAGE_SIZE):
        """
        Resizes and optimizes the uploaded image file:
        - Auto-orients via EXIF data.
        - Converts color modes (RGBA, CMYK, Palette) to clean RGB.
        - Resizes while strictly preserving aspect ratio (no stretching/distortion).
        - Centers image onto an 800x800 square background.
        - Strips metadata and compresses to high-quality progressive JPEG (85% quality).
        """
        try:
            img = Image.open(file_stream)
            
            # Auto-orient based on EXIF tag
            try:
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass

            # Handle color channels & transparency
            if img.mode in ("RGBA", "LA", "P"):
                background = Image.new("RGB", img.size, (255, 255, 255))
                if img.mode == "RGBA":
                    background.paste(img, mask=img.split()[3])
                else:
                    rgba_img = img.convert("RGBA")
                    background.paste(rgba_img, mask=rgba_img.split()[3])
                img = background
            elif img.mode != "RGB":
                img = img.convert("RGB")

            # Scale down keeping aspect ratio intact
            img.thumbnail(target_size, Image.Resampling.LANCZOS)

            # Create clean 800x800 square canvas
            canvas = Image.new("RGB", target_size, (255, 255, 255))

            # Center image on canvas
            offset_x = (target_size[0] - img.width) // 2
            offset_y = (target_size[1] - img.height) // 2
            canvas.paste(img, (offset_x, offset_y))

            # Save optimized JPEG
            canvas.save(output_path, "JPEG", quality=85, optimize=True, progressive=True)
        except Exception as err:
            raise HTTPException(status_code=400, detail=f"Image processing failed: {str(err)}")

    async def upload_image(self, file: UploadFile, subfolder: str = "products") -> str:
        # Validate File Extension
        ext = os.path.splitext(file.filename)[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file extension '{ext}'. Allowed extensions: {', '.join(ALLOWED_EXTENSIONS)}"
            )

        # Validate Raw File Size
        file.file.seek(0, os.SEEK_END)
        file_size = file.file.tell()
        file.file.seek(0)

        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File size exceeds raw upload limit of 15MB. Provided size: {file_size / (1024 * 1024):.2f}MB"
            )

        # Ensure target backend subfolder exists
        target_dir = os.path.join(self.base_dir, subfolder)
        os.makedirs(target_dir, exist_ok=True)

        # Standardized output filename (.jpg)
        filename = f"prod_img_{uuid.uuid4().hex[:10]}.jpg"
        backend_file_path = os.path.join(target_dir, filename)

        # Perform Image Optimization and Resizing
        self._optimize_and_resize_image(file.file, backend_file_path)

        # Sync optimized image to frontend public directory if present
        frontend_target_dir = os.path.join(self.frontend_images_dir, subfolder)
        if os.path.exists(os.path.dirname(self.frontend_images_dir)):
            os.makedirs(frontend_target_dir, exist_ok=True)
            frontend_file_path = os.path.join(frontend_target_dir, filename)
            shutil.copyfile(backend_file_path, frontend_file_path)

        # Return consistent full served URL
        return f"{self.base_url}/images/{subfolder}/{filename}"

# Default Singleton Storage Service Instance
storage_service = LocalStorageService()
