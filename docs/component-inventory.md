# WS-Portfolio-New — Component Inventory

## Component Summary

- **Total Components:** 27
- **Layout Components:** 5
- **Card Preview Components:** 4
- **Card Content Components:** 3
- **Common/Reusable Components:** 9
- **Cell Content Components:** 7 (Box3 sub-sections)
- **Service Components:** 1 (VisitorTracker)

---

## Layout Components

### MainContainer (`src/components/common/GridComponents.tsx`)
- Full viewport wrapper with dynamic height tracking
- Props: `height: number`

### GridContainer (`src/components/common/GridComponents.tsx`)
- CSS Grid: 3-col → 2-col (≤1000px) → 1-col (≤768px)
- Contains all 5 cards

### Card (`src/components/common/GridComponents.tsx`)
- Framer Motion animated card with conditional expansion
- Props: `opened: boolean`
- Card 1: background image, spans 2 rows, hidden on tablet/mobile
- Card 2: transparent background (--bg-color)
- Opened state: absolute positioning, z-index 10, full-height overlay

### DimmedLayer (`src/components/common/GridComponents.tsx`)
- Absolute-positioned black overlay, animated opacity (0 → 0.3)
- Pointer-events: none

### Page (`src/components/common/Page.tsx`)
- Base styled container for expanded card content pages

---

## Card Preview Components

### Box2 (`src/components/box2/Box2.tsx`)
- Displays "Hi There! - I'm Warrick Smith" with WordSlider
- Non-interactive (Card 2)

### Box3 (`src/components/box3/Box3.tsx`)
- "About Me" hover text with neon glow animation
- Expands to Box3Content on click

### Box4 (`src/components/box4/Box4.tsx`)
- "My Portfolio" hover text with neon glow animation
- Expands to Box4Content on click

### Box5 (`src/components/box5/Box5.tsx`)
- "Get In Touch" hover text with neon glow animation
- Expands to Box5Content on click

---

## Card Content Components (Expanded Views)

### Box3Content (`src/components/box3/Box3Content.tsx`)
- About Me expanded view
- 2-column grid layout (1-col on mobile)
- Contains: CardHeader, personal info, Cell1-Cell4, YearsExperience (mobile only)

### Box4Content (`src/components/box4/Box4Content.tsx`)
- Portfolio expanded view
- GitHub repos button + 3-column portfolio grid
- Uses BulletPoints for each project, data from portfolioData.tsx

### Box5Content (`src/components/box5/Box5Content.tsx`)
- Contact expanded view
- 2-column layout: ContactMe sidebar + ContactForm

---

## Common/Reusable Components

### CardHeader (`src/components/common/CardHeader.tsx`)
- Section header with HoverText title + decorative divider lines + FaIcon
- Props: `words: string[], icon: string`

### HoverText (`src/components/common/HoverText.tsx`)
- Renders words with first word white, subsequent words gold
- Props: `words: string[]`

### HoverTextWrapper (`src/components/common/HoverTextWrapper.tsx`)
- Wrapper providing neon glow + explode/implode animation on hover
- Used for card preview text (Box3, Box4, Box5)

### WordSlider (`src/components/common/WordSlider.tsx`)
- Animated word rotator with slide-in/slide-out keyframe animations
- 3-second interval between words
- Props: `words: string[]`

### BulletPoints (`src/components/common/BulletPoints.tsx`)
- Portfolio project card: background image → hover reveals title + bullet points
- Framer Motion animated reveal
- Props: `href, title, points, image, target`

### FaIcon (`src/components/common/FaIcon.tsx`)
- Dynamic FontAwesome icon resolver supporting solid, regular, and brand icon sets
- Props: `icon: string, className?: string, type?: 'solid' | 'regular'`

### CloseButton (`src/components/common/CloseButton.tsx`)
- Fixed-position close button (top-right) using SVG icon
- White filter applied to SVG
- Props: `onClick: () => void`

### ParagraphSeparator (`src/components/common/ParagraphSeparator.tsx`)
- Gold horizontal rule (50% width, centered)

### renderChildDiv (`src/components/common/renderChildDiv.tsx`)
- Card routing: maps selectedId (3/4/5) to corresponding content component
- Also exports `cards` array with card definitions

---

## Cell Content Components (Box3 Sub-sections)

### Cell1 (`src/components/box3/cellContent/Cell1.tsx`)
- GitHub repos action button

### Cell2 (`src/components/box3/cellContent/Cell2.tsx`)
- Personal info grid (name, nationality, status, languages) + profile image

### Cell3 (`src/components/box3/cellContent/Cell3.tsx`)
- Years of experience display wrapper

### Cell4 (`src/components/box3/cellContent/Cell4.tsx`)
- Consolidated summary container

### YearsExperience (`src/components/box3/cellContent/YearsExperience.tsx`)
- Dynamic years calculation (from 2021) with briefcase icon
- Hidden on desktop (visible in Cell3 on mobile via CSS)

### WsImage (`src/components/box3/cellContent/WsImage.tsx`)
- Profile image background component using warrick.jpg

### ConsolidatedSummary (`src/components/box3/cellContent/ConsolidatedSummary.tsx`)
- Full professional summary: experience timeline, education, skills grid, learning adaptability
- Data from consolidatedProfile.tsx

---

## Service Components

### VisitorTracker (`src/components/VisitorTracker.tsx`)
- Non-visual component (returns null)
- Fires `trackVisitor()` on mount via useVisitorTracker hook
- Dev-mode console logging for debugging
