# Story 4.3: Proof-to-Skills Reverse Navigation and Approach Content

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to navigate from a portfolio project back to the skills it demonstrates and view the developer's approach,
so that I can see the connection between delivered work and claimed expertise, and understand the working methodology.

## Acceptance Criteria

1. Each `ProjectCard` renders a clearly labeled set of linked skill indicators derived from the existing skills-to-project mapping, and those indicators are visually distinct from the non-interactive `TechBadge` row.
2. Clicking or keyboard-activating a proof-to-skills indicator while the Portfolio overlay is open triggers the established cross-card sequence: Portfolio closes with its exit animation, the grid is briefly visible, About opens, and the relevant skill target scrolls into view and receives focus without a hard cut.
3. Reverse navigation keys off stable skill IDs from `src/data/personalData.tsx`; the implementation never matches by rendered label text, project title, or DOM text.
4. `AboutContent` exposes stable DOM targets for the selected skill badge, or gracefully falls back to the containing skill-group section if a per-badge target cannot be reached. Missing targets never crash the page and only log a warning in non-production.
5. An `ApproachContent` component renders when the My Approach card is expanded, showing a heading, methodology/process description, and adaptability statement using the same overlay composition quality bar as the existing expanded cards.
6. Approach copy is data-driven from `src/data/personalData.tsx` and/or `src/data/consolidatedProfile.tsx`; do not hardcode long-form process content directly inside the component.
7. Existing Contact behavior remains intact unless the card map is intentionally expanded to accommodate a dedicated My Approach entry point. This story must not silently replace `Get In Touch` just to make room for Approach.
8. Manual verification covers desktop, tablet, and mobile; click and keyboard activation; close button, backdrop, and Escape behavior; and a final bidirectional-navigation check after both Epics 3 and 4 are complete, per the implementation-readiness guidance.

## Tasks / Subtasks

- [x] Task 1: Derive reverse proof mapping from the existing skills data without introducing a second source of truth (AC: 1, 3)
  - [x] Build the per-project related-skills list from `personalData.skills[].projectIds` via `consolidatedProfile.tsx` or a nearby derived helper rather than duplicating mappings inside `portfolioData.tsx`.
  - [x] Preserve the existing `projectIds` ordering semantics from Story 3.2. Reverse links use project membership, not reordered "primary proof" arrays.
  - [x] Keep `TechBadge` non-interactive. Proof-to-skills indicators must be a separate UI element.

- [x] Task 2: Render related-skill indicators inside the Portfolio experience (AC: 1, 2, 3)
  - [x] Add a labeled related-skills section to `ProjectCard.tsx` using `SkillBadge` linked styling or a dedicated equivalent that still reads as a Tier 1 in-app action.
  - [x] Keep the existing `ProjectCard` semantic `<article>` structure, external-link buttons, and hover treatment intact.
  - [x] Preserve `PortfolioContent.tsx` project ref registration and selected-project focus behavior from Stories 3.2 and 4.1.

- [x] Task 3: Wire reverse cross-card navigation in `MainPage.tsx`, `renderChildDiv.tsx`, and `AboutContent.tsx` (AC: 2, 3, 4, 8)
  - [x] Extend the current local-state navigation flow with `pendingSkillNavigation` and `selectedSkillId` state, mirroring the existing `pendingProjectNavigation` / `selectedProjectId` pattern.
  - [x] Reuse or generalize `CROSS_CARD_NAVIGATION_DELAY_MS` so both navigation directions share the same close -> grid -> open beat.
  - [x] Register stable refs and focusable targets in `AboutContent.tsx` for linked skill badges or their wrappers so the opened About overlay can call `scrollIntoView()` and `focus()` safely.
  - [x] If the requested skill target cannot be found, open About anyway and emit only a dev-only warning.

- [x] Task 4: Reconcile and implement the My Approach entry point (AC: 5, 6, 7)
  - [x] Create `src/components/approach/ApproachContent.tsx` and a matching preview component only after reconciling how a My Approach card fits into the live card map.
  - [x] Preferred path: introduce a dedicated `ApproachCard` preview rather than repurposing `ContactCard`.
  - [x] If a new interactive card is added, audit `CardGrid.tsx`, the `cards` registry in `renderChildDiv.tsx`, and `MainPage.tsx` assumptions about card count, IDs, and responsive layout.
  - [x] Use `personalData.learningAdaptability` as the seed for the adaptability section and add only the minimum extra structured copy needed for methodology/process content.

