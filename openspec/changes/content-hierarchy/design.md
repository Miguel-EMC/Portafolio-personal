## Context

The home page (`home.component.ts`, ~500 lines) currently hand-rolls its own markup for every section: a full skills grid + detail modal, its own project cards (different markup than `/portfolio`'s), and its own contact form. `/resume` and `/portfolio` render largely the same content again through their own components (`app-skills`, `app-curriculum`, `app-education`, `PortafolioComponent`). Nav (`nav.component.ts`) has to branch at runtime between "scroll within `/home`" and "navigate to a real route" because both models coexist today.

This change picks one model — home is a summary, the dedicated pages are the source of truth — and reorders home's sections per `openspec/project.md`'s positioning (AI/Cloud/Backend first, client CRUD work secondary).

## Goals / Non-Goals

**Goals:**
- One content model: home previews, full pages own the detail.
- One project-card implementation shared by home (compact) and `/portfolio` (full), replacing the two divergent hand-rolled versions that exist today.
- An honest, non-clickable "coming soon" state for the two unbuilt personal projects.
- A secondary client-project view that structurally cannot surface unconfirmed business figures, without touching the underlying markdown files.
- Remove `navigateToRoute()`'s scroll-vs-navigate branching from `NavComponent`.

**Non-Goals:**
- Not touching the client project markdown case-study bodies (`assets/portfolio/posts/*.md`) — confidentiality review of those figures is Miguel's separate, manual step per `openspec/project.md`.
- Not renaming any routes.
- Not reopening the design-system tokens (dark theme / emerald accent) — already applied and closed.
- Not building the two new personal projects — this change only prepares the placeholder slot.
- Not touching the dedicated Skills page/detail at `/resume` — only removing the standalone Skills section from the *home* composition (see Decisions).

## Decisions

**1. Drop the dedicated "Habilidades Técnicas" section from home; keep it on `/resume`.**
`openspec/project.md`'s hierarchy (hero → projects → blog → client projects → experience → education → contact) has no top-level Skills section — this was also the single most-disliked section per the original portfolio review. Tech surfaces contextually instead: the existing hero tech chips (LangGraph, AWS Bedrock, FastAPI, Flutter) and each project card's stack tags. The full skills grid + mastery-level modal stays exactly where it is today, on `/resume`, reachable via "Ver todo →". This also sidesteps the Fase-0 finding that home's skills data and `/resume`'s skills data were two unsynced hardcoded lists — home no longer needs its own copy at all.

**2. Build one `ProjectCardComponent` with three variants (`featured`, `coming-soon`, `client-secondary`) instead of leaving home and `/portfolio` with separate markup.**
Today home hand-rolls a project card (`home.component.html:244-292`) that's a stripped-down, out-of-sync copy of `PortafolioComponent`'s card. Alternative considered: leave both as-is and just add a third, home-only "coming soon" card. Rejected — that adds a *third* divergent card implementation on top of the two that already caused the Fase-0 duplication finding. Building one component now, with `/portfolio` as the first consumer, fixes the existing duplication as a side effect of this change rather than adding to it.
- `featured`: full card (image, live/github links, description) — used for Synapsek and, later, the two AI projects once they exist.
- `coming-soon`: status chip ("En construcción"), title, one-line description of what it will be, stack tags, **no link, not `routerLink`-wrapped, nothing clickable**.
- `client-secondary`: title + one line + stack tags only. No description body, no "Resultados"/"Desafíos"/"Soluciones" fields rendered — those simply aren't part of this variant's template, not hidden with CSS. Links through to the existing full `/portfolio/project/:slug` page, which is unchanged.

**3. The two "coming soon" projects are a small static array, not markdown files.**
Alternative considered: create placeholder `.md` files under `assets/portfolio/projects/` so they flow through the existing `generate-portfolio-manifest.mjs` pipeline like every other project. Rejected — that pipeline assumes a project has a real detail page, and `generate-portfolio-manifest.mjs` would need to special-case "has no route yet." Simpler and lower-risk: a small `upcoming-projects.data.ts` (2 entries: title, one-liner, stack tags) consumed directly by the `coming-soon` card variant. When a project is real, it gets a proper markdown file and moves to the normal pipeline — the placeholder entry is deleted, not converted.

**4. Client-secondary grid reads existing frontmatter fields only (`title`, `description`, `frameworks`) — no new "public-safe" fields added to the markdown.**
Alternative considered: add a `publicSummary` field to each client project's frontmatter that Miguel fills in as the vetted, confirmed-safe one-liner. Rejected for *this* change — it implies Miguel has already done the per-client confirmation from `openspec/project.md`'s open confidentiality item, which hasn't happened yet. Using the existing `description` field (already generic, no figures in any of the 4 client files' frontmatter) is safe today without waiting on that confirmation. Revisit once Miguel confirms per-client language — a follow-up change, not this one.

