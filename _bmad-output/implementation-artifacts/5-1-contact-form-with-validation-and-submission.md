# Story 5.1: Contact Form with Validation and Submission

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to send a message through a polished contact form with clear feedback,
so that I can reach out to Warrick easily and know my message was sent successfully.

## Acceptance Criteria

1. `ContactContent` renders inside the Get In Touch overlay with a display heading, brief intro text, and a `ContactForm` component, while preserving the current overlay composition pattern.
2. `ContactForm` renders a name field, email field, message textarea, reCAPTCHA v2 widget, and submit button using semantic `<form>` markup and visible `<label>` elements for every field.
3. The form fully implements the UX-DR23 six-state model: Empty, Filling, Validating, Submitting, Success, and Error.
4. Validation occurs on blur rather than on every keystroke. Invalid fields show inline errors linked via `aria-describedby`, valid fields clear errors cleanly, and validation/submission feedback is announced through an `aria-live="polite"` region.
5. reCAPTCHA verification is required before submission, token expiry disables submission again, and reCAPTCHA unavailability produces a graceful retryable message that never permanently blocks the form.
6. Submission uses EmailJS through `src/config/env.ts` and the contact template id already defined for the repo. Missing env configuration, EmailJS failure, or timeout conditions produce a non-technical user-facing error while keeping field values intact for retry.
7. Success state changes the button to a success treatment, shows "Message sent", resets the captcha, and clears the form after a 4 second delay.
8. `ContactContent` visibly exposes contact information required by FR22: location, direct email, and social/profile link(s), with data sourced from `src/data/` rather than hardcoded component strings.
9. Manual verification covers desktop, tablet, and mobile layouts; current card registry behavior; form validation states; captcha expiry/error handling; and successful/failed submission flows.

## Tasks / Subtasks

- [x] Task 1: Rework the expanded contact overlay shell without replacing the existing feature entry point (AC: 1, 8, 9)
  - [x] Keep `src/components/contact/ContactContent.tsx` as the expanded card shell and continue using `OverlayContentGroup` for heading/body/actions staging.
  - [x] Add a data-driven contact-information block that displays location, direct email, and social/profile link(s) in the content area alongside the form.
  - [x] Preserve the current Get In Touch preview card and current card registry behavior; this story improves the contact experience, not the card map.

- [x] Task 2: Refactor `ContactForm` around explicit form and field state instead of status strings (AC: 2, 3, 4, 7)
  - [x] Replace placeholder-only inputs with labeled controls and stable ids for `htmlFor` / `aria-describedby`.
  - [x] Track field values, touched/blur state, per-field errors, top-level message state, and submit status with explicit local state.
  - [x] Implement the UX-DR23 Empty -> Filling -> Validating -> Submitting -> Success -> Error transitions without introducing a new form library.

- [x] Task 3: Harden reCAPTCHA and EmailJS integration for graceful failure and bounded waiting (AC: 5, 6, 7)
  - [x] Continue reading env values only from `src/config/env.ts`.
  - [x] Handle captcha success, expiry, and error explicitly using the wrapper callbacks available in this repo.
  - [x] Wrap external submission in a client-side timeout so the form never sits in an indefinite pending state.
  - [x] Preserve user input on failure, reset the captcha after attempted submission, and clear only after confirmed success.

