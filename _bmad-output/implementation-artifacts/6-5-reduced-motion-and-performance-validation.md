# Story 6.5: Reduced Motion and Performance Validation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor with motion sensitivity,
I want all animations disabled when I have reduced motion enabled,
so that I get a fully functional and visually complete experience without any motion.

## Acceptance Criteria

1. With `prefers-reduced-motion: reduce` enabled, all CSS transitions and animations used by interactive UI resolve to `duration: 0ms` / `transition-none` behavior with no transform-driven motion.
2. All Framer Motion surfaces honor reduced motion with no spring physics. Reduced-motion paths use `useReducedMotion()` and remove transform/layout travel; any remaining state change is opacity-only and effectively instant.
3. `GoldPulseText` renders as a static gold text-shadow with no pulse animation.
4. `AmbientBackground` renders as a static gradient with no drift or movement.
5. Card expansion, overlay content reveal, and backdrop presentation remove staged choreography in reduced-motion mode. No y/scale/layout movement remains.
6. Cross-card navigation and in-overlay target scrolling do not animate in reduced-motion mode. Choreography-only delays collapse to immediate execution.
7. The reduced-motion presentation remains fully functional and visually complete across keyboard, pointer, and touch interactions.
8. Story 6.3 and Story 6.4 behavior does not regress: focus trap, Escape close, focus return, inert background, dialog semantics, heading hierarchy, and live-region behavior remain intact.
9. For non-reduced users, ambient background tuning makes the effect perceptible when watched for 10-15 seconds without becoming distracting. The reduced-motion static path remains unchanged.
10. For non-reduced users, current interactive cards retain clearly distinct expansion character after retuning against real content density, and motion remains smooth at 60fps.
11. Manual browser verification confirms no visible regression in hover, overlay, navigation, or content readability behavior at desktop, tablet, and mobile breakpoints.
12. Lighthouse Performance score is `>= 90`.
13. First Contentful Paint is `< 1.5s`, Largest Contentful Paint is `< 2.5s`, and Cumulative Layout Shift is `< 0.1` in the chosen lab validation setup, with any misses traced to measured bottlenecks and documented.
14. Lighthouse Accessibility score is `>= 90`, and WCAG AA contrast compliance is rechecked while tuning motion and polish.
15. Production build stays within the `2.5MB` max per asset/entrypoint budget, and vendor chunk splitting remains active.
16. Deferred-item triage is completed before story close: in-scope motion/performance findings are resolved here, and remaining out-of-scope items are explicitly assigned to Story 6.6 or Story 6.7.

## Tasks / Subtasks

- [x] Task 1: Establish the reduced-motion contract for all Motion-managed UI (AC: 2, 5, 6, 7, 8)
  - [x] Add a site-wide Motion reduced-motion policy around the card/overlay subtree. Preferred approach: `MotionConfig reducedMotion="user"` in `src/components/MainPage.tsx` or the nearest stable shared shell.
  - [x] Keep `useReducedMotion()` in `src/components/common/ExpandableItem.tsx` and `src/components/common/OverlayContentGroup.tsx` for bespoke branching where opacity-only behavior is required.
  - [x] Update `src/components/common/ExpandableItem.tsx` so reduced-motion transitions no longer use spring behavior or non-zero spatial motion.
  - [x] Update `src/components/common/OverlayContentGroup.tsx` so reduced-motion paths remove staggered reveal timing and y-axis movement.
  - [x] Update the `DimmedBackdrop` transition path in `src/components/MainPage.tsx` so reduced-motion mode does not keep a `0.3s` fade as an unconditional animation.
  - [x] Collapse `CROSS_CARD_NAVIGATION_DELAY_MS` to immediate execution in reduced-motion mode while preserving the same navigation outcome.

