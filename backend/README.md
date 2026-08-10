# Blog backend (FastAPI + Postgres)

Reemplaza el flujo "editar markdown + `npm run content`" para el blog: los posts viven en Postgres, se administran desde `/admin` (login con un solo password, sin cuentas públicas), y los comentarios públicos quedan en cola de moderación antes de publicarse.

## Setup local

```bash
cp backend/.env.example backend/.env
docker compose build backend
docker compose run --rm backend python scripts/hash_password.py "tu-password"
# pegá el hash impreso en backend/.env como ADMIN_PASSWORD_HASH
# ojo: docker-compose interpola $ en env_file — escapá cada $ como $$
docker compose up -d
docker compose exec backend alembic upgrade head
```

API en `http://localhost:8000`, docs interactivas (Swagger) en `http://localhost:8000/docs`.

## Migrar el contenido existente

Los 5 posts que hoy viven en `information/blog/*.md` se cargan una sola vez a la base:

```bash
python3 scripts/migrate_blog_content.py --password "tu-password"
```

Es idempotente — si un post ya existe (mismo slug+lang) lo salta, no falla.

## Tests

```bash
docker compose exec db psql -U postgres -c "CREATE DATABASE migueldev_blog_test;"  # una sola vez
docker compose exec backend pytest -q
```

## Migraciones nuevas

```bash
docker compose exec backend alembic revision --autogenerate -m "descripción"
docker compose exec backend alembic upgrade head
```

## Variables de entorno (`backend/.env`, nunca se commitea)

| Variable | Qué es |
|---|---|
| `DATABASE_URL` | conexión Postgres, ya seteada para docker-compose |
| `ADMIN_PASSWORD_HASH` | hash bcrypt del password admin, generado con `scripts/hash_password.py` |
| `JWT_SECRET` | string random largo, firma los tokens de sesión |
