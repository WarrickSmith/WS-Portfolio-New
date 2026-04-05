# Story 4.2: Portfolio Data Update and Content Refresh

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As the site owner,
I want portfolio data updated with current projects, descriptions, and screenshots,
so that the portfolio accurately reflects my current skills and active work with no stale entries.

## Acceptance Criteria

1. Reservations is not present in `src/data/portfolioData.tsx`, and this story does not reintroduce it.
2. Tic Tac Toe is not present in `src/data/portfolioData.tsx`, and this story does not reintroduce it.
3. The Money Manager live demo URL is updated to `https://mm.wsapz.com`.
4. The RaceDay race page screenshot is captured fresh and replaces the tracked RaceDay image under `src/assets/`.
5. Every remaining portfolio entry has current copy covering project purpose, key features, and current tech stack.
6. Every live demo link resolves to a working application.
7. Every GitHub link resolves to a valid repository.
8. The portfolio remains owner-editable by changing `src/data/portfolioData.tsx` and tracked images under `src/assets/`, with no hardcoded per-project component logic.
9. Personal profile and skills-to-project mapping data stay editable via `src/data/personalData.tsx` and `src/data/consolidatedProfile.tsx`, and the mapping reflects the current project set without false proof links.
10. Stable `PortfolioProjectId` values continue to work with Story 3.2 navigation and remain compatible with Story 4.3.
11. The refreshed content remains scannable inside the existing Story 4.1 `ProjectCard` layout and does not pull reverse-navigation or Approach content into scope.

## Tasks / Subtasks

- [x] Task 1: Refresh the portfolio dataset without reopening Story 4.1 layout work (AC: 3, 5, 8, 10, 11)
  - [x] Update `src/data/portfolioData.tsx` copy for each remaining project so `summary`, `keyFeatures`, `techStack`, `liveDemoUrl`, and `imageAlt` reflect current reality.
  - [x] Change `music-manager` to `https://mm.wsapz.com`.
  - [x] Keep `PortfolioProjectId` values stable as `portfolio-site`, `music-manager`, and `race-day`.
  - [x] Preserve the existing `ProjectCard` data contract introduced in Story 4.1 rather than inventing a new model.

- [x] Task 2: Refresh the RaceDay screenshot in tracked assets only (AC: 4, 8)
  - [x] Capture a fresh screenshot of the live RaceDay race page and replace `src/assets/raceday.png` (or the tracked RaceDay asset path in use at implementation time).
  - [x] Update the RaceDay `imageAlt` text if the new screenshot content changes what the image shows.
  - [x] Keep asset management inside `src/assets/`; do not leave repo-root or duplicate screenshot files behind.

- [x] Task 3: Align skills-to-project proof data with the current portfolio set (AC: 8, 9, 10)
  - [x] Review `src/data/personalData.tsx` `projectIds` arrays and update them only where the current portfolio genuinely demonstrates the skill.
  - [x] Preserve `consolidatedProfile.tsx` as the derived mapping layer unless a concrete data mismatch requires a small supporting change.
  - [x] Keep primary proof ordering intentional: the first `projectIds` entry becomes the clickable target used by About skill badges.

- [x] Task 4: Preserve Story 4.1 UI behavior while validating refreshed content (AC: 6, 7, 10, 11)
  - [x] Keep `PortfolioContent.tsx`, `ProjectCard.tsx`, `TechBadge.tsx`, and `ExternalLinkButton.tsx` changes minimal and data-driven.
  - [x] Only touch component code if the refreshed content exposes a real bug or regression blocker such as duplicate list keys, invalid empty links, or layout breakage.
  - [x] Do not implement Story 4.3 proof-to-skills indicators or `ApproachContent` in this story.