- [x] Task 2: Audit CSS transitions and scrolling behavior for reduced motion (AC: 1, 3, 4, 6, 7)
  - [x] Audit all interactive surfaces that currently use Tailwind transition utilities without a reduced-motion override.
  - [x] Add `motion-reduce:transition-none`, `motion-reduce:hover:transform-none`, or `motion-safe:` gating where appropriate in:
    - `src/components/portfolio/ProjectCard.tsx`
    - `src/components/common/ExternalLinkButton.tsx`
    - `src/components/common/SkillBadge.tsx`
    - `src/components/common/CloseButton.tsx`
    - `src/components/contact/ContactContent.tsx`
    - `src/components/contact/ContactForm.tsx`
    - `src/components/about/AboutContent.tsx`
    - any other interactive surface found during the audit
  - [x] Reconfirm that existing reduced-motion handling in `src/components/common/Card.tsx`, `src/components/common/CardPreview.tsx`, `src/components/common/GoldPulseText.tsx`, and `src/styles/main.css` still matches the stricter Story 6.5 requirements.
  - [x] Replace hard-coded `scrollIntoView({ behavior: 'smooth' })` usage in `src/components/about/AboutContent.tsx` and `src/components/portfolio/PortfolioContent.tsx` with reduced-motion-aware behavior (`instant` or `auto` when motion is reduced).

- [x] Task 3: Tune the non-reduced motion path now that all content is in place (AC: 9, 10, 11)
  - [x] Tune ambient background intensity in `src/styles/main.css` by adjusting opacity, drift range, blur cost, and/or cycle timing so the effect is perceptible without competing with content.
  - [x] Reassess card expansion presets in `src/components/common/renderChildDiv.tsx` against current real overlay content. Preserve the established visual language while making each card's motion character read immediately.
  - [x] Revisit `src/components/common/ExpandableItem.tsx` only as needed to support stronger non-reduced motion presets without compromising the reduced path.
  - [x] Verify that bottom-origin cards do not feel interchangeable after tuning. If `Approach` and `Contact` still read too similarly, differentiate them without breaking the shared system.
  - [x] Re-measure the animated ambient blur cost after tuning and reduce the effect if it creates a measurable regression on low-end/mobile profiles.

- [x] Task 4: Validate performance budgets and optimize only measured bottlenecks (AC: 12, 13, 14, 15)
  - [x] Run `npm run build` and record the emitted entrypoint and asset sizes.
  - [x] Verify `webpack.prod.cjs` still provides `splitChunks` vendor chunking plus `maxAssetSize` / `maxEntrypointSize` at `2500000`.
  - [x] Run Lighthouse Performance and Accessibility against the production build, using desktop and mobile emulation.
  - [x] Use Chrome DevTools Performance and Lighthouse diagnostics to identify actual bottlenecks before changing code.
  - [x] If scores miss targets, prioritize measured fixes in this order:
    - remove unnecessary motion cost
    - reduce the impact of large image assets or late-discovered content
    - eliminate layout shift causes
    - trim any avoidable bundle growth
  - [x] Keep optimization work inside the current architecture. No bundler migration, no new test framework, no speculative rewrites.

