# Story 2.3: Card Expansion and Overlay System

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to click a card and have it expand into a full-screen overlay with my content,
so that I can explore detailed content while the grid stays accessible behind a dimmed backdrop.

## Acceptance Criteria

1. Story 2.3 applies only to the current interactive cards in this repo: cards `3`, `4`, and `5`. Cards `1` and `2` remain non-interactive, and clicking one interactive card promotes that selected card into the shared overlay shell without spawning a disconnected second modal surface. On mobile the overlay can fill the viewport; on tablet and desktop it occupies the shared hero-adjacent region so the hero image remains visible.
2. The opened card renders a `CardExpansionOverlay` shell with `bg-expanded` as the base surface, a subtle diagonal gradient, and a centered scrollable content column capped at `800px`. Internal padding is `64px` on desktop (`>=1000px`), `48px` on tablet (`768px-999px`), and `24px` on mobile (`<768px`).
3. A `DimmedBackdrop` fades to opacity `0.3` over about `300ms`, applies `backdrop-filter: blur(...)`, and preserves the required layer stack: base `0`, content `1`, dimmed `10`, overlay `20`, close `30`.
4. While an overlay is open, body scroll is locked with `overflow: hidden`, overlay content scrolls independently, the page returns to the same grid scroll position on close, and non-selected cards cannot be reopened or interacted with behind the overlay.
5. Three close triggers always work for the open overlay: `CloseButton` click, backdrop click, and `Escape`. `CloseButton` remains anchored at the overlay shell's `top/right 24px`, keeps its existing stop-propagation behavior, retains the default/hover/focus token states from the UX spec, and meets the mobile 44x44px minimum touch target requirement even if the visual icon stays compact.
6. The overlay container exposes modal semantics derived from the selected card metadata: `role="dialog"`, `aria-modal="true"`, and an accessible label from the selected card title. Background content must be effectively inert or otherwise truly non-interactive while open, but the selected card and overlay itself must not be placed inside an inert subtree.
7. Expanded content for cards `3-5` is code-split with top-level `React.lazy()` imports and rendered inside a local `<Suspense>` boundary with a lightweight inline fallback. Do not add a `SkeletonGrid`, full-page loader, or root-level fallback that replaces the entire landing page.
8. Closing the overlay preserves the existing grid state: no `CardGrid` remount, no lost hover/open preview state, and no scroll reset. The overlay system remains implementation-ready even if later Epic 3-5 content is incomplete by allowing a temporary placeholder path inside the lazy boundary during development.

## Tasks / Subtasks

- [x] Task 1: Extract a dedicated overlay shell without breaking the current expand-from-position baseline (AC: 1, 2, 3, 5, 6, 8)
  - [x] Add `src/components/common/CardExpansionOverlay.tsx` to own the dialog shell, width constraint, internal padding, scroll container, and close-control placement.
  - [x] Keep `src/components/common/Card.tsx` as the Framer Motion `layout` wrapper that expands from the grid cell. Do not replace this with a portal-only modal or a native `<dialog>` rewrite in this story.
  - [x] Refactor `src/components/MainPage.tsx` so the selected card renders the overlay shell instead of the current raw `CloseButton + renderChildDiv(...)` fragment.
  - [x] Preserve the current `selectedId` single-source-of-truth pattern in `MainPage.tsx`; do not introduce global state, context, or parallel open-card state.

- [x] Task 2: Convert expanded content loading to a lazy registry that shares card metadata (AC: 1, 2, 6, 7, 8)
  - [x] Extend the existing `cards` registry in `src/components/common/renderChildDiv.tsx` (or a tightly scoped replacement) so each interactive card exposes at least `id`, preview component, and title metadata.
  - [x] Replace eager expanded-content imports with top-level `React.lazy(() => import(...))` declarations for `AboutContent`, `PortfolioContent`, and `ContactContent`.
  - [x] Wrap only the expanded content region in `<Suspense>` with a lightweight inline fallback such as a small loading panel or fade-in placeholder inside the overlay surface.
  - [x] Keep feature content components in their existing folders and default-export shape. Do not rewrite About, Portfolio, or Contact content in Story 2.3 unless a blocker is found.

