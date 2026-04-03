# Deferred Work

## Deferred from: code review of 1-1-upgrade-dependencies-and-runtime (2026-03-31)

- Dead dependencies: `react-server-dom-parcel` and `react-server-dom-webpack` are unused in this client SPA — zero imports across all source files. Consider removing in a later cleanup story.
- TypeScript (`^6.0.2`) is in `dependencies` instead of `devDependencies`. Semantically incorrect for a build tool. Safe to move in a future housekeeping pass since Dockerfile uses `npm install` (not `npm ci --omit=dev`).
- Dev server `static.directory` removal in `webpack.dev.cjs` is correct — old config served from `./dist` redundantly. CopyWebpackPlugin handles asset copying. If new static files are added to `public/` in future, they need CopyWebpackPlugin patterns, not devServer.static.
- `declaration: true` + `noEmit: false` in tsconfig causes `.d.ts` files to be emitted into `dist/`. Unnecessary for a client SPA. Consider disabling in a later cleanup.
- Favicon `<link>` uses `type="image/ico"` — correct MIME type is `image/x-icon`. Pre-existing.
- `serve` is installed globally in Docker via `RUN npm install -g serve`. Works but adds attack surface. Consider copying from node_modules in a future Docker optimization pass.
- `@types/node` at `^24.12.0` aligns with Node 24 runtime but may lag behind the TypeScript 6.0 `ts6.0` dist-tag target. Build passes. Low priority.
- `tsconfig.json` `paths` config (`@/*`) is dead — no source files use `@/` imports. Webpack alias handles resolution. Not harmful but could mislead developers.

## Deferred from: code review of 1-2-tailwind-css-integration-and-utility-helpers (2026-03-31)

- oklch relative color syntax (`oklch(from #ffb400 l c h / 15%)`) has limited browser support — no CSS fallbacks provided. Values are spec-mandated. Consider adding rgba fallbacks before oklch declarations for older browsers.
- Dual CSS reset — Tailwind preflight (via `@import "tailwindcss"`) and GlobalStyle.ts both reset base styles. Currently working but potential ordering conflicts (e.g., body font-weight). Address when GlobalStyle is removed in story 1.5.
- tailwind-merge not configured for custom theme tokens — `cn()` won't correctly resolve conflicts on custom utilities like `text-text-primary`. Configure `extendTailwindMerge` when custom utilities are first consumed in story 1.3+.
- TypeScript in dependencies instead of devDependencies — pre-existing from story 1.1 (already tracked above).
- ContactForm.tsx `e.preventDefault()` called after early return on captcha check — page reloads when captcha is incomplete. Pre-existing bug, not related to story 1.2.
- ContactForm.tsx unsafe process.env access — typed as always-present `string` but may be undefined at runtime if .env key is missing. Pre-existing.
- env.d.ts types ProcessEnv vars as non-optional `string` — hides potential undefined at runtime. Pre-existing pattern.
- AC7 specifies "accessor functions" but implementation uses `export const` (per Task 7 pattern). Constants evaluate once at import time. Revisit in Story 1.6 when `window.__ENV` is wired up via Docker entrypoint — may need to refactor to lazy accessor functions if injection timing requires it.

## Deferred from: code review of 1-3-component-migration-common-and-leaf-components (2026-04-01)

- WordSlider setTimeout not cleaned up on unmount — inner setTimeout in useEffect not cleared on component unmount, may cause React state-update-on-unmount warning. Pre-existing.
- CloseButton click event propagates to parent Card onClick — no stopPropagation on button click, event may bubble to Card's handleCardClick. Pre-existing.
- GoldPulseText card preview titles have no semantic heading role — rendered as `<span>` without ARIA roles. Pre-existing, tracked for Epic 6 accessibility work. **→ Target: Epic 6 (Story 6.3)**
- Empty words array crashes WordSlider — `(prevIndex + 1) % words.length` produces NaN when words is empty. Pre-existing. **→ Target: bug fix or housekeeping story**

## Deferred from: code review of 1-4-component-migration-feature-components-and-folder-renames (2026-04-01)

