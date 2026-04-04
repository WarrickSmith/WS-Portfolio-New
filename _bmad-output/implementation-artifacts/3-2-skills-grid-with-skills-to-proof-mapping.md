# Story 3.2: Skills Grid with Skills-to-Proof Mapping

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see a skills inventory where skills link to the portfolio projects that prove them,
so that I can verify claims with one click and build trust through evidence.

## Acceptance Criteria

1. The existing About Me card expansion flow remains the entry point. When card `3` expands, `AboutContent` continues to render inside the current overlay shell and keeps the shared heading -> body -> actions stagger provided by `OverlayContentGroup`.
2. The skills section in `AboutContent` is upgraded from static pills to a prominent upper-half skills grid that renders all technical skills from data using `SkillBadge` components (FR11).
3. `SkillBadge` supports two variants: `default` for non-linked skills and `linked` for skills with portfolio proof. The linked variant uses accent styling, descriptive `aria-label`, and keyboard-accessible interaction; the default variant remains presentational and non-interactive (UX-DR15, UX-DR22).
4. Skills are grouped or ordered logically from the data source, and the skills-to-project mapping is maintained in `src/data/` using stable skill IDs and project IDs rather than display-text matching.
5. Clicking or keyboard-activating a linked `SkillBadge` triggers cross-card navigation managed by `MainPage.tsx`: About Me closes with its full exit animation, the grid is briefly visible, Portfolio opens with its existing expansion animation, and the target project scrolls into view without a hard cut (FR13, AR19).
6. The current Portfolio overlay exposes stable DOM targets for project scroll/focus by project ID, but Story 3.2 does not absorb Story 4.1's full ProjectCard redesign. The implementation stays narrowly scoped to proof-link navigation.
7. The solution uses local component props/state and the existing overlay lifecycle. No Context, Redux, or other global state is introduced.
8. Skills with no proof mapping remain visible as non-linked badges. Skills with multiple proof targets store all linked project IDs in the data model, while Story 3.2 may navigate to the first linked project in display order to avoid premature multi-target UI scope.
9. Manual verification confirms linked badge activation works on desktop, tablet, and mobile; non-linked badges are inert; existing About and Portfolio close behavior remains intact; and the navigation target is rechecked after Epic 4 reshapes the Portfolio layout.

## Tasks / Subtasks

- [x] Task 1: Normalize the skills-to-proof data contract for stable IDs and future reuse (AC: 2, 3, 4, 8)
  - [x] Extend `src/data/personalData.tsx` skill entries to use a typed shape with a stable skill ID, display label, category/order metadata, and zero-or-more linked portfolio project IDs.
  - [x] Add stable project IDs to `src/data/portfolioData.tsx` so navigation never depends on project titles or array index order.
  - [x] Update `src/data/consolidatedProfile.tsx` so About content can consume the reshaped skills data without re-deriving proof mappings inside the component.

- [x] Task 2: Implement the reusable `SkillBadge` primitive and upgrade the About skills section (AC: 2, 3, 4)
  - [x] Create `src/components/common/SkillBadge.tsx` as the shared badge primitive for `default` and `linked` variants using the repo's Tailwind token system.
  - [x] Replace the current skills pill list in `src/components/about/AboutContent.tsx` with a grouped or clearly ordered `SkillBadge` grid that stays prominent in the upper half of the single-column Story 3.1 layout.
  - [x] Keep `OverlayContentGroup`, `SectionHeading`, and the current Story 3.1 visual hierarchy intact rather than rebuilding the About overlay structure.

- [x] Task 3: Wire cross-card navigation from About to Portfolio without breaking the overlay choreography (AC: 5, 7, 8)
  - [x] Extend the expanded-content prop flow so `MainPage.tsx` can pass an `onNavigateToProject(projectId)` callback into `AboutContent` and a selected project target into `PortfolioContent`.
  - [x] Use existing close/open lifecycle hooks (`closeRequestKey`, `onOverlayExitComplete`, `ExpandableItem`) to sequence close -> grid visible -> open instead of swapping cards directly.
  - [x] Preserve local ownership of card state in `MainPage.tsx`; do not move overlay selection state into global state or feature components.

