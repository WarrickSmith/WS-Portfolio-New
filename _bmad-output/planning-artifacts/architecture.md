---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-31'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/project-context.md'
  - 'docs/index.md'
  - 'docs/architecture.md'
  - 'docs/project-overview.md'
  - 'docs/source-tree-analysis.md'
  - 'docs/component-inventory.md'
  - 'docs/development-guide.md'
  - 'docs/deployment-guide.md'
workflowType: 'architecture'
project_name: 'WS-Portfolio-New'
user_name: 'Warrick'
date: '2026-03-31'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
44 FRs across 8 domains. The architectural weight is concentrated in:
- **Card Grid & Navigation (FR1-FR7):** The signature interaction pattern. Per-card unique animations, skeleton loading, ambient motion, and hover effects. These FRs drive the animation architecture and component composition strategy.
- **About Me (FR8-FR14) & Portfolio (FR15-FR19):** Content-heavy sections with the skills-to-proof bidirectional linking innovation. Architecture must support cross-card navigation (skill badge in About Me → project in Portfolio and reverse).
- **Visitor Tracking (FR23-FR31):** Non-visual system with rate limiting, geolocation, email notification, and `.env` toggle. Architecturally isolated — fails silently, never blocks UI.
- **CI/CD & Deployment (FR36-FR39):** Infrastructure-level. GitHub Actions pipeline, Docker image builds, build-time environment injection.

**Non-Functional Requirements:**
Performance, security, accessibility, and integration resilience requirements that will drive architectural decisions:
- **Performance:** FCP < 1.5s, LCP < 2.5s, CLS < 0.1, 60fps animations, 2.5MB bundle limit, Docker image < 150MB. Demands code splitting, lazy loading, asset optimisation, and CSS-only animations where possible.
- **Security:** No secrets in client bundle, build-time-only env vars, CSP headers, reCAPTCHA validation. Architecture must enforce the build-time/runtime boundary.
- **Accessibility:** WCAG 2.1 AA. Focus trapping, `prefers-reduced-motion`, keyboard navigation, ARIA roles/states. Must be designed into component interfaces, not added after.
- **Integration resilience:** EmailJS, ipapi.co, and reCAPTCHA failures must never break the UI. Services degrade silently with fallback data.

**Scale & Complexity:**

- Primary domain: Frontend web (Single-Page Application)
- Complexity level: Low-medium
- Estimated architectural components: ~18 custom UI components + 2 service integrations + 1 CI/CD pipeline
- No backend, no database, no auth, no real-time, no multi-tenancy

### Technical Constraints & Dependencies

- **Brownfield project** — existing deployed application with established patterns. Architecture must account for migration path, not greenfield design.
- **styled-components → Tailwind CSS migration** — the largest single change. Every existing component must be migrated before new features are built (Phase 1a dependency).
- **No automated testing** — intentional decision. All verification is manual browser testing. Architecture cannot rely on test suites for migration safety; incremental, component-by-component migration is critical.
- **No global state** — local `useState` only. This is a deliberate scale-appropriate decision, not a gap.
- **Build-time environment variables** — dotenv-webpack injects at build, not runtime. No server-side rendering, no runtime config.
- **Node.js 24+ minimum** — upgrade from current 22.x. Docker base image and any Node-specific tooling must be compatible.
- **Webpack 5** — existing build system. Not migrating to Vite or other bundlers (out of scope per PRD).
- **Solo developer** — sequential execution, no parallel workstreams. Phasing (1a → 1b → 1c) is designed for this constraint.

### Cross-Cutting Concerns Identified

1. **Styling migration** — styled-components → Tailwind touches every component. Architecture must define the migration strategy (component-by-component vs bulk), Tailwind config structure (design tokens from UX spec), and the Framer Motion integration pattern (`motion.div` + className).
2. **Animation architecture** — Dual system: Framer Motion for complex choreography (expansion, stagger, spring physics) and CSS/Tailwind for stateless animations (hover effects, shimmer, ambient motion, text pulse). Architecture must define the boundary clearly.
3. **Accessibility** — Focus management, ARIA states, reduced motion, keyboard navigation, and screen reader support span every interactive component. Component interfaces must enforce accessibility props.
4. **Performance budgets** — Bundle splitting, lazy loading, image optimisation, and CSS-only animation preferences affect component loading strategy and asset pipeline.
5. **Environment configuration** — Build-time injection, `.env` toggle for visitor tracking, CI/CD variable management. Architecture must define the env var strategy across dev/build/deploy.

## Starter Template Evaluation

### Primary Technology Domain

Frontend web (SPA) — brownfield React 19 + TypeScript + Webpack 5 application. No starter template applies; this is a migration architecture.

### Starter Options Considered

Traditional starter templates (create-react-app, Vite React template, T3 stack, Next.js) were evaluated and **rejected** — all assume greenfield projects and would require rebuilding the existing application from scratch. The PRD explicitly scopes this as a brownfield upgrade preserving the existing Webpack 5 build system.

The architectural equivalent of a "starter" for this project is the **Tailwind CSS v4 + PostCSS integration into the existing Webpack 5 pipeline**, combined with dependency upgrades.

### Selected Approach: In-Place Migration

