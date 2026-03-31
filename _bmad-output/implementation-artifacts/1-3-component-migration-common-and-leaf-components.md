# Story 1.3: Component Migration — Common and Leaf Components

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want all common/leaf components migrated from styled-components to Tailwind CSS,
so that the lowest-level building blocks use the new styling system and can be verified in isolation before parent components migrate.

## Acceptance Criteria

1. **FaIcon.tsx** uses Tailwind utility classes instead of styled-components. (It currently has no styled-components — already plain JSX with a `className` prop. Ensure the `className` prop is passed through correctly and the component continues to work.)
2. **CloseButton.tsx** is rewritten as a Tailwind component. States: default (`bg-elevated`, `border-subtle`, `text-secondary`), hover (`text-primary`, `border-hover`), focused (`border-accent` glow). Uses a `<button>` element with `aria-label="Close"` and a × character — no SVG image import. Fixed position top-right of overlay (24px inset).
3. **HoverText.tsx** is removed — its inline-style text colouring is replaced by Tailwind utility classes at each call site.
4. **HoverTextWrapper.tsx** is removed — replaced by **`GoldPulseText.tsx`** in `common/` using Tailwind `animate-` utility with custom `@keyframes gold-pulse` defined in `src/styles/main.css`.
5. **CardHeader.tsx** is removed — replaced by **`SectionHeading.tsx`** in `common/` (H3 20px, weight 600, `text-accent`, bottom margin `space-3`).
6. **Page.tsx** is removed — replaced by Tailwind layout classes at call sites.
7. **ParagraphSeparator.tsx** is removed — replaced by Tailwind border utility at call sites.
8. **WordSlider.tsx** uses Tailwind utility classes instead of styled-components (animation keyframes moved to `main.css` or kept as inline `@keyframes` via Tailwind).
9. Each migrated component renders correctly with no visual regressions (manual browser verification).
10. No `styled-components` imports remain in any migrated file.
11. `npm run build` succeeds with zero errors. `npm run dev` starts successfully.
12. `BulletPoints.tsx` is **NOT** migrated in this story — it is replaced by `ProjectCard.tsx` in Story 2.1/4.1.

## Tasks / Subtasks

### Task 1: Add `@keyframes gold-pulse` to `main.css` (AC: 4)

- [x] Add the following `@keyframes` and Tailwind animation token to `src/styles/main.css` (outside `@theme`, at global scope like the existing keyframes):

```css
@keyframes gold-pulse {
  0%, 100% {
    text-shadow: 0 0 0 transparent;
  }
  50% {
    text-shadow: 0 0 18px oklch(from #ffb400 l c h / 35%);
  }
}
```

- [x] Add animation token inside the `@theme` block:

```css
--animate-gold-pulse: gold-pulse 1.5s ease-in-out infinite;
```

- [x] Add `@keyframes slide-in` and `@keyframes slide-out` for WordSlider (AC: 8):

```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
```

- [x] Add animation tokens inside `@theme`:

```css
--animate-slide-in: slide-in 1s forwards;
--animate-slide-out: slide-out 1s forwards;
```

### Task 2: Create `GoldPulseText.tsx` (AC: 4)

- [x] Create `src/components/common/GoldPulseText.tsx`:

```typescript
import { cn } from '../../lib/cn'

type GoldPulseTextProps = {
  children: React.ReactNode
  className?: string
  pulse?: boolean
}

const GoldPulseText = ({ children, className, pulse = false }: GoldPulseTextProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center uppercase',
        pulse && 'motion-safe:animate-gold-pulse',
        pulse && 'motion-reduce:[text-shadow:0_0_18px_oklch(from_#ffb400_l_c_h_/_35%)]',
        className
      )}
    >
      {children}
    </span>
  )
}

export default GoldPulseText
```

- [x] **Note:** The `pulse` prop controls whether the animation is active (triggered by parent Card hover in Story 2.2). For now, it defaults to `false`. Story 2.2 will wire this up to card hover state.
- [x] `GoldPulseText` replaces both `HoverText` (text colouring) and `HoverTextWrapper` (animation container)
- [x] Uses `motion-safe:` / `motion-reduce:` for reduced-motion compliance (UX-DR30)
- [x] **Reduced motion caveat:** Use Tailwind arbitrary property syntax for reduced-motion text shadow: `motion-reduce:[text-shadow:0_0_18px_oklch(from_#ffb400_l_c_h_/_35%)]`. This compiled successfully, so no CSS fallback class was needed.

