# WS-Portfolio-New — Architecture Document

## Executive Summary

This is a client-rendered React portfolio application with a five-card landing layout. Cards 3-5 expand into fullscreen overlays. Styling is Tailwind-first, animation is Framer Motion where layout choreography is needed, and deployment is Docker-based with runtime environment injection.

## Entry Flow

```text
index.html
  -> src/main.tsx
    -> src/App.tsx
      -> src/styles/main.css
      -> VisitorTracker
      -> MainPage
```

## Main UI Architecture

`src/components/MainPage.tsx` is the interaction hub.

- `selectedId` controls which card is open
- card IDs `1` and `2` are intentionally non-interactive
- card IDs `3`, `4`, and `5` render expanded content through `renderChildDiv`
- `AnimatePresence` + `DimmedBackdrop` manage the overlay transition

### Card Map

| Card | Preview | Expanded content |
|------|---------|------------------|
| 1 | background image only | none |
| 2 | `NameCard` | none |
| 3 | `AboutCard` | `AboutContent` |
| 4 | `PortfolioCard` | `PortfolioContent` |
| 5 | `ContactCard` | `ContactContent` |

## Feature Folder Layout

### `src/components/common/`

Shared building blocks:

- `Card`
- `CardGrid`
- `DimmedBackdrop`
- `CloseButton`
- `GoldPulseText`
- `SectionHeading`
- `WordSlider`
- `BulletPoints`
- `FaIcon`
- `renderChildDiv`

### `src/components/namecard/`

- Static introductory card with the rotating word slider

### `src/components/about/`

- Preview card plus expanded profile, experience, education, and skills view

### `src/components/portfolio/`

- Preview card plus project grid rendered from `src/data/portfolioData.tsx`

### `src/components/contact/`

- Preview card plus contact panel and EmailJS/reCAPTCHA form

## Styling System

The project no longer uses styled-components.

- Tailwind CSS 4 is imported in `src/styles/main.css`
- Design tokens are declared in the `@theme` block
- Shared class composition uses `src/lib/cn.ts`
- Framer Motion handles expanded-card layout transitions and overlay animation
- CSS/Tailwind handle static styling, typography, spacing, and keyframe utilities

## Data And Services

### Data

- `src/data/personalData.tsx`
- `src/data/consolidatedProfile.tsx`
- `src/data/portfolioData.tsx`

### Runtime services

- `src/hooks/useVisitorTracker.ts`
- `src/services/ipGeolocationService.ts`
- `src/components/VisitorTracker.tsx`

`VisitorTracker` is non-visual and returns `null`. It only runs tracking when `ENABLE_VISITOR_TRACKING` resolves to `true`.

## Environment Architecture

Use `src/config/env.ts` as the only environment access layer.

### Development

- `.env` values are supplied through `dotenv-webpack`
- `env.ts` falls back to `process.env`

### Production

```text
container env
  -> docker-entrypoint.sh
  -> /app/dist/config.js
  -> window.__ENV
  -> src/config/env.ts
```

Whitelisted client-safe keys:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_CONTACT_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `RECAPTCHA_SITE_KEY`
- `DEBUG_VISITOR_TRACKING`
- `API_URL`
- `ENABLE_VISITOR_TRACKING`

## Build And Delivery

### Webpack

- `webpack.common.cjs`: shared loaders/plugins
- `webpack.dev.cjs`: dev server on port `3000`
- `webpack.prod.cjs`: production build and bundle constraints

### Docker

- `Dockerfile` uses a multi-stage build on `node:24-alpine`
- runtime image serves `dist/` through `serve`
- `docker-compose.yml` pulls `registry.wsapz.com/ws-portfolio-new:latest`

### CI/CD

`.github/workflows/ci.yml` is single-purpose:

1. Trigger on pushes to `main`
2. Check out the repository
3. Set up Buildx
4. Log in to `registry.wsapz.com`
5. Build and push `registry.wsapz.com/ws-portfolio-new:latest`

No application env vars are passed as Docker build args.

## Deployment Topology

```text
GitHub push to main
  -> GitHub Actions workflow
  -> registry.wsapz.com/ws-portfolio-new:latest
  -> Portainer pulls image
  -> Portainer injects runtime env vars
  -> docker-entrypoint.sh writes config.js
  -> browser reads window.__ENV through src/config/env.ts
```

Nginx Proxy Manager fronts the running container on the planned `ws.wsapz.com` domain.
