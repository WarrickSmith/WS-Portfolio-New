# Story 1.4: Component Migration — Feature Components and Folder Renames

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want all feature components migrated to Tailwind CSS with semantic folder names,
so that the codebase uses consistent styling and clear naming conventions before styled-components removal in Story 1.5.

## Acceptance Criteria

1. `src/components/box2/` is renamed to `src/components/namecard/` containing `NameCard.tsx` (renamed from `Box2.tsx`). All styled-components replaced with Tailwind classes.
2. `src/components/box3/` is renamed to `src/components/about/` containing `AboutCard.tsx` (from `Box3.tsx`) and `AboutContent.tsx` (from `Box3Content.tsx`). All `cellContent/*` files consolidated into flat `AboutContent.tsx`.
3. `src/components/box4/` is renamed to `src/components/portfolio/` containing `PortfolioCard.tsx` (from `Box4.tsx`) and `PortfolioContent.tsx` (from `Box4Content.tsx`). All styled-components replaced with Tailwind.
4. `src/components/box5/` is renamed to `src/components/contact/` containing `ContactCard.tsx` (from `Box5.tsx`), `ContactContent.tsx` (from `Box5Content.tsx`), and `ContactForm.tsx`. `ContactMe.tsx` content absorbed into `ContactContent.tsx`. All styled-components replaced with Tailwind.
5. `src/components/common/GridComponents.tsx` is split into three Tailwind-based files in `common/`: `Card.tsx`, `CardGrid.tsx`, `DimmedBackdrop.tsx`.
6. `src/components/common/renderChildDiv.tsx` import paths updated for all renamed components.
7. `src/components/MainPage.tsx` uses Tailwind classes and updated imports from the split GridComponents.
8. `VisitorTracker.tsx`, `useVisitorTracker.ts`, `ContactForm.tsx` import environment variables from `src/config/env.ts` instead of `process.env` directly.
9. Each migrated component renders correctly with no visual regressions (manual browser verification).
10. No `styled-components` imports remain in any migrated file.
11. `npm run build` succeeds with zero errors. `npm run dev` starts successfully.

## Tasks / Subtasks

### Task 1: Split `GridComponents.tsx` into three Tailwind files (AC: 5)

The current `GridComponents.tsx` exports 4 styled-components: `MainContainer`, `GridContainer`, `DimmedLayer`, `Card`. Split into three new files, all using Tailwind:

- [x] Create `src/components/common/CardGrid.tsx` — combines `MainContainer` + `GridContainer`:
  - Outer wrapper: `flex items-center justify-center` with dynamic `min-h-screen` (currently uses `height: ${({ height }) => height}vh`)
  - Inner grid: `grid grid-cols-3 gap-spacing-12` with responsive: `max-lg:grid-cols-2 max-lg:gap-spacing-8 max-md:grid-cols-1 max-md:gap-spacing-6`
  - Grid sizing: `w-[85vw] max-lg:w-[90vw]` (currently 85vw desktop, 90vw tablet/mobile)
  - Grid height: currently `height: 70vh` on desktop, `auto` on mobile. Use `h-[70vh] max-md:h-auto`
  - Pass through `className` prop for composition
  - Default export

- [x] Create `src/components/common/Card.tsx` — wraps `motion.div` with Tailwind:
  - Base classes: `relative cursor-pointer overflow-hidden rounded-radius-lg`
  - Background: `bg-bg-card border border-border-subtle`
  - The current styled Card uses `nth-child` selectors for grid positioning:
    - 1st child: `row-span-2` (spans full left column on desktop), background-image via `style` prop, `max-lg:hidden`
    - 2nd child: non-interactive display card
    - 3rd-5th: interactive content cards
  - Opened state: currently `position: absolute; top: 0; left: 0; width: 65.8vw; height: 70vh; z-index: 100`. This is handled via Framer Motion `layout` prop — keep as Framer Motion animation, not Tailwind
  - **Important**: Keep `motion.div` as the root element — Framer Motion `layout` and `layoutId` props drive expansion animation
  - Props: `onClick`, `className`, `children`, plus all Framer Motion props passthrough
  - Default export

- [x] Create `src/components/common/DimmedBackdrop.tsx` — wraps `motion.div`:
  - Classes: `fixed inset-0 z-10 bg-black`
  - Opacity controlled by Framer Motion `animate={{ opacity: 0.3 }}` / `exit={{ opacity: 0 }}`
  - Keep as `motion.div` for animation
  - `onClick` prop for close-on-backdrop-click
  - `aria-hidden="true"`
  - Default export

- [x] Delete `src/components/common/GridComponents.tsx` after all consumers updated

