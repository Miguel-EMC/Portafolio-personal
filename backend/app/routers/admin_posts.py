from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Post
from app.schemas import PostCreate, PostFull, PostList, PostMeta, PostUpdate
from app.security import require_admin
from app.utils import compute_reading_time

router = APIRouter(prefix="/admin/posts", tags=["admin-posts"], dependencies=[Depends(require_admin)])


@router.get("", response_model=PostList)
async def list_all_posts(lang: str = Query("es"), db: AsyncSession = Depends(get_db)) -> PostList:
    stmt = select(Post).where(Post.lang == lang).order_by(Post.published_at.desc())
    posts = (await db.execute(stmt)).scalars().all()
    return PostList(posts=[PostMeta.model_validate(p) for p in posts], total=len(posts))


@router.post("", response_model=PostFull, status_code=201)
async def create_post(payload: PostCreate, db: AsyncSession = Depends(get_db)) -> PostFull:
    post = Post(
        **payload.model_dump(exclude={"content"}),
        content=payload.content,
        reading_time=compute_reading_time(payload.content),
    )
    db.add(post)
    try:
        await db.commit()
    except IntegrityError as exc:
        await db.rollback()
        raise HTTPException(status_code=409, detail="A post with this slug/lang already exists") from exc
    await db.refresh(post)
    return PostFull.model_validate(post)


@router.put("/{slug}", response_model=PostFull)
async def update_post(
    slug: str, payload: PostUpdate, lang: str = Query("es"), db: AsyncSession = Depends(get_db)
) -> PostFull:
    stmt = select(Post).where(Post.slug == slug, Post.lang == lang)
    post = (await db.execute(stmt)).scalar_one_or_none()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    updates = payload.model_dump(exclude_unset=True)
    for field, value in updates.items():
        setattr(post, field, value)

    if "content" in updates:
        post.reading_time = compute_reading_time(post.content)
    post.updated_at = datetime.now(timezone.utc)

    await db.commit()
    await db.refresh(post)
    return PostFull.model_validate(post)


@router.delete("/{slug}", status_code=204)
async def delete_post(slug: str, lang: str = Query("es"), db: AsyncSession = Depends(get_db)) -> None:
    stmt = select(Post).where(Post.slug == slug, Post.lang == lang)
    post = (await db.execute(stmt)).scalar_one_or_none()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    await db.delete(post)
    await db.commit()
