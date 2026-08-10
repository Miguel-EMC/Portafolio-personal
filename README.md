# Portfolio Personal

Portfolio de Miguel Muzo (Angular 18) + blog con su propio nav/marca ("MiguelDev Community"). El blog corre contra un backend propio (FastAPI + Postgres) para posts y comentarios moderados; el resto del sitio (portfolio, resume, contacto) es estático.

## Estructura

```
apps/portfolio/     app Angular (portfolio + blog; admin en /admin todavía no está conectado)
backend/             API FastAPI + Postgres (posts, comentarios, auth admin)
information/         contenido fuente en markdown (blog, portfolio) — seed inicial del blog
scripts/             generate-content.mjs (build-time, portfolio), migrate_blog_content.py (seed one-off del blog)
docker-compose.yml    Postgres + backend para desarrollo local
```

## Requisitos

- Node 20+, npm
- Docker + Docker Compose (para el backend)
- Python 3 (solo para `scripts/migrate_blog_content.py`, stdlib nomás, no hace falta pip install)

## Frontend

```bash
npm install
npm start              # ng serve, http://localhost:4200 (corre "npm run content" antes, genera assets/portfolio/*)
npm run build           # build de producción a dist/portfolio
```

Deploy: GitHub Pages vía `.github/workflows/main.yml`, dominio `migueldev11.com`. SSR (`@angular/ssr`) está en el código pero deshabilitado en `angular.json` (`ssr: false`) — el build activo es 100% estático.

### Contenido del portfolio (proyectos)

Sigue siendo estático: editar `information/portfolio/*.{en,es}.md`, correr `npm run content` (ya se corre solo antes de `start`/`build`). Genera `apps/portfolio/src/assets/portfolio/manifest.*.json`.

### Contenido del blog

En transición: el backend (posts en Postgres, editables por API) ya está listo, pero el frontend todavía lee `apps/portfolio/src/assets/blog/*.json` estáticos — la migración de `BlogService` a la API real (y el admin en `/admin`) está pendiente. Hasta que eso pase, `information/blog/*.md` sigue siendo la fuente que ve el sitio; `scripts/migrate_blog_content.py` es el script que carga ese contenido a Postgres para cuando el frontend sí cambie (ver `backend/README.md`).

## Backend (blog: posts + comentarios + admin)

```bash
cp backend/.env.example backend/.env
docker compose build backend
docker compose run --rm backend python scripts/hash_password.py "tu-password"
# pegá el hash en backend/.env como ADMIN_PASSWORD_HASH (escapar cada $ como $$)
docker compose up -d
docker compose exec backend alembic upgrade head
```

API en `http://localhost:8000`, docs interactivas en `http://localhost:8000/docs`. Detalle completo (tests, migraciones nuevas, variables de entorno) en [`backend/README.md`](backend/README.md).

**Estado actual**: el backend ya expone todo (posts, comentarios, auth) y tiene los 5 posts migrados, pero el frontend (`BlogService`, `/admin`) todavía no está conectado — sigue leyendo los `assets/blog/*.json` estáticos. `environment.ts` ya tiene `api.baseUrl: http://localhost:8000/api/v1` listo para cuando se haga ese cambio.

## Tests

- Backend: `docker compose exec backend pytest -q`
- Frontend: `ng test` (Karma) — sin e2e configurado
