# Story 2.2: Card Hover Effects and GoldPulseText

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see rich, layered hover effects when I move my cursor over cards,
so that I feel invited to click and immediately sense the craft and attention to detail.

## Acceptance Criteria

1. The full Story 2.2 hover treatment applies to the current interactive preview cards in this repo: cards `3`, `4`, and `5`. Card `1` remains decorative with no hover treatment, and card `2` (`NameCard`) remains static and non-interactive despite the planning-doc inconsistency that labels cards `2-5` as interactive.
2. On hover-capable fine pointers, each interactive card shows a cursor-tracking radial glow driven by CSS custom properties `--mx` and `--my`, updated by a lightweight pointer handler, with `accent-primary` at roughly 6% opacity fading to transparent by roughly 60% radius.
3. Hovering an interactive card also applies the remaining layered effects together: a spring-like `scale-[1.02]` feel using the design-system cubic-bezier timing, a gold corner bleed using `accent-primary-glow`, and a deeper ambient shadow/lift. Transform and shadow settle in about `400ms`; glow and gradient settle in about `500ms`.
4. When the pointer leaves at any point, all hover layers unwind smoothly from the current visual state with no snapping or abrupt reset.
5. `GoldPulseText` is wired to the shared card hover state. While hovered, it plays one `1.5s` gold text-shadow pulse cycle and then holds the hovered glow state. When not hovered, it returns to the resting state cleanly.
6. On touch / no-hover devices, the cursor-tracking glow is disabled. If touch feedback is added, it is brief, accent-border-oriented, and does not create a fake persistent hover state.
7. `prefers-reduced-motion` is respected: no animated pulse loop, no animated hover choreography, and the title glow falls back to a static gold text-shadow while the UI remains fully legible and visually complete.
8. Hover behavior is implemented with Tailwind/CSS and lightweight DOM event handling only, not Framer Motion hover props, and the existing click-to-expand path for cards `3-5` continues to work unchanged.

## Tasks / Subtasks

- [x] Task 1: Add the shared hover-surface system in `Card.tsx` without breaking the current expansion path (AC: 1, 2, 3, 4, 6, 8)
  - [x] Keep the root `motion.div` and current `layout` usage intact for open/close behavior, but do not drive hover transforms through Motion.
  - [x] Add the hover-layer structure in the shared card foundation so cards `3-5` inherit the same treatment without duplicating code in feature folders.
  - [x] Use decorative layers (`before`/`after` or absolutely positioned child elements) with `pointer-events-none` so click/tap behavior remains unchanged.
  - [x] Update `--mx` and `--my` from a lightweight pointer handler only for interactive cards and only when a fine, hover-capable pointer is in play.
  - [x] Reset or neutralize the glow position on leave so stale pointer coordinates do not linger when the next hover begins.

- [x] Task 2: Wire `GoldPulseText` and `CardPreview` to the shared hover state (AC: 3, 5, 7, 8)
  - [x] Reuse the existing `pulse` affordance from `GoldPulseText.tsx`; Story 1.3 explicitly deferred this wiring to Story 2.2.
  - [x] Replace the current infinite `gold-pulse` behavior with a one-cycle-then-hold hover treatment that matches the UX spec.
  - [x] Keep the About / Portfolio / Contact preview markup content unchanged unless a tiny prop or wrapper change is required for the shared hover contract.
  - [x] Preserve the current title colour split (white + accent spans) and avoid introducing duplicate title components per feature card.

- [x] Task 3: Implement touch/no-hover and reduced-motion behavior in the same shared layer (AC: 4, 6, 7, 8)
  - [x] Gate desktop hover styling with the existing Tailwind hover/pointer variants instead of bespoke viewport checks.
  - [x] Provide a coarse-pointer / no-hover fallback that does not imply mouse-style hover on touch screens.
  - [x] Keep reduced-motion behavior local to the hover primitives and `main.css`; do not add global state or app-wide motion toggles for this story.
  - [x] Ensure any hover-specific styles degrade to a clear, premium resting state when motion is reduced.