- [x] Task 5: Manually verify interaction, focus, and regression boundaries (AC: 2, 4, 5, 7, 8)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev`.
  - [x] Verify every ProjectCard renders related-skill indicators that are distinct from the tech-stack badges.
  - [x] Verify click and keyboard activation perform Portfolio close -> grid visible beat -> About open -> target skill scroll/focus without a hard cut.
  - [x] Verify Story 3.2 About-to-Portfolio navigation still works after reverse-navigation state is added.
  - [x] Verify close button, backdrop click, Escape handling, body scroll locking, and focus return still behave correctly.
  - [x] If My Approach is made reachable in this story, verify it opens from its own preview entry point and its content staggers in consistently with the other expanded cards.
  - [x] Recheck the full bidirectional navigation contract once both Epic 3 and Epic 4 flows are present.

## Dev Notes

### Critical Story Guardrails

- Live repo truth overrides planning drift. The app currently has 5 cards total and only 3 interactive overlays: About, Portfolio, and Contact.
- `CardGrid.tsx` is a fixed 3x2 desktop grid with Card 1 spanning the left column across two rows. There is no spare slot for a sixth card without layout changes.
- `renderChildDiv.tsx` currently lazy-loads only `AboutContent`, `PortfolioContent`, and `ContactContent`. `ApproachContent` does not exist in the live repo.
- `MainPage.tsx` currently supports only project-directed cross-card navigation (`pendingProjectNavigation`, `selectedProjectId`). Story 4.3 must extend this pattern rather than inventing a second navigation system.
- `TechBadge` is explicitly non-interactive per UX-DR16. Reverse proof links must not be implemented as clickable tech-stack chips.
- `SkillBadge` linked variant is currently a `button` with a descriptive `aria-label`, not `role="link"`. Preserve the Story 3.2 review decision rather than reintroducing misleading semantics.
- `personalData.skills[].projectIds` is the single source of truth for proof mapping. `consolidatedProfile.tsx` should remain the derivation layer.
- Keep `projectIds` ordering semantically meaningful. Story 3.2 uses the first project as the About-to-Portfolio target; reverse links should derive related skills by inclusion, not by reordering arrays.
- `learningAdaptability` data already exists and was intentionally deferred from Stories 3.1 and 3.2 for future Approach scope.
- No automated tests. Manual browser verification only.

### Repo Facts Discovered During Story Preparation

- `src/components/portfolio/ProjectCard.tsx` currently renders only screenshot, summary, key features, `TechBadge` row, and external-link buttons.
- `src/components/portfolio/PortfolioContent.tsx` already maintains project refs keyed by `PortfolioProjectId` and warns in development if a selected project target cannot be found.
- `src/components/about/AboutContent.tsx` renders grouped skills but does not currently register per-skill refs or accept a selected skill target.
- `src/data/consolidatedProfile.tsx` already enriches each skill with `linkedProjects`, `primaryProjectId`, and accessible label text. It does not yet expose a reverse mapping per project.
- `src/data/personalData.tsx` already contains `learningAdaptability`, but no dedicated `approach` copy block.
- `src/components/common/OverlayContentGroup.tsx` already provides heading/body/actions stagger timing and reduced-motion fallback that Approach content should reuse.
- `docs/architecture.md` documents a five-card layout with Card 5 reserved for Contact. This conflicts with planning references to a My Approach card.
- `CardPreview` is the existing preview primitive for interactive cards. Any new Approach preview should use it for consistency.

### Architecture Compliance

- Use Tailwind utilities and tokens from `src/styles/main.css`; do not reintroduce styled-components or inline-style-heavy layout code.
- Keep reverse-navigation orchestration in `MainPage.tsx` and prop plumbing in `renderChildDiv.tsx`.
- Keep About target handling in `src/components/about/` and Portfolio proof-link rendering in `src/components/portfolio/`.
- Keep reusable interactive badge primitives in `src/components/common/`.
- Keep content and mapping source-of-truth in `src/data/`.
- Preserve the existing overlay infrastructure: `Card`, `ExpandableItem`, `CardExpansionOverlay`, `DimmedBackdrop`, and `OverlayContentGroup` are mature dependencies.

### Likely Touch Points

- `src/components/MainPage.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/common/SkillBadge.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/data/personalData.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/components/common/CardGrid.tsx`
- `src/components/common/CardPreview.tsx`
- `src/components/contact/ContactCard.tsx`
- `src/components/approach/` (new)

### Likely No-Touch Files Unless a Blocker Is Found

- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/common/ExternalLinkButton.tsx`
- `src/components/common/TechBadge.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/namecard/NameCard.tsx`

