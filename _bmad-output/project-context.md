---
project_name: 'WS-Portfolio-New'
user_name: 'Warrick'
date: '2026-04-07'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality', 'workflow_rules', 'critical_rules']
status: 'complete'
rule_count: 44
optimized_for_llm: true

---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **React** 19.2.4 + ReactDOM 19.2.4 (with TypeScript JSX transform via `react-jsx`)
- **TypeScript** 6.0.2 — strict mode, ES2022 target, ESNext modules
- **Webpack** 5.105.4 — ts-loader, dotenv-webpack, code splitting via React.lazy()
- **Tailwind CSS** 4.x — primary styling approach via utility classes, configured in `src/styles/main.css` with `@theme` design tokens
- **framer-motion** 12.38.0 — card expansion animations, spring physics, layout transitions, content stagger
- **@emailjs/browser** 4.4.1 — visitor tracking and contact form submission
- **react-google-recaptcha** 3.1.0 — form spam protection
- **FontAwesome** 7.2.0 — icon library (brands, regular, solid)
- **clsx** + **tailwind-merge** — conditional class composition via `src/lib/cn.ts`
- **Node.js** 24.x Alpine — Docker runtime
- **serve** 14.2.5 — static file server for production builds (port 3000)

## Application Architecture

### Card Layout

- Six cards on the main page in a 3x2 grid (desktop)
- **Card 1** — Hero background image, non-interactive (visual only)
- **Card 2** — "Warrick Smith Developer" identity text, non-interactive
- **Card 3** — About Me (interactive, expands to overlay)
- **Card 4** — My Portfolio (interactive, expands to overlay)
- **Card 5** — My Approach (interactive, expands to overlay)
- **Card 6** — Get In Touch (interactive, expands to overlay)
- Cards 1 and 2 are non-interactive — never add click handlers to these
- Cards 3-6 expand into full-screen overlays via `CardExpansionOverlay`
- Card expansion state is managed centrally in `MainPage.tsx` — no global state
- New card content components must be registered in `renderChildDiv.tsx`

### Feature Folders

- `src/components/namecard/` — Card 2 (NameCard)
- `src/components/about/` — Card 3 (AboutCard, AboutContent)
- `src/components/portfolio/` — Card 4 (PortfolioCard, PortfolioContent, ProjectCard)
- `src/components/approach/` — Card 5 (ApproachCard, ApproachContent)
- `src/components/contact/` — Card 6 (ContactCard, ContactContent, ContactForm)
- `src/components/common/` — shared UI: Card, CardGrid, CardExpansionOverlay, DimmedBackdrop, ExpandableItem, GoldPulseText, SectionHeading, CloseButton, ExternalLinkButton, OverlayContentGroup, renderChildDiv, WordSlider

### Data Architecture

- `src/data/personalData.tsx` — profile, experience, education, skills, approach, learningAdaptability
- `src/data/portfolioData.tsx` — portfolio projects with descriptions, tech stacks, links, screenshots
- `src/data/consolidatedProfile.tsx` — enriched view combining personalData + portfolioData with skill-to-proof mappings
- Stable `skillId` and `projectId` contracts — cross-epic architectural invariant, do not rename or remove
- Data files use `.tsx` extension when containing type exports or JSX

### Animation Boundaries

- **CSS/Tailwind owns hover effects** — cursor-tracking glow, scale, corner bleed, shadow
- **Framer Motion owns expansion** — card open/close, spring physics, content stagger, AnimatePresence
- **CSS @keyframes owns ambient** — background gradient animation, GoldPulseText pulse
- `AnimatePresence` with `onExitComplete` for clean mount/unmount transitions
- `ExpandableItem` shared component wraps layout + AnimatePresence + spring config

### Cross-Card Navigation

- Skills-to-proof (About → Portfolio) and proof-to-skills (Portfolio → About)
- Pattern: close animation → grid visible briefly → target card opens → scroll to target
- Orchestrated via `MainPage.tsx` with local state — no Context, Redux, or global state

