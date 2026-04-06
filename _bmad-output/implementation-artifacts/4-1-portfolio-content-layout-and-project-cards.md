# Story 4.1: Portfolio Content Layout and Project Cards

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see portfolio projects with rich descriptions, screenshots, tech stacks, and links,
so that I can assess the depth and quality of Warrick's work and click through to live demos.

## Acceptance Criteria

1. The existing card expansion overlay from Epic 2 remains the entry point. When card `4` expands, `PortfolioContent` renders a display heading and a single-column list of `ProjectCard` components inside the current scrollable overlay shell (UX-DR11).
2. Each `ProjectCard` follows image-first hierarchy: project screenshot at the top, content below, and full-width presentation within the overlay's `max-w-[800px]` content area (UX-DR12).
3. Each `ProjectCard` displays project name, description covering purpose plus key features, a row of non-interactive `TechBadge` components for the tech stack, and an `ExternalLinkButton` pair for Live Demo and GitHub repo.
4. `TechBadge` is non-interactive, monospace, caption sized, border-subtle, and text-tertiary (UX-DR16).
5. `ExternalLinkButton` supports `primary` and `secondary` variants, renders label text plus arrow icon, opens in a new tab with `target="_blank"` and `rel="noopener noreferrer"`, and exposes descriptive `aria-label` text (UX-DR19).
6. The Portfolio redesign preserves stable project target IDs and focusable wrappers so Story 3.2's About-to-Portfolio navigation continues to scroll and focus the selected project after the redesign.
7. Live demo links and GitHub repo links open valid destinations in new tabs without breaking the portfolio overlay state when the visitor returns.
8. Screenshots shown in Portfolio are current and accurate. The newer `music-manager.png` and `raceday.png` files currently sitting at repo root may be adopted, but any images used must be moved into tracked asset paths under `src/assets/`, with superseded files deleted. A fresh WS-Portfolio-New landing-page screenshot must be captured because the user confirmed the main landing page UI has changed.
9. Each `ProjectCard` uses semantic `<article>` markup, renders a descriptive `alt` value for the screenshot, and limits hover treatment to a subtle border or surface shift that does not fight the overlay behavior.
10. The implementation keeps local state ownership in `MainPage.tsx`, reuses the existing overlay infrastructure, and introduces no Context, Redux, or other global state.

## Tasks / Subtasks

- [x] Task 1: Replace the current BulletPoints-based Portfolio overlay with a ProjectCard-driven single-column layout (AC: 1, 2, 6, 10)
  - [x] Update `src/components/portfolio/PortfolioContent.tsx` so it renders a heading plus a vertical list of `ProjectCard` components instead of the current responsive `BulletPoints` grid.
  - [x] Preserve the existing `selectedProjectId` target behavior: stable `id` attributes, focusable wrappers, ref registration, `scrollIntoView`, and selected-project highlight treatment from Story 3.2.
  - [x] Keep the existing `OverlayContentGroup`, `SectionHeading`, `CardExpansionOverlay`, and `PortfolioCard` preview flow intact rather than rebuilding overlay infrastructure.

- [x] Task 2: Create the reusable Portfolio primitives required by the UX spec (AC: 2, 3, 4, 5, 9)
  - [x] Add `src/components/portfolio/ProjectCard.tsx` for the image-first project article layout.
  - [x] Add `src/components/common/TechBadge.tsx` for the non-interactive tech stack row.
  - [x] Add `src/components/common/ExternalLinkButton.tsx` for Live Demo and GitHub actions.
  - [x] Remove or retire `src/components/common/BulletPoints.tsx` from the Portfolio path once the new card layout is in place, but only after confirming nothing else still depends on it.

- [x] Task 3: Expand the Portfolio data contract just enough to power ProjectCard rendering (AC: 3, 4, 5, 7, 8)
  - [x] Reshape `src/data/portfolioData.tsx` away from the current `href` plus `points` model into structured card fields such as `liveDemoUrl`, `githubUrl`, `summary`, `keyFeatures`, `techStack`, `image`, and `imageAlt`.
  - [x] Keep the existing `PortfolioProjectId` values stable: `portfolio-site`, `music-manager`, and `race-day`.
  - [x] Seed the richer fields from the current three-project dataset without absorbing Story 4.2's broader copy refresh unless it is directly required to avoid broken cards or dead links in Story 4.1.

