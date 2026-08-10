from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Post
from app.schemas import PostFull, PostList, PostMeta

router = APIRouter(tags=["posts"])


@router.get("/posts", response_model=PostList)
async def list_posts(
    lang: str = Query("es"),
    category: str | None = None,
    tag: str | None = None,
    featured: bool | None = None,
    search: str | None = None,
    include_drafts: bool = False,
    limit: int = Query(50, le=200),
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
) -> PostList:
    stmt = select(Post).where(Post.lang == lang)

    if not include_drafts:
        stmt = stmt.where(Post.published.is_(True))
    if category:
        stmt = stmt.where(Post.category == category)
    if tag:
        stmt = stmt.where(Post.tags.any(tag))
    if featured is not None:
        stmt = stmt.where(Post.featured.is_(featured))
    if search:
        term = f"%{search.lower()}%"
        stmt = stmt.where(
            or_(
                func.lower(Post.title).like(term),
                func.lower(Post.excerpt).like(term),
            )
        )

    count_stmt = select(func.count()).select_from(stmt.subquery())
    total = (await db.execute(count_stmt)).scalar_one()

    stmt = stmt.order_by(Post.published_at.desc()).limit(limit).offset(offset)
    posts = (await db.execute(stmt)).scalars().all()

    return PostList(posts=[PostMeta.model_validate(p) for p in posts], total=total)


@router.get("/posts/{slug}", response_model=PostFull)
async def get_post(slug: str, lang: str = Query("es"), db: AsyncSession = Depends(get_db)) -> PostFull:
    stmt = select(Post).where(Post.slug == slug, Post.lang == lang, Post.published.is_(True))
    post = (await db.execute(stmt)).scalar_one_or_none()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return PostFull.model_validate(post)


@router.get("/tags", response_model=list[str])
async def list_tags(lang: str = Query("es"), db: AsyncSession = Depends(get_db)) -> list[str]:
    stmt = select(Post.tags).where(Post.lang == lang, Post.published.is_(True))
    rows = (await db.execute(stmt)).scalars().all()
    tags = {tag for row in rows for tag in row}
    return sorted(tags)