- [x] Task 4: Verify the effect at the real trouble spots and with the real input modes (AC: 1, 2, 3, 4, 5, 6, 7, 8)
  - [x] Run `npm run build`.
  - [x] Run `npm run dev` or reuse the already-running dev server on `:3000` if the port is occupied.
  - [x] Manually verify cards `3-5` on desktop at `1440px+`, `1000px`, and `900px` with a fine pointer.
  - [x] Emulate touch / no-hover behavior at `768px`, `600px`, and `375px` to confirm the cursor-tracking glow is absent and tap behavior still expands cards directly.
  - [x] Emulate `prefers-reduced-motion: reduce` and confirm there is no animated hover choreography, while the title glow falls back to a static gold state.
  - [x] Confirm card `1` stays decorative, card `2` stays static, and cards `3-5` still open and close correctly after the hover work lands.

## Dev Notes

### Critical Story Guardrails

- Current repo truth is stricter than one line in the planning docs: cards `1` and `2` are intentionally non-interactive today, and only cards `3-5` expand. Do not make `NameCard` look clickable just because some planning docs say “Cards 2-5”.
- Do not pull Story 2.3 / 2.4 scope into this work. No overlay rewrite, no per-card expansion variants, no `AnimatePresence` redesign, and no content-stagger work in this story.
- Do not use Motion `whileHover`, `animate`, or other hover props on the same element that already uses `layout`. Motion’s official docs state layout animations are transform-based, so hover transform work must stay in CSS on an inner layer or equivalent shared wrapper.
- `pointermove` can fire at a very high rate. Do not push pointer coordinates through React state on every frame. Update CSS custom properties imperatively on the current target or a dedicated ref instead.
- Keep hover logic shared. `AboutCard.tsx`, `PortfolioCard.tsx`, and `ContactCard.tsx` should stay thin wrappers around `CardPreview` content, not become separate hover implementations.
- The repo does not yet expose the full card keyboard semantics from the UX spec. Keep the hover layers reusable for later `focus-visible` work, but do not expand this story into the dedicated keyboard-accessibility scope unless a tiny touched-code fix is unavoidable.
- Preserve the “click invitation without hover dependency” requirement from Story 2.1. The resting state must still read as deliberate and premium before any hover occurs.
- `_bmad-output/project-context.md` still contains stale styled-components guidance. For this story, trust the current Tailwind repo, `docs/architecture.md`, `epics.md`, and `architecture.md` over that stale project-context rule set.

### Repo Facts Discovered During Story Preparation

- `src/components/common/Card.tsx` is currently a `motion.div` root with `layout`, `relative`, `overflow-hidden`, the Story 2.1 resting gradient surface, and no hover-specific layers or pointer CSS variables.
- `src/components/common/CardPreview.tsx` already centralizes the icon/title/description markup for cards `3-5`, so Story 2.2 should extend that shared path rather than modifying three feature cards separately.
- `src/components/common/GoldPulseText.tsx` already has a `pulse` prop, but `CardPreview.tsx` does not pass it yet.
- `src/styles/main.css` already defines `@keyframes gold-pulse` and `--animate-gold-pulse`, but the current animation token is `infinite`, which conflicts with the UX requirement of one cycle followed by a hovered hold state.
- `src/components/MainPage.tsx` still gates click expansion so that IDs `1` and `2` do nothing, and `src/components/common/renderChildDiv.tsx` only maps expanded content for IDs `3-5`.
- `docs/architecture.md` and `docs/project-overview.md` both reinforce the current runtime behavior: card `2` is static, cards `3-5` are the expandable content cards.

### Architecture Compliance