### Task 2: Migrate `MainPage.tsx` to Tailwind with updated imports (AC: 7)

- [x] Replace imports: `GridContainer, DimmedLayer, Card` from `GridComponents` → `CardGrid, DimmedBackdrop, Card` from new split files
- [x] Remove `styled-components` import if present (MainPage itself may not import styled directly — it uses the styled exports from GridComponents)
- [x] Replace any remaining styled usage with Tailwind classes
- [x] Keep all Framer Motion logic intact (`AnimatePresence`, `layout`, `layoutId`, `onClick`)
- [x] Keep the `handleCardClick` logic unchanged (returns early for cards 1 and 2)
- [x] Keep the `selectedId` / `isClosed` state management unchanged
- [x] Verify `CloseButton` import path still works (it was already migrated in 1.3)

### Task 3: Rename `box2/` → `namecard/` and migrate `Box2.tsx` → `NameCard.tsx` (AC: 1)

- [x] Create `src/components/namecard/` directory
- [x] Create `src/components/namecard/NameCard.tsx` migrating from `Box2.tsx`:
  - Current styled-components: `BoxContainer` (flex, center, column, uppercase, bg-color), `Intro` (fs-sm, weight 400), `MyName` (text-center, fs-lge, weight 700, margin 0.5rem)
  - Replace `BoxContainer` → `<div className="flex flex-col items-center justify-center uppercase bg-bg-card h-full">`
  - Replace `Intro` → `<p className="text-body-sm font-normal text-text-primary">`
  - Replace `MyName` → `<h2 className="text-center text-display font-bold my-2 text-text-primary">`
  - **Note**: `text-body-sm` maps to `--text-body-sm` (var(--fs-sm)), `text-display` maps to `--text-display` (var(--fs-lge)). If these Tailwind tokens don't resolve, use `style={{ fontSize: 'var(--fs-sm)' }}` during coexistence — Story 1.5 removes legacy vars
  - Keep `WordSlider` import (already Tailwind-migrated in 1.3)
  - Default export as `NameCard`
- [x] Delete `src/components/box2/Box2.tsx` and `src/components/box2/` directory

### Task 4: Rename `box3/` → `about/` and consolidate content (AC: 2)

- [x] Create `src/components/about/` directory

- [x] Create `src/components/about/AboutCard.tsx` from `Box3.tsx`:
  - Box3.tsx currently has NO styled-components (already uses GoldPulseText with Tailwind classes from Story 1.3)
  - Rename component from `Box3` to `AboutCard`, keep same JSX
  - Update import path for GoldPulseText if needed (relative path changes from `../common/` — verify)
  - Default export as `AboutCard`

- [x] Create `src/components/about/AboutContent.tsx` consolidating `Box3Content.tsx` + all `cellContent/*`:
  - Current `Box3Content.tsx` styled-components: `Box3Container` (grid 1fr 2fr, gap/padding 1.5rem, responsive), `MainText` (grid-column span 2, flex column), `FlexContainer` (flex center)
  - Current cellContent files: `Cell1.tsx` through `Cell4.tsx`, `YearsExperience.tsx`, `WsImage.tsx`, `ConsolidatedSummary.tsx`
  - Consolidate all cellContent into a single flat `AboutContent.tsx`
  - Replace all styled-components with Tailwind classes
  - `ConsolidatedSummary.tsx` was partially migrated in 1.3 (Page → Tailwind div, ParagraphSeparator → Tailwind hr) — absorb that inline
  - Keep `SectionHeading` import (already migrated in 1.3)
  - Responsive breakpoints: `grid grid-cols-[1fr_2fr] gap-6 p-6` → `max-lg:grid-cols-1`
  - Default export as `AboutContent`

- [x] Delete entire `src/components/box3/` directory (including `cellContent/` subdirectory)

### Task 5: Rename `box4/` → `portfolio/` and migrate (AC: 3)

- [x] Create `src/components/portfolio/` directory

- [x] Create `src/components/portfolio/PortfolioCard.tsx` from `Box4.tsx`:
  - Box4.tsx currently has NO styled-components (already uses GoldPulseText from 1.3)
  - Rename component, update GoldPulseText import path
  - Default export as `PortfolioCard`

