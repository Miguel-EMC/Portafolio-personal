from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+asyncpg://postgres:postgres@db:5432/migueldev_blog"

    jwt_secret: str = "dev-secret-change-me"
    jwt_algorithm: str = "HS256"
    jwt_expires_minutes: int = 24 * 60  # 24h, matches the frontend's old sessionDuration

    admin_password_hash: str = ""

    cors_origins: list[str] = [
        "http://localhost:4200",
        "https://migueldev11.com",
    ]

    comment_rate_limit_count: int = 3
    comment_rate_limit_window_minutes: int = 10


@lru_cache
def get_settings() -> Settings:
    return Settings()
