---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
---

# WS-Portfolio-New - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for WS-Portfolio-New, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Visitor can view a card-based grid layout presenting all content sections on the landing page
- FR2: Visitor can click interactive cards (About Me, My Portfolio, Get In Touch) to expand them into full-screen overlays
- FR3: Visitor can close an expanded card to return to the grid view
- FR4: Visitor can see unique expansion animations per card (distinct animation style for each interactive card)
- FR5: Visitor can see skeleton loading placeholders that mirror the card grid shape during initial page load (**NOTE: Overridden by Architecture — replaced with React.lazy() + Suspense fallback, no SkeletonGrid component**)
- FR6: Visitor can see subtle ambient background motion on the landing page (gradient, particle, or colour pulse)
- FR7: Visitor can interact with hover effects on card previews that invite exploration
- FR8: Visitor can view personal profile information (name, nationality, status, languages)
- FR9: Visitor can view professional experience with timeline presentation
- FR10: Visitor can view education history
- FR11: Visitor can view a skills inventory with skills linked to portfolio projects that demonstrate them (skills-to-proof mapping)
- FR12: Visitor can view dynamically calculated years of professional experience
- FR13: Visitor can navigate from a skill to the portfolio project(s) that evidence it
- FR14: Visitor can access GitHub profile via a direct link
- FR15: Visitor can view portfolio projects with detailed descriptions including project purpose, tech stack, and key features
- FR16: Visitor can access live demo links for each portfolio project
- FR17: Visitor can access GitHub repository links for each portfolio project
- FR18: Visitor can view current, accurate screenshots for each portfolio project
- FR19: Visitor can navigate from a portfolio project back to related skills in the About Me section (proof-to-skills reverse mapping)
- FR20: Visitor can submit a contact message via an integrated contact form
- FR21: Visitor can complete reCAPTCHA verification before submitting the contact form
- FR22: Visitor can view contact information (location, email, social links)
- FR23: System can detect and track visitor landings with comprehensive visitor intelligence
- FR24: System can capture IP address and geolocation data (country, city, region, ISP)
- FR25: System can capture browser and device fingerprint data (user agent, browser, OS, device type, screen resolution, viewport size)
- FR26: System can capture referral and traffic source data (referrer URL, UTM parameters if present)
- FR27: System can capture visitor behaviour signals (landing timestamp, timezone, preferred language, connection type)
- FR28: System can compile all captured visitor data into a comprehensive email notification
- FR29: System can rate-limit visitor tracking to prevent duplicate notifications within a configurable window
- FR30: Owner can enable or disable visitor tracking via environment variable configuration
- FR31: Visitor tracking is disabled by default in development environment
- FR32: Visitor can view and interact with the full site on mobile devices with an adapted layout
- FR33: Visitor can navigate all interactive elements using keyboard only
- FR34: Visitor can access all content with screen reader compatibility
- FR35: Visitor can view the site in a consistent dark theme across all sections and breakpoints
- FR36: System can automatically build a Docker image on merge to main branch
- FR37: System can push built Docker images to a private container registry
- FR38: Owner can deploy the site by pulling the latest image in Portainer
- FR39: System can inject environment variables at build time for all external service integrations
- FR40: Owner can add, update, or remove portfolio projects by editing data files
- FR41: Owner can update personal profile data (experience, skills, education) by editing data files
- FR42: Owner can update portfolio screenshots by replacing asset files
- FR43: Search engines can discover and index the site via meta tags, Open Graph, and canonical URL
- FR44: Search engines can access a robots.txt and sitemap

### NonFunctional Requirements

- NFR1: First Contentful Paint < 1.5s on standard broadband connection
- NFR2: Largest Contentful Paint < 2.5s
- NFR3: Cumulative Layout Shift < 0.1
- NFR4: Lighthouse Performance score ≥ 90
- NFR5: Card expansion animations render at 60fps with no visible frame drops
- NFR6: Ambient background motion runs without measurable main thread impact
- NFR7: Production bundle size within 2.5MB per asset/entrypoint
- NFR8: Skeleton-to-content transition completes without layout shift (now React.lazy/Suspense transition per Architecture)
- NFR9: Vendor chunk splitting for cache efficiency
- NFR10: Image assets optimised (WebP/AVIF where supported, responsive srcset)
- NFR11: Docker image builds complete in under 5 minutes in CI/CD pipeline
- NFR12: Production Docker image under 150MB
- NFR13: No API keys, service IDs, or secrets committed to the repository
- NFR14: Environment variables injected at build time only — no runtime exposure of secrets in client bundle
- NFR15: reCAPTCHA validation required before contact form submission
- NFR16: Visitor tracking data transmitted via EmailJS (HTTPS) — no plaintext transmission
- NFR17: No personally identifiable information stored client-side beyond localStorage rate-limiting key
- NFR18: Content Security Policy headers configured to restrict script and resource origins
- NFR19: Lighthouse Accessibility score ≥ 90
- NFR20: WCAG AA colour contrast compliance across all dark theme elements
- NFR21: All interactive elements reachable and operable via keyboard (Tab, Enter, Escape)
- NFR22: Focus trapped within expanded card overlays; focus restored on close
- NFR23: All images include descriptive alt text
- NFR24: Semantic HTML structure (landmarks, headings, roles) throughout
- NFR25: Mobile touch targets minimum 44x44px
- NFR26: Site fully functional and readable across device widths 375px to 1920px+
- NFR27: EmailJS service degradation must not affect site usability — visitor tracking and contact form fail silently with no visible error to visitor
- NFR28: ipapi.co geolocation lookup failure must not block visitor tracking — system sends notification with available data
- NFR29: reCAPTCHA service unavailability must not permanently block contact form — graceful error message displayed
- NFR30: All external service calls include timeout handling (no indefinite pending states)

### Additional Requirements

