from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.database import get_db
from app.models import Comment
from app.schemas import CommentCreate, CommentPublic
from app.utils import hash_ip

router = APIRouter(tags=["comments"])
settings = get_settings()


@router.get("/posts/{slug}/comments", response_model=list[CommentPublic])
async def list_comments(
    slug: str, lang: str = Query("es"), db: AsyncSession = Depends(get_db)
) -> list[CommentPublic]:
    stmt = (
        select(Comment)
        .where(Comment.post_slug == slug, Comment.post_lang == lang, Comment.status == "approved")
        .order_by(Comment.created_at.asc())
    )
    comments = (await db.execute(stmt)).scalars().all()
    return [CommentPublic.model_validate(c) for c in comments]


@router.post("/posts/{slug}/comments", response_model=CommentPublic, status_code=201)
async def create_comment(
    slug: str,
    payload: CommentCreate,
    request: Request,
    lang: str = Query("es"),
    db: AsyncSession = Depends(get_db),
) -> CommentPublic:
    client_ip = request.client.host if request.client else "unknown"
    ip_hash = hash_ip(client_ip)

    window_start = datetime.now(timezone.utc) - timedelta(minutes=settings.comment_rate_limit_window_minutes)
    recent_count_stmt = select(func.count()).where(
        Comment.ip_hash == ip_hash, Comment.created_at >= window_start
    )
    recent_count = (await db.execute(recent_count_stmt)).scalar_one()
    if recent_count >= settings.comment_rate_limit_count:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many comments — try again later.",
        )

    comment = Comment(
        post_slug=slug,
        post_lang=lang,
        author_name=payload.author_name,
        author_email=payload.author_email,
        body=payload.body,
        status="pending",
        ip_hash=ip_hash,
    )
    db.add(comment)
    await db.commit()
    await db.refresh(comment)
    return CommentPublic.model_validate(comment)