### Project Structure Notes

- There is a real planning-versus-repo mismatch here: planning artifacts expect `ApproachContent`, but the live app ships only About, Portfolio, and Contact overlays.
- Story 4.3 is therefore partly a feature implementation story and partly a card-map reconciliation story. Do not hide that scope expansion from the dev agent.
- The reverse-navigation half can build directly on the Story 3.2 close -> grid -> open pattern. The Approach half may require layout and registry changes before any content component is reachable.
- Because the desktop grid is already saturated, adding a new interactive card likely means revisiting grid geometry or card allocation instead of only dropping in a new component file.

### Technical Requirements

- Repo-pinned stack from `package.json`: React `19.2.4`, Framer Motion `12.38.0`, Tailwind CSS `4.2.2`, Webpack `5.105.4`, TypeScript `6.0.2`, Node `>=24`.
- Continue using `React.lazy` in `renderChildDiv.tsx` for expanded card content and `OverlayContentGroup` for staged entry animation.
- Follow the existing dev-only warning pattern `if (process.env.NODE_ENV !== 'production') console.warn(...)`.
- Preserve semantic HTML: `ProjectCard` remains an `<article>`, reverse-navigation controls should be keyboard-activatable buttons, and targetable About skill wrappers must remain accessible.
- Keep all navigation state local to `MainPage.tsx`; do not introduce Context, Redux, or global stores.
- Preserve current `PortfolioProjectId` values and current `skill.id` strings; reverse navigation must key off those stable identifiers.

### Testing Requirements

- No automated testing framework. Do not add test files.
- Required verification:
  - `npm run build`
  - `npm run dev`
  - Manual browser checks on desktop, tablet, and mobile
- Manual checks:
  - Related-skill indicators render for each project and are visually distinct from tech-stack badges.
  - Clicking or keyboard-activating a related-skill indicator performs Portfolio close -> grid visible beat -> About open -> scroll/focus to target skill without a hard cut.
  - Missing target handling opens About safely and does not crash the page.
  - About-to-Portfolio navigation from Story 3.2 still works after reverse-navigation state is added.
  - Close button, backdrop click, Escape, body scroll locking, and focus return still behave correctly.
  - If My Approach is made reachable in this story, its preview card opens and closes with the same overlay quality bar as the other interactive cards.
  - Full bidirectional navigation is rechecked once both Epic 3 and Epic 4 features are present, per the implementation-readiness recommendation.

### Previous Story Intelligence

- Story 3.1 intentionally removed the Learning Adaptability block from About and deferred it to future `ApproachContent`.
- Story 3.2 established stable `skill.id` and `projectId` values, introduced `SkillBadge`, and added the generic close -> grid -> open cross-card choreography from About to Portfolio.
- Story 4.1 established the `ProjectCard` layout and separate `TechBadge` / `ExternalLinkButton` primitives.
- Story 4.2 refreshed portfolio copy and explicitly kept reverse proof links and Approach content out of scope.
- Deferred review notes already capture that `learningAdaptability` is present but unused, and that `TechBadge` / link behavior should not be broadened casually.

### Git Intelligence Summary

- Recent Epic 4 commits were narrow and data-first:
  - `987e298 feat: replace BulletPoints grid with ProjectCard-driven portfolio overlay (story 4.1)`
  - `732da4c feat: refresh portfolio copy, tech stacks, and skills-to-project proof mappings (story 4.2)`
  - `a62fd52 docs: mark story 4.2 done and record review findings with deferred items (story 4.2)`
- Follow that pattern: preserve existing UI primitives where possible, keep mapping logic data-driven, and isolate scope expansion to the card-map reconciliation required for Approach.

### Latest Technical Information

- No external web research is required for Story 4.3. Use the repo-pinned versions already declared in `package.json`.
- The most relevant runtime conventions are already live in source: `React.lazy` + `Suspense` in `renderChildDiv.tsx`, Framer Motion spring-based overlay transitions in `ExpandableItem.tsx`, and staggered content entry in `OverlayContentGroup.tsx`.

### Project Context Reference

