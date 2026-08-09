# Project Context — Portafolio emcode (Miguel Muzo)

> Este archivo da contexto a OpenSpec/Claude Code para que las propuestas de
> cambio se hagan con conocimiento del repo, no a ciegas.

---

## Qué es este proyecto

Portafolio personal y blog técnico de **Miguel Muzo (marca: emcode)**, Software
Engineer especializado en **AI/LLMs, RAG, Cloud (AWS serverless) y backend**.

El sitio funciona como **generador de leads de consultoría** (no monetización
por ads): cada visitante que llega por el blog o un proyecto debería poder
contactar fácilmente, con casos de proyecto convincentes detrás.

**Marca:** emcode · handle @soyemcode · dominio emcode.dev

---

## Posicionamiento (la historia que el sitio debe contar)

En 5 segundos, un visitante debe entender a Miguel como las tres cosas:
consultor freelance, candidato a empleo, y creador de contenido técnico.

**Título:** Software Engineer · AI, Cloud & Backend

**NO** posicionar como full-stack genérico ni como diseñador UI/UX. El foco es
llevar IA a producción sobre infraestructura AWS serverless.

**Hero copy actual objetivo:**
"I build AI systems that reach production — backend, cloud, and applied LLMs on AWS."
(debe pasar por el sistema de traducción, no quedar fijo en inglés — ver i18n abajo)

---

## Stack técnico (real)

- **Framework:** Angular 18.2 con SSR (@angular/ssr)
- **UI:** Angular Material 17, SCSS
- **Contenido:** Markdown (marked) — blog y proyectos en archivos .md bilingües
  generados por `scripts/generate-content.mjs` (corre en prestart/prebuild)
- **Contacto:** EmailJS (@emailjs/browser) — ÚNICO backend de contacto
- **Extras:** ngx-lottie (animaciones), ngx-toastr (notificaciones),
  ngx-slick-carousel
- **Build:** `npm start` (dev), `npm run build` (prod), configuración `es` aparte

## Estructura

- `apps/portfolio/src/app/features/` — home, blog, portfolio, resume, contact, admin
- `apps/portfolio/src/assets/portfolio/projects/` — proyectos en markdown
- CMS propio en `features/admin/` (dashboard, editor, posts) con auth de admin
- `.claude/` — skills (frontend-design, openspec-*) y comandos (angular-component,
  ui-design, api-conventions, testing)

---

## Sistema de diseño (definido — NO reabrir sin razón)

- **Tema:** ÚNICO tema dark. El theme-toggle fue eliminado. No reintroducir light mode.
- **Acento:** Esmeralda **#34D399** (verde elegante, no neón). Ya aplicado.
- **Fondo:** dark base. Texto claro legible. Grises para jerarquía.
- **Estética:** sobria y técnica (ingeniero de IA), NO recargada.
- Skill `frontend-design` disponible para cambios de UI.

---

## i18n (IMPORTANTE — deuda técnica conocida)

⚠️ El repo tiene **DOS sistemas de i18n en paralelo**:
1. `@angular/localize` (carpeta locale/*.xlf)
2. `@ngx-translate/core` (assets/i18n/*.json)

**Estado:** default language = 'es'. Algunas etiquetas del nav están hardcodeadas
en español, sin pasar por traducción.

**Decisión actual:** el sitio se mantiene **default español**, contenido bilingüe
vía el sistema de traducción. NO meter texto fijo en inglés (crea mezcla rara).

**Refactor pendiente (POST-Cuenca, no ahora):** unificar a UN solo sistema de
i18n. Es un cambio grande; no tocar antes del 5 de septiembre. Anotado como
deuda, no como tarea inmediata.

---

## Rutas (estado actual — NO renombrar sin razón)

Rutas ya en inglés y semánticas: `/resume`, `/portfolio`, `/contact`, `/about`, `/blog`.

- `/resume` = experiencia profesional, skills, educación (el CV)
- `/about` = quién es Miguel, su historia/enfoque (AboutMeComponent)
- Son contenidos DISTINTOS. NO fusionar /about con /resume.

No hay rename pendiente. Las rutas están bien.

---

## Reglas de contenido y jerarquía

Prioridad visual (arriba → abajo):
1. Hero (posicionamiento)
2. **Proyectos propios destacados** (protagonistas) — dejar plantilla lista para
   2 futuros: "Serverless RAG Agent on AWS" y "Retrieval Engine from Scratch".
   Placeholder honesto ("Coming soon"), NO señuelo falso.
3. Blog técnico (LangGraph, serverless AWS, PostgreSQL) — segundo pilar
4. Experiencia profesional (secundaria)
5. Educación (abajo, discreta — EPN 2027, Tecnólogo 2023)
6. Seguridad: mención mínima como interés/exploración, NO como especialidad
7. Contacto (EmailJS, con selector de tipo de proyecto)

Modelo de navegación: home = resumen con "ver todo →"; páginas = fuente de verdad.

---

## 🔒 CONFIDENCIALIDAD (regla que nunca se rompe)

Proyectos de cliente/empleador en el repo: asobanca, billusos, conafis,
munster-mind. Regla:
- CERO arquitectura interna, datos, o métricas no públicas.
- NUNCA inventar métricas de impacto.
- Solo mostrar lo que sea público o defendible en una entrevista.
- Confirmar con Münster Mind antes de destacar su app.
- **synapsek** tiene frontmatter `type: personal` → es proyecto PROPIO, no de cliente.

Regla de oro: si no está en un sitio público o no lo puedo defender, no va.

---

## Librerías (deben justificar su peso)

- ✅ Permitido: Mermaid (diagramas de arquitectura), Shiki/Prism (resaltado de
  código en blog).
- ❌ No instalar: amCharts u otras librerías de gráficas (no hay datos que
  graficar), three.js, efectos pesados de partículas.
- Ante la duda, preguntar antes de instalar.

---

## Flujo de trabajo

- Cambios vía OpenSpec: propose → review → apply → archive. Uno por vez.
- Miguel actúa como arquitecto: aprueba cada propuesta antes de aplicar.
- Trabajar en ramas, no en main directamente. Mergear cuando esté verificado.
- Prioridad global: la charla de AWS Community Day (5 sep) manda. El portafolio
  no debe robarle tiempo a la preparación de la charla.
