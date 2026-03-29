# WS-Portfolio-New — Architecture Document

## Executive Summary

A React 19 single-page application using a card-based grid layout pattern. Content is organized into interactive cards that expand into modal overlays. The application is entirely client-side with no backend — external services (EmailJS, ipapi.co, reCAPTCHA) handle server-side concerns.

## Architecture Pattern

**Card-Based Grid Layout with Modal Expansion**

The application presents content in a CSS Grid of 5 cards (3x2 on desktop). Cards 3-5 are interactive — clicking expands them into full-screen modal overlays using absolute positioning and Framer Motion layout animations.

## Application Entry Flow

```
index.html
  └── src/main.tsx (ReactDOM.createRoot, StrictMode)
        ├── GlobalStyle (CSS variables, reset, base styles)
        └── App.tsx
              ├── VisitorTracker (non-visual, tracks visitors on mount)
              └── MainPage (card grid + expansion state)
                    ├── Card 1: Background image (non-interactive, hidden on mobile)
                    ├── Card 2: Box2 — Name + WordSlider (non-interactive)
                    ├── Card 3: Box3 → Box3Content — About Me
                    ├── Card 4: Box4 → Box4Content — Portfolio
                    └── Card 5: Box5 → Box5Content — Contact Form
```

## Component Architecture

### Layout Layer

- **`MainContainer`** — Full viewport wrapper, tracks window resize for dynamic height
- **`GridContainer`** — CSS Grid (3-col desktop → 2-col tablet → 1-col mobile)
- **`Card`** — Framer Motion animated card with conditional absolute positioning when `opened`
- **`DimmedLayer`** — Overlay that dims background (opacity 0.3) when a card is expanded

### Card Components (Preview → Expanded)

| Card | Preview Component | Expanded Component | Purpose |
|------|------------------|--------------------|---------|
| 1 | (background image) | N/A | Visual only |
| 2 | `Box2` | N/A | Name + animated word slider |
| 3 | `Box3` | `Box3Content` | About me, experience, education, skills |
| 4 | `Box4` | `Box4Content` | Portfolio projects grid |
| 5 | `Box5` | `Box5Content` | Contact form |

### Common/Reusable Components

| Component | Purpose |
|-----------|---------|
| `CardHeader` | Section header with title, divider lines, and icon |
| `HoverText` | Multi-word text with first word white, rest gold |
| `HoverTextWrapper` | Neon glow + explode/implode animation on hover |
| `WordSlider` | Animated rotating word display (slide in/out) |
| `BulletPoints` | Portfolio card with image → hover details transition |
| `FaIcon` | Dynamic FontAwesome icon resolver (solid/regular/brands) |
| `CloseButton` | Fixed-position close button for expanded cards |
| `Page` | Base styled container for content pages |
| `ParagraphSeparator` | Horizontal gold rule divider |

### Data Layer

| File | Purpose |
|------|---------|
| `personalData.tsx` | Raw experience, education, and skills data |
| `consolidatedProfile.tsx` | Typed profile with calculated years of experience |
| `portfolioData.tsx` | Portfolio projects (title, URL, image, bullet points) |

### Services Layer

| Service | Purpose |
|---------|---------|
| `IpGeolocationService` | Fetches visitor IP geolocation from ipapi.co/json/ |
| `useVisitorTracker` (hook) | Orchestrates visitor tracking with rate limiting |

## State Management

All state is local to components via `useState`. No global state manager.

| State | Location | Purpose |
|-------|----------|---------|
| `selectedId` | `MainPage` | Currently expanded card (null = none) |
| `isClosed` | `MainPage` | Tracks close animation state |
| `containerHeight` | `App` | Dynamic viewport height |
| `isHovered` | `BulletPoints` | Portfolio card hover state |
| `sendStatus` | `ContactForm` | Email send state (sending/sent/error) |
| `captchaValid` | `ContactForm` | reCAPTCHA validation state |
| `currentWordIndex` | `WordSlider` | Current word in rotation |
| `isLoading/error/isRateLimited` | `useVisitorTracker` | Visitor tracking state |

## External Service Integrations

| Service | Purpose | Configuration |
|---------|---------|--------------|
| **EmailJS** | Send visitor notifications + contact form emails | `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_CONTACT_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` |
| **ipapi.co** | IP geolocation lookup | No API key needed (free tier) |
| **Google reCAPTCHA** | Contact form spam protection | `RECAPTCHA_SITE_KEY` |

## Styling Architecture

- **styled-components** — All styling via tagged template literals
- **CSS Variables** — Defined in `GlobalStyle.ts`:
  - Colors: `--color` (white), `--color-alt` (#ffb400 gold), `--bg-color` (#111), `--bg-color-alt` (#222)
  - Font sizes: `--fs-xxsm` through `--fs-lge` (viewport-responsive with max clamps)
  - Borders: `--border-style`, `--border-style-alt`
- **Framer Motion** — Layout animations for card expansion, hover animations for portfolio cards
- **Keyframe Animations** — Word slider (slideIn/slideOut), hover wrapper (explode/implode/neonGlow)
- **Responsive Breakpoints** — 768px (mobile), 1000px (tablet), 1300px (content adjustment)

## Build Architecture

### Webpack Configuration (3-file split)

- **`webpack.common.cjs`** — Shared config: entry point, TypeScript loader, CSS loader, asset handling, plugins (HtmlWebpackPlugin, Dotenv, CopyWebpackPlugin), path alias (`@` → `src/`)
- **`webpack.dev.cjs`** — Dev server (port 3000, HMR, inline source maps, historyApiFallback)
- **`webpack.prod.cjs`** — Production optimizations (source maps, vendor chunk splitting, tree shaking, 2.5MB asset limits)

### Environment Variables

Injected at build time via `dotenv-webpack`. NOT available at runtime. Type-safe via `src/types/env.d.ts`.

## Deployment Architecture

```
Docker Build (Node.js 22 Alpine)
  ├── npm install
  ├── npm run build (webpack production)
  ├── serve -s dist -l 3000
  └── Exposed on port 3000

Nginx Proxy Manager
  ├── Domain → ws-portfolio-app:3000
  └── SSL via Let's Encrypt

Managed via Portainer Stack
  └── Environment variables in Portainer UI
```