- [x] Task 4: Add project target handling inside the current Portfolio implementation with minimal scope growth (AC: 5, 6, 8)
  - [x] Update `src/components/portfolio/PortfolioContent.tsx` to render stable project target wrappers keyed by project ID so a selected target can scroll into view after the Portfolio overlay opens.
  - [x] Keep the current `BulletPoints`-based Portfolio presentation unless a concrete blocker is discovered; Story 4.1 remains responsible for the broader ProjectCard redesign.
  - [x] If a mapped target cannot be found at runtime, fail gracefully by opening Portfolio without crashing. Keep the fallback narrow and developer-visible if logging is needed.

- [x] Task 5: Manually verify interaction, accessibility, and regression boundaries (AC: 3, 5, 6, 9)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev`.
  - [x] Verify desktop (`>=1000px`), tablet (`768px-999px`), and mobile (`<768px`) layouts keep the skills grid readable and prominent in the About overlay.
  - [x] Verify linked badges activate via click and keyboard, non-linked badges are non-interactive, and the Portfolio overlay scrolls to the expected project target.
  - [x] Verify About close button, Portfolio close button, backdrop close, and Escape handling still behave as before.

## Dev Notes

### Critical Story Guardrails

- Repo truth overrides stale planning remnants. The live codebase is Tailwind-first and does not use styled-components.
- Story 3.2 builds on Story 3.1's single-column About overlay. Do not regress that scannable layout or reintroduce the old dense cell-grid treatment.
- `MainPage.tsx` remains the single source of truth for which card is open. Cross-card navigation must be implemented through local state/callback orchestration there.
- Use the existing expansion lifecycle already in the repo. The correct implementation path is to let About finish closing before Portfolio opens; do not hard-switch `selectedId` from `3` to `4`.
- Story 3.2 should introduce `SkillBadge`, stable data IDs, and the minimum Portfolio target hooks needed for navigation. Do not pull Story 4.1's full ProjectCard/TechBadge/ExternalLinkButton redesign into this story.
- Keep `skills -> projectIds[]` as the source of truth in data. Do not infer mappings from skill labels, project titles, or DOM text.
- For linked badges, a button-like control is acceptable if it satisfies the planned `role="link"` and keyboard accessibility requirements while triggering in-app animated navigation.
- Skills with no proof mapping stay visible as `default` badges. Do not create dead links or placeholder destinations.
- Story 3.2 still does not own `ApproachContent` or a return of the Learning Adaptability section. That future scope remains with Story 4.3.
- No automated tests. Manual browser verification only.

### Repo Facts Discovered During Story Preparation

- `src/components/about/AboutContent.tsx` currently renders skills as a flat list of rounded `<li>` pills sourced from `consolidatedProfile.skills`. There is no grouping, no badge primitive, and no proof-link behavior yet.
- `src/data/personalData.tsx` currently defines each skill as `{ skill, stars }`. That shape is insufficient for stable grouping and project-proof mapping.
- `src/data/portfolioData.tsx` currently exports an untyped array of project tiles with `title`, `href`, `points`, and `image`, but no stable project IDs or internal navigation metadata.
- `src/components/portfolio/PortfolioContent.tsx` currently renders those projects through `BulletPoints` in a responsive grid. There are no scroll targets or selected-project props yet.
- `src/components/MainPage.tsx` already owns card state, body scroll locking, Escape handling, overlay resize syncing, and the handoff point for `onOverlayExitComplete`.
- `src/components/common/renderChildDiv.tsx` currently lazy-loads expanded content components with no prop contract. Story 3.2 likely needs a typed prop path for About and Portfolio expanded content.
- `src/components/common/CardExpansionOverlay.tsx` already provides the scrollable `max-w-[800px]` overlay container, so project-target scrolling should happen inside the existing shell rather than introducing a new overlay wrapper.
- `src/components/common/ExpandableItem.tsx` already supports close-request sequencing and exit-complete callbacks. That is the correct place to rely on animation completion, not ad hoc timeouts scattered through feature components.

### Architecture Compliance

- Use Tailwind utilities and tokens from `src/styles/main.css`; do not reintroduce styled-components or inline-style-heavy layout code.
- Keep `SkillBadge` in `src/components/common/` as a reusable primitive.
- Keep About-specific rendering logic in `src/components/about/` and Portfolio-specific target rendering logic in `src/components/portfolio/`.
- Keep all mapping source-of-truth data in `src/data/`.
- Preserve the current Epic 2 overlay infrastructure unless a concrete blocker is discovered: `MainPage.tsx`, `Card.tsx`, `ExpandableItem.tsx`, `CardExpansionOverlay.tsx`, and `DimmedBackdrop.tsx` are mature infrastructure.
- Respect feature boundaries: About does not import from Portfolio directly. Data and callback props are the integration seam.

### Likely Touch Points

- `src/components/about/AboutContent.tsx`
- `src/components/MainPage.tsx`
- `src/components/common/SkillBadge.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/data/personalData.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/data/portfolioData.tsx`

### Likely No-Touch Files Unless a Blocker Is Found

- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/namecard/NameCard.tsx`
- `src/components/common/AmbientBackground.tsx`