**Rationale:**
- Existing application is deployed and functional — rebuild risk is unnecessary
- Webpack 5 build system is established with code splitting, chunk optimisation, and asset handling
- Project structure is sound and documented
- The PRD explicitly preserves Webpack (no bundler migration)
- Solo developer — incremental migration reduces risk vs. big-bang rebuild

**Initialization: Tailwind CSS v4 Integration**

```bash
npm install tailwindcss @tailwindcss/postcss postcss postcss-loader autoprefixer
```

**Architectural Decisions for the Migration:**

**Language & Runtime:**
- TypeScript 6.0 (upgrade from 5.9.2) — last JS-based compiler release, stable foundation before Go-based TS 7
- Node.js 24.x LTS (upgrade from 22.x) — current LTS, supported until April 2028
- React 19.2.x (minor bump from 19.2.3) — already on latest major

**Styling Solution:**
- Tailwind CSS v4.1 with CSS-first configuration via `@theme` directive
- PostCSS integration through `@tailwindcss/postcss` plugin
- Design tokens from UX spec defined in main CSS file using `@theme`
- styled-components removed after component-by-component migration
- Framer Motion 12.x (upgrade to latest 12.38.x) continues handling complex animations

**Build Tooling:**
- Webpack 5 (existing, upgraded to latest 5.x)
- `postcss-loader` added to CSS processing pipeline
- Existing code splitting, chunk optimisation, and asset handling preserved
- `dotenv-webpack` continues for build-time environment variable injection

**Testing Framework:**
- None — intentional decision preserved. Manual browser verification only.

**Code Organization:**
- Existing feature folder structure preserved (`/box2`-`/box5` → evolving to semantic names during content redesign)
- `/components/common/` for shared components
- `/data/` for data files, `/hooks/` for custom hooks, `/types/` for type definitions
- New: main CSS file with Tailwind `@theme` configuration and `@import "tailwindcss"`

**Development Experience:**
- Webpack dev server with HMR (existing, port 3000)
- Tailwind CSS IntelliSense (VS Code extension) for class autocomplete
- TypeScript strict mode with latest 6.0 features
- Docker development matches production (Node.js 24 Alpine)

**Note:** The first implementation task should be Phase 1a Foundation: Node.js upgrade, dependency updates, Tailwind CSS integration into Webpack pipeline, and styled-components removal — all before any content or visual work begins.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
1. Styling migration strategy: leaf-to-root component-by-component migration
2. Tailwind + Framer Motion integration via `cn()` helper pattern
3. Runtime environment variable injection via Docker entrypoint script
4. Config access via simple helper module (`src/config/env.ts`)

**Important Decisions (Shape Architecture):**
5. Component folder renaming during Phase 1a styling migration
6. No skeleton loading — lazy-load expanded card content via `React.lazy()` only
7. Pure CSS ambient background animation
8. Multi-stage Docker build with `serve` final stage
9. Self-hosted registry at `registry.wsapz.com`
10. GitHub Actions CI/CD with single secret (`REGISTRY_PASSWORD`)

**Deferred Decisions (Post-MVP):**
- Image format optimisation strategy (WebP/AVIF) — Phase 2
- Structured data / JSON-LD — Phase 2
- Additional micro-interactions and visual refinements — Phase 2

### Frontend Architecture

**Styling Migration Strategy:**
- **Approach:** Leaf-to-root incremental migration
- **Rationale:** In a no-test environment, migrating leaf components first (FaIcon, HoverText, CloseButton) ensures each is verified in isolation before parent components migrate. Reduces cascading breakage risk.
- **Coexistence:** styled-components and Tailwind CSS coexist during migration. styled-components removed only after all components are migrated.
- **Folder renaming:** `box2/` → `namecard/`, `box3/` → `about/`, `box4/` → `portfolio/`, `box5/` → `contact/` during migration (Phase 1a) — one touch per component.

**Tailwind + Framer Motion Integration:**
- **Pattern:** `cn()` helper using `clsx` + `tailwind-merge` for conditional class composition
- **Rationale:** Card components have 5-layer hover effects and conditional expansion states. `cn()` keeps JSX readable by composing conditional classes explicitly.
- **Separation:** Tailwind handles static/responsive/hover styles via `className`. Framer Motion handles dynamic animation via props (expansion, stagger, spring). No overlap.

**Loading Strategy:**
- **No SkeletonGrid component** — removed from architecture. Static SPA with local data renders fast enough that skeleton loading would flash rather than polish.
- **`React.lazy()`** wraps expanded card content components (AboutMeContent, PortfolioContent, ContactContent) for code splitting. Expanded content isn't needed until a card is clicked.
- **Suspense fallback:** Minimal spinner or fade-in within the expansion overlay — not a full skeleton.
- **Documentation update required:** UX design specification SkeletonGrid component and skeleton loading patterns must be updated to reflect this decision.

**Ambient Background Motion:**
- **Approach:** Pure CSS `@keyframes` animation with `background-position` or gradient shift
- **Implementation:** `position: fixed` layer behind card grid, `aria-hidden="true"`, 30-60s cycle
- **Rationale:** Zero JS overhead, no React re-renders, GPU-accelerated. Meets NFR of no main thread impact.
- **Reduced motion:** Static gradient when `prefers-reduced-motion: reduce` is active.

**Config Access Pattern:**
- **Approach:** Simple helper module at `src/config/env.ts`
- **Pattern:** `window.__ENV?.KEY || process.env.KEY || ''`
- **Rationale:** Works in both dev (dotenv-webpack provides `process.env`) and production (entrypoint script provides `window.__ENV`). No React context overhead needed for ~7 synchronous env vars.

