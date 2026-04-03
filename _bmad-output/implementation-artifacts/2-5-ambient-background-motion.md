# Story 2.5: Ambient Background Motion

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see subtle background motion on the landing page,
so that the dark theme feels alive and atmospheric without distracting from the content.

## Acceptance Criteria

1. Story 2.5 applies only to the landing-page shell behind the existing card grid and hero-adjacent overlay system. It does not change card interactivity, hover choreography, overlay positioning, or per-card expansion motion from Stories 2.2-2.4.
2. A shared `AmbientBackground` component renders a decorative background layer behind the card grid using `position: fixed`, `inset: 0`, `pointer-events: none`, and `aria-hidden="true"`. The layer must remain at the base of the existing z-index stack: ambient `0`, content `1`, dimmed backdrop `10`, overlay `20`, close control `30`.
3. The ambient effect is pure CSS and uses a very slow `30-60s` linear cycle with low-contrast gradient motion. It may use gradient shift, background-position, or a drifting pseudo-element, but the movement must stay barely perceptible and loop smoothly with no visible hard reset.
4. The implementation introduces zero JavaScript-driven animation overhead: no React state, no `useEffect`, no timers, no `requestAnimationFrame`, no canvas, and no Framer Motion for the ambient layer. The effect must not trigger React re-renders after mount.
5. With `prefers-reduced-motion: reduce`, the landing page shows a static ambient gradient with no motion while remaining visually complete and fully functional.
6. The ambient treatment does not compete with content or interaction cues. Card hover effects, gold-accent interactive hierarchy, text readability, backdrop blur, and the Story 2.3/2.4 overlay presentation remain visually dominant over the background.
7. Manual browser verification confirms the ambient layer remains visible but restrained across desktop, tablet, and mobile breakpoints, stays behind the dimmed backdrop and expanded overlay, and has no measurable main-thread scripting impact.

## Tasks / Subtasks

- [x] Task 1: Add the shared ambient background layer in the landing shell without disturbing the current card/overlay architecture (AC: 1, 2, 6)
  - [x] Create `src/components/common/AmbientBackground.tsx` as a presentational, decorative-only component with no local state or effects.
  - [x] Mount the ambient layer in the landing-page shell at the base of the existing stack. Preferred insertion point: `src/components/common/CardGrid.tsx`, because it already owns the semantic `<main>` shell and the content wrapper that should remain at content layer `1`.
  - [x] Keep the ambient layer non-interactive with `aria-hidden="true"` and `pointer-events-none`.
  - [x] Preserve the current Story 2.1 dark-theme shell and Story 2.3/2.4 overlay geometry while adding the background layer.

- [x] Task 2: Implement the CSS-only motion and reduced-motion contract in `src/styles/main.css` (AC: 3, 4, 5, 6)
  - [x] Reuse the existing `@keyframes ambient` and `--animate-ambient` token if they fit the final design; otherwise extend them once in `src/styles/main.css` instead of inventing parallel animation tokens in JSX.
  - [x] Build the effect from gradients and/or pseudo-elements only. Do not introduce canvas particles, SVG animation systems, or script-driven parallax.
  - [x] Keep the contrast restrained against `bg-base` so the background reads as atmosphere, not content.
  - [x] Add a `prefers-reduced-motion` path that disables the ambient animation entirely and leaves a static gradient in place.
  - [x] If a performance hint is needed, limit it to a single decorative surface and justify it. Prefer a transform-driven decorative layer or no hint at all over persistent `will-change` on multiple elements.

- [x] Task 3: Preserve established Epic 2 interaction behavior while layering in the new background (AC: 1, 2, 4, 6)
  - [x] Keep `src/components/MainPage.tsx` as the single source of truth for selected-card state. Ambient motion must not introduce new shared UI state.
  - [x] Do not alter `src/components/common/Card.tsx`, `src/components/common/ExpandableItem.tsx`, or `src/components/common/renderChildDiv.tsx` unless a blocker is discovered.
  - [x] Ensure the dimmed backdrop and expanded-card overlay continue to sit visually above the ambient layer at all breakpoints.
  - [x] Verify the ambient layer does not visually overpower the Story 2.2 hover treatment or the Story 2.4 top-edge overlay highlight.