### Project Structure Notes

- There is a real planning-vs-repo gap here. Planning artifacts reference future components such as `ProjectCard`, `TechBadge`, and `ExternalLinkButton`, but the live repository still uses `BulletPoints` inside `PortfolioContent`.
- Story 3.2 should follow live repo truth and add only the smallest Portfolio changes required to support skills-to-proof navigation today.
- Preserve stable `skillId` and `projectId` values now so Stories 4.1 and 4.3 can reuse them instead of remapping later.
- `docs/component-inventory.md` still mentions Learning Adaptability inside `AboutContent`, but Story 3.1 intentionally removed that from the current overlay. Follow live source and the Story 3.1 artifact, not that stale doc line.

### Testing Requirements

- No automated testing framework. Do not add test files.
- Required verification:
  - `npm run build`
  - `npm run dev`
  - Manual browser checks on desktop, tablet, and mobile
- Manual checks:
  - The About skills area is visibly upgraded from passive pills to a structured badge grid without pushing key content below the fold unnecessarily
  - Linked badges are visibly distinct from default badges and expose clear accessible names
  - Clicking a linked badge closes About first, briefly reveals the grid state, then opens Portfolio and scrolls to the expected project
  - Keyboard activation of linked badges works and does not trap or lose focus unexpectedly
  - Non-linked badges remain inert and do not announce fake interactivity
  - Existing About and Portfolio close behavior still works via close button, backdrop, and Escape
  - Cross-card navigation target should be rechecked once Story 4.1 changes the Portfolio layout

### Cross-Story Intelligence

- Story 3.1 deliberately left a clean upper-half skills section for Story 3.2 to upgrade. Reuse that layout foundation rather than redesigning About from scratch again.
- Story 4.1 will redesign Portfolio into ProjectCards. Story 3.2 should therefore establish stable `projectId` anchors and minimal scroll-target handling that Story 4.1 must preserve.
- Story 4.3 depends on stable skill IDs for proof-to-skills reverse navigation. Introduce those IDs now so Epic 4 does not have to retrofit them later.
- The implementation-readiness report flags the Epic 3 / Epic 4 circular dependency. The pragmatic repo-grounded path is: Story 3.2 opens Portfolio and scrolls to the first mapped project target now, then Story 4.3 adds the reverse path later.
- Epic 2 already solved the overlay animation and shell behavior. Story 3.2 should be about data mapping, badge UI, and navigation orchestration, not new overlay infrastructure.

### Git Intelligence Summary

