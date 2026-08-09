## ADDED Requirements

### Requirement: Fixed home section order
The home page SHALL render its sections in this order, top to bottom: hero, featured own projects, blog, client projects (secondary), experience, education, contact.

#### Scenario: Visitor scrolls through home
- **WHEN** a visitor loads `/home` and scrolls from top to bottom
- **THEN** they encounter hero, then featured own projects, then blog, then client projects, then experience, then education, then contact, in that order

### Requirement: Home sections are bounded summaries, not the source of truth
Each home section SHALL show a bounded preview of its content (not the full list) with a link to the corresponding full page, which remains the source of truth for that content.

#### Scenario: Visitor wants full project list
- **WHEN** a visitor views the featured-projects section on home
- **THEN** they see a limited set of project cards and a "Ver todo →" link to `/portfolio`, which shows the complete list

### Requirement: No standalone skills section on home
The home page SHALL NOT render a dedicated "Habilidades Técnicas" section (grid or modal). The full skills detail SHALL remain available on `/resume`.

#### Scenario: Visitor looks for a skills section on home
- **WHEN** a visitor scrolls through `/home`
- **THEN** there is no standalone skills grid or skills modal on the page
- **AND** technology is only visible via hero tech chips and per-project stack tags

#### Scenario: Visitor wants full skill detail
- **WHEN** a visitor clicks "Ver todo →" from the experience section, or navigates to `/resume` directly
- **THEN** they see the full skills grid with mastery detail, unchanged from before this change

### Requirement: Hero copy sourced from translations
The hero headline and value line SHALL be rendered through the existing translation system (ngx-translate), not as hardcoded text in the template. The site SHALL continue to default to Spanish (`es`).

#### Scenario: Default page load
- **WHEN** a visitor loads the site without changing language
- **THEN** the hero renders the Spanish translation of the headline and value line

#### Scenario: Language switched to English
- **WHEN** a visitor toggles the language to English
- **THEN** the hero renders "I build AI systems that reach production — backend, cloud, and applied LLMs on AWS." (or the approved English value line) without a page reload losing state

### Requirement: Education displayed last, with reduced prominence
The education section SHALL render after experience and before contact, without the section-label header treatment used for other sections (e.g. Experience, Blog).

#### Scenario: Visitor reaches the end of home
- **WHEN** a visitor scrolls past the experience section
- **THEN** education appears next, visually quieter than the sections above it, followed by contact

### Requirement: Security mentioned as a single interest line, not a section
The home page SHALL contain at most one sentence referencing security as an area of interest. It SHALL NOT present security as a specialization, and SHALL NOT have its own section heading.

#### Scenario: Visitor looks for a security section
- **WHEN** a visitor scans the home page for a dedicated "Security" section
- **THEN** none exists — only a single sentence referencing it as an interest, appearing inline within an existing section (e.g. hero or experience), not as its own heading
