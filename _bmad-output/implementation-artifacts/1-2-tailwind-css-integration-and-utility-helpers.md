# Story 1.2: Tailwind CSS Integration and Utility Helpers

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want Tailwind CSS v4.1 integrated into the Webpack pipeline with design tokens and utility helpers,
so that I have the styling foundation and tooling needed to migrate components from styled-components.

## Acceptance Criteria

1. **Package Installation:** `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `postcss-loader`, and `autoprefixer` are installed. `clsx` and `tailwind-merge` are installed as dependencies for the `cn()` helper.
2. **PostCSS Configuration:** `postcss.config.cjs` exists at project root with the `@tailwindcss/postcss` plugin and `autoprefixer`.
3. **Webpack Build Pipeline:** `webpack.common.cjs` CSS rule includes `postcss-loader` in the processing chain (`style-loader` → `css-loader` → `postcss-loader`).
4. **Main CSS File with Design Tokens:** `src/styles/main.css` exists with `@import "tailwindcss"` and a complete `@theme` block containing all design tokens from the UX spec (colours, typography, spacing, radii, shadows, animation timing, breakpoints — see Tasks for full token list).
5. **CSS Import in App:** `src/styles/main.css` is imported in `App.tsx`.
6. **cn() Helper Utility:** `src/lib/cn.ts` exports a `cn()` function using `clsx` + `tailwind-merge` for conditional class composition.
7. **Environment Configuration Helper:** `src/config/env.ts` exports accessor functions for all environment variables using the pattern `window.__ENV?.KEY || process.env.KEY || ''` for: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_CONTACT_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `RECAPTCHA_SITE_KEY`, `DEBUG_VISITOR_TRACKING`, `API_URL`, `ENABLE_VISITOR_TRACKING`.
8. **Type Declaration for Runtime Env:** `src/types/env.d.ts` is updated with a `window.__ENV` type declaration covering all environment variables from AC7.
9. **Tailwind Utility Classes Render:** Adding a Tailwind utility class (e.g. `className="text-red-500"`) to any component renders correctly in the browser — verified manually.
10. **Coexistence with Styled-Components:** Existing styled-components continue to work alongside Tailwind with no regressions. Both systems produce visible styles. This is a coexistence story, not a cutover.
11. **Build Success:** `npm run build` completes without errors. `npm run dev` starts successfully on port 3000.

## Tasks / Subtasks

- [x] **Task 1: Install dependencies** (AC: 1)
  - [x] Run: `npm install tailwindcss @tailwindcss/postcss postcss postcss-loader autoprefixer clsx tailwind-merge`
  - [x] Verify all packages appear in `package.json` dependencies/devDependencies
  - [x] `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `postcss-loader`, `autoprefixer` as devDependencies
  - [x] `clsx`, `tailwind-merge` as dependencies (used in runtime code)

- [x] **Task 2: Create PostCSS configuration** (AC: 2)
  - [x] Create `postcss.config.cjs` at project root (CommonJS format — `.cjs` extension matches existing webpack configs)
  - [x] Include `@tailwindcss/postcss` plugin
  - [x] Include `autoprefixer`

- [x] **Task 3: Update Webpack CSS pipeline** (AC: 3)
  - [x] In `webpack.common.cjs`, update the CSS rule (`test: /\.css$/i`) to add `postcss-loader` between `css-loader` and `style-loader`
  - [x] Final loader order array: `['style-loader', 'css-loader', 'postcss-loader']`
  - [x] Do NOT touch any other webpack rules or plugins