### Infrastructure & Deployment

**CI/CD Pipeline:**
- **Platform:** GitHub Actions
- **Registry:** Self-hosted at `registry.wsapz.com`
- **Credentials:** Username `warrick` hardcoded in workflow. Password stored as GitHub project secret `REGISTRY_PASSWORD`. No other GitHub secrets.
- **Trigger:** On merge to main branch
- **Steps:** Checkout → Docker login → Multi-stage build (no build args for env vars) → Push to `registry.wsapz.com/ws-portfolio-new:latest`

**Docker Build Strategy:**
- **Approach:** Multi-stage build
- **Stage 1:** `node:24-alpine` — install dependencies, run `npm run build` (webpack production build with empty/default env vars)
- **Stage 2:** `node:24-alpine` slim — copy `/dist` output, install `serve` only, copy `docker-entrypoint.sh`
- **Rationale:** Strips dev dependencies, source code, and node_modules from final image. Targets < 150MB NFR.

**Environment Variable Strategy:**
- **Approach:** Runtime injection via Docker entrypoint script
- **Mechanism:** `docker-entrypoint.sh` reads env vars from the container environment and writes `config.js` to `/dist/` before starting `serve`. `index.html` includes `<script src="/config.js"></script>`.
- **Dev workflow:** `dotenv-webpack` reads `.env` file during `npm run dev` — no change to current DX.
- **Production workflow:** Portainer stack imports `.env` values → `docker-compose.yml` passes them as `environment:` → entrypoint script writes `config.js` → `serve` starts.
- **Local Docker:** `docker compose up` reads `.env` file in project root → same flow.
- **Result:** Single Docker image works across all environments. Zero env var secrets in CI.

**Portainer Stack Configuration:**
- Image: `registry.wsapz.com/ws-portfolio-new:latest`
- Port mapping: `3000:3000` (behind existing Nginx Proxy Manager forwarding `ws.wsapz.com`)
- Environment: All EmailJS, reCAPTCHA, API_URL, and DEBUG vars injected from Portainer stack env

### Decision Impact Analysis

**Implementation Sequence:**
1. Tailwind CSS v4 integration into Webpack pipeline + `postcss-loader` setup
2. `cn()` helper utility (`clsx` + `tailwind-merge`)
3. `src/config/env.ts` helper module + `window.__ENV` type declaration
4. Leaf-to-root component migration (styled-components → Tailwind) with folder renames
5. Remove styled-components dependency
6. `React.lazy()` wrappers for expanded card content
7. Ambient background CSS animation
8. Multi-stage Dockerfile + `docker-entrypoint.sh`
9. GitHub Actions workflow
10. `docker-compose.yml` + `.env.example` updates

**Cross-Component Dependencies:**
- `cn()` helper must exist before any component migration begins
- `src/config/env.ts` must exist before migrating components that use env vars (VisitorTracker, ContactForm)
- Tailwind config with UX spec design tokens must be complete before component migration
- Dockerfile + entrypoint must be tested before CI/CD workflow is built
- Folder renames happen during component migration — `renderChildDiv.tsx` import paths update simultaneously

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 6 areas where AI agents could make inconsistent choices — naming, structure, Tailwind class patterns, animation boundaries, error handling, and accessibility.

### Naming Patterns

**Tailwind Custom Utilities:**
- Design token names: kebab-case matching UX spec (`bg-card`, `text-accent`, `border-subtle`)
- Custom animation names: kebab-case (`gold-pulse`, `gradient-shift`, `skeleton-shimmer`)
- Custom utility classes: kebab-case (`glow-follow`, `card-gradient`)

**Migrated Components:**
- Folder names: lowercase singular (`about/`, `portfolio/`, `contact/`, `namecard/`)
- Component files: PascalCase (existing convention — `AboutContent.tsx`, `PortfolioContent.tsx`)
- Dropped "Box" prefix: `Box3Content` → `AboutContent`, `Box4Content` → `PortfolioContent`, `Box5Content` → `ContactContent`, `Box2` → `NameCard`

**Preserved from project-context.md:**
- PascalCase for components, interfaces, types, styled component names
- camelCase for hooks, services, data files, variables
- `use` prefix for hooks
- Data files use `.tsx` when containing type exports or JSX

### Structure Patterns

**Component Organization:**
```
src/components/
├── about/              (About Me card + expanded content)
├── portfolio/          (Portfolio card + expanded content + ProjectCard)
├── contact/            (Contact card + expanded content)
├── namecard/           (Name card — non-interactive)
├── common/             (Shared components: Card, CardGrid, CloseButton, etc.)
├── MainPage.tsx
└── VisitorTracker.tsx

src/config/
└── env.ts              (Runtime/build-time env var helper)

src/lib/
└── cn.ts               (clsx + tailwind-merge utility)

src/styles/
└── main.css            (Tailwind @import + @theme design tokens)
```

**Rules:**
- Feature-specific components in their feature folder
- Components used by 2+ features go in `common/`
- No barrel/index files
- One component per file
- Config, lib, and styles are new top-level folders under `src/`

### Tailwind Class Patterns

**Class ordering convention:**
`layout → sizing → spacing → typography → colors → borders → effects → animation → responsive`