- [x] Task 3: Complete modal behavior, close orchestration, and scroll locking (AC: 3, 4, 5, 6, 8)
  - [x] Keep the existing body scroll-lock behavior in `MainPage.tsx`, but make sure it survives the overlay refactor and restores prior `overflow`, `overflowX`, and `overflowY` values cleanly on close.
  - [x] Add `Escape` close handling with proper effect setup/cleanup tied to the open state.
  - [x] Ensure backdrop click closes the overlay and does not conflict with the selected card's click path.
  - [x] Preserve or introduce a clean way to identify the invoking card element so Story 6.2 can add deterministic focus return without restructuring the overlay again.
  - [x] If `aria-modal="true"` is present, make non-selected cards and non-modal UI genuinely non-interactive while the overlay is open. Because the open card stays in the grid tree, do not inert the entire `main` or grid wrapper if that would also disable the selected overlay card.
  - [x] Keep the close control as a descendant of the dialog container in the DOM, and keep it above scrollable overlay content with the required z-index.

- [x] Task 4: Align shared styling with the Story 2.3 overlay contract (AC: 2, 3, 5)
  - [x] Update `src/components/common/DimmedBackdrop.tsx` and `src/styles/main.css` so the backdrop uses blur plus the required 300ms opacity transition instead of a plain black fade only.
  - [x] Update the opened-state layout in `src/components/common/Card.tsx` so desktop/tablet/mobile spacing matches the Story 2.3 overlay padding contract while keeping the current `tablet:` and `desktop:` project breakpoints.
  - [x] Add the subtle diagonal gradient to the overlay surface using existing theme tokens or adjacent CSS variables. Do not hardcode a parallel color palette.
  - [x] Keep Story 2.2 hover layers and wrapper transforms compatible with the open state so the visual unwind remains smooth when a card is clicked.