```css
@media (prefers-reduced-motion: reduce) {
  .gold-pulse-static {
    text-shadow: 0 0 18px oklch(from #ffb400 l c h / 35%);
  }
}
```

And reference it as `cn('motion-reduce:gold-pulse-static', ...)` or just apply the class directly.

### Task 3: Create `SectionHeading.tsx` (AC: 5)

- [x] Create `src/components/common/SectionHeading.tsx`:

```typescript
import { cn } from '../../lib/cn'

type SectionHeadingProps = {
  children: React.ReactNode
  className?: string
}

const SectionHeading = ({ children, className }: SectionHeadingProps) => {
  return (
    <h3
      className={cn(
        'text-h3 font-semibold text-text-accent mb-spacing-3',
        className
      )}
    >
      {children}
    </h3>
  )
}

export default SectionHeading
```

- [x] `text-h3` maps to `1.25rem` (20px), `font-semibold` is weight 600, `text-text-accent` is `#ffb400`, `mb-spacing-3` is 12px bottom margin
- [x] Verify these Tailwind utility names resolve correctly against the `@theme` tokens in `main.css`. Tailwind v4 auto-generates utilities from `@theme` tokens — e.g. `--color-text-accent` becomes `text-text-accent`, `--spacing-3` becomes `spacing-3` usable as `mb-spacing-3` or `mb-[--spacing-3]`
- [x] `text-h3` resolved correctly; no fallback syntax was required

### Task 4: Migrate `CloseButton.tsx` (AC: 2)

- [x] Rewrite `src/components/common/CloseButton.tsx` — remove styled-components, remove SVG image import:

```typescript
import { cn } from '../../lib/cn'

type CloseButtonProps = {
  onClick: () => void
  className?: string
}

const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className={cn(
        'fixed top-6 right-6 z-30',
        'w-8 h-8 flex items-center justify-center',
        'rounded-radius-sm',
        'bg-bg-elevated border border-border-subtle text-text-secondary',
        'hover:text-text-primary hover:border-border-hover',
        'focus-visible:border-border-accent focus-visible:shadow-focus-ring',
        'cursor-pointer transition-colors duration-150',
        'text-lg leading-none',
        className
      )}
    >
      &times;
    </button>
  )
}

export default CloseButton
```

