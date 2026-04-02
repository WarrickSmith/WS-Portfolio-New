# Story 1.5: Styled-Components Removal and Dead Code Cleanup

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As the site owner,
I want styled-components fully removed and dead code cleaned up,
so that the codebase has zero legacy styling dependencies and no unused resources.

## Acceptance Criteria

1. `styled-components` and `@types/styled-components` are uninstalled from `package.json`.
2. `src/GlobalStyle.ts` is deleted.
3. No file in the codebase contains `import styled from 'styled-components'` or any styled-components import.
4. `src/assets/reservationizr-img.jpg` is deleted.
5. `src/assets/tic-tac-toe.jpg` is deleted.
6. No unused component files, stale imports, or unreferenced assets remain.
7. `npm run build` completes successfully with zero warnings related to unused imports.
8. The site renders correctly in the browser matching existing visual appearance.
9. Bundle size is reduced compared to the pre-migration baseline because the styled-components runtime is gone.

## Tasks / Subtasks

- [x] Task 1: Remove the styled-components root wiring and package dependency chain (AC: 1, 2, 3, 7, 8, 9)
  - [x] Move the root/global rules currently owned by `src/GlobalStyle.ts` into `src/styles/main.css`:
    - `:root` font-synthesis and text-rendering
    - shared font-family for `body`, `html`, `input`, and `textarea`
    - universal `box-sizing`
    - `body` min-height, min-width, overflow, foreground colour, and background colour
  - [x] Use `main.css` and Tailwind theme tokens as the single styling source after cutover. Do not recreate `GlobalStyle.ts` logic under new legacy variable names.
  - [x] Update `src/main.tsx` to remove the `GlobalStyle` import/render path.
  - [x] Delete `src/GlobalStyle.ts`.
  - [x] Run `npm uninstall styled-components @types/styled-components` so `package.json` and `package-lock.json` are updated together.
  - [x] Verify `rg -n "styled-components|GlobalStyle" src package.json package-lock.json` returns no code/runtime hits after cleanup.

- [x] Task 2: Remove the last live styled-components component without pulling Epic 4 scope forward (AC: 3, 6, 8, 9)
  - [x] Rewrite `src/components/common/BulletPoints.tsx` as a Tailwind + Framer Motion component that preserves the current hover-reveal card behaviour and the existing prop contract (`href`, `title`, `points`, `image`, `target`).
  - [x] Keep the current interaction pattern intact:
    - root remains a `motion.a`
    - image is still the resting visual state
    - text overlay still slides in on hover
    - external link behaviour stays unchanged
  - [x] Update `src/components/portfolio/PortfolioContent.tsx` only as needed for the migrated component.
  - [x] Do not implement `ProjectCard.tsx`, `TechBadge.tsx`, or `ExternalLinkButton.tsx` in this story. Those belong to Epic 4 and would change the current UI beyond Story 1.5 scope.

- [x] Task 3: Remove stale portfolio entries, related assets, and dead asset references (AC: 4, 5, 6, 8, 9)
  - [x] Update `src/data/portfolioData.tsx` to remove the Reservations and Tic Tac Toe imports, point arrays, and portfolio entries.
  - [x] Delete `src/assets/reservationizr-img.jpg`.
  - [x] Delete `src/assets/tic-tac-toe.jpg`.
  - [x] Audit `src/assets/` for dead files after the data cleanup. `src/assets/211651_close_round_icon.svg` is currently unreferenced after Story 1.3 and should be deleted if it is still unused.
  - [x] Verify no stale asset references remain with `rg -n "reservationizr-img|tic-tac-toe|211651_close_round_icon" src`.
  - [x] Confirm the post-build asset list no longer includes the removed JPGs.

