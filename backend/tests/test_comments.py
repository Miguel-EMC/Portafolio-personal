from httpx import AsyncClient

from tests.test_posts import create_post


async def test_new_comment_is_pending_and_hidden_publicly(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers)

    resp = await client.post(
        "/api/v1/posts/sample-post/comments",
        params={"lang": "es"},
        json={"authorName": "Ana", "body": "Gran post!"},
    )
    assert resp.status_code == 201
    assert "status" not in resp.json()  # CommentPublic doesn't leak status

    public = await client.get("/api/v1/posts/sample-post/comments", params={"lang": "es"})
    assert public.json() == []


async def test_approved_comment_appears_publicly(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers)
    created = await client.post(
        "/api/v1/posts/sample-post/comments",
        params={"lang": "es"},
        json={"authorName": "Ana", "body": "Gran post!"},
    )
    comment_id = created.json()["id"]

    mod = await client.patch(
        f"/api/v1/admin/comments/{comment_id}", json={"status": "approved"}, headers=admin_headers
    )
    assert mod.status_code == 200
    assert mod.json()["status"] == "approved"

    public = await client.get("/api/v1/posts/sample-post/comments", params={"lang": "es"})
    assert len(public.json()) == 1
    assert public.json()[0]["authorName"] == "Ana"


async def test_comment_rate_limit(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers)

    statuses = []
    for i in range(5):
        resp = await client.post(
            "/api/v1/posts/sample-post/comments",
            params={"lang": "es"},
            json={"authorName": f"Spammer{i}", "body": "spam"},
        )
        statuses.append(resp.status_code)

    assert statuses == [201, 201, 201, 429, 429]


async def test_admin_can_reject_and_delete_comment(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers)
    created = await client.post(
        "/api/v1/posts/sample-post/comments",
        params={"lang": "es"},
        json={"authorName": "Spammer", "body": "buy my stuff"},
    )
    comment_id = created.json()["id"]

    reject = await client.patch(
        f"/api/v1/admin/comments/{comment_id}", json={"status": "spam"}, headers=admin_headers
    )
    assert reject.json()["status"] == "spam"

    delete = await client.delete(f"/api/v1/admin/comments/{comment_id}", headers=admin_headers)
    assert delete.status_code == 204

    listing = await client.get("/api/v1/admin/comments", headers=admin_headers)
    assert listing.json() == []


async def test_comment_requires_body(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers)
    resp = await client.post(
        "/api/v1/posts/sample-post/comments",
        params={"lang": "es"},
        json={"authorName": "Ana", "body": ""},
    )
    assert resp.status_code == 422
