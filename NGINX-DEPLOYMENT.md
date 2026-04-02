# Nginx Proxy Manager Deployment

## Portainer Stack

Create a stack named `ws-portfolio` that pulls the published registry image.

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

## Runtime Env Model

The image does not need build args for public application settings.

At container start:

```text
Portainer env vars -> docker-entrypoint.sh -> /app/dist/config.js -> window.__ENV
```

This lets you change runtime configuration without rebuilding the image.

## Portainer Variables

Set these in the stack environment UI or via `stack.env`:

```text
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
EMAILJS_PUBLIC_KEY=your_public_key
RECAPTCHA_SITE_KEY=your_recaptcha_key
API_URL=https://ws.wsapz.com
DEBUG_VISITOR_TRACKING=false
ENABLE_VISITOR_TRACKING=false
```

## Nginx Proxy Manager

- Domain: `ws.wsapz.com`
- Forward Hostname / IP: `ws-portfolio-app`
- Forward Port: `3000`
- Websocket Support: enabled
- SSL: Let's Encrypt

## Notes

- GitHub Actions publishes `registry.wsapz.com/ws-portfolio-new:latest` on pushes to `main`.
- Local validation still uses the repo `docker-compose.yml` and image tag `ws-portfolio:local`.
- If you pull a new image in Portainer, redeploy the stack so the updated container starts and regenerates `config.js`.