- onCaptchaChange always sets true on null — captcha expiration doesn't disable submit button. Pre-existing.
- Non-null assertion on form.current! without null guard — runtime error if form ref is somehow null. Pre-existing.
- closeCard state churn — setIsClosed(true) + setSelectedId(null) then useEffect resets isClosed, causing extra render cycle. Pre-existing pattern.
- EmailJS empty string silent failure — ContactForm passes env values to emailjs.sendForm() with no empty-string check, unlike useVisitorTracker which guards. Pre-existing.

## Deferred from: code review of 1-5-styled-components-removal-and-dead-code-cleanup (2026-04-01)

- Token naming convention inconsistency — semantic names (`text-supporting`, `text-callout`, `text-emphasis`, `text-metric`) don't follow the existing size-based pattern (`text-caption`, `text-body-sm`, `text-body-lg`). Design decision, not a regression.
- `body { font-weight: 700 }` global bold default — all descendants inherit bold unless explicitly overridden. Carried over from GlobalStyle.ts per Task 1 instructions.
- BulletPoints `<ul>` with `flex-1` has no overflow clamp — long bullet lists could push beyond card bounds when many items are present.
- WordSlider empty `words` array modulo-by-zero — already tracked from 1.3 review (duplicate entry, confirms still open).
- `document.getElementById('root')` null assertion — `as HTMLElement` cast hides potential null. Pre-existing.

### Resolved by Story 1.5

- Dual CSS reset (Tailwind preflight + GlobalStyle.ts) — **resolved**: GlobalStyle.ts deleted, global rules migrated to main.css.
- CloseButton click event propagates to parent Card — **resolved**: stopPropagation added in CloseButton.tsx.

## Deferred Item Target Matrix

Maps every deferred item to its natural resolution point. Items without a clear target need a housekeeping story.

### Infrastructure / Housekeeping (no natural story — need dedicated cleanup)

| Item | Origin | Notes |
|------|--------|-------|
| Dead dependencies `react-server-dom-parcel`, `react-server-dom-webpack` | 1.1 review | Zero imports, safe to remove |
| TypeScript in `dependencies` instead of `devDependencies` | 1.1 review | Semantically wrong, functionally harmless |
| `declaration: true` + `noEmit: false` emits `.d.ts` into dist | 1.1 review | Unnecessary for client SPA |
| Favicon MIME type `image/ico` → should be `image/x-icon` | 1.1 review | Pre-existing |
| `@types/node` may lag behind TS 6.0 dist-tag | 1.1 review | Low priority |
| Dead `tsconfig.json` paths config (`@/*` unused) | 1.1 review | Not harmful but misleading |

### ~~Target: Story 1.5 (Styled-Components Removal)~~ — RESOLVED

| Item | Origin | Status |
|------|--------|--------|
| Dual CSS reset (Tailwind preflight + GlobalStyle) | 1.2 review | **Resolved** — GlobalStyle.ts deleted |
| oklch relative color syntax — no CSS fallbacks | 1.2 review | **Resolved** — reviewed during 1.5, no action needed |

### ~~Target: Story 1.6 (Docker Build & Runtime Environment)~~ — RESOLVED

| Item | Origin | Status |
|------|--------|--------|
| `serve` installed globally in Docker (attack surface) | 1.1 review | **Partially resolved** — pinned to `serve@14.2.5` |
| AC7 constants vs accessor functions for env | 1.2 review | **Resolved** — `readEnv()` works with runtime injection |
| ContactForm unsafe `process.env` access (may be undefined) | 1.2 review | **Resolved** — imports from `env.ts` gateway |
| `env.d.ts` types ProcessEnv vars as non-optional string | 1.2 review | **Resolved** — all fields now optional |

### Target: Epic 6 (Accessibility)

| Item | Origin | Notes |
|------|--------|-------|
| GoldPulseText card titles have no semantic heading role | 1.3 review | Needs ARIA roles or semantic elements |

### Bugs (fix opportunistically or in next touching story)

| Item | Origin | Notes |
|------|--------|-------|
| ContactForm `e.preventDefault()` after early return on captcha | 1.2 review | Page reloads when captcha incomplete |
| WordSlider setTimeout not cleaned up on unmount | 1.3 review | May cause state-update-on-unmount warning |
| CloseButton click event propagates to parent Card | 1.3 review | **Resolved** — stopPropagation added in Story 1.5 |
| Empty words array crashes WordSlider (modulo by zero) | 1.3 review | Produces NaN index |

