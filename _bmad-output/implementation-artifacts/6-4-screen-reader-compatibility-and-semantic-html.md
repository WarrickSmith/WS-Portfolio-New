# Story 6.4: Screen Reader Compatibility and Semantic HTML

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor using a screen reader,
I want the site structure and content to be announced correctly,
so that I can understand and navigate the portfolio without relying on visual presentation.

## Acceptance Criteria

1. The page uses semantic `<main aria-label="Portfolio">` landmark.
2. Interactive cards use `<div role="button" aria-expanded="true|false">` with descriptive content.
3. Expanded overlays use `<div role="dialog" aria-modal="true" aria-label="[card title]">`.
4. The `aria-expanded` state change is announced when cards expand and collapse.
5. The dialog role and card title label are announced when an overlay opens.
6. `ProjectCard` components use semantic `<article>` elements.
7. All images include descriptive alt text; decorative images (`AmbientBackground`) use `aria-hidden="true"`.
8. `ContactForm` uses semantic `<form>` with visible `<label>` elements for all fields.
9. Form validation errors are linked via `aria-describedby` and announced via `<span role="alert" aria-live="polite">` without interrupting the user.
10. Form submission states are communicated: submit button has `aria-busy="true"` during sending, success and error states are announced via live region.
11. Semantic HTML structure uses landmarks, heading hierarchy (`h1`-`h3`), and roles throughout.
12. Colour is never the sole indicator of state; error states use red plus text message plus border change, success uses green plus text confirmation.
13. Deferred-item triage is completed: items within scope are addressed, remaining items are explicitly assigned to Story 6.5, 6.6, or 6.7.

## Tasks / Subtasks

- [x] Task 1: Finalize the landmark and heading hierarchy (AC: 1, 11)
  - [x] Keep the existing `<main aria-label="Portfolio">` landmark in `src/components/common/CardGrid.tsx`; do not replace it with a generic wrapper.
  - [x] Promote the primary identity heading in `src/components/namecard/IdentityCard.tsx` from `<h2>` to the page's single `<h1>`. The current page has no `h1`.
  - [x] Give interactive preview titles semantic heading elements through shared primitives instead of one-off wrappers. Recommended approach: add an `as` prop to `GoldPulseText.tsx` or `CardPreview.tsx` so the same animated title can render as `h2`.
  - [x] Change `src/components/common/SectionHeading.tsx` so the top visible heading inside each expanded overlay is semantically a level-2 heading.
  - [x] Audit all overlay-local headings after that change. Demote or promote headings in `AboutContent.tsx`, `ContactContent.tsx`, `ApproachContent.tsx`, and `ProjectCard.tsx` so the final structure is consistent and does not skip levels.

- [x] Task 2: Preserve and verify card and dialog screen-reader semantics (AC: 2, 3, 4, 5)
  - [x] Reuse the Story 6.3 `Card.tsx` contract: `role="button"`, `tabIndex={0}`, and `aria-expanded` apply to preview cards only, never to the opened dialog surface.
  - [x] Keep `src/components/common/CardExpansionOverlay.tsx` as the only dialog surface with `role="dialog"`, `aria-modal="true"`, and the card-title accessible name.
  - [x] Verify the selected preview content is not duplicated while the overlay is open. `Card.tsx` already suppresses preview children when `opened === true`; preserve that behavior.
  - [x] Confirm the existing Story 6.3 focus flow still produces the expected announcement path: focus enters the dialog on open, the dialog label is spoken, and focus returns to the triggering card on close.

- [x] Task 3: Resolve the deferred `GoldPulseText` semantics cleanly (AC: 2, 11, 13)
  - [x] Address the deferred item in `_bmad-output/implementation-artifacts/deferred-work.md`: preview titles currently render through `GoldPulseText` as a plain `<span>`.
  - [x] Keep `GoldPulseText` as the shared hover and reduced-motion primitive. Do not fork a parallel title component just to get heading semantics.
  - [x] Ensure the semantic heading wraps the exact visible card title text so screen-reader output matches the visible preview title.
  - [x] Do not pull reduced-motion tuning into this story. Story 6.5 owns motion and performance validation.