- [x] The current `CloseButton` uses a named export AND a default export. The parent (`MainPage.tsx`) imports the default. Keep a default export.
- [x] `z-30` matches the overlay z-index stack: close button at z-30 per UX-DR25
- [x] `top-6 right-6` = 24px inset (Tailwind's `6` = 1.5rem = 24px) per UX-DR18
- [x] `rounded-radius-sm` uses the `--radius-sm: 8px` theme token and resolved correctly
- [x] Focus ring uses `shadow-focus-ring` from `@theme` (`--shadow-focus-ring`) and resolved correctly
- [x] The SVG asset `src/assets/211651_close_round_icon.svg` is now unreferenced — **do NOT delete it in this story**. Story 1.5 handles dead asset cleanup.

### Task 5: Migrate `FaIcon.tsx` (AC: 1)

- [x] `FaIcon.tsx` already uses plain JSX with no styled-components — **no migration needed**
- [x] Verify the `className` prop is passed through to `<FontAwesomeIcon>` correctly (it already is)
- [x] Confirm `FaIcon` renders correctly with Tailwind classes applied via `className` prop (e.g. `<FaIcon icon="faGithub" className="text-text-accent text-lg" />`)
- [x] No changes required unless verification reveals issues

### Task 6: Migrate `WordSlider.tsx` (AC: 8)

- [x] Rewrite `src/components/common/WordSlider.tsx` — remove all styled-components imports:

```typescript
import { useState, useEffect } from 'react'
import { cn } from '../../lib/cn'

type WordSliderProps = {
  words: string[]
}

const WordSlider = ({ words }: WordSliderProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [animateIn, setAnimateIn] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateOut(true)

      setTimeout(() => {
        setAnimateOut(false)
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        setAnimateIn(true)
      }, 1000)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [words])

  useEffect(() => {
    if (animateIn) {
      setTimeout(() => {
        setAnimateIn(false)
      }, 1000)
    }
  }, [animateIn])

  return (
    <div className="flex justify-center items-center w-full">
      <span
        className={cn(
          'text-text-accent',
          animateIn && 'animate-slide-in',
          animateOut && 'animate-slide-out'
        )}
        style={{ fontSize: 'var(--fs-med)' }}
      >
        {words[currentWordIndex]}
      </span>
    </div>
  )
}

export default WordSlider
```

- [x] The `font-size: var(--fs-med)` uses the legacy GlobalStyle CSS variable — this is intentional. `WordSlider` is used in `Box2.tsx` which is still styled-components in this story. The legacy variable will be replaced when `Box2` migrates in Story 1.4.
- [x] Animation classes `animate-slide-in` and `animate-slide-out` use the keyframes defined in Task 1
- [x] The `React` import can be removed — React 19 doesn't require it for JSX

### Task 7: Remove `HoverText.tsx` and update call sites (AC: 3)

- [x] Delete `src/components/common/HoverText.tsx`
- [x] **Call sites that import HoverText** — HoverText colours index 0 as white (`text-text-primary`) and all subsequent words as accent (`text-text-accent`). Replicate this in the `GoldPulseText` replacement spans:
  - `src/components/box3/Box3.tsx` — uses `<HoverText words={['About', 'Me']} />` inside `HoverTextWrapper`. Replace with:
    ```tsx
    <GoldPulseText>
      <span className="text-text-primary">About</span>{'\u00A0'}
      <span className="text-text-accent">Me</span>
    </GoldPulseText>
    ```
  - `src/components/box4/Box4.tsx` — uses `<HoverText words={['My', 'Portfolio']} />` inside `HoverTextWrapper`. Replace with:
    ```tsx
    <GoldPulseText>
      <span className="text-text-primary">My</span>{'\u00A0'}
      <span className="text-text-accent">Portfolio</span>
    </GoldPulseText>
    ```
  - `src/components/box5/Box5.tsx` — uses `<HoverText words={['Get', 'In', 'Touch']} />` inside `HoverTextWrapper`. **Note: 3 words — first is white, rest are accent.** Replace with:
    ```tsx
    <GoldPulseText>
      <span className="text-text-primary">Get</span>{'\u00A0'}
      <span className="text-text-accent">In</span>{'\u00A0'}
      <span className="text-text-accent">Touch</span>
    </GoldPulseText>
    ```
  - `src/components/common/CardHeader.tsx` — this file is being removed (Task 9), so no update needed.

### Task 8: Remove `HoverTextWrapper.tsx` and update call sites (AC: 4)

- [x] Delete `src/components/common/HoverTextWrapper.tsx`
- [x] **Call sites that import HoverTextWrapper:**
  - `src/components/box3/Box3.tsx` — replace `<HoverTextWrapper>` with `<GoldPulseText>` (already done in Task 7)
  - `src/components/box4/Box4.tsx` — same
  - `src/components/box5/Box5.tsx` — same
- [x] Each Box component must:
  1. Remove `import HoverTextWrapper from '../common/HoverTextWrapper'`
  2. Remove `import HoverText from '../common/HoverText'`
  3. Add `import GoldPulseText from '../common/GoldPulseText'`
  4. Replace the `<HoverTextWrapper><HoverText ... /></HoverTextWrapper>` pattern with `<GoldPulseText>` containing styled spans

### Task 9: Remove `CardHeader.tsx` and update call sites (AC: 5)

- [x] Delete `src/components/common/CardHeader.tsx`
- [x] **Call sites that import CardHeader** — each site replaces `<CardHeader words={[...]} icon="..." />` with `<SectionHeading>`. The decorative divider/icon below the header from `CardHeader` is dropped — the new `SectionHeading` is simpler by design:
  - `src/components/box3/Box3Content.tsx` — `<CardHeader words={['About', 'Me']} icon={'faIdCard'} />` → `<SectionHeading>About Me</SectionHeading>`
  - `src/components/box4/Box4Content.tsx` — `<CardHeader words={['My', 'Portfolio']} icon={'faSuitcase'} />` → `<SectionHeading>My Portfolio</SectionHeading>`
  - `src/components/box5/Box5Content.tsx` — `<CardHeader words={['Get', 'In', 'Touch']} icon={'faEnvelopeOpen'} />` → `<SectionHeading>Get In Touch</SectionHeading>`
- [x] At each call site:
  1. Remove `import CardHeader from '../common/CardHeader'`
  2. Add `import SectionHeading from '../common/SectionHeading'`
  3. Replace the `<CardHeader ... />` element with the `<SectionHeading>` shown above

### Task 10: Remove `Page.tsx` and update call sites (AC: 6)

- [x] Delete `src/components/common/Page.tsx`
- [x] **Only call site:** `src/components/box3/cellContent/ConsolidatedSummary.tsx` — replace `<Page>` wrapper with a `<div>` using equivalent Tailwind classes:
  ```tsx
  <div className="grid w-full text-text-primary bg-bg-card-hover rounded-radius-sm text-body-sm font-light">
  ```
- [x] Verify the visual output matches the old `Page` styled component:
  - `display: grid` → `grid`
  - `width: 100%` → `w-full`
  - `color: var(--color)` → `text-text-primary` (white equivalent)
  - `background-color: var(--bg-color-alt)` → `bg-bg-card-hover` (#1a1a1a is close to #222222 — use whichever matches best, or use `bg-[#222222]` if exact match is needed for coexistence period)
  - `border-radius: 0.5rem` → `rounded-radius-sm` (8px) or `rounded-lg` (equivalent)
  - `font-size: var(--fs-xsm)` → keep as `style={{ fontSize: 'var(--fs-xsm)' }}` during coexistence
  - `font-weight: 300` → `font-light`

### Task 11: Remove `ParagraphSeparator.tsx` and update call sites (AC: 7)

- [x] Delete `src/components/common/ParagraphSeparator.tsx`
- [x] **Only call site:** `src/components/box3/cellContent/ConsolidatedSummary.tsx` — replace `<ParagraphSeparator />` with:
  ```tsx
  <hr className="w-1/2 h-px border-0 bg-accent-primary mx-auto" />
  ```
- [x] `bg-accent-primary` maps to `#ffb400` matching the old `background-color: var(--color-alt)`

### Task 12: Verify all changes (AC: 9, 10, 11)

- [x] Run `npm run dev` — confirm dev server starts on port 3000
- [x] Open browser, verify:
  - Box3 (About), Box4 (Portfolio), Box5 (Contact) card previews still show correct text
  - WordSlider in Box2 still animates word cycling
  - CloseButton still appears and functions when a card is expanded
  - Expanded content for Box3Content, Box4Content, Box5Content renders heading correctly
  - ConsolidatedSummary in Box3 expanded content renders grid and separator correctly
- [x] Run `npm run build` — confirm production build succeeds with zero errors
- [x] Grep the migrated files for `styled-components` — ensure zero imports remain in changed files:
  ```bash
  grep -r "styled-components" src/components/common/CloseButton.tsx src/components/common/WordSlider.tsx src/components/common/GoldPulseText.tsx src/components/common/SectionHeading.tsx
  ```

### Review Findings

- [x] [Review][Patch] `motion-reduce` text-shadow arbitrary value syntax may be invalid — `text-shadow-[...]` is not a standard Tailwind utility; may need arbitrary property syntax `[text-shadow:...]` instead. Fixed by switching `GoldPulseText` to `motion-reduce:[text-shadow:0_0_18px_oklch(from_#ffb400_l_c_h_/_35%)]` and updating the story artifact to match. [src/components/common/GoldPulseText.tsx:21]
- [x] [Review][Defer] WordSlider setTimeout not cleaned up on unmount — inner setTimeout in useEffect not cleared, may cause React state-update-on-unmount warning. [src/components/common/WordSlider.tsx] — deferred, pre-existing
- [x] [Review][Defer] CloseButton click event propagates to parent Card onClick — no stopPropagation, event may bubble to Card's handleCardClick and re-open the card. [src/components/common/CloseButton.tsx] — deferred, pre-existing
- [x] [Review][Defer] GoldPulseText card preview titles have no semantic heading role — rendered as spans without ARIA roles. [src/components/common/GoldPulseText.tsx] — deferred, pre-existing (Epic 6 accessibility)
- [x] [Review][Defer] Empty words array crashes WordSlider — modulo by zero when words.length is 0. [src/components/common/WordSlider.tsx] — deferred, pre-existing

## Dev Notes

### Critical Architecture Constraints

- **Leaf-to-root migration** — This story migrates only common/leaf components. Feature components (Box2-5, MainPage, GridComponents) are migrated in Story 1.4. Do NOT touch feature components beyond updating imports. [Source: architecture.md#Styling-Migration-Strategy, AR6]
- **Coexistence period** — styled-components and Tailwind must both work simultaneously. `GlobalStyle.ts` remains. Feature components still use styled-components. Some migrated components will use legacy CSS vars (`--fs-med`, `--bg-color-alt`) in `style` props during coexistence — this is intentional and correct. [Source: epics.md#Story-12, Story-15]
- **No automated tests** — verify everything manually via `npm run dev` and browser inspection. Do NOT create any test files. [Source: project-context.md#Testing-Rules]
- **Default exports for components** — all component files use default exports. Utilities (`cn.ts`, `env.ts`) use named exports. [Source: project-context.md#Language-Specific-Rules]
- **Tailwind class ordering convention** — `layout > sizing > spacing > typography > colors > borders > effects > animation > responsive`. [Source: architecture.md#Tailwind-Class-Patterns]
- **cn() usage** — use `cn()` only when classes are conditional. Plain string for static classes. Never use `cn()` just to split lines. [Source: architecture.md#Tailwind-Class-Patterns]
- **No @apply in components** — `@apply` is only used in `main.css`, never in component files. [Source: architecture.md#Tailwind-Class-Patterns]
- **Animation boundary** — CSS/Tailwind owns hover effects, gold text pulse, transition timing, `prefers-reduced-motion`. Framer Motion owns card expansion/contraction, content stagger. Never animate the same property with both systems. [Source: architecture.md#Animation-Boundary-Pattern]

### Tailwind v4 Token Resolution

Tailwind v4 auto-generates utility classes from `@theme` tokens. The mapping:
- `--color-text-accent` → `text-text-accent`
- `--color-bg-elevated` → `bg-bg-elevated`
- `--color-border-subtle` → `border-border-subtle`
- `--spacing-3` → usable as `mb-spacing-3`, `p-spacing-3`, etc. (if Tailwind v4 picks up custom spacing tokens)
- `--radius-sm` → `rounded-radius-sm` (if picked up) or fallback to `rounded-[var(--radius-sm)]`
- `--shadow-focus-ring` → `shadow-focus-ring` or fallback to `shadow-[var(--shadow-focus-ring)]`
- `--text-h3` → `text-h3` for font-size

**If any token-based utility doesn't resolve**, use arbitrary value syntax: `text-[var(--color-text-accent)]`, `bg-[var(--color-bg-elevated)]`, `mb-[var(--spacing-3)]`, etc. Tailwind v4 supports CSS variable references in arbitrary values.

### Deferred Items from Story 1.2 Relevant to This Story

- **tailwind-merge not configured for custom theme tokens** — `cn()` won't correctly resolve conflicts on custom utilities like `text-text-primary`. If you encounter merge conflicts, configure `extendTailwindMerge` in `cn.ts`. [Source: deferred-work.md]
- **Dual CSS reset** — Tailwind preflight and GlobalStyle both reset base styles. Working per manual verification. Be aware of potential ordering conflicts. [Source: deferred-work.md]
- **oklch relative color syntax limited browser support** — no fallbacks. Spec-mandated values, accepted as-is. [Source: deferred-work.md]

### Component Removal Safety

Components being removed and their **complete** consumer list (verified via codebase grep):

| Component | Consumers | Replacement |
|-----------|-----------|-------------|
| `HoverText.tsx` | Box3.tsx, Box4.tsx, Box5.tsx, CardHeader.tsx | Tailwind classes inline + GoldPulseText |
| `HoverTextWrapper.tsx` | Box3.tsx, Box4.tsx, Box5.tsx | GoldPulseText |
| `CardHeader.tsx` | Box3Content.tsx, Box4Content.tsx, Box5Content.tsx | SectionHeading |
| `Page.tsx` | ConsolidatedSummary.tsx | Tailwind layout div |
| `ParagraphSeparator.tsx` | ConsolidatedSummary.tsx | Tailwind `<hr>` |

**NOT removed in this story:**
- `BulletPoints.tsx` — used by `Box4Content.tsx`, replaced by `ProjectCard.tsx` in Epic 4
- `GridComponents.tsx` — split into Card/CardGrid/DimmedBackdrop in Story 1.4
- `renderChildDiv.tsx` — updated in Story 1.4 when folders rename

### Files Created in This Story

```
NEW  src/components/common/GoldPulseText.tsx
NEW  src/components/common/SectionHeading.tsx
```

### Files Modified in This Story

```
MOD  src/styles/main.css              (add gold-pulse, slide-in, slide-out keyframes + animation tokens)
MOD  src/components/common/CloseButton.tsx  (rewrite: styled-components → Tailwind button)
MOD  src/components/common/WordSlider.tsx   (rewrite: styled-components → Tailwind + cn())
MOD  src/components/box3/Box3.tsx      (replace HoverTextWrapper/HoverText → GoldPulseText)
MOD  src/components/box4/Box4.tsx      (replace HoverTextWrapper/HoverText → GoldPulseText)
MOD  src/components/box5/Box5.tsx      (replace HoverTextWrapper/HoverText → GoldPulseText)
MOD  src/components/box3/Box3Content.tsx    (replace CardHeader → SectionHeading)
MOD  src/components/box4/Box4Content.tsx    (replace CardHeader → SectionHeading)
MOD  src/components/box5/Box5Content.tsx    (replace CardHeader → SectionHeading)
MOD  src/components/box3/cellContent/ConsolidatedSummary.tsx  (replace Page + ParagraphSeparator → Tailwind)
```

### Files Deleted in This Story

```
DEL  src/components/common/HoverText.tsx
DEL  src/components/common/HoverTextWrapper.tsx
DEL  src/components/common/CardHeader.tsx
DEL  src/components/common/Page.tsx
DEL  src/components/common/ParagraphSeparator.tsx
```

### Files NOT Touched

- `src/components/common/GridComponents.tsx` — split happens in Story 1.4
- `src/components/common/BulletPoints.tsx` — replaced in Epic 4
- `src/components/common/FaIcon.tsx` — already has no styled-components (verify only)
- `src/components/common/renderChildDiv.tsx` — no import changes needed until folder renames in 1.4
- `src/components/box2/Box2.tsx` — migrated in Story 1.4
- `src/components/MainPage.tsx` — migrated in Story 1.4
- `src/GlobalStyle.ts` — removed in Story 1.5
- `src/App.tsx` — no changes needed
- `src/assets/211651_close_round_icon.svg` — unreferenced after CloseButton migration but deleted in Story 1.5

### Previous Story Intelligence (Story 1.2)

Key learnings from Story 1.2 that apply:

- **Tailwind v4 CSS-first configuration** — tokens are in `@theme` in `main.css`, NOT in `tailwind.config.js`. Do NOT create a tailwind.config.js. [Source: 1-2 story]
- **`@keyframes` must be outside `@theme` block** — Story 1.2 review caught keyframes incorrectly placed inside `@theme`. All new keyframes (gold-pulse, slide-in, slide-out) go at global scope after the `@theme` block. [Source: 1-2 story review findings]
- **CommonJS config files** — `.cjs` extension for config files (postcss, webpack). Not relevant to this story but noted.
- **postcss-loader scoped to `src/`** — CSS from `node_modules` skips PostCSS processing. Story 1.2 review fixed this.
- **Webpack loader chain verified** — `style-loader → css-loader → postcss-loader` is confirmed working.
- **Manual verification pattern** — dev server + headless Chrome screenshot worked well in 1.2.

### Git Intelligence

Recent commits show Story 1.1 (dependency upgrade) is complete, Story 1.2 (Tailwind integration) is done. Current branch is `feat/profile-refresh`. Work patterns: conventional commits, descriptive messages.

### Project Structure Notes

After this story, the `src/components/common/` directory becomes:

```
src/components/common/
├── BulletPoints.tsx        (UNCHANGED — replaced in Epic 4)
├── CloseButton.tsx         (MIGRATED — Tailwind button, no SVG)
├── FaIcon.tsx              (UNCHANGED — already no styled-components)
├── GoldPulseText.tsx       (NEW — replaces HoverText + HoverTextWrapper)
├── GridComponents.tsx      (UNCHANGED — split in Story 1.4)
├── SectionHeading.tsx      (NEW — replaces CardHeader)
├── WordSlider.tsx          (MIGRATED — Tailwind + cn())
└── renderChildDiv.tsx      (UNCHANGED)
```

Removed from `common/`: `HoverText.tsx`, `HoverTextWrapper.tsx`, `CardHeader.tsx`, `Page.tsx`, `ParagraphSeparator.tsx`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-13-Component-Migration-Common-and-Leaf-Components]
- [Source: _bmad-output/planning-artifacts/architecture.md#Styling-Migration-Strategy]
- [Source: _bmad-output/planning-artifacts/architecture.md#Tailwind-Class-Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#Animation-Boundary-Pattern]
- [Source: _bmad-output/planning-artifacts/architecture.md#Component-Organization]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#GoldPulseText]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#CloseButton]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#SectionHeading]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Reduced-Motion]
- [Source: _bmad-output/implementation-artifacts/1-2-tailwind-css-integration-and-utility-helpers.md]
- [Source: _bmad-output/implementation-artifacts/deferred-work.md]
- [Source: _bmad-output/project-context.md]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `npm run build`
- `npm run dev`
- `curl -I http://localhost:3000/`
- `grep -R "styled-components" src/components/common/CloseButton.tsx src/components/common/WordSlider.tsx src/components/common/GoldPulseText.tsx src/components/common/SectionHeading.tsx`
- `google-chrome --headless --disable-gpu --no-sandbox --dump-dom http://127.0.0.1:3000/`
- `playwright screenshot --browser chromium --channel chrome --viewport-size "1440,1200" --full-page http://127.0.0.1:3000/ /tmp/story-1-3-home.png`
- Temporary external Playwright verification script executed from `/tmp` against `http://127.0.0.1:3000/`

### Completion Notes List

- Added Tailwind animation tokens and keyframes for `gold-pulse`, `slide-in`, and `slide-out` in `src/styles/main.css`.
- Created `GoldPulseText.tsx` and `SectionHeading.tsx`; migrated `CloseButton.tsx` and `WordSlider.tsx` off `styled-components`.
- Corrected `GoldPulseText` reduced-motion syntax to Tailwind arbitrary property form so Story 2.2 can enable `pulse` safely.
- Replaced `HoverText`, `HoverTextWrapper`, `CardHeader`, `Page`, and `ParagraphSeparator` at all verified call sites, then deleted the obsolete component files.
- Verified preview text, WordSlider cycling, Box3/Box4/Box5 expanded content, `CloseButton`, ConsolidatedSummary layout/separators, `npm run build`, `npm run dev`, and absence of `styled-components` imports in migrated common files.
- Completed review follow-up: all review findings are now either patched or explicitly deferred with no open review actions remaining.

### File List

- `src/styles/main.css`
- `src/components/common/CloseButton.tsx`
- `src/components/common/WordSlider.tsx`
- `src/components/common/GoldPulseText.tsx`
- `src/components/common/SectionHeading.tsx`
- `src/components/box3/Box3.tsx`
- `src/components/box4/Box4.tsx`
- `src/components/box5/Box5.tsx`
- `src/components/box3/Box3Content.tsx`
- `src/components/box4/Box4Content.tsx`
- `src/components/box5/Box5Content.tsx`
- `src/components/box3/cellContent/ConsolidatedSummary.tsx`
- `src/components/common/HoverText.tsx` (deleted)
- `src/components/common/HoverTextWrapper.tsx` (deleted)
- `src/components/common/CardHeader.tsx` (deleted)
- `src/components/common/Page.tsx` (deleted)
- `src/components/common/ParagraphSeparator.tsx` (deleted)

### Change Log

- 2026-04-01: Migrated common/leaf components in Story 1.3 from `styled-components` to Tailwind utilities and verified build/dev/browser behavior.
- 2026-04-01: Completed review workflow for Story 1.3 and closed the story with the `GoldPulseText` reduced-motion patch applied.
