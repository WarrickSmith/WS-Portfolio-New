# Deferred Work

## Course Correction Disposition (2026-04-07)

All items audited and assigned dispositions per Sprint Change Proposal `sprint-change-proposal-2026-04-07.md`.

### Resolved — Remove from Tracking

| Item | Resolution |
|------|------------|
| Dual CSS reset (Tailwind + GlobalStyle) | GlobalStyle.ts deleted in Story 1.5 |
| CloseButton click propagation | stopPropagation added in Story 1.5 |
| ContactForm unsafe process.env access | Uses env.ts gateway since Story 1.6 |
| env.d.ts types non-optional string | All fields optional since Story 1.6 |
| AC7 constants vs accessor functions | readEnv() pattern works correctly |
| docker-compose version: '3.8' | No longer present in file |
| Dead tsconfig paths @/* | Removed from tsconfig.json |
| learningAdaptability never rendered | Now rendered in ApproachContent.tsx (Story 4.3) |
| ContactForm e.preventDefault bug | ContactForm rewritten in Story 5.1 |
| onCaptchaChange sets true on null | ContactForm rewritten in Story 5.1 |
| EmailJS empty string silent failure | ContactForm rewritten in Story 5.1 |
| closeCard/isClosed state churn | AnimatePresence pattern replaced this in Epic 2 |
| oklch relative color syntax fallbacks | Design decision, 28+ occurrences |

### Assigned to Epic 6 Stories

| Item | Target |
|------|--------|
| Dead dependencies removal | Story 6.1 |
| TypeScript → devDependencies | Story 6.1 |
| declaration: true cleanup | Story 6.1 |
| Promise.race timer leak (3 files) | Story 6.1 |
| Dead isAvailable() method | Story 6.1 |
| .env in .dockerignore | Story 6.1 |
| body font-weight: 700 audit | Story 6.1 |
| WordSlider setTimeout cleanup | Story 6.1 |
| WordSlider empty array guard | Story 6.1 |
| localStorage parseInt NaN guard | Story 6.1 |
| overviewStats memoization | Story 6.1 |
| Docker health check | Story 6.1 |
| Card consolidation (merge Card 1 + Card 2) | Story 6.2 |
| Card preview layout rework | Story 6.2 |
| Even card sizing constraint | Story 6.2 |
| Card ID magic numbers → named constants | Story 6.2 |
| ApproachContent min-[860px] breakpoint | Story 6.2 |
| Missing skill badges | Story 6.2 |
| `rounded-radius-sm` → `rounded-sm` (4 files) | Story 6.2 |
| AboutContent arbitrary breakpoints | Story 6.2 |
| GoldPulseText no semantic heading role | Story 6.4 |
| Ambient background tuning | Story 6.5 |
| Per-card animation tuning | Story 6.5 |
| Favicon MIME type fix | Story 6.6 |

### Accepted / Dismissed — No Action

Items with no practical impact, theoretical concerns, library limitations, or design decisions. Removed from active tracking. Full rationale in `sprint-change-proposal-2026-04-07.md` Section 4D (40 items).

---

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

### Target: Story 6.4 (Screen Reader Compatibility & Semantic HTML)

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

## Deferred from: code review of 2-4-per-card-expansion-animations-and-spring-physics (2026-04-03)

- onExitComplete race on unmount — no timeout fallback if component unmounts mid-exit animation. Theoretical in this SPA, no concurrent mode. `src/components/common/ExpandableItem.tsx:136-139`
- useReducedMotion() only reads on mount — Framer Motion limitation; runtime preference changes not reflected. `src/components/common/ExpandableItem.tsx:80`
- Cards 1/2 run ExpandableItem overlay tracking unnecessarily — overlayVisible state, refs, and effects fire for non-interactive cards. Minor overhead, not a bug. `src/components/MainPage.tsx:208`
- CSS mix-blend-mode: screen on overlay highlight — may render as solid band on some mobile GPUs or hardware-acceleration-disabled browsers. `src/styles/main.css:213`

## Deferred from: code review of 2-5-ambient-background-motion (2026-04-03)

- `blur(24px)` filter on continuously animated `::before` pseudo-element adds GPU compositing cost on low-end devices. Runtime-verified acceptable (8.2ms script, 0 long tasks in 3s capture). Flagged by all three review layers. Revisit if mobile performance complaints arise.
- `oklch(from ...)` relative color syntax browser support — pre-existing pattern (28+ occurrences in codebase). Not introduced by this change. Tracked from Story 1.2 review.

## Deferred from: code review of 3-1-about-me-content-layout-and-profile-information (2026-04-04)

- `learningAdaptability` data wired but never rendered — Data exists in `personalData.tsx` and flows through `consolidatedProfile` but no component renders it. Preserved for future Story 4.3 (ApproachContent). `src/data/consolidatedProfile.tsx:36`
- `overviewStats` recomputed on every render — Static data declared inside component body, not memoized. Negligible perf impact. `src/components/about/AboutContent.tsx:9-25`
- Portrait image column fixed at 220px on desktop — Creates asymmetric layout on wide viewports. Works within current overlay max-width constraint. `src/components/about/AboutContent.tsx:38`
- `h-full` on `<img>` with no explicit parent height — Relies on `min-h-64` fallback. Works in practice due to intrinsic aspect ratio. `src/components/about/AboutContent.tsx:82`
- Dual data source split: profile from `personalData`, sections from `consolidatedProfile` — Architectural observation. Both resolve to same underlying data. Future refactor opportunity. `src/components/about/AboutContent.tsx:2-3`
- Timeline dot may clip if `overflow:hidden` added to parent — Current layout has no overflow clipping. Fragile if styles change. `src/components/about/AboutContent.tsx:151`

## Deferred from: code review of 3-2-skills-grid-with-skills-to-proof-mapping (2026-04-04)

- Missing key tech skills in data (React, TypeScript, Tailwind) — Portfolio bullets reference React, TypeScript, Tailwind, Next.js but no corresponding skill badges exist. Data completeness is a content decision outside story code scope. deferred, content decision
- Race condition on rapid skill badge clicks — Multiple rapid clicks during close animation overwrite `pendingProjectNavigation`; last-clicked project wins. Acceptable behavior, no user-visible bug. deferred, acceptable behavior
- useEffect cleanup cancels rAF but not pending state — Theoretical narrow window where effect cleanup cancels rAF but `pendingProjectNavigation` remains set. Extremely unlikely in practice. deferred, theoretical concern
- PortfolioContent scrollIntoView fires on remount — If Suspense fallback triggers remount, scroll snaps back to the selected project. Unlikely in current architecture. deferred, unlikely
- Skills section position pre-existing from Story 3.1 — Story 3.1 established the section order. 3.2 upgraded skills in-place without reordering. deferred, pre-existing layout from 3.1

## Deferred from: code review of 4-2-portfolio-data-update-and-content-refresh (2026-04-05)

- Duplicate React key fragility in keyFeatures/techStack — pre-existing from Story 4.1. `key={feature}` / `key={technology}` risk if duplicate strings within same project. Low risk with current data. `ProjectCard.tsx:50,57`
- ExternalLinkButton no guard for empty href — pre-existing from Story 4.1. Empty string would navigate to current page in new tab. Current data complete. `ExternalLinkButton.tsx:14`
- consolidatedProfile silently swallows invalid projectIds — pre-existing. `.filter` drops undefined lookups silently. TS union type catches typos at compile time. `consolidatedProfile.tsx:54-56`

## Deferred from: code review of 4-1-portfolio-content-layout-and-project-cards (2026-04-05)

- `key={feature}` / `key={technology}` fragile for duplicates — React key collision risk if duplicate strings appear within same project's arrays. Low risk with current data. `ProjectCard.tsx:50,57`
- `marker:text-text-accent` may not propagate to bullets in Safari — `::marker` color inheritance on `<ul>` is inconsistent across browsers. May show default color instead of accent gold. `ProjectCard.tsx:48`
- Large unoptimized image assets (~1.26 MiB total) — PNG assets shipped as-is via webpack `asset/resource`. No compression, WebP/AVIF, or srcset. Pre-existing pattern. `src/assets/`
- ExternalLinkButton no guard for empty href — Component requires href as non-optional string, but empty string would navigate to current page in new tab. Current data complete. `ExternalLinkButton.tsx:14`

## Deferred from: code review of 4-3-proof-to-skills-reverse-navigation-and-approach-content (2026-04-06)

- Card ID literals inconsistent with named constants — Switch statement in `renderChildDiv.tsx` uses raw `3`/`4`/`5`/`6` while `handleOpen` in `MainPage.tsx` uses raw `1`/`2`. Only `ABOUT_CARD_ID` and `PORTFOLIO_CARD_ID` have named constants. Pre-existing inconsistency. `src/components/common/renderChildDiv.tsx:196-215`, `src/components/MainPage.tsx:130`
- Arbitrary `min-[860px]` breakpoint in ApproachContent — Does not align with project's `tablet`/`desktop` responsive tokens. Would need project-wide component breakpoint audit. Low priority. `src/components/approach/ApproachContent.tsx:32,67`

## Deferred from: code review of 5-1-contact-form-with-validation-and-submission (2026-04-06)

- Cannot abort in-flight emailjs.sendForm after timeout — Library doesn't support AbortController. Promise.race timeout fires but network request continues, potentially causing duplicate sends if user retries after timeout error. No fix available without library changes or switching away from sendForm. `ContactForm.tsx:Promise.race`
- Empty contact.links array renders empty Profiles section — If links array is empty, section heading and description render with no link items below. Data completeness concern, not a code bug. `ContactContent.tsx:profiles section`

## Deferred from: code review of 5-2-visitor-tracking-and-notification-system (2026-04-06)

- Timer leak in `Promise.race` — `setTimeout` timers never cleared when primary promise resolves first. Timer fires into settled promise (no-op but wasteful). Same pattern from Story 5.1. `ipGeolocationService.ts:21-25`, `useVisitorTracker.ts:175-179`
- No AbortController on geolocation fetch — request not cancelled on timeout, continues running until server responds. Known SDK limitation. `ipGeolocationService.ts:22`
- No rate-limit cooldown on EmailJS failure — every page load retries full cycle (geolocation + send) when EmailJS service is down. Pre-existing behavior, spec does not require cooldown. `useVisitorTracker.ts:~224`
- Corrupted localStorage value bypasses rate limiting — `parseInt('abc')` → NaN → rate limit check evaluates false. Pre-existing, not introduced by this diff. `useVisitorTracker.ts:checkRateLimit`
- Dead `isAvailable()` method — no callers remain after guard removal in Story 5.2. Spec only required removing the call, not the method. Minor dead code. `ipGeolocationService.ts:53-55`
