# WS-Portfolio-New — Development Guide

## Prerequisites

- Node.js 24.x
- npm
- Docker if you want container validation

## Getting Started

```bash
git clone https://github.com/WarrickSmith/ws-portfolio-new.git
cd ws-portfolio-new
npm install
cp .env.example .env
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start webpack dev server |
| `npm run build` | Create a production bundle in `dist/` |
| `npm start` | Serve `dist/` on port `3000` |

## Environment Variables

Development values come from `.env`. Production values are injected at container start and exposed through `config.js`.

| Variable | Description |
|----------|-------------|
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | Visitor notification template |
| `EMAILJS_CONTACT_TEMPLATE_ID` | Contact form template |
| `EMAILJS_PUBLIC_KEY` | EmailJS browser key |
| `RECAPTCHA_SITE_KEY` | Public reCAPTCHA key |
| `DEBUG_VISITOR_TRACKING` | Enables extra visitor-tracking logging |
| `API_URL` | Public API/site base URL |
| `ENABLE_VISITOR_TRACKING` | Enables visitor tracking when `true` |

Use:

- `.env.example` for local development
- `stack.env.example` for Docker/Portainer runtime deployment

## Runtime Env Contract

Always access env values through `src/config/env.ts`.

Production runtime flow:

```text
Portainer/container env -> docker-entrypoint.sh -> /dist/config.js -> window.__ENV -> src/config/env.ts
```

This means production env changes do not require rebuilding the bundle as long as the image already contains the latest app code.

## Frontend Structure

- `src/styles/main.css`: Tailwind import and design tokens
- `src/lib/cn.ts`: class name merge helper
- `src/components/common/`: shared layout and UI primitives
- `src/components/namecard/`, `about/`, `portfolio/`, `contact/`: semantic feature folders
- `src/config/env.ts`: central env access layer

## Docker Deployment

```bash
docker compose up -d
```

`docker-compose.yml` pulls `registry.wsapz.com/ws-portfolio-new:latest`.
Log in to `registry.wsapz.com` on the Docker host before using it.

## Project Conventions

- Components use default exports
- Utilities and helpers use named exports
- Tailwind is the styling system
- Framer Motion handles card expansion and overlay animation
- Local state only; no global state manager

## Verification

This repository intentionally has no automated unit/integration test framework.

Validate work with:

- `npm run build`
- `docker compose config`
- manual browser verification