- [x] Task 5: Manually verify links, screenshots, and navigation regressions (AC: 4, 6, 7, 8, 9, 10, 11)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev`.
  - [x] Verify the refreshed portfolio copy remains readable on desktop, tablet, and mobile inside the existing overlay.
  - [x] Verify each live demo and GitHub button opens a valid destination in a new tab.
  - [x] Verify Story 3.2 About-to-Portfolio navigation still scrolls to and focuses the correct project after data updates.
  - [x] Verify the new RaceDay screenshot renders correctly and matches the live product state.

## Dev Notes

### Critical Story Guardrails

- Story 4.1 already shipped the Portfolio overlay redesign. Story 4.2 is primarily a content, data, mapping, and screenshot refresh. Do not rebuild the overlay shell or card hierarchy.
- Reservations and Tic Tac Toe were already removed in Story 1.5. Treat their absence as a regression guard, not a new implementation task.
- `PortfolioProjectId` values must remain stable. Story 3.2 navigation and future Story 4.3 reverse links depend on those IDs, not on titles.
- `PortfolioContent.tsx` and `ProjectCard.tsx` already consume the full data contract from `src/data/portfolioData.tsx`. Prefer updating data over changing components.
- `ExternalLinkButton.tsx` assumes `href` is a valid non-empty string. Do not leave placeholder or blank URLs in `portfolioData.tsx`.
- `ProjectCard.tsx` currently keys `keyFeatures` and `techStack` by string value. Keep those sibling strings unique, or harden keying if refreshed content introduces duplicates.
- `consolidatedProfile.tsx` derives `linkedProjects`, `primaryProjectId`, and `primaryProjectAriaLabel` from `personalData.skills[].projectIds`. The order of `projectIds` is semantically meaningful because the first project becomes the clickable proof target in `AboutContent.tsx`.
- Keep the content scannable. The current UI is optimized for one summary paragraph plus a short key-features list per project, not long-form case studies.
- Do not expand scope into responsive image pipelines, `picture` markup, CMS behavior, or Story 4.3 navigation UI.

### Repo Facts Discovered During Story Preparation

- `src/data/portfolioData.tsx` already contains only three projects: `portfolio-site`, `music-manager`, and `race-day`.
- `music-manager` still points to `https://mm.warricksmith.com` in the repo and is the clearest required 4.2 data change.
- `src/assets/` currently contains `music-manager.png`, `raceday.png`, `warrick.jpg`, and `ws-portfolio.png`. There are no stray portfolio screenshots at repo root.
- Story 4.1 already refreshed `ws-portfolio.png` and moved the current Music Manager and RaceDay screenshots into tracked source control paths.
- `PortfolioContent.tsx` still owns the ref registration and `scrollIntoView()` plus `focus()` behavior used by Story 3.2 About-to-Portfolio navigation.
- `AboutContent.tsx` turns a skill badge into a clickable proof link only when `primaryProjectId` and `primaryProjectAriaLabel` exist, which comes from `consolidatedProfile.tsx`.
- The current portfolio component path is Tailwind-first. `_bmad-output/project-context.md` is partially stale because it still claims styled-components is the primary styling approach.

### Technical Requirements

- Repo-pinned stack from `package.json`: React `19.2.4`, Framer Motion `12.38.0`, Tailwind CSS `4.2.2`, Webpack `5.105.4`, TypeScript `6.0.2`, Node `>=24`.
- Preserve the existing `?url` asset-import pattern in `src/data/portfolioData.tsx` unless a concrete build issue requires a different import shape.
- Keep the Story 4.1 `ProjectCard` contract intact: `title`, `summary`, `keyFeatures`, `techStack`, `liveDemoUrl`, `githubUrl`, `image`, and `imageAlt`.
- Content-management requirements FR40-FR42 are satisfied through `src/data/` and `src/assets/`; do not introduce a new persistence or configuration layer.

### Testing Requirements

- No automated testing framework. Do not add test files or install Jest, Vitest, or similar tooling.
- Verification is manual: `npm run build`, `npm run dev`, browser checks, and direct link validation.
- Re-run live link checks for all configured project URLs after the data refresh so the story closes with current evidence, not assumptions.
- Confirm refreshed content still fits the Story 4.1 single-column `ProjectCard` layout at desktop, tablet, and mobile breakpoints.

### Previous Story Intelligence

