import hashlib
import math
import re

from app.config import get_settings

settings = get_settings()


def compute_reading_time(body: str) -> int:
    """Mirrors scripts/generate-content.mjs's computeReadingTime: words / 200wpm, min 1."""
    words = len(re.findall(r"\S+", body.strip()))
    return max(1, math.ceil(words / 200))


def hash_ip(ip: str) -> str:
    # Not raw IP storage — just enough to rate-limit without keeping PII.
    salted = f"{ip}:{settings.jwt_secret}"
    return hashlib.sha256(salted.encode()).hexdigest()