- [x] Task 4: Consolidate screenshot assets into tracked source paths and remove stale duplicates (AC: 8)
  - [x] Move the newer root-level `music-manager.png` and `raceday.png` files into tracked asset storage under `src/assets/` before importing them anywhere in code.
  - [x] Capture a fresh WS-Portfolio-New screenshot showing the updated landing page and replace the stale `src/assets/ws-portfolio.jpg` asset.
  - [x] Delete obsolete screenshot files after replacement so the repo does not keep both old and new variants or any stray repo-root assets.

- [x] Task 5: Manually verify layout, accessibility, links, and Story 3.2 regression boundaries (AC: 6, 7, 8, 9, 10)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev`.
  - [x] Verify desktop (`>=1000px`), tablet (`768px-999px`), and mobile (`<768px`) layouts keep the single-column ProjectCard stack readable inside the overlay.
  - [x] Verify About-to-Portfolio navigation from Story 3.2 still opens Portfolio and scrolls or focuses the selected project target correctly after the redesign.
  - [x] Verify Live Demo and GitHub buttons open valid destinations in new tabs and the visitor can return to the same portfolio state without errors.
  - [x] Verify screenshots render correctly, `alt` text is meaningful, and no adopted screenshot still imports from repo-root paths.

## Dev Notes

### Critical Story Guardrails

- Live repo truth overrides stale planning remnants. This codebase is Tailwind-first and does not use styled-components.
- Story 4.1 owns the Portfolio component and layout redesign plus the minimum data-shape expansion required to render it. Story 4.2 still owns the broader content refresh: URL normalization, remaining copy updates, and portfolio-data cleanup beyond what is needed to ship 4.1 without broken cards.
- Preserve `PortfolioProjectId` values exactly as they exist now. Story 3.2 already depends on those IDs for About-to-Portfolio navigation.
- `MainPage.tsx` remains the sole owner of card state, overlay sequencing, and `selectedProjectId` navigation. Do not move this into Context or any global state abstraction.
- `CardExpansionOverlay.tsx` already provides the dialog shell and `max-w-[800px]` content area. Reuse it.
- Planning artifacts mention `ProjectDetail`, but Story 4.1 acceptance criteria do not require a second drill-down state inside the Portfolio overlay. Do not introduce that extra layer unless a concrete blocker is discovered.
- Root-level screenshot files are temporary inputs only. Any images used by the app must end up under `src/assets/`, and obsolete duplicates must be deleted.
- The user explicitly confirmed the WS-Portfolio-New landing page changed. Treat the current `src/assets/ws-portfolio.jpg` file as stale until it is replaced with a fresh capture.
- No automated testing framework. Manual browser verification only.

### Repo Facts Discovered During Story Preparation

- `src/components/portfolio/PortfolioContent.tsx` currently renders a responsive grid of `<article>` wrappers containing `BulletPoints`, not `ProjectCard` components.
- That same `PortfolioContent.tsx` already manages stable refs keyed by `PortfolioProjectId` and scrolls or focuses the selected target when Story 3.2 navigates from About to Portfolio.
- `src/components/common/BulletPoints.tsx` is a hover-reveal image anchor with a single destination URL and bullet list. It cannot satisfy Story 4.1's separate Live Demo plus GitHub actions, semantic image element, or tech badge requirements.
- `src/data/portfolioData.tsx` currently exposes only `id`, `href`, `title`, `points`, and `image`. It does not yet store GitHub repo URLs, alt text, or structured description fields.
- `src/components/common/renderChildDiv.tsx` and `src/components/MainPage.tsx` already pass `selectedProjectId` into `PortfolioContent`; that integration must survive the redesign.
- `src/components/about/AboutContent.tsx` and `src/data/consolidatedProfile.tsx` already rely on the current project IDs for cross-card navigation.
- Current tracked screenshots live at `src/assets/music-manager.jpg`, `src/assets/raceday.png`, and `src/assets/ws-portfolio.jpg`.
- Newer untracked screenshots already exist at repo root: `music-manager.png` (`2647x1714`) and `raceday.png` (`3172x1807`). They appear to be fresher replacements than the currently tracked assets.
- `git status --short` shows those two root-level screenshot files as the only untracked files during story preparation.

### Architecture Compliance

- Keep Portfolio-specific rendering logic inside `src/components/portfolio/`.
- Put reusable link and badge primitives in `src/components/common/`.
- Keep project content as source-of-truth data in `src/data/portfolioData.tsx`.
- Use Tailwind utilities and the existing token system from `src/styles/main.css`; do not reintroduce styled-components or inline-style-heavy layout code.
- Prefer semantic HTML first: `<article>`, `<img>`, and `<a>` before reaching for extra ARIA.
- Respect existing feature boundaries: About continues to navigate by callback props and project IDs rather than importing Portfolio internals directly.

### Likely Touch Points

- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/components/common/TechBadge.tsx`
- `src/components/common/ExternalLinkButton.tsx`
- `src/components/common/BulletPoints.tsx`
- `src/data/portfolioData.tsx`
- `src/components/MainPage.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/assets/`