- `MainPage.tsx` remains the single source of truth for which card is open. Story 2.2 must not introduce a new global selection or hover store.
- Tailwind/CSS owns hover, pointer, focus-visible-ready styling, reduced-motion CSS, and any keyframe utilities used for this story.
- Inline `style` is allowed only where the architecture already permits it: dynamic values not expressible as static utilities, such as `--mx` / `--my`.
- Shared hover primitives belong in `src/components/common/` and `src/styles/main.css`. Feature folders should consume them, not reimplement them.
- Keep clickable behavior and decorative hover layers separate: hover visuals must not intercept events needed for open/close interactions.

### Library / Framework Requirements

- Runtime versions currently pinned in `package.json`: `react@^19.2.4`, `react-dom@^19.2.4`, `framer-motion@^12.38.0`, `tailwindcss@^4.2.2`, `webpack@^5.105.4`, `typescript@^6.0.2`.
- Tailwind’s variant reference shows `hover` compiles under `@media (hover: hover)`, and Tailwind exposes `pointer-fine`, `pointer-coarse`, `motion-safe`, `motion-reduce`, and `focus-visible` variants that are directly relevant to this story. Prefer these over custom media-query class names when possible.
- Tailwind theme variables are not only utility generators; they can also be referenced as ordinary CSS variables. Reuse the existing `@theme` tokens from `src/styles/main.css` instead of hardcoding gold and shadow values inline.
- Tailwind 4.2 now ships `text-shadow` utilities plus `text-shadow-[<value>]` and `text-shadow-(<custom-property>)`. If this simplifies `GoldPulseText`, it is acceptable to use those utilities instead of a more awkward arbitrary-property workaround.
- Motion’s layout-animation docs explicitly say layout changes should be driven by `className` / `style`, not hover animation props like `whileHover`, and that layout animation performance relies on `transform`. Treat that as a hard guardrail for this card root.
- `pointermove` is preferable to raw `mousemove` for the coordinate-tracking part of this story because it offers the same interaction role with broader pointer coverage. Keep the handler minimal because the event can fire at a very high rate.

### File Structure Requirements

Expected files to touch:

- `src/components/common/Card.tsx`
- `src/components/common/CardPreview.tsx`
- `src/components/common/GoldPulseText.tsx`
- `src/styles/main.css`

May need a small supporting change only if the shared contract becomes clearer:

- `src/components/MainPage.tsx`

Files that should not need Story 2.2 changes unless a blocker is found:

- `src/components/about/AboutCard.tsx`
- `src/components/portfolio/PortfolioCard.tsx`
- `src/components/contact/ContactCard.tsx`
- `src/components/namecard/NameCard.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/components/contact/ContactContent.tsx`

### Project Structure Notes

- Keep the hover implementation inside the shared card stack. Do not create per-feature hover wrappers for About / Portfolio / Contact.
- Avoid creating a dedicated hover hook unless `Card.tsx` becomes unreadable. The current repo pattern prefers small shared components plus local state/handlers over new abstraction layers.
- If a new helper becomes truly necessary, it belongs in `src/components/common/` or `src/lib/`, not inside a feature folder.

### Testing Requirements

- No automated test framework. Do not add test files.
- Required verification:
  - `npm run build`
  - `npm run dev` or reuse the active local dev server
  - Browser/device-emulation checks for fine pointer, coarse pointer, and reduced motion
- Manual checks:
  - Cards `3-5` visibly react on hover with all intended layers
  - Hover exit never snaps, even when leaving mid-animation
  - Card `2` does not suddenly look interactive
  - Tap on mobile still opens cards directly without a fake desktop-hover phase
  - Reduced motion removes animation while preserving clear hovered/readable styling
  - Existing open/close behavior for cards `3-5` is unchanged

### Previous Story / Epic Intelligence

- Story 1.3 created `GoldPulseText` and explicitly deferred hover-state wiring to Story 2.2. Reuse that deferred intent instead of inventing a parallel title animation path.
- Story 2.1 deliberately stopped short of the hover system. Its purpose was the resting-state dark-theme foundation, browser-fill layout recovery, and preview-card content. Story 2.2 should build directly on that shared card base.
- Story 2.1 also documented the same source-of-truth conflict present here: the shipped repo and architecture docs keep cards `1` and `2` non-interactive. Carry that guardrail forward.
- Epic 1’s retrospective warned about visual-fidelity drift and stale project guidance. Story 2.2 should improve delight without reintroducing ambiguity about the current Tailwind architecture.