- AR1: **In-place migration architecture** — no starter template. Brownfield upgrade of existing React 19 + Webpack 5 application. All changes are incremental migrations, not greenfield builds.
- AR2: **Dependency upgrades** — Node.js 22.x → 24.x LTS, TypeScript 5.9.2 → 6.0, React 19.1.0 → 19.2.x, Framer Motion → 12.38.x, Webpack 5 to latest 5.x.
- AR3: **Tailwind CSS v4.1 integration** — Install tailwindcss, @tailwindcss/postcss, postcss, postcss-loader, autoprefixer. Configure PostCSS pipeline in Webpack. Create `src/styles/main.css` with `@import "tailwindcss"` and `@theme` design tokens from UX spec.
- AR4: **cn() helper utility** — Create `src/lib/cn.ts` using clsx + tailwind-merge for conditional class composition. Required before any component migration.
- AR5: **Environment config helper** — Create `src/config/env.ts` with `window.__ENV?.KEY || process.env.KEY || ''` pattern. Update `src/types/env.d.ts` for `window.__ENV` type declaration.
- AR6: **Leaf-to-root component migration** — Migrate all components from styled-components to Tailwind CSS, starting with leaf components (FaIcon, HoverText, CloseButton) progressing to parent components (MainPage). Each component verified in isolation before moving to next.
- AR7: **Component folder renaming** — During Phase 1a migration: `box2/` → `namecard/`, `box3/` → `about/`, `box4/` → `portfolio/`, `box5/` → `contact/`. Update all import paths including `renderChildDiv.tsx`.
- AR8: **styled-components removal** — Remove styled-components dependency and `GlobalStyle.ts` only after all components are fully migrated to Tailwind.
- AR9: **No SkeletonGrid component** — Architecture overrides UX spec. React.lazy() wraps expanded card content for code splitting with minimal Suspense fallback (spinner or fade-in within overlay, not a full skeleton grid).
- AR10: **Pure CSS ambient background** — `@keyframes` animation with `background-position` or gradient shift, `position: fixed`, `aria-hidden="true"`, 30-60s cycle. Zero JS overhead.
- AR11: **Multi-stage Docker build** — Stage 1: `node:24-alpine` builds the app. Stage 2: `node:24-alpine` slim copies `/dist`, installs `serve`, copies `docker-entrypoint.sh`. Targets < 150MB.
- AR12: **Runtime env var injection** — `docker-entrypoint.sh` reads container env vars, writes `config.js` to `/dist/`, `index.html` includes `<script src="/config.js">`. No build args for secrets. Single image across environments.
- AR13: **GitHub Actions CI/CD** — Trigger on merge to main. Checkout → Docker login (registry.wsapz.com, user `warrick`, secret `REGISTRY_PASSWORD`) → Multi-stage build → Push `registry.wsapz.com/ws-portfolio-new:latest`.
- AR14: **AnimatePresence for card expansion** — Replace `isClosed` + `useEffect` workaround with `AnimatePresence` `onExitComplete` pattern for clean card mount/unmount transitions.
- AR15: **ExpandableItem shared component** — `src/components/common/ExpandableItem.tsx`. Wraps Framer Motion `layout` + `AnimatePresence` + spring physics. Used by both card grid expansion and project card expansion within Portfolio overlay.
- AR16: **Spring physics per-card variants** — Each card uses unique spring configs (stiffness/damping). Card 3 (About): slide up with content reveal. Card 4 (Portfolio): morph from centre with scale. Card 5 (Contact): unfold from bottom edge.
- AR17: **Content stagger animation** — Heading (0ms) → body (100ms) → links (200ms) via Framer Motion `staggerChildren` on card expansion open. No stagger on close (instant exit together).
- AR18: **Backdrop blur** — DimmedBackdrop adds `backdrop-filter: blur()` for depth separation between grid and expanded overlay.
- AR19: **Cross-card navigation** — Close animation plays fully → grid visible briefly → target card open animation plays → content scrolls to target. No hard cuts. Applies to skills-to-proof and proof-to-skills navigation.
- AR20: **docker-compose.yml updates** — Port mapping 3000:3000, environment variables from Portainer stack, `.env.example` with all required variables documented.

### UX Design Requirements