- [x] Task 4: Verify the end-to-end UX and regression boundaries manually (AC: 1-9)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev`.
  - [x] Perform controlled local EmailJS verification using the documented `.env` key toggle procedure.
  - [x] Verify the current Get In Touch overlay still opens and closes correctly from card `6` across desktop, tablet, and mobile after the form/content refactor.

## Dev Notes

### Critical Story Guardrails

- Live repo truth wins over stale planning notes. The current desktop card registry is: 1 Hero, 2 Name, 3 About, 4 Portfolio, 5 Approach, 6 Contact. Get In Touch is card `6`, not card `5`.
- Reuse the existing `src/components/contact/ContactContent.tsx` and `src/components/contact/ContactForm.tsx`. This is a refactor-and-complete story, not a greenfield contact feature.
- The Epic 4 retrospective bug list is partly stale. In the current `ContactForm.tsx`, `e.preventDefault()` already runs before early returns, `onCaptchaChange` already maps `null` to `false` via `Boolean(value)`, and env values are already guarded before `emailjs.sendForm(...)`. Do not spend time "fixing" those already-resolved issues; preserve them as regression boundaries.
- The real remaining gaps are: no visible labels, no `aria-describedby` wiring, no `aria-live` feedback region, no blur-driven validation model, no explicit six-state UX model, no timeout handling, no graceful reCAPTCHA error state, and no FR22 contact info panel.
- `handleInputFocus()` currently clears `captchaValid` on any field focus. Treat that as suspect behavior and remove or replace it unless there is a deliberate product reason to require re-verification after editing.
- No automated test framework exists in this repo. Manual browser verification only.

### Repo Facts Discovered During Story Preparation

- `src/components/contact/ContactContent.tsx` already uses `OverlayContentGroup` slots (`heading`, `body`, `actions`) and a responsive two-column layout that can absorb the final contact panel without changing overlay infrastructure.
- `src/components/contact/ContactForm.tsx` currently uses placeholder-only controls, icon affordances, a free-form `sendStatus` string, `ReCAPTCHA`, and an `<input type="submit">`.
- `src/data/personalData.tsx` currently exposes `profile.location` and `profile.githubUrl`, but it does not yet expose a direct email or a dedicated contact/social block that satisfies FR22.
- `.env.example` and `stack.env.example` already define `EMAILJS_SERVICE_ID`, `EMAILJS_CONTACT_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, and `RECAPTCHA_SITE_KEY`.
- `src/styles/main.css` already defines the needed visual tokens: `--color-success`, `--color-error`, `--color-info`, `--color-border-subtle`, `--color-border-accent`, and `--shadow-glow`.
- Installed repo types for `react-google-recaptcha` confirm the wrapper supports `onChange(token | null)`, `onExpired`, `onErrored`, `reset()`, and `getValue()`.

### Architecture Compliance

- Keep contact UI work inside `src/components/contact/`.
- Keep all env access through `src/config/env.ts`; never read `process.env` directly from the component.
- Keep transient form state local to `ContactForm`; do not introduce Context, Redux, or a heavyweight form library.
- Use the repo's Tailwind-first styling and token system from `src/styles/main.css`; do not reintroduce styled-components.
- Preserve the current overlay architecture and animation ownership: overlay choreography stays with existing Framer Motion wrappers, while form styling and validation states remain Tailwind/CSS driven.
- Follow the architecture error-handling pattern: graceful user-facing failure for the contact form, no raw external-service errors shown to the visitor, and no unhandled exceptions escaping the submission path.

### Likely Touch Points

- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/data/personalData.tsx`
- `src/styles/main.css` (only if a utility/token mapping is missing for success/error treatments)
- `.env.example` and `stack.env.example` (only if contact env documentation drifts from implementation)
- `src/lib/` or `src/services/` (only if a timeout helper is extracted for reuse)

### Likely No-Touch Files Unless a Blocker Is Found

- `src/components/contact/ContactCard.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/common/OverlayContentGroup.tsx`
- `src/components/MainPage.tsx`
- `src/hooks/useVisitorTracker.ts`

### Project Structure Notes

- `_bmad-output/project-context.md` is stale on the styling system. Ignore its styled-components guidance for this story; live repo docs and source are Tailwind-first.
- Planning artifacts and the live repo disagree on card numbering. Treat `docs/architecture.md` and `src/components/common/renderChildDiv.tsx` as the implementation source of truth.
- FR22 currently has no complete source-of-truth contact data structure. Expect a small typed data-model addition rather than hardcoded contact strings inside `ContactContent.tsx`.
- Do not add backend endpoints or server-side form handling. Contact remains a client-side EmailJS flow by product design.

### Technical Requirements

- Repo-pinned stack from `package.json`: React `19.2.4`, TypeScript `6.0.2`, Tailwind CSS `4.2.2`, Framer Motion `12.38.0`, `@emailjs/browser` `4.4.1`, `react-google-recaptcha` `3.1.0`, Node `>=24`.
- Continue using `emailjs.sendForm(...)`; do not replace EmailJS with another mail/form integration library for this story.
- Keep reCAPTCHA on v2. Official EmailJS CAPTCHA documentation still supports reCAPTCHA v2 only and requires template-side verification to be enabled.
- Recommended local state shape:
  - field values
  - touched/blurred state
  - per-field error strings
  - captcha token / availability / error state
  - submit status enum such as `'idle' | 'submitting' | 'success' | 'error'`
  - top-level form message for retryable errors
- Validation rules:
  - `name`: required, trimmed non-empty
  - `email`: required, valid email format, friendly human-readable error text
  - `message`: required, trimmed non-empty
  - validation fires on blur, not on each keystroke
- Accessibility requirements:
  - visible `<label>` per control
  - inline error text linked through `aria-describedby`
  - shared `aria-live="polite"` region for validation and submission feedback
  - submit control exposes `aria-busy="true"` while submitting
  - semantic `<form>` retained
- Submission requirements:
  - require a valid captcha token before sending
  - handle expiry and widget/network errors explicitly via `onChange(null)`, `onExpired`, and `onErrored`
  - bound EmailJS submission with a client-side timeout so the UI cannot spin forever
  - preserve field values on failure, reset the captcha after attempted submission, and clear only after confirmed success plus a 4 second delay
  - never surface raw EmailJS or reCAPTCHA technical error text to the visitor
- Contact-information requirements:
  - show location, direct email, and at least one social/profile link
  - keep the data in `src/data/`
  - keep layout and typography aligned with the existing expanded-card quality bar
- Do not add `react-hook-form`, Zod, or another new validation/form-state dependency for this story.

### Testing Requirements

- No automated testing framework. Do not add test files.
- Required verification:
  - `npm run build`
  - `npm run dev`
  - manual browser checks on desktop, tablet, and mobile
- Manual checks:
  - Get In Touch opens and closes correctly from the current card `6` on all breakpoints
  - visible labels remain readable and correctly associated with their inputs
  - blur-only validation shows and clears errors correctly
  - submit without captcha never reloads the page and gives clear guidance
  - captcha expiry disables submission again
  - captcha/network unavailability produces a graceful retryable message
  - successful submission shows `Sending...` -> `Message sent`, then clears after 4 seconds
  - failed submission shows a retryable error and preserves field values
  - contact info area renders location, direct email, and social/profile link(s)
- Local EmailJS verification procedure:
  - temporarily uncomment or set `EMAILJS_PUBLIC_KEY` in `.env` for controlled local testing
  - run minimal live submissions only
  - remove or re-comment the live key locally after verification
  - production remains driven by Portainer runtime env via `docker-entrypoint.sh`

### Previous Story Intelligence

- Epic 4 retrospective carried forward three items that still matter here: EmailJS local-testing discipline, a full UX-DR23 six-state audit, and contact overlay verification after the recent grid/card-map changes.
- The three specific ContactForm bugs recorded in the retro are already resolved in the current source. Treat them as regression boundaries, not active implementation tasks.
- Story 4.3 established the current six-card desktop registry with Contact as its own entry point at card `6`. Story 5.1 must verify that the contact overlay still behaves correctly after that grid expansion.
- `OverlayContentGroup` already provides heading/body/actions stagger timing and reduced-motion fallback. Reuse it instead of inventing a contact-specific entry animation system.

### Latest Technical Information

- Official EmailJS React example still uses `emailjs.sendForm(...)` for browser form submission.
- Official EmailJS CAPTCHA documentation says EmailJS supports Google reCAPTCHA v2 and requires template-side CAPTCHA verification to be enabled.
- Google reCAPTCHA v2 documentation exposes success, expired, and error callbacks; the page is responsible for telling the user to retry when an error occurs.
- Installed repo typings for `react-google-recaptcha` confirm this wrapper exposes `onChange(token | null)`, `onExpired`, `onErrored`, and `reset()` in the current stack.

### Project Context Reference

- `_bmad-output/project-context.md` is still useful for manual-verification expectations, local-state ownership, env-handling discipline, and graceful-error behavior.
- Ignore the styled-components guidance in that file for this story; live repo docs and source are the correct authority.

### References

- `_bmad-output/planning-artifacts/epics.md` - Epic 5 / Story 5.1 acceptance criteria and implementation notes
- `_bmad-output/planning-artifacts/prd.md` - FR20-FR22, security, accessibility, and integration NFRs
- `_bmad-output/planning-artifacts/architecture.md` - contact mapping, env boundary, service degradation, and accessibility rules
- `_bmad-output/planning-artifacts/ux-design-specification.md` - ContactContent, ContactForm, UX-DR23 feedback model, and animation timing
- `_bmad-output/implementation-artifacts/epic-4-retro-2026-04-06.md` - EmailJS testing procedure and Story 5 preparation notes
- `_bmad-output/project-context.md`
- `docs/architecture.md`
- `docs/development-guide.md`
- `docs/component-inventory.md`
- `.env.example`
- `stack.env.example`
- `package.json`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/contact/ContactCard.tsx`
- `src/components/common/OverlayContentGroup.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/config/env.ts`
- `src/data/personalData.tsx`
- `src/styles/main.css`
- `src/hooks/useVisitorTracker.ts`
- `node_modules/@types/react-google-recaptcha/index.d.ts`
- External: `https://www.emailjs.com/docs/examples/reactjs/`
- External: `https://www.emailjs.com/docs/user-guide/adding-captcha-verification/`
- External: `https://developers.google.com/recaptcha/docs/display`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `5-1-contact-form-with-validation-and-submission` as `ready-for-dev`
- Epic 5 must move from `backlog` to `in-progress`
- Story package captures planning drift so the dev agent works from live repo truth