- [x] Task 5: Manually verify the overlay system end to end (AC: 1-8)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev` or reuse the already-running dev server on `:3000`.
  - [x] Verify at desktop (`>=1000px`), tablet (`768px-999px`), and mobile (`375px-767px`) that cards `3-5` open, cards `1-2` remain inert, the overlay column stays centered at max `800px`, and the correct padding applies per breakpoint.
  - [x] Verify all three close paths: close button, backdrop click, and `Escape`.
  - [x] Verify backdrop opacity/blur, body scroll lock and restore, and that the same grid position remains visible after closing.
  - [x] Verify the overlay exposes its dialog label from the selected card title and that the non-selected grid is not interactive while the modal is open.
  - [x] Throttle the network or simulate slower code loading so the inline Suspense fallback is visible long enough to confirm it stays local to the overlay instead of replacing the whole page.

## Dev Notes

### Critical Story Guardrails

- Current repo truth wins over planning-doc drift: cards `1` and `2` remain non-interactive, and only cards `3-5` can open overlays in this story.
- Story 2.3 owns the overlay shell, backdrop, close triggers, modal semantics, and lazy-loaded expanded content boundary. It does not own Story 2.4's per-card spring variants, content stagger choreography, `ExpandableItem`, or the broader Epic 6 keyboard/accessibility sweep.
- Preserve the current in-grid transform approach by keeping the opened card inside the current Framer Motion layout tree. Do not replace it with a disconnected modal mounted elsewhere unless you prove the layout animation cannot survive otherwise; on tablet and desktop, that in-grid transform should resolve into the shared hero-adjacent overlay region.
- Declare `React.lazy()` components at module top level only. Do not create them inside a render path or event handler.
- The Suspense fallback must stay lightweight and local to the overlay content region. No skeleton grid, no full-page spinner, and no fallback wrapped around the whole landing page.
- If you mark the overlay `aria-modal="true"`, it must behave modally for real users as well as assistive technology. That means background content cannot remain keyboard- or pointer-interactive.
- Because the selected card transforms into the overlay while staying in the card grid tree, be precise with any `inert`, `aria-hidden`, or pointer-blocking strategy. Do not accidentally inert or hide the selected card itself.
- Use the repo's existing `tablet:` and `desktop:` responsive prefixes. Do not assume default Tailwind `md:` and `lg:` aliases are the project-standard surface.
- `_bmad-output/project-context.md` still contains stale styled-components guidance. For this story, trust the current Tailwind repo, `docs/architecture.md`, and the planning artifacts over that outdated rule.

### Repo Facts Discovered During Story Preparation

- `src/components/MainPage.tsx` already owns `selectedId`, blocks cards `1` and `2`, renders the open-state fragment inline, and locks body scroll by mutating `document.body.style.overflow`.
- `src/components/common/Card.tsx` already switches to a fixed open-state layout with `z-20` and `overflow-y-auto`, but the current open layout is not yet the Story 2.3 centered `800px` overlay shell.
- `src/components/common/renderChildDiv.tsx` currently eager-imports `AboutContent`, `PortfolioContent`, and `ContactContent`, so there is no code-splitting or Suspense boundary yet.
- `src/components/common/DimmedBackdrop.tsx` is currently just a fixed black Motion layer with no blur treatment.
- `src/components/common/CloseButton.tsx` already has the right fixed positioning and stop-propagation pattern, but its current `h-8 w-8` footprint is below the UX minimum touch target for mobile.
- The expanded content components already exist and default-export from `src/components/about/AboutContent.tsx`, `src/components/portfolio/PortfolioContent.tsx`, and `src/components/contact/ContactContent.tsx`, so Story 2.3 can lazy-load real content immediately.

### Architecture Compliance

- `MainPage.tsx` remains the single source of truth for which card is open. No new global store, no context, no duplicate selection state.
- Framer Motion owns open/close layout animation and `AnimatePresence`-driven conditional rendering. CSS and Tailwind own static overlay styling, backdrop blur, border states, spacing, and any hover/focus surfaces.
- Shared overlay/backdrop/close logic belongs in `src/components/common/`. Feature folders should continue to provide only card-specific content.
- Use semantic HTML and ARIA as an implementation contract, not decorative metadata. If you expose dialog semantics, make sure the surrounding behavior matches them.
- Manual verification is the project standard. Do not add Jest, Vitest, Storybook, or snapshot tests.

### Likely Touch Points

- `src/components/MainPage.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/CardExpansionOverlay.tsx` (new)
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/common/CloseButton.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/styles/main.css`

### Likely No-Touch Files Unless A Blocker Is Found

- `src/components/about/AboutCard.tsx`
- `src/components/portfolio/PortfolioCard.tsx`
- `src/components/contact/ContactCard.tsx`
- `src/components/namecard/NameCard.tsx`
- `src/components/VisitorTracker.tsx`
- `src/services/*`
- `src/data/*`

### Previous Story Intelligence

- Story 2.2 deliberately kept hover behavior in shared primitives (`Card`, `CardPreview`, `GoldPulseText`, `main.css`) and out of feature folders. Story 2.3 must preserve that shared approach.
- The Story 2.2 review fixed the hover unwind so hover layers fade out when `opened` flips true. Do not regress that by conditionally unmounting the hover layers too early.
- Story 2.2 also reaffirmed the current repo scope: cards `1` and `2` are not interactive even though some planning text says "Cards 2-5".
- `Card.tsx` currently keeps hover transforms on an inner wrapper instead of the Motion root to avoid transform conflicts with layout animation. Maintain that boundary.
- `CloseButton` already received a Tailwind v4 utility correction (`rounded-sm`) in the recent fix commit. Build on that component instead of replacing it.

### Git Intelligence Summary

