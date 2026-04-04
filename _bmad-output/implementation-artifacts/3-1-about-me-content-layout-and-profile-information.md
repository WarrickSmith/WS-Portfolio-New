# Story 3.1: About Me Content Layout and Profile Information

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to view a well-structured professional profile with experience, education, and a GitHub link,
so that I can quickly assess Warrick's background and qualifications.

## Acceptance Criteria

1. The existing About Me card expansion flow remains the entry point. When card `3` expands, `AboutContent` renders inside the current overlay shell and continues to use the existing heading -> body -> actions stagger provided by `OverlayContentGroup`.
2. A clear display heading and concise professional summary are shown near the top of the overlay in a layout optimized for the recruiter's 90-second scan.
3. Personal profile information is visible and data-driven: name, nationality, status, and spoken languages (FR8).
4. Professional experience is presented in a timeline-like, single-column layout that clearly shows role, company, and duration for each entry (FR9).
5. Education history is displayed clearly with institution and qualification information (FR10).
6. Years of professional experience are calculated from source data, not hardcoded in the component, and surfaced prominently in the upper portion of the content (FR12).
7. A direct GitHub profile link is visible, uses the overlay actions area, opens in a new tab, and keeps safe external-link attributes (FR14).
8. The About overlay is redesigned away from the current dense cell-grid feel into a single-column, scannable composition with generous spacing. Key information such as summary, experience years, skills visibility, and education must be understandable without wading through walls of text.
9. The content continues to respect the current overlay contract already implemented in the repo: centered `max-w-[800px]` content width, mobile/desktop overlay padding, Tailwind token-based typography, and line-height appropriate for long-form dark-theme reading.
10. About data must come from `src/data/personalData.tsx` and `src/data/consolidatedProfile.tsx`. Remove the hardcoded `personalInfo` array and the duplicated `getYearsExperience(2021)` logic from `AboutContent.tsx`.
11. Story 3.1 does not implement Story 3.2 behavior. No `SkillBadge`, no skills-to-proof click handling, no cross-card navigation callbacks, and no proof-link interactions are introduced here.
12. Story 3.1 does not carry forward the current "Learning Adaptability" block as core About content. That content is future `ApproachContent` scope per the planning set and should not continue bloating the About overlay.
13. Manual browser verification confirms desktop, tablet, and mobile readability; About open/close behavior is unchanged; and the GitHub link opens correctly in a new tab without regressing the Epic 2 overlay behavior.

## Tasks / Subtasks

- [x] Task 1: Normalize the About/profile data contract so the overlay is fully data-driven (AC: 2, 3, 6, 7, 10)
  - [x] Extend or reshape `src/data/personalData.tsx` to hold the profile summary, personal facts, GitHub URL, and the source-of-truth input needed for calculating experience years.
  - [x] Update `src/data/consolidatedProfile.tsx` so total years of experience are derived from data rather than duplicated component logic.
  - [x] Preserve or improve TypeScript typings while keeping the data files easy to maintain for future Epic 3 and Epic 4 stories.

- [x] Task 2: Redesign `AboutContent` into a single-column overlay composition for fast scanning (AC: 1, 2, 3, 4, 5, 6, 8, 9)
  - [x] Reuse `OverlayContentGroup`, `SectionHeading`, and the existing overlay shell instead of introducing a parallel content animation or layout wrapper.
  - [x] Replace the current dense multi-column/cell treatment with a vertical composition that front-loads summary, key profile facts, and high-value metrics.
  - [x] Present experience using a timeline-like stacked layout with clear role, company, and period hierarchy.
  - [x] Present education in the same scannable visual language with concise supporting copy.

- [x] Task 3: Keep Story 3.1 within scope while leaving a clean handoff to Story 3.2 (AC: 7, 8, 11, 12)
  - [x] Ensure skills remain visible in the upper half of the About overlay through a simple, non-interactive section or preview derived from current data.
  - [x] Do not implement linked badges, project proof mapping, or `MainPage` navigation callbacks in this story.
  - [x] Remove or relocate the current learning-adaptability content from the main About layout so the overlay focuses on profile, experience, education, and GitHub.