### Likely No-Touch Files Unless a Blocker Is Found

- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/common/SkillBadge.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/namecard/NameCard.tsx`

### Project Structure Notes

- There is a real planning-versus-repo gap here. Architecture anticipates `ProjectCard`, `TechBadge`, and `ExternalLinkButton`, but the live repo still uses `BulletPoints` inside `PortfolioContent`.
- Story 4.1 is the correct place to close that gap.
- Keep the component and data boundaries compatible with Story 4.2 (content refresh) and Story 4.3 (proof-to-skills reverse navigation). Do not hardcode copy or navigation assumptions into the component layer.
- The live `docs/architecture.md` already documents Portfolio as a feature folder driven by `src/data/portfolioData.tsx`. Prefer that repo-grounded doc when planning artifacts drift.

### Testing Requirements

- No automated testing framework. Do not add test files.
- Required verification:
  - `npm run build`
  - `npm run dev`
  - Manual browser checks on desktop, tablet, and mobile
- Manual checks:
  - Portfolio opens from the existing card-expansion flow and renders a single-column stack of ProjectCards.
  - Each ProjectCard shows screenshot, name, description, tech badges, and two external-link buttons.
  - About-to-Portfolio navigation from Story 3.2 still lands on the correct project after the redesign.
  - Live Demo and GitHub buttons open in new tabs and return cleanly to the same portfolio state.
  - Screenshots are current, imported from tracked `src/assets/` paths, and no obsolete duplicates remain.
  - Keyboard focus remains visible and usable on link buttons inside the overlay.

### Cross-Story Intelligence

- Story 3.2 already established stable project IDs and About-to-Portfolio navigation. Story 4.1 must preserve those landing targets.
- Story 4.2 will handle the broader portfolio content refresh. Story 4.1 should create the UI and data structure that 4.2 will populate and refine.
- Story 4.3 will add proof-to-skills reverse navigation. Avoid card markup that makes future skill-link insertion awkward.
- The implementation-readiness report recommends cross-card navigation verification after both Epics 3 and 4 are complete. Carry that note forward when verifying Story 4.1 and again when Story 4.3 lands.

### Git Intelligence Summary

- Recent history finished Epic 3 with stable `projectId`-based navigation and deliberately narrow scope: `feat: add grouped skills grid with proof-link badges and cross-card About-to-Portfolio navigation (story 3.2)`.
- Nothing in recent git history suggests reopening the overlay infrastructure. The next logical target is the Portfolio content layer itself.

### Latest Technical Information

- Repo-pinned stack: React `19.2.4`, Framer Motion `12.38.0`, Tailwind CSS `4.2.2`, Webpack `5.105.4`, and TypeScript `6.0.2`.
- Continue using the existing `React.lazy`-based expanded-content flow from `renderChildDiv.tsx`.

### Project Context Reference

- `_bmad-output/project-context.md` is partially stale because it still describes styled-components as the primary styling approach.
- For Story 4.1, prefer live repo truth from `docs/architecture.md`, `package.json`, and current source files.
- The useful project-context rules that still apply are manual browser verification, feature-folder boundaries, preserving local state ownership, and keeping cards `1` and `2` non-interactive.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 4 / Story 4.1 acceptance criteria and Epic 4 scope boundaries
- `_bmad-output/planning-artifacts/prd.md` - Portfolio overhaul goals, screenshot refresh, and URL update context
- `_bmad-output/planning-artifacts/architecture.md` - planned Portfolio component set, asset location expectations, and feature-folder boundaries
- `_bmad-output/planning-artifacts/ux-design-specification.md` - `PortfolioContent`, `ProjectCard`, `TechBadge`, and `ExternalLinkButton` behavior requirements
- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md` - Epic 4 readiness review and cross-card verification note
- `_bmad-output/implementation-artifacts/3-2-skills-grid-with-skills-to-proof-mapping.md` - Story 3.2 handoff constraints and preserved `projectId` navigation behavior
- `docs/architecture.md`
- `package.json`
- `src/components/MainPage.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/common/BulletPoints.tsx`
- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/common/SkillBadge.tsx`
- `src/components/portfolio/PortfolioCard.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/data/personalData.tsx`
- `src/data/portfolioData.tsx`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `4-1-portfolio-content-layout-and-project-cards` as `ready-for-dev`
- Epic 4 status must move to `in-progress`
- Story package includes explicit screenshot asset handling requirements and a clear 4.1-versus-4.2 scope boundary

## Open Questions / Assumptions

- Assumption: if the new root-level `music-manager.png` and `raceday.png` files are adopted in Story 4.1, they replace the current tracked screenshot assets rather than creating parallel duplicates.
- Assumption: valid public GitHub repository URLs exist for each displayed portfolio project and must be added to the data contract during implementation, because the current dataset exposes only a single `href`.
- Assumption: a fresh WS-Portfolio-New screenshot will need to be captured locally during implementation because no replacement file currently exists in the workspace and the user confirmed the landing page changed.
- Assumption: broader URL normalization such as `mm.wsapz.com` remains owned by Story 4.2 unless it becomes necessary to avoid shipping a broken link in Story 4.1.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Implementation Plan

- Replace the existing `BulletPoints`-driven Portfolio overlay body with a single-column `ProjectCard` list while preserving Story 3.2's `selectedProjectId` ref, scroll, and focus flow.
- Introduce reusable `TechBadge` and `ExternalLinkButton` primitives in `src/components/common/` and keep the existing overlay shell, heading slot, and preview-card flow intact.
- Reshape `src/data/portfolioData.tsx` to hold summary, key features, tech stack, separate live-demo and GitHub URLs, and descriptive image metadata without changing stable `PortfolioProjectId` values.
- Refresh Portfolio screenshot assets under `src/assets/`, adopt the newer root-level Music Manager and RaceDay images, capture a new WS-Portfolio-New landing-page screenshot, and remove superseded duplicates.
- Validate with `npm run build`, `npm run dev`, live link checks, and browser-driven responsive/manual interaction checks before advancing the story to `review`.

### Debug Log References

- `python3 .agents/skills/bmad-init/scripts/bmad_init.py load --project-root /home/warrick/Dev/WS-Portfolio-New --all`
- `sed -n '1,220p' _bmad-output/project-context.md`
- `sed -n '1,240p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '540,620p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/3-2-skills-grid-with-skills-to-proof-mapping.md`
- `rg -n "portfolio/|PortfolioContent|ProjectCard|portfolioData|proof-to-skills|image-first|ExternalLinkButton|TechBadge" _bmad-output/planning-artifacts/architecture.md _bmad-output/planning-artifacts/ux-design-specification.md`
- `git log --oneline -5`
- `sed -n '1,260p' src/components/portfolio/PortfolioContent.tsx`
- `sed -n '1,260p' src/data/portfolioData.tsx`
- `find src/assets -maxdepth 2 -type f | sort`
- `sed -n '1,260p' src/components/common/renderChildDiv.tsx`
- `sed -n '1,320p' src/components/MainPage.tsx`
- `sed -n '1,260p' src/components/common/CardExpansionOverlay.tsx`
- `sed -n '1,260p' src/components/common/BulletPoints.tsx`
- `sed -n '1,220p' src/components/portfolio/PortfolioCard.tsx`
- `sed -n '1,260p' src/data/consolidatedProfile.tsx`
- `sed -n '1,260p' src/data/personalData.tsx`
- `rg -n "github.com/WarrickSmith|Music Manager|RaceDay|ws-portfolio|mm\\.wsapz|mm\\.warricksmith|raceday\\.wsapz" . -g '*.md' -g '*.ts' -g '*.tsx' -g '*.json'`
- `git status --short`
- `file music-manager.png raceday.png src/assets/music-manager.jpg src/assets/raceday.png src/assets/ws-portfolio.jpg`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `git remote -v`
- `curl -I -L --max-redirs 5 --connect-timeout 10 https://warricksmith.com https://mm.warricksmith.com https://mm.wsapz.com https://raceday.wsapz.com`
- `node /home/warrick/.nvm/versions/node/v24.12.0/lib/node_modules/@playwright/test/cli.js screenshot --device="Desktop Chrome" http://127.0.0.1:3001/ src/assets/ws-portfolio.png`
- `mv -f music-manager.png src/assets/music-manager.png && mv -f raceday.png src/assets/raceday.png && rm -f src/assets/music-manager.jpg src/assets/ws-portfolio.jpg`
- `npm run build`
- `npm run dev`
- `curl -I http://127.0.0.1:3000/`
- `node --input-type=module <<'EOF' ... browser-driven Playwright validation for desktop/tablet/mobile Portfolio layout, popup links, and About -> Portfolio focus flow ... EOF`
- `for url in https://warricksmith.com https://mm.warricksmith.com https://raceday.wsapz.com https://github.com/WarrickSmith/WS-Portfolio-New https://github.com/WarrickSmith/music-manager https://github.com/WarrickSmith/raceday; do curl -I -L --max-redirs 5 --connect-timeout 10 \"$url\"; done`
- `find . -maxdepth 1 \\( -name 'music-manager.png' -o -name 'raceday.png' \\) -print`
- `ls -l src/assets && file src/assets/music-manager.png src/assets/raceday.png src/assets/ws-portfolio.png`

