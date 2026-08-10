from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from app.config import get_settings
from app.routers import admin_comments, admin_posts, auth, comments, posts

settings = get_settings()

app = FastAPI(title="MiguelDev Blog API", version="1.0.0", root_path_in_servers=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

API_PREFIX = "/api/v1"
app.include_router(posts.router, prefix=API_PREFIX)
app.include_router(comments.router, prefix=API_PREFIX)
app.include_router(auth.router, prefix=API_PREFIX)
app.include_router(admin_posts.router, prefix=API_PREFIX)
app.include_router(admin_comments.router, prefix=API_PREFIX)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


# Lambda entrypoint (used once deployed behind API Gateway — irrelevant for local dev)
handler = Mangum(app)