- [x] Task 4: Manually verify the About overlay against the repo's real runtime behavior (AC: 1, 7, 9, 13)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev`.
  - [x] Verify desktop (`>=1000px`), tablet (`768px-999px`), and mobile (`<768px`) render a readable single-column About overlay inside the existing `800px` max-width content area.
  - [x] Verify heading/body/actions entry staggering still occurs via `OverlayContentGroup`, and reduced-motion behavior remains inherited from that shared primitive.
  - [x] Verify the GitHub action opens in a new tab and the overlay close button, backdrop close, and Escape handling still behave as before.

## Dev Notes

### Critical Story Guardrails

- Repo truth overrides stale planning remnants. The live codebase is Tailwind-first and does not use styled-components.
- `OverlayContentGroup` already owns content staggering and reduced-motion behavior. Reuse it; do not create a new About-only animation system.
- `MainPage.tsx` remains the single source of truth for which card is open. Story 3.1 must not add local or global state for cross-card navigation.
- Story 3.1 is a layout-and-data cleanup story, not the full skills-to-proof interaction story. Keep `SkillBadge`, proof mapping, and callback navigation for Story 3.2 / Story 4.3.
- The current About overlay is too dense because it still carries legacy cell-grid thinking. The redesign goal is scannability, not more content.
- "Learning Adaptability" is no longer core About scope. Planning artifacts move adaptability/process content to future `ApproachContent`; do not keep it as a large block in the redesigned About overlay.
- No automated tests. Manual browser verification only.

### Repo Facts Discovered During Story Preparation

- `src/components/about/AboutContent.tsx` currently duplicates experience-year logic in the component and also reads `consolidatedProfile.totalYearsExperience`. Story 3.1 should collapse this to one source of truth.
- `AboutContent.tsx` currently hardcodes `personalInfo` locally instead of sourcing it from `personalData.tsx`.
- `src/components/common/OverlayContentGroup.tsx` already provides heading/body/actions entry timing of `0`, `0.1`, and `0.2` seconds and automatically falls back for reduced motion.
- `src/components/common/CardExpansionOverlay.tsx` already provides the scrollable overlay shell with centered `max-w-[800px]` content and the correct desktop/mobile padding contract.
- `src/components/common/renderChildDiv.tsx` already lazy-loads `AboutContent` and wires the About card expansion preset. No registry or animation-preset changes should be necessary for this story.
- `src/data/consolidatedProfile.tsx` currently exposes `experience`, `education`, `skills`, `totalYearsExperience`, and `learningAdaptability`. That shape likely needs light normalization for Story 3.1 and Story 3.2.
- `src/data/personalData.tsx` currently stores experience, education, and skills, but not a dedicated profile-summary/profile-facts/GitHub-link structure. That gap is the main data-contract issue for this story.

### Architecture Compliance

- Use Tailwind utilities and tokens from `src/styles/main.css`; do not reintroduce styled-components, inline style-heavy layout patterns, or new styling systems.
- Keep `AboutContent.tsx` as the feature-owned expanded-content component in `src/components/about/`.
- Keep content source-of-truth in `src/data/`.
- Preserve the current Epic 2 overlay infrastructure: `MainPage.tsx`, `CardExpansionOverlay.tsx`, `DimmedBackdrop.tsx`, `ExpandableItem.tsx`, and `renderChildDiv.tsx` should remain untouched unless a concrete blocker is discovered.
- Respect the current feature boundary: the About feature should not directly import from Portfolio to prepare future proof-link behavior. Cross-card navigation belongs in `MainPage` callback orchestration later.

### Likely Touch Points

- `src/components/about/AboutContent.tsx`
- `src/data/personalData.tsx`
- `src/data/consolidatedProfile.tsx`

### Likely No-Touch Files Unless a Blocker Is Found

