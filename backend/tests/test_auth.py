from httpx import AsyncClient

from tests.conftest import TEST_ADMIN_PASSWORD


async def test_login_wrong_password(client: AsyncClient):
    resp = await client.post("/api/v1/auth/login", json={"password": "wrong"})
    assert resp.status_code == 401


async def test_login_correct_password(client: AsyncClient):
    resp = await client.post("/api/v1/auth/login", json={"password": TEST_ADMIN_PASSWORD})
    assert resp.status_code == 200
    body = resp.json()
    assert "token" in body and body["token"]
    assert "expiresAt" in body


async def test_admin_endpoint_requires_token(client: AsyncClient):
    resp = await client.get("/api/v1/admin/posts")
    assert resp.status_code == 401


async def test_admin_endpoint_rejects_garbage_token(client: AsyncClient):
    resp = await client.get("/api/v1/admin/posts", headers={"Authorization": "Bearer not-a-real-token"})
    assert resp.status_code == 401
