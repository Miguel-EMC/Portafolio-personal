## 1. Shared project-card component

- [x] 1.1 Create `ProjectCardComponent` (standalone) with a `variant` input: `featured` | `coming-soon` | `client-secondary`
- [x] 1.2 Implement `featured` variant: image, live/github links, description, stack tags (matches current `/portfolio` card content)
- [x] 1.3 Implement `coming-soon` variant: status chip, title, one-line description, stack tags — no link, no `routerLink`, no click handler
- [x] 1.4 Implement `client-secondary` variant: title, one-line description, stack tags only — no challenge/solution/results content, links to `/portfolio/project/:slug`
- [x] 1.5 Create `upcoming-projects.data.ts` with the two coming-soon entries (Serverless RAG Agent on AWS; Retrieval Engine from Scratch) — title, one-liner, stack tags only, no markdown/route

## 2. Migrate /portfolio to the shared component

- [x] 2.1 Replace `PortafolioComponent`'s hand-rolled card markup with `<app-project-card variant="featured">`
- [x] 2.2 **Deviation from plan** — the "modal" was a second, undiscovered duplicate of the already-existing but completely unlinked `/portfolio/project/:slug` route (`ProjectDetailComponent`, richer: full markdown body, related projects, SEO). Kept the modal "unchanged" would have preserved a 3rd duplicate card/detail implementation, worse than the two Fase-0 already flagged. Replaced the modal with real navigation to `/portfolio/project/:slug` instead — deletes ~390 lines of duplicate modal markup/CSS/state and finally gives the orphaned detail route a real entry point. Filters (all/personal/professional) unaffected, verified via build.
- [x] 2.3 Remove the now-dead card markup/styles from `portafolio.component.html/scss` (also fixed a leftover green+blue hardcoded gradient in the image overlay that Fase 2's token sweep missed because it used raw `rgba()` values, not `var(--turquoise-*)`)

## 3. i18n: hero copy

- [x] 3.1 Add new hero headline/value-line keys to `assets/i18n/en.json` using the approved English copy
- [x] 3.2 Add the Spanish translation to `assets/i18n/es.json` — **flagged for Miguel's review**, not final
- [x] 3.3 Update `home.component.html` hero markup to use the new translation keys instead of any hardcoded text — also found and fixed a real bug while here: the role-rotator (`roles` array) was hardcoded to a single English string `'Backend Developer'` regardless of site language, so it showed English text even in Spanish mode. Now loads `home.hero.roles` (translated array) and reloads on language change.

## 4. Rebuild home template — projects & blog

- [x] 4.1 Remove the standalone Skills section (markup, modal, and any home-local skills data) from `home.component.html`/`home.component.ts` — this also deleted the entire skills-modal dashboard (`selectedArea`, `getExpertCount`, `getMasteryLabel`, `skillAreas` field, ~500 lines of dead-once-removed CSS), which was the exact "two unsynced skill catalogs" bug flagged in the original Fase 0 audit.
- [x] 4.2 Add featured-projects section: Synapsek (`featured`) + the two `coming-soon` cards, using `ProjectCardComponent`
- [x] 4.3 Reorder home template so blog section follows featured projects (per fixed order in `home-page-layout` spec)
- [x] 4.4 Add client-projects section using `client-secondary` cards for asobanca, billusos, conafis, munster-mind
- [x] 4.5 Remove home's old hand-rolled project-card markup once the above are wired in (also found and fixed a second leftover green+blue hardcoded gradient here, same class of bug as the one fixed in `portafolio.component.scss`)

## 5. Rebuild home template — experience, education, contact

- [x] 5.1 Write the three condensed experience paragraphs (Münster Mind, Billusos, CEER) — added as new i18n keys (`home.experienceRoles.*`) rather than hardcoded, reusing existing `experiences.*.title/subtitle/date` keys for names/dates so both languages stay correct
- [x] 5.2 Add experience section to home in condensed form, positioned after client-projects per the fixed order
- [x] 5.3 Add the single security "area of interest" line, placed at the end of the experience section (translated, `home.experienceRoles.security`)
- [x] 5.4 Move `<app-education>` to the bottom of home's template, below experience, above contact
- [x] 5.5 Wrap education in a quiet, non-prominent header (`.quiet-title`) instead of the old bold `.section-label` treatment (which was deleted along with the skills dashboard it belonged to)
- [x] 5.6 Contact section untouched structurally — still last, same form/EmailJS wiring from Fase 1

## 6. Nav simplification

- [x] 6.1 Remove `navigateToRoute()` and its scroll-vs-navigate branching from `nav.component.ts`
- [x] 6.2 Remove `scrollToSection()` and `updateActiveSection()` from `nav.component.ts`
- [x] 6.3 Update `nav.component.html` to use plain `routerLink` for every nav item — also added `(click)="closeMobileMenu()"` to the desktop-menu-only mobile links that were missing it (previously `navigateToRoute()` closed the mobile menu internally for every link; with plain `routerLink` each link needs it explicitly or the mobile menu stays open after navigating)
- [x] 6.4 `isActive()` already keyed off `activeRoute` (route-only) — no scroll-position dependency to remove, confirmed unchanged

## 7. Cleanup

- [x] 7.1 Home's section ids changed entirely (`#proyectos`, `#blog`, `#clientes`, `#experiencia`, `#educacion`, `#contacto`) as part of the section-by-section rebuild — the old `#resume`/`#portafolio` ids no longer exist, nothing reads them (nav no longer does `getElementById` lookups)
- [x] 7.2 Full-app grep swept for `navigateToRoute`/`scrollToSection`/skills-data leftovers — the only remaining `scrollToSection` hits are unrelated, independent local methods in `resume.component.ts`, `about-me.component.ts`, and `curriculum.component.ts` (same name, different self-contained feature, not calling into anything removed here). **New finding, out of scope for this change**: `core/data/skills.data.ts` now has zero consumers anywhere in the app — it was only read by the skills modal this change deleted. `/resume`'s `SkillsComponent` has its own separately-hardcoded skill list (the exact "two unsynced skill catalogs" bug from the original Fase 0 audit) and was never wired to this file. Worth a small follow-up change to either wire `SkillsComponent` to `skills.data.ts` (the original audit's recommendation) or delete the now-dead file — not done here since it's a `/resume`-page concern, outside this change's specs.

## 8. Verification

- [x] 8.1 `npm run build` — production build succeeds, only the 2 pre-existing warnings (lottie-web CJS, bootstrap selector), unrelated to this change
- [x] 8.2 Manual QA in Chrome (dev server, both languages): confirmed full section order hero → featured projects → blog → client projects → experience → education → contact. Hero role-rotator, value line, and all section copy verified in both ES and EN.
- [x] 8.3 Manual QA: coming-soon cards render "EN CONSTRUCCIÓN"/"IN PROGRESS", not clickable, dashed border. Client-secondary cards (ASOBANCA, Münster Mind, billusos, CONAFIS) show only title/description/stack — no "Resultados" figures visible.
- [x] 8.4 Manual QA: nav navigates correctly between pages. Bonus find verified live: clicking a featured project card on `/portfolio` now navigates to `/portfolio/project/:slug` — confirmed the previously-orphaned `ProjectDetailComponent` route renders correctly (ASOBANCA case study loaded with full content, badges, demo link).