**5. Home's condensed experience section is new, minimal markup — not a "compact mode" on `CurriculumComponent`.**
The full `/resume` page needs the detailed bullet-list view; home needs one paragraph per role. Adding a compact/full toggle to `CurriculumComponent` would couple two different data presentations (bullets vs. prose) into one component for a home page that only needs three static paragraphs. The three paragraphs are hand-written directly from `experience.data.ts` / `es.json` content (see proposal) — no new component, no new data file.

**6. Education moves position and loses visual weight, component itself is unchanged.**
Same `EducationComponent`, just relocated to the bottom of home's template and wrapped without the current `.section-label` prominent header treatment used for Skills/Experience today.

**7. Hero copy ships as new i18n keys, English string as the approved source text, Spanish translation drafted but flagged for Miguel's review (see Open Questions).**

**8. Nav: delete `navigateToRoute()`'s branching, template becomes plain `routerLink`.**
No alternative considered — this is exactly what `openspec/project.md` specifies. `scrollToSection()` and `updateActiveSection()` (used for the home-only scrollspy) also become dead code once home isn't a full one-pager for these sections; both removed in the same pass.

## Risks / Trade-offs

- **[Risk]** `home.component.ts` carries unrelated logic (toast styling, lottie config, language-change handling) alongside the sections being rewritten → **Mitigation**: only the template regions for skills/projects/experience/education/contact are touched; hero animation, toast, and lottie wiring are left as-is.
- **[Risk]** Compact `client-secondary` cards reduce exposure on the high-traffic home page, but the full figures still ship in the `/portfolio/project/:slug` bundle today, unchanged by this proposal → **Mitigation**: none in this change by design (out of scope per Non-Goals); this is a visibility reduction, not a confidentiality fix. Still needs Miguel's manual review.
- **[Risk]** Removing the standalone Skills section from home could read as a regression to a recruiter skimming fast → **Mitigation**: hero tech chips + per-project stack tags stay visible above the fold; full skills detail is one "Ver todo →" click away.
- **[Risk]** Deleting `scrollToSection()`/`updateActiveSection()` from `NavComponent` is a **BREAKING** change to the current `/home#resume`-style in-page anchors → **Mitigation**: these aren't indexed URLs (no sitemap entries), acceptable to break.

## Migration Plan

1. Build `ProjectCardComponent` (all three variants) in isolation.
2. Swap `/portfolio` (`PortafolioComponent`) to consume it — should be behavior-neutral for that page; proves the component before home depends on it.
3. Rebuild home's template section-by-section in hierarchy order (hero copy → featured/coming-soon projects → blog → client-secondary grid → experience → education → contact), leaving untouched logic in place.
4. Simplify `NavComponent`: remove `navigateToRoute()`, `scrollToSection()`, `updateActiveSection()`; template to plain `routerLink`.
5. Manual QA pass in both languages (`es`/`en`) before merge — new i18n keys need to render correctly in both.

No data migration, no rollback complexity beyond a normal git revert (no schema/DB changes).

## Open Questions

- Spanish phrasing for the new hero value line — the English source ("I build AI systems that reach production — backend, cloud, and applied LLMs on AWS.") was approved directly by Miguel; the Spanish translation needs his sign-off on tone, not just a literal translation.
- Should the "coming soon" cards reserve their eventual slugs now (e.g., pre-registering `/portfolio/project/serverless-rag-agent` as a route that 404s gracefully) or wait until the project is real? This design assumes wait.