- Story 4.1 established the entire Portfolio presentation layer and explicitly deferred the broader content refresh to Story 4.2.
- Story 4.1 already validated the existing public destinations and confirmed `music-manager`, `race-day`, and `portfolio-site` project IDs are the active set.
- Story 4.1 review notes deferred two data-sensitive issues:
  - `ProjectCard.tsx` uses `key={feature}` and `key={technology}`, which is low risk only while sibling values stay unique.
  - `ExternalLinkButton.tsx` has no empty-`href` guard, which is acceptable only while all portfolio URL fields remain complete.

### Git Intelligence Summary

- Recent commits show the repo just completed Story 4.1:
  - `917c76e docs: mark story 4.1 done and record review findings with deferred items (story 4.1)`
  - `987e298 feat: replace BulletPoints grid with ProjectCard-driven portfolio overlay (story 4.1)`
  - `0643e9e chore: refresh portfolio screenshots from JPG to PNG (story 4.1)`
- Follow those established patterns: data-first changes, tracked asset replacements, and explicit manual verification before advancing status.

### Latest Technical / Live Validation

- As of `2026-04-05`, the following URLs returned `HTTP 200` during story preparation:
  - `https://warricksmith.com`
  - `https://ws.wsapz.com`
  - `https://mm.warricksmith.com`
  - `https://mm.wsapz.com`
  - `https://raceday.wsapz.com`
  - `https://github.com/WarrickSmith/WS-Portfolio-New`
  - `https://github.com/WarrickSmith/music-manager`
  - `https://github.com/WarrickSmith/raceday`
- Story acceptance still requires the repo data to point Money Manager at `https://mm.wsapz.com`, even though both Music Manager domains currently respond.

### Project Context Reference

- `_bmad-output/project-context.md` remains useful for manual-verification expectations, local-state ownership, and feature-folder boundaries.
- Ignore its styled-components guidance for this story; live repo truth is Tailwind-first and already reflects the post-migration architecture.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 4 / Story 4.2 acceptance criteria and Epic 4 scope boundaries
- `_bmad-output/planning-artifacts/prd.md` - portfolio refresh goals, stale-project removal history, and domain-transition context
- `_bmad-output/planning-artifacts/architecture.md` - FR40-FR42 content-management boundaries and cross-card navigation ownership
- `_bmad-output/planning-artifacts/ux-design-specification.md` - `PortfolioContent`, `ProjectCard`, `TechBadge`, and `ExternalLinkButton` content expectations
- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md` - Epic 4 readiness notes on domain transition and RaceDay screenshot refresh
- `_bmad-output/implementation-artifacts/1-5-styled-components-removal-and-dead-code-cleanup.md` - prior removal of Reservations and Tic Tac Toe plus asset cleanup expectations
- `_bmad-output/implementation-artifacts/3-2-skills-grid-with-skills-to-proof-mapping.md` - proof-link behavior and cross-card navigation dependency
- `_bmad-output/implementation-artifacts/4-1-portfolio-content-layout-and-project-cards.md` - Story 4.1 scope boundary, deferred review items, and current Portfolio component contract
- `package.json`
- `src/components/about/AboutContent.tsx`
- `src/components/common/ExternalLinkButton.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/data/personalData.tsx`
- `src/data/portfolioData.tsx`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `4-2-portfolio-data-update-and-content-refresh` as `ready-for-dev`
- Epic 4 remains `in-progress`
- Story package is scoped to data, mapping, and screenshot refresh work, with Story 4.1 UI preserved and Story 4.3 explicitly out of scope

## Open Questions / Assumptions

- Assumption: `portfolio-site` remains on `https://warricksmith.com` for this story because Story 4.2 acceptance criteria only require the Money Manager URL cutover, even though `https://ws.wsapz.com` also responds successfully as of `2026-04-05`.
- Assumption: the current three-project set remains the active portfolio set for Story 4.2, so no new `PortfolioProjectId` values need to be introduced here.
- Assumption: `consolidatedProfile.tsx` will remain purely derived from `personalData.tsx` and `portfolioData.tsx`; only minimal supporting changes should be made if a real mapping bug is discovered.
- Assumption: the new RaceDay screenshot should replace the existing tracked file path rather than introducing a second asset and import churn.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Implementation Plan

