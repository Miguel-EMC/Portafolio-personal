#!/usr/bin/env python3
"""Generate a bcrypt hash for the admin password.

Usage:
    python scripts/hash_password.py "your-password-here"

Copy the printed hash into backend/.env as ADMIN_PASSWORD_HASH.
Never commit the plaintext password or the .env file.
"""
import sys

from passlib.context import CryptContext

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scripts/hash_password.py <password>", file=sys.stderr)
        sys.exit(1)

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    print(pwd_context.hash(sys.argv[1]))
