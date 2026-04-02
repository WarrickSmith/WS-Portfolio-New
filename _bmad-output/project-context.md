c---
project_name: 'WS-Portfolio-New'
user_name: 'Warrick'
date: '2026-03-30'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality', 'workflow_rules', 'critical_rules']
status: 'complete'
rule_count: 42
optimized_for_llm: true

---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **React** 19.2.4 + ReactDOM 19.2.4 (with TypeScript JSX transform via `react-jsx`)
- **TypeScript** 6.0.2 — strict mode, ES2022 target, ESNext modules
- **Webpack** 5.105.4 — ts-loader, dotenv-webpack, code splitting
- **styled-components** 6.3.12 — primary styling approach
- **framer-motion** 12.38.0 — animations and layout transitions
- **@emailjs/browser** 4.4.1 — visitor tracking and contact form
- **react-google-recaptcha** 3.1.0 — form spam protection
- **FontAwesome** 7.2.0 — icon library (brands, regular, solid)
- **Node.js** 24.x Alpine — Docker runtime
- **serve** — static file server for production builds (port 3000)

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

- TypeScript strict mode — all code must pass strict type checking
- Target ES2022 with ESNext modules — use modern syntax freely
- Path alias `@/*` → `src/*` available but most imports use relative paths
- `isolatedModules: true` — avoid `const enum` and namespace merging
- Components: use **default exports**; data/utilities: use **named exports**
- Async error handling: try/catch with `err instanceof Error` type narrowing
- Services must return fallback data on failure — never throw unhandled to callers
- Hooks expose error state via return objects, not thrown exceptions
- Console logging restricted to development environment checks

### Framework-Specific Rules (React + Styling + Animation)

- All components must be functional — no class components
- Local state only (`useState`) — no Context API, Redux, or global state
- `useCallback` for async operations and callbacks passed as dependencies
- Feature folders (`/box2`–`/box5`): each has preview component + expanded content component
- Reusable components go in `/components/common/`
- styled-components is the sole styling method — no CSS modules or inline styles
- Animated components: wrap with `styled(motion.div)` for Framer Motion integration
- Use CSS variables from `GlobalStyle.ts` for colors and font sizes — never hardcode theme values
- Responsive breakpoints: `@media (max-width: 768px)` for mobile, `(max-width: 1000px)` for tablet
- Cards 1 & 2 are non-interactive — never add click handlers to these
- Card expansion state is managed centrally in `MainPage.tsx`
- New card content components must be registered in `renderChildDiv.tsx`

### Testing Rules

- No automated testing framework — this is intentional, not an oversight
- Do not install Jest, Vitest, or any test framework
- All changes must be verified manually by running `npm run dev` and confirming in the browser
- Do not create test files (`.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx`)

### Code Quality & Style Rules

- No ESLint or Prettier — style is maintained by convention
- File naming: PascalCase for components, camelCase for hooks/services/data
- Styled component names: PascalCase (`GridContainer`, `DimmedLayer`)
- Interfaces and types: PascalCase (`CardProps`, `VisitorData`)
- Hooks must use `use` prefix (`useVisitorTracker`)
- Data files use `.tsx` extension when containing type exports or JSX
- Type definitions go in `/src/types/`
- Minimal comments — code should be self-explanatory
- Do not add JSDoc, docstrings, or excessive inline documentation

### Development Workflow Rules

- Branch naming: `feat/`, `fix/`, `refactor/`, `chore/` prefixes
- Commit messages: Conventional Commits format — `<type>: <description>`
- Valid commit types: `feat`, `fix`, `chore`, `refactor`, `docs`
- Semantic versioning via git tags (`vX.Y.Z`)
- Production build: `npm run build` → static output in `/dist`
- Docker deployment: Node.js 24 Alpine, env vars as build args, served on port 3000
- Dev server: `npm run dev` on port 3000 with HMR

### Critical Don't-Miss Rules

- Do NOT introduce global state management — local `useState` is intentional for this project's scale
- Do NOT add CSS modules, Tailwind, or inline styles — styled-components is the only styling method
- Do NOT create barrel/index files for re-exports
- Do NOT add Error Boundaries — errors are caught at source with graceful fallbacks
- Do NOT install testing frameworks — manual browser verification only
- Cards 1 & 2 are non-interactive by design — never add click handlers
- Visitor tracking has a 5-minute localStorage rate limit — do not bypass
- `VisitorTracker` returns `null` — it must never render visible UI
- `.env` must never be committed — contains service keys
- Environment variables are build-time only (dotenv-webpack), not available at runtime
- Webpack bundle limits: 2.5MB max per asset/entrypoint
- Import images/assets via webpack imports, not hardcoded public paths
- Framer Motion `AnimatePresence` must wrap conditionally rendered animated components

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

Last Updated: 2026-03-31