- Refresh `src/data/portfolioData.tsx` with current copy, current tech stacks, and the required Music Manager URL normalization while keeping the Story 4.1 component contract intact.
- Capture and replace the RaceDay screenshot in `src/assets/`, then align `imageAlt` text and any related content to the updated visual.
- Review `src/data/personalData.tsx` skill `projectIds` so proof links match the current portfolio honestly, preserving `consolidatedProfile.tsx` as the derivation layer.
- Validate by building, running the dev server, checking responsive readability, rechecking outbound URLs, and confirming Story 3.2 project navigation still lands correctly.

### Debug Log References

- `python3 .agents/skills/bmad-init/scripts/bmad_init.py load --project-root /home/warrick/Dev/WS-Portfolio-New --all`
- `sed -n '1,260p' _bmad-output/project-context.md`
- `sed -n '1,260p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '560,660p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '1,260p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '820,940p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '140,190p' _bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/4-1-portfolio-content-layout-and-project-cards.md`
- `sed -n '40,80p' _bmad-output/implementation-artifacts/1-5-styled-components-removal-and-dead-code-cleanup.md`
- `sed -n '180,220p' _bmad-output/implementation-artifacts/1-5-styled-components-removal-and-dead-code-cleanup.md`
- `git log --oneline -5`
- `git status --short`
- `sed -n '1,240p' package.json`
- `sed -n '1,260p' src/data/portfolioData.tsx`
- `sed -n '1,320p' src/data/personalData.tsx`
- `sed -n '1,260p' src/data/consolidatedProfile.tsx`
- `sed -n '1,220p' src/components/portfolio/PortfolioContent.tsx`
- `sed -n '1,220p' src/components/portfolio/ProjectCard.tsx`
- `sed -n '1,220p' src/components/common/ExternalLinkButton.tsx`
- `sed -n '140,210p' src/components/about/AboutContent.tsx`
- `find src/assets -maxdepth 2 -type f | sort`
- `rg -n "Reservations|Tic Tac Toe|TicTacToe|tic tac toe|reservations" src docs _bmad-output -g '*.ts' -g '*.tsx' -g '*.md'`
- `rg -n "mm\\.warricksmith\\.com|mm\\.wsapz\\.com|raceday\\.wsapz\\.com|warricksmith\\.com" src docs _bmad-output -g '*.ts' -g '*.tsx' -g '*.md'`
- `for url in https://warricksmith.com https://ws.wsapz.com https://mm.warricksmith.com https://mm.wsapz.com https://raceday.wsapz.com https://github.com/WarrickSmith/WS-Portfolio-New https://github.com/WarrickSmith/music-manager https://github.com/WarrickSmith/raceday; do curl -I -L --max-redirs 5 --connect-timeout 10 "$url"; done`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `curl -s https://api.github.com/repos/WarrickSmith/music-manager | sed -n '1,120p'`
- `curl -s https://api.github.com/repos/WarrickSmith/raceday | sed -n '1,120p'`
- `curl -L -s https://raw.githubusercontent.com/WarrickSmith/music-manager/main/README.md | sed -n '1,220p'`
- `curl -L -s https://raw.githubusercontent.com/WarrickSmith/raceday/main/README.md | sed -n '1,220p'`
- `curl -L -s https://raw.githubusercontent.com/WarrickSmith/music-manager/main/package.json | sed -n '1,220p'`
- `curl -L -s https://raw.githubusercontent.com/WarrickSmith/raceday/main/client/package.json | sed -n '1,220p'`
- `curl -L -s https://raceday.wsapz.com | rg -n "race|meeting|R[0-9]+|Meetings|Australia|New Zealand" | sed -n '1,160p'`
- `node --input-type=module <<'EOF' ... Playwright probe for RaceDay live meetings view and Go to Race flow ... EOF`
- `npm run build`
- `npm run dev`
- `curl -I http://127.0.0.1:3000/ | sed -n '1,8p'`
- `node --input-type=module <<'EOF' ... Playwright validation for desktop/tablet/mobile Portfolio layout, outbound link wiring, and About -> Portfolio focus flow ... EOF`