**`cn()` usage:**
- Use `cn()` when classes are conditional (state/prop-dependent)
- Plain string for static classes
- Template literal for long static strings — never `cn()` just to split lines
- `@apply` sparingly and only in `main.css` — never in component files

**Style boundary:**
- Tailwind for all static styling, responsive, hover/focus states
- Inline `style` prop ONLY for dynamic values not expressible as Tailwind classes (e.g., `--mx`/`--my` CSS vars for cursor-tracking glow)

### Animation Boundary Pattern

**Framer Motion owns:** Card expansion/contraction, content stagger, `AnimatePresence` for conditional rendering, any animation triggered by React state transitions.

**CSS/Tailwind owns:** Hover effects, cursor-tracking glow, gold text pulse, ambient background, transition timing, `prefers-reduced-motion` handling.

**The rule:** React state change → Framer Motion. CSS state (hover, focus, active, media query) → Tailwind/CSS. Never animate the same property with both systems on the same element.

**Reduced motion:** Tailwind's `motion-safe:`/`motion-reduce:` variants for CSS animations. Framer Motion's `useReducedMotion()` hook for spring/layout animations. Both must be implemented — reduced motion is a first-class experience.

### Error Handling & Service Degradation

**Service pattern:** All external services (EmailJS, ipapi.co, reCAPTCHA) return fallback data or success/failure indicators — never throw unhandled exceptions to callers.

**Rules:**
- `try/catch` with `err instanceof Error` type narrowing
- Console logging restricted to development environment
- No user-visible error for visitor tracking or geolocation failures
- Contact form: user-facing error on send failure, preserve form data for retry
- reCAPTCHA unavailability: graceful error message, never permanently blocks form
- All external calls include timeout — no indefinite pending states

**Loading state naming:** Boolean flags (`isLoading`, `isSending`) for binary states. Status enums (`'idle' | 'sending' | 'sent' | 'error'`) for multi-state. Always co-located in owning component.

### Accessibility Implementation Pattern

**Rules:**
- Semantic HTML first — ARIA supplements, never replaces
- `focus-visible:` for keyboard focus rings (gold border glow matching hover)
- `role="dialog"` + `aria-modal="true"` + `aria-label` on expanded overlays
- Form errors linked via `aria-describedby`, announced via `aria-live="polite"`
- Images: descriptive `alt` text, or `aria-hidden="true"` if decorative
- Focus trap in `CardExpansionOverlay`: focus to CloseButton on open, trap within overlay, return to triggering Card on close

### Enforcement Guidelines

**All AI Agents MUST:**
- Follow class ordering convention for Tailwind classes
- Use `cn()` only for conditional class composition
- Respect the Framer Motion / CSS animation boundary
- Implement `prefers-reduced-motion` for every animated component
- Use semantic HTML before reaching for ARIA
- Return fallback data from services — never throw to callers
- Read `src/config/env.ts` for all environment variables — never `process.env` or `window.__ENV` directly

## Project Structure & Boundaries

### Complete Project Directory Structure

**Post-migration target state (after Phase 1a):**

