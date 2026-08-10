import asyncio
from collections.abc import AsyncGenerator

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app import models  # noqa: F401 — registers tables on Base.metadata
from app.config import get_settings
from app.database import Base, get_db
from app.main import app
from app.security import hash_password

TEST_DATABASE_URL = "postgresql+asyncpg://postgres:postgres@db:5432/migueldev_blog_test"
TEST_ADMIN_PASSWORD = "test-admin-password"


@pytest.fixture(scope="session", autouse=True)
def _configure_settings():
    settings = get_settings()
    settings.admin_password_hash = hash_password(TEST_ADMIN_PASSWORD)
    yield settings


@pytest_asyncio.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    engine = create_async_engine(TEST_DATABASE_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    session_maker = async_sessionmaker(engine, expire_on_commit=False)
    async with session_maker() as session:
        yield session

    await engine.dispose()


@pytest_asyncio.fixture
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    async def _override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = _override_get_db

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def admin_token(client: AsyncClient) -> str:
    resp = await client.post("/api/v1/auth/login", json={"password": TEST_ADMIN_PASSWORD})
    assert resp.status_code == 200
    return resp.json()["token"]


@pytest_asyncio.fixture
async def admin_headers(admin_token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {admin_token}"}