- Recent history shows Story 3.1 finished with a deliberate pattern: normalize data first, then update the About overlay, then tighten edge cases found in review.
- The most recent commits touched `AboutContent` and the profile data contract, which means Story 3.2 should extend those shapes carefully instead of replacing them.
- Nothing in recent git history suggests a need to reopen the core overlay infrastructure. That remains a stable dependency to build on.

### Latest Technical Information

- No external web research is required for Story 3.2. The implementation should follow the repo-pinned stack already in `package.json`: React `19.2.4`, Framer Motion `12.38.0`, Tailwind CSS `4.2.2`, Webpack `5.105.4`, and TypeScript `6.0.2`.
- Continue using the existing React.lazy + Suspense pattern from `renderChildDiv.tsx` for expanded content. Do not introduce a new loading architecture for this story.

### Project Context Reference

- `_bmad-output/project-context.md` is partially stale for this repo because it still describes styled-components as the primary styling approach.
- For Story 3.2, prefer current repo truth from `docs/architecture.md`, `package.json`, `src/styles/main.css`, and the live source files.
- The useful parts of project context that still apply are the manual-verification requirement, the feature-folder boundaries, and the caution against unnecessary global state.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 3 / Story 3.2 acceptance criteria, UX-DR15 linkage, and AR19 cross-card navigation sequence
- `_bmad-output/planning-artifacts/prd.md` - FR11 and FR13 requirements
- `_bmad-output/planning-artifacts/architecture.md` - planned `SkillBadge`, `MainPage` callback ownership, and cross-card navigation responsibilities
- `_bmad-output/planning-artifacts/ux-design-specification.md` - AboutMeContent and SkillBadge behavior requirements
- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md` - circular dependency warning and pragmatic fallback guidance
- `_bmad-output/implementation-artifacts/3-1-about-me-content-layout-and-profile-information.md` - Story 3.1 handoff boundaries and established About overlay foundation
- `docs/architecture.md`
- `docs/component-inventory.md`
- `package.json`
- `src/components/about/AboutContent.tsx`
- `src/components/MainPage.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/common/BulletPoints.tsx`
- `src/data/personalData.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/data/portfolioData.tsx`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `3-2-skills-grid-with-skills-to-proof-mapping` as `ready-for-dev`
- Epic 3 remains `in-progress`
- Story package includes repo-grounded guidance for stable skill/project IDs, scoped cross-card navigation wiring, and explicit Epic 4 dependency handling

## Open Questions / Assumptions

- Assumption: the current `PortfolioContent` tile layout is sufficient for Story 3.2 as long as each project gets a stable `projectId` target that Story 4.1 preserves during its redesign.
- Assumption: when a skill maps to multiple proof projects, Story 3.2 may navigate to the first linked project while preserving the full `projectIds[]` array for future richer UI.
- Assumption: skills without a valid mapped project in the shipped data remain `default` badges rather than interactive links.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `python3 .agents/skills/bmad-init/scripts/bmad_init.py load --project-root /home/warrick/Dev/WS-Portfolio-New --all`
- `sed -n '1,220p' _bmad/bmm/config.yaml`
- `sed -n '1,260p' _bmad-output/project-context.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/3-1-about-me-content-layout-and-profile-information.md`
- `sed -n '520,575p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '280,315p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '390,520p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '574,645p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '820,930p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '360,450p' _bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md`
- `sed -n '1,320p' src/components/about/AboutContent.tsx`
- `sed -n '1,340p' src/components/MainPage.tsx`
- `sed -n '1,320p' src/components/common/renderChildDiv.tsx`
- `sed -n '1,220p' src/components/common/SkillBadge.tsx`
- `sed -n '1,280p' src/components/common/BulletPoints.tsx`
- `sed -n '1,260p' src/components/common/CardExpansionOverlay.tsx`
- `sed -n '1,260p' src/components/common/ExpandableItem.tsx`
- `sed -n '1,340p' src/components/portfolio/PortfolioContent.tsx`
- `sed -n '1,320p' src/data/personalData.tsx`
- `sed -n '1,320p' src/data/consolidatedProfile.tsx`
- `sed -n '1,320p' src/data/portfolioData.tsx`
- `sed -n '1,260p' docs/architecture.md`
- `sed -n '1,200p' docs/component-inventory.md`
- `sed -n '1,260p' package.json`
- `git log --oneline -5`
- `git status --short`
- `git diff -- src/data/personalData.tsx src/data/consolidatedProfile.tsx src/data/portfolioData.tsx src/components/about/AboutContent.tsx src/components/common/SkillBadge.tsx src/components/common/renderChildDiv.tsx src/components/MainPage.tsx src/components/portfolio/PortfolioContent.tsx`
- `rg -n "Story 3\\.2|FR11|FR13|skills-to-proof|proof-to-skills|SkillBadge|cross-card navigation" _bmad-output/planning-artifacts/*.md`
- `rg -n "skills|projectId|proof|SkillBadge|TechBadge|scrollIntoView" src/components src/data docs -g '*.ts' -g '*.tsx' -g '*.md'`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `npm run build`
- `npm run dev`
- `curl -I http://localhost:3000/`
- `node /home/warrick/.nvm/versions/node/v24.12.0/lib/node_modules/@playwright/test/cli.js test ./tmp-story-3-2-XXXX.spec.cjs --reporter=line`
- `sed -n '1,320p' _bmad-output/implementation-artifacts/3-2-skills-grid-with-skills-to-proof-mapping.md`
- `sed -n '1,260p' src/components/common/SkillBadge.tsx`
- `git diff -- src/components/common/SkillBadge.tsx src/components/about/AboutContent.tsx src/components/MainPage.tsx src/components/common/renderChildDiv.tsx`
- `python3 -m http.server 3001 --directory dist`
- `curl -I http://127.0.0.1:3001/`
- `node /home/warrick/.nvm/versions/node/v24.12.0/lib/node_modules/@playwright/test/cli.js test ./tmp-story-3-2-review-XXXX.spec.cjs --reporter=line`

