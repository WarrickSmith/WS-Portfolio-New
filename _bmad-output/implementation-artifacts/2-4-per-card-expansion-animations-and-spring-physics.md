# Story 2.4: Per-Card Expansion Animations and Spring Physics

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want each card to expand with its own unique, crafted animation,
so that each click creates a moment of delight and rewards exploration.

## Acceptance Criteria

1. Story 2.4 applies only to the current interactive cards in this repo: cards `3`, `4`, and `5`. Cards `1` and `2` remain non-interactive, and the existing Story 2.3 hero-adjacent overlay positioning on tablet and desktop remains the target end state for the expansion animation.
2. Each interactive card keeps the shared "expand from grid position" origin, but gains a distinct expansion character:
   - Card `3` (`About Me`) slides upward and reveals content top-down.
   - Card `4` (`My Portfolio`) morphs from center with stronger scale emphasis.
   - Card `5` (`Get In Touch`) unfolds upward from the bottom edge.
3. The expansion and contraction motion uses Framer Motion spring transitions with explicit per-card configs. Do not fall back to the default tween. Card presets must be tuned with spring properties such as `stiffness`, `damping`, and optionally `mass` or `visualDuration` so the motion lands in the required `400-600ms` emphasis window.
4. A shared `ExpandableItem` component is introduced at `src/components/common/ExpandableItem.tsx`. It becomes the common expand-from-position primitive for this repo by owning the Motion `layout` surface, `AnimatePresence` sequencing hooks, and per-card animation preset input. It must be generic enough for later reuse in Epic 4, but Story 2.4 only wires it into the card-grid overlay path.
5. Expanded-card content staggers in on open with the required rhythm: heading at `0ms`, body at `100ms`, links/actions at `200ms`. On close, all content exits together with no stagger.
6. The close flow is sequenced correctly: content exits first, then the card contracts back to its grid cell. The implementation must use `AnimatePresence` plus `onExitComplete` for this sequencing. Do not reintroduce the old `isClosed` plus `useEffect` workaround pattern described in the architecture doc.
7. The expanded overlay surface gains a subtle top-edge highlight that reads like overhead light. This enhancement must layer onto the existing Story 2.3 overlay surface and must not replace the accepted dark-theme palette.
8. `prefers-reduced-motion: reduce` is treated as first-class. Spatial expansion, spring motion, and stagger choreography collapse to an instant or near-instant opacity-only presentation, while the UI remains fully functional and visually complete.
9. Manual browser verification confirms the animations remain smooth at desktop, tablet, and mobile breakpoints, complete within the expected timing band, and do not visibly regress Story 2.2 hover behavior or Story 2.3 overlay behavior.

## Tasks / Subtasks

- [x] Task 1: Extract the shared expand-from-position primitive into `ExpandableItem` without regressing Story 2.2 hover behavior or Story 2.3 overlay behavior (AC: 1, 3, 4, 6, 8)
  - [x] Add `src/components/common/ExpandableItem.tsx` as the shared Motion wrapper that owns the `layout` surface, open/close motion props, and exit-complete callback path.
  - [x] Refactor `src/components/common/Card.tsx` into a thin card-specific wrapper around `ExpandableItem` so the shared card hover layers stay intact while the expand/collapse mechanics move into the reusable primitive.
  - [x] Keep `Card.tsx` responsible for card-surface classes and hover-only layers from Story 2.2. Do not duplicate hover logic inside `ExpandableItem`.
  - [x] Keep the selected-card DOM ref path working from `MainPage.tsx` so the pre-open geometry snapshot from Story 2.3 is preserved.

- [x] Task 2: Introduce per-card animation presets and wire them through the current card registry/orchestration path (AC: 1, 2, 3, 4, 6, 8)
  - [x] Extend `src/components/common/renderChildDiv.tsx` card metadata so each interactive card exposes a stable expansion preset identifier or preset object in addition to title and lazy content.
  - [x] Keep `src/components/MainPage.tsx` as the single source of truth for the selected card ID. If a temporary local close phase is required for exit sequencing, scope it locally to the selected overlay path instead of introducing global state or parallel open-card state.
  - [x] Preserve the Story 2.3 hero-adjacent target bounds, body scroll locking, inert background cards, backdrop timing, and pre-open geometry snapshot logic while adding the new motion presets.
  - [x] Tune each preset so Card `3` feels vertical/revealing, Card `4` feels centered/scaled, and Card `5` feels bottom-hinged. Keep the common design language intact so the cards still read as members of the same system.