### Completion Notes List

- `2026-04-05 19:10:33 NZST` - Prepared Story 4.2 against live repo truth, preserving Story 4.1's Portfolio UI and focusing this package on data refresh, URL normalization, screenshot replacement, and skills-to-project mapping cleanup.
- `2026-04-05 19:10:33 NZST` - Captured the key reality that Reservations and Tic Tac Toe were already removed in Story 1.5, so Story 4.2 treats them as regression guards rather than new work.
- `2026-04-05 19:10:33 NZST` - Verified during story preparation that both Music Manager domains, both portfolio domains, RaceDay, and all three GitHub repositories returned `HTTP 200`, while still locking Story 4.2 to the required `mm.wsapz.com` repo-data update.
- `2026-04-05 19:10:33 NZST` - Carried forward the most relevant Story 4.1 deferred review items: keep `keyFeatures` and `techStack` entries unique unless keying is hardened, and do not leave any portfolio URL field blank because `ExternalLinkButton` assumes a valid destination.
- `2026-04-05 19:30:01 NZST` - Refreshed `src/data/portfolioData.tsx` copy for all three projects, updated Music Manager to `https://mm.wsapz.com`, and aligned summaries, feature bullets, tech stacks, and alt text with current live/demo reality while preserving the Story 4.1 `ProjectCard` contract.
- `2026-04-05 19:30:01 NZST` - Updated `src/data/personalData.tsx` proof mappings so `Docker` links to `portfolio-site` and `Git / GitHub` links to the current three-project portfolio set without reopening the derived mapping layer in `consolidatedProfile.tsx`.
- `2026-04-05 19:30:01 NZST` - User clarified that the `music-manager` and `raceday` screenshots were already refreshed in Story 4.1, so Story 4.2 treated screenshot work as verification-only, confirmed the tracked `src/assets/raceday.png` race-page asset remained current, and left the existing tracked screenshots in place.
- `2026-04-05 19:30:01 NZST` - Validated with `npm run build`, `npm run dev`, browser-driven checks across desktop, tablet, and mobile for Portfolio readability, link wiring, and Story 3.2 About-to-Portfolio focus on `portfolio-project-music-manager`, plus `curl -I -L` returning `HTTP 200` for all configured live demo and GitHub URLs.

### File List

- `_bmad-output/implementation-artifacts/4-2-portfolio-data-update-and-content-refresh.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/data/portfolioData.tsx`
- `src/data/personalData.tsx`

### Review Findings

- [x] [Review][Decision] AC4 — RaceDay screenshot not captured fresh in this story. Owner confirmed Story 4.1 capture satisfies AC4. Resolved — no action needed.
- [x] [Review][Decision] Server Actions removed from Music Manager techStack — content accuracy? Owner confirmed shadcn/ui + React Hook Form are the more accurate current tech. Resolved — replacement is correct.
- [x] [Review][Defer] Duplicate React key fragility in keyFeatures/techStack [`ProjectCard.tsx:50,57`] — deferred, pre-existing from Story 4.1. Not worsened by this diff.
- [x] [Review][Defer] ExternalLinkButton has no empty-href guard [`ExternalLinkButton.tsx:14`] — deferred, pre-existing from Story 4.1. Current data has all URLs populated.
- [x] [Review][Defer] consolidatedProfile silently swallows invalid projectIds [`consolidatedProfile.tsx:54-56`] — deferred, pre-existing. TS PortfolioProjectId union catches typos at compile time.

## Change Log

- `2026-04-05`: Began Story 4.2 implementation and moved sprint tracking to `in-progress`.
- `2026-04-05`: Refreshed portfolio copy and tech-stack metadata, cut Music Manager over to `https://mm.wsapz.com`, added current Docker and Git/GitHub proof mappings, verified the Story 4.1 screenshots remained current after user clarification, and advanced the story to `review`.