## Open Questions / Assumptions

- Assumption: FR22 contact details should live in `src/data/personalData.tsx` via a minimal new typed contact block rather than hardcoded strings inside `ContactContent.tsx`.
- Assumption: current EmailJS env variable names and template wiring are already correct and do not require renaming.
- Open question: what exact direct email address and which social/profile link(s) should appear in the contact panel if they are not already available elsewhere in project data?
- Assumption: timeout handling will be implemented client-side around `emailjs.sendForm(...)` rather than by adding new infrastructure.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Implementation Plan

- Extend `ContactContent.tsx` with a data-driven contact-information panel while preserving the current overlay composition.
- Refactor `ContactForm.tsx` to use explicit local state for field validation, captcha state, and submission status instead of the current status-string approach.
- Harden EmailJS + reCAPTCHA handling with graceful retryable failures, timeout protection, and accessible feedback.
- Manually verify the full contact journey across breakpoints using the documented local EmailJS testing procedure.

### Debug Log References

- `sed -n '1,260p' _bmad/bmm/4-implementation/bmad-create-story/workflow.md`
- `sed -n '1,260p' _bmad/bmm/4-implementation/bmad-create-story/template.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '580,700p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '300,420p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '840,910p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '1038,1078p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '300,360p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '460,540p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '84,110p' _bmad-output/implementation-artifacts/epic-4-retro-2026-04-06.md`
- `sed -n '1,220p' docs/architecture.md`
- `sed -n '1,220p' docs/development-guide.md`
- `sed -n '90,120p' docs/component-inventory.md`
- `sed -n '1,220p' .env.example`
- `sed -n '1,220p' stack.env.example`
- `sed -n '1,240p' src/components/contact/ContactForm.tsx`
- `sed -n '1,220p' src/components/contact/ContactContent.tsx`
- `sed -n '1,260p' src/components/common/renderChildDiv.tsx`
- `sed -n '1,220p' src/config/env.ts`
- `sed -n '1,240p' src/hooks/useVisitorTracker.ts`
- `sed -n '1,240p' src/data/personalData.tsx`
- `sed -n '1,260p' src/styles/main.css`
- `sed -n '1,220p' node_modules/@types/react-google-recaptcha/index.d.ts`
- `sed -n '1,220p' package.json`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `git config --get user.email`
- `npm run build`
- `npm run dev`
- `ss -ltnp 'sport = :3000'`
- `npm run dev -- --port 3001`
- `node <<'NODE' ... CDP smoke check for card 6 open/close and blur validation ... NODE`
- `sed -n '1,220p' dist/config.js`
- `printenv | rg 'EMAILJS|RECAPTCHA|ENABLE_VISITOR_TRACKING|DEBUG_VISITOR_TRACKING|API_URL'`

### Completion Notes List