```
WS-Portfolio-New/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                    (NEW — GitHub Actions: build + push Docker image)
│   └── PULL_REQUEST_TEMPLATE.md      (existing)
├── docs/                             (existing — project documentation)
│   ├── index.md
│   ├── project-overview.md
│   ├── architecture.md
│   ├── source-tree-analysis.md
│   ├── component-inventory.md
│   ├── development-guide.md
│   └── deployment-guide.md
├── public/
│   └── favicon.ico                   (existing)
├── src/
│   ├── assets/                       (existing — images, icons)
│   │   ├── warrick.jpg
│   │   ├── raceday.png               (screenshot — to be refreshed in Phase 1b)
│   │   ├── music-manager.jpg
│   │   └── ws-portfolio.jpg
│   ├── components/
│   │   ├── about/                    (RENAMED from box3/)
│   │   │   ├── AboutCard.tsx         (RENAMED from Box3.tsx)
│   │   │   └── AboutContent.tsx      (RENAMED from Box3Content.tsx — redesigned)
│   │   ├── portfolio/                (RENAMED from box4/)
│   │   │   ├── PortfolioCard.tsx     (RENAMED from Box4.tsx)
│   │   │   ├── PortfolioContent.tsx  (RENAMED from Box4Content.tsx — redesigned)
│   │   │   ├── ProjectCard.tsx       (NEW — individual project display)
│   │   │   └── ProjectDetail.tsx    (NEW — expanded project view within overlay)
│   │   ├── contact/                  (RENAMED from box5/)
│   │   │   ├── ContactCard.tsx       (RENAMED from Box5.tsx)
│   │   │   ├── ContactContent.tsx    (RENAMED from Box5Content.tsx)
│   │   │   └── ContactForm.tsx       (existing — migrated to Tailwind)
│   │   ├── namecard/                 (RENAMED from box2/)
│   │   │   └── NameCard.tsx          (RENAMED from Box2.tsx)
│   │   ├── common/
│   │   │   ├── Card.tsx              (NEW — extracted from GridComponents.tsx)
│   │   │   ├── CardGrid.tsx          (NEW — extracted from GridComponents.tsx)
│   │   │   ├── CardExpansionOverlay.tsx (NEW — expansion overlay wrapper)
│   │   │   ├── DimmedBackdrop.tsx    (NEW — extracted from GridComponents.tsx)
│   │   │   ├── CloseButton.tsx       (existing — migrated)
│   │   │   ├── GoldPulseText.tsx     (NEW — replaces HoverTextWrapper.tsx)
│   │   │   ├── AmbientBackground.tsx (NEW — CSS gradient animation)
│   │   │   ├── SkillBadge.tsx        (NEW — skill with optional proof link)
│   │   │   ├── TechBadge.tsx         (NEW — non-interactive tech label)
│   │   │   ├── ExternalLinkButton.tsx(NEW — live demo / GitHub link)
│   │   │   ├── SectionHeading.tsx    (NEW — consistent heading within overlays)
│   │   │   ├── ExpandableItem.tsx   (NEW — shared expand-from-position animation pattern)
│   │   │   ├── FaIcon.tsx            (existing — migrated)
│   │   │   ├── WordSlider.tsx        (existing — migrated)
│   │   │   └── renderChildDiv.tsx    (existing — updated imports)
│   │   ├── MainPage.tsx              (existing — migrated, manages card state)
│   │   └── VisitorTracker.tsx        (existing — updated to use env.ts)
│   ├── config/
│   │   └── env.ts                    (NEW — runtime/build-time env var helper)
│   ├── data/
│   │   ├── consolidatedProfile.tsx   (existing — updated in Phase 1b)
│   │   ├── personalData.tsx          (existing — updated in Phase 1b)
│   │   └── portfolioData.tsx         (existing — updated in Phase 1b)
│   ├── hooks/
│   │   └── useVisitorTracker.ts      (existing — updated to use env.ts)
│   ├── lib/
│   │   └── cn.ts                     (NEW — clsx + tailwind-merge utility)
│   ├── services/
│   │   └── ipGeolocationService.ts   (existing — updated to use env.ts)
│   ├── styles/
│   │   └── main.css                  (NEW — Tailwind @import + @theme tokens)
│   ├── types/
│   │   ├── assets.d.ts               (existing)
│   │   ├── env.d.ts                  (existing — updated for window.__ENV)
│   │   └── visitor.types.ts          (existing)
│   ├── App.tsx                       (existing — migrated, imports main.css)
│   └── main.tsx                      (existing — entry point)
├── .env                              (local dev — git-ignored)
├── .env.example                      (existing — updated with all vars)
├── .gitignore                        (existing)
├── CLAUDE.md                         (existing — updated for new patterns)
├── Dockerfile                        (existing — rewritten as multi-stage)
├── docker-compose.yml                (existing — updated for runtime env vars)
├── docker-entrypoint.sh              (NEW — generates config.js at container start)
├── package.json                      (existing — deps updated)
├── package-lock.json                 (existing — regenerated)
├── postcss.config.cjs                (NEW — @tailwindcss/postcss plugin)
├── tsconfig.json                     (existing — updated for TS 6.0)
├── webpack.common.cjs                (existing — postcss-loader added)
├── webpack.dev.cjs                   (existing)
└── webpack.prod.cjs                  (existing)
```

**Files removed during migration:**
- `src/GlobalStyle.ts` — replaced by `src/styles/main.css` (Tailwind @theme tokens)
- `src/components/common/GridComponents.tsx` — split into `Card.tsx`, `CardGrid.tsx`, `DimmedBackdrop.tsx`
- `src/components/common/HoverText.tsx` — replaced by Tailwind utility classes
- `src/components/common/HoverTextWrapper.tsx` — replaced by `GoldPulseText.tsx`
- `src/components/common/BulletPoints.tsx` — replaced by `ProjectCard.tsx` in portfolio redesign
- `src/components/common/CardHeader.tsx` — replaced by `SectionHeading.tsx`
- `src/components/common/Page.tsx` — replaced by Tailwind layout classes
- `src/components/common/ParagraphSeparator.tsx` — replaced by Tailwind border utility
- `src/components/box3/cellContent/*` — redesigned as flat `AboutContent.tsx` (no cell grid)
- `src/components/box5/ContactMe.tsx` — content absorbed into `ContactContent.tsx`
- `src/assets/reservationizr-img.jpg` — project removed from portfolio
- `src/assets/tic-tac-toe.jpg` — project removed from portfolio

### Architectural Boundaries

**Component Boundaries:**
- `MainPage.tsx` is the single source of card expansion state (`selectedId`). No child component manages which card is open.
- Feature folders (`about/`, `portfolio/`, `contact/`) are self-contained — they don't import from each other directly. Cross-card navigation (skills-to-proof) is managed via callback props from `MainPage.tsx`.
- `common/` components are stateless or self-contained — they receive data via props, never reach up to parent state.
- `VisitorTracker` is fully isolated — it renders `null`, has no visual dependencies, and fails silently.

**Service Boundaries:**
- `src/services/` contains external service integrations (ipGeolocationService)
- `src/hooks/` contains the orchestration layer (useVisitorTracker)
- `src/config/env.ts` is the sole gateway to environment variables — services and hooks import from here, never from `process.env` or `window.__ENV` directly

**Data Boundaries:**
- `src/data/` files are the single source of truth for all portfolio content
- Data files export typed objects — components consume, never mutate
- No runtime data fetching for content (all static, all local)

### Requirements to Structure Mapping