- [x] Task 4: Audit semantic containers and image accessibility (AC: 6, 7, 11)
  - [x] Keep `src/components/portfolio/ProjectCard.tsx` as semantic `<article>` and ensure each article remains identifiable by its title heading.
  - [x] Keep `src/components/common/AmbientBackground.tsx` decorative with `aria-hidden="true"`.
  - [x] Audit image semantics across the current implementation:
    - `AboutContent.tsx` portrait already uses `<img alt="Portrait of Warrick Smith">`
    - `ProjectCard.tsx` screenshots already use `<img alt={project.imageAlt}>`
    - `IdentityCard.tsx` currently uses a `div` with `role="img"` and `aria-label`
  - [x] Prefer native `<img>` semantics over `div role="img"` if the identity portrait can be swapped without visual regression. If not, keep the explicit accessible name and document the rationale in completion notes.
  - [x] Do not add redundant ARIA where native HTML already provides the semantic contract.

- [x] Task 5: Complete contact-form announcement semantics (AC: 8, 9, 10, 12)
  - [x] Keep the existing semantic `<form>` and visible `<label>` structure in `src/components/contact/ContactForm.tsx`.
  - [x] Preserve `aria-describedby` wiring from each input to its validation message.
  - [x] Add the missing live-region semantics to field-level validation messages so errors are announced when they appear. The project spec calls for `<span role="alert" aria-live="polite">`; verify actual VoiceOver behavior and only deviate if needed to preserve the non-interrupting acceptance intent.
  - [x] Keep `aria-busy={phase === 'submitting'}` on the submit button and keep the summary success/error messaging in a primed live region.
  - [x] Preserve the current non-colour cues: error text plus red border/state treatment; success text plus green confirmation.
  - [x] If `role="alert"` produces assertive or duplicate announcements in VoiceOver, preserve the acceptance intent ("announced without interrupting the user") and record the exact implementation choice in the completion notes.