- [x] Task 4: Eliminate the remaining GlobalStyle-era variable usage before deleting GlobalStyle (AC: 2, 6, 8)
  - [x] Replace all remaining `style={{ fontSize: 'var(--fs-*)' }}` usages in:
    - `src/components/about/AboutContent.tsx`
    - `src/components/contact/ContactContent.tsx`
    - `src/components/contact/ContactForm.tsx`
    - `src/components/common/WordSlider.tsx`
    - `src/components/portfolio/PortfolioContent.tsx`
  - [x] Prefer Tailwind utilities from the existing `@theme` scale (`text-body-sm`, `text-body`, `text-h2`, `text-h3`, `text-display`, `text-caption`) where they preserve the current hierarchy.
  - [x] If exact responsive sizing would drift too far, add semantic text tokens to `src/styles/main.css` and consume them via Tailwind utilities or arbitrary-value classes. Do not restore `--fs-*`, `--bg-color*`, `--color-alt*`, or `--border-style*` legacy variables.
  - [x] Verify `rg -n "var\\(--fs-|--bg-color|--color-alt|--border-style" src` is clean after the migration.

- [x] Task 5: Verify the cutover and capture bundle reduction (AC: 3, 6, 7, 8, 9)
  - [x] Build baseline from story preparation: `npm run build` currently succeeds with `Entrypoint main 2.13 MiB`, and the build still includes `reservationizr-img.jpg` (145 KiB) and `tic-tac-toe.jpg` (190 KiB).
  - [x] Run `npm run build` after the cleanup and confirm it still passes.
  - [x] Run `npm run dev` and manually verify:
    - landing page background, body overflow, and grid layout still match the current behaviour after `GlobalStyle.ts` removal
    - NameCard still centers correctly and WordSlider remains readable
    - About content typography, summary stats, and responsive layout still read correctly
    - Portfolio cards still reveal content on hover and remaining project links open correctly
    - Contact content and form states remain legible and correctly styled
  - [x] Compare the post-change production build against the `2.13 MiB` baseline and record the reduction in the completion notes.
  - [x] Manually audit imports because webpack may not emit explicit unused-import warnings for every stale import path in this project.

## Dev Notes

### Critical Guardrails

- Story 1.4 completed the feature-folder migration. Do not reintroduce `box2/`, `box3/`, `box4/`, or `box5/` paths anywhere.
- Story 1.5 is the Tailwind cutover cleanup, not the Portfolio redesign. Preserve the current portfolio interaction/appearance while removing legacy styling dependencies.
- `src/styles/main.css` is already the project-wide styling entry point through `src/App.tsx`. Root/global CSS belongs there after `GlobalStyle.ts` is removed.
- Components use default exports. Utilities and config helpers use named exports.
- Use `cn()` only for conditional class composition. Static Tailwind class lists should remain plain strings.
- Framer Motion continues to own animated state transitions; Tailwind owns static, responsive, and hover styling.
- No automated tests. Manual verification via `npm run dev` and browser inspection is required.
- Cards 1 and 2 remain non-interactive. Do not regress the `MainPage.tsx` card gating logic while validating the post-cutover UI.

### Repo Facts Discovered During Story Preparation

- Current `styled-components` usage is isolated to:
  - `src/GlobalStyle.ts`
  - `src/components/common/BulletPoints.tsx`
  - `package.json`
  - `package-lock.json`
- Current `GlobalStyle.ts` is still providing critical root styles:
  - `body` background/foreground
  - `body` overflow/min-height/min-width
  - shared font-family for `body`, `html`, `input`, `textarea`
  - universal `box-sizing`
  - legacy `--fs-*`, `--bg-color*`, `--color*`, and `--border-style*` variables
- Remaining runtime dependencies on legacy `--fs-*` variables exist in:
  - `src/components/about/AboutContent.tsx`
  - `src/components/contact/ContactContent.tsx`
  - `src/components/contact/ContactForm.tsx`
  - `src/components/common/WordSlider.tsx`
  - `src/components/portfolio/PortfolioContent.tsx`
- Current stale portfolio assets are still bundled via `src/data/portfolioData.tsx`:
  - `src/assets/reservationizr-img.jpg`
  - `src/assets/tic-tac-toe.jpg`
- `src/assets/211651_close_round_icon.svg` was intentionally left alone in Story 1.3 and is a strong candidate for deletion in this story if the audit confirms it remains unused.

### Previous Story Intelligence

