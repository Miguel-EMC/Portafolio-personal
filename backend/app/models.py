import uuid
from datetime import datetime

from sqlalchemy import ARRAY, Boolean, CheckConstraint, DateTime, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.database import Base

BLOG_CATEGORIES = (
    "technology",
    "programming",
    "web-development",
    "mobile-development",
    "devops",
    "career",
    "tutorials",
    "general",
)

COMMENT_STATUSES = ("pending", "approved", "rejected", "spam")


class Post(Base):
    __tablename__ = "posts"
    __table_args__ = (
        UniqueConstraint("slug", "lang", name="uq_posts_slug_lang"),
        CheckConstraint(f"category IN {BLOG_CATEGORIES}", name="ck_posts_category"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(200), index=True)
    lang: Mapped[str] = mapped_column(String(5), index=True)
    title: Mapped[str] = mapped_column(String(300))
    excerpt: Mapped[str] = mapped_column(Text)
    content: Mapped[str] = mapped_column(Text)
    author: Mapped[str] = mapped_column(String(120), default="Miguel")
    published_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    category: Mapped[str] = mapped_column(String(30))
    tags: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    cover_image: Mapped[str] = mapped_column(String(500), default="")
    reading_time: Mapped[int] = mapped_column(Integer, default=1)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Comment(Base):
    __tablename__ = "comments"
    __table_args__ = (
        CheckConstraint(f"status IN {COMMENT_STATUSES}", name="ck_comments_status"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_slug: Mapped[str] = mapped_column(String(200), index=True)
    post_lang: Mapped[str] = mapped_column(String(5), index=True)
    author_name: Mapped[str] = mapped_column(String(120))
    author_email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    body: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(20), default="pending", index=True)
    ip_hash: Mapped[str] = mapped_column(String(64))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
