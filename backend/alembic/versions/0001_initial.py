"""initial schema — posts, comments

Revision ID: 0001
Revises:
Create Date: 2026-08-09

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

BLOG_CATEGORIES = (
    "technology", "programming", "web-development", "mobile-development",
    "devops", "career", "tutorials", "general",
)
COMMENT_STATUSES = ("pending", "approved", "rejected", "spam")


def upgrade() -> None:
    op.create_table(
        "posts",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("slug", sa.String(200), nullable=False),
        sa.Column("lang", sa.String(5), nullable=False),
        sa.Column("title", sa.String(300), nullable=False),
        sa.Column("excerpt", sa.Text, nullable=False),
        sa.Column("content", sa.Text, nullable=False),
        sa.Column("author", sa.String(120), nullable=False, server_default="Miguel"),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("category", sa.String(30), nullable=False),
        sa.Column("tags", postgresql.ARRAY(sa.String), nullable=False, server_default="{}"),
        sa.Column("cover_image", sa.String(500), nullable=False, server_default=""),
        sa.Column("reading_time", sa.Integer, nullable=False, server_default="1"),
        sa.Column("featured", sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column("published", sa.Boolean, nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint("slug", "lang", name="uq_posts_slug_lang"),
        sa.CheckConstraint(f"category IN {BLOG_CATEGORIES}", name="ck_posts_category"),
    )
    op.create_index("ix_posts_slug", "posts", ["slug"])
    op.create_index("ix_posts_lang", "posts", ["lang"])

    op.create_table(
        "comments",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("post_slug", sa.String(200), nullable=False),
        sa.Column("post_lang", sa.String(5), nullable=False),
        sa.Column("author_name", sa.String(120), nullable=False),
        sa.Column("author_email", sa.String(255), nullable=True),
        sa.Column("body", sa.Text, nullable=False),
        sa.Column("status", sa.String(20), nullable=False, server_default="pending"),
        sa.Column("ip_hash", sa.String(64), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.CheckConstraint(f"status IN {COMMENT_STATUSES}", name="ck_comments_status"),
    )
    op.create_index("ix_comments_post_slug", "comments", ["post_slug"])
    op.create_index("ix_comments_status", "comments", ["status"])


def downgrade() -> None:
    op.drop_table("comments")
    op.drop_table("posts")
