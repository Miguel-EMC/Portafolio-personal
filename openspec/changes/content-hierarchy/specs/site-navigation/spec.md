## ADDED Requirements

### Requirement: Nav resolves every click to a route, never a conditional scroll
The main navigation SHALL route every click via a plain link to its target page (`/home`, `/resume`, `/portfolio`, `/about`, `/contact`, `/blog`). It SHALL NOT branch its behavior based on the current URL to decide between scrolling within the page and navigating to a different route.

#### Scenario: Clicking a nav item from any page
- **WHEN** a user on any page clicks "Portafolio" in the main nav
- **THEN** the browser navigates to `/portfolio`, regardless of what page the user was on when they clicked

#### Scenario: Clicking a nav item while already on home
- **WHEN** a user on `/home` clicks "Contacto" in the main nav
- **THEN** the browser navigates to `/contact` (the full page) rather than scrolling to a section within `/home`

### Requirement: No scroll-spy or anchor-scrolling logic tied to home sections
The nav component SHALL NOT contain scroll-to-section or scroll-position-based active-link logic keyed to home-page section ids. Active-link state SHALL be determined by the current route only.

#### Scenario: Determining the active nav item
- **WHEN** a user is on `/portfolio`
- **THEN** the nav highlights the "Portafolio" item based on the current route, not based on scroll position within a page
