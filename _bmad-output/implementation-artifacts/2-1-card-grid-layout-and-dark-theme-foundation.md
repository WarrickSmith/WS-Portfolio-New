# Story 2.1: Card Grid Layout and Dark Theme Foundation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see a card-based grid layout on a dark-themed landing page,
so that I immediately see all content sections and sense this is a custom-built site.

## Acceptance Criteria

1. A `CardGrid` renders a 3x2 CSS Grid on desktop (`>=1000px`) with Card 1 spanning the full left column height and Cards 2-5 filling the remaining cells.
2. On tablet (`768px-999px`) the grid reflows to 2 columns with Card 1 spanning the full-width top row.
3. On mobile (`<768px`) cards stack in a single column and Card 1 is hidden.
4. Grid gaps are `space-12` (48px) on desktop, `space-8` (32px) on tablet, and `space-6` (24px) on mobile.
5. The page background uses `bg-base` (`#0a0a0a`) as the deepest layer.
6. Card 1 uses the existing background image, stays non-interactive, and receives no hover treatment.
7. Cards 3-5 render a resting state with a gradient surface (`#161616 -> #131313`), 16px corners, and a 1px `border-subtle` border.
8. Each interactive card includes an icon, title, and one-line description in its resting state.
9. The dark theme is visually consistent across the landing page and card surfaces.
10. The landing surface is rendered inside a semantic `<main aria-label="Portfolio">`.
11. Browser-fill composition is restored: at desktop widths the landing grid no longer reads as a small centered panel, and the hero-image card regains strong visual presence without regressing the exact `1000px` and `768px` breakpoints stabilized in Epic 1.

## Tasks / Subtasks

- [x] Task 1: Rework the landing surface and semantic shell in shared grid components (AC: 1, 2, 3, 4, 5, 10, 11)
  - [x] Update `src/components/common/CardGrid.tsx` so the outer shell is a semantic `main` and the layout honors the desktop/tablet/mobile grid spec.
  - [x] Replace the current centered `w-[85vw]` / `h-[70vh]` treatment if needed to restore browser-fill composition while preserving the exact `1000px` and `768px` thresholds fixed in Story 1.4.
  - [x] Prefer the existing custom Tailwind breakpoints defined in `src/styles/main.css` if they are already usable; otherwise preserve the current explicit `1000px` / `768px` logic rather than drifting to Tailwind's default `lg` (`1024px`) breakpoint.
  - [x] Keep mobile-first behavior explicit: unprefixed classes define the mobile baseline, then tablet/desktop behavior is layered with breakpoint variants.
  - [x] Ensure Card 1 is visible on tablet, hidden only on mobile, and spans the intended grid area on desktop/tablet.

- [x] Task 2: Refresh the shared card foundation without pulling later Epic 2 scope forward (AC: 6, 7, 8, 9)
  - [x] Update `src/components/common/Card.tsx` resting styling to use the dark-theme foundation: gradient surface, `rounded-radius-lg`, `border-border-subtle`, and page/card depth separation against `bg-base`.
  - [x] Keep `motion.div` as the root element and preserve the current expansion wiring. Story 2.1 is the resting-state foundation, not the hover or overlay redesign.
  - [x] Preserve card-id gating in `MainPage.tsx`: cards 1 and 2 remain non-interactive. Only cards 3-5 are preview cards for later expansion work.

- [x] Task 3: Add informative resting-state preview content for the interactive cards (AC: 8, 9, 11)
  - [x] Update `src/components/about/AboutCard.tsx`, `src/components/portfolio/PortfolioCard.tsx`, and `src/components/contact/ContactCard.tsx` to show icon + title + one-line description.
  - [x] Reuse `src/components/common/FaIcon.tsx` for preview icons. Recommended icon mapping: About `user`, Portfolio `briefcase`, Contact `envelope`.
  - [x] Keep `GoldPulseText` available for title treatment, but do not implement the full Story 2.2 hover orchestration here.
  - [x] Suggested preview copy:
    - [x] About: `Background, experience, and skills.`
    - [x] Portfolio: `Selected builds with live demos and code.`
    - [x] Contact: `Start a conversation or reach out directly.`
  - [x] Keep `src/components/namecard/NameCard.tsx` as the non-interactive identity card. Do not force it into the interactive preview template.