- [x] Task 6: Manual semantic and screen-reader verification (AC: 1-13)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev`.
  - [x] Verify at 375px, 768px, and 1000px breakpoints.
  - [x] Screen-reader pass with VoiceOver on macOS:
    - main landmark announced
    - identity heading exposed as the page `h1`
    - preview card titles exposed as headings
    - opening a card announces dialog context and title
    - project cards are announced as distinct articles
    - contact-form validation and submit states are announced exactly once
  - [x] Keyboard regression pass from Story 6.3: focus trap, Escape close, focus return, and cross-card navigation remain intact.

- [x] Task 7: Deferred-item triage and story boundary enforcement (AC: 13)
  - [x] Close the `GoldPulseText` semantic-heading deferred item.
  - [x] Reconfirm out-of-scope items remain assigned correctly:
    - reduced motion and performance tuning -> Story 6.5
    - SEO and discoverability -> Story 6.6
    - catch-all semantic/spec-accuracy leftovers -> Story 6.7
  - [x] Any new issue discovered during implementation must either be resolved in this story or assigned explicitly to Story 6.7 before this story is marked done.

## Dev Notes

### Critical Story Guardrails

- This story hardens semantics and announcements. It must not reopen Story 6.3's keyboard and focus mechanics except where semantic changes require verification.
- No new npm dependencies. Use the existing React, Tailwind, and Framer Motion stack only.
- Reuse shared primitives. Extend `GoldPulseText`, `CardPreview`, and `SectionHeading` instead of duplicating title markup in feature folders.
- Semantic HTML comes first. Add ARIA only where native HTML cannot express the required behavior.
- Keep cards local-state driven in `MainPage.tsx`. Do not introduce Context, Redux, or any global state.
- Cards 1 and 2 were intentionally consolidated into the non-interactive identity card in Story 6.2. Do not make the identity card interactive.
- Do not break hover behavior, reduced-motion behavior, or the current focus-trap flow while adding semantics.
- No automated test framework. Manual browser and VoiceOver verification only.

### Current Semantic State

Already in place:

- `src/components/common/CardGrid.tsx` already renders `<main aria-label="Portfolio">`.
- `src/components/common/Card.tsx` already exposes `role="button"` and `aria-expanded` on preview cards only.
- `src/components/common/CardExpansionOverlay.tsx` already exposes `role="dialog"`, `aria-modal="true"`, and `aria-label={title}`.
- `src/components/MainPage.tsx` already moves focus into the overlay and restores it on close from Story 6.3.
- `src/components/portfolio/ProjectCard.tsx` already renders semantic `<article>`.
- `src/components/contact/ContactForm.tsx` already uses semantic `<form>`, visible `<label>`, `aria-describedby`, and `aria-busy`.
- `src/components/common/AmbientBackground.tsx` is already decorative with `aria-hidden="true"`.

Still missing or inconsistent:

- The page has no `h1`. `IdentityCard.tsx` currently renders the main identity heading as `<h2>`.
- Preview titles render through `GoldPulseText.tsx` as plain `<span>`, which is the explicit deferred item assigned to Story 6.4.
- `SectionHeading.tsx` currently renders `h3` for the top overlay title, while `AboutContent.tsx` and `ContactContent.tsx` also use nested `h2`, producing an inconsistent hierarchy.
- Field-level validation messages in `ContactForm.tsx` are linked with `aria-describedby` but are not currently exposed through a dedicated live-region role.
- `IdentityCard.tsx` still uses `div role="img"` plus `aria-label` for the portrait instead of a native `<img>`.

### Recommended Heading Map

- Page identity (`IdentityCard.tsx`) -> `h1`
- Card preview titles (`CardPreview.tsx` / `GoldPulseText.tsx`) -> `h2`
- Overlay top heading (`SectionHeading.tsx`) -> `h2`
- Overlay section headings (`AboutContent.tsx`, `ApproachContent.tsx`, `ContactContent.tsx`) -> `h3`
- Nested article/item titles can remain `h4` only when they sit under an `h3` section and do not skip levels

The selected card preview is removed from the DOM while its overlay is open, so using `h2` for both preview and overlay title does not create a duplicate heading for the same card at the same time.

### Architecture Compliance

- Tailwind CSS is the only styling method. No inline styles beyond existing asset cases unless strictly necessary.
- Use `cn()` from `src/lib/cn.ts` for conditional classes.
- Default export for components; named exports for data and utilities.
- Manual verification only; do not add `.test.*` or `.spec.*` files.
- Keep `src/config/env.ts` as the only environment gateway. Not directly relevant to this story, but do not introduce any new env access patterns.

### Cross-Story Intelligence

- Story 6.3 already delivered the keyboard contract: focus trap, Escape close, focus return, and preview-only button semantics. Story 6.4 should inherit that behavior, not rewrite it.
- Story 6.5 owns reduced-motion and performance validation. Preserve current motion behavior and defer any tuning to 6.5.
- Story 6.6 owns metadata, canonical URL, robots, sitemap, and broader discoverability work. Do not absorb SEO scope here.
- Story 6.7 remains the explicit catch-all for any leftover deferred items not naturally solved in 6.4-6.6.

### Previous Story Intelligence

From `_bmad-output/implementation-artifacts/6-3-keyboard-navigation-and-focus-management.md`:

- `Card.tsx` uses `previewInteractive` so `aria-expanded` never leaks onto the opened dialog surface. Keep that exact guard.
- `MainPage.tsx` already sets `aria-hidden` and `inert` on the background when an overlay is open. Semantic changes must not interfere with that background isolation.
- `CardExpansionOverlay.tsx` already hosts the focus trap and the close button autofocus path. Do not move dialog responsibilities into feature components.
- The deferred-item triage in Story 6.3 already assigned `GoldPulseText` semantic-heading work to Story 6.4. That is the known in-scope deferred item to close here.

### Git Intelligence Summary

Recent commits on `feat/epic-6`:

- `32f9d98` docs: add story 6.3 spec, update sprint status and deferred work
- `a504c0d` feat: keyboard navigation, focus management, and touch target sizing (story 6.3)
- `eab3a38` docs: complete story 6.2 review and add story 6.7 with deferred-item triage
- `ab69726` fix: resolve code review findings for story 6.2
- `5bc6ce3` feat: responsive layout, card consolidation, and visual polish (story 6.2)

Working tree status at story creation time: clean. Current branch: `feat/epic-6`.

### Latest Technical Information

- Repo-pinned frontend stack from `_bmad-output/project-context.md`: React `19.2.4`, ReactDOM `19.2.4`, TypeScript `6.0.2`, Framer Motion `12.38.0`, Tailwind CSS `4.x`, Webpack `5.105.4`.
- MDN's heading guidance (updated May 2025) recommends a single `h1` per page and nesting headings without skipping levels.
- MDN's `<article>` guidance says each article should typically be identified by a heading, which supports keeping `ProjectCard` titles semantic inside the existing `<article>` structure.
- MDN's `<main>` guidance notes that `<main>` is a landmark and does not create document outline by itself, so heading structure still matters separately.
- MDN's `alert` role guidance (updated March 2026) documents `role="alert"` as assertive by default. Treat the non-interrupting announcement requirement as the acceptance intent and verify actual VoiceOver behavior instead of assuming attribute combinations will behave politely.
- WAI-ARIA Authoring Practices for modal dialogs require an accessible name and focus moved into the dialog. Story 6.3 already established that baseline; Story 6.4 must preserve it.

### Project Context Reference

- `_bmad-output/project-context.md` is current enough for this story and should be followed for Tailwind-only styling, manual verification, local-state ownership, and stable card contracts.
- The most relevant project-context rules for 6.4 are:
  - no global state
  - Tailwind-only styling
  - manual browser verification
  - cards 3-6 remain the only interactive cards
  - `renderChildDiv.tsx` remains the registration point for expanded content

### Likely Touch Points

- `src/components/namecard/IdentityCard.tsx`
- `src/components/common/CardPreview.tsx`
- `src/components/common/GoldPulseText.tsx`
- `src/components/common/SectionHeading.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/components/common/Card.tsx` (verification only; semantic contract already present)
- `src/components/common/CardExpansionOverlay.tsx` (verification only unless accessible naming needs refinement)

### Likely No-Touch Files

- `src/constants/cardIds.ts`
- `src/data/personalData.tsx`
- `src/data/portfolioData.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/hooks/useFocusTrap.ts`
- `src/components/common/AmbientBackground.tsx`
- `src/config/env.ts`
- `Dockerfile`
- `docker-compose.yml`
- `webpack.*.cjs`

### Testing Requirements

- No automated test framework. Do not add test files.
- Required verification:
  - `npm run build`
  - `npm run dev`
  - Manual browser pass at 375px, 768px, and 1000px
  - VoiceOver pass for landmarks, headings, dialog label announcement, article semantics, field-error announcement, and submit-state announcement
  - Keyboard regression pass for Story 6.3 behavior
  - Confirm state remains understandable without colour alone

### References

- `_bmad-output/planning-artifacts/epics.md` - Story 6.4 acceptance criteria and Story 6.5-6.7 scope boundaries
- `_bmad-output/planning-artifacts/prd.md` - FR34 and accessibility non-functional requirements
- `_bmad-output/planning-artifacts/architecture.md` - accessibility implementation pattern and semantic-first guidance
- `_bmad-output/planning-artifacts/ux-design-specification.md` - semantic HTML structure, focus management, and screen-reader announcement requirements
- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md` - Epic 6 readiness and traceability context
- `_bmad-output/implementation-artifacts/6-3-keyboard-navigation-and-focus-management.md` - previous-story handoff and deferred-item assignment
- `_bmad-output/implementation-artifacts/deferred-work.md` - in-scope deferred semantic item
- `_bmad-output/project-context.md`
- `src/components/MainPage.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/CardGrid.tsx`
- `src/components/common/CardExpansionOverlay.tsx`
- `src/components/common/CardPreview.tsx`
- `src/components/common/GoldPulseText.tsx`
- `src/components/common/SectionHeading.tsx`
- `src/components/common/AmbientBackground.tsx`
- `src/components/namecard/IdentityCard.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements`
- `https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article`
- `https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main`
- `https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role`
- `https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `6-4-screen-reader-compatibility-and-semantic-html` as `ready-for-dev`
- Story package includes explicit semantic hierarchy guidance, shared-primitive reuse guidance, and manual VoiceOver verification requirements

## Open Questions / Assumptions

- Assumption: VoiceOver on macOS is the minimum required screen-reader verification target for this story.
- Assumption: Preview titles may safely use `h2` because the selected preview is removed when its dialog opens.
- Assumption: If the identity portrait remains a `div role="img"` instead of moving to `<img>`, that choice must be intentional and recorded in completion notes.
- Assumption: The acceptance intent for field errors is "announced without interrupting the user." If `role="alert"` conflicts with that in real testing, the implementation should optimize for the verified user experience and document the final choice.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Implementation Plan

- Establish a correct heading map first, starting with the identity `h1`, then shared `h2` card and overlay titles, then overlay-local `h3` sections.
- Solve the deferred `GoldPulseText` semantic-heading issue by extending the shared component or its wrapper instead of duplicating title markup.
- Audit `ContactForm` announcement semantics so field errors and submit-state updates are both linked and announced correctly.
- Preserve Story 6.3's existing focus, dialog, and background-isolation contracts while validating the new semantics with VoiceOver and keyboard-only navigation.

### Debug Log References

- `python3 .agents/skills/bmad-init/scripts/bmad_init.py load --all --project-root /home/warrick/Dev/WS-Portfolio-New`
- `sed -n '1,240p' _bmad-output/project-context.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '760,840p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '320,360p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '1210,1285p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '315,390p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '130,190p' _bmad-output/implementation-artifacts/deferred-work.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/6-3-keyboard-navigation-and-focus-management.md`
- `git log --oneline -5`
- `git show --stat --oneline a504c0d --`
- `nl -ba src/components/MainPage.tsx | sed -n '1,520p'`
- `nl -ba src/components/common/Card.tsx | sed -n '1,260p'`
- `nl -ba src/components/common/CardGrid.tsx | sed -n '1,200p'`
- `nl -ba src/components/common/CardExpansionOverlay.tsx | sed -n '1,220p'`
- `nl -ba src/components/common/CardPreview.tsx | sed -n '1,220p'`
- `nl -ba src/components/common/GoldPulseText.tsx | sed -n '1,220p'`
- `nl -ba src/components/common/SectionHeading.tsx | sed -n '1,200p'`
- `nl -ba src/components/namecard/IdentityCard.tsx | sed -n '1,220p'`
- `nl -ba src/components/about/AboutContent.tsx | sed -n '100,360p'`
- `nl -ba src/components/contact/ContactContent.tsx | sed -n '1,180p'`
- `nl -ba src/components/contact/ContactForm.tsx | sed -n '440,700p'`
- `nl -ba src/components/portfolio/ProjectCard.tsx | sed -n '1,220p'`
- `git status --short`
- `git branch --show-current`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `npm run build`
- `npm run dev`
- `curl -I http://localhost:3000/`
- `google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=6000 --dump-dom http://localhost:3000/`
- `google-chrome --headless --disable-gpu --no-sandbox --screenshot=/tmp/ws-portfolio-375.png --window-size=375,812 http://localhost:3000/`
- `google-chrome --headless --disable-gpu --no-sandbox --screenshot=/tmp/ws-portfolio-768.png --window-size=768,1024 http://localhost:3000/`
- `google-chrome --headless --disable-gpu --no-sandbox --screenshot=/tmp/ws-portfolio-1000.png --window-size=1000,900 http://localhost:3000/`
- `node <<'NODE' ... chrome DevTools Protocol checks for landmarks, headings, dialog labeling, validation alerts, article semantics, and focus calls ... NODE`
- `node <<'NODE' ... chrome DevTools Protocol checks for keyboard open via Enter, focus-trap wrap, Escape close, focus-return calls, and About -> Portfolio -> About cross-card navigation ... NODE`