- `src/components/MainPage.tsx`
- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/ExpandableItem.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/common/AmbientBackground.tsx`

### Project Structure Notes

- Keep About-specific rendering logic inside `src/components/about/`.
- Keep reusable data and derived profile calculations in `src/data/`.
- Do not create new `common/` components unless the refactor reveals a genuinely reusable primitive. A small local helper inside `about/` is preferable to premature abstraction.

### Testing Requirements

- No automated testing framework. Do not add test files.
- Required verification:
  - `npm run build`
  - `npm run dev`
  - Manual browser checks on desktop, tablet, and mobile
- Manual checks:
  - About overlay reads as a single-column, scannable professional profile rather than a dense cell grid
  - Experience years are derived from source data and remain visibly prominent
  - Profile facts, experience, and education are all data-driven
  - Skills remain visible without implementing Story 3.2 proof-link interactions
  - GitHub link opens in a new tab and remains styled consistently with the overlay action area
  - Existing overlay close behavior and animation feel unchanged

### Cross-Story Intelligence

- Story 3.1 lays the structural foundation for Story 3.2. Leave a clean upper-half skills section that Story 3.2 can upgrade into a `SkillBadge` grid with proof links.
- Story 3.2 depends on a stable skills data contract. Any data reshaping done here should make later mapping easier, not harder.
- Story 4.3 introduces `ApproachContent` and explicitly owns methodology/adaptability copy. Treat that as a future destination for the current adaptability material.
- Epic 2 already completed the About card expansion mechanics, per-card motion, ambient background, and overlay shell. Story 3.1 should build on that infrastructure rather than revisiting it.

### Git Intelligence Summary

- Recent repo history shows a stable sequence: overlay shell, per-card expansion animation, ambient background motion, then review/doc closure. That pattern indicates the shell is now mature infrastructure.
- Story 3.1 is the first story in Epic 3, so the safest implementation path is a narrow file touch set that reuses existing Epic 2 primitives.

### Latest Technical Information

- No external web research is required for Story 3.1. The implementation should follow the repo-pinned versions already in `package.json`: React `19.2.4`, Framer Motion `12.38.0`, Tailwind CSS `4.2.2`, and TypeScript `6.0.2`.
- `OverlayContentGroup` already composes Framer Motion timing and reduced-motion handling. That existing primitive is the correct technical path for this story's content staging.

### Project Context Reference

- `_bmad-output/project-context.md` is partially stale for this repo. It still references styled-components as the primary styling approach.
- For Story 3.1, prefer current repo truth from `docs/architecture.md`, `package.json`, `src/styles/main.css`, and the live source files.
- The useful parts of project context that still apply are the no-test/manual-verification rule and the general caution to avoid unnecessary global state.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 3 / Story 3.1 acceptance criteria and Epic 4 / Story 4.3 future ApproachContent scope
- `_bmad-output/planning-artifacts/prd.md` - FR8 through FR14 About Me requirements
- `_bmad-output/planning-artifacts/ux-design-specification.md` - CardExpansionOverlay contract, AboutMeContent component spec, spacing scale, and `800px` overlay content-width rule
- `_bmad-output/planning-artifacts/architecture.md` - FR8-FR14 file mapping, Tailwind-first architecture, feature boundaries, cross-card navigation ownership, and removal of legacy About cell-grid structure
- `docs/architecture.md`
- `docs/component-inventory.md`
- `package.json`
- `src/styles/main.css`
- `src/components/about/AboutContent.tsx`
- `src/components/common/OverlayContentGroup.tsx`
- `src/components/common/SectionHeading.tsx`
- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/data/personalData.tsx`
- `src/data/consolidatedProfile.tsx`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `epic-3` as `in-progress`
- Sprint tracking must mark `3-1-about-me-content-layout-and-profile-information` as `ready-for-dev`
- Story package includes repo-grounded layout constraints, data normalization guidance, scope boundaries for Story 3.2 and Story 4.3, and manual verification expectations

## Open Questions / Assumptions

