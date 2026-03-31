# WS-Portfolio-New — Documentation Index

> Generated: 2026-03-30 | Scan Level: Exhaustive | Mode: Initial Scan

## Project Overview

- **Type:** Monolith (Single-Page Application)
- **Primary Language:** TypeScript
- **Architecture:** Card-based grid layout with modal expansion
- **Live URL:** [warricksmith.com](https://warricksmith.com)

## Quick Reference

- **Tech Stack:** React 19.2.4 + TypeScript 6.0.2 + Webpack 5.105.4
- **Styling:** styled-components 6.3.12 + Framer Motion 12.38.0
- **Entry Point:** `src/main.tsx`
- **Architecture Pattern:** Card-based grid with modal overlays
- **Deployment:** Docker (Node.js 24 Alpine) → Nginx Proxy Manager → Portainer

## Generated Documentation

- [Project Overview](./project-overview.md) — Executive summary, purpose, tech stack, key features
- [Architecture](./architecture.md) — Component architecture, state management, external services, styling, build system
- [Source Tree Analysis](./source-tree-analysis.md) — Annotated directory structure with file purposes
- [Component Inventory](./component-inventory.md) — All 27 components categorized with props and purpose
- [Development Guide](./development-guide.md) — Setup, scripts, env vars, build system, conventions
- [Deployment Guide](./deployment-guide.md) — Docker, Portainer, Nginx Proxy Manager, troubleshooting

## Existing Documentation

- [README.md](../README.md) — Project overview and installation instructions
- [CLAUDE.md](../CLAUDE.md) — AI agent coding instructions
- [NGINX-DEPLOYMENT.md](../NGINX-DEPLOYMENT.md) — Detailed Portainer + Nginx deployment guide
- [.env.example](../.env.example) — Environment variable template
- [stack.env.example](../stack.env.example) — Portainer stack environment template
- [PR Template](../.github/PULL_REQUEST_TEMPLATE.md) — Pull request checklist

## Getting Started

```bash
# Install and run
npm install
cp .env.example .env  # Configure EmailJS + reCAPTCHA keys
npm run dev            # http://localhost:3000

# Production build
npm run build
npm start

# Docker deployment
docker-compose up -d
```