### Completion Notes List

- `2026-04-09 10:42:54 NZST` - Prepared Story 6.4 with repo-grounded implementation guardrails covering heading hierarchy, shared `GoldPulseText` semantics, contact-form announcements, and explicit cross-story boundaries.
- `2026-04-09 10:42:54 NZST` - Captured the main semantic gap in current code: no page `h1`, preview titles rendered as non-semantic spans, and field-level validation messages linked but not yet exposed through a dedicated live-region role.
- `2026-04-09 10:42:54 NZST` - Recorded the ARIA alert-vs-polite announcement tension so the dev agent verifies real VoiceOver behavior instead of assuming the attribute combination is automatically correct.
- `2026-04-09 11:03:52 NZST` - Updated the heading map to use a real page `h1`, shared preview `h2` titles via `GoldPulseText as="h2"`, overlay `h2` section titles, and overlay-local `h3` headings without skipping levels.
- `2026-04-09 11:03:52 NZST` - Replaced the identity portrait `div role="img"` with a native `<img alt="Portrait of Warrick Smith">` and preserved existing decorative image handling and portfolio screenshot alt text.
- `2026-04-09 11:03:52 NZST` - Added `<span role="alert" aria-live="polite" aria-atomic="true">` field-error messaging in `ContactForm.tsx`, kept `aria-describedby` wiring, and stopped mirroring validation errors into the summary status region to avoid duplicate announcements before VoiceOver verification.
- `2026-04-09 11:03:52 NZST` - Verified `npm run build`, `npm run dev`, headless Chrome DOM checks, and breakpoint screenshots at 375px, 768px, and 1000px.
- `2026-04-09 11:24:41 NZST` - VoiceOver verification on macOS was completed manually and confirmed the landmark, heading, dialog, article, and contact-form announcement requirements for Story 6.4.
- `2026-04-09 11:24:41 NZST` - Verified keyboard regression locally against the running app: the About card opens via keyboard, the focus trap wraps Shift+Tab to the last focusable and Tab back to Close, Escape closes the dialog, focus-return is still triggered on the source card, and About -> Portfolio -> About cross-card navigation remains intact.
- `2026-04-09 11:24:41 NZST` - Story 6.4 is complete and moved to `review`.
- `2026-04-09 12:14:15 NZST` - Addressed review follow-up decision 1 by removing `role="alert"` from field error spans and keeping polite inline live regions, aligning the implementation with the story's non-interrupting validation intent and current ARIA guidance.
- `2026-04-09 12:14:15 NZST` - Reviewed the form-level validation-summary finding and kept the current design: field-level validation owns inline error announcements, while the form-level status region remains reserved for captcha and submission-state messaging to avoid duplicate speech.
- `2026-04-09 12:14:15 NZST` - Updated `deferred-work.md` to close the GoldPulseText semantic-heading deferred item and verified the review follow-up with `npm run build` plus a targeted browser check confirming polite field-error live regions and intact status messaging.
- `2026-04-09 12:14:15 NZST` - Review workflow finished: all review findings were resolved or dispositioned, and Story 6.4 was promoted from `review` to `done`.