- `_bmad-output/project-context.md` is partially stale because it still references styled-components. Ignore that portion for this story.
- The still-useful project-context rules are manual verification, local state ownership, feature-folder boundaries, and avoiding unnecessary global state.
- Live repo truth from `docs/architecture.md`, `package.json`, and current source files should win whenever planning artifacts drift.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 4 / Story 4.3 acceptance criteria and UX-DR14 reference
- `_bmad-output/planning-artifacts/prd.md` - FR19 proof-to-skills requirement
- `_bmad-output/planning-artifacts/architecture.md` - FR15-FR19 mapping, cross-card navigation ownership, and overlay expansion rules
- `_bmad-output/planning-artifacts/ux-design-specification.md` - PortfolioContent, ProjectCard, ApproachContent, SkillBadge, and TechBadge behavior expectations
- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md` - circular dependency note and verification guidance
- `_bmad-output/implementation-artifacts/3-1-about-me-content-layout-and-profile-information.md` - deferred adaptability / Approach scope
- `_bmad-output/implementation-artifacts/3-2-skills-grid-with-skills-to-proof-mapping.md` - stable skill/project IDs and existing cross-card navigation pattern
- `_bmad-output/implementation-artifacts/4-1-portfolio-content-layout-and-project-cards.md` - ProjectCard / TechBadge scope boundary
- `_bmad-output/implementation-artifacts/4-2-portfolio-data-update-and-content-refresh.md` - explicit deferral of reverse links and Approach content
- `_bmad-output/implementation-artifacts/deferred-work.md` - unused `learningAdaptability` note for future Story 4.3
- `docs/architecture.md`
- `package.json`
- `src/components/MainPage.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/common/CardGrid.tsx`
- `src/components/common/CardPreview.tsx`
- `src/components/common/OverlayContentGroup.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/common/SkillBadge.tsx`
- `src/components/contact/ContactCard.tsx`
- `src/components/portfolio/PortfolioCard.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/data/personalData.tsx`
- `src/data/portfolioData.tsx`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `4-3-proof-to-skills-reverse-navigation-and-approach-content` as `ready-for-dev`
- Epic 4 remains `in-progress`
- Story package explicitly captures the live card-map mismatch so the dev agent does not discover it mid-implementation
- Verification note: bidirectional cross-card navigation is considered fully validated only after both Epics 3 and 4 flows are present

## Open Questions / Assumptions

- Assumption: proof-to-skills indicators should be derived from `skills[].projectIds` membership, not a second mapping stored in `portfolioData.tsx`.
- Assumption: reverse navigation should land on the specific linked skill badge when possible, and fall back to the containing skill-group section only if per-badge targeting becomes impractical.
- Assumption: the existing `learningAdaptability` entries seed the adaptability portion of Approach content, with only minimal new structured copy added if process / methodology narrative is missing.
- Open question: the live app has no slot for a dedicated My Approach card. If product intent still requires it, implementation must add or reallocate a card without sacrificing Contact or the current five-card identity.
- Open question: some portfolio projects demonstrate skills not currently listed in `personalData.skills` (for example React, TypeScript, Tailwind). If the desired reverse-link set is broader than the current skills inventory, that is a content-expansion decision and should be handled deliberately rather than inferred from tech-stack chips.
- Assumption: Story 3.2's primary-project ordering semantics remain unchanged even if a reverse link lands on a skill whose forward badge points to a different primary project.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Implementation Plan

- Derive per-project related skills from the existing skills data and render those links inside `ProjectCard` without disturbing the non-interactive tech-stack row.
- Extend `MainPage.tsx`, `renderChildDiv.tsx`, and `AboutContent.tsx` to support `selectedSkillId` navigation using the same close -> grid -> open choreography already proven in Story 3.2.
- Reconcile the missing My Approach preview / overlay path in the live card map, then implement `ApproachContent` data-driven from existing adaptability content and minimal new copy if required.
- Validate manual interaction, focus, and regression behavior across breakpoints before advancing the story.

### Debug Log References

- `python3 /home/warrick/Dev/WS-Portfolio-New/.agents/skills/bmad-init/scripts/bmad_init.py load --project-root /home/warrick/Dev/WS-Portfolio-New --all`
- `sed -n '1,220p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/project-context.md`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/_bmad/bmm/4-implementation/bmad-create-story/workflow.md`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/_bmad/bmm/4-implementation/bmad-create-story/template.md`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/_bmad/bmm/4-implementation/bmad-create-story/checklist.md`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/_bmad/bmm/4-implementation/bmad-create-story/discover-inputs.md`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '500,660p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/epics.md`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/implementation-artifacts/4-2-portfolio-data-update-and-content-refresh.md`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/implementation-artifacts/4-1-portfolio-content-layout-and-project-cards.md`
- `git show --stat --oneline --name-only 987e298 732da4c`
- `rg -n "Story 4\\.3|proof-to-skills|ApproachContent|My Approach|PortfolioContent|ProjectCard|SkillBadge|selectedProjectId|selectedSkill|onSkillNavigate|onProjectNavigate|consolidatedProfile|projectIds|linkedProjects|primaryProjectId" /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/prd.md /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/architecture.md /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/ux-design-specification.md /home/warrick/Dev/WS-Portfolio-New/docs/architecture.md`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/src/components/portfolio/PortfolioContent.tsx`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/src/components/portfolio/ProjectCard.tsx`
- `sed -n '1,320p' /home/warrick/Dev/WS-Portfolio-New/src/components/about/AboutContent.tsx`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/src/components/common/SkillBadge.tsx`
- `sed -n '1,320p' /home/warrick/Dev/WS-Portfolio-New/src/components/MainPage.tsx`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/src/components/common/renderChildDiv.tsx`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/src/data/portfolioData.tsx`
- `sed -n '1,320p' /home/warrick/Dev/WS-Portfolio-New/src/data/personalData.tsx`
- `sed -n '1,320p' /home/warrick/Dev/WS-Portfolio-New/src/data/consolidatedProfile.tsx`
- `sed -n '1,220p' /home/warrick/Dev/WS-Portfolio-New/docs/architecture.md`
- `rg -n "ApproachContent|My Approach|approach" /home/warrick/Dev/WS-Portfolio-New/src -g '*.ts' -g '*.tsx'`
- `sed -n '820,920p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '280,340p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/prd.md`
- `sed -n '470,610p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/architecture.md`
- `sed -n '660,700p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/architecture.md`
- `rg -n "ApproachContent|My Approach|approach" /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/epics.md /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/prd.md /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/architecture.md /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/ux-design-specification.md /home/warrick/Dev/WS-Portfolio-New/_bmad-output/implementation-artifacts/*.md`
- `sed -n '1,220p' /home/warrick/Dev/WS-Portfolio-New/package.json`
- `git status --short`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/implementation-artifacts/3-2-skills-grid-with-skills-to-proof-mapping.md`
- `sed -n '140,190p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/implementation-artifacts/deferred-work.md`
- `sed -n '1,240p' /home/warrick/Dev/WS-Portfolio-New/src/components/common/CardGrid.tsx`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/src/components/common/Card.tsx`
- `sed -n '1,260p' /home/warrick/Dev/WS-Portfolio-New/src/components/common/CardPreview.tsx`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `sed -n '360,450p' /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md`
- `npm run build`
- `npm run dev`
- `google-chrome --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom http://localhost:3000`
- `google-chrome --headless=new --disable-gpu --window-size=1600,1200 --screenshot=/tmp/ws-portfolio-desktop.png --virtual-time-budget=5000 http://localhost:3000`
- `google-chrome --headless=new --disable-gpu --window-size=900,1200 --screenshot=/tmp/ws-portfolio-tablet.png --virtual-time-budget=5000 http://localhost:3000`
- `google-chrome --headless=new --disable-gpu --window-size=390,1800 --screenshot=/tmp/ws-portfolio-mobile-tall.png --virtual-time-budget=5000 http://localhost:3000`
- `google-chrome --headless=new --disable-gpu --remote-debugging-port=9222 --user-data-dir=/tmp/ws-portfolio-cdp http://localhost:3000`
- `node --input-type=module <<'EOF' ... EOF` (Chrome DevTools Protocol checks for Portfolio → About focus, About → Portfolio round trip, Escape close, Approach content, and backdrop close)
- `sed -n '1,120p' /home/warrick/Dev/WS-Portfolio-New/src/data/portfolioData.tsx`
- `sed -n '1,120p' /home/warrick/Dev/WS-Portfolio-New/docs/component-inventory.md`