**FR1-FR7 (Card Grid & Navigation):**
- `src/components/common/CardGrid.tsx`, `Card.tsx`, `CardExpansionOverlay.tsx`, `DimmedBackdrop.tsx`
- `src/components/common/GoldPulseText.tsx`, `AmbientBackground.tsx`
- `src/components/MainPage.tsx` (expansion state management)

**FR8-FR14 (About Me):**
- `src/components/about/AboutCard.tsx`, `AboutContent.tsx`
- `src/components/common/SkillBadge.tsx` (skills-to-proof links)
- `src/data/consolidatedProfile.tsx`, `personalData.tsx`

**FR15-FR19 (Portfolio):**
- `src/components/portfolio/PortfolioCard.tsx`, `PortfolioContent.tsx`, `ProjectCard.tsx`
- `src/components/common/TechBadge.tsx`, `ExternalLinkButton.tsx`
- `src/data/portfolioData.tsx`

**FR20-FR22 (Contact):**
- `src/components/contact/ContactCard.tsx`, `ContactContent.tsx`, `ContactForm.tsx`

**FR23-FR31 (Visitor Tracking):**
- `src/components/VisitorTracker.tsx`
- `src/hooks/useVisitorTracker.ts`
- `src/services/ipGeolocationService.ts`
- `src/config/env.ts`

**FR32-FR35 (Responsive & Accessible):**
- Cross-cutting — Tailwind responsive utilities and ARIA patterns in every component
- `src/styles/main.css` (design tokens, reduced motion)

**FR36-FR39 (CI/CD & Deployment):**
- `.github/workflows/ci.yml`
- `Dockerfile`, `docker-compose.yml`, `docker-entrypoint.sh`

**FR40-FR42 (Content Management):**
- `src/data/portfolioData.tsx`, `personalData.tsx`, `consolidatedProfile.tsx`
- `src/assets/` (screenshots)

**FR43-FR44 (SEO):**
- `public/` (robots.txt, sitemap.xml — added in Phase 1c)
- `src/main.tsx` or HTML template (meta tags, Open Graph, canonical URL)

### External Integration Points

```
Browser
  ├── EmailJS (HTTPS) ← src/hooks/useVisitorTracker.ts, src/components/contact/ContactForm.tsx
  │     └── via src/config/env.ts (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, etc.)
  ├── ipapi.co/json/ ← src/services/ipGeolocationService.ts
  │     └── No API key needed (free tier)
  ├── Google reCAPTCHA ← src/components/contact/ContactForm.tsx
  │     └── via src/config/env.ts (RECAPTCHA_SITE_KEY)
  └── External links (new tab) ← src/components/common/ExternalLinkButton.tsx
        └── Live demos, GitHub repos (no integration — standard <a> tags)
```

### Development Workflow Integration

**Development:** `npm run dev` → Webpack dev server (port 3000, HMR) → `dotenv-webpack` reads `.env` → `process.env` available → `env.ts` returns values

**Production build:** `npm run build` → Webpack production → env vars are empty/default (no `.env` in CI) → static `/dist` output

**Docker runtime:** `docker compose up` → reads `.env` → `docker-entrypoint.sh` generates `/dist/config.js` from container env vars → `serve` starts → `window.__ENV` available → `env.ts` returns values

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- All technology versions verified compatible: React 19.2.x + TypeScript 6.0 + Webpack 5 + Tailwind CSS v4.1 + Framer Motion 12.x + Node.js 24 LTS
- `dotenv-webpack` (dev) + `window.__ENV` via entrypoint (production) + `env.ts` helper — coherent single-import pattern across environments
- Multi-stage Docker build + `serve` + runtime `config.js` generation — no conflicts with static SPA architecture
- No contradictory decisions found

**Pattern Consistency:**
- Naming conventions are non-overlapping: PascalCase (components), camelCase (utilities), kebab-case (Tailwind tokens)
- `cn()` pattern is standard Tailwind ecosystem approach — consistent with class ordering convention
- Animation boundary (Framer Motion for state transitions, CSS for hover/ambient) is clearly delineated
- Error handling (return fallback, never throw) applied uniformly across all service integrations

**Structure Alignment:**
- Feature folders map 1:1 to interactive cards
- `common/` inventory matches UX spec component list plus shared animation pattern
- `config/`, `lib/`, `styles/` support architectural decisions without overlap
- Infrastructure files (Dockerfile, entrypoint, CI workflow) support the deployment pipeline

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
All 44 FRs mapped to specific files/directories in the structure. No orphaned requirements.

| FR Range | Category | Architectural Support | Status |
|----------|----------|----------------------|--------|
| FR1-FR7 | Card Grid & Navigation | CardGrid, Card, CardExpansionOverlay, DimmedBackdrop, GoldPulseText, AmbientBackground, MainPage, ExpandableItem | ✅ |
| FR8-FR14 | About Me | AboutCard, AboutContent, SkillBadge, data files | ✅ |
| FR15-FR19 | Portfolio | PortfolioCard, PortfolioContent, ProjectCard, ProjectDetail, TechBadge, ExternalLinkButton | ✅ |
| FR20-FR22 | Contact | ContactCard, ContactContent, ContactForm | ✅ |
| FR23-FR31 | Visitor Tracking | VisitorTracker, useVisitorTracker, ipGeolocationService, env.ts | ✅ |
| FR32-FR35 | Responsive & Accessible | Cross-cutting: Tailwind responsive utilities, ARIA patterns, main.css | ✅ |
| FR36-FR39 | CI/CD & Deployment | ci.yml, Dockerfile, docker-compose.yml, docker-entrypoint.sh | ✅ |
| FR40-FR42 | Content Management | Data files in src/data/, asset files in src/assets/ | ✅ |
| FR43-FR44 | SEO | public/ (robots.txt, sitemap), HTML template (meta tags) | ✅ |

