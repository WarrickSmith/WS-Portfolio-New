# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (runs on localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Architecture

This is a React + TypeScript personal portfolio application built with Vite. The architecture centers around a **card-based grid layout system** where content is organized into interactive cards that expand into modal overlays.

### Core Architecture Patterns

**Grid-Based Layout System**: 
- Main layout uses CSS Grid (3x2 on desktop, responsive breakpoints)
- Card 1: Background image (hidden on mobile)
- Cards 2-5: Interactive content sections

**Card Expansion Pattern**:
- Cards expand into full-screen modal overlays when clicked
- Uses Framer Motion for smooth animations
- Each card has both a preview component and expanded content component

**Component Structure**:
- `src/components/MainPage.tsx` - Root component managing card state and interactions
- `src/components/common/GridComponents.tsx` - Styled components for grid layout system
- `src/components/common/renderChildDiv.tsx` - Maps card IDs to expanded content components
- `src/components/box[2-5]/` - Card-specific components (Box2.tsx for preview, Box[X]Content.tsx for expanded)

**Data Architecture**:
- `src/data/consolidatedProfile.tsx` - Centralized profile data with calculated experience years
- `src/data/personalData.tsx` - Raw personal/professional data
- `src/data/portfolioData.tsx` - Project portfolio information

**Visitor Tracking System**:
- `src/components/VisitorTracker.tsx` - Non-visual component for visitor tracking
- `src/hooks/useVisitorTracker.ts` - Custom hook with rate limiting and geolocation
- Integrates with EmailJS for notification emails
- Uses localStorage for 5-minute rate limiting per visitor

### Styling Architecture

- **Styled Components**: Primary styling approach using styled-components library
- **CSS Variables**: Used in styled components for theming (--bg-color, --bg-color-alt)
- **Responsive Design**: Mobile-first breakpoints at 768px and 1000px
- **Framer Motion**: Handles card animations and layout transitions

### Environment Configuration

Vite-based build system with environment variables for EmailJS integration:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID` 
- `VITE_EMAILJS_PUBLIC_KEY`

### Key Technical Considerations

- Cards 1 and 2 are non-interactive (handleCardClick returns early)
- Card expansion uses absolute positioning with z-index layering
- Visitor tracking implements privacy-compliant data collection
- Project uses TypeScript with strict mode enabled
- Build configuration includes chunk size optimization (2500 limit)