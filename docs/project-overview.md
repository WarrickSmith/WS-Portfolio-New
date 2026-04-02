# WS-Portfolio-New — Project Overview

## Summary

WS-Portfolio-New is Warrick Smith's portfolio site. It presents profile information, selected work, and a contact path inside a card-based single-page interface. The codebase is the modernized React/TypeScript successor to an older PHP portfolio.

Planned production URL: `https://ws.wsapz.com`

## What The Site Does

- Introduces Warrick through a fixed name card and expandable profile content
- Shows portfolio projects with outbound links and hover-detail cards
- Provides a contact form backed by EmailJS and reCAPTCHA
- Optionally sends visitor notifications when visitor tracking is enabled

## Technology Stack

| Category | Technology |
|----------|------------|
| UI framework | React 19.2.x |
| Language | TypeScript 6.0.x |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Build tooling | Webpack 5 |
| Utilities | `clsx`, `tailwind-merge` |
| Email integration | `@emailjs/browser` |
| Spam protection | `react-google-recaptcha` |
| Container runtime | Docker on Node 24 Alpine |

## Architecture Snapshot

- Single-page application with local state only
- `MainPage` controls which card is expanded
- Card 1 is decorative, Card 2 is static, Cards 3-5 are expandable
- Shared UI lives in `src/components/common/`
- Feature code is split by intent: `about`, `portfolio`, `contact`, `namecard`
- Styling tokens and utilities live in `src/styles/main.css`

## Deployment Snapshot

- Docker deployment: `docker-compose.yml` pulls `registry.wsapz.com/ws-portfolio-new:latest`
- CI/CD: GitHub Actions builds and pushes `registry.wsapz.com/ws-portfolio-new:latest` on pushes to `main`
- Runtime config: Portainer injects env vars, `docker-entrypoint.sh` writes `config.js`, and `src/config/env.ts` reads them in the browser
