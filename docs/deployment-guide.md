# WS-Portfolio-New — Deployment Guide

## Overview

- Container runtime: Docker on `node:24-alpine`
- Static server: `serve`
- Reverse proxy: Nginx Proxy Manager
- Deployment surface: Portainer
- CI publisher: GitHub Actions

## CI/CD Flow

`.github/workflows/ci.yml` runs on pushes to `main`.

Workflow steps:

1. `actions/checkout@v6`
2. `docker/setup-buildx-action@v4`
3. `docker/login-action@v4`
4. `docker/build-push-action@v7`

Publish target:

- registry: `registry.wsapz.com`
- image: `registry.wsapz.com/ws-portfolio-new:latest`
- GitHub secret: `REGISTRY_PASSWORD`

The workflow does not pass EmailJS, reCAPTCHA, API, or visitor-tracking settings as Docker build args.

## Docker Image Behavior

The `Dockerfile` is multi-stage:

1. install dependencies
2. run `npm run build`
3. copy `dist/` into a small runtime image
4. run `docker-entrypoint.sh`
5. start `serve -s /app/dist -l 3000`

## Runtime Environment Injection

Production configuration is injected at container start, not baked into the bundle.

```text
Portainer/container env
  -> docker-entrypoint.sh
  -> /app/dist/config.js
  -> window.__ENV
  -> src/config/env.ts
```

Supported client-safe keys:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_CONTACT_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `RECAPTCHA_SITE_KEY`
- `DEBUG_VISITOR_TRACKING`
- `API_URL`
- `ENABLE_VISITOR_TRACKING`

## Local Validation Path

Use the repo compose file for local builds:

```bash
docker compose build
docker compose up -d
```

`docker-compose.yml` uses explicit image tag `ws-portfolio:local`.

## Portainer Deployment Path

For production, Portainer should pull the registry image rather than rebuilding locally.

Example stack service:

```yaml
services:
  ws-portfolio:
    image: registry.wsapz.com/ws-portfolio-new:latest
    container_name: ws-portfolio-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      EMAILJS_SERVICE_ID: ${EMAILJS_SERVICE_ID}
      EMAILJS_TEMPLATE_ID: ${EMAILJS_TEMPLATE_ID}
      EMAILJS_CONTACT_TEMPLATE_ID: ${EMAILJS_CONTACT_TEMPLATE_ID}
      EMAILJS_PUBLIC_KEY: ${EMAILJS_PUBLIC_KEY}
      RECAPTCHA_SITE_KEY: ${RECAPTCHA_SITE_KEY}
      DEBUG_VISITOR_TRACKING: ${DEBUG_VISITOR_TRACKING:-false}
      API_URL: ${API_URL:-https://ws.wsapz.com}
      ENABLE_VISITOR_TRACKING: ${ENABLE_VISITOR_TRACKING:-false}
```

## Nginx Proxy Manager

- domain: `ws.wsapz.com`
- forward host: `ws-portfolio-app`
- forward port: `3000`
- SSL: Let's Encrypt

## Troubleshooting

| Issue | Resolution |
|-------|------------|
| Container fails to start | `docker logs ws-portfolio-app` |
| Runtime config missing in browser | verify env vars are present in Portainer and inspect `/config.js` |
| Portainer is still running an old image | pull `registry.wsapz.com/ws-portfolio-new:latest` again before redeploy |
| Proxy returns 502 | confirm Nginx Proxy Manager targets `ws-portfolio-app:3000` |