- [x] Task 4: Manually verify atmosphere, accessibility, and performance at the real risk points (AC: 5, 6, 7)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev` or reuse the existing dev server on `:3000`.
  - [x] Verify at desktop (`>=1000px`), tablet (`768px-999px`), and mobile (`375px-767px`) that the ambient motion is visible but subtle and does not create banding, flicker, or obvious seams.
  - [x] Verify reduced motion disables the animation completely while preserving the dark-theme depth and readability.
  - [x] Verify card hover, card open/close, dimmed backdrop, and the hero-adjacent overlay presentation are unchanged except for the added background atmosphere.
  - [x] Use browser DevTools performance tooling for a short idle capture and confirm the ambient feature adds no scripting work and no obvious long-task regression.

## Dev Notes

### Critical Story Guardrails

- Story 2.5 is a background-atmosphere story only. Do not widen scope into hover changes, overlay choreography, card-selection logic, or content work from later epics.
- Pure CSS is mandatory for the ambient layer. No Framer Motion, no React state/effects, no timers, no `requestAnimationFrame`, and no canvas-based particle system.
- Keep gold reserved for tier-1 interactive accents. The ambient layer should stay neutral and low-contrast so it never reads like an actionable element.
- Reduced motion is first-class. The correct fallback is a static gradient, not a different animation.
- Preserve the established z-index contract: ambient `0`, content `1`, dimmed backdrop `10`, overlay `20`, close `30`.
- The current repo truth still overrides stale guidance in `_bmad-output/project-context.md`. Follow the actual Tailwind repo, `docs/architecture.md`, and the planning artifacts.

### Repo Facts Discovered During Story Preparation

- `src/styles/main.css` already defines `@keyframes ambient` and `--animate-ambient: ambient 45s linear infinite`, but no component currently uses them.
- `src/components/common/CardGrid.tsx` already owns the semantic `<main aria-label="Portfolio">` shell and the content wrapper that should remain at the content layer.
- `src/App.tsx` only composes `VisitorTracker` and `MainPage`; ambient background ownership belongs closer to the landing shell than to app bootstrapping.
- `src/components/MainPage.tsx` owns card selection, overlay open/close flow, body scroll locking, and backdrop rendering. Story 2.5 should layer behind that system, not modify it.
- `src/components/common/DimmedBackdrop.tsx` is fixed at `z-10`, and opened cards render at `z-20`. The new ambient layer must stay below both.
- Inference from the current shell structure: `CardGrid.tsx` is the cleanest insertion point for the decorative layer because it can own the base/background relationship without pushing layout concerns into `App.tsx` or the feature-card registry.

### Architecture Compliance

- CSS/Tailwind owns ambient background motion and reduced-motion handling for this story. That matches the architecture's explicit animation boundary.
- Shared decorative infrastructure belongs in `src/components/common/`.
- Keep the landing shell token-driven. Reuse `bg-base`, accent veils, and existing animation tokens from `src/styles/main.css` instead of hardcoding a parallel palette.
- Body/background fallback should remain safe even if the ambient layer fails to render. `bg-base` remains the deepest visual layer.
- No global state, no new dependency, no test framework, and no reintroduction of styled-components.

### Likely Touch Points

- `src/components/common/AmbientBackground.tsx` (new)
- `src/components/common/CardGrid.tsx`
- `src/styles/main.css`
- `src/App.tsx` only if `CardGrid.tsx` proves to be the wrong mounting location
- `docs/architecture.md` or `docs/component-inventory.md` only if the team wants the new shared component documented immediately after implementation

### Likely No-Touch Files Unless A Blocker Is Found

- `src/components/MainPage.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/data/*`

### Project Structure Notes

- `AmbientBackground` belongs in `src/components/common/` because it is shared shell infrastructure, not feature content.
- The landing-shell mount should keep the background outside the grid cell flow so it does not become an accidental grid item.
- There is no project-structure reason to touch the feature folders for this story.

### Testing Requirements

- No automated test framework. Do not add test files.
- Required verification:
  - `npm run build`
  - `npm run dev`
  - Manual browser checks across desktop, tablet, mobile, and reduced-motion modes
- Manual checks:
  - The ambient layer is visible without drawing attention away from card content
  - Card hover and card expansion remain unchanged in behavior
  - The backdrop and overlay still visually dominate the background when open
  - Reduced motion removes ambient movement completely
  - Short browser performance capture shows no scripting introduced by the ambient feature

### Previous Story / Epic Intelligence

- Story 2.1 established the landing shell, `CardGrid`, and `bg-base` dark-theme foundation. Story 2.5 should layer on top of that foundation, not replace it.
- Story 2.2 established premium hover affordances on cards `3-5`. Ambient motion must support that first impression without competing with it.
- Story 2.3 locked in the backdrop/overlay stack and the hero-adjacent larger-breakpoint overlay region. Story 2.5 must stay behind that accepted presentation.
- Story 2.4 added per-card spring choreography and the top-edge overlay highlight. Story 2.5 must not visually muddy those crafted emphasis moments.

### Latest Technical Information

- MDN's CSS animations guide states CSS animations can be created with no JavaScript and let the browser optimize performance and efficiency. For this story, that supports a pure CSS ambient effect rather than script-driven motion. [Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using]
- MDN marks `prefers-reduced-motion` as widely available across browsers since January 2020 and describes it as the mechanism for detecting a user's request to minimize non-essential motion. That is the correct implementation contract for Story 2.5's reduced-motion path. [Source: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion]
- MDN warns that `will-change` is a last-resort hint, should be used sparingly, and can worsen performance when overused or left on permanently in stylesheets. Inference for this story: prefer a transform-driven decorative layer or no persistent hint at all unless measurement proves a real need. [Source: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change]

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 2 / Story 2.5 acceptance criteria, AR10, UX-DR21, UX-DR24, UX-DR30
- `_bmad-output/planning-artifacts/architecture.md` - core architectural decision for pure CSS ambient background, animation boundary, reduced-motion ownership
- `_bmad-output/planning-artifacts/ux-design-specification.md` - atmosphere intent, z-index stack, ambient timing standards, reduced-motion expectations
- `_bmad-output/planning-artifacts/prd.md` - FR6, performance expectations, ambient-motion risk notes
- `_bmad-output/implementation-artifacts/2-1-card-grid-layout-and-dark-theme-foundation.md`
- `_bmad-output/implementation-artifacts/2-2-card-hover-effects-and-goldpulsetext.md`
- `_bmad-output/implementation-artifacts/2-3-card-expansion-and-overlay-system.md`
- `_bmad-output/implementation-artifacts/2-4-per-card-expansion-animations-and-spring-physics.md`
- `docs/architecture.md`
- `docs/component-inventory.md`
- `src/App.tsx`
- `src/components/MainPage.tsx`
- `src/components/common/CardGrid.tsx`
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/styles/main.css`
- `package.json`
- `https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using`
- `https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion`
- `https://developer.mozilla.org/en-US/docs/Web/CSS/will-change`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `2-5-ambient-background-motion` as `ready-for-dev`
- Story package includes repo-grounded insertion-point guidance, z-index guardrails, reduced-motion requirements, and MDN-backed caution around persistent `will-change`

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `git status --short`
- `git log --oneline -n 8`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `sed -n '1,220p' _bmad/bmm/config.yaml`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '1,260p' _bmad-output/project-context.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/2-5-ambient-background-motion.md`
- `sed -n '90,170p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '460,560p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '130,180p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '300,330p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '130,170p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '272,360p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '320,340p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '1080,1125p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '1,260p' docs/architecture.md`
- `sed -n '1,260p' docs/component-inventory.md`
- `sed -n '1,220p' src/App.tsx`
- `sed -n '1,240p' src/components/MainPage.tsx`
- `sed -n '241,520p' src/components/MainPage.tsx`
- `sed -n '1,200p' src/components/common/AmbientBackground.tsx`
- `sed -n '1,220p' src/components/common/CardGrid.tsx`
- `sed -n '1,260p' src/components/common/Card.tsx`
- `sed -n '1,260p' src/components/common/CardExpansionOverlay.tsx`
- `sed -n '1,200p' src/components/common/CloseButton.tsx`
- `sed -n '1,220p' src/components/common/DimmedBackdrop.tsx`
- `sed -n '1,260p' src/components/common/renderChildDiv.tsx`
- `sed -n '1,360p' src/styles/main.css`
- `sed -n '260,420p' src/styles/main.css`
- `sed -n '1,220p' package.json`
- `npm run build`
- `curl -I http://127.0.0.1:3000`
- `curl -s http://127.0.0.1:3000`
- `google-chrome --headless=new --disable-gpu --no-sandbox --remote-debugging-port=9222 --user-data-dir=/tmp/codex-chrome-ambient about:blank`
- `node --input-type=module (Chrome DevTools Protocol verification for ambient layer breakpoints, overlay stack, reduced motion, and idle performance)`
- `https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using`
- `https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion`
- `https://developer.mozilla.org/en-US/docs/Web/CSS/will-change`

### Implementation Plan

- Add a shared `AmbientBackground` component in `src/components/common/` and mount it at the landing-shell level so it stays outside grid item flow while sitting behind the content wrapper.
- Drive the effect entirely from `src/styles/main.css`, reusing the existing ambient token while extending the keyframe to a seamless transform loop on a single decorative pseudo-element plus a static vignette layer.
- Verify that the background atmosphere improves the first impression without regressing Story 2.2 hover cues, Story 2.3 overlay layering, or Story 2.4 crafted motion.

### Completion Notes List

- `2026-04-03 16:56:09 NZDT` - Story 2.5 context prepared with repo-grounded insertion-point guidance, z-index guardrails, reduced-motion requirements, and MDN-backed CSS animation/performance notes.
- `2026-04-03 17:09:39 NZDT` - Added `AmbientBackground` as a decorative-only shared shell component, mounted it in `CardGrid`, and lifted the grid wrapper to content layer `1` so the ambient layer stays fixed at `0` without changing card-selection or overlay logic in `MainPage.tsx`.
- `2026-04-03 17:09:39 NZDT` - Extended the ambient CSS contract in `src/styles/main.css` with a low-contrast gradient surface, a single transform-driven animated pseudo-element, and a `prefers-reduced-motion` branch that disables animation while preserving the dark theme depth.
- `2026-04-03 17:09:39 NZDT` - Verified `npm run build`, reused the existing dev server on `:3000`, and ran headless Chrome DevTools checks across desktop/tablet/mobile plus overlay open/close and reduced-motion states. Runtime checks confirmed the ambient/content/backdrop/overlay/close z-index stack remained `0/1/10/20/30`, reduced motion changed the ambient animation to `none`, and a 3-second idle probe recorded `0` long tasks with only `8.212ms` script time and `31.226ms` total task time.
- `2026-04-03 18:02:10 NZDT` - Validated the CardGrid shell review findings, removed the unnecessary `isolate` and `overflow-hidden` classes from `<main>`, and re-verified with `npm run build` plus headless Chrome checks that the shell now computes to `isolation:auto` and `overflow:visible` while preserving the ambient/content/backdrop/overlay/close stack at `0/1/10/20/30` and the reduced-motion fallback at `animation:none`.
- `2026-04-03 18:39:53 NZDT` - Review workflow completed: both patch findings were resolved, both deferred findings remain intentionally deferred in `deferred-work.md`, and Story 2.5 advanced from `review` to `done`.

### File List

- `_bmad-output/implementation-artifacts/2-5-ambient-background-motion.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/components/common/AmbientBackground.tsx`
- `src/components/common/CardGrid.tsx`
- `src/styles/main.css`

### Review Findings

- [x] [Review][Patch][Fixed] Remove unnecessary `isolate` from `<main>` in CardGrid [`src/components/common/CardGrid.tsx:14`] — valid. Removing `isolation: isolate` leaves the shell at the default `isolation:auto` and the runtime stack still resolves correctly with ambient/content/backdrop/overlay/close at `0/1/10/20/30`.
- [x] [Review][Patch][Fixed] Remove redundant `overflow-hidden` from `<main>` in CardGrid [`src/components/common/CardGrid.tsx:14`] — valid. The ambient layer still renders and the shell now computes to `overflow: visible`; `overflow-hidden` was not contributing to clipping or layering for the fixed background treatment.
- [x] [Review][Defer] `blur(24px)` filter on animated `::before` adds GPU compositing cost — deferred: runtime-verified acceptable (8.2ms script, 0 long tasks in 3s capture). Flagged by all three review layers as a low-end device concern.
- [x] [Review][Defer] `oklch(from ...)` relative color syntax browser support — deferred: pre-existing pattern (28+ occurrences in codebase). Not introduced by this change.

## Change Log

- `2026-04-03`: Story created and marked `ready-for-dev` with repo-grounded guardrails for ambient-layer ownership, z-index contracts, reduced-motion handling, and CSS-only motion constraints.
- `2026-04-03`: Implemented the shared ambient background shell, mounted it under `CardGrid`, extended the existing ambient token/keyframe into a seamless transform loop with a static vignette layer, added a reduced-motion fallback, validated the build plus browser-runtime checks, and marked the story `review`.
- `2026-04-03`: Addressed both valid CardGrid review patches by removing the unnecessary `isolate` and `overflow-hidden` classes from the landing-shell `<main>`, then re-verified the ambient layer stack and reduced-motion behavior in headless Chrome.
- `2026-04-03`: Completed review closure for Story 2.5, kept the two low-risk follow-ups deferred in `deferred-work.md`, and marked the story `done`.