- [x] **Task 4: Create main.css with complete design tokens** (AC: 4)
  - [x] Create directory `src/styles/` if it doesn't exist
  - [x] Create `src/styles/main.css` with `@import "tailwindcss"` at the top
  - [x] Add `@theme` block with ALL tokens below — these are the single source of truth:

  **Colour System:**
  | Token | Value | Purpose |
  |-------|-------|---------|
  | `--color-bg-base` | `#0a0a0a` | Page background, deepest layer |
  | `--color-bg-surface` | `#111111` | Card grid area, primary surface |
  | `--color-bg-card` | `#161616` | Card faces, resting state |
  | `--color-bg-card-hover` | `#1a1a1a` | Card hover state |
  | `--color-bg-expanded` | `#141414` | Expanded card overlay surface |
  | `--color-bg-elevated` | `#1e1e1e` | Tooltips, dropdowns, floating elements |
  | `--color-accent-primary` | `#ffb400` | Gold accent, CTAs, active states |
  | `--color-accent-primary-soft` | `oklch(from #ffb400 l c h / 15%)` | Gold at 15% opacity — hover tints |
  | `--color-accent-primary-glow` | `oklch(from #ffb400 l c h / 25%)` | Gold at 25% opacity — glow effects |
  | `--color-text-primary` | `#f0f0f0` | Headings, primary content |
  | `--color-text-secondary` | `#a0a0a0` | Body text, descriptions |
  | `--color-text-tertiary` | `#666666` | Captions, metadata |
  | `--color-text-accent` | `#ffb400` | Links, highlighted keywords |
  | `--color-border-subtle` | `oklch(from #ffffff l c h / 8%)` | Card borders, dividers |
  | `--color-border-hover` | `oklch(from #ffffff l c h / 15%)` | Hover state borders |
  | `--color-border-accent` | `oklch(from #ffb400 l c h / 30%)` | Gold glow focus/active borders |
  | `--color-success` | `#34d399` | Success states |
  | `--color-error` | `#f87171` | Error states |
  | `--color-info` | `#60a5fa` | Info messages |

  **Typography Scale:**
  | Token | Size | Weight | Line Height | Letter Spacing |
  |-------|------|--------|-------------|----------------|
  | Display | 3rem (48px) | 700 | 1.1 | -0.03em |
  | H1 | 2.25rem (36px) | 700 | 1.2 | -0.02em |
  | H2 | 1.5rem (24px) | 600 | 1.3 | -0.01em |
  | H3 | 1.25rem (20px) | 600 | 1.4 | 0 |
  | Body | 1rem (16px) | 400 | 1.7 | 0 |
  | Body Small | 0.875rem (14px) | 400 | 1.6 | 0 |
  | Caption | 0.75rem (12px) | 500 | 1.5 | 0.02em |

  Font families: Inter (primary/headings), JetBrains Mono or Fira Code (monospace)

  **Spacing Scale (4px base):**
  | Token | Value |
  |-------|-------|
  | `--spacing-1` | `4px` |
  | `--spacing-2` | `8px` |
  | `--spacing-3` | `12px` |
  | `--spacing-4` | `16px` |
  | `--spacing-6` | `24px` |
  | `--spacing-8` | `32px` |
  | `--spacing-12` | `48px` |
  | `--spacing-16` | `64px` |

  **Border Radii:**
  | Token | Value |
  |-------|-------|
  | `--radius-sm` | `8px` |
  | `--radius-md` | `12px` |
  | `--radius-lg` | `16px` |
  | `--radius-xl` | `24px` |

  **Box Shadows:**
  - ambient, elevated, glow, focus-ring (values per UX spec)

  **Animation Timing:**
  | Token | Value |
  |-------|-------|
  | micro | 150-200ms ease-out |
  | standard | 300-400ms cubic-bezier(0.16, 1, 0.3, 1) |
  | emphasis | 400-600ms (spring — Framer Motion) |
  | ambient | 30-60s linear |
  | signature | 1.5s ease-in-out (gold text pulse) |

  **Responsive Breakpoints:**
  - 768px (tablet) and 1000px (desktop) — mobile-first, matching existing project breakpoints

- [x] **Task 5: Import main.css in App.tsx** (AC: 5)
  - [x] Add `import './styles/main.css'` to `App.tsx` (path is relative from `src/App.tsx`)
  - [x] Note: `App.tsx` currently imports from `./components/common/GridComponents` (styled-component) — this import must remain untouched for coexistence

