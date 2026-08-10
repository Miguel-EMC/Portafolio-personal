from httpx import AsyncClient


def make_post(**overrides) -> dict:
    base = {
        "slug": "sample-post",
        "lang": "es",
        "title": "Un post de ejemplo",
        "excerpt": "Resumen corto",
        "content": "# Título\n\n" + ("palabra " * 250),  # ~250 words -> readingTime should be 2
        "author": "Miguel",
        "publishedAt": "2026-01-01T00:00:00Z",
        "category": "technology",
        "tags": ["AWS", "Python"],
        "coverImage": "",
        "featured": False,
        "published": True,
    }
    base.update(overrides)
    return base


async def create_post(client: AsyncClient, admin_headers: dict, **overrides) -> dict:
    resp = await client.post("/api/v1/admin/posts", json=make_post(**overrides), headers=admin_headers)
    assert resp.status_code == 201, resp.text
    return resp.json()


async def test_create_post_computes_reading_time(client: AsyncClient, admin_headers: dict):
    post = await create_post(client, admin_headers)
    assert post["readingTime"] == 2  # 250 words / 200 wpm, rounded up


async def test_create_post_rejects_invalid_category(client: AsyncClient, admin_headers: dict):
    resp = await client.post(
        "/api/v1/admin/posts", json=make_post(category="not-a-real-category"), headers=admin_headers
    )
    assert resp.status_code == 422


async def test_duplicate_slug_lang_conflicts(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers)
    resp = await client.post("/api/v1/admin/posts", json=make_post(), headers=admin_headers)
    assert resp.status_code == 409


async def test_public_list_excludes_drafts(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers, slug="published-one", published=True)
    await create_post(client, admin_headers, slug="draft-one", published=False)

    resp = await client.get("/api/v1/posts", params={"lang": "es"})
    slugs = [p["slug"] for p in resp.json()["posts"]]
    assert "published-one" in slugs
    assert "draft-one" not in slugs


async def test_admin_list_includes_drafts(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers, slug="published-one", published=True)
    await create_post(client, admin_headers, slug="draft-one", published=False)

    resp = await client.get("/api/v1/admin/posts", params={"lang": "es"}, headers=admin_headers)
    slugs = [p["slug"] for p in resp.json()["posts"]]
    assert "published-one" in slugs
    assert "draft-one" in slugs


async def test_get_draft_post_returns_404_publicly(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers, slug="draft-only", published=False)
    resp = await client.get("/api/v1/posts/draft-only", params={"lang": "es"})
    assert resp.status_code == 404


async def test_filter_by_category(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers, slug="tech-post", category="technology")
    await create_post(client, admin_headers, slug="devops-post", category="devops")

    resp = await client.get("/api/v1/posts", params={"lang": "es", "category": "devops"})
    slugs = [p["slug"] for p in resp.json()["posts"]]
    assert slugs == ["devops-post"]


async def test_filter_by_tag(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers, slug="aws-post", tags=["AWS", "Lambda"])
    await create_post(client, admin_headers, slug="other-post", tags=["Frontend"])

    resp = await client.get("/api/v1/posts", params={"lang": "es", "tag": "Lambda"})
    slugs = [p["slug"] for p in resp.json()["posts"]]
    assert slugs == ["aws-post"]


async def test_search_matches_title_and_excerpt(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers, slug="matching", title="LangGraph Agents", excerpt="stuff")
    await create_post(client, admin_headers, slug="not-matching", title="Something else", excerpt="other")

    resp = await client.get("/api/v1/posts", params={"lang": "es", "search": "langgraph"})
    slugs = [p["slug"] for p in resp.json()["posts"]]
    assert slugs == ["matching"]


async def test_update_post_recomputes_reading_time(client: AsyncClient, admin_headers: dict):
    post = await create_post(client, admin_headers)
    assert post["readingTime"] == 2

    resp = await client.put(
        "/api/v1/admin/posts/sample-post",
        params={"lang": "es"},
        json={"content": "palabra " * 10},
        headers=admin_headers,
    )
    assert resp.status_code == 200
    assert resp.json()["readingTime"] == 1
    assert resp.json()["updatedAt"] is not None


async def test_delete_post(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers)
    resp = await client.delete("/api/v1/admin/posts/sample-post", params={"lang": "es"}, headers=admin_headers)
    assert resp.status_code == 204

    resp = await client.get("/api/v1/posts/sample-post", params={"lang": "es"})
    assert resp.status_code == 404


async def test_tags_endpoint_deduplicates_and_sorts(client: AsyncClient, admin_headers: dict):
    await create_post(client, admin_headers, slug="p1", tags=["Zebra", "AWS"])
    await create_post(client, admin_headers, slug="p2", tags=["AWS", "Python"])

    resp = await client.get("/api/v1/tags", params={"lang": "es"})
    assert resp.json() == ["AWS", "Python", "Zebra"]