- [x] Task 4: Align theme tokens and page background with the actual design system (AC: 5, 7, 9, 11)
  - [x] Use `src/styles/main.css` `@theme` tokens as the single source of truth. Add or rename tokens there if the current set cannot express the required gradient/background separation cleanly.
  - [x] Move the deepest landing backdrop to `bg-base` while keeping cards on elevated darker surfaces. Do not duplicate hex values throughout JSX if a token can express them once.
  - [x] Preserve current Tailwind + `cn()` patterns and keep arbitrary values limited to cases where tokens/utilities cannot represent the requirement cleanly.

- [x] Task 5: Verify at the exact breakpoint and composition trouble spots (AC: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev`.
  - [x] Manually verify desktop (1440px+), 1000px, 900px, 768px, 600px, and 375px widths.
  - [x] Confirm: desktop 3x2 with strong hero presence; 1000px/900px 2-column layout with hero visible; 600px/375px single column with Card 1 hidden; consistent dark theme; card previews contain icon/title/description; existing expand/close behavior still works.

## Dev Notes

### Critical Story Guardrails

- This story is the visual-fidelity recovery point called out in the Epic 1 retrospective. The current centered grid constraints (`w-[85vw]`, `h-[70vh]`) are suspect and can be replaced if they prevent the intended first impression.
- Preserve Story 1.4 breakpoint fixes: exact `1000px` desktop-to-tablet changeover, exact `768px` tablet-to-mobile changeover, and responsive behavior after card resize/open.
- Cards 1 and 2 remain non-interactive. Do not regress the `handleCardClick` gating in `src/components/MainPage.tsx`.
- Do not pull Story 2.2 scope into this story: no cursor-tracking glow, no 5-layer hover effect, no full GoldPulseText hover choreography yet.
- Do not pull Story 2.3/2.4 scope into this story: no overlay refactor, no per-card spring variants, no `AnimatePresence` redesign beyond preserving the current working expand/close path.
- Do not introduce `SkeletonGrid`. Architecture replaced that approach with future `React.lazy()` + `<Suspense>` for expanded content.
- `_bmad-output/project-context.md` still contains stale styled-components guidance. Treat the current Tailwind repo plus architecture/epics docs as the source of truth for styling decisions.
- Components use default exports. Utilities and config stay as named exports. No barrel files. No test files.

### Repo Facts Discovered During Story Preparation

- `src/components/common/CardGrid.tsx` currently centers a `w-[85vw]` / `h-[70vh]` grid, which the Epic 1 retro identifies as visual drift from the intended landing-page impact.
- `src/components/MainPage.tsx` currently hides Card 1 below `1001px`; Story 2.1 must change that so Card 1 appears on tablet and hides only on mobile.
- `src/components/common/Card.tsx` currently uses a solid `bg-bg-card` surface and a fixed opened-card layout. The opened state must remain compatible with current expansion behavior.
- `src/components/about/AboutCard.tsx`, `src/components/portfolio/PortfolioCard.tsx`, and `src/components/contact/ContactCard.tsx` currently render title-only previews. They need icon + title + description.
- `src/components/common/FaIcon.tsx` already exists and can be reused for preview icons. No new icon library is needed.
- `index.html` already contains the required viewport meta tag.
- Baseline build is green as of `2026-04-02`: `npm run build` succeeds and emits `Entrypoint main 2.1 MiB`.
- The Epic 1 retrospective explicitly directs Story 2.1 to restore landing-page presence and add explicit browser-fill verification.

### Architecture Compliance

- `MainPage.tsx` remains the single source of truth for selected/expanded card state. No child component should own global card-selection state.
- Tailwind handles static layout, surface styling, responsive rules, and future hover/focus states. Framer Motion continues to own state-driven expansion behavior.
- Keep `motion.div` as the `Card` root. Do not swap animation libraries or imports in this story.
- Shared/reusable UI belongs in `src/components/common/`. Feature previews stay in their feature folders unless a truly shared preview primitive becomes justified.
- Use `cn()` only for conditional class composition. Static class lists should remain plain strings.
- Prefer semantic tokens from `src/styles/main.css` over hard-coded values. If a missing gradient stop or spacing value is required, add the token once and consume it consistently.

### Library / Framework Requirements

- Runtime versions already pinned in `package.json`: `react@^19.2.4`, `react-dom@^19.2.4`, `framer-motion@^12.38.0`, `tailwindcss@^4.2.2`, `@tailwindcss/postcss@^4.2.2`, `webpack@^5.105.4`, `typescript@^6.0.2`.
- Tailwind v4 `@theme` variables generate both utility classes and normal CSS variables. Use them for colors, spacing, radius, text, and custom breakpoints rather than reintroducing ad hoc constants.
- Tailwind responsive utilities are mobile-first. Unprefixed classes should define the mobile baseline; breakpoint variants should layer tablet/desktop behavior.
- The project already declares custom breakpoint tokens in `src/styles/main.css`: `--breakpoint-tablet: 48rem` and `--breakpoint-desktop: 62.5rem`. Keep breakpoint units in `rem` if you extend or normalize these values.
- Tailwind provides `focus-visible`, `motion-safe`, `motion-reduce`, `pointer-fine`, `pointer-coarse`, and `aria-expanded` variants. Use these built-ins instead of bespoke selectors when they fit cleanly.
- Official Motion docs now show `motion/react`, but this repo is currently pinned to `framer-motion@^12.38.0` and imports it successfully. Do not change the animation package/import surface in Story 2.1.
- React `lazy()` and `<Suspense>` remain the approved pattern for future expanded-content code splitting. If touched later, declare lazy components at module top level and use a lightweight fallback. Do not introduce that refactor here unless it becomes necessary to unblock Story 2.1.

### File Structure Requirements

Expected files to touch:

- `src/components/common/CardGrid.tsx`
- `src/components/common/Card.tsx`
- `src/components/MainPage.tsx`
- `src/components/about/AboutCard.tsx`
- `src/components/portfolio/PortfolioCard.tsx`
- `src/components/contact/ContactCard.tsx`
- `src/components/namecard/NameCard.tsx` if spacing or visual alignment needs tuning
- `src/styles/main.css`

Optional only if reuse becomes obvious:

- `src/components/common/CardPreview.tsx` or similar small presentational helper for cards 3-5

Files that should not need Story 2.1 changes unless a blocker is found:

- `src/components/about/AboutContent.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/common/renderChildDiv.tsx` (card/content id mapping is already correct)
- `src/components/common/CloseButton.tsx`

### Testing Requirements

- No automated test framework. Do not add test files.
- Required verification:
  - `npm run build`
  - `npm run dev`
  - Browser checks at 1440px+, 1000px, 900px, 768px, 600px, and 375px
- Manual checks:
  - Card 1 desktop: spans full left column and reads as the dominant visual anchor
  - Card 1 tablet: visible and full-width on the top row
  - Card 1 mobile: hidden
  - Cards 3-5 resting state: icon/title/description visible, dark theme consistent, no hover-only dependency needed to understand clickability
  - Existing expand/close path still works for cards 3-5
  - No regression in current 1000px breakpoint behavior fixed in Story 1.4

### Previous Story / Epic Intelligence

- Story 1.4 fixed shared card/grid regressions and restored the exact `1000px` breakpoint. Story 2.1 must preserve that repair while changing composition and visibility rules.
- Story 1.5 removed styled-components, moved global styling to `src/styles/main.css`, and fixed close-button event bubbling. Use the Tailwind tokens and shared CSS entry point rather than recreating legacy styling patterns.
- The Epic 1 retrospective identified Story 2.1 as the place to correct landing-page visual drift. That is not optional scope; it is the primary story-specific risk callout.
- The same retrospective also notes project-guidance drift. Where `_bmad-output/project-context.md` conflicts with the actual repo, follow the actual repo plus architecture/epics documents.

### Latest Technical Information

- Tailwind theme variables doc: `@theme` variables create the corresponding utility classes and also emit regular CSS variables. This supports keeping the dark-theme tokens in `src/styles/main.css` while still using utilities in JSX.
- Tailwind responsive design doc: utilities are mobile-first, viewport meta is required, and single-range targeting can be done by stacking a breakpoint with a `max-*` variant. This is directly relevant because Story 2.1 needs exact tablet-only behavior between `768px` and `999px`.
- Tailwind state variants doc: `hover` is already guarded by hover-capable media conditions, and `focus-visible`, `motion-safe`, `motion-reduce`, `pointer-fine`, `pointer-coarse`, and `aria-expanded` variants are all available. Use these built-ins instead of bespoke selectors when layering later card states.
- React `lazy` and `<Suspense>` docs: `lazy()` defers loading until first render, must be declared at module top level, and requires a lightweight Suspense fallback. Keep this in mind for later Epic 2 overlay/lazy-loading work because architecture explicitly rejected a `SkeletonGrid`.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic-2-Card-Grid--Interactive-Landing-Experience]
- [Source: _bmad-output/planning-artifacts/epics.md#Story-21-Card-Grid-Layout-and-Dark-Theme-Foundation]
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend-Architecture]
- [Source: _bmad-output/planning-artifacts/architecture.md#Structure-Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#Tailwind-Class-Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#Animation-Boundary-Pattern]
- [Source: _bmad-output/planning-artifacts/architecture.md#Requirements-to-Structure-Mapping]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Spacing--Layout-Foundation]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Accessibility-Considerations]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Chosen-Direction]
- [Source: _bmad-output/implementation-artifacts/1-4-component-migration-feature-components-and-folder-renames.md]
- [Source: _bmad-output/implementation-artifacts/1-5-styled-components-removal-and-dead-code-cleanup.md]
- [Source: _bmad-output/implementation-artifacts/epic-1-retro-2026-04-02.md]
- [Source: _bmad-output/implementation-artifacts/deferred-work.md]
- [Source: _bmad-output/project-context.md]
- [Source: https://tailwindcss.com/docs/theme]
- [Source: https://tailwindcss.com/docs/responsive-design]
- [Source: https://tailwindcss.com/docs/hover-focus-and-other-states]
- [Source: https://react.dev/reference/react/lazy]
- [Source: https://react.dev/reference/react/Suspense]

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `epic-2` as `in-progress` and `2-1-card-grid-layout-and-dark-theme-foundation` as `ready-for-dev`
- Story context package includes current repo findings, visual-fidelity risks, and latest docs links

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `git status --short`
- `git log --oneline -5`
- `npm run build`
- `npm run dev`
- `rg -n "Story 2\\.1|Story 2\\.2|Epic 2" _bmad-output/planning-artifacts/epics.md`
- `rg -n "CardGrid|Card component|dark theme|hover|overlay|responsive" _bmad-output/planning-artifacts/ux-design-specification.md`
- `rg -n "Frontend Architecture|Tailwind Class Patterns|Animation Boundary Pattern|Requirements to Structure Mapping|MainPage" _bmad-output/planning-artifacts/architecture.md`
- `sed -n '1,240p' src/components/common/CardGrid.tsx`
- `sed -n '1,260p' src/components/common/Card.tsx`
- `sed -n '1,280p' src/components/MainPage.tsx`
- `sed -n '1,280p' src/styles/main.css`
- `lsof -iTCP:3000 -sTCP:LISTEN -n -P`
- `curl -I http://127.0.0.1:3000`
- `curl -s http://127.0.0.1:3000 | sed -n '1,40p'`
- `google-chrome --headless=new --disable-gpu --remote-debugging-port=9222 --user-data-dir=/tmp/ws-story21-chrome about:blank`

### Implementation Plan

- Rebuild `CardGrid` into a semantic `main` with mobile-first layout classes, exact `tablet`/`desktop` breakpoints, and browser-fill composition instead of the centered `w-[85vw]` / `h-[70vh]` shell.
- Refresh the shared `Card` resting surface for Story 2.1 only, preserve `motion.div` expansion behavior, and keep `MainPage.tsx` as the single source of truth for card interactivity.
- Add a small shared preview primitive for cards 3-5, then validate the landing layout and expansion flow at 1440px, 1000px, 900px, 768px, 600px, and 375px.

### Completion Notes List

- Story context prepared on `2026-04-02`.
- Ready-for-dev package includes derived guardrails from the Epic 1 retrospective, current repo inspection, and official Tailwind/React references.
- Baseline build verification completed before handoff: `npm run build` passed with `Entrypoint main 2.1 MiB`.
- `2026-04-02`: Reworked `CardGrid` into a semantic `main` with mobile-first `grid-cols-1 -> tablet:grid-cols-2 -> desktop:grid-cols-3` behavior, restored browser-fill composition, and preserved the exact `768px` / `1000px` breakpoints through the custom `tablet` and `desktop` tokens.
- `2026-04-02`: Refreshed the shared card foundation in `Card.tsx` to use the required `#161616 -> #131313` gradient resting surface, 16px card corners, `border-border-subtle`, and deeper `bg-base` page separation without changing the existing expansion wiring.
- `2026-04-02`: Added reusable `CardPreview` content for cards 3-5 with `FaIcon`, `GoldPulseText`, and one-line preview copy, while keeping cards 1 and 2 non-interactive and keeping `NameCard` as the identity card rather than forcing it into the preview template.
- `2026-04-02`: Story 2.1 surfaced that Tailwind v4 resolves these theme tokens through standard utilities such as `px-6`, `gap-12`, and `rounded-lg`, so the Story 2.1 surfaces were aligned to the generated utility names instead of the non-resolving `*-spacing-*` / `rounded-radius-*` class names.
- `2026-04-02`: Validation passed with `npm run build` plus headless Chrome DevTools checks at 1440px, 1000px, 900px, 768px, 600px, and 375px. Desktop verified the 3x2 layout with Card 1 spanning the full left column; tablet verified the 2-column layout with Card 1 spanning the full-width top row; mobile verified the single-column stack with Card 1 hidden. Computed gaps were confirmed at `48px`, `32px`, and `24px`.
- `2026-04-02`: Existing expand/close behavior remained intact for cards 3-5. Headless Chrome checks confirmed About, Portfolio, and Contact all opened with the expected headings and closed cleanly.
- `2026-04-02`: A direct `npm run dev` attempt returned `EADDRINUSE` because a webpack dev server was already listening on `:3000`. Verification reused that active local webpack instance rather than terminating the pre-existing process.
- `2026-04-02`: Review follow-up pass confirmed and fixed three valid findings: body scroll is now locked while an expanded card overlay is open, invalid `justify-stretch` / redundant branch logic were removed from `MainPage.tsx`, and `CloseButton` now uses the valid Tailwind v4 `rounded-sm` utility.
- `2026-04-02`: Review follow-up pass dismissed two findings as invalid for the current implementation: Card 2 still renders on the shared gradient card surface, and the static cards are not keyboard-tabbable card controls in the current DOM.
- `2026-04-02`: Review workflow completed. All Story 2.1 review findings were resolved or dismissed with runtime verification, and the story was advanced from `review` to `done`.

### File List

- `src/components/MainPage.tsx`
- `src/components/about/AboutCard.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/CloseButton.tsx`
- `src/components/common/CardGrid.tsx`
- `src/components/common/CardPreview.tsx`
- `src/components/contact/ContactCard.tsx`
- `src/components/namecard/NameCard.tsx`
- `src/components/portfolio/PortfolioCard.tsx`
- `src/styles/main.css`

## Change Log

- `2026-04-02`: Story created and marked `ready-for-dev` with landing-layout, dark-theme, and breakpoint guardrails derived from Epic 1 findings.
- `2026-04-02`: Implemented Story 2.1 card-grid/browser-fill refresh, added interactive-card preview content, validated the exact breakpoint behaviors, and marked the story `review`.
- `2026-04-02`: Validated the code-review follow-up findings, fixed the valid regressions in `MainPage.tsx` and `CloseButton.tsx`, and dismissed the non-issues with runtime evidence.
- `2026-04-02`: Completed review closure for Story 2.1 and marked the story `done`.

## Review Findings

- [x] [Review][Fixed] Body scroll leak behind expanded card overlay — valid. On shorter tablet viewports (`900x700`) the page remained wheel-scrollable behind the fixed overlay while `body` stayed at `overflow-y: auto`. `MainPage.tsx` now locks body overflow while a card is expanded and restores the previous overflow values on close.
- [x] [Review][Dismissed] NameCard `bg-transparent` visual inconsistency — invalid. Runtime inspection shows Card 2 still inherits the shared card gradient from `Card.tsx`; the transparent child container does not remove the parent card surface.
- [x] [Review][Fixed] `justify-stretch` is not a valid Tailwind utility [`src/components/MainPage.tsx`] — valid. Removed the non-existent utility.
- [x] [Review][Fixed] Redundant `isNameCard`/`isPreviewCard` with identical class strings [`src/components/MainPage.tsx`] — valid. Collapsed the duplicated branch into a single `!isHeroCard` class path.
- [x] [Review][Fixed] CloseButton uses legacy `rounded-radius-sm` class [`src/components/common/CloseButton.tsx`] — valid. Updated to `rounded-sm`, which resolves correctly under the current Tailwind v4 theme.
- [x] [Review][Dismissed] Static cards (1 & 2) receive click events with no focus indication [`src/components/MainPage.tsx`] — invalid as written. The card roots are plain `div` elements with no `tabIndex`/role and are not keyboard-tab stops in the current DOM, so there is no missing card-level focus treatment to fix here.