### Completion Notes List

- `2026-04-06 08:30:23 NZST` - Prepared Story 4.3 with repo-grounded guidance for reverse proof navigation and the currently-missing Approach feature path.
- `2026-04-06 08:30:23 NZST` - Captured the critical live mismatch: the app has a five-card grid with no My Approach card, while planning artifacts expect `ApproachContent`.
- `2026-04-06 08:30:23 NZST` - Locked reverse navigation to stable skill and project identifiers plus the existing close -> grid -> open choreography so the dev agent extends proven infrastructure instead of inventing a new state flow.
- `2026-04-06 11:23:08 NZST` - Added a derived `relatedSkillsByProjectId` mapping in `consolidatedProfile.tsx` and rendered proof-to-skills badges in `ProjectCard.tsx` without changing the non-interactive tech-stack row.
- `2026-04-06 11:23:08 NZST` - Extended `MainPage.tsx`, `renderChildDiv.tsx`, and `AboutContent.tsx` with reverse cross-card navigation, stable skill targets, and safe fallback focus handling keyed by skill IDs.
- `2026-04-06 11:23:08 NZST` - Added a dedicated `My Approach` card and `ApproachContent` overlay, expanded the desktop card grid to support a sixth card, and kept Contact reachable as its own entry point.
- `2026-04-06 11:23:08 NZST` - Verified build output, dev-server startup, desktop/tablet/mobile layouts, bidirectional skill/project navigation, Escape close, close button, body scroll locking, and backdrop close using headless Chrome plus CDP interaction checks.
- `2026-04-06 11:23:08 NZST` - Updated WS Portfolio copy and project docs so the shipped content and inventory reflect the new six-card desktop layout instead of the older five-card description.
- `2026-04-06 11:32:17 NZST` - Audited `../music-manager` and `../raceday-sql` against their current local manifests/docs, refreshed all three portfolio tech-stack badge lists with current versions, and replaced stale RaceDay Appwrite references with the live Fastify/PostgreSQL architecture.
- `2026-04-06 11:32:17 NZST` - Increased Tech Stack badge contrast and size so the expanded Portfolio overlay remains readable after adding fuller versioned stack labels.
- `2026-04-06 13:03:09 NZST` - Completed the review workflow by validating the two patch findings, fixing the valid issues in `renderChildDiv.tsx`, `ApproachContent.tsx`, `consolidatedProfile.tsx`, and `PortfolioContent.tsx`, and syncing the story status from `review` to `done`.