## Deferred from: code review of 1-6-docker-build-and-runtime-environment (2026-04-01)

- Debug logging effect fires multiple times per tracking cycle — VisitorTracker.tsx second useEffect fires on every isLoading/error/isRateLimited state change. Gated behind DEBUG_VISITOR_TRACKING. Dev-only, low impact.
- `serve@14.2.5` pinned without justification comment — Dockerfile pins serve version. Good practice but no comment explaining why.
- No build-output validation in Dockerfile — If webpack build silently fails to produce dist/ content, Docker image serves empty directory. Pre-existing pattern.
- `npm start` without `.env` silently produces non-functional features — Pre-existing. dotenv-webpack allows missing .env. Documented in .env.example.
- `.env` has EMAILJS_PUBLIC_KEY commented out — Pre-existing local config issue. Silent failure when tracking enabled without debug flag.

## Deferred from: code review of 1-7-ci-cd-pipeline-and-deployment-configuration (2026-04-02)

- `image:` + `build:` ordering surprise in docker-compose — `docker compose up` without prior build may attempt to pull `ws-portfolio:local` from a registry. Docs say `docker compose build` first. Pre-existing.
- `cancel-in-progress: true` can kill a working build — two rapid pushes to main could cancel a good build mid-push. Intentional tradeoff.
- Stale `styled-components` in `docs/project-scan-report.json` — generated file; story explicitly excludes hand-editing it.
- `.env` not in `.dockerignore` — local `.env` would be included in Docker build context (but never reaches runtime image). Pre-existing.
- Deprecated `version: '3.8'` in docker-compose.yml — Docker Compose V2 ignores it. Pre-existing.
- No health check in Dockerfile or docker-compose.yml — Portainer/Docker cannot detect a hung `serve` process. Pre-existing, out of story scope.

### Resolved by Story 1.6

- `env.d.ts` types ProcessEnv vars as non-optional string — **resolved**: all fields now optional.
- AC7 constants vs accessor functions for env — **resolved**: `readEnv()` reads `window.__ENV` at call time; module-level constants work correctly with runtime injection.
- ContactForm unsafe `process.env` access — **resolved**: ContactForm imports from `env.ts` gateway with empty-string guards.
- `serve` installed globally in Docker — **partially resolved**: still global install but pinned to `serve@14.2.5`.

## Deferred from: code review of 2-1-card-grid-layout-and-dark-theme-foundation (2026-04-02)

- CloseButton uses legacy `rounded-radius-sm` class — pre-dates Story 2.1. Should be `rounded-sm` for Tailwind v4 utility resolution. `src/components/common/CloseButton.tsx:18`
- Static cards (1 & 2) receive click events with no focus indication — keyboard users tabbing to non-interactive cards get no visual indication they are inert. Pre-exists Story 2.1.

## Deferred from: code review of 2-2-card-hover-effects-and-goldpulsetext (2026-04-02)

- `supportsFineHoverPointer()` called per-render — `window.matchMedia()` invoked on every Card render. Cheap but unnecessary. Module-level lazy init or `useMemo` would avoid repeated calls. Not a correctness issue.
- Inner `<div>` wrapper blocks Framer Motion `layout` propagation to children (Card.tsx:94-102) — The plain div between `motion.div` and children breaks the layout animation tree. No child currently uses `layoutId`, so no visible bug. Architectural consideration for future stories.
- `group/card` naming collision risk — Generic group name could conflict if nested elements also use `group/card`. Safe today but fragile for future extensions.

## Deferred from: code review of 2-3-card-expansion-and-overlay-system (2026-04-03)

- `overscroll-contain` on mobile viewport may clip content with dynamic browser toolbar — `window.innerHeight` may not account for address bar. Known mobile browser limitation. `src/components/common/CardExpansionOverlay.tsx:~24`
- Rapid open/close toggling can cause visual glitch — clicking same card during AnimatePresence exit animation reopens while closing. `src/components/MainPage.tsx:~51`