- Story 1.3 explicitly deferred dead asset cleanup to Story 1.5 after replacing the old close-button SVG with a text button.
- Story 1.4 intentionally left `BulletPoints.tsx` as the remaining legacy portfolio component because Epic 4 owns the future `ProjectCard` redesign.
- Story 1.4 already fixed several shared-layer regressions. Preserve those outcomes:
  - exact card breakpoint behaviour at desktop/tablet/mobile
  - cards 1 and 2 remain non-interactive with `cursor: default`
  - ContactForm already guards invalid submit/captcha/env cases better than earlier stories
- Deferred work already targets Story 1.5 for:
  - removing the dual CSS reset once `GlobalStyle.ts` is deleted
  - reviewing `oklch(...)` fallback needs after the cutover

### Git Intelligence

- Recent history is concentrated in Story 1.4 Tailwind migration commits. The file locations and import paths introduced there are the current source of truth.
- The most recent relevant fix commit (`2edea1b`) reinforced the `src/config/env.ts` import pattern. Do not fall back to direct `process.env` access while touching Contact/Visitor files during verification.

### File Structure Notes

- Expected code/files to touch:
  - `package.json`
  - `package-lock.json`
  - `src/main.tsx`
  - `src/GlobalStyle.ts` (delete)
  - `src/styles/main.css`
  - `src/components/common/BulletPoints.tsx`
  - `src/components/portfolio/PortfolioContent.tsx`
  - `src/data/portfolioData.tsx`
  - `src/components/about/AboutContent.tsx`
  - `src/components/contact/ContactContent.tsx`
  - `src/components/contact/ContactForm.tsx`
  - `src/components/common/WordSlider.tsx`
  - `src/assets/reservationizr-img.jpg` (delete)
  - `src/assets/tic-tac-toe.jpg` (delete)
  - `src/assets/211651_close_round_icon.svg` (audit/delete if unused)
