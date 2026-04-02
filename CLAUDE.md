# CLAUDE.md

This file gives AI coding agents a fast, current view of the repository.

## Development Commands

```bash
npm install
npm run dev
npm run build
npm start
docker compose up -d
```

## Current Stack

- React 19.2.x + ReactDOM 19.2.x
- TypeScript 6.0.x in strict mode
- Webpack 5 for dev/build
- Tailwind CSS 4 via `src/styles/main.css`
- Framer Motion 12 for card expansion and overlays
- EmailJS + reCAPTCHA for contact and visitor workflows
- Docker multi-stage build on `node:24-alpine`

## Application Structure

- `src/main.tsx` mounts `App`.
- `src/App.tsx` imports `src/styles/main.css` and renders `VisitorTracker` plus `MainPage`.
- `src/components/MainPage.tsx` owns `selectedId` and the card expansion flow.
- `src/components/common/` holds shared UI primitives such as `Card`, `CardGrid`, `DimmedBackdrop`, `GoldPulseText`, `SectionHeading`, and `renderChildDiv`.
- Feature folders are semantic now:
  - `src/components/namecard/`
  - `src/components/about/`
  - `src/components/portfolio/`
  - `src/components/contact/`

## UI Rules

- Card 1 is visual only.
- Card 2 is non-interactive.
- Cards 3-5 open expanded content through `renderChildDiv`.
- Tailwind utility classes are the styling system. Do not reintroduce styled-components.
- Use `src/lib/cn.ts` when class composition needs `clsx` + `tailwind-merge`.

## Environment Model

Read environment values from `src/config/env.ts`, not directly from `process.env` or `window.__ENV`.

Runtime flow in production:

```text
container env
  -> docker-entrypoint.sh
  -> /app/dist/config.js
  -> window.__ENV
  -> src/config/env.ts
```

Development fallback:

- `dotenv-webpack` exposes `.env` values at build/dev-server time.
- `src/config/env.ts` falls back to `process.env` when `window.__ENV` is absent.

Client-safe variables:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_CONTACT_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `RECAPTCHA_SITE_KEY`
- `DEBUG_VISITOR_TRACKING`
- `API_URL`
- `ENABLE_VISITOR_TRACKING`

## Deployment Model

- `docker-compose.yml` is image-only and pulls `registry.wsapz.com/ws-portfolio-new:latest`.
- The same `docker-compose.yml` can be used for local Docker or Portainer stack deployment.
- CI publish uses `.github/workflows/ci.yml`.
- Pushes to `main` build and push `registry.wsapz.com/ws-portfolio-new:latest`.
- Portainer is the runtime deployment surface. It pulls the image and injects env vars at container start.

## Verification Rules

- There is no automated unit/integration test framework in this repo.
- Validate changes with `npm run build`, `docker compose config`, and manual browser/runtime checks.
- Do not add Jest, Vitest, or `.test`/`.spec` files.
