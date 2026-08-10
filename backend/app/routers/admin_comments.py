from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Comment
from app.schemas import CommentAdmin, CommentModerate
from app.security import require_admin

router = APIRouter(prefix="/admin/comments", tags=["admin-comments"], dependencies=[Depends(require_admin)])


@router.get("", response_model=list[CommentAdmin])
async def list_comments(
    status: str | None = Query(None), db: AsyncSession = Depends(get_db)
) -> list[CommentAdmin]:
    stmt = select(Comment).order_by(Comment.created_at.desc())
    if status:
        stmt = stmt.where(Comment.status == status)
    comments = (await db.execute(stmt)).scalars().all()
    return [CommentAdmin.model_validate(c) for c in comments]


@router.patch("/{comment_id}", response_model=CommentAdmin)
async def moderate_comment(
    comment_id: UUID, payload: CommentModerate, db: AsyncSession = Depends(get_db)
) -> CommentAdmin:
    comment = await db.get(Comment, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    comment.status = payload.status
    await db.commit()
    await db.refresh(comment)
    return CommentAdmin.model_validate(comment)


@router.delete("/{comment_id}", status_code=204)
async def delete_comment(comment_id: UUID, db: AsyncSession = Depends(get_db)) -> None:
    comment = await db.get(Comment, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    await db.delete(comment)
    await db.commit()
