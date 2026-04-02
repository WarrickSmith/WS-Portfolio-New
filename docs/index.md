# WS-Portfolio-New — Documentation Index

## Quick Reference

- Project type: single-page portfolio application
- Primary language: TypeScript
- UI stack: React 19 + Tailwind CSS 4 + Framer Motion 12
- Build stack: Webpack 5 + TypeScript 6
- Planned production URL: `https://ws.wsapz.com`
- Runtime deployment path: GitHub Actions -> registry -> Portainer -> `docker-entrypoint.sh` -> `config.js`

## Core Documents

- [Project Overview](./project-overview.md)
- [Architecture](./architecture.md)
- [Source Tree Analysis](./source-tree-analysis.md)
- [Component Inventory](./component-inventory.md)
- [Development Guide](./development-guide.md)
- [Deployment Guide](./deployment-guide.md)

## Repository Docs

- [README.md](../README.md)
- [CLAUDE.md](../CLAUDE.md)
- [NGINX-DEPLOYMENT.md](../NGINX-DEPLOYMENT.md)
- [.env.example](../.env.example)
- [stack.env.example](../stack.env.example)
- [GitHub Actions workflow](../.github/workflows/ci.yml)

## Current Foundations

- Tailwind tokens live in `src/styles/main.css`
- Shared class merging uses `src/lib/cn.ts`
- Runtime env access is centralized in `src/config/env.ts`
- Local Docker builds use explicit image tag `ws-portfolio:local`
- CI publishes `registry.wsapz.com/ws-portfolio-new:latest`

## Common Commands

```bash
npm install
cp .env.example .env
npm run dev
npm run build
docker compose build
docker compose up -d
```
