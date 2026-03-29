# WS-Portfolio-New — Deployment Guide

## Infrastructure Overview

- **Container:** Docker (Node.js 22 Alpine)
- **Static Server:** `serve` package (port 3000)
- **Reverse Proxy:** Nginx Proxy Manager
- **Orchestration:** Portainer (Docker stack management)
- **SSL:** Let's Encrypt (via Nginx Proxy Manager)

## Docker Build

### Dockerfile Summary

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build args for environment variables (injected at build time)
ARG EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, etc.
ENV EMAILJS_SERVICE_ID=$EMAILJS_SERVICE_ID, etc.
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Key detail:** Environment variables are build-time only. They are baked into the webpack bundle during `npm run build`. Changing environment variables requires a full rebuild.

### docker-compose.yml

```yaml
version: '3.8'
services:
  ws-portfolio:
    build:
      context: .
      args:
        - API_URL=${API_URL:-http://localhost:3000}
        - EMAILJS_SERVICE_ID=${EMAILJS_SERVICE_ID}
        - EMAILJS_TEMPLATE_ID=${EMAILJS_TEMPLATE_ID}
        - EMAILJS_CONTACT_TEMPLATE_ID=${EMAILJS_CONTACT_TEMPLATE_ID}
        - EMAILJS_PUBLIC_KEY=${EMAILJS_PUBLIC_KEY}
        - RECAPTCHA_SITE_KEY=${RECAPTCHA_SITE_KEY}
        - DEBUG_VISITOR_TRACKING=${DEBUG_VISITOR_TRACKING:-false}
    container_name: ws-portfolio-app
    restart: unless-stopped
    ports:
      - '3000:3000'
```

## Portainer Deployment

1. **Create Stack** → Name: `ws-portfolio`
2. **Set Environment Variables** in Portainer stack interface:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_CONTACT_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
   - `RECAPTCHA_SITE_KEY`
   - `API_URL` (production domain URL)
   - `DEBUG_VISITOR_TRACKING=false`
3. **Deploy** using docker-compose.yml from repository

## Nginx Proxy Manager Configuration

- **Domain:** your-domain.com
- **Forward Host:** `ws-portfolio-app`
- **Forward Port:** 3000
- **SSL:** Enable with Let's Encrypt

## Production Build Output

`npm run build` generates optimized static files in `dist/`:
- Content-hashed JS bundles (main + vendors chunk)
- Source maps
- Asset files (images with content hashes)
- Copied public files (favicon.ico)

### Performance Limits (webpack.prod.cjs)
- Max asset size: 2.5MB
- Max entrypoint size: 2.5MB
- Vendor chunk splitting enabled
- Tree shaking via `usedExports: true` and `sideEffects: false`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Container won't start | Check logs: `docker logs ws-portfolio-app` |
| Missing env vars | Verify in Portainer stack environment section |
| 502 errors | Confirm container is running and proxy points to `ws-portfolio-app:3000` |
| Port conflict | Change external port (e.g., `3002:3000`) |
| Env var changes not reflecting | Rebuild container (env vars are build-time) |