### Environment Configuration

- `src/config/env.ts` — single gateway for all environment variables
- Pattern: `window.__ENV?.KEY || process.env.KEY || ''`
- Runtime injection: `docker-entrypoint.sh` → `/dist/config.js` → `window.__ENV`
- Development fallback: `dotenv-webpack` exposes `.env` values at build time
- Never read from `process.env` or `window.__ENV` directly — always import from `env.ts`

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

- TypeScript strict mode — all code must pass strict type checking
- Target ES2022 with ESNext modules — use modern syntax freely
- `isolatedModules: true` — avoid `const enum` and namespace merging
- Components: use **default exports**; data/utilities: use **named exports**
- Async error handling: try/catch with `err instanceof Error` type narrowing
- Services must return fallback data on failure — never throw unhandled to callers
- Hooks expose error state via return objects, not thrown exceptions
- Console logging restricted to development environment checks

### Framework-Specific Rules (React + Tailwind + Animation)

- All components must be functional — no class components
- Local state only (`useState`) — no Context API, Redux, or global state
- `useCallback` for async operations and callbacks passed as dependencies
- Tailwind CSS is the sole styling method — no styled-components, CSS modules, or inline styles
- Use `src/lib/cn.ts` (`cn()` function) for conditional class composition with clsx + tailwind-merge
- Use Tailwind `@theme` design tokens from `src/styles/main.css` for colors, spacing, typography — never hardcode theme values
- Responsive breakpoints: mobile-first base, `md:` (768px) for tablet, `lg:` (1000px) for desktop
- Framer Motion `AnimatePresence` must wrap conditionally rendered animated components
- Reusable components go in `/components/common/`

### Testing Rules

- No automated testing framework — this is intentional, not an oversight
- Do not install Jest, Vitest, or any test framework
- All changes must be verified manually by running `npm run dev` and confirming in the browser
- Do not create test files (`.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx`)

### Code Quality & Style Rules

- No ESLint or Prettier — style is maintained by convention
- File naming: PascalCase for components, camelCase for hooks/services/data
- Interfaces and types: PascalCase (`CardProps`, `VisitorData`)
- Hooks must use `use` prefix (`useVisitorTracker`)
- Type definitions go in `/src/types/`
- Minimal comments — code should be self-explanatory
- Do not add JSDoc, docstrings, or excessive inline documentation

### Development Workflow Rules

- Branch naming: `feat/`, `fix/`, `refactor/`, `chore/` prefixes
- Commit messages: Conventional Commits format — `<type>: <description>`
- Valid commit types: `feat`, `fix`, `chore`, `refactor`, `docs`
- Semantic versioning via git tags (`vX.Y.Z`)
- Production build: `npm run build` → static output in `/dist`
- Docker deployment: Node.js 24 Alpine, runtime env var injection via docker-entrypoint.sh, served on port 3000
- Dev server: `npm run dev` on port 3000 with HMR

### Critical Don't-Miss Rules

- Do NOT introduce global state management — local `useState` is intentional for this project's scale
- Do NOT add styled-components, CSS modules, or inline styles — Tailwind CSS is the only styling method
- Do NOT create barrel/index files for re-exports
- Do NOT add Error Boundaries — errors are caught at source with graceful fallbacks
- Do NOT install testing frameworks — manual browser verification only
- Cards 1 & 2 are non-interactive by design — never add click handlers
- Cards 3-6 are interactive — expand to overlays via CardExpansionOverlay
- Visitor tracking has a 5-minute localStorage rate limit — do not bypass
- `VisitorTracker` returns `null` — it must never render visible UI
- `.env` must never be committed — contains service keys
- Environment variables: use `src/config/env.ts` gateway, not `process.env` or `window.__ENV` directly
- Webpack bundle limits: 2.5MB max per asset/entrypoint
- Import images/assets via webpack imports, not hardcoded public paths
- `skillId` and `projectId` values are stable cross-epic contracts — do not rename or remove

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-04-07