- [x] **Task 6: Create cn() helper** (AC: 6)
  - [x] Create directory `src/lib/` if it doesn't exist
  - [x] Create `src/lib/cn.ts` with:
    ```typescript
    import { clsx, type ClassValue } from 'clsx'
    import { twMerge } from 'tailwind-merge'

    export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs))
    }
    ```
  - [x] This is a named export (not default) per project convention for utilities

- [x] **Task 7: Create environment configuration helper** (AC: 7)
  - [x] Create directory `src/config/` if it doesn't exist
  - [x] Create `src/config/env.ts` exporting named constants for each env var:
    - `EMAILJS_SERVICE_ID`
    - `EMAILJS_TEMPLATE_ID`
    - `EMAILJS_CONTACT_TEMPLATE_ID`
    - `EMAILJS_PUBLIC_KEY`
    - `RECAPTCHA_SITE_KEY`
    - `DEBUG_VISITOR_TRACKING`
    - `API_URL`
    - `ENABLE_VISITOR_TRACKING`
  - [x] Pattern for each: `export const EMAILJS_SERVICE_ID = window.__ENV?.EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID || ''`
  - [x] Do NOT refactor existing `process.env` usages in this story — that happens in later stories when components are migrated

- [x] **Task 8: Update env.d.ts type declarations** (AC: 8)
  - [x] Update `src/types/env.d.ts` to add the `window.__ENV` type declaration
  - [x] Preserve the existing `NodeJS.ProcessEnv` declarations
  - [x] Add `ENABLE_VISITOR_TRACKING` to the `ProcessEnv` interface (currently missing)
  - [x] Add `Window.__ENV` interface matching all env var keys

- [x] **Task 9: Verify Tailwind utility rendering** (AC: 9, 10, 11)
  - [x] Run `npm run dev` — confirm dev server starts on port 3000
  - [x] Temporarily add a Tailwind class (e.g. `className="text-red-500"`) to a visible element, confirm it renders in browser
  - [x] Remove the test class after verification
  - [x] Confirm existing styled-components still render correctly (no visual regressions)
  - [x] Run `npm run build` — confirm production build succeeds without errors
  - [x] Check browser console for new warnings or errors

### Review Findings

- [x] [Review][Defer] **AC7: Constants vs accessor functions** — AC7 says "accessor functions" but Task 7 specifies constants. Deferred to Story 1.6 when window.__ENV is wired up via Docker entrypoint. — deferred, revisit in 1.6
- [x] [Review][Patch] **`||` should be `??` in env.ts** — Replaced `||` with `??` (nullish coalescing) in all 8 exports. [src/config/env.ts:1-23] ✅ Fixed
- [x] [Review][Patch] **postcss-loader applied to all CSS including node_modules** — Split CSS rule: postcss-loader scoped to `src/` via `include`, plain css-loader for node_modules. [webpack.common.cjs:22-28] ✅ Fixed
- [x] [Review][Patch] **@keyframes inside @theme block** — Moved all 5 @keyframes declarations outside @theme to global scope. [src/styles/main.css] ✅ Fixed
- [x] [Review][Defer] oklch relative color syntax has limited browser support — no fallbacks provided. Spec-mandated values. — deferred, spec-level decision
- [x] [Review][Defer] Dual CSS reset — Tailwind preflight and GlobalStyle both active with potential ordering conflicts. Working per manual verification. — deferred, coexistence by design
- [x] [Review][Defer] tailwind-merge not configured for custom theme tokens — cn() has no consumers yet. — deferred, address in story 1.3+
- [x] [Review][Defer] TypeScript in dependencies instead of devDependencies — pre-existing from story 1.1. — deferred, pre-existing
- [x] [Review][Defer] ContactForm.tsx e.preventDefault() called after early return — pre-existing bug. — deferred, pre-existing
- [x] [Review][Defer] ContactForm.tsx unsafe process.env access typed as always-present string — pre-existing. — deferred, pre-existing
- [x] [Review][Defer] env.d.ts types env vars as non-optional string — pre-existing pattern. — deferred, pre-existing

## Dev Notes

### Critical Architecture Constraints