### Change Log

- `2026-04-06` - Implemented Story 4.3: reverse proof-to-skills navigation, stable About skill targets, dedicated My Approach preview/overlay, responsive six-card layout update, and architecture doc alignment.
- `2026-04-06` - Completed the Story 4.3 review workflow; all actionable review findings were resolved, deferred items remained tracked in `deferred-work.md`, and the story advanced to `done`.

### File List

- `_bmad-output/implementation-artifacts/4-3-proof-to-skills-reverse-navigation-and-approach-content.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `docs/architecture.md`
- `docs/component-inventory.md`
- `src/components/MainPage.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/approach/ApproachCard.tsx`
- `src/components/approach/ApproachContent.tsx`
- `src/components/common/CardGrid.tsx`
- `src/components/common/TechBadge.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/data/personalData.tsx`
- `src/data/portfolioData.tsx`

### Review Findings

- [x] [Review][Patch] `ApproachContent` lazy import lacks type assertion [`src/components/common/renderChildDiv.tsx:25`] — fixed by exporting `ApproachContentProps` and applying the same `LazyExoticComponent<ComponentType<...>>` assertion pattern used by the other lazy content imports.
- [x] [Review][Patch] `relatedSkillsByProjectId` typed via `as` assertion without defensive fallback [`src/data/consolidatedProfile.tsx:81-93`, `src/components/portfolio/PortfolioContent.tsx:57`] — fixed by replacing the `as`-asserted `Object.fromEntries` record with an explicitly typed `Record<PortfolioProjectId, ProjectRelatedSkill[]>` initializer and by adding `?? []` at the `ProjectCard` call site so an unexpected lookup miss still degrades safely.
- [x] [Review][Defer] Card ID literals inconsistent with named constants [`src/components/common/renderChildDiv.tsx:196-215`, `src/components/MainPage.tsx:130`] — deferred, pre-existing. Switch statement uses raw `3`/`4`/`5`/`6` while `handleOpen` uses `1`/`2`. Only `ABOUT_CARD_ID` and `PORTFOLIO_CARD_ID` have named constants.
- [x] [Review][Defer] Arbitrary `min-[860px]` breakpoint in ApproachContent [`src/components/approach/ApproachContent.tsx:32,67`] — deferred, low priority. Does not align with project's `tablet`/`desktop` responsive tokens. Would need project-wide component breakpoint audit.
