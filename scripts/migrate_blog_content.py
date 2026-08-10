#!/usr/bin/env python3
"""One-off: seed the new backend's Postgres `posts` table from the existing
compiled blog content (apps/portfolio/src/assets/blog/manifest.*.json +
posts/*.md), so the 5 markdown-authored posts survive the move from
"static build-time content" to "database, edited via /admin".

Run once, after the backend is up (locally: `docker compose up -d`,
or against the real deployed API once that exists):

    python3 scripts/migrate_blog_content.py --password "your-admin-password"

Stdlib only — no pip install needed on the host.
"""
import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSETS_DIR = ROOT / "apps" / "portfolio" / "src" / "assets" / "blog"
LANGS = ("en", "es")

FRONTMATTER_RE = re.compile(r"^---[\s\S]*?---\s*\n", re.MULTILINE)


def strip_frontmatter(raw: str) -> str:
    return FRONTMATTER_RE.sub("", raw, count=1)


def api_request(base_url: str, method: str, path: str, token: str | None = None, body: dict | None = None):
    url = f"{base_url}{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read())
    except urllib.error.HTTPError as exc:
        return exc.code, json.loads(exc.read())


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--password", required=True, help="Admin password (see backend/.env)")
    parser.add_argument("--base-url", default="http://localhost:8000/api/v1")
    args = parser.parse_args()

    status, login = api_request(args.base_url, "POST", "/auth/login", body={"password": args.password})
    if status != 200:
        print(f"Login failed ({status}): {login}", file=sys.stderr)
        return 1
    token = login["token"]

    created, skipped, failed = 0, 0, 0

    for lang in LANGS:
        manifest_path = ASSETS_DIR / f"manifest.{lang}.json"
        if not manifest_path.exists():
            print(f"[skip] no manifest for lang={lang}")
            continue

        manifest = json.loads(manifest_path.read_text())
        for meta in manifest["posts"]:
            slug = meta["slug"]
            post_md_path = ASSETS_DIR / "posts" / f"{slug}.{lang}.md"
            if not post_md_path.exists():
                print(f"[warn] missing markdown for {slug}.{lang}, skipping")
                failed += 1
                continue

            content = strip_frontmatter(post_md_path.read_text())

            payload = {
                "slug": slug,
                "lang": lang,
                "title": meta["title"],
                "excerpt": meta["excerpt"],
                "content": content,
                "author": meta.get("author", "Miguel"),
                "publishedAt": meta["publishedAt"],
                "updatedAt": meta.get("updatedAt"),
                "category": meta["category"],
                "tags": meta.get("tags", []),
                "coverImage": meta.get("coverImage", ""),
                "featured": meta.get("featured", False),
                "published": meta.get("published", True),
            }

            status, result = api_request(args.base_url, "POST", "/admin/posts", token=token, body=payload)
            if status == 201:
                print(f"[ok] {slug}.{lang}")
                created += 1
            elif status == 409:
                print(f"[skip] {slug}.{lang} already exists")
                skipped += 1
            else:
                print(f"[fail] {slug}.{lang}: {status} {result}", file=sys.stderr)
                failed += 1

    print(f"\nDone. created={created} skipped={skipped} failed={failed}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