- UX-DR1: **Colour system implementation** — 6 background layers (`bg-base` #0a0a0a through `bg-expanded`), 3 accent colours (primary gold #d4a843, soft gold, warm gold), 4 text hierarchy levels (primary #f5f5f5, secondary, tertiary, disabled), 3 border tokens (subtle, hover, accent), 3 semantic colours (success #34d399, error #f87171, info #60a5fa). All defined as Tailwind `@theme` tokens.
- UX-DR2: **Typography system** — Inter font family for headings and body text, JetBrains Mono/Fira Code for monospace. 7-level type scale: Display (36px/600), H2 (28px/600), H3 (20px/600), Body Large (18px/400), Body (16px/400), Body Small (14px/400), Caption (12px/500). Line heights and letter spacing specified per level.
- UX-DR3: **Spacing system** — 4px base unit. Scale: space-1 (4px) through space-24 (96px). Border radii: sm (8px), md (12px), lg (16px), xl (24px). Box shadows: ambient, elevated, glow, focus-ring with specified values.
- UX-DR4: **5-layer card hover effect** — Cursor-tracking radial glow (`--mx`, `--my` CSS vars), `scale-[1.02]` transform, gold gradient corner bleed, gold text-shadow pulse on title (1.5s cycle, holds at glow-on), deepened ambient shadow. All effects 400-500ms `cubic-bezier(0.16, 1, 0.3, 1)`.
- UX-DR5: **CardGrid component** — Desktop: 3×2 CSS Grid (Card 1 spans full left column). Tablet (768-999px): 2-column, Card 1 spans full width top. Mobile (<768px): single column, Card 1 hidden. Grid gaps: 48px desktop, 32px tablet, 24px mobile.
- UX-DR6: **Card component** — Two variants: `interactive` (Cards 2-5) and `background` (Card 1, image only). Resting state: gradient surface. Focused state: gold border glow (keyboard equivalent of hover). `role="button"`, `aria-expanded`, `tabindex="0"`.
- UX-DR7: **CardExpansionOverlay** — Full viewport with `bg-expanded` surface + diagonal gradient. Content max-width 800px centred. Padding: 64px desktop, 48px tablet, 24px mobile. Scrollable overflow. Focus trap when open. `role="dialog"`, `aria-modal="true"`. Escape key closes. Focus returns to triggering card on close.
- UX-DR8: **DimmedBackdrop** — Opacity 0.3, backdrop-blur. Fade in/out 300ms synced with card expansion. Click on backdrop closes expanded card. `aria-hidden="true"`, not focusable.
- UX-DR9: **SkeletonGrid** — (**NOTE: Overridden by Architecture decision AR9. No SkeletonGrid component will be built. React.lazy() + Suspense fallback replaces skeleton loading.**)
- UX-DR10: **AboutMeContent** — Display heading, professional summary, SkillsGrid, experience section, education section. Single column, content stagger-animated on entry. Skills-to-proof links via gold-bordered SkillBadges that navigate to portfolio projects.
- UX-DR11: **PortfolioContent** — Display heading + list of ProjectCard components. Single column layout.
- UX-DR12: **ProjectCard** — Image-first hierarchy: screenshot at top, content below. Project name, description (purpose + key features), TechBadge row, ExternalLinkButton pair (Live Demo + GitHub). Semantic `<article>`. Image has descriptive `alt` text. Subtle border-hover shift on hover.
- UX-DR13: **ContactContent + ContactForm** — Display heading, intro text, ContactForm. Form has: name field, email field, message textarea, reCAPTCHA widget, submit button. 6 states: empty, filling, validating (inline errors on blur), submitting (loading), success (green), error (red with retry). All fields have visible `<label>`. Errors via `aria-describedby`. Button `aria-busy` during sending.
- UX-DR14: **ApproachContent** — Display heading, process/methodology description, adaptability statement. Text-focused with generous whitespace.
- UX-DR15: **SkillBadge** — Two variants: `default` (border-subtle, text-secondary, presentational) and `linked` (border-accent, text-accent, `role="link"`, clickable with descriptive `aria-label`). Monospace font. Hover on linked: accent-soft background fill.
- UX-DR16: **TechBadge** — Non-interactive tech label. Monospace, caption size. Border-subtle, text-tertiary. Smaller than SkillBadge.
- UX-DR17: **GoldPulseText** — Animated text wrapper for card titles. On parent Card hover: text-shadow pulse cycle 0 → gold glow → 0 over 1.5s, single-layer text-shadow using accent-primary. Holds at glow-on after one cycle. Respects `prefers-reduced-motion` (static gold text-shadow, no animation).
- UX-DR18: **CloseButton** — × icon, fixed top-right of overlay (24px inset). States: default (bg-elevated, border-subtle, text-secondary), hover (text-primary, border-hover), focused (border-accent glow). `aria-label="Close"`, focusable, Escape key equivalent.
- UX-DR19: **ExternalLinkButton** — Two variants: `primary` (border-accent, text-accent for Live Demo) and `secondary` (border-subtle, text-secondary for GitHub). Label text + arrow icon (↗). Opens new tab. `aria-label` includes destination context.
- UX-DR20: **SectionHeading** — H3 size (20px), weight 600, text-accent colour. Consistent bottom margin (space-3/12px).
- UX-DR21: **AmbientBackground** — CSS gradient animation behind card grid, 30-60s cycle, low contrast, must not compete for attention. `aria-hidden="true"`. CSS-only, GPU-accelerated. Static gradient for reduced motion.
- UX-DR22: **Three-tier interactive element hierarchy** — Tier 1 (gold accent): card click, Live Demo links, submit button, linked SkillBadges. Tier 2 (neutral): GitHub links, close button, non-linked SkillBadges. Tier 3 (minimal): backdrop click, Escape key. Gold reserved exclusively for Tier 1.
- UX-DR23: **Form feedback patterns** — Field focus: border to accent with gold glow (instant). Inline validation: error border + message on blur, not on keystroke. Submitting: button text "Sending..." with pulse, fields disabled. Success: green border/text "Message sent", fields clear after 1s. Error: red border/text, fields preserved for retry.
- UX-DR24: **Animation timing standards** — Micro: 150-200ms ease-out (hover states). Standard: 300-400ms cubic-bezier(0.16,1,0.3,1) (card hover, fades). Emphasis: 400-600ms spring (card expansion, stagger). Ambient: 30-60s linear (background). Signature: 1.5s ease-in-out (gold text pulse).
- UX-DR25: **Overlay patterns** — Z-index stack: base(0), content(1), dimmed(10), overlay(20), close(30). Scroll locked on body when overlay open. Three close triggers always available: CloseButton, backdrop click, Escape. State preserved across open/close. No nesting.
- UX-DR26: **Responsive breakpoints** — Mobile-first. Mobile (<768px): single column, Card 1 hidden, no hover effects, tap-to-expand, touch targets ≥44px. Tablet (768-999px): 2-column grid, touch or pointer. Desktop (≥1000px): 3×2 grid, full 5-layer hover, 800px max content width.
- UX-DR27: **Keyboard navigation** — Tab/Shift+Tab between cards. Enter/Space expands focused card. Escape closes overlay and returns focus to trigger card. Tab cycles within overlay.
- UX-DR28: **Semantic HTML** — `<main aria-label="Portfolio">`, `<div role="button" aria-expanded>` for cards, `<div role="dialog" aria-modal="true">` for overlay, `<article>` for ProjectCard, `<form>` with `<label>`, `<span role="alert" aria-live="polite">` for validation.
- UX-DR29: **Focus management** — On expansion: focus to CloseButton. Focus trapped within overlay. On close: focus returns to triggering Card. `focus-visible:` for keyboard-only focus rings (gold border glow matching hover treatment).
- UX-DR30: **Reduced motion as first-class** — All CSS transitions: duration 0ms. All Framer Motion: duration 0, no spring. Gold pulse: static shadow. Skeleton shimmer: static. Ambient: static. Card expansion: instant opacity fade only. Fully functional and visually complete with all motion disabled.

### FR Coverage Map

- FR1: Epic 2 — Card-based grid layout on landing page
- FR2: Epic 2 — Click interactive cards to expand into overlays
- FR3: Epic 2 — Close expanded card to return to grid
- FR4: Epic 2 — Unique expansion animations per card
- FR5: Epic 2 — Lazy-loaded expanded content with Suspense fallback (modified per AR9)
- FR6: Epic 2 — Ambient background motion on landing page
- FR7: Epic 2 — Hover effects on card previews
- FR8: Epic 3 — View personal profile information
- FR9: Epic 3 — View professional experience with timeline
- FR10: Epic 3 — View education history
- FR11: Epic 3 — Skills inventory with skills-to-proof mapping
- FR12: Epic 3 — Dynamically calculated years of experience
- FR13: Epic 3 — Navigate from skill to portfolio project proof
- FR14: Epic 3 — Access GitHub profile via direct link
- FR15: Epic 4 — View portfolio projects with detailed descriptions
- FR16: Epic 4 — Access live demo links for projects
- FR17: Epic 4 — Access GitHub repository links for projects
- FR18: Epic 4 — View current, accurate screenshots for projects
- FR19: Epic 4 — Navigate from project back to related skills (proof-to-skills)
- FR20: Epic 5 — Submit contact message via integrated form
- FR21: Epic 5 — reCAPTCHA verification before contact form submission
- FR22: Epic 5 — View contact information (location, email, social links)
- FR23: Epic 5 — Detect and track visitor landings
- FR24: Epic 5 — Capture IP address and geolocation data
- FR25: Epic 5 — Capture browser and device fingerprint data
- FR26: Epic 5 — Capture referral and traffic source data
- FR27: Epic 5 — Capture visitor behaviour signals
- FR28: Epic 5 — Compile visitor data into email notification
- FR29: Epic 5 — Rate-limit visitor tracking notifications
- FR30: Epic 1 — Enable/disable visitor tracking via env var
- FR31: Epic 1 — Visitor tracking disabled by default in development
- FR32: Epic 6 — Full site on mobile with adapted layout
- FR33: Epic 6 — Keyboard-only navigation for all elements
- FR34: Epic 6 — Screen reader compatibility for all content
- FR35: Epic 2 — Consistent dark theme across all sections and breakpoints
- FR36: Epic 1 — Automatically build Docker image on merge to main
- FR37: Epic 1 — Push Docker images to private container registry
- FR38: Epic 1 — Deploy by pulling latest image in Portainer
- FR39: Epic 1 — Inject environment variables at build time
- FR40: Epic 4 — Add, update, or remove portfolio projects via data files
- FR41: Epic 4 — Update personal profile data via data files
- FR42: Epic 4 — Update portfolio screenshots via asset files
- FR43: Epic 6 — Meta tags, Open Graph, and canonical URL for discoverability
- FR44: Epic 6 — robots.txt and sitemap for search engines

## Epic List

### Epic 1: Foundation & CI/CD Pipeline
Owner can deploy the modernized site through an automated CI/CD pipeline. The tech stack is upgraded (Node.js 24, TypeScript 6.0, React 19.2.x, Framer Motion 12.x) and the codebase is migrated from styled-components to Tailwind CSS v4.1. Multi-stage Docker build with runtime env var injection. GitHub Actions CI/CD pushes to self-hosted registry. This is the brownfield "starter template equivalent" — all subsequent epics depend on this foundation.
**FRs covered:** FR30, FR31, FR36, FR37, FR38, FR39
**ARs covered:** AR1, AR2, AR3, AR4, AR5, AR6, AR7, AR8, AR11, AR12, AR13, AR20

### Epic 2: Card Grid & Interactive Landing Experience
Visitors land on an impressive dark-themed card grid with ambient background motion, a 5-layer hover effect (cursor-tracking glow, scale, gradient corner bleed, gold text pulse, deepened shadow), and unique per-card expansion animations with spring physics. Cards expand into full-screen overlays with backdrop blur and content stagger. The "this isn't a template" first impression.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR35
**ARs covered:** AR9, AR10, AR14, AR15, AR16, AR17, AR18
**UX-DRs covered:** UX-DR1, UX-DR2, UX-DR3, UX-DR4, UX-DR5, UX-DR6, UX-DR7, UX-DR8, UX-DR17, UX-DR18, UX-DR20, UX-DR21, UX-DR22, UX-DR24, UX-DR25

### Epic 3: About Me & Skills Showcase
Visitors can explore Warrick's professional profile — scannable skills grid with skills-to-proof mapping (gold-bordered SkillBadges link to portfolio projects), experience timeline, education history, dynamically calculated experience years, and GitHub profile link. Designed for the recruiter's 90-second scan.
**FRs covered:** FR8, FR9, FR10, FR11, FR12, FR13, FR14
**ARs covered:** AR19
**UX-DRs covered:** UX-DR10, UX-DR15

### Epic 4: Portfolio & Project Showcase
Visitors can explore portfolio projects with rich descriptions (purpose, key features), current screenshots, tech stack badges, live demo links, and GitHub repos. Proof-to-skills reverse mapping links back to About Me. Stale projects removed, URLs updated (Money Manager → mm.wsapz.com), RaceDay screenshot refreshed. Data-driven content management via data files.
**FRs covered:** FR15, FR16, FR17, FR18, FR19, FR40, FR41, FR42
**UX-DRs covered:** UX-DR11, UX-DR12, UX-DR14, UX-DR16, UX-DR19

### Epic 5: Contact & Visitor Intelligence
Visitors can send messages through a polished contact form with inline validation, reCAPTCHA spam protection, and clear success/error feedback states. The system tracks visitor landings with geolocation, device fingerprint, referral data, and behaviour signals — compiled into notification emails with rate limiting. All toggleable via environment config.
**FRs covered:** FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29
**UX-DRs covered:** UX-DR13, UX-DR23

### Epic 6: Responsive Design, Accessibility & SEO
The site works flawlessly across mobile (<768px single column), tablet (768-999px 2-column), and desktop (≥1000px 3×2 grid). Fully navigable by keyboard with focus trapping in overlays. Screen reader compatible with semantic HTML and ARIA. Reduced motion is a first-class experience. Meta tags, Open Graph, canonical URL, robots.txt, and sitemap for search engine discoverability. Lighthouse ≥ 90 across all categories.
**FRs covered:** FR32, FR33, FR34, FR43, FR44
**UX-DRs covered:** UX-DR26, UX-DR27, UX-DR28, UX-DR29, UX-DR30
**NFRs addressed:** NFR1-NFR4, NFR19-NFR26

### Dependency Flow

```
Epic 1 (Foundation) → Epic 2 (Card Grid) → Epics 3, 4, 5 (parallel-capable) → Epic 6 (Polish)
```

## Epic 1: Foundation & CI/CD Pipeline

Owner can deploy the modernized site through an automated CI/CD pipeline. The tech stack is upgraded (Node.js 24, TypeScript 6.0, React 19.2.x, Framer Motion 12.x) and the codebase is migrated from styled-components to Tailwind CSS v4.1. Multi-stage Docker build with runtime env var injection. GitHub Actions CI/CD pushes to self-hosted registry.

### Story 1.1: Upgrade Dependencies and Runtime

As the site owner,
I want all dependencies upgraded to latest stable versions on Node.js 24,
So that the codebase is on a modern, supported stack before any migration or feature work begins.

**Acceptance Criteria:**

**Given** the existing project running on Node.js 22.x with TypeScript 5.9.2, React 19.1.0, and current dependency versions
**When** all dependencies are upgraded
**Then** Node.js minimum is 24.x LTS, TypeScript is 6.0, React is 19.2.x, Framer Motion is 12.38.x, Webpack is latest 5.x, and all remaining dependencies are at latest stable versions
**And** `npm run dev` starts the development server successfully on port 3000
**And** `npm run build` completes a production build without errors
**And** the existing site renders correctly in the browser with no visual regressions
**And** `package.json` engines field specifies Node.js ≥ 24
**And** `tsconfig.json` is updated for TypeScript 6.0 settings
**And** no deprecated packages remain in the dependency tree

### Story 1.2: Tailwind CSS Integration and Utility Helpers

As a developer,
I want Tailwind CSS v4.1 integrated into the Webpack pipeline with design tokens and utility helpers,
So that I have the styling foundation and tooling needed to migrate components from styled-components.

**Acceptance Criteria:**

**Given** the upgraded project from Story 1.1
**When** Tailwind CSS v4.1 is installed and configured
**Then** `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `postcss-loader`, and `autoprefixer` are installed
**And** `postcss.config.cjs` is created with the `@tailwindcss/postcss` plugin
**And** `webpack.common.cjs` includes `postcss-loader` in the CSS processing pipeline
**And** `src/styles/main.css` exists with `@import "tailwindcss"` and `@theme` block containing all design tokens from the UX spec (colour system: bg-base through bg-elevated, accent palette, text hierarchy, border tokens, semantic colours; typography scale; spacing scale; border radii; box shadows; animation timing tokens; breakpoints at 768px and 1000px)
**And** `src/styles/main.css` is imported in `App.tsx`
**And** `src/lib/cn.ts` exists exporting a `cn()` function using `clsx` + `tailwind-merge`
**And** `src/config/env.ts` exists with the pattern `window.__ENV?.KEY || process.env.KEY || ''` for all environment variables (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_CONTACT_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, RECAPTCHA_SITE_KEY, DEBUG_VISITOR_TRACKING, API_URL, ENABLE_VISITOR_TRACKING)
**And** `src/types/env.d.ts` is updated with `window.__ENV` type declaration
**And** Tailwind utility classes render correctly when added to any component
**And** existing styled-components continue to work alongside Tailwind (coexistence verified)

### Story 1.3: Component Migration — Common and Leaf Components

As a developer,
I want all common/leaf components migrated from styled-components to Tailwind CSS,
So that the lowest-level building blocks use the new styling system and can be verified in isolation before parent components migrate.

**Acceptance Criteria:**

**Given** Tailwind CSS and cn() helper are available from Story 1.2
**When** leaf and common components are migrated
**Then** `FaIcon.tsx` uses Tailwind utility classes instead of styled-components
**And** `CloseButton.tsx` uses Tailwind with states: default (bg-elevated, border-subtle, text-secondary), hover (text-primary, border-hover), focused (border-accent glow)
**And** `HoverText.tsx` is removed — functionality replaced by Tailwind utility classes
**And** `HoverTextWrapper.tsx` is removed — replaced by `GoldPulseText.tsx` in `common/` using Tailwind `animate-` utility with custom `@keyframes gold-pulse`
**And** `CardHeader.tsx` is removed — replaced by `SectionHeading.tsx` in `common/` (H3 20px, weight 600, text-accent, bottom margin space-3)
**And** `Page.tsx` is removed — replaced by Tailwind layout classes
**And** `ParagraphSeparator.tsx` is removed — replaced by Tailwind border utility
**And** `WordSlider.tsx` uses Tailwind utility classes instead of styled-components
**And** each migrated component renders correctly with no visual regressions
**And** no styled-component imports remain in any migrated file

### Story 1.4: Component Migration — Feature Components and Folder Renames

As a developer,
I want all feature components migrated to Tailwind CSS with semantic folder names,
So that the codebase uses consistent styling and clear naming conventions.

**Acceptance Criteria:**

**Given** common/leaf components are migrated from Story 1.3
**When** feature components are migrated and folders renamed
**Then** `src/components/box2/` is renamed to `src/components/namecard/` containing `NameCard.tsx` (renamed from `Box2.tsx`)
**And** `src/components/box3/` is renamed to `src/components/about/` containing `AboutCard.tsx` (from `Box3.tsx`) and `AboutContent.tsx` (from `Box3Content.tsx`)
**And** `src/components/box4/` is renamed to `src/components/portfolio/` containing `PortfolioCard.tsx` (from `Box4.tsx`) and `PortfolioContent.tsx` (from `Box4Content.tsx`)
**And** `src/components/box5/` is renamed to `src/components/contact/` containing `ContactCard.tsx` (from `Box5.tsx`), `ContactContent.tsx` (from `Box5Content.tsx`), and `ContactForm.tsx`
**And** `src/components/common/GridComponents.tsx` is split into `Card.tsx`, `CardGrid.tsx`, and `DimmedBackdrop.tsx` in `common/`
**And** `src/components/common/renderChildDiv.tsx` import paths are updated for all renamed components
**And** `MainPage.tsx` uses Tailwind classes and updated imports
**And** `VisitorTracker.tsx` imports environment variables from `src/config/env.ts` instead of `process.env` directly
**And** `useVisitorTracker.ts` imports from `src/config/env.ts`
**And** `ipGeolocationService.ts` imports from `src/config/env.ts`
**And** all box3/cellContent/* files are consolidated into flat `AboutContent.tsx`
**And** `ContactMe.tsx` content is absorbed into `ContactContent.tsx`
**And** each migrated component renders correctly with no visual regressions
**And** `npm run build` succeeds with zero errors

### Story 1.5: Styled-Components Removal and Dead Code Cleanup

As the site owner,
I want styled-components fully removed and dead code cleaned up,
So that the codebase has zero legacy styling dependencies and no unused resources.

**Acceptance Criteria:**

**Given** all components are migrated to Tailwind from Stories 1.3 and 1.4
**When** styled-components is removed and dead code is cleaned
**Then** `styled-components` and `@types/styled-components` are uninstalled from package.json
**And** `src/GlobalStyle.ts` is deleted
**And** no file in the codebase contains `import styled from 'styled-components'` or any styled-components import
**And** `src/assets/reservationizr-img.jpg` is deleted (stale project removed from portfolio)
**And** `src/assets/tic-tac-toe.jpg` is deleted (stale project removed from portfolio)
**And** no unused component files, stale imports, or unreferenced assets remain
**And** `npm run build` completes successfully with zero warnings related to unused imports
**And** the site renders correctly in the browser matching existing visual appearance
**And** bundle size is reduced compared to pre-migration (no styled-components runtime)

### Story 1.6: Docker Build and Runtime Environment

As the site owner,
I want a multi-stage Docker build with runtime environment variable injection,
So that a single Docker image works across all environments without baking secrets into the build.

**Acceptance Criteria:**

**Given** the fully migrated codebase from Story 1.5
**When** the Docker build infrastructure is created
**Then** `Dockerfile` uses multi-stage build: Stage 1 (`node:24-alpine`) installs dependencies and runs `npm run build`; Stage 2 (`node:24-alpine` slim) copies `/dist`, installs `serve` only, copies `docker-entrypoint.sh`
**And** `docker-entrypoint.sh` reads environment variables from the container and generates `/dist/config.js` containing `window.__ENV = { ... }` before starting `serve`
**And** `index.html` includes `<script src="/config.js"></script>` before the app bundle
**And** `docker-compose.yml` maps port 3000:3000 and passes all environment variables (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_CONTACT_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, RECAPTCHA_SITE_KEY, DEBUG_VISITOR_TRACKING, API_URL, ENABLE_VISITOR_TRACKING)
**And** `.env.example` documents all required environment variables with descriptions
**And** `ENABLE_VISITOR_TRACKING` defaults to `false` — visitor tracking is disabled unless explicitly enabled (FR30, FR31)
**And** `docker compose build` succeeds and produces an image under 150MB (NFR12)
**And** `docker compose up` starts the application and serves the site correctly
**And** environment variables from the container are accessible via `src/config/env.ts` at runtime

### Story 1.7: CI/CD Pipeline and Deployment Configuration

As the site owner,
I want a GitHub Actions pipeline that automatically builds and pushes Docker images on merge to main,
So that deployment is automated with zero manual Docker build steps.

**Acceptance Criteria:**

**Given** the Docker build from Story 1.6 works correctly
**When** the CI/CD pipeline is created
**Then** `.github/workflows/ci.yml` exists with a workflow triggered on push/merge to main branch
**And** the workflow steps are: checkout → Docker login to `registry.wsapz.com` (username `warrick`, password from `REGISTRY_PASSWORD` secret) → multi-stage Docker build → push to `registry.wsapz.com/ws-portfolio-new:latest`
**And** no build args are passed for environment variables (secrets are injected at runtime, not build time) (NFR13, NFR14)
**And** the pipeline completes build + push in under 5 minutes (NFR11)
**And** FR36 is satisfied: Docker image builds automatically on merge to main
**And** FR37 is satisfied: image is pushed to private container registry
**And** FR38 is satisfied: owner can pull latest image in Portainer to deploy
**And** FR39 is satisfied: environment variables are injectable at runtime for all service integrations
**And** CLAUDE.md is updated to reflect the new project architecture (Tailwind CSS, cn(), env.ts patterns, folder structure, Docker build, CI/CD)
**And** `docs/` documentation is updated for all foundation changes

## Epic 2: Card Grid & Interactive Landing Experience

Visitors land on an impressive dark-themed card grid with ambient background motion, a 5-layer hover effect, and unique per-card expansion animations with spring physics. Cards expand into full-screen overlays with backdrop blur and content stagger. The "this isn't a template" first impression.

### Story 2.1: Card Grid Layout and Dark Theme Foundation

As a visitor,
I want to see a card-based grid layout on a dark-themed landing page,
So that I immediately see all content sections and sense this is a custom-built site.

**Acceptance Criteria:**

**Given** the Tailwind CSS foundation from Epic 1 with all design tokens configured
**When** the landing page loads
**Then** a CardGrid component renders a 3×2 CSS Grid on desktop (≥1000px) with Card 1 spanning the full left column height and Cards 2-5 filling the remaining cells
**And** on tablet (768-999px) the grid reflows to 2 columns with Card 1 spanning full width top row
**And** on mobile (<768px) cards stack in a single column with Card 1 hidden entirely
**And** grid gaps are 48px (space-12) on desktop, 32px (space-8) on tablet, 24px (space-6) on mobile
**And** the page background uses `bg-base` (#0a0a0a) as the deepest layer
**And** Card 1 displays a background image and is non-interactive (no click handler, no hover effects)
**And** Cards 2-5 display in their resting state: gradient surface (`bg-card` #161616 → #131313), 16px rounded corners, 1px `border-subtle` border
**And** each interactive card shows an icon, title, and one-line description
**And** the dark theme is consistent across all cards and the page background (FR35)
**And** CardGrid uses semantic `<main aria-label="Portfolio">` landmark

### Story 2.2: Card Hover Effects and GoldPulseText

As a visitor,
I want to see rich, layered hover effects when I move my cursor over cards,
So that I feel invited to click and immediately sense the craft and attention to detail.

**Acceptance Criteria:**

**Given** the card grid from Story 2.1 is rendered with interactive cards
**When** the visitor hovers over an interactive card (Cards 2-5)
**Then** 5 simultaneous hover effects activate:
1. A cursor-tracking radial glow follows the mouse position using CSS custom properties (`--mx`, `--my`) set via a lightweight mousemove handler, with `accent-primary` at 6% opacity fading to transparent at 60% radius
2. The card scales to 1.02x with spring physics easing
3. A gold gradient corner bleed appears from the nearest corner using `accent-primary-glow` (25% opacity) fading to transparent by 50%
4. The card title text gains a gold `text-shadow` pulse via GoldPulseText component: 0 → soft gold glow → 0 over 1.5s cycle, holds at glow-on after one full cycle
5. The ambient shadow deepens and extends, creating physical lift
**And** all hover effects use `cubic-bezier(0.16, 1, 0.3, 1)` timing — 400ms for transform and shadow, 500ms for glow and gradient
**And** when the cursor leaves mid-animation, all transitions reverse smoothly from current state (no snapping)
**And** on touch devices (`@media (hover: none)`) cursor-tracking glow is disabled and replaced with tap feedback (brief accent border flash)
**And** GoldPulseText respects `prefers-reduced-motion` — static gold text-shadow with no animation
**And** hover effects use Tailwind/CSS only (not Framer Motion) per the animation boundary pattern

### Story 2.3: Card Expansion and Overlay System

As a visitor,
I want to click a card and have it expand into a full-screen overlay with my content,
So that I can explore detailed content while the grid stays accessible behind a dimmed backdrop.

**Acceptance Criteria:**

**Given** interactive cards are rendered in the grid from Story 2.1
**When** a visitor clicks an interactive card
**Then** a CardExpansionOverlay renders with `bg-expanded` (#141414) surface and subtle diagonal gradient; on mobile it fills the viewport, while on tablet and desktop it expands into the shared hero-adjacent region so the hero image remains visible behind the dimmed backdrop
**And** a DimmedBackdrop fades in to opacity 0.3 with `backdrop-filter: blur()` over 300ms, synchronised with card expansion
**And** expanded card content area has max-width 800px centred, with padding: 64px (space-16) on desktop, 48px (space-12) on tablet, 24px (space-6) on mobile
**And** the overlay content is scrollable with body scroll locked (`overflow: hidden` on `<body>`)
**And** a CloseButton renders at the overlay shell's top-right (24px inset) with × icon, states: default (bg-elevated, border-subtle, text-secondary), hover (text-primary, border-hover), focused (border-accent glow), `aria-label="Close"`
**And** three close triggers work: CloseButton click, DimmedBackdrop click, Escape key — all close the expanded card
**And** z-index stack is maintained: base(0), content(1), dimmed(10), overlay(20), close(30)
**And** expanded card content is loaded via `React.lazy()` with a minimal Suspense fallback (fade-in, not a full skeleton) per AR9
**And** only one card can be expanded at a time — grid is non-interactive while overlay is open
**And** CardExpansionOverlay uses `role="dialog"`, `aria-modal="true"`, `aria-label` from the card title
**And** grid scroll position and card states are preserved after closing an overlay

### Story 2.4: Per-Card Expansion Animations and Spring Physics

As a visitor,
I want each card to expand with its own unique, crafted animation,
So that each click creates a moment of delight and rewards exploration.

**Acceptance Criteria:**

**Given** the card expansion overlay system from Story 2.3
**When** a visitor clicks different interactive cards
**Then** each card expands with a unique animation character while retaining the "expand from grid position" origin:
- Card 3 (About Me): slides up with content revealing top-down
- Card 4 (My Portfolio): morphs from centre with scale emphasis
- Card 5 (Get In Touch): unfolds from bottom edge
**And** all expansion animations use Framer Motion spring physics (`type: "spring"` with per-card stiffness/damping configs) for a physical, premium feel
**And** an ExpandableItem shared component (`src/components/common/ExpandableItem.tsx`) wraps Framer Motion `layout` + `AnimatePresence` + spring config, accepting animation variant props
**And** content within the expanded card stagger-animates on entry: heading (0ms delay) → body (100ms) → links/actions (200ms) via Framer Motion `staggerChildren`
**And** on close, content exits together (no stagger on exit) followed by card contraction with reverse animation
**And** `AnimatePresence` with `onExitComplete` callback handles clean mount/unmount (no `isClosed` + `useEffect` workaround)
**And** a top-edge light highlight appears on the expanded overlay surface, simulating overhead light
**And** expansion animations complete within 400-600ms at 60fps with no visible frame drops (NFR5)
**And** with `prefers-reduced-motion: reduce`, card expansion is instant with opacity fade only — no spatial animation

### Story 2.5: Ambient Background Motion

As a visitor,
I want to see subtle background motion on the landing page,
So that the dark theme feels alive and atmospheric without distracting from the content.

**Acceptance Criteria:**

**Given** the card grid is rendered on the landing page
**When** the page loads
**Then** an AmbientBackground component renders a pure CSS `@keyframes` gradient animation behind the card grid
**And** the animation uses `background-position` or gradient shift with a 30-60s cycle — very slow, low contrast, barely perceptible movement
**And** the element is `position: fixed` behind the card grid with `aria-hidden="true"`
**And** the animation is CSS-only with zero JavaScript overhead — no React re-renders, GPU-accelerated via `will-change` or `transform`
**And** with `prefers-reduced-motion: reduce`, a static gradient displays with no animation
**And** the ambient motion has no measurable main thread impact (NFR6)
**And** the animation does not compete for attention — subtle enough to enhance atmosphere without distraction

## Epic 3: About Me & Skills Showcase

Visitors can explore Warrick's professional profile — scannable skills grid with skills-to-proof mapping, experience timeline, education history, dynamically calculated experience years, and GitHub profile link. Designed for the recruiter's 90-second scan.

### Story 3.1: About Me Content Layout and Profile Information

As a visitor,
I want to view a well-structured professional profile with experience, education, and a GitHub link,
So that I can quickly assess Warrick's background and qualifications.

**Acceptance Criteria:**

**Given** the card expansion overlay system from Epic 2 is functional
**When** a visitor clicks the About Me card and the overlay expands
**Then** an AboutMeContent component renders with content stagger-animated on entry (heading → body → sections)
**And** a display heading identifies the section clearly
**And** a professional summary paragraph provides a concise overview
**And** personal profile information is visible: name, nationality, status, languages (FR8)
**And** professional experience is presented with a timeline layout showing roles, companies, and durations (FR9)
**And** education history is displayed with institutions and qualifications (FR10)
**And** years of professional experience are dynamically calculated from data (not hardcoded) and displayed prominently (FR12)
**And** a direct link to the GitHub profile is visible and opens in a new tab (FR14)
**And** the layout is single-column, scannable at a glance — key information (experience years, skills, education) visible without scrolling through walls of text
**And** the content uses the design token typography: display heading, body text with 1.7 line-height, generous spacing (space-6 between sections, space-16 padding on desktop)
**And** all data is sourced from `src/data/consolidatedProfile.tsx` and `src/data/personalData.tsx`

### Story 3.2: Skills Grid with Skills-to-Proof Mapping

As a visitor,
I want to see a skills inventory where skills link to the portfolio projects that prove them,
So that I can verify claims with one click and build trust through evidence.

**Acceptance Criteria:**

**Given** the AboutMeContent layout from Story 3.1 is rendered
**When** the visitor views the skills section
**Then** a skills grid displays all technical skills using SkillBadge components
**And** SkillBadge has two variants: `default` (border-subtle, text-secondary, monospace font, presentational) for skills without a linked project, and `linked` (border-accent, text-accent, monospace font, `role="link"`, descriptive `aria-label` e.g. "View React project") for skills with portfolio proof (UX-DR15)
**And** linked SkillBadges show an accent-soft background fill on hover
**And** clicking a linked SkillBadge triggers cross-card navigation (AR19): About Me card closes with full exit animation → grid is briefly visible → Portfolio card opens with its unique expansion animation → content scrolls to the target project
**And** the navigation sequence is fully animated with no hard cuts at any point (FR13)
**And** the skills-to-project mapping data is maintained in the data files, linking each skill to zero or more portfolio project IDs
**And** skills are grouped or ordered logically (e.g., by category: frontend, backend, tools)
**And** the skills grid is prominent in the upper half of the AboutMeContent layout (FR11)

## Epic 4: Portfolio & Project Showcase

Visitors can explore portfolio projects with rich descriptions, current screenshots, tech stack badges, live demo links, and GitHub repos. Proof-to-skills reverse mapping links back to About Me. Stale projects removed, URLs updated. Data-driven content management via data files.

### Story 4.1: Portfolio Content Layout and Project Cards

As a visitor,
I want to see portfolio projects with rich descriptions, screenshots, tech stacks, and links,
So that I can assess the depth and quality of Warrick's work and click through to live demos.

**Acceptance Criteria:**

**Given** the card expansion overlay system from Epic 2 is functional
**When** a visitor clicks the My Portfolio card and the overlay expands
**Then** a PortfolioContent component renders with a display heading and a list of ProjectCard components (UX-DR11)
**And** each ProjectCard follows image-first hierarchy: project screenshot at top, content below (UX-DR12)
**And** each ProjectCard displays: project name, description (purpose + key features), a row of TechBadge components showing the tech stack, and an ExternalLinkButton pair for Live Demo and GitHub repo
**And** TechBadge is non-interactive: monospace font, caption size (12px), border-subtle, text-tertiary (UX-DR16)
**And** ExternalLinkButton has two variants: `primary` (border-accent, text-accent) for Live Demo and `secondary` (border-subtle, text-secondary) for GitHub. Both show label text + arrow icon (↗), open in new tab (`target="_blank"`, `rel="noopener noreferrer"`), and include descriptive `aria-label` (UX-DR19)
**And** each ProjectCard uses semantic `<article>` with descriptive `alt` text on screenshots (FR15)
**And** live demo links open in new tabs and resolve to working applications (FR16)
**And** GitHub repository links open in new tabs and resolve to valid repos (FR17)
**And** screenshots are current and accurately represent each project (FR18)
**And** ProjectCards have a subtle border-hover shift on hover
**And** the layout is single-column within the 800px max-width content area

### Story 4.2: Portfolio Data Update and Content Refresh

As the site owner,
I want portfolio data updated with current projects, descriptions, and screenshots,
So that the portfolio accurately reflects my current skills and active work with no stale entries.

**Acceptance Criteria:**

**Given** the PortfolioContent and ProjectCard components from Story 4.1 are functional
**When** portfolio data is updated in `src/data/portfolioData.tsx`
**Then** Reservations project is removed from the portfolio data
**And** Tic Tac Toe project is removed from the portfolio data
**And** Money Manager project URL is updated to mm.wsapz.com
**And** RaceDay race page screenshot is captured fresh and replaced in `src/assets/`
**And** all remaining project descriptions are updated to include: project purpose, key features, and current tech stack
**And** all live demo links resolve to working applications
**And** all GitHub repository links resolve to valid repos
**And** owner can add a new portfolio project by adding an entry to `portfolioData.tsx` and a screenshot to `src/assets/` (FR40)
**And** owner can update personal profile data by editing `personalData.tsx` and `consolidatedProfile.tsx` (FR41)
**And** owner can update screenshots by replacing files in `src/assets/` (FR42)
**And** skills-to-project mapping data is updated to reflect the current project set

### Story 4.3: Proof-to-Skills Reverse Navigation and Approach Content

As a visitor,
I want to navigate from a portfolio project back to the skills it demonstrates and view the developer's approach,
So that I can see the connection between delivered work and claimed expertise, and understand the working methodology.

**Acceptance Criteria:**

**Given** PortfolioContent with ProjectCards from Story 4.1 and the skills grid from Epic 3 Story 3.2 are functional
**When** a visitor views a project in the Portfolio overlay
**Then** each ProjectCard shows linked skill indicators that map back to the About Me skills section
**And** clicking a proof-to-skills link triggers cross-card navigation (AR19): Portfolio card closes with full exit animation → grid is briefly visible → About Me card opens → content scrolls to the relevant skill area (FR19)
**And** the navigation sequence is fully animated with no hard cuts
**And** an ApproachContent component renders when the My Approach card is expanded, displaying: heading, process/methodology description, and adaptability statement (UX-DR14)
**And** ApproachContent is text-focused with generous whitespace, using design token typography and spacing
**And** ApproachContent stagger-animates on entry consistent with other expanded card content

## Epic 5: Contact & Visitor Intelligence

Visitors can send messages through a polished contact form with inline validation, reCAPTCHA spam protection, and clear success/error feedback states. The system tracks visitor landings with geolocation, device fingerprint, referral data, and behaviour signals — compiled into notification emails with rate limiting.

### Story 5.1: Contact Form with Validation and Submission

As a visitor,
I want to send a message through a polished contact form with clear feedback,
So that I can reach out to Warrick easily and know my message was sent successfully.

**Acceptance Criteria:**

**Given** the card expansion overlay system from Epic 2 is functional
**When** a visitor clicks the Get In Touch card and the overlay expands
**Then** a ContactContent component renders with a display heading, brief intro text, and a ContactForm component (UX-DR13)
**And** ContactForm displays: name field, email field, message textarea, reCAPTCHA v2 widget, and submit button
**And** all form fields have visible `<label>` elements and use semantic `<form>` markup
**And** the form implements 6 states with correct feedback (UX-DR23):
1. **Empty** — default state, all fields empty, submit button in default Tier 1 gold accent style
2. **Filling** — active field border transitions from border-subtle to border-accent with subtle gold glow (instant)
3. **Validating** — on blur (not keystroke): if invalid, border turns error (#f87171), error message appears below field in error colour via `aria-describedby`; on valid input, border returns to subtle and error fades out (200ms)
4. **Submitting** — button text changes to "Sending..." with subtle pulse animation, all fields disabled, button shows `aria-busy="true"`
5. **Success** — button border and text turn success (#34d399), message "Message sent" replaces button text, form fields clear after 1s delay
6. **Error** — button border and text turn error, error message appears above form, fields remain populated for retry
**And** reCAPTCHA v2 verification is required before form submission (FR21)
**And** the form submits via EmailJS using the contact template ID from env.ts (FR20)
**And** contact information (location, email, social links) is visible in the ContactContent area (FR22)
**And** validation errors are announced via `aria-live="polite"` region
**And** EmailJS failure does not show a technical error — graceful user-facing error message with retry option (NFR27)
**And** reCAPTCHA unavailability shows a graceful error message, never permanently blocks the form (NFR29)
**And** all external service calls include timeout handling (NFR30)

### Story 5.2: Visitor Tracking and Notification System

As the site owner,
I want the system to track visitor landings and send me notification emails with visitor intelligence,
So that I know when someone visits my portfolio and can see where they came from.

**Acceptance Criteria:**

**Given** the site is deployed with `ENABLE_VISITOR_TRACKING` set to `true` in the environment
**When** a visitor lands on the site
**Then** the VisitorTracker component (renders null — non-visual) detects the landing and initiates data collection (FR23)
**And** IP address and geolocation data is captured via ipapi.co: country, city, region, ISP (FR24)
**And** browser and device fingerprint data is captured: user agent, browser name/version, OS, device type, screen resolution, viewport size (FR25)
**And** referral and traffic source data is captured: referrer URL, UTM parameters if present (FR26)
**And** visitor behaviour signals are captured: landing timestamp, timezone, preferred language, connection type (FR27)
**And** all captured data is compiled into a comprehensive email notification sent via EmailJS using the visitor template ID from env.ts (FR28)
**And** rate limiting prevents duplicate notifications within a configurable window using localStorage (FR29)
**And** ipapi.co geolocation failure does not block tracking — notification is sent with available data (NFR28)
**And** EmailJS failure is silent — no visible error to the visitor (NFR27)
**And** all external service calls include timeout handling (NFR30)
**And** visitor tracking data is transmitted via HTTPS only (NFR16)
**And** no personally identifiable information is stored client-side beyond the localStorage rate-limiting key (NFR17)
**And** all environment variables are read from `src/config/env.ts`, never from `process.env` or `window.__ENV` directly

## Epic 6: Responsive Design, Accessibility & SEO

The site works flawlessly across mobile, tablet, and desktop. Fully navigable by keyboard with focus trapping in overlays. Screen reader compatible with semantic HTML and ARIA. Reduced motion is a first-class experience. Search engine discoverable with meta tags and sitemap. Lighthouse ≥ 90 across all categories.

### Story 6.1: Responsive Layout Across Breakpoints

As a mobile visitor,
I want the site to adapt cleanly to my device with readable content and touch-friendly interactions,
So that I get the full portfolio experience regardless of screen size.

**Acceptance Criteria:**

**Given** all components from Epics 1-5 are functional
**When** the site is viewed on different devices
**Then** on mobile (<768px): cards stack in a single column, Card 1 is hidden, no hover effects, tap triggers expansion directly, grid gap is 24px (space-6), expanded card padding is 24px (space-6) (UX-DR26)
**And** on tablet (768-999px): 2-column grid with Card 1 spanning full width top row, grid gap is 32px (space-8), expanded card padding is 48px (space-12)
**And** on desktop (≥1000px): 3×2 grid with full 5-layer hover, grid gap is 48px (space-12), expanded card content max-width 800px centred with 64px (space-16) padding
**And** all interactive elements have minimum 44×44px touch targets on mobile (NFR25)
**And** on touch devices, cursor-tracking glow is disabled and replaced with `:active` tap feedback
**And** all content within expanded cards is readable without pinching to zoom — minimum 16px body text
**And** typography line-height is ≥1.6 for body text on all breakpoints
**And** project screenshots in Portfolio are responsive and load quickly on mobile
**And** the site is fully functional and readable across device widths 375px, 390px, 414px, 768px, 1000px, and 1920px (NFR26)
**And** mobile-first CSS is used: base Tailwind classes target mobile, `md:` for tablet, `lg:` for desktop (FR32)

### Story 6.2: Keyboard Navigation and Focus Management

As a visitor using keyboard navigation,
I want to navigate the entire site without a mouse,
So that I can access all content and interactions using only Tab, Enter, Space, and Escape.

**Acceptance Criteria:**

**Given** the card grid and expansion system are functional
**When** a visitor navigates using keyboard only
**Then** Tab moves focus to the next interactive card in the grid, Shift+Tab moves to previous (UX-DR27)
**And** Enter or Space on a focused card expands it into the overlay
**And** Escape closes the expanded overlay and returns focus to the triggering card
**And** within an expanded overlay, Tab cycles through interactive elements (CloseButton, links, form fields) and focus is trapped — Tab does not escape the overlay (UX-DR29)
**And** on card expansion, focus moves to the CloseButton (first focusable element in overlay)
**And** on card close, focus returns to the Card that triggered the expansion
**And** all interactive elements use `focus-visible:` (not `focus:`) to show focus rings only for keyboard navigation, not mouse clicks
**And** focus ring styling uses gold border glow (`border-accent`) matching the hover treatment — premium aesthetic, not browser default blue
**And** Cards use `role="button"`, `aria-expanded`, `tabindex="0"` (FR33)
**And** all Tier 1 and Tier 2 interactive elements (per UX-DR22) are reachable via keyboard (NFR21)
**And** focus is trapped within expanded card overlays and restored on close (NFR22)

### Story 6.3: Screen Reader Compatibility and Semantic HTML

As a visitor using a screen reader,
I want the site structure and content to be announced correctly,
So that I can understand and navigate the portfolio without relying on visual presentation.

**Acceptance Criteria:**

**Given** all components are rendered with their content
**When** a screen reader navigates the site
**Then** the page uses semantic `<main aria-label="Portfolio">` landmark (UX-DR28)
**And** interactive cards use `<div role="button" aria-expanded="true|false">` with descriptive content
**And** expanded overlays use `<div role="dialog" aria-modal="true" aria-label="[card title]">`
**And** the `aria-expanded` state change is announced when cards expand/collapse
**And** the dialog role and card title label are announced when an overlay opens
**And** ProjectCard components use semantic `<article>` elements
**And** all images include descriptive `alt` text; decorative images (AmbientBackground) use `aria-hidden="true"` (NFR23)
**And** ContactForm uses semantic `<form>` with visible `<label>` elements for all fields
**And** form validation errors are linked via `aria-describedby` and announced via `<span role="alert" aria-live="polite">` without interrupting the user
**And** form submission states are communicated: submit button has `aria-busy="true"` during sending, success/error announced via live region
**And** semantic HTML structure uses landmarks, headings hierarchy (h1-h3), and roles throughout (NFR24) (FR34)
**And** colour is never the sole indicator of state — error states use red + text message + border change, success uses green + text confirmation

### Story 6.4: Reduced Motion and Performance Validation

As a visitor with motion sensitivity,
I want all animations disabled when I have reduced motion enabled,
So that I get a fully functional and visually complete experience without any motion.

**Acceptance Criteria:**

**Given** the visitor's OS or browser has `prefers-reduced-motion: reduce` enabled
**When** the site loads and is interacted with
**Then** all CSS transitions have `duration: 0ms` — instant state changes (UX-DR30)
**And** all Framer Motion animations have `duration: 0` with no spring physics — `useReducedMotion()` hook is checked
**And** GoldPulseText shows static gold text-shadow with no pulse animation
**And** AmbientBackground shows a static gradient with no movement
**And** card expansion is instant with opacity fade only — no spatial animation
**And** the site is fully functional and visually complete with all motion disabled — reduced motion is an alternative presentation, not a degraded experience
**And** Tailwind's `motion-safe:` and `motion-reduce:` variants are used for CSS animations
**And** Framer Motion's `useReducedMotion()` hook is used for spring/layout animations
**And** Lighthouse Performance score ≥ 90 (NFR4)
**And** First Contentful Paint < 1.5s on standard broadband (NFR1)
**And** Largest Contentful Paint < 2.5s (NFR2)
**And** Cumulative Layout Shift < 0.1 (NFR3)
**And** Lighthouse Accessibility score ≥ 90 (NFR19)
**And** WCAG AA colour contrast compliance verified across all dark theme elements (NFR20)
**And** production bundle size is within 2.5MB per asset/entrypoint (NFR7)
**And** vendor chunk splitting is in place for cache efficiency (NFR9)

### Story 6.5: SEO and Discoverability

As a search engine crawler,
I want proper meta tags, structured data, and a sitemap,
So that the portfolio is discoverable and generates good preview cards when shared.

**Acceptance Criteria:**

**Given** the site is deployed at ws.wsapz.com
**When** search engines or social platforms access the site
**Then** the HTML includes meta tags: `<title>`, `<meta name="description">`, and canonical URL set to `ws.wsapz.com` (FR43)
**And** Open Graph tags are present: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
**And** the og:image generates an appealing preview card when the URL is shared on LinkedIn, Slack, or other platforms
**And** a `robots.txt` is accessible at the root, allowing crawler access (FR44)
**And** a `sitemap.xml` is accessible at the root with the single page URL (FR44)
**And** semantic HTML5 elements are used throughout: `<main>`, `<article>`, `<form>`, `<button>`, `<label>`
**And** a favicon and Apple touch icon are present
**And** Content Security Policy headers are configured to restrict script and resource origins (NFR18) — configured at Nginx Proxy Manager level
**And** no API keys, service IDs, or secrets are present in the HTML source or client bundle (NFR13)