- Recent commits confirm the working pattern for this repo: implementation lands first, then the story artifact is updated with verification and review notes.
- `5d0d362 feat: add card hover effects with pointer-aware gradients and GoldPulseText animation` established the current shared-card hover contract that Story 2.3 must preserve.
- `0c155a2 docs: mark story 2.2 done and record review findings` and `d2fff79 docs: mark story 2.1 done and record review findings` show the implementation-artifact file naming and close-out conventions this story should continue.
- `d905bba fix: use valid Tailwind v4 rounded utility in CloseButton` is a reminder to use valid Tailwind v4 utility names instead of legacy `rounded-radius-*` patterns in touched files.

### Latest Technical Notes

- React 19.2 documents `lazy` as the correct way to defer loading component code until first render, but it must be declared outside component bodies and rendered inside a Suspense boundary. That matches Story 2.3's need to lazy-load expanded content without destabilizing state. [Source: https://react.dev/reference/react/lazy]
- React Suspense replaces the nearest wrapped subtree with its fallback while content is loading, and React does not preserve state for trees that suspend before first mount. Keep the fallback local to the overlay content region so the whole landing page does not flash to a loader. [Source: https://react.dev/reference/react/Suspense]
- MDN is explicit that `aria-modal="true"` does not create modal behavior by itself; developers must manage focus and disable the background in script. It also recommends making background content inert and keeping the close button inside the dialog subtree. [Source: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-modal]
- WAI-ARIA APG's modal dialog pattern requires a visible close button inside the dialog, the dialog container owning the dialog role and modal flag, and focus returning to the invoking element when the dialog closes. Story 2.3 should at least preserve the DOM hooks and metadata needed for that later focus-management pass. [Source: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/]
- MDN documents `backdrop-filter` as a standard CSS property for applying `blur()` and related filters to the content behind an element. Keep the blur on the dimmed backdrop layer rather than baking it into the overlay card surface. [Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter]
- MDN documents the HTML `inert` attribute as a widely available way to remove an element subtree from click/focus interaction and the accessibility tree. If used here, apply it only to non-selected background regions, not to the selected card that becomes the overlay. [Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert]

### Project Context Reference

- TypeScript strict mode, modern ES2022 syntax, and default-export component convention still apply.
- Manual verification is required for every change. This project intentionally has no automated test framework.
- No global state, no CSS modules, no styled-components reintroduction, no barrel files, and no Error Boundary expansion for this story.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 2 / Story 2.3 acceptance criteria
- `_bmad-output/planning-artifacts/architecture.md` - Loading strategy, animation boundary, accessibility pattern, card expansion architecture
- `_bmad-output/planning-artifacts/ux-design-specification.md` - CardExpansionOverlay, DimmedBackdrop, CloseButton, overlay patterns, z-index stack, responsive spacing
- `_bmad-output/planning-artifacts/prd.md` - FR2, FR3, accessibility requirements
- `docs/architecture.md` - current repo architecture and overlay ownership
- `docs/component-inventory.md` - current common/component ownership map
- `src/components/MainPage.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/common/CloseButton.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/styles/main.css`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `2-3-card-expansion-and-overlay-system` as `ready-for-dev`
- Story package includes the lazy-loading architecture override from AR9, the current repo-specific interactive-card scope, and the modal-behavior guardrails needed to avoid false `aria-modal` semantics

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `git status --short`
- `git log --oneline -5`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `sed -n '1,260p' _bmad-output/project-context.md`
- `sed -n '391,482p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '780,1110p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '1138,1238p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '140,190p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '300,360p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '632,682p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '260,320p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '368,390p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '1,320p' _bmad-output/implementation-artifacts/2-2-card-hover-effects-and-goldpulsetext.md`
- `sed -n '1,280p' src/components/MainPage.tsx`
- `sed -n '1,280p' src/components/common/Card.tsx`
- `sed -n '1,260p' src/components/common/renderChildDiv.tsx`
- `sed -n '1,220p' src/components/common/DimmedBackdrop.tsx`
- `sed -n '1,220p' src/components/common/CloseButton.tsx`
- `sed -n '1,220p' src/components/common/CardExpansionOverlay.tsx`
- `sed -n '1,240p' src/components/common/CardGrid.tsx`
- `sed -n '1,260p' src/components/about/AboutContent.tsx`
- `sed -n '1,260p' src/components/portfolio/PortfolioContent.tsx`
- `sed -n '1,260p' src/components/contact/ContactContent.tsx`
- `sed -n '1,260p' src/styles/main.css`
- `sed -n '1,220p' package.json`
- `git diff -- src/components/MainPage.tsx src/components/common/Card.tsx src/components/common/CardExpansionOverlay.tsx src/components/common/renderChildDiv.tsx src/components/common/DimmedBackdrop.tsx src/components/common/CloseButton.tsx src/styles/main.css`
- `npm run build`
- `lsof -iTCP:3000 -sTCP:LISTEN -n -P`
- `google-chrome --headless=new --disable-gpu --disable-extensions --remote-debugging-port=9222 --user-data-dir=/tmp/ws-story23-chrome about:blank`
- `node --input-type=module` CDP verification scripts against `http://127.0.0.1:3000` for slow-network Suspense fallback, desktop/tablet/mobile overlay semantics, close paths, background inertness, blur layer, independent overlay scrolling, and mobile scroll restoration

### Implementation Plan

- Introduce a shared `CardExpansionOverlay` shell that keeps the existing Framer Motion expand-from-grid behavior intact while moving dialog semantics, close control, and content layout into a reusable common component.
- Convert expanded-content resolution to a title-aware lazy registry with a tight Suspense boundary so cards `3-5` open real content without eager-loading all overlay components up front.
- Finish the overlay contract with blur backdrop, mobile-safe close affordance sizing, `Escape` handling, and modal guardrails that keep the non-selected grid inert without disabling the selected overlay card.

### Completion Notes List

- `2026-04-03 12:13:26 NZDT` - Story 2.3 context prepared with repo-grounded overlay scope, lazy-loading guardrails, responsive spacing requirements, and official React/MDN/WAI references for Suspense and modal semantics.
- `2026-04-03 12:20:11 NZDT` - Development started for Story 2.3. Implementation is focused on the shared overlay shell, lazy expanded-content registry, modal close orchestration, and overlay/backdrop styling while preserving the existing expand-from-grid motion path.
- `2026-04-03 12:38:11 NZDT` - Added `CardExpansionOverlay`, refactored `MainPage.tsx` to render the selected card through the shared dialog shell, widened `renderChildDiv.tsx` into a metadata-aware lazy registry, and kept `Card.tsx` as the Framer Motion `layout` surface so cards `3-5` still transform in-place into the overlay flow without a disconnected modal mount.
- `2026-04-03 12:38:11 NZDT` - Completed the modal behavior contract with `Escape` and backdrop close handling, non-selected card inertness via `aria-hidden` plus `pointer-events-none`, a 44x44 fixed close target, and body scroll locking that now restores the pre-open mobile scroll position on close.
- `2026-04-03 12:38:11 NZDT` - Validation passed with `npm run build`, reuse of the existing webpack dev server on `:3000`, slow-network verification that the local Suspense fallback stays inside the overlay, desktop/tablet/mobile checks for the `64px` / `48px` / `24px` padding contract, and runtime confirmation of close-button, backdrop, and `Escape` close paths.
- `2026-04-03 12:38:11 NZDT` - No automated tests were added because this repo intentionally relies on manual browser verification for UI stories; the implementation was instead verified with headless Chrome DOM checks across the required breakpoints.
- `2026-04-03 12:38:11 NZDT` - Follow-up adjustment: the opened card now preserves the hero image display on tablet and desktop by expanding into the live non-hero grid region instead of covering the full viewport, and the close button is now anchored `24px` inside that resized overlay shell.
- `2026-04-03 12:38:11 NZDT` - Review follow-up pass accepted the hero-adjacent positioning decision, added `inert` to non-selected cards, made the backdrop fade timing explicit at `300ms`, removed the unused trigger ref, and replaced render-time overlay geometry reads with a pre-open layout snapshot.
- `2026-04-03 14:53:28 NZDT` - Review workflow completed. All valid Story 2.3 findings were fixed or recorded in `deferred-work.md`, the epic/story docs were aligned to the accepted hero-adjacent overlay behavior, and the story was advanced from `review` to `done`.

### File List

- `src/components/MainPage.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/CloseButton.tsx`
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/styles/main.css`

### Review Findings

- [x] [Review][Decision][Accepted] Overlay positioning ignores clicked card's grid cell — accepted product decision. Tablet and desktop keep the hero-adjacent expansion region so the hero image remains visible behind the dimmed backdrop. The story completion notes and change log document this deliberate deviation.

- [x] [Review][Patch][Fixed] Background cards not keyboard-inert — valid. `MainPage.tsx` now applies `inert` to every non-selected card while the overlay is open, alongside the existing `aria-hidden` and pointer blocking.
- [x] [Review][Patch][Fixed] DimmedBackdrop fade is instant, not ~300ms — valid as an explicit contract issue. `MainPage.tsx` now sets `transition={{ duration: 0.3 }}` on `DimmedBackdrop`, and runtime checks showed backdrop opacity progressing from `0.008...` at `30ms` to `0.173...` at `150ms` to `0.3` at `370ms`.
- [x] [Review][Patch][Fixed] `getOpenedCardStyle` produces wrong values after resize with body fixed — valid. The open-card bounds are now calculated once at click time before the body is locked, stored in state, and reused through the open state instead of re-reading live DOM geometry on re-render.
- [x] [Review][Dismissed] Duplicate `rounded-[0]` dead class in card-hover-radial — not valid against the current file. `Card.tsx` no longer contains `rounded-[0]`; the review note was stale noise.
- [x] [Review][Patch][Fixed] `triggerCardIdRef` unused dead code — valid. The unused ref was removed from `MainPage.tsx`.
- [x] [Review][Patch][Fixed] `openedCardStyle` not memoized — partially valid underlying concern, but the better fix was to remove render-time DOM reads entirely. `openedCardStyle` is now a pre-open snapshot rather than a per-render computed value, so no `useMemo` is needed.

- [x] [Review][Patch][Fixed] Escape `preventDefault` blocks nested content Escape handling — valid. `MainPage.tsx` now ignores already-handled Escape events and no longer calls `preventDefault()`, so nested overlay content can own Escape when needed.
- [x] [Review][Patch][Fixed] Overlay position jumps on resize — no longer applicable after the geometry snapshot fix. The open card keeps its pre-open bounds instead of swapping inline coordinates during resize, and runtime checks showed the selected rect staying stable across a desktop resize.
- [x] [Review][Defer] `overscroll-contain` on mobile viewport may clip with dynamic browser toolbar — deferred, known mobile browser limitation
- [x] [Review][Defer] Rapid open/close toggling can cause visual glitch — deferred, edge case hard to hit in practice

## Change Log

- `2026-04-03`: Story created and marked `ready-for-dev` with repo-grounded guardrails for overlay ownership, modal behavior, lazy loading, and the cards `3-5` interaction scope.
- `2026-04-03`: Implemented the shared overlay shell, lazy expanded-content registry, blur backdrop, modal close orchestration, inert background behavior, and responsive overlay spacing; validated the result with `npm run build` plus desktop/tablet/mobile runtime checks and marked the story `review`.
- `2026-04-03`: Adjusted the larger-breakpoint open-card bounds so the hero image remains visible behind the dimmed backdrop on tablet and desktop, and moved the close button positioning from viewport-fixed to overlay-anchored.
- `2026-04-03`: Addressed the valid Story 2.3 review findings by adding `inert` background cards, making the backdrop fade duration explicit, removing the unused trigger ref, and replacing render-time overlay geometry reads with a pre-open layout snapshot.
- `2026-04-03`: Tightened the Escape handler to respect nested consumers and reclassified the resize-jump finding as fixed because the pre-open geometry snapshot keeps the expanded card bounds stable across resize.
- `2026-04-03`: Completed review closure for Story 2.3, aligned the story/epic documentation to the accepted hero-adjacent overlay positioning, and marked the story `done`.
