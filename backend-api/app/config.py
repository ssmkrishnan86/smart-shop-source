from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartShop Enterprise Backend"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "super-secret-jwt-key-enterprise-smartshop-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database Settings
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "smartshop"
    POSTGRES_PASSWORD: str = "secretpassword"
    POSTGRES_DB: str = "smartshop_db"
    POSTGRES_PORT: str = "5432"

    class Config:
        case_sensitive = True

settings = Settings()
