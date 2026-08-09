## ADDED Requirements

### Requirement: One shared project-card component with three variants
The system SHALL provide a single project-card component with three variants — `featured`, `coming-soon`, and `client-secondary` — used consistently by both the home page and `/portfolio`. No page SHALL implement its own separate project-card markup.

#### Scenario: Home and /portfolio render the same featured card
- **WHEN** the same project is shown as `featured` on home and on `/portfolio`
- **THEN** both use the same underlying card component and markup structure

### Requirement: Coming-soon cards are not clickable
A `coming-soon` project card SHALL NOT render a link, `routerLink`, or anchor of any kind. It SHALL display a status indicator (e.g. "En construcción") and a description of what the project will be, sourced from a static data list.

#### Scenario: Visitor interacts with a coming-soon card
- **WHEN** a visitor clicks anywhere on a `coming-soon` card
- **THEN** no navigation occurs and no URL changes

#### Scenario: Coming-soon card does not overstate readiness
- **WHEN** a visitor reads a `coming-soon` card
- **THEN** it clearly indicates an in-progress/planned state and does not present the project as available or complete

### Requirement: Client-secondary cards omit business-result content
A `client-secondary` project card SHALL render only the project title, a one-line description, and stack tags. It SHALL NOT render challenge, solution, or results content, including any business or usage figures.

#### Scenario: Visitor views the client-projects grid on home
- **WHEN** a visitor views a `client-secondary` card in home's client-projects section
- **THEN** they see only a title, one line of description, and stack tags — no numeric business metrics, no "Resultados"/"Desafíos"/"Soluciones" content

### Requirement: Client-secondary cards link to the unchanged full case study
A `client-secondary` card SHALL link to the existing `/portfolio/project/:slug` detail page, whose content is not modified by this capability.

#### Scenario: Visitor wants the full case study
- **WHEN** a visitor clicks a `client-secondary` card
- **THEN** they land on `/portfolio/project/:slug`, showing the same full detail (including any figures) that existed before this change

### Requirement: Coming-soon projects are sourced from a static list, not markdown content
Coming-soon project entries SHALL be sourced from a dedicated static data list, not from the markdown-based project content pipeline used for real projects. Once a project is real, it SHALL move to the standard markdown pipeline and its coming-soon entry SHALL be removed.

#### Scenario: A coming-soon project ships
- **WHEN** a previously coming-soon project (e.g. "Serverless RAG Agent on AWS") gets a real markdown case-study file and route
- **THEN** its entry is removed from the static coming-soon list and it appears as a `featured` card sourced from the standard project pipeline