- **Tailwind v4 uses CSS-first configuration** — tokens are defined via `@theme` in the CSS file, NOT via a `tailwind.config.js`. Do NOT create a `tailwind.config.js` file. [Source: architecture.md#Technology-Stack]
- **This is a coexistence story** — styled-components and Tailwind must both work simultaneously. Do not remove or modify any styled-components code. Do not remove `GlobalStyle.ts` or its import. [Source: epics.md#Story-12]
- **Loader order matters** — webpack loaders execute right-to-left. The array `['style-loader', 'css-loader', 'postcss-loader']` means: PostCSS processes first → CSS loader resolves imports → style-loader injects into DOM.
- **CommonJS config files** — `postcss.config.cjs` must use `.cjs` extension and `module.exports` syntax to match the existing `webpack.*.cjs` pattern. The project uses `"type": "module"` in package.json.
- **No automated tests** — verify everything manually via `npm run dev` and browser inspection. Do NOT create any test files. [Source: project-context.md#Testing-Rules]
- **Named exports for utilities** — `cn.ts` and `env.ts` use named exports per project convention for data/utility files. [Source: project-context.md#Language-Specific-Rules]

### Existing CSS Pipeline Context

The current `webpack.common.cjs` CSS rule (line 22-24):
```javascript
{
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
}
```
This must be updated to include `postcss-loader`. No other CSS processing exists in the project — all styling is currently via styled-components (runtime CSS-in-JS).

### Current GlobalStyle.ts CSS Variables

The existing `GlobalStyle.ts` defines these CSS custom properties that are actively used by styled-components throughout the app:
- `--color` (white), `--color-alt` (#ffb400), `--color-alt2` (#666), `--color-alt3` (#999)
- `--bg-color` (#111111), `--bg-color-alt` (#222222)
- `--border-style`, `--border-style-alt`
- `--fs-xxsm`, `--fs-xsm`, `--fs-sm`, `--fs-med`, `--fs-lge`

These must NOT be modified or removed in this story. The new Tailwind `@theme` tokens are additive. Later component migration stories (1.3, 1.4) will transition components from these old variables to Tailwind tokens.

### env.ts Pattern Rationale

The `window.__ENV?.KEY || process.env.KEY || ''` pattern serves dual purposes:
- **Development:** `dotenv-webpack` injects `process.env.KEY` at build time (current behaviour, preserved)
- **Production Docker:** Story 1.6 will add a `docker-entrypoint.sh` that injects `window.__ENV` at runtime, allowing env vars to be changed without rebuilding the image
- In this story, only the `process.env` path will be active. The `window.__ENV` path is scaffolded for Story 1.6.

### Existing process.env Usages (Do Not Refactor Yet)

Three files currently access `process.env` directly:
- `src/components/box5/ContactForm.tsx`
- `src/hooks/useVisitorTracker.ts`
- `src/components/VisitorTracker.tsx`

These will be refactored to use `src/config/env.ts` in later stories when those components are migrated. Do NOT change these files in Story 1.2.

### Files Created in This Story

```
NEW  postcss.config.cjs
NEW  src/styles/main.css
NEW  src/lib/cn.ts
NEW  src/config/env.ts
```

### Files Modified in This Story

```
MOD  package.json (new dependencies)
MOD  package-lock.json (lockfile refresh)
MOD  webpack.common.cjs (postcss-loader in CSS rule)
MOD  src/App.tsx (import main.css)
MOD  src/types/env.d.ts (window.__ENV type + ENABLE_VISITOR_TRACKING)
```

### Files NOT Touched

- `GlobalStyle.ts` — remains as-is, removed in Story 1.5
- `src/components/**` — no component changes in this story
- `tsconfig.json` — no changes needed
- `webpack.dev.cjs`, `webpack.prod.cjs` — no changes needed (CSS rule is in common)
- `Dockerfile` — Docker changes belong to Story 1.6

### Project Structure Notes

After this story, the `src/` tree gains three new directories:
```
src/
├── config/
│   └── env.ts              (NEW — environment variable helper)
├── lib/
│   └── cn.ts               (NEW — clsx + tailwind-merge utility)
├── styles/
│   └── main.css            (NEW — Tailwind @import + @theme design tokens)
├── types/
│   └── env.d.ts            (MODIFIED — window.__ENV type declaration added)
├── App.tsx                  (MODIFIED — imports main.css)
├── GlobalStyle.ts           (UNCHANGED)
├── components/              (UNCHANGED)
├── data/                    (UNCHANGED)
├── hooks/                   (UNCHANGED)
├── services/                (UNCHANGED)
└── main.tsx                 (UNCHANGED)
```

### Previous Story Intelligence (Story 1.1)

Key learnings from Story 1.1 that apply:
- **TypeScript 6.0 required `rootDir: "./src"` and `moduleResolution: "bundler"`** — already in place, no further tsconfig changes needed
- **webpack-cli jumped to 7.0.2** — config compatibility already verified
- **`@types/styled-components` 5.x coexists with `styled-components` 6.x** — known benign mismatch, do not attempt to fix
- **Manual verification via headless browser worked well** — continue this pattern
- **Deferred items from 1.1 review:** react-server-dom-* packages unused, TypeScript in dependencies not devDependencies, declaration:true emits .d.ts — all pre-existing, leave as-is

### Tailwind v4 Specific Notes

- Tailwind v4 uses `@import "tailwindcss"` instead of the v3 `@tailwind base/components/utilities` directives
- Design tokens are defined in `@theme { }` blocks within the CSS file — this replaces `tailwind.config.js`
- The `@tailwindcss/postcss` plugin is the v4 PostCSS integration (replaces the v3 `tailwindcss` PostCSS plugin)
- Tailwind v4 automatically detects content sources from the project — no `content` array configuration needed

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-12-Tailwind-CSS-Integration-and-Utility-Helpers]
- [Source: _bmad-output/planning-artifacts/architecture.md#Technology-Stack]
- [Source: _bmad-output/planning-artifacts/architecture.md#Critical-Decision-2-Tailwind-Framer-Motion-Integration]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation-Sequence]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design-Tokens]
- [Source: _bmad-output/project-context.md#Testing-Rules]
- [Source: _bmad-output/project-context.md#Critical-Dont-Miss-Rules]
- [Source: _bmad-output/implementation-artifacts/1-1-upgrade-dependencies-and-runtime.md]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References
- `npm install tailwindcss @tailwindcss/postcss postcss postcss-loader autoprefixer clsx tailwind-merge`
- `npm install -D tailwindcss @tailwindcss/postcss postcss postcss-loader autoprefixer`
- `npm install clsx tailwind-merge`
- `npm run dev`
- `google-chrome --headless --disable-gpu --no-sandbox --window-size=1440,1600 --screenshot=/home/warrick/Dev/WS-Portfolio-New/.codex-tailwind-check.png http://localhost:3000`
- `npm run build`

### Completion Notes List
- Added Tailwind v4 PostCSS integration to the existing Webpack CSS pipeline without touching non-CSS rules.
- Created `src/styles/main.css` with Tailwind import and the story's token set for colors, typography, spacing, radii, shadows, animation timing, and breakpoints.
- Added shared runtime helpers: `src/lib/cn.ts` for class merging and `src/config/env.ts` for runtime/build-time environment access.
- Extended `src/types/env.d.ts` with `ENABLE_VISITOR_TRACKING`, `window.__ENV`, and a global CSS module declaration required for the side-effect stylesheet import.
- Verified `npm run dev` on port 3000, confirmed a temporary `text-red-500` utility rendered in headless Chrome while the styled-components layout remained intact, then removed the probe and re-ran `npm run build` successfully.

### File List
- `_bmad-output/implementation-artifacts/1-2-tailwind-css-integration-and-utility-helpers.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `package-lock.json`
- `package.json`
- `postcss.config.cjs`
- `src/App.tsx`
- `src/config/env.ts`
- `src/lib/cn.ts`
- `src/styles/main.css`
- `src/types/env.d.ts`
- `webpack.common.cjs`

### Change Log
- 2026-03-31: Implemented Tailwind v4/PostCSS integration, theme tokens, `cn()` helper, runtime env helper, and manual coexistence verification for Story 1.2.