- [x] Task 3: Implement content entry/exit choreography inside the existing overlay content path (AC: 2, 5, 6, 8)
  - [x] Add a shared content-motion contract in the overlay path so heading, body, and actions can be revealed in ordered groups without rewriting the lazy-loading architecture from Story 2.3.
  - [x] Update `src/components/about/AboutContent.tsx`, `src/components/portfolio/PortfolioContent.tsx`, and `src/components/contact/ContactContent.tsx` with the smallest possible structural changes needed to expose heading/body/action groups for staggered entry.
  - [x] Ensure close reverses cleanly: content exits together first, then `onExitComplete` notifies the parent path so the card can contract back to the grid.
  - [x] Keep the Suspense fallback local to the overlay content region. Do not move or widen the Suspense boundary.

- [x] Task 4: Add the visual polish and reduced-motion behavior required for Story 2.4 (AC: 3, 7, 8, 9)
  - [x] Extend `src/styles/main.css` and/or `src/components/common/CardExpansionOverlay.tsx` with the top-edge highlight treatment on the expanded surface.
  - [x] Use Motion's `useReducedMotion()` hook for spring/layout animation branching. CSS `motion-reduce:` classes alone are not sufficient for Motion-managed layout transitions.
  - [x] Keep Story 2.2 hover layers from fighting Story 2.4 open-state motion. Do not animate the same property on the same element through both CSS and Framer Motion.
  - [x] Favor transform/opacity-based animation paths and avoid unnecessary paint-heavy effects that would jeopardize the 60fps target.