**Cross-Card Navigation (FR11/FR13/FR19):**
- Skills-to-proof and proof-to-skills navigation resolved: `MainPage.tsx` manages via `onNavigateToProject(projectId)` / `onNavigateToSkill(skillId)` callbacks
- Full animation sequence: current card closing animation → grid visible → target card opening animation → scroll to target
- All transitions animated via Framer Motion `AnimatePresence` — no hard switches

**Non-Functional Requirements Coverage:**

| NFR | Architectural Support | Status |
|-----|----------------------|--------|
| FCP < 1.5s, LCP < 2.5s | Tailwind zero-runtime CSS, React.lazy() for expanded content, Webpack code splitting | ✅ |
| CLS < 0.1 | No skeleton loading (eliminated CLS risk), static grid layout | ✅ |
| 60fps animations | CSS for hover/ambient (compositor thread), Framer Motion spring for expansion | ✅ |
| Lighthouse ≥ 90 | Semantic HTML, ARIA, contrast compliance, performance architecture | ✅ |
| Bundle ≤ 2.5MB | React.lazy() splits expanded content, Webpack prod chunk splitting, Tailwind JIT | ✅ |
| Docker image < 150MB | Multi-stage build, Alpine base, only serve + dist in final stage | ✅ |
| No secrets in bundle | Runtime env injection via entrypoint script, not build-time baking | ✅ |
| CSP headers | Configured at Nginx Proxy Manager level (existing infrastructure) | ✅ |
| WCAG 2.1 AA | Focus trap, reduced motion, keyboard nav, ARIA — all in component patterns | ✅ |
| Service degradation | try/catch + fallback pattern enforced for all external calls | ✅ |

### Implementation Readiness Validation ✅

**Decision Completeness:**
- All critical decisions documented with specific versions
- Implementation patterns cover all 6 identified conflict areas
- Enforcement guidelines specify mandatory rules for AI agents
- `cn()` usage, class ordering, and animation boundary examples provided

**Structure Completeness:**
- Every file in the target state is listed with status (new, renamed, existing, removed)
- All removed files documented with replacement rationale
- Requirements mapped to specific files and directories

**Pattern Completeness:**
- Naming, structure, Tailwind, animation, error handling, and accessibility patterns all specified
- No unaddressed conflict points identified

### Gap Analysis Results

**Critical Gaps:** None found.

**Important Gaps Resolved:**
1. Cross-card navigation mechanism (FR11/FR13/FR19) — resolved: animated close → open → scroll via MainPage callbacks, all transitions fully animated
2. Card expansion animation continuity — resolved: existing `layout` prop animation preserved and improved with spring physics, per-card variants, AnimatePresence, content stagger, and backdrop blur
3. Expand-from-position as consistent design language — resolved: shared `ExpandableItem` component used by both card grid expansion and project card expansion within Portfolio overlay

**Minor Gaps Resolved:**
- `ContactMe.tsx` unmapped — content absorbed into `ContactContent.tsx`, added to removed files
- Close state management — `isClosed` + `useEffect` workaround replaced with `AnimatePresence` `onExitComplete` pattern

**Remaining Nice-to-Have Gaps (non-blocking):**
- Per-card expansion animation specifications (exact spring configs and unique variant per card) — deferred to Phase 1c implementation; architecture supports any Framer Motion variant per card
- Specific Tailwind `@theme` token definitions — design tokens are specified in UX spec; implementation will transcribe them into `main.css` during Phase 1a

### Card Expansion Animation Architecture

**Current baseline (preserve):**
- Framer Motion `layout` prop on Card — animates from grid cell position/size to expanded absolute position
- Card "grows from where it is" — this is the signature transition
- Reverse animation on close — card contracts back to grid cell
- DimmedLayer opacity fade synchronised with expansion

**Improvements (implement):**
- **`AnimatePresence`** wrapping expanded card content — controlled exit animations, content mount/unmount transitions
- **Spring physics** (`type: "spring"`, custom stiffness/damping per card) replacing default tween — premium physical feel
- **Per-card unique expansion character** — each card uses different spring configs or animation variants while retaining the "from grid position" origin:
  - Card 3 (About): e.g., slides up with content revealing top-down
  - Card 4 (Portfolio): e.g., morphs from centre with scale emphasis
  - Card 5 (Contact): e.g., unfolds from bottom edge
- **Content stagger on open** — heading (0ms) → body (100ms) → links (200ms) via Framer Motion `staggerChildren`
- **Backdrop blur** on DimmedBackdrop (`backdrop-filter: blur()`) for depth separation between grid and overlay
- **Clean close state** — replace `isClosed` + `useEffect` workaround with `AnimatePresence` `onExitComplete` callback
- **Exit animation** — card content fades/slides out before card contraction begins
- **Cross-card navigation** — close animation plays fully → grid visible briefly → target card open animation plays → content scrolls to target. No hard cuts at any point.