### Completion Notes List

- `2026-04-05 13:39:53 NZST` - Prepared Story 4.1 with repo-grounded guidance for replacing the current `BulletPoints` Portfolio layout with `ProjectCard`, `TechBadge`, and `ExternalLinkButton` primitives while preserving Story 3.2 navigation targets.
- `2026-04-05 13:39:53 NZST` - Captured the screenshot reality in the story package: newer `music-manager.png` and `raceday.png` files already exist at repo root, and the WS-Portfolio-New landing-page screenshot must be refreshed because the user confirmed the UI changed.
- `2026-04-05 13:39:53 NZST` - Drew a hard scope line between Story 4.1's UI and minimum data-contract work versus Story 4.2's broader content-refresh responsibilities so the dev agent does not absorb both stories at once.
- `2026-04-05 13:56:36 NZST` - Began Story 4.1 implementation, updated sprint tracking to `in-progress`, and locked the execution plan to the existing overlay shell, stable project IDs, and tracked asset-only screenshot flow.
- `2026-04-05 14:06:26 NZST` - Replaced the Portfolio overlay grid with a semantic `ProjectCard` stack, kept Story 3.2's `selectedProjectId` scroll/focus path intact, and introduced reusable `TechBadge` and `ExternalLinkButton` primitives instead of the retired `BulletPoints` path.
- `2026-04-05 14:06:26 NZST` - Expanded `src/data/portfolioData.tsx` to separate live demo and GitHub URLs, richer summaries, key-feature lists, tech stacks, and descriptive image alt text while preserving stable `PortfolioProjectId` values.
- `2026-04-05 14:06:26 NZST` - Captured a fresh `src/assets/ws-portfolio.png` landing-page screenshot, moved the newer Music Manager and RaceDay screenshots into tracked `src/assets/` paths, and removed obsolete root-level and superseded JPG assets.
- `2026-04-05 14:06:26 NZST` - Validated with `npm run build`, `npm run dev`, browser-driven Playwright checks for desktop/tablet/mobile layout plus About-to-Portfolio regression coverage, and `curl` link verification showing HTTP 200 for all configured live demo and GitHub URLs.