- [x] Task 5: Manually verify the end-to-end interaction at the real risk points (AC: 1-9)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev` or reuse the existing dev server on `:3000`.
  - [x] Verify at desktop (`>=1000px`), tablet (`768px-999px`), and mobile (`375px-767px`) that each card has a visibly distinct expansion character while still resolving into the correct Story 2.3 overlay bounds.
  - [x] Verify close sequencing: content exits together first, then the card contracts. Confirm close-button click, backdrop click, and `Escape` all follow the same sequence.
  - [x] Verify reduced motion removes spatial spring/stagger behavior and keeps the overlay accessible and visually coherent.
  - [x] Verify Story 2.2 hover effects still read correctly before open and unwind cleanly on click.
  - [x] Verify cards `1` and `2` remain inert and that only one overlay can be open at a time.

## Dev Notes

### Critical Story Guardrails

- Story 2.4 layers on top of Story 2.3. Do not revisit the accepted product decision that tablet and desktop overlays resolve into the shared hero-adjacent region instead of covering the hero image.
- Keep the current repo truth: cards `1` and `2` remain non-interactive. Do not widen this story to make `NameCard` clickable.
- Preserve the valid Story 2.3 review fixes already landed in the repo: pre-open geometry snapshot in `MainPage.tsx`, `inert` background cards, explicit `0.3s` backdrop fade, and the adjusted `Escape` handling.
- The close sequencing requirement is the highest-risk behavior change in this story. Do not clear `selectedId` immediately on close if that would bypass content exit animation. The card should remain mounted long enough for content exit to finish, then contract back to the grid.
- `ExpandableItem` should become the shared pattern for future in-content expansions, but Story 2.4 should not pull Epic 4 project-detail expansion work into scope. Do not convert `BulletPoints.tsx` into a nested expand/collapse interaction in this story.
- Keep the Framer Motion / CSS boundary clean. Framer Motion owns layout expansion, spring motion, and stagger choreography. CSS/Tailwind owns static surface styling, the top-edge highlight treatment, and hover-only effects from Story 2.2.
- Reduced motion is not optional. Use Motion's `useReducedMotion()` hook for the Motion-managed parts, and keep the Story 2.2 CSS reduced-motion behavior intact.
- `AnimatePresence` requires direct children with stable unique keys. Keep the animated tree simple and explicit.
- `AnimatePresence mode="wait"` is a good fit only where a single child is being sequenced. If you use it, keep it scoped to a single-child exit/enter boundary and do not wrap a multi-child list with it.
- Keep `React.lazy()` declarations top-level in `renderChildDiv.tsx`. Do not move lazy declarations into render paths while refactoring for animation presets.
- Do not add Context, Redux, Zustand, portals, test frameworks, or a second modal layer. This remains a local-state, in-grid expansion architecture.

### Repo Facts Discovered During Story Preparation

- `src/components/MainPage.tsx` still owns `selectedId`, computes the open-card bounds from the hero card / first interactive card geometry, and renders the selected card inline inside the existing card grid.
- `src/components/common/Card.tsx` is currently the `motion.div` root that combines Story 2.2 hover layers with Story 2.3 open-state layout classes. This is the right extraction point for the new shared `ExpandableItem` primitive.
- `src/components/common/CardExpansionOverlay.tsx` already owns the dialog shell, close button placement, centered `800px` content column, and the local scroll container.
- `src/components/common/renderChildDiv.tsx` already exposes the shared card registry and top-level lazy imports for `AboutContent`, `PortfolioContent`, and `ContactContent`.
- `src/components/about/AboutContent.tsx`, `src/components/portfolio/PortfolioContent.tsx`, and `src/components/contact/ContactContent.tsx` currently render as largely static markup with no Motion grouping or stagger wrappers.
- `src/styles/main.css` already contains the Story 2.3 overlay gradient surface and Story 2.2 hover-layer styles, so Story 2.4 should extend those tokens and utilities rather than inventing a parallel styling surface.

### Architecture Compliance

- `MainPage.tsx` remains the orchestrator for which card is open. Any close-phase state added for sequencing must stay tightly scoped and must not become a second source of truth for card selection.
- Shared expansion mechanics belong in `src/components/common/ExpandableItem.tsx`. Shared overlay shell concerns stay in `src/components/common/CardExpansionOverlay.tsx`. Feature folders should only supply content structure and minimal motion-group wrappers.
- Preserve the in-grid expand-from-position design language. Do not replace the current layout-driven interaction with a detached portal modal.
- Use semantic HTML and the existing Story 2.3 dialog semantics as the baseline. Story 2.4 should animate the overlay, not rewrite its accessibility contract.
- Manual verification remains the project standard. Do not add automated tests.

### Library / Framework Requirements

- Runtime versions currently pinned in `package.json`: `react@^19.2.4`, `react-dom@^19.2.4`, `framer-motion@^12.38.0`, `tailwindcss@^4.2.2`, `webpack@^5.105.4`, `typescript@^6.0.2`.
- Motion docs confirm `AnimatePresence` tracks removal of its direct children and requires unique keys on those children. Keep the sequenced overlay content boundary explicit and keyed.
- Motion docs define `onExitComplete` as the callback that fires after all exiting nodes finish animating out. Use that callback to trigger the contraction phase instead of timing guesses.
- Motion docs define `mode="wait"` as a sequential enter/exit mode for a single child. If the chosen structure needs strict content-exit-before-collapse sequencing, this mode is appropriate for the single-child animated content boundary.
- Motion docs define `useReducedMotion()` as a hook that returns `true` when the OS reduced-motion setting is enabled and updates reactively when that preference changes.
- Motion transition docs confirm `type: "spring"` and the `stiffness`, `damping`, and `mass` parameters are the primary controls for spring feel. `visualDuration` can help coordinate springs with the Story 2.4 `400-600ms` choreography target when needed.
- React docs confirm `lazy()` components must stay declared at module top level, not inside component bodies, and that a local `Suspense` boundary is the correct way to show a lightweight inline fallback while lazy content loads.
- React Suspense docs note that the nearest boundary controls what swaps to fallback. Keep the boundary local to the overlay content so the rest of the landing page never disappears during lazy load.

### Previous Story / Epic Intelligence

- Story 2.3 established the current overlay shell, blur backdrop, hero-adjacent tablet/desktop positioning, local Suspense fallback, and single-overlay behavior. Story 2.4 must extend that path, not replace it.
- Story 2.3 review fixes matter directly here: the open-card bounds are now snapshotted before body scroll locking, the backdrop fade duration is explicit, non-selected cards are `inert`, and the `Escape` handler no longer blocks nested consumers by default.
- Story 2.2 already uses CSS/Tailwind for hover layers and keeps Motion out of hover behavior. Story 2.4 must preserve that boundary while adding Motion-managed open-state choreography.
- The architecture doc explicitly deferred exact per-card spring configs and unique expansion choreography to this phase. This story is where those details should be finalized.

### Git Intelligence Summary

- Recent implementation commit `3dac110` (`feat: add card expansion overlay system with lazy content loading`) touched the exact files Story 2.4 is most likely to touch again: `MainPage.tsx`, `Card.tsx`, `CardExpansionOverlay.tsx`, `renderChildDiv.tsx`, `DimmedBackdrop.tsx`, `CloseButton.tsx`, and `src/styles/main.css`.
- Recent hover commit `5d0d362` (`feat: add card hover effects with pointer-aware gradients and GoldPulseText animation`) established the current hover mechanics inside `Card.tsx` and `src/styles/main.css`. Treat those files as shared hot spots where regression risk is high.
- Recent documentation commit `9b963d2` recorded Story 2.3 as done after review closure. That means Story 2.4 should treat the reviewed Story 2.3 implementation as the current baseline, not the pre-review version.

### Likely Touch Points

- `src/components/MainPage.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/ExpandableItem.tsx` (new)
- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/styles/main.css`