- [x] Task 5: Run the full manual verification matrix (AC: 1-15)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev` or `npm start` against the production build as appropriate for the checks.
  - [x] Verify at `375px`, `768px`, and `1000px` with reduced motion off and on.
  - [x] Verify hover/focus states, overlay open/close, About -> Portfolio and Portfolio -> About cross-card navigation, and reduced-motion target scrolling.
  - [x] Re-run the Story 6.3 / 6.4 keyboard and semantics smoke checks after motion changes.
  - [x] Verify color contrast remains compliant after any visual tuning.

- [x] Task 6: Complete deferred-item triage and preserve story boundaries (AC: 16)
  - [x] Review `deferred-work.md` entries that naturally belong to motion or performance.
  - [x] Resolve the explicitly assigned Story 6.5 items:
    - ambient background tuning
    - per-card expansion animation tuning
  - [x] Disposition any newly discovered findings before marking the story complete.
  - [x] Do not absorb SEO/discoverability work from Story 6.6. Do not absorb unrelated catch-all cleanup unless it is a direct prerequisite for Story 6.5 acceptance.

## Dev Notes

### Critical Story Guardrails

- Story 6.5 is the motion/performance hardening pass for the finished portfolio, not a redesign.
- Preserve the current local-state architecture in `MainPage.tsx`. No Context, Redux, Zustand, or new global state.
- Tailwind remains the only styling method. Reduced-motion CSS handling belongs in Tailwind classes and `src/styles/main.css`.
- Framer Motion remains the animation library. Do not replace it or migrate imports as part of this story.
- Story 6.3 and Story 6.4 are hard guardrails. Reduced-motion and performance work must not regress focus flow, inert background handling, dialog semantics, headings, form announcements, or screen-reader behavior.
- Keep the existing Webpack 5 build. Story 6.5 is allowed to optimize measured bottlenecks, not change toolchains.
- Manual verification remains the project standard. Do not add `.test.*` or `.spec.*` files.

### Current Repo State

Already in place:

- `src/components/common/Card.tsx`, `src/components/common/CardPreview.tsx`, and `src/components/common/GoldPulseText.tsx` already use some `motion-reduce:` handling.
- `src/components/common/ExpandableItem.tsx` and `src/components/common/OverlayContentGroup.tsx` already branch on `useReducedMotion()`.
- `src/styles/main.css` already disables ambient drift in a `prefers-reduced-motion: reduce` media query.
- `webpack.prod.cjs` already enforces `splitChunks`, `maxAssetSize`, and `maxEntrypointSize`.

Story 6.5 gaps discovered during preparation:

- `src/components/common/ExpandableItem.tsx` still uses reduced-motion transitions with non-zero durations (`0.01` and `0.12`) and keeps a separate reduced-motion overlay transition definition.
- `src/components/common/OverlayContentGroup.tsx` still uses a reduced-motion transition duration of `0.12` and keeps an animate/exit path that should be rechecked against the stricter Story 6.5 requirement.
- `src/components/MainPage.tsx` still hard-codes a `0.3s` backdrop fade and a `150ms` cross-card navigation delay regardless of motion preference.
- `src/components/about/AboutContent.tsx` and `src/components/portfolio/PortfolioContent.tsx` still hard-code smooth scrolling for target navigation.
- Several interactive components still use Tailwind transition utilities without reduced-motion overrides: `ProjectCard`, `ExternalLinkButton`, `SkillBadge`, `CloseButton`, `ContactContent`, `ContactForm`, and parts of `AboutContent`.
- The ambient background was intentionally subtle in Story 2.5 and is now explicitly flagged for tuning in Story 6.5.

### Current Performance Baseline

From `npm run build` on `2026-04-09`:

- Entrypoint `main`: `2.15 MiB`
- Vendor chunk: `1.98 MiB`
- Main app chunk: `168 KiB`
- Webpack production build compiled successfully and stayed within the repo's `2.5MB` asset/entrypoint caps

Largest current image assets in `src/assets/`:

- `raceday.png`: `553 KiB`
- `ws-portfolio.png`: `367 KiB`
- `music-manager.png`: `339 KiB`
- `warrick.jpg`: `200 KiB`

These numbers do not automatically mean a defect, but they are the first places to inspect if Lighthouse misses FCP/LCP targets.

### Architecture Compliance

- Animation boundary remains the same:
  - Tailwind/CSS owns hover-only transitions, ambient drift, and reduced-motion utility classes
  - Framer Motion owns layout/overlay choreography and reduced-motion branching for Motion-managed elements
- Shared motion primitives remain in `src/components/common/`.
- Feature folders should only receive the smallest edits needed to honor reduced motion or fix measured performance issues.
- `src/config/env.ts`, data files, and deployment files should stay untouched unless a measured performance issue proves otherwise.

### Cross-Story Intelligence

From Story 6.4:

- `CardExpansionOverlay.tsx` remains the only dialog surface.
- `MainPage.tsx` already handles focus transfer, focus return, and background inerting. Story 6.5 must not weaken that path while adjusting motion timing.
- Field-level and form-level live-region behavior in `ContactForm.tsx` was intentionally tuned in Story 6.4. Do not accidentally suppress announcements by refactoring interactive classes or status rendering.

From Stories 2.4 and 2.5:

- `ExpandableItem` is already the shared expansion primitive. Tune it rather than inventing a second overlay orchestration path.
- The ambient layer z-index contract remains `0 / 1 / 10 / 20 / 30` for ambient / content / backdrop / overlay / close.
- The ambient blur cost was previously accepted as low-risk after runtime checks; Story 6.5 should revalidate that assumption if the effect is strengthened.

### Likely Touch Points

- `src/components/MainPage.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/OverlayContentGroup.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/styles/main.css`
- `src/components/about/AboutContent.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/components/common/ExternalLinkButton.tsx`
- `src/components/common/SkillBadge.tsx`
- `src/components/common/CloseButton.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`

Verification-only unless a blocker is found:

- `src/components/common/Card.tsx`
- `src/components/common/CardPreview.tsx`
- `src/components/common/GoldPulseText.tsx`
- `src/components/common/CardGrid.tsx`
- `src/components/common/CardExpansionOverlay.tsx`

### Likely No-Touch Files

- `src/data/*`
- `src/config/env.ts`
- `Dockerfile`
- `docker-compose.yml`
- `webpack.dev.cjs`
- `public/config.js`

### Testing Requirements

- No automated test framework. Do not add test files.
- Required verification:
  - `npm run build`
  - local app run (`npm run dev` and/or production `npm start`)
  - manual browser pass at `375px`, `768px`, and `1000px`
  - reduced-motion enabled and disabled
  - Lighthouse Performance + Accessibility
  - keyboard/focus/dialog regression pass from Stories 6.3 and 6.4
- Preferred performance workflow:
  - production build first
  - Lighthouse audit to identify misses
  - Chrome DevTools Performance panel to isolate the actual bottleneck before optimizing

### Latest Technical Information

- Motion's current accessibility guidance recommends `MotionConfig reducedMotion="user"` as the blanket site-wide policy. When enabled, transform and layout animations are disabled while opacity/background-color animation can remain. This is the cleanest baseline for Story 6.5. [Source: https://motion.dev/docs/react-accessibility] [Source: https://motion.dev/docs/react-motion-config]
- Motion's `useReducedMotion()` hook is still the right tool for bespoke logic such as replacing transform movement with opacity-only presentation or disabling non-Motion behaviors. This should be treated as current guidance and rechecked against the old deferred note that claimed the hook only read on mount. [Source: https://motion.dev/docs/react-accessibility]
- Tailwind's current transition docs explicitly recommend `motion-safe` and `motion-reduce` variants for reduced-motion handling, including `motion-reduce:transition-none` and disabling hover transforms. [Source: https://tailwindcss.com/docs/transition-property]
- MDN's `scrollIntoView()` docs confirm `behavior: "instant"` and `behavior: "auto"` are valid options. Current repo code hard-codes `smooth`, so Story 6.5 should make that behavior preference-aware. [Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView]
- Current web.dev Core Web Vitals guidance is `FCP <= 1.8s`, `LCP <= 2.5s`, and `CLS <= 0.1`; this project's PRD uses the stricter internal `FCP < 1.5s` target, which remains the binding story bar. [Source: https://web.dev/articles/fcp] [Source: https://web.dev/articles/lcp] [Source: https://web.dev/articles/optimize-cls]

### References

- `_bmad-output/planning-artifacts/epics.md` - Story 6.5 acceptance criteria and scope additions
- `_bmad-output/planning-artifacts/architecture.md` - reduced-motion architecture, performance budgets, animation boundary
- `_bmad-output/planning-artifacts/ux-design-specification.md` - UX-DR24, UX-DR30, reduced-motion expectations
- `_bmad-output/planning-artifacts/prd.md` - NFR performance and accessibility targets
- `_bmad-output/implementation-artifacts/2-4-per-card-expansion-animations-and-spring-physics.md`
- `_bmad-output/implementation-artifacts/2-5-ambient-background-motion.md`
- `_bmad-output/implementation-artifacts/6-4-screen-reader-compatibility-and-semantic-html.md`
- `_bmad-output/implementation-artifacts/deferred-work.md`
- `_bmad-output/project-context.md`
- `webpack.prod.cjs`
- `package.json`
- `src/components/MainPage.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/OverlayContentGroup.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/components/common/ExternalLinkButton.tsx`
- `src/components/common/SkillBadge.tsx`
- `src/components/common/CloseButton.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/styles/main.css`
- `https://motion.dev/docs/react-accessibility`
- `https://motion.dev/docs/react-motion-config`
- `https://tailwindcss.com/docs/transition-property`
- `https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView`
- `https://web.dev/articles/fcp`
- `https://web.dev/articles/lcp`
- `https://web.dev/articles/optimize-cls`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `6-5-reduced-motion-and-performance-validation` as `ready-for-dev`
- Story package includes the current reduced-motion gap inventory, measured build-size baseline, explicit scope boundaries, and latest official guidance for Motion, Tailwind, MDN, and web.dev

## Open Questions / Assumptions

- Assume the reduced-motion interpretation is: no transform/layout movement, no staged delay, and no perceptible motion; if a single-step opacity change is still needed for safe mount/unmount sequencing, keep it effectively instant and document the exact choice in completion notes.
- Assume Story 6.5 can optimize measured bottlenecks inside the existing architecture, but should not pre-emptively do Phase 2 image-pipeline work unless Lighthouse data proves it is required to hit acceptance.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `python3 .agents/skills/bmad-init/scripts/bmad_init.py load --project-root /home/warrick/Dev/WS-Portfolio-New --all`
- `sed -n '1,240p' _bmad-output/project-context.md`
- `cat _bmad/bmm/config.yaml`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '1,260p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '1,260p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '1,260p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '1,260p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/6-4-screen-reader-compatibility-and-semantic-html.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/2-4-per-card-expansion-animations-and-spring-physics.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/2-5-ambient-background-motion.md`
- `sed -n '1,240p' _bmad-output/implementation-artifacts/deferred-work.md`
- `git log --oneline -5`
- `git show --stat --oneline c6e79c3 --`
- `git branch --show-current`
- `git status --short`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `sed -n '1,220p' package.json`
- `sed -n '1,260p' webpack.common.cjs`
- `sed -n '1,260p' webpack.prod.cjs`
- `find src/assets -type f -printf '%s %p\n' | sort -nr | head -20`
- `npm run build`
- `du -sh dist`
- `find dist -maxdepth 1 -type f -printf '%s %f\n' | sort -nr`
- `rg -n "useReducedMotion|prefers-reduced-motion|motion-reduce|motion-safe|will-change|AnimatePresence|lazy\\(|Suspense|memo|defer|performance|requestAnimationFrame|backdrop-blur|aria-hidden" src public`
- `rg -n "transition-\\[|transition-(all|colors|color|opacity|shadow|transform)|duration-\\[|duration-[0-9]" src/components`
- `rg -n "scrollIntoView\\(|behavior:\\s*'smooth'|window.scrollTo\\(|requestAnimationFrame\\(" src/components src/hooks`
- `sed -n '1,260p' src/components/MainPage.tsx`
- `sed -n '240,520p' src/components/MainPage.tsx`
- `sed -n '1,260p' src/components/common/ExpandableItem.tsx`
- `sed -n '1,260p' src/components/common/OverlayContentGroup.tsx`
- `sed -n '1,260p' src/components/common/Card.tsx`
- `sed -n '1,260p' src/components/common/CardExpansionOverlay.tsx`
- `sed -n '1,280p' src/components/common/renderChildDiv.tsx`
- `sed -n '1,260p' src/components/common/AmbientBackground.tsx`
- `sed -n '1,240p' src/components/common/CardGrid.tsx`
- `sed -n '1,260p' src/components/common/GoldPulseText.tsx`
- `sed -n '1,260p' src/components/about/AboutContent.tsx`
- `sed -n '1,260p' src/components/portfolio/PortfolioContent.tsx`
- `sed -n '1,260p' src/components/portfolio/ProjectCard.tsx`
- `sed -n '1,220p' src/components/common/ExternalLinkButton.tsx`
- `sed -n '1,220p' src/components/common/SkillBadge.tsx`
- `sed -n '1,200p' src/components/common/CloseButton.tsx`
- `sed -n '1,260p' src/components/contact/ContactContent.tsx`
- `sed -n '1,260p' src/components/contact/ContactForm.tsx`
- `sed -n '1,520p' src/styles/main.css`
- `https://motion.dev/docs/react-accessibility`
- `https://motion.dev/docs/react-motion-config`
- `https://tailwindcss.com/docs/transition-property`
- `https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView`
- `https://web.dev/articles/fcp`
- `https://web.dev/articles/lcp`
- `https://web.dev/articles/optimize-cls`
- `node /tmp/ws-story65-verify.cjs`
- `npx --yes serve@14.2.5 -s dist -l 3002`
- `npx --yes lighthouse http://127.0.0.1:3002 --quiet --hostname=127.0.0.1 --port=9222 --preset=desktop --only-categories=performance,accessibility --output=json --output-path=/tmp/ws-lh-desktop-serve.json`
- `npx --yes lighthouse http://127.0.0.1:3002 --quiet --hostname=127.0.0.1 --port=9222 --only-categories=performance,accessibility --output=json --output-path=/tmp/ws-lh-mobile-serve.json`

### Implementation Plan

- Establish the reduced-motion baseline in the shared motion shell first, then remove remaining per-surface CSS transition and scroll-animation gaps.
- Retune the non-reduced path only after the reduced path is deterministic, focusing on ambient motion clarity and stronger differentiation between shared card presets.
- Use production builds plus browser audits to drive performance work, trimming only measured initial-route cost without changing the app architecture or adding new tooling to the repo.

### Completion Notes List

- `2026-04-09 13:21:57 NZST` - Prepared Story 6.5 with repo-grounded reduced-motion guardrails, current implementation gap inventory, and explicit boundaries back to Stories 6.3, 6.4, 2.4, and 2.5.
- `2026-04-09 13:21:57 NZST` - Captured the current production baseline: `npm run build` emits a `2.15 MiB` entrypoint (`1.98 MiB` vendor chunk plus `168 KiB` main chunk) and keeps Webpack's `2.5MB` budget intact.
- `2026-04-09 13:21:57 NZST` - Recorded the main Story 6.5 gaps in live code: non-zero reduced-motion Motion transitions, unconditional backdrop/delay choreography, smooth target scrolling under reduced motion, and several interactive surfaces still missing `motion-reduce` transition overrides.
- `2026-04-09 14:02:06 NZST` - Added `MotionConfig reducedMotion="user"` in `MainPage`, collapsed reduced-motion Motion timings to `0`, removed reduced-motion cross-card delay and smooth scrolling, and tightened CSS `motion-reduce` coverage across interactive surfaces. `GoldPulseText` now renders a static gold shadow under reduced motion, and the identity `WordSlider` falls back to a static label.
- `2026-04-09 14:02:06 NZST` - Retuned the non-reduced path by increasing ambient-background perceptibility, lowering blur cost, and rebalancing the shared card expansion presets so `About`, `Portfolio`, `Approach`, and `Contact` read more distinctly while preserving the reduced-motion path.
- `2026-04-09 14:02:06 NZST` - Optimized measured initial-route cost without architectural drift: `FaIcon` now uses an explicit icon map instead of wildcard Font Awesome packs, `webpack.prod.cjs` limits the named vendor chunk to initial dependencies so lazy-only packages stay out of the landing route, `IdentityCard` stops downloading the portrait on mobile, and `VisitorTracker` defers notification work to idle time.
- `2026-04-09 14:02:06 NZST` - Validation passed with `npm run build`, Playwright browser smoke checks, and runtime-aligned Lighthouse audits served via `serve@14.2.5` on port `3002`. Desktop Lighthouse reached `100` Performance / `100` Accessibility with `FCP 382ms`, `LCP 765ms`, and `CLS 0`. Mobile Lighthouse reached `95` Performance / `100` Accessibility with `FCP 1.73s`, `LCP 2.74s`, and `CLS 0`; the remaining strict mobile FCP/LCP miss is traced to the residual initial React/Framer runtime cost after transfer trimming and is documented for review.
- `2026-04-09 14:02:06 NZST` - Local `npm start` was not runnable in the host shell because `serve` was unavailable on the PATH, so validation used `npx --yes serve@14.2.5 -s dist -l 3002` to match the documented production runtime instead of changing repo dependencies.
- `2026-04-09 15:28:49 NZST` - Reviewed the code-review follow-ups. Confirmed from the installed `motion-dom` `12.38.0` source that `duration: 0` is handled as an explicit instant transition, so that finding was dismissed. Removed the dead `faEmail` alias, assigned the remaining mobile FCP/LCP gap to Story 6.7 in `deferred-work.md` to satisfy AC 16 without expanding Story 6.5 scope, and reran `npm run build` plus the Playwright smoke matrix on the served production bundle.
- `2026-04-09 15:37:12 NZST` - Completed the review workflow close-out. With the remaining decision and patch findings resolved or dismissed and no open in-scope review actions left, Story 6.5 status was promoted from `review` to `done` and sprint tracking was synced.

### Change Log

- `2026-04-09` - Created Story 6.5 and moved sprint tracking from `backlog` to `ready-for-dev`.
- `2026-04-09` - Implemented Story 6.5 reduced-motion hardening, reduced-motion-aware cross-card/scroll behavior, static reduced-motion text treatment, and non-reduced ambient/per-card motion tuning.
- `2026-04-09` - Trimmed the landing-route performance footprint through explicit Font Awesome imports, initial-only vendor splitting, mobile portrait gating, and idle visitor tracking, then validated with Playwright plus Lighthouse on the `serve@14.2.5` runtime.
- `2026-04-09` - Dispositioned review follow-ups: dismissed the Framer Motion `duration: 0` concern from installed library source, removed the dead `faEmail` alias, and explicitly deferred the remaining mobile FCP/LCP gap to Story 6.7.
- `2026-04-09` - Completed the review workflow and advanced Story 6.5 tracking from `review` to `done`.

### File List

- `_bmad-output/implementation-artifacts/6-5-reduced-motion-and-performance-validation.md`
- `_bmad-output/implementation-artifacts/deferred-work.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/components/MainPage.tsx`
- `src/components/VisitorTracker.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/common/CloseButton.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/ExternalLinkButton.tsx`
- `src/components/common/FaIcon.tsx`
- `src/components/common/GoldPulseText.tsx`
- `src/components/common/OverlayContentGroup.tsx`
- `src/components/common/SkillBadge.tsx`
- `src/components/common/WordSlider.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/namecard/IdentityCard.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/styles/main.css`
- `webpack.prod.cjs`

### Review Findings

- [x] [Review][Dismissed] Framer Motion `duration: 0` may be treated as falsy — not valid for the installed `motion-dom` / `framer-motion` `12.38.0` runtime. `motion-dom/dist/es/animation/interfaces/motion-value.mjs` preserves `duration: 0`, treats it as an explicit transition via `isTransitionDefined()`, and has a dedicated `options.duration === 0` path that converts the animation to an instant keyframe animation. Runtime verification also passed, so the reduced-motion `duration: 0` implementation remains correct as-is.
- [x] [Review][Decision] AC 13 mobile FCP/LCP miss targets — valid. Decision: explicitly defer the remaining mobile `FCP 1.73s` / `LCP 2.74s` lab gap rather than reopening Story 6.5. The current story already delivered measured transfer-size trims and passed Lighthouse score thresholds; further gains likely require broader initial-route work that would expand scope beyond this no-architecture-change story.
- [x] [Review][Decision] AC 16 deferred-item triage incomplete — valid. Decision: assign the remaining mobile performance gap to Story 6.7, not Story 6.6. This keeps SEO/discoverability work separate from runtime performance cleanup and matches the actual follow-up work area more cleanly.
- [x] [Review][Patch] Dead `faEmail` alias in iconMap [`FaIcon.tsx:24`] — valid and fixed. Removed the unused alias so the icon map only exposes icons that are actually referenced.
- [x] [Review][Defer] `useReducedMotion()` is non-reactive [`ExpandableItem.tsx`, `OverlayContentGroup.tsx`, `WordSlider.tsx`, `AboutContent.tsx`, `PortfolioContent.tsx`] — deferred, pre-existing. Framer Motion's `useReducedMotion()` captures preference at mount time via `useState` and never updates. Users toggling OS reduced-motion setting mid-session must refresh. Library limitation, not introduced by this change. Already tracked from Story 2.4 review.
- [x] [Review][Defer] Card.tsx uses different reduced-motion detection [`Card.tsx:36-40`] — deferred, pre-existing. Uses synchronous `window.matchMedia()` on every render instead of `useReducedMotion()` hook. Creates subtle inconsistency but Card hover phases are cosmetic. Not changed in this diff.