- Assumption: a simple, non-interactive skills section is sufficient in Story 3.1 as long as the layout clearly reserves the upper-half position for the richer Story 3.2 skills grid.
- Assumption: the current learning-adaptability copy can be removed from About without immediate replacement in the UI because the planning set explicitly relocates that material to future `ApproachContent`.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `git status --short`
- `git log --oneline -5`
- `git log --oneline -- src/components/about src/data src/components/common | head -n 12`
- `sed -n '1,240p' _bmad/bmm/config.yaml`
- `sed -n '1,260p' _bmad-output/project-context.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '480,620p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '280,320p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '360,640p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '440,500p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '780,1010p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '1,260p' docs/architecture.md`
- `sed -n '60,120p' docs/component-inventory.md`
- `sed -n '1,320p' src/components/about/AboutContent.tsx`
- `sed -n '1,360p' src/components/MainPage.tsx`
- `sed -n '1,280p' src/components/common/OverlayContentGroup.tsx`
- `sed -n '1,220p' src/components/common/SectionHeading.tsx`
- `sed -n '1,260p' src/components/common/CardExpansionOverlay.tsx`
- `sed -n '1,260p' src/components/common/renderChildDiv.tsx`
- `sed -n '1,260p' src/data/personalData.tsx`
- `sed -n '1,260p' src/data/consolidatedProfile.tsx`
- `sed -n '1,260p' src/styles/main.css`
- `sed -n '1,240p' package.json`
- `rg -n "Story 3\\.1|FR8|FR9|FR10|FR12|FR14|About Me|timeline|display heading|GitHub profile" _bmad-output/planning-artifacts/*.md`
- `rg -n "consolidatedProfile|personalData" src -g '*.ts' -g '*.tsx'`
- `rg -n "Learning Adaptability|Approach|adaptability" _bmad-output/planning-artifacts/*.md src/components docs`
- `npm run build`
- `npm run dev`
- `curl -I http://localhost:3000`
- `node --input-type=module <<'EOF' ... EOF` - Headless Chrome verification for desktop/tablet/mobile About overlay rendering, GitHub link attributes, and close button / Escape / backdrop behavior
- `rg -n "Years in Software Development|console.warn\\(|Invalid personalData.profile.experienceStartDate value" src/components/about/AboutContent.tsx src/data/consolidatedProfile.tsx`
- `node --input-type=module <<'EOF' ... EOF` - Headless Chrome verification that the About overlay renders the updated "Years in Software Development" label
- `node --input-type=module <<'EOF' ... EOF` - Headless Chrome verification that the open About overlay recomputes its frame across desktop/mobile/tablet viewport resizes
- `node --input-type=module <<'EOF' ... EOF` - Headless Chrome verification that narrow-desktop About cards no longer overflow for labels such as Nationality, Qualifications, and Years in Software Development
- `python3 -m http.server 3001 --directory dist`
- `curl -I http://127.0.0.1:3001`

### Implementation Plan

- Normalize About/profile data so `AboutContent` stops hardcoding personal facts and duplicated experience-year logic.
- Refactor `AboutContent` into a single-column, high-signal overlay composition that preserves current Epic 2 animation and shell primitives.
- Keep the skills section deliberately non-interactive in Story 3.1 while removing legacy adaptability clutter and preparing a clean handoff to Story 3.2.

### Completion Notes List

- `2026-04-04 10:50:40 NZDT` - Story 3.1 context prepared with repo-grounded guidance for single-column About overlay redesign, data normalization, explicit Story 3.2/4.3 scope boundaries, and manual browser verification expectations.
- `2026-04-04 12:06:57 NZDT` - Normalized `personalData` and `consolidatedProfile` into a typed, data-driven profile contract with summary, personal facts, GitHub link metadata, separated role/company education fields, and a single derived experience-years calculation sourced from profile data.
- `2026-04-04 12:06:57 NZDT` - Rebuilt `AboutContent` into a recruiter-scan overlay that keeps the existing heading/body/actions animation contract, surfaces experience metrics and non-interactive skills in the upper half, removes the Learning Adaptability block from About, and preserves Story 3.2 handoff boundaries.
- `2026-04-04 12:06:57 NZDT` - Validated with `npm run build`, `npm run dev`, HTTP availability check on `localhost:3000`, and headless Chrome checks at 1280px, 900px, and 430px covering overlay rendering, max-width contract, GitHub `_blank` + `noopener noreferrer`, and close button / Escape / backdrop dismissal.
- `2026-04-04 16:49:10 NZDT` - Resolved the review decision by clarifying the metric label to "Years in Software Development", normalized stat values to a consistent string type, and added a development-only warning for malformed `experienceStartDate` data.
- `2026-04-04 16:49:10 NZDT` - Re-verified with `npm run build`, `npm run dev`, source grep checks, and a focused headless Chrome pass confirming the updated stat label renders in the About overlay.
- `2026-04-04 17:06:25 NZDT` - Fixed post-review runtime issues by making the open overlay recompute its frame on viewport resize/orientation changes and by relaxing About-specific internal breakpoints so profile facts and stat labels do not overflow in the narrow-desktop range.
- `2026-04-04 17:06:25 NZDT` - Re-verified with `npm run build`, browser-driven resize checks across desktop/mobile/tablet, targeted narrow-width overflow checks on the built app, and user manual confirmation that the review fixes now behave correctly.