### Completion Notes List

- `2026-04-04 17:18:42 NZDT` - Story 3.2 context prepared with repo-grounded guidance for stable skill/project IDs, a scoped `SkillBadge` introduction, and cross-card navigation that builds on the existing overlay lifecycle instead of bypassing it.
- `2026-04-04 17:18:42 NZDT` - Story explicitly captures the Epic 3 / Epic 4 dependency risk and instructs the dev agent to preserve minimal Portfolio target hooks now while deferring the wider Portfolio redesign to Story 4.1.
- `2026-04-04 17:39:36 NZDT` - Normalized the profile and portfolio data contracts with stable `skillId` and `projectId` values, grouped skill metadata, and consolidated proof-link enrichment so About content consumes proof context without title matching.
- `2026-04-04 17:39:36 NZDT` - Added the reusable `SkillBadge` primitive, upgraded the About overlay to a grouped upper-half skills grid, and wired `MainPage` to sequence About close -> grid visible -> Portfolio open with local state only.
- `2026-04-04 17:39:36 NZDT` - Added stable Portfolio target wrappers with focus/scroll handling and validated runtime behavior with `npm run build`, `npm run dev`, `curl -I http://localhost:3000/`, and browser-driven Playwright checks covering desktop, tablet, mobile, click, keyboard, close button, backdrop, and Escape flows.
- `2026-04-04 19:41:13 NZDT` - Review follow-up pass confirmed the skills-position finding was not valid because the live About layout already places the skills grid before Experience and Education, preserving an upper-half placement without reordering the overlay.
- `2026-04-04 19:41:13 NZDT` - Addressed valid review items by removing the misleading `role="link"` semantics from linked `SkillBadge` buttons, tightening the badge prop contract so linked badges always require a handler and aria-label, and removing dead `expandedContent` metadata from `renderChildDiv.tsx`.
- `2026-04-04 19:41:13 NZDT` - Added a deliberate 150ms cross-card handoff pause after About closes so the grid state is perceptibly visible before Portfolio opens, then revalidated with `npm run build`, a temporary `dist` server on port `3001`, and browser-driven Playwright checks for semantics, transition gap, click/keyboard activation, and close/backdrop/Escape behavior.
- `2026-04-04 19:41:13 NZDT` - Completed the review workflow by resolving all review findings, closing the invalid skills-position decision as dismissed after source inspection, and syncing the story and sprint status from `review` to `done`.