- Do not create new portfolio redesign primitives in this story. Epic 4 owns `ProjectCard`, `TechBadge`, and `ExternalLinkButton`.
- `src/data/portfolioData.tsx` remains the single source of truth for portfolio entries. Remove stale projects in the data file, not in the render loop.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-15-Styled-Components-Removal-and-Dead-Code-Cleanup]
- [Source: _bmad-output/planning-artifacts/epics.md#Story-41-Portfolio-Content-Layout-and-Project-Cards]
- [Source: _bmad-output/planning-artifacts/epics.md#Story-42-Portfolio-Data-Update-and-Content-Refresh]
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend-Architecture]
- [Source: _bmad-output/planning-artifacts/architecture.md#Files-removed-during-migration]
- [Source: _bmad-output/planning-artifacts/architecture.md#Requirements-to-Structure-Mapping]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation-Handoff]
- [Source: _bmad-output/implementation-artifacts/1-3-component-migration-common-and-leaf-components.md]
- [Source: _bmad-output/implementation-artifacts/1-4-component-migration-feature-components-and-folder-renames.md]
- [Source: _bmad-output/implementation-artifacts/deferred-work.md]
- [Source: _bmad-output/project-context.md]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `git log --oneline -5`
- `git status --short`
- `npm uninstall styled-components @types/styled-components`
- `npm ls styled-components @types/styled-components --depth=0`
- `npm run build`
- `npm run dev`
- `curl -I http://localhost:3000/`
- `rg -n "styled-components|GlobalStyle" src package.json package-lock.json`
- `rg -n "reservationizr-img|tic-tac-toe|211651_close_round_icon" src`
- `rg -n "var\\(--fs-|--bg-color|--color-alt|--border-style" src`
- `headless Chrome + Playwright checks against http://localhost:3000/ for desktop/mobile screenshots, portfolio hover state, and external-link attributes`

### Implementation Plan

- Move `GlobalStyle.ts` responsibilities into `src/styles/main.css`, then remove the runtime/package dependency chain completely.
- Replace the last styled-components portfolio card with a Tailwind + Framer Motion `motion.a` that preserves the current hover-reveal interaction.
- Prune stale portfolio entries/assets and replace all remaining legacy `var(--fs-*)` consumers with semantic Tailwind text tokens.
- Validate with `npm run build`, `npm run dev`, and headless browser checks; fix any regression discovered during verification before marking the story ready for review.

### Completion Notes List

- Moved the former `GlobalStyle.ts` root rules into `src/styles/main.css`, added semantic Tailwind text tokens (`text-supporting`, `text-callout`, `text-emphasis`, `text-metric`), removed the `GlobalStyle` render path from `src/main.tsx`, and deleted `src/GlobalStyle.ts`.
- Rewrote `src/components/common/BulletPoints.tsx` as a Tailwind + Framer Motion `motion.a` that keeps the image as the resting state, slides the text overlay in on hover, and preserves `_blank` + `noreferrer` behaviour for external links.
- Removed the Reservations and Tic Tac Toe portfolio entries from `src/data/portfolioData.tsx` and deleted `src/assets/reservationizr-img.jpg`, `src/assets/tic-tac-toe.jpg`, and the unreferenced `src/assets/211651_close_round_icon.svg`.
- Replaced every remaining `style={{ fontSize: 'var(--fs-*)' }}` usage in the story-scoped components with semantic Tailwind text utilities; `rg -n "var\\(--fs-|--bg-color|--color-alt|--border-style" src` is clean.
- Verification found a close-button regression in expanded cards caused by event bubbling back into the parent card. `src/components/common/CloseButton.tsx` now stops propagation before calling `onClick`, restoring reliable close behaviour.
- `npm uninstall styled-components @types/styled-components` completed successfully. `npm ls styled-components @types/styled-components --depth=0` now returns an empty tree, and `rg -n "styled-components|GlobalStyle" src package.json package-lock.json` is clean.
- Production build remains green at `Entrypoint main 2.1 MiB`, down from the `2.13 MiB` baseline by roughly `0.03 MiB` (about `30 KiB`), and the emitted asset list no longer contains the removed JPGs.
- Manual verification used `npm run dev` plus headless Chrome/Playwright checks on desktop and mobile. Confirmed `body` background `rgb(17, 17, 17)`, foreground `rgb(240, 240, 240)`, `overflow: hidden`, readable NameCard/WordSlider, correct About/Contact layouts, active portfolio hover overlays, and `_blank`/`noreferrer` on the remaining external links.

### File List

- `package.json`
- `package-lock.json`
- `src/main.tsx`
- `src/GlobalStyle.ts` (deleted)
- `src/styles/main.css`
- `src/components/common/BulletPoints.tsx`
- `src/components/common/CloseButton.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/data/portfolioData.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/common/WordSlider.tsx`
- `src/assets/reservationizr-img.jpg` (deleted)
- `src/assets/tic-tac-toe.jpg` (deleted)
- `src/assets/211651_close_round_icon.svg` (deleted)

### Review Findings

- [x] [Review][Defer] Token naming convention inconsistency — semantic names (text-supporting, text-callout, text-emphasis, text-metric) don't follow the existing size-based pattern (text-caption, text-body-sm, text-body-lg). Design decision from Stories 1.3/1.5, not a regression. `src/styles/main.css`
- [x] [Review][Defer] `body { font-weight: 700 }` global bold default — carried over from GlobalStyle.ts per Task 1 instructions. Pre-existing. `src/styles/main.css:127-134`
- [x] [Review][Defer] BulletPoints `<ul>` with `flex-1` has no overflow clamp — long bullet lists could push beyond card bounds. Old code had same constraint. Pre-existing. `src/components/common/BulletPoints.tsx:39`
- [x] [Review][Defer] WordSlider empty `words` array — modulo by zero produces NaN index. Pre-existing, not touched by this story. `src/components/common/WordSlider.tsx:19`
- [x] [Review][Defer] `document.getElementById('root')` null assertion — `as HTMLElement` cast hides potential null. Pre-existing. `src/main.tsx:5`

## Change Log

- `2026-04-01`: Removed `styled-components`/`GlobalStyle`, migrated the last portfolio hover card to Tailwind + Framer Motion, pruned dead portfolio assets, replaced legacy font-size variable consumers with semantic Tailwind tokens, fixed expanded-card close-button bubbling, and validated the cutover with production build plus desktop/mobile browser checks.
- `2026-04-01`: Code review (3-layer adversarial) — 0 patches, 0 decisions, 5 deferred (all pre-existing), 14 dismissed.