### Change Log

- `2026-04-09` - Completed Story 6.4 semantic heading, image, dialog, and contact-form announcement updates; verified responsive rendering, VoiceOver behavior, and Story 6.3 keyboard/cross-card regression paths; promoted story status to `review`.
- `2026-04-09` - Addressed Story 6.4 review follow-up by normalizing inline validation live-region semantics and closing the resolved GoldPulseText deferred-work tracking item.
- `2026-04-09` - Closed the Story 6.4 review workflow and marked the story as `done`.

### File List

- `_bmad-output/implementation-artifacts/6-4-screen-reader-compatibility-and-semantic-html.md`
- `_bmad-output/implementation-artifacts/deferred-work.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/components/about/AboutContent.tsx`
- `src/components/common/CardPreview.tsx`
- `src/components/common/GoldPulseText.tsx`
- `src/components/common/SectionHeading.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/namecard/IdentityCard.tsx`

### Review Findings

- [x] [Review][Decision] `role="alert"` + `aria-live="polite"` contradictory on field error spans — Valid finding. Decision: remove `role="alert"` and keep `aria-live="polite"` + `aria-atomic="true"` on field error spans. This matches the story's non-interrupting announcement intent, current ARIA guidance that `alert` is assertive, and the best end-user experience for inline validation. Sources: blind+edge+auditor. `ContactForm.tsx:519-523, 568-573`
- [x] [Review][Decision] Form-level validation summary removed — Not a valid defect for Story 6.4. No code change. AC 10 requires live-region communication for submission states, and `formMessage` still owns captcha, submitting, success, and error messaging while field-level validation remains inline to avoid duplicate announcements. The manually confirmed VoiceOver pass already validated that contact-form validation and submit states are announced exactly once. Sources: blind+edge+auditor. `ContactForm.tsx:247-273, 298-325, 347-392, 442-457`
- [x] [Review][Patch] `deferred-work.md` not updated to close GoldPulseText deferred item — Valid finding. Resolved by marking the GoldPulseText semantic-heading item as completed in `deferred-work.md` and removing stale Story 6.4 targeting references. `_bmad-output/implementation-artifacts/deferred-work.md`
- [x] [Review][Defer] `aria-describedby` references non-existent element when field has error but untouched — `aria-describedby` points to `${fieldId}-error` but the span only renders when `touchedFields[field.name]` is true. Broken ARIA reference. Pre-existing pattern not introduced by this diff. `ContactForm.tsx:508-509,518`
- [x] [Review][Defer] `aria-invalid` set on inputs before user has touched the field — `aria-invalid={Boolean(fieldError)}` applied unconditionally, but visible error only shows after touch. Pre-existing. `ContactForm.tsx:508`
- [x] [Review][Defer] `GoldPulseText` `as` prop accepts any `ElementType` with no constraint — Could receive invalid elements or components that don't support `className`/`data-*`. Current usage is only `as="h2"`. Code quality concern. `GoldPulseText.tsx:5`
- [x] [Review][Defer] `m-0` heading reset fragile — Added in `CardPreview` rather than inside `GoldPulseText` when rendered as block element. Future consumers must remember to add it. `CardPreview.tsx:21`
- [x] [Review][Defer] `aria-atomic="true"` on live regions may cause chatty re-announcements — Full region re-announced on every message change. Theoretical concern, standard pattern. `ContactForm.tsx:442,521,571`
- [x] [Review][Defer] Field error spans conditionally mount/unmount — No announcement when error clears (span removed from DOM). Standard React pattern, not a regression. `ContactForm.tsx:518,568`
- [x] [Review][Defer] `clearSubmissionFeedback` still guards on `formMessage?.tone !== 'info'` — Info-tone validation messages removed but info-tone still used for captcha/Sending states. Logic is correct but confusing for maintainers. `ContactForm.tsx:158-166`
- [x] [Review][Defer] IdentityCard `<img>` no error handling for failed loads — Previous `backgroundImage` approach silently showed nothing. `<img>` shows broken icon on failure. Minor visual regression risk. `IdentityCard.tsx:23-27`