### File List

- `_bmad-output/implementation-artifacts/4-1-portfolio-content-layout-and-project-cards.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/assets/music-manager.jpg` (deleted)
- `src/assets/music-manager.png`
- `src/assets/raceday.png`
- `src/assets/ws-portfolio.jpg` (deleted)
- `src/assets/ws-portfolio.png`
- `src/components/common/BulletPoints.tsx` (deleted)
- `src/components/common/ExternalLinkButton.tsx`
- `src/components/common/TechBadge.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/data/portfolioData.tsx`

### Review Findings

- [x] [Review][Decision] General "View My Repos on GitHub" link removed — Dismissed: per-card GitHub links sufficient. User confirmed intentional removal.
- [x] [Review][Defer] `key={feature}` / `key={technology}` fragile for duplicates [`ProjectCard.tsx`:50,57] — deferred, low risk with current unique sibling data
- [x] [Review][Defer] `marker:text-text-accent` may not propagate to bullets in Safari [`ProjectCard.tsx`:48] — deferred, browser inconsistency
- [x] [Review][Defer] Large unoptimized image assets (~1.26 MiB total) [`src/assets/`] — deferred, pre-existing asset pattern
- [x] [Review][Defer] ExternalLinkButton no guard for empty href [`ExternalLinkButton.tsx`:14] — deferred, required prop with complete current data

## Change Log

- `2026-04-05`: Story implementation started and sprint tracking moved from `ready-for-dev` to `in-progress`.
- `2026-04-05`: Implemented the ProjectCard-based Portfolio overlay, added `TechBadge` and `ExternalLinkButton`, expanded the portfolio data contract, refreshed tracked screenshots, removed the retired `BulletPoints` path, completed manual/browser validation, and advanced the story to `review`.