### Latest Technical Information

- Tailwind’s quick-reference table documents that `hover` is emitted inside `@media (hover: hover)`, which supports the Story 2.2 requirement to avoid desktop-style hover behavior on non-hover devices.
- Tailwind’s variant docs explicitly call out `pointer-fine` and `pointer-coarse` for distinguishing accurate pointers from touch-first devices. Use those built-ins before reaching for hand-written device checks.
- Tailwind’s `motion-reduce` and `motion-safe` variants remain the right first-class path for CSS-side reduced-motion behavior. Reduced motion should not be treated as an afterthought or a separate skin.
- Tailwind theme docs confirm the current `@theme` tokens can also be read as ordinary CSS variables and, when needed, can be resolved in JS via `getComputedStyle`. This supports reusing existing tokenized shadow/color values instead of duplicating literals.
- Tailwind 4.2’s `text-shadow` utilities are now broad enough to support custom values and custom properties directly, which may simplify the `GoldPulseText` implementation compared with the earlier arbitrary-property fallback.
- MDN documents that `pointermove` fires whenever pointer coordinates change and can fire at a high rate. That is why the implementation should write CSS vars directly instead of storing live pointer positions in React state.
- Motion’s layout-animation docs reinforce the architecture rule already documented locally: layout animation uses CSS transforms for performance, so hover transforms should not be mixed into Motion hover props on the same `layout` element.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-22-Card-Hover-Effects-and-GoldPulseText]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic-2-Card-Grid--Interactive-Landing-Experience]
- [Source: _bmad-output/planning-artifacts/architecture.md#Tailwind-Class-Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#Animation-Boundary-Pattern]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Card]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#GoldPulseText]
- [Source: _bmad-output/implementation-artifacts/1-3-component-migration-common-and-leaf-components.md]
- [Source: _bmad-output/implementation-artifacts/2-1-card-grid-layout-and-dark-theme-foundation.md]
- [Source: _bmad-output/implementation-artifacts/epic-1-retro-2026-04-02.md]
- [Source: docs/architecture.md]
- [Source: src/components/common/Card.tsx]
- [Source: src/components/common/CardPreview.tsx]
- [Source: src/components/common/GoldPulseText.tsx]
- [Source: src/components/common/renderChildDiv.tsx]
- [Source: src/components/MainPage.tsx]
- [Source: src/styles/main.css]
- [Source: https://tailwindcss.com/docs/hover-focus-and-other-states]
- [Source: https://tailwindcss.com/docs/theme]
- [Source: https://tailwindcss.com/docs/text-shadow]
- [Source: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover]
- [Source: https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-motion]
- [Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event]
- [Source: https://motion.dev/docs/react-layout-animations]

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `2-2-card-hover-effects-and-goldpulsetext` as `ready-for-dev`
- Story package includes the repo-vs-planning-doc card-scope resolution, the current Tailwind/Motion boundary, and latest official docs for hover, pointer, motion, and text-shadow behavior

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `git status --short`
- `git log --oneline -n 8`
- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '412,448p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '780,930p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '260,360p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '360,470p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '1,260p' src/components/common/Card.tsx`
- `sed -n '1,220p' src/components/common/CardPreview.tsx`
- `sed -n '1,260p' src/components/common/GoldPulseText.tsx`
- `sed -n '1,260p' src/components/MainPage.tsx`
- `sed -n '1,260p' src/components/common/renderChildDiv.tsx`
- `sed -n '1,220p' src/components/namecard/NameCard.tsx`
- `sed -n '1,220p' src/styles/main.css`
- `sed -n '100,140p' _bmad-output/implementation-artifacts/1-3-component-migration-common-and-leaf-components.md`
- `sed -n '1,120p' docs/architecture.md`
- `sed -n '1,220p' _bmad-output/implementation-artifacts/epic-1-retro-2026-04-02.md`
- `npm run build`
- `lsof -iTCP:3000 -sTCP:LISTEN -n -P`
- `google-chrome --headless=new --disable-gpu --remote-debugging-port=9222 --user-data-dir=/tmp/ws-story22-chrome about:blank`
- `google-chrome --headless=new --disable-gpu --disable-extensions --remote-debugging-port=9223 --user-data-dir=/tmp/ws-story22-chrome-hover --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 about:blank`
- `node` CDP verification scripts against `http://127.0.0.1:3000` for fine-pointer hover, coarse-pointer/touch fallback, reduced motion, and cards `3-5` open/close regression checks

### Implementation Plan

- Extend the shared `Card` surface with non-intercepting hover layers and pointer-driven CSS variables while preserving the current `motion.div layout` expansion behavior.
- Rewire `CardPreview` and `GoldPulseText` so the title pulse follows the shared hover state, plays once, then holds, with reduced-motion and touch-safe behavior baked in.
- Validate the hover system on fine pointer, coarse pointer, and reduced-motion paths without regressing click-to-expand behavior for cards `3-5`.

### Completion Notes List

- `2026-04-02 22:48:23 NZDT` — Story 2.2 context prepared with repo-grounded scope resolution, shared-component file targeting, and official Tailwind / MDN / Motion references for hover, pointer, text-shadow, and reduced-motion behavior.
- `2026-04-02 22:54:35 NZDT` — Development started for Story 2.2. Implementation is focused on shared hover primitives in `Card`, `CardPreview`, `GoldPulseText`, and `src/styles/main.css` while preserving the existing cards `3-5` expansion path.
- `2026-04-02 23:09:14 NZDT` — Added shared hover layers in `Card.tsx`, pointer-driven `--mx` / `--my` updates for fine hover pointers, one-cycle `GoldPulseText` hover pulse wiring, and local reduced-motion / coarse-pointer fallbacks in `src/styles/main.css`.
- `2026-04-02 23:09:14 NZDT` — Validation passed with `npm run build`, reuse of the existing webpack dev server on `:3000`, coarse-pointer checks at `768px`, `600px`, and `375px`, and hover-capable Chrome checks at `1440px`, `1000px`, and `900px` plus `prefers-reduced-motion: reduce`.
- `2026-04-02 23:09:14 NZDT` — Runtime verification confirmed cards `1` and `2` remain non-interactive, cards `3-5` keep their click-to-expand path, hover exit resets `--mx` / `--my` to `50%`, and reduced motion removes the animated title pulse while keeping the static gold hover state.
- `2026-04-02 23:09:14 NZDT` — Review follow-up pass fixed the GoldPulseText unhover snap by switching the pulse to a short-lived hover phase that ends on `animationend`, removed React-managed default `--mx` / `--my` values, and tightened the leave handler so coarse/no-hover devices avoid redundant custom-property writes.
- `2026-04-02 23:09:14 NZDT` — Review follow-up validation confirmed that fine-pointer hover now settles into a static glow after one pulse, unhover fades back over the configured transition, reduced-motion suppresses overlays and scale while keeping the static gold title glow, and the hover layers fade out during card expansion instead of disappearing abruptly.
- `2026-04-02 23:51:42 NZDT` — Review workflow completed. All Story 2.2 findings were either fixed in the shared hover contract or deferred into `deferred-work.md`, and the story was advanced from `review` to `done`.

### File List

- `src/components/common/Card.tsx`
- `src/components/common/CardPreview.tsx`
- `src/components/common/GoldPulseText.tsx`
- `src/styles/main.css`

### Review Findings

- [x] [Review][Fixed] GoldPulseText unhover snap from persistent `fill: both` animation — valid. The pulse is now driven by a short-lived shared hover phase in [Card.tsx](/home/warrick/Dev/WS-Portfolio-New/src/components/common/Card.tsx) and [GoldPulseText.tsx](/home/warrick/Dev/WS-Portfolio-New/src/components/common/GoldPulseText.tsx): the title animates once, switches to the static hover glow on `animationend`, and then fades back to rest cleanly on unhover. Runtime verification showed `titleAnimation` becomes `none` while hovered hold remains active, and the text-shadow stays partially lit 120ms after leave before settling to rest.
- [x] [Review][Fixed] Reduced-motion hover choreography should be suppressed, not snapped — partially valid. The review was right about overlay snap risk, but the note about a missing root `motion-reduce:transition-none` was outdated because [Card.tsx](/home/warrick/Dev/WS-Portfolio-New/src/components/common/Card.tsx) already had it. Story 2.2 now suppresses the hover overlays and scale entirely under reduced motion while keeping the static gold title glow and readable card state. Runtime verification showed `radialOpacity: 0`, `wrapperTransform: none`, `titleAnimation: none`, and `cardTransitionProperty: none` under `prefers-reduced-motion: reduce`.
- [x] [Review][Fixed] Hover layers vanished abruptly during card expansion — valid within Story 2.2 scope. The shared hover layers and wrapper transform now stay mounted on interactive cards and transition back to rest when `opened` flips to `true`, instead of disappearing in one render. Runtime verification showed the radial layer drop from `0.939...` before open to `0.166...` 80ms into expansion, then to `0` after settle, while the wrapper transform eased from `1.019...` back to `1`.
- [x] [Review][Fixed] React-managed `--mx` / `--my` defaults could fight imperative pointer updates — valid risk. The shared card root no longer seeds those custom properties through the React `style` prop, so the pointer-tracked glow is owned entirely by the pointer handlers and CSS fallback values.
- [x] [Review][Fixed] `handlePointerLeave` wrote custom props on non-hover devices — valid. [Card.tsx](/home/warrick/Dev/WS-Portfolio-New/src/components/common/Card.tsx) now exits early unless the card actually has a hover-capable fine pointer.
- [x] [Review][Fixed] Corner bleed used a hardcoded gold literal instead of a theme token — valid. [main.css](/home/warrick/Dev/WS-Portfolio-New/src/styles/main.css) now uses the shared `--color-accent-primary-muted` token for that secondary radial gradient so the full hover stack stays theme-driven.
- [x] [Review][Defer] `supportsFineHoverPointer()` called per-render — matchMedia is cheap but called on every Card render. Module-level lazy init or `useMemo` would avoid repeated calls. Not a correctness issue. Deferred, pre-existing.
- [x] [Review][Defer] Inner `<div>` wrapper blocks Framer Motion `layout` propagation to children [Card.tsx:94-102] — The plain `<div>` between `motion.div` and children breaks the layout animation tree. No child currently uses `layoutId`, so no visible bug. Architectural consideration for future stories. Deferred, pre-existing.
- [x] [Review][Defer] `group/card` naming collision risk for future — Generic group name could conflict if nested elements also use `group/card`. Safe today but fragile for future extensions. Deferred, pre-existing.

## Change Log

- `2026-04-02`: Story created and marked `ready-for-dev` with explicit guardrails for shared hover layers, `GoldPulseText` hover wiring, reduced-motion behavior, and the current cards `3-5` interaction scope.
- `2026-04-02`: Implemented the shared Story 2.2 hover system in `Card.tsx`, wired `CardPreview` / `GoldPulseText` into the shared hover contract, validated fine-pointer, coarse-pointer, and reduced-motion behavior, and marked the story `review`.
- `2026-04-02`: Reviewed the code-review findings, fixed the valid Story 2.2 issues in the shared hover contract, revalidated fine-pointer unhover behavior, reduced-motion suppression, expansion unwind, and coarse-pointer tap behavior, and kept the story in `review`.
- `2026-04-02`: Completed review closure for Story 2.2, recorded the deferred follow-ups, and marked the story `done`.