- `2026-04-06 20:15:33 NZST` - Prepared Story 5.1 with repo-grounded guidance for the existing contact overlay, full UX-DR23 state compliance, FR22 data-model completion, and bounded EmailJS/reCAPTCHA failure handling.
- `2026-04-06 20:15:33 NZST` - Captured the key planning drift: Contact is currently card `6`, project context styling notes are stale, and the Epic 4 "known ContactForm bugs" are already fixed in source.
- `2026-04-06 20:41:05 NZST` - Completed the contact-content refactor with a data-driven location, direct-email, and GitHub profile panel sourced from `src/data/personalData.tsx` while preserving the existing Get In Touch card entry point and `OverlayContentGroup` slot structure.
- `2026-04-06 20:41:05 NZST` - Rebuilt `ContactForm.tsx` around explicit local state for values, touched fields, field errors, captcha state, feedback messaging, and form phase; added visible labels, `aria-describedby` wiring, `aria-live` feedback, timeout-bounded EmailJS submission, captcha expiry/error handling, and delayed success reset behaviour.
- `2026-04-06 20:41:05 NZST` - Validation completed: `npm run build` passed, and a Chrome DevTools Protocol smoke check verified card `6` overlay open/close on desktop, tablet, and mobile plus blur-validation/error-clearing on the name field.
- `2026-04-06 20:41:05 NZST` - Story remains `in-progress` because controlled live EmailJS/reCAPTCHA submission verification is blocked locally: `dist/config.js` contains no client-safe env values, shell env is empty for `EMAILJS_*` and `RECAPTCHA_*`, and the default `npm run dev` command on port `3000` collided with an existing webpack process.
- `2026-04-06 20:59:31 NZST` - Updated the contact-availability copy to remove the inaccurate seniority claim and explicitly include job discussions in the supported conversation types.
- `2026-04-06 20:59:31 NZST` - Final validation completed: `npm run build` passed again, and Warrick manually confirmed the live `npm run dev` flow, EmailJS submission, and reCAPTCHA verification all worked end to end. Story 5.1 is now ready for review.
- `2026-04-06 21:51:58 NZST` - Completed the review workflow by validating the recorded findings, fixing the valid follow-ups in `ContactForm.tsx`, carrying the two accepted defers in `deferred-work.md`, and syncing Story 5.1 from `review` to `done`.

### Change Log

- `2026-04-06` - Implemented Story 5.1: expanded contact overlay content, explicit contact-form state and validation flow, resilient EmailJS/reCAPTCHA handling, and FR22 contact information sourced from `src/data/`.
- `2026-04-06` - Completed the Story 5.1 review workflow; valid review findings were resolved, low-signal findings were dismissed, deferred items remained tracked in `deferred-work.md`, and the story advanced to `done`.

### File List

- `_bmad-output/implementation-artifacts/5-1-contact-form-with-validation-and-submission.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/data/personalData.tsx`

### Review Findings

- [x] [Review][Decision] 1-second success reset window — accepted as a UX-driven spec adjustment. The success state now holds for 4 seconds so users have time to register "Message sent" before the form clears.
- [x] [Review][Patch] Double-click can send duplicate emails [`ContactForm.tsx:handleSubmit`] — valid. Added a ref-based in-flight guard at the top of `handleSubmit` so duplicate submit events bail out before a second `emailjs.sendForm(...)` starts.
- [x] [Review][Patch] handleCaptchaExpired overwrites state during active submission [`ContactForm.tsx:handleCaptchaExpired`] — valid. Expiry events now no-op while the form is actively submitting, so the live "Sending your message..." feedback is not replaced mid-request.
- [x] [Review][Patch] No maxLength on any input/textarea [`ContactForm.tsx:inputs/textarea`] — valid. Added pragmatic caps of 100 / 254 / 2000 characters to the name, email, and message fields to bound the EmailJS payload.
- [x] [Review][Patch] aria-describedby points to potentially absent error element [`ContactForm.tsx:inputs`] — dismissed. The current state flow only renders field errors after the corresponding field is marked touched in the same render batch, so the reference does not dangle in practice.
- [x] [Review][Patch] captchaMessage paragraph has no aria-live [`ContactForm.tsx:captchaMessage <p>`] — valid. The captcha status copy now uses a polite live status role so verification changes are announced to assistive technology.
- [x] [Review][Patch] handleCaptchaErrored forces error styling during filling phase [`ContactForm.tsx:handleCaptchaErrored`] — valid. ReCAPTCHA failures still show a retryable error message, but the submit button only flips to the error treatment if the failure happens during an active submission.
- [x] [Review][Patch] ReCAPTCHA overflow-x-auto creates keyboard scroll trap [`ContactForm.tsx:ReCAPTCHA wrapper`] — dismissed. The wrapper is not keyboard focusable, so there is no actual trap to fix; adding a landmark would add noise without improving control of the embedded widget.
- [x] [Review][Patch] Location card div lacks semantic role [`ContactContent.tsx:location card`] — dismissed. The static content already reads correctly with native semantics, and adding `role="group"` / `aria-label` would increase verbosity without adding useful structure.
- [x] [Review][Defer] Cannot abort in-flight emailjs.sendForm after timeout [`ContactForm.tsx:Promise.race`] — deferred, pre-existing library limitation. Timeout fires but network request continues, potentially causing duplicate sends on retry. No AbortController support in emailjs SDK.
- [x] [Review][Defer] Empty contact.links array renders empty Profiles section [`ContactContent.tsx:profiles section`] — deferred, data concern. If links array is empty, section heading renders with no content. Not a code bug.