### File List

- `_bmad-output/implementation-artifacts/3-1-about-me-content-layout-and-profile-information.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/components/MainPage.tsx`
- `src/components/about/AboutContent.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/data/personalData.tsx`

### Review Findings

- [x] [Review][Decision] "Years in software" label vs experienceStartDate scope — resolved by clarifying the label to "Years in Software Development", which matches the deliberate `experienceStartDate: '2021-06-01'` software-development scope.

- [x] [Review][Patch] `overviewStats.value` mixes string and number types — fixed by typing `overviewStats.value` as `string` and stringifying the count-based metrics for consistency. [`src/components/about/AboutContent.tsx:8-29`]

- [x] [Review][Patch] `calculateTotalYearsExperience` silently returns 0 for invalid dates — fixed with a development-only `console.warn` before returning `0`, keeping production quiet while surfacing bad static data during development. [`src/data/consolidatedProfile.tsx:14-30`]

- [x] [Review][Defer] `learningAdaptability` data wired but never rendered — Data exists in `personalData.tsx` and flows through `consolidatedProfile` but no component renders it. Dead data wiring. Not a bug — preserved for future Story 4.3. [`src/data/consolidatedProfile.tsx:36`]

- [x] [Review][Defer] `overviewStats` recomputed on every render — Array is static data but declared inside component body. Not memoized. Negligible perf impact given static imports. [`src/components/about/AboutContent.tsx:9-25`]

- [x] [Review][Defer] Portrait image column fixed at 220px on desktop — `desktop:grid-cols-[minmax(0,1.35fr)_220px]` creates asymmetric layout on wide viewports. Works within current overlay max-width constraint. [`src/components/about/AboutContent.tsx:38`]

- [x] [Review][Defer] `h-full` on `<img>` with no explicit parent height — Relies on `min-h-64` fallback. Works correctly in practice due to intrinsic aspect ratio. [`src/components/about/AboutContent.tsx:82`]

- [x] [Review][Defer] Dual data source split: profile from personalData, sections from consolidatedProfile — Architectural observation. `consolidatedProfile` is a pass-through; both resolve to the same underlying data. Future refactor opportunity. [`src/components/about/AboutContent.tsx:2-3`]

- [x] [Review][Defer] Timeline dot may clip if overflow:hidden added to parent — Current layout has no overflow clipping, so dots render correctly. Fragile if styles change. [`src/components/about/AboutContent.tsx:151`]

## Change Log

- `2026-04-04`: Story created and marked `ready-for-dev`; Epic 3 advanced to `in-progress`; Story 3.1 advanced to `ready-for-dev`.
- `2026-04-04`: Implemented Story 3.1 About overlay data normalization, single-column profile redesign, and runtime validation; story advanced to `review`.
- `2026-04-04`: Code review complete (3 layers). 1 decision-needed, 2 patch, 6 defer, 4 dismissed.
- `2026-04-04`: Addressed remaining review items for Story 3.1 by clarifying the experience metric label, normalizing stat-value types, and adding a dev-only invalid-date warning.
- `2026-04-04`: Completed review closure for Story 3.1 after fixing open-overlay resize behavior and narrow-width About card overflow, then confirming the result with automated browser checks and manual review.