### File List

- `_bmad-output/implementation-artifacts/3-2-skills-grid-with-skills-to-proof-mapping.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/components/MainPage.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/common/SkillBadge.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/data/personalData.tsx`
- `src/data/portfolioData.tsx`

## Change Log

- `2026-04-04`: Story created and marked `ready-for-dev`; Epic 3 advanced to `in-progress`; Story 3.1 advanced to `done`.
- `2026-04-04`: Began Story 3.2 implementation and marked sprint tracking `in-progress`.
- `2026-04-04`: Implemented Story 3.2 stable skill/project IDs, grouped `SkillBadge` skills grid, About -> Portfolio animated proof navigation, Portfolio project scroll targets, and runtime verification; story advanced to `review`.
- `2026-04-04`: Code review completed with 3 decision-needed, 2 patch, 5 defer, 16 dismissed.
- `2026-04-04`: Addressed valid Story 3.2 review findings by making linked badges semantically button-based, enforcing the linked badge prop contract, adding a deliberate inter-overlay pause, removing dead renderer metadata, and revalidating the interaction flow in-browser.
- `2026-04-04`: Completed the Story 3.2 review workflow; all actionable findings were resolved, one incorrect decision-needed finding was dismissed after inspection, and the story advanced to `done`.

### Review Findings

- [x] [Review][Decision] `role="link"` on `<button>` without `href` — resolved by choosing native button semantics for this in-app action and removing the misleading `role="link"` from linked `SkillBadge` buttons. `src/components/common/SkillBadge.tsx:30`
- [x] [Review][Decision] Cross-card navigation timing — resolved by adding a deliberate 150ms post-close delay so the card grid is perceptibly visible before Portfolio opens, satisfying the intended AC5 choreography. `src/components/MainPage.tsx:43`
- [x] [Review][Decision] Skills section not in "prominent upper-half" — dismissed after inspecting the live source; the skills section already renders before Experience and Education in the current About overlay. `src/components/about/AboutContent.tsx:140`
- [x] [Review][Patch] Dead `expandedContent` field on `CardDefinition` — resolved by removing the obsolete field, unused component type, and dead card metadata now that `renderExpandedCardContent()` is the only rendering path. `src/components/common/renderChildDiv.tsx:105`
- [x] [Review][Patch] Linked SkillBadge degrades to inert `<span>` when `onClick` absent — resolved by tightening the prop contract so the linked variant requires both `ariaLabel` and `onClick`, eliminating the invalid partial-linked state. `src/components/common/SkillBadge.tsx:12`
- [x] [Review][Defer] Missing key tech skills in data (React, TypeScript, Tailwind) — Portfolio bullets reference React, TypeScript, Tailwind, Next.js but no corresponding skill badges exist. Data completeness is a content decision outside story code scope. deferred, content decision
- [x] [Review][Defer] Race condition on rapid skill badge clicks — Multiple rapid clicks during close animation overwrite `pendingProjectNavigation`; last-clicked project wins. Acceptable behavior, no user-visible bug. deferred, acceptable behavior
- [x] [Review][Defer] useEffect cleanup cancels rAF but not pending state — Theoretical narrow window where effect cleanup cancels rAF but `pendingProjectNavigation` remains set. Extremely unlikely in practice. deferred, theoretical concern
- [x] [Review][Defer] PortfolioContent scrollIntoView fires on remount — If Suspense fallback triggers remount, scroll snaps back to the selected project. Unlikely in current architecture. deferred, unlikely
- [x] [Review][Defer] Skills section position pre-existing from Story 3.1 — Story 3.1 established the section order. 3.2 upgraded skills in-place without reordering. deferred, pre-existing layout from 3.1