### Expand-From-Position Design Language

**Principle:** The "expand from where it is" animation is the portfolio's signature interaction pattern. It is applied consistently wherever a contained element reveals more detail on click.

**Shared component: `ExpandableItem`** (`src/components/common/ExpandableItem.tsx`)
- Wraps Framer Motion `layout` + `AnimatePresence` + spring physics
- Accepts animation variant config (spring stiffness/damping, unique expansion character)
- Handles expand/collapse state, exit animation, and `onExitComplete` callback
- Used by both card grid expansion and in-content expansions

**Application points:**

| Context | Trigger | Expansion Behaviour |
|---------|---------|-------------------|
| Card Grid → Overlay | Click card in grid | Card expands from grid cell to full-screen overlay. DimmedBackdrop + blur. Content staggers in. |
| ProjectCard → ProjectDetail | Click project in Portfolio overlay | ProjectCard expands in-place within the overlay's scrollable area. Project list scrolls away. Detail fills the content area. Close contracts back to card position. |

**Rules:**
- No nested overlays — ProjectDetail expands within the existing Portfolio overlay, not as a second overlay layer
- Same spring physics family across all expansion points (consistent feel, may vary stiffness/damping per context)
- Skills-to-proof navigation uses direct close → open → scroll pattern (no intermediate expansion)
- All expansions are fully animated — no hard switches at any point
- All expansions are reversible with the same animation in reverse

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (42 AI agent rules loaded)
- [x] Scale and complexity assessed (low-medium, frontend SPA)
- [x] Technical constraints identified (brownfield, no tests, Webpack, solo dev)
- [x] Cross-cutting concerns mapped (5 areas: styling, animation, a11y, perf, env)

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions (10 decisions)
- [x] Technology stack fully specified (all versions web-verified)
- [x] Integration patterns defined (env vars, external services)
- [x] Performance considerations addressed (lazy loading, CSS animations, bundle splitting)

**✅ Implementation Patterns**
- [x] Naming conventions established (components, Tailwind tokens, folders)
- [x] Structure patterns defined (feature folders, common, config, lib, styles)
- [x] Animation boundary specified (Framer Motion vs CSS/Tailwind)
- [x] Process patterns documented (error handling, loading states, a11y)

**✅ Project Structure**
- [x] Complete directory structure defined (every file listed)
- [x] Component boundaries established (MainPage owns state, features self-contained)
- [x] Integration points mapped (EmailJS, ipapi.co, reCAPTCHA)
- [x] Requirements to structure mapping complete (all 44 FRs)

**✅ Animation Continuity**
- [x] Current animation baseline documented
- [x] Preserve list defined (layout animation, grid-origin expansion, reverse on close)
- [x] Improvement list defined (spring physics, per-card variants, AnimatePresence, stagger, blur)
- [x] Close state refactor specified (AnimatePresence onExitComplete)
- [x] Expand-from-position as consistent design language with shared ExpandableItem component

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — brownfield project with established patterns, low-medium complexity, well-documented UX spec, clear migration path, and animation baseline documented.

**Key Strengths:**
- Clean separation between Framer Motion and CSS animation responsibilities
- Runtime env var injection eliminates secrets in CI and enables single-image deployment
- Leaf-to-root migration strategy mitigates risk in a no-test environment
- `env.ts` and `cn()` helpers provide consistent patterns before migration begins
- Complete file inventory with new/renamed/removed status prevents ambiguity
- Existing animation signature preserved and elevated to a consistent design language
- Shared `ExpandableItem` pattern ensures animation consistency across all expansion points

**Areas for Future Enhancement:**
- Per-card animation choreography details — exact spring configs (Phase 1c design task)
- Image optimisation strategy — WebP/AVIF with fallbacks (Phase 2)
- Structured data / JSON-LD Person schema (Phase 2)
- Performance tuning based on real Lighthouse audit data (Phase 2)

**Documentation Updates Required:**
- UX design specification: remove SkeletonGrid component, update loading patterns to reflect no-skeleton approach with React.lazy() for expanded content, add ProjectDetail expand-in-place pattern
- project-context.md: update styling rules from styled-components to Tailwind CSS, add cn() and env.ts patterns
- CLAUDE.md: update architecture section for post-migration state
- docs/: update all generated documentation after Phase 1a completes

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions
- When in doubt, prefer the more restrictive pattern

**First Implementation Priority:**
Phase 1a Foundation — execute in this order:
1. Upgrade Node.js to 24.x, TypeScript to 6.0, React to latest 19.2.x, all deps to latest stable
2. Install Tailwind CSS v4.1, @tailwindcss/postcss, postcss, postcss-loader — configure in Webpack pipeline
3. Create `src/styles/main.css` with `@import "tailwindcss"` and `@theme` design tokens from UX spec
4. Create `src/lib/cn.ts` (clsx + tailwind-merge)
5. Create `src/config/env.ts` + update `src/types/env.d.ts` for `window.__ENV`
6. Leaf-to-root component migration: styled-components → Tailwind with folder renames
7. Remove styled-components, GlobalStyle.ts, and all replaced components
8. Create multi-stage Dockerfile + docker-entrypoint.sh
9. Create `.github/workflows/ci.yml`
10. Update docker-compose.yml, .env.example, CLAUDE.md, project-context.md