- [x] Create `src/components/portfolio/PortfolioContent.tsx` from `Box4Content.tsx`:
  - Current styled-components: `ImageContainer` (grid 3-col, gap/padding 1.5rem, responsive 2-col/1-col), `ActionContainer` (flex center), `ActionButton` (styled.a — color, bg color-alt, padding, margin), `ProjectContainer` (grid), `ProjectTitle` (h3 — color-alt, center, uppercase)
  - Replace with Tailwind: `grid grid-cols-3 gap-6 p-6 max-lg:grid-cols-2 max-md:grid-cols-1`
  - ActionButton → `<a className="text-text-primary bg-accent-primary mt-4 px-4 py-2 rounded-radius-sm inline-block text-center">`
  - ProjectTitle → `<h3 className="text-text-accent text-center uppercase">`
  - Keep `BulletPoints` import unchanged — NOT migrated in this story (replaced in Epic 4)
  - Keep `SectionHeading` import
  - Default export as `PortfolioContent`

- [x] Delete entire `src/components/box4/` directory

### Task 6: Rename `box5/` → `contact/` and migrate (AC: 4)

- [x] Create `src/components/contact/` directory

- [x] Create `src/components/contact/ContactCard.tsx` from `Box5.tsx`:
  - Box5.tsx currently has NO styled-components (already uses GoldPulseText from 1.3)
  - Rename component, update GoldPulseText import path
  - Default export as `ContactCard`

- [x] Create `src/components/contact/ContactContent.tsx` consolidating `Box5Content.tsx` + `ContactMe.tsx`:
  - Current `Box5Content.tsx` styled-component: `ContactContainer` (grid 1fr 2fr, gap/padding 1.5rem, responsive 1-col)
  - Replace with Tailwind: `grid grid-cols-[1fr_2fr] gap-6 p-6 max-md:grid-cols-1`
  - Absorb `ContactMe.tsx` display content into ContactContent
  - Keep `SectionHeading` and `ContactForm` imports
  - Default export as `ContactContent`

- [x] Migrate `ContactForm.tsx` to Tailwind (stays in `contact/` folder):
  - Move from `src/components/box5/ContactForm.tsx` to `src/components/contact/ContactForm.tsx`
  - Current styled-components: `Form` (flex column center), `InputBox` (flex center), `Input` (bg-color-alt, border-bottom, focus states), `TextArea` (similar), `SubmitButton` (bg color-alt, border-radius, conditional CSS for SENDING/SENT/ERROR states)
  - Replace all with Tailwind classes
  - **SubmitButton states**: Use `cn()` for conditional classes based on send status:
    - SENDING: `text-text-accent opacity-50 pointer-events-none`
    - SENT: `text-green-400 border-green-400`
    - ERROR: `text-red-400 border-red-400`
  - Update env var imports (see Task 8)
  - Default export (currently exports as `ContactMe` — rename export to `ContactForm`)

- [x] Delete entire `src/components/box5/` directory

### Task 7: Update `renderChildDiv.tsx` imports (AC: 6)

- [x] Update all imports to new paths and names:
  ```
  Box2 from '../box2/Box2'        → NameCard from '../namecard/NameCard'
  Box3 from '../box3/Box3'        → AboutCard from '../about/AboutCard'
  Box4 from '../box4/Box4'        → PortfolioCard from '../portfolio/PortfolioCard'
  Box5 from '../box5/Box5'        → ContactCard from '../contact/ContactCard'
  Box3Content from '../box3/Box3Content' → AboutContent from '../about/AboutContent'
  Box4Content from '../box4/Box4Content' → PortfolioContent from '../portfolio/PortfolioContent'
  Box5Content from '../box5/Box5Content' → ContactContent from '../contact/ContactContent'
  ```
- [x] Update the `cards` array to use new component names
- [x] Update the `renderChildDiv` switch statement to use new component names
- [x] Keep the same card ID mapping (card IDs 2-5 must map to the same content)

### Task 8: Update environment variable imports (AC: 8)

- [x] `src/components/contact/ContactForm.tsx` — replace all `process.env.EMAILJS_*`, `process.env.RECAPTCHA_SITE_KEY` with imports from `../../config/env`:
  ```typescript
  import { EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, RECAPTCHA_SITE_KEY } from '../../config/env'
  ```
- [x] `src/hooks/useVisitorTracker.ts` — replace `process.env.EMAILJS_*` with imports from `../config/env`:
  ```typescript
  import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config/env'
  ```
