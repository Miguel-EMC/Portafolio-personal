from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator
from pydantic.alias_generators import to_camel

from app.models import BLOG_CATEGORIES, COMMENT_STATUSES

BlogCategory = Literal[
    "technology", "programming", "web-development", "mobile-development",
    "devops", "career", "tutorials", "general",
]
CommentStatus = Literal["pending", "approved", "rejected", "spam"]


class CamelModel(BaseModel):
    """Serializes to the same camelCase field names the Angular BlogService
    already expects (publishedAt, coverImage, readingTime, ...) so the
    frontend's BlogPost/BlogPostMeta interfaces don't need to change."""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)


# ---- Posts -------------------------------------------------------------

class PostMeta(CamelModel):
    slug: str
    lang: str
    title: str
    excerpt: str
    author: str
    published_at: datetime
    updated_at: datetime | None = None
    category: BlogCategory
    tags: list[str]
    cover_image: str
    reading_time: int
    featured: bool
    published: bool


class PostFull(PostMeta):
    content: str


class PostCreate(CamelModel):
    slug: str
    lang: str
    title: str
    excerpt: str
    content: str
    author: str = "Miguel"
    published_at: datetime
    updated_at: datetime | None = None
    category: BlogCategory
    tags: list[str] = Field(default_factory=list)
    cover_image: str = ""
    featured: bool = False
    published: bool = True

    @field_validator("category")
    @classmethod
    def validate_category(cls, v: str) -> str:
        if v not in BLOG_CATEGORIES:
            raise ValueError(f"invalid category: {v}")
        return v


class PostUpdate(CamelModel):
    title: str | None = None
    excerpt: str | None = None
    content: str | None = None
    author: str | None = None
    published_at: datetime | None = None
    updated_at: datetime | None = None
    category: BlogCategory | None = None
    tags: list[str] | None = None
    cover_image: str | None = None
    featured: bool | None = None
    published: bool | None = None


class PostList(CamelModel):
    posts: list[PostMeta]
    total: int


# ---- Comments ------------------------------------------------------------

class CommentPublic(CamelModel):
    id: UUID
    post_slug: str
    author_name: str
    body: str
    created_at: datetime


class CommentAdmin(CommentPublic):
    author_email: str | None = None
    status: CommentStatus
    post_lang: str


class CommentCreate(CamelModel):
    author_name: str = Field(min_length=1, max_length=120)
    author_email: str | None = None
    body: str = Field(min_length=1, max_length=3000)


class CommentModerate(CamelModel):
    status: CommentStatus

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        if v not in COMMENT_STATUSES:
            raise ValueError(f"invalid status: {v}")
        return v


# ---- Auth ------------------------------------------------------------

class LoginRequest(CamelModel):
    password: str


class LoginResponse(CamelModel):
    token: str
    expires_at: datetime
