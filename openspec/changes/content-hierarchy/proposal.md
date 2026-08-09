## Why

The home page currently renders every section (skills, experience, education, projects, contact) as a full one-pager, while `/resume`, `/portfolio`, and `/contact` render the same content again as separate pages — the same content lives twice, in two different layouts, and the nav needs runtime logic to guess whether a click should scroll or navigate. Beyond the duplication, the home's content order doesn't tell the right story: client CRUD projects and a full skills grid lead, while the AI/Cloud/Backend positioning Miguel wants (`openspec/project.md`) is buried. This change fixes both: one hierarchy, one source of truth per section, and an order that leads with what Miguel actually wants to be known for.

## What Changes

- Home becomes a **summary** of each section with a "Ver todo →" link to the full page; `/resume`, `/portfolio`, `/about` stay the single source of truth for full detail. No new URLs, no renamed routes.
- New home section order, top to bottom: hero → featured own projects → blog → client projects (secondary) → experience (condensed) → education (bottom) → contact.
- **New**: a "coming soon" project card state — honest placeholder (status chip, description of what it will be, tech stack tags, no link) for the two upcoming personal projects (Serverless RAG Agent on AWS, Retrieval Engine from Scratch). No fake data, no clickable dead link.
- Client projects (asobanca, billusos, conafis, munster-mind) move out of the hero position into a secondary grid: title + one line + stack only — no business figures from their current case-study pages (those numbers aren't confirmed publishable yet). The full case-study pages under `/portfolio/project/:slug` are unchanged.
- Experience section is condensed to one paragraph per role, sourced only from existing `experience.data.ts` / `es.json` content — no new claims, no metrics added.
- Education moves to the bottom of the page, de-emphasized, reusing the existing `education` component as-is.
- One line for security as an "interest," not a specialty — no dedicated section.
- Hero copy is added as new translation keys (ngx-translate), not hardcoded text — site default stays `es`.
- **BREAKING**: `NavComponent.navigateToRoute()` and its scroll-vs-navigate branching are removed. Nav becomes plain `routerLink`. Any code or test relying on the old scroll-to-section behavior on `/home` breaks.

## Capabilities

### New Capabilities
- `home-page-layout`: the section composition and order of the home page, and the "summary + ver todo" relationship between home and the full pages.
- `project-showcase`: how projects are displayed across the site — featured cards, the "coming soon" placeholder state, and the secondary client-project grid, including the confidentiality constraint on what a client card may show.
- `site-navigation`: how the main nav resolves a click to a route — plain `routerLink`, no scroll-vs-navigate branching.

### Modified Capabilities
- None. `openspec/specs/` is currently empty — this is the first change proposed in this repo, so there is nothing existing to modify.

## Impact

- **Code**: `home.component.ts/html/scss`, `nav.component.ts/html`, `resume/components/education` (relocation only), `assets/i18n/*.json` (new hero keys), a new project-card component/state for "coming soon".
- **Content**: no changes to the client project markdown files themselves (asobanca/billusos/conafis/munster-mind) — the secondary grid reads a subset of existing frontmatter, it does not rewrite the case-study bodies.
- **Confidentiality**: this change does not resolve the open question of whether asobanca/conafis's current "Resultados" figures are publishable — it only ensures the new secondary grid doesn't surface them by default. Miguel still needs to confirm those figures separately per `openspec/project.md`.
- **No dependency changes**: no new packages required for this change.