- [x] `src/components/VisitorTracker.tsx` — check if it uses `process.env` beyond `NODE_ENV` (currently only `process.env.NODE_ENV === 'development'` — this is fine, leave it as-is since it's a webpack DefinePlugin replacement, not a runtime env var)

### Task 9: Verify all changes (AC: 9, 10, 11)

- [x] Run `npm run dev` — confirm dev server starts on port 3000
- [x] Open browser, verify:
  - NameCard (formerly Box2) still shows name + WordSlider
  - AboutCard/PortfolioCard/ContactCard previews show correct GoldPulseText titles
  - Expanded content for About, Portfolio, Contact renders correctly
  - CloseButton still functions in expanded overlays
  - ConsolidatedSummary content renders correctly within AboutContent
  - ContactForm validation, reCAPTCHA, and submission still work
  - Card expansion/contraction animations still smooth (Framer Motion intact)
  - Responsive layout works at desktop (>1000px), tablet (768-1000px), mobile (<768px)
- [x] Run `npm run build` — confirm production build succeeds with zero errors
- [x] Grep migrated files for `styled-components` — ensure zero imports remain:
  ```bash
  grep -r "styled-components" src/components/namecard/ src/components/about/ src/components/portfolio/ src/components/contact/ src/components/MainPage.tsx src/components/common/Card.tsx src/components/common/CardGrid.tsx src/components/common/DimmedBackdrop.tsx
  ```
- [x] Grep for old import paths to verify none remain:
  ```bash
  grep -r "box2\|box3\|box4\|box5\|GridComponents" src/
  ```

## Dev Notes

### Critical Architecture Constraints

- **Leaf-to-root migration order** — Story 1.3 migrated common/leaf components. This story migrates all feature (parent) components. Do NOT re-migrate any component already handled in 1.3. [Source: architecture.md#Styling-Migration-Strategy, AR6]
- **Coexistence period continues** — styled-components and Tailwind still coexist after this story. `GlobalStyle.ts` remains. `BulletPoints.tsx` still uses styled-components (replaced in Epic 4). Story 1.5 removes styled-components dependency. [Source: epics.md#Story-15]
- **No automated tests** — verify everything manually via `npm run dev` and browser inspection. Do NOT create test files. [Source: project-context.md#Testing-Rules]
- **Default exports for components** — all component files use default exports. Data/utilities use named exports. [Source: project-context.md#Language-Specific-Rules]
- **Tailwind class ordering** — `layout > sizing > spacing > typography > colors > borders > effects > animation > responsive`. [Source: architecture.md#Tailwind-Class-Patterns]
- **cn() usage** — use `cn()` only when classes are conditional. Plain string for static classes. Never use `cn()` just to split lines. [Source: architecture.md#Tailwind-Class-Patterns]
- **No @apply in components** — `@apply` only in `main.css`. [Source: architecture.md#Tailwind-Class-Patterns]
- **Animation boundary** — CSS/Tailwind owns hover, transitions, `prefers-reduced-motion`. Framer Motion owns card expansion/contraction, content stagger, `AnimatePresence`. Never animate the same property with both. [Source: architecture.md#Animation-Boundary-Pattern]
- **Cards 1 and 2 are non-interactive** — `handleCardClick` returns early for these. Do not add click handlers. [Source: project-context.md, CLAUDE.md]
- **No barrel/index files** — do not create index.ts re-exports in any folder. [Source: project-context.md#Code-Quality]
- **One component per file** — do not combine multiple component definitions. [Source: architecture.md#Component-Organization]

### Tailwind v4 Token Resolution

Tailwind v4 auto-generates utility classes from `@theme` tokens in `src/styles/main.css`. The mapping:
- `--color-text-accent` → `text-text-accent`
- `--color-bg-card` → `bg-bg-card`
- `--color-bg-elevated` → `bg-bg-elevated`
- `--color-border-subtle` → `border-border-subtle`
- `--spacing-3` → `mb-spacing-3`, `p-spacing-3`, etc.
- `--radius-sm` → `rounded-radius-sm`
- `--radius-lg` → `rounded-radius-lg`
- `--text-h3` → `text-h3` for font-size
- `--text-body-sm` → `text-body-sm`

**If any token-based utility doesn't resolve**, use arbitrary value syntax: `text-[var(--color-text-accent)]`, `bg-[var(--color-bg-card)]`, etc.

**Legacy CSS variables** (`--fs-sm`, `--fs-lge`, `--fs-med`, `--fs-xsm`, `--bg-color`, `--bg-color-alt`, `--color`, `--color-alt`) still exist in `GlobalStyle.ts`. During coexistence, if a Tailwind token doesn't have an equivalent, use `style={{ fontSize: 'var(--fs-sm)' }}` as a bridge. Story 1.5 removes all legacy vars.

### Component Rename Matrix

| Old Path | New Path | Export Name |
|----------|----------|-------------|
| `box2/Box2.tsx` | `namecard/NameCard.tsx` | `NameCard` |
| `box3/Box3.tsx` | `about/AboutCard.tsx` | `AboutCard` |
| `box3/Box3Content.tsx` + `box3/cellContent/*` | `about/AboutContent.tsx` | `AboutContent` |
| `box4/Box4.tsx` | `portfolio/PortfolioCard.tsx` | `PortfolioCard` |
| `box4/Box4Content.tsx` | `portfolio/PortfolioContent.tsx` | `PortfolioContent` |
| `box5/Box5.tsx` | `contact/ContactCard.tsx` | `ContactCard` |
| `box5/Box5Content.tsx` + `box5/ContactMe.tsx` | `contact/ContactContent.tsx` | `ContactContent` |
| `box5/ContactForm.tsx` | `contact/ContactForm.tsx` | `ContactForm` |
| `common/GridComponents.tsx` | `common/Card.tsx` + `common/CardGrid.tsx` + `common/DimmedBackdrop.tsx` | `Card`, `CardGrid`, `DimmedBackdrop` |

### Files Created in This Story

```
NEW  src/components/common/Card.tsx
NEW  src/components/common/CardGrid.tsx
NEW  src/components/common/DimmedBackdrop.tsx
NEW  src/components/namecard/NameCard.tsx
NEW  src/components/about/AboutCard.tsx
NEW  src/components/about/AboutContent.tsx
NEW  src/components/portfolio/PortfolioCard.tsx
NEW  src/components/portfolio/PortfolioContent.tsx
NEW  src/components/contact/ContactCard.tsx
NEW  src/components/contact/ContactContent.tsx
NEW  src/components/contact/ContactForm.tsx
```

### Files Modified in This Story

```
MOD  src/components/MainPage.tsx           (import updates + styled → Tailwind)
MOD  src/components/common/renderChildDiv.tsx  (import paths + component names)
MOD  src/hooks/useVisitorTracker.ts        (process.env → config/env imports)
```

### Files Deleted in This Story

```
DEL  src/components/common/GridComponents.tsx
DEL  src/components/box2/Box2.tsx
DEL  src/components/box2/                  (directory)
DEL  src/components/box3/Box3.tsx
DEL  src/components/box3/Box3Content.tsx
DEL  src/components/box3/cellContent/Cell1.tsx
DEL  src/components/box3/cellContent/Cell2.tsx
DEL  src/components/box3/cellContent/Cell3.tsx
DEL  src/components/box3/cellContent/Cell4.tsx
DEL  src/components/box3/cellContent/YearsExperience.tsx
DEL  src/components/box3/cellContent/WsImage.tsx
DEL  src/components/box3/cellContent/ConsolidatedSummary.tsx
DEL  src/components/box3/cellContent/      (directory)
DEL  src/components/box3/                  (directory)
DEL  src/components/box4/Box4.tsx
DEL  src/components/box4/Box4Content.tsx
DEL  src/components/box4/                  (directory)
DEL  src/components/box5/Box5.tsx
DEL  src/components/box5/Box5Content.tsx
DEL  src/components/box5/ContactMe.tsx
DEL  src/components/box5/ContactForm.tsx
DEL  src/components/box5/                  (directory)
```

### Files NOT Touched in This Story

- `src/components/common/BulletPoints.tsx` — still uses styled-components, replaced in Epic 4
- `src/components/common/FaIcon.tsx` — already has no styled-components
- `src/components/common/GoldPulseText.tsx` — already migrated in 1.3
- `src/components/common/SectionHeading.tsx` — already migrated in 1.3
- `src/components/common/CloseButton.tsx` — already migrated in 1.3
- `src/components/common/WordSlider.tsx` — already migrated in 1.3
- `src/components/VisitorTracker.tsx` — only uses `process.env.NODE_ENV` (webpack DefinePlugin, not a runtime env var)
- `src/GlobalStyle.ts` — removed in Story 1.5
- `src/App.tsx` — no changes needed
- `src/config/env.ts` — already exists with correct pattern
- `src/styles/main.css` — no new tokens needed (all design tokens already defined in Story 1.2)
- `src/lib/cn.ts` — no changes needed

### Previous Story Intelligence (Story 1.3)

Key learnings from Story 1.3 that apply:

- **Tailwind v4 CSS-first configuration** — tokens are in `@theme` in `main.css`, NOT in `tailwind.config.js`. Do NOT create a tailwind.config.js. [Source: 1-2 story, 1-3 story]
- **`@keyframes` must be outside `@theme` block** — if any new keyframes are needed, place at global scope. [Source: 1-2 review findings]
- **Tailwind arbitrary property syntax works** — `motion-reduce:[text-shadow:0_0_18px_...]` compiled successfully in 1.3. Use this pattern for any edge cases.
- **Token resolution verified** — `text-text-accent`, `bg-bg-elevated`, `border-border-subtle`, `rounded-radius-sm`, `shadow-focus-ring`, `text-h3`, `mb-spacing-3` all resolved correctly in Story 1.3. Same tokens will work here.
- **Manual verification pattern** — dev server + browser inspection is the verification method. No headless browser scripts needed for basic checks.
- **cn() import path** — `import { cn } from '../../lib/cn'` (or appropriate relative path from component location)

### Deferred Items from Previous Stories Relevant Here

- **tailwind-merge not configured for custom theme tokens** — `cn()` won't correctly resolve conflicts on custom utilities like `text-text-primary`. If you encounter merge conflicts, configure `extendTailwindMerge` in `cn.ts`. [Source: deferred-work.md from 1.2 review]
- **Dual CSS reset** — Tailwind preflight and GlobalStyle both reset base styles. Working per manual verification. [Source: deferred-work.md]
- **ContactForm.tsx `e.preventDefault()` called after early return on captcha check** — pre-existing bug, do not fix in this story. [Source: deferred-work.md from 1.2 review]
- **WordSlider setTimeout not cleaned up on unmount** — pre-existing, deferred. [Source: deferred-work.md from 1.3 review]
- **CloseButton click event propagation** — pre-existing, deferred. [Source: deferred-work.md from 1.3 review]

### Key Gotchas

1. **ContactForm exports as `ContactMe`** — the current `box5/ContactForm.tsx` has `export default ContactMe` as its export name. When migrating, rename the export to `ContactForm` for clarity. Update `ContactContent.tsx` import accordingly.
2. **BulletPoints.tsx still uses styled-components** — `PortfolioContent.tsx` imports it. Do NOT migrate BulletPoints — it's replaced by `ProjectCard.tsx` in Epic 4. Leave the import as-is.
3. **Framer Motion props on Card** — the current `Card` styled component is `styled(motion.div)`. The new `Card.tsx` must also use `motion.div` as its root. All Framer Motion props (`layout`, `layoutId`, `onClick`, `animate`, `exit`, `transition`) must pass through.
4. **DimmedLayer/DimmedBackdrop is also motion.div** — same requirement: keep `motion.div` for animation.
5. **Grid nth-child positioning** — the current `Card` uses CSS `nth-child` selectors for grid positioning (1st child spans rows, hidden on mobile). In Tailwind, handle this via conditional `className` props passed from `MainPage.tsx` to each `Card` instance based on card index.
6. **Card opened state** — currently handled via CSS class `.opened` with absolute positioning. This is driven by Framer Motion `layout` animation — do NOT convert the expansion positioning to Tailwind static classes. Let Framer Motion handle it.
7. **cellContent consolidation** — when consolidating `box3/cellContent/*` into `AboutContent.tsx`, read each file to understand what it renders. The cells display: profile image (WsImage), years of experience (YearsExperience), skill summaries (Cell1-4), and a consolidated summary (ConsolidatedSummary). Flatten the grid structure while preserving all visual content.
8. **ContactMe.tsx vs ContactForm.tsx** — there are TWO files in box5: `ContactMe.tsx` (simple contact info display) and `ContactForm.tsx` (the actual form). ContactMe's content goes into `ContactContent.tsx`. ContactForm becomes `contact/ContactForm.tsx`.

### Project Structure After This Story

```
src/components/
├── about/
│   ├── AboutCard.tsx          (NEW — from Box3.tsx)
│   └── AboutContent.tsx       (NEW — consolidated from Box3Content + cellContent/*)
├── portfolio/
│   ├── PortfolioCard.tsx      (NEW — from Box4.tsx)
│   └── PortfolioContent.tsx   (NEW — from Box4Content.tsx)
├── contact/
│   ├── ContactCard.tsx        (NEW — from Box5.tsx)
│   ├── ContactContent.tsx     (NEW — from Box5Content + ContactMe)
│   └── ContactForm.tsx        (NEW — from box5/ContactForm.tsx)
├── namecard/
│   └── NameCard.tsx           (NEW — from Box2.tsx)
├── common/
│   ├── BulletPoints.tsx       (UNCHANGED — still styled-components, replaced Epic 4)
│   ├── Card.tsx               (NEW — from GridComponents)
│   ├── CardGrid.tsx           (NEW — from GridComponents)
│   ├── CloseButton.tsx        (UNCHANGED — migrated in 1.3)
│   ├── DimmedBackdrop.tsx     (NEW — from GridComponents)
│   ├── FaIcon.tsx             (UNCHANGED)
│   ├── GoldPulseText.tsx      (UNCHANGED — migrated in 1.3)
│   ├── SectionHeading.tsx     (UNCHANGED — migrated in 1.3)
│   ├── WordSlider.tsx         (UNCHANGED — migrated in 1.3)
│   └── renderChildDiv.tsx     (MOD — updated imports)
├── MainPage.tsx               (MOD — Tailwind + updated imports)
└── VisitorTracker.tsx         (UNCHANGED)
```

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-14-Component-Migration-Feature-Components-and-Folder-Renames]
- [Source: _bmad-output/planning-artifacts/architecture.md#Styling-Migration-Strategy]
- [Source: _bmad-output/planning-artifacts/architecture.md#Component-Organization]
- [Source: _bmad-output/planning-artifacts/architecture.md#Tailwind-Class-Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#Animation-Boundary-Pattern]
- [Source: _bmad-output/planning-artifacts/architecture.md#AR7-Component-Folder-Renaming]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#CardGrid]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Card]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#DimmedBackdrop]
- [Source: _bmad-output/implementation-artifacts/1-3-component-migration-common-and-leaf-components.md]
- [Source: _bmad-output/implementation-artifacts/deferred-work.md]
- [Source: _bmad-output/project-context.md]

## Review Findings

- [x] [Review][Decision] Card 2 (NameCard) background color changed from `#111111` (var(--bg-color)) to `#161616` (bg-bg-card) — Decision: intentional, keep `bg-bg-card`. Story 1.4 Task 3 explicitly specified `NameCard` should render with `<div className="flex flex-col items-center justify-center uppercase bg-bg-card h-full">`, so restoring `#111111` would conflict with the approved story instructions rather than fix an accidental regression.

- [x] [Review][Patch] `--fs-lg` undefined CSS variable fixed to `--fs-lge` [AboutContent.tsx] — Three stat values now use the defined legacy token, restoring the intended larger summary-stat sizing for AC 9.

- [x] [Review][Patch] DimmedBackdrop exit re-entry guarded — `closeCard()` now ignores repeat calls while the card is already closing, so repeated backdrop clicks during AnimatePresence exit no longer retrigger close flow.

- [x] [Review][Patch] Unused `height` prop removed from `CardGrid` — dead migration carry-over deleted.

- [x] [Review][Patch] Stable `key={card.id}` applied in `MainPage.tsx` — array index key removed.

- [x] [Review][Patch] Duplicate className ternary removed in `MainPage.tsx` — card styling now uses a single shared branch plus the non-interactive cursor override.

- [x] [Review][Patch] Non-interactive cards no longer expose pointer cursor [Card.tsx, MainPage.tsx] — cards 1 and 2 now render with `cursor: default`, while interactive cards retain `cursor: pointer`.

- [x] [Review][Patch] ContactForm now always calls `e.preventDefault()` before the captcha guard, so invalid submit no longer falls through to browser form submission.
- [x] [Review][Patch] `onCaptchaChange` now respects `null` and disables submit state when the captcha token is cleared or expires.
- [x] [Review][Patch] `form.current!` non-null assertion removed — EmailJS submit now checks for a live form reference before calling `sendForm`.
- [x] [Review][Patch] `closeCard` state churn simplified — `MainPage.tsx` no longer toggles the redundant `isClosed` state and instead resets the close guard directly from `selectedId`.
- [x] [Review][Patch] ContactForm now guards missing EmailJS env values before attempting submission, surfacing an error state instead of calling EmailJS with empty strings.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `2026-04-01 11:20:02 NZDT` — Migrated `GridComponents.tsx` into `CardGrid.tsx`, `Card.tsx`, and `DimmedBackdrop.tsx`; updated `MainPage.tsx` and `App.tsx` to remove the legacy wrapper/import path.
- `2026-04-01 11:20:02 NZDT` — Renamed `box2`/`box3`/`box4`/`box5` into `namecard`/`about`/`portfolio`/`contact`, consolidated About and Contact content, and moved `ContactForm.tsx` onto Tailwind + `src/config/env.ts`.
- `2026-04-01 11:20:02 NZDT` — Verified `npm run build` succeeded, `npm run dev` started on port 3000, `rg "styled-components"` returned no migrated-file hits, and `rg "box2|box3|box4|box5|GridComponents" src` returned clean.
- `2026-04-01 13:42:18 NZDT` — Captured headless Chrome verification screenshots for desktop/tablet/mobile home states and desktop About/Portfolio/Contact expanded states under `/tmp/ws-story14-shots/`.
- `2026-04-01 13:42:18 NZDT` — Fixed mobile preview-card collapse by adding a closed-state `max-md:min-h-32` constraint in `MainPage.tsx`, then re-ran `npm run build` and refreshed the mobile screenshot.
- `2026-04-01 15:53:29 NZDT` — Fixed the Story 1.4 review findings in `Card.tsx`, `CardGrid.tsx`, and `MainPage.tsx`: opened cards now stay responsive after resize, the main grid/hero switch at the exact 1000px breakpoint again, and expanded desktop content is top-aligned instead of vertically centered.
- `2026-04-01 15:53:29 NZDT` — Re-ran `npm run build`, started `npm run dev`, and verified the corrected layouts in headless Chrome at 1200px, 1000px, 900px, and 600px; updated evidence saved under `/tmp/ws-story14-fixes/`.
- `2026-04-01 15:53:29 NZDT` — Triaged the follow-up review findings: kept the NameCard `bg-bg-card` surface as intentional because Task 3 explicitly specified that class, then fixed the valid code issues in `AboutContent.tsx`, `Card.tsx`, `CardGrid.tsx`, `MainPage.tsx`, and `ContactForm.tsx`.
- `2026-04-01 15:53:29 NZDT` — Verified the review-fix pass with `npm run build` plus headless Chrome checks: cards 1 and 2 now expose `cursor: default`, card 3 remains `pointer`, About summary stats render at `36.75px` vs `17.6px` parent text, double backdrop-click closes cleanly, and invalid Contact form submit is prevented while captcha is unmet.

### Completion Notes List

- Implemented AC 1-8 and AC 10-11 code changes, including feature-folder renames, Tailwind migration for the targeted feature components, split common grid primitives, and env import updates.
- `src/App.tsx` also required a compatibility cleanup because it still imported `MainContainer` from the deleted `GridComponents.tsx`.
- Manual browser verification for AC 9 was completed via headless Chrome screenshots for desktop, tablet, and mobile layouts plus About/Portfolio/Contact expanded overlays.
- Live reCAPTCHA and email submission were not exercised end-to-end because no `EMAILJS_*` or `RECAPTCHA_*` environment variables were present in the local shell during verification.
- Resolved the post-review layout regressions in the shared card/grid layer without expanding Story 1.4 scope: exact 1000px grid breakpoint restored, opened cards now respond to viewport changes after opening, and expanded desktop content anchors to the top edge again.
- Fix-pass verification confirmed: desktop home remains 3 columns with hero visible, 1000px home is 2 columns with hero hidden, 600px home is 1 column, and an opened About card resizes from 774px wide at 1200px to 876px wide at 900px while staying top-aligned.
- Live reCAPTCHA and email submission were not re-exercised during this fix pass; browser verification in this pass focused on the responsive/grid regressions that prompted the review findings.
- Review finding 1 was not treated as a bug fix because the story itself specified `NameCard` should use `bg-bg-card`; restoring `#111111` would contradict the implemented story instruction rather than correct an accidental regression.
- Valid review issues fixed in this pass: undefined About stat font token, repeated-close guard, dead `CardGrid` height prop, stable React keys, duplicate class branch cleanup, non-interactive cursor behavior on cards 1 and 2, invalid Contact submit prevention, null-safe captcha handling, nullable `form.current`, and ContactForm env guards before EmailJS submission.

### File List

- `src/App.tsx`
- `src/components/MainPage.tsx`
- `src/components/about/AboutCard.tsx`
- `src/components/about/AboutContent.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/CardGrid.tsx`
- `src/components/common/DimmedBackdrop.tsx`
- `src/components/common/renderChildDiv.tsx`
- `src/components/contact/ContactCard.tsx`
- `src/components/contact/ContactContent.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/namecard/NameCard.tsx`
- `src/components/portfolio/PortfolioCard.tsx`
- `src/components/portfolio/PortfolioContent.tsx`
- `src/hooks/useVisitorTracker.ts`
- `src/components/common/GridComponents.tsx` (deleted)
- `src/components/box2/Box2.tsx` (deleted)
- `src/components/box3/Box3.tsx` (deleted)
- `src/components/box3/Box3Content.tsx` (deleted)
- `src/components/box3/cellContent/Cell1.tsx` (deleted)
- `src/components/box3/cellContent/Cell2.tsx` (deleted)
- `src/components/box3/cellContent/Cell3.tsx` (deleted)
- `src/components/box3/cellContent/Cell4.tsx` (deleted)
- `src/components/box3/cellContent/ConsolidatedSummary.tsx` (deleted)
- `src/components/box3/cellContent/WsImage.tsx` (deleted)
- `src/components/box3/cellContent/YearsExperience.tsx` (deleted)
- `src/components/box4/Box4.tsx` (deleted)
- `src/components/box4/Box4Content.tsx` (deleted)
- `src/components/box5/Box5.tsx` (deleted)
- `src/components/box5/Box5Content.tsx` (deleted)
- `src/components/box5/ContactForm.tsx` (deleted)
- `src/components/box5/ContactMe.tsx` (deleted)