### Likely No-Touch Files Unless A Blocker Is Found

- `src/components/common/CardGrid.tsx`
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/common/CloseButton.tsx`
- `src/components/namecard/NameCard.tsx`
- `src/components/VisitorTracker.tsx`
- `src/config/env.ts`
- `src/data/*`

### Project Structure Notes

- Shared animation primitives belong in `src/components/common/`.
- Feature folders (`about`, `portfolio`, `contact`) should only gain minimal structure needed for stagger grouping.
- There is no project-structure conflict that requires moving files outside the current `src/components/common/` and feature-folder split.
- `_bmad-output/project-context.md` still contains stale styled-components guidance. For this story, trust the current Tailwind repo, `docs/architecture.md`, and the planning artifacts over that stale rule.

### Latest Technical Information

- React `lazy()` should remain declared at module scope, and the Story 2.3 local overlay `Suspense` boundary should remain narrow so the fallback is isolated to the content area rather than blanking the full landing page. [Source: https://react.dev/reference/react/lazy] [Source: https://react.dev/reference/react/Suspense]
- Motion `AnimatePresence` detects removal of direct children with unique keys and exposes `onExitComplete` when all exiting nodes finish. That is the correct coordination hook for the "content exits first, card contracts second" requirement. [Source: https://motion.dev/docs/react-animate-presence]
- Motion `mode="wait"` is designed for sequential animation where the entering child should wait for the exiting child. Because it only supports one child at a time, scope it narrowly if you use it. [Source: https://motion.dev/docs/react-animate-presence]
- Motion `useReducedMotion()` returns a live boolean tied to the OS setting and is explicitly intended for swapping spatial transforms for opacity-only presentation. Use it for the Story 2.4 reduced-motion path. [Source: https://motion.dev/docs/react-use-reduced-motion]
- Motion spring transitions are controlled primarily through `type: "spring"`, `stiffness`, `damping`, and `mass`. `visualDuration` can help align spring feel with a target timing window without falling back to a generic tween. [Source: https://motion.dev/docs/react-transitions]

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 2 / Story 2.4 acceptance criteria
- `_bmad-output/planning-artifacts/architecture.md` - Animation boundary pattern, reduced motion requirements, ExpandableItem architecture, expand-from-position design language
- `_bmad-output/planning-artifacts/ux-design-specification.md` - Overlay patterns, animation timing, reduced-motion rules
- `_bmad-output/implementation-artifacts/2-2-card-hover-effects-and-goldpulsetext.md` - Shared hover-layer guardrails and current Story 2.2 behavior
- `_bmad-output/implementation-artifacts/2-3-card-expansion-and-overlay-system.md` - Current overlay baseline and Story 2.3 review fixes
- `docs/architecture.md` - Current repo architecture and ownership map
- `docs/component-inventory.md` - Current component responsibilities
- `src/components/MainPage.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/styles/main.css`
- `package.json`
- `https://react.dev/reference/react/lazy`
- `https://react.dev/reference/react/Suspense`
- `https://motion.dev/docs/react-animate-presence`
- `https://motion.dev/docs/react-use-reduced-motion`
- `https://motion.dev/docs/react-transitions`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `2-4-per-card-expansion-animations-and-spring-physics` as `ready-for-dev`
- Story package includes the accepted Story 2.3 hero-adjacent overlay decision, the Story 2.3 review fixes that must not regress, the shared `ExpandableItem` extraction direction, and the latest official Motion/React guidance needed to implement the sequencing correctly

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `git status --short`
- `git log --oneline -n 5`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `sed -n '1,220p' _bmad/bmm/config.yaml`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '430,540p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/2-3-card-expansion-and-overlay-system.md`
- `sed -n '1,240p' _bmad-output/implementation-artifacts/2-2-card-hover-effects-and-goldpulsetext.md`
- `sed -n '140,220p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '300,350p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '640,690p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '1040,1135p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '1,260p' docs/architecture.md`
- `sed -n '1,260p' docs/component-inventory.md`
- `sed -n '1,280p' src/components/MainPage.tsx`
- `sed -n '1,320p' src/components/common/Card.tsx`
- `sed -n '1,260p' src/components/common/CardExpansionOverlay.tsx`
- `sed -n '1,260p' src/components/common/renderChildDiv.tsx`
- `sed -n '1,260p' src/components/about/AboutContent.tsx`
- `sed -n '1,260p' src/components/portfolio/PortfolioContent.tsx`
- `sed -n '1,260p' src/components/contact/ContactContent.tsx`
- `sed -n '1,320p' src/styles/main.css`
- `sed -n '1,240p' src/components/common/ExpandableItem.tsx`
- `sed -n '1,220p' src/components/common/SectionHeading.tsx`
- `sed -n '1,220p' src/components/common/BulletPoints.tsx`
- `sed -n '1,220p' src/components/contact/ContactForm.tsx`
- `sed -n '1,220p' package.json`
- `npm run build`
- `npm run dev`
- `curl -I http://127.0.0.1:3000`
- `ss -ltnp '( sport = :3000 )'`
- `google-chrome --headless=new --disable-gpu --no-sandbox --remote-debugging-port=9222 about:blank`
- `node --input-type=module (Chrome DevTools Protocol verification for desktop/tablet/mobile flows, close sequencing, inert states, and reduced motion)`
- `https://react.dev/reference/react/lazy`
- `https://react.dev/reference/react/Suspense`
- `https://motion.dev/docs/react-animate-presence`
- `https://motion.dev/docs/react-use-reduced-motion`
- `https://motion.dev/docs/react-transitions`

### Implementation Plan

- Extract `ExpandableItem` as the shared layout-spring surface and `AnimatePresence` boundary, while keeping hover-only visuals and card-surface ownership inside `Card.tsx`.
- Keep `MainPage.tsx` as the single selected-card source of truth by using a close-request signal plus `onOverlayExitComplete` so overlay content exits before deselection triggers contraction.
- Drive per-card spring feel from registry metadata and add shared heading/body/action wrappers plus reduced-motion branching without widening the existing local `Suspense` boundary.

### Completion Notes List

- `2026-04-03 15:09:14 NZDT` - Story 2.4 context prepared with repo-grounded extension points, Story 2.3 review-fix guardrails, shared `ExpandableItem` extraction guidance, and official React/Motion references for lazy loading, `AnimatePresence`, reduced motion, and spring sequencing.
- `2026-04-03 15:42:19 NZDT` - Added reusable `ExpandableItem` orchestration, refactored `Card.tsx` into a hover-preserving wrapper, and wired per-card spring presets through the shared card registry so cards `3`, `4`, and `5` expand with distinct motion while preserving Story 2.3 geometry and inert-background behavior.
- `2026-04-03 15:42:19 NZDT` - Added shared `OverlayContentGroup` wrappers, top-edge overlay highlight styling, and `useReducedMotion()` branching, then verified `npm run build`, existing dev-server reuse on `:3000`, and desktop/tablet/mobile interaction flows plus close-path and inert-state behavior through headless Chrome smoke checks and screenshots in `/tmp/story-2-4-verification`.
- `2026-04-03 16:39:12 NZDT` - Reviewed the post-implementation findings and kept the Card 3 overlay direction unchanged because `initial: { y: 28 } -> animate: { y: 0 }` already travels upward into place; accepted the Card 5 exit-motion recommendation and made the close state symmetric to the bottom-edge unfold preset.
- `2026-04-03 16:39:12 NZDT` - Fixed the valid review patches by making About-content actions a sibling motion group, moving Portfolio-content actions below the body group so the visual order matches heading -> body -> actions, and refactoring `ExpandableItem` open-state tracking so the effect dependency contract is explicit without breaking close sequencing. Verified with `npm run build` plus refreshed headless Chrome screenshots in `/tmp/story-2-4-review-fixes`.
- `2026-04-03 16:47:49 NZDT` - Review workflow completed: all 3 decision-needed items resolved, both patch findings actioned, 4 deferred findings intentionally left deferred, and the story status advanced from `review` to `done`.

### File List

- `_bmad-output/implementation-artifacts/2-4-per-card-expansion-animations-and-spring-physics.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/components/MainPage.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/OverlayContentGroup.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/styles/main.css`

## Review Findings

### Decision Needed

- [x] [Review][Decision] Card 3 (About Me) overlay motion direction — kept as implemented. `initial: { y: 28 }` → `animate: { y: 0 }` already moves the overlay upward into place, so the concern about a downward-travel regression was not valid enough to justify changing the preset.
- [x] [Review][Decision] Card 5 (Get In Touch) exit motion contradicts "unfold from bottom" metaphor — accepted. The exit state now returns to the same bottom-edge lean as entry (`{ y: 20, scaleY: 0.96 }`) so the close better reads as folding back toward the bottom edge.
- [x] [Review][Decision] PortfolioContent DOM order — accepted. The GitHub action now renders after the portfolio grid so the visible rhythm matches heading → body → actions instead of animating a top-of-card CTA after lower content.

### Patch

- [x] [Review][Patch] AboutContent nests OverlayContentGroup slot="actions" inside slot="body" — fixed by moving the GitHub CTA into a sibling `slot="actions"` group so it no longer inherits the body group's extra delay.
- [x] [Review][Patch] ExpandableItem first useEffect missing closeRequestKey in dependency array [`src/components/common/ExpandableItem.tsx:84`] — fixed by refactoring the effect to track the false → true expansion transition explicitly via `wasExpandedRef`, allowing `[closeRequestKey, expanded]` without breaking close sequencing.

### Deferred

- [x] [Review][Defer] onExitComplete race on unmount — no timeout fallback — deferred, theoretical concern in SPA with no concurrent mode
- [x] [Review][Defer] useReducedMotion() only reads on mount (Framer Motion limitation) [`src/components/common/ExpandableItem.tsx:80`] — deferred, pre-existing FM limitation
- [x] [Review][Defer] Cards 1/2 run ExpandableItem overlay tracking unnecessarily [`src/components/MainPage.tsx:208`] — deferred, minor overhead, not a bug
- [x] [Review][Defer] CSS mix-blend-mode: screen browser compatibility [`src/styles/main.css:213`] — deferred, works in all modern browsers

## Change Log

- `2026-04-03` - Story created and marked `ready-for-dev` with explicit guidance for per-card animation presets, shared `ExpandableItem` extraction, content-exit sequencing, reduced-motion behavior, and Story 2.3 regression prevention.
- `2026-04-03` - Implemented Story 2.4 with reusable `ExpandableItem` sequencing, per-card spring presets, staggered content groups, overlay highlight polish, reduced-motion branching, and manual browser verification across desktop, tablet, and mobile.
- `2026-04-03` - Addressed valid post-review follow-ups for Story 2.4: About-content stagger timing, Portfolio action ordering, Contact close-motion tuning, and `ExpandableItem` effect clarity, while explicitly keeping the Card 3 upward motion direction as implemented.
- `2026-04-03` - Completed the review workflow for Story 2.4 and marked the story `done` after resolving all decision-needed and patch findings.
