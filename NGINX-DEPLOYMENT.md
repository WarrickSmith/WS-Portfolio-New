# Simple Nginx Proxy Manager Deployment

## Quick Deploy to Portainer

### 1. Create Stack in Portainer
- **Stacks** → **Add Stack** 
- **Name:** `ws-portfolio`

### 2. Set Environment Variables
Add these in the Portainer stack environment variables section:

```
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
EMAILJS_PUBLIC_KEY=your_public_key
RECAPTCHA_SITE_KEY=your_recaptcha_key
API_URL=https://your-domain.com
DEBUG_VISITOR_TRACKING=false
```

### 3. Deploy Stack
Use the docker-compose.yml from the repository.

### 4. Configure Nginx Proxy Manager
- **Domain:** your-domain.com
- **Forward Host:** `ws-portfolio-app`
- **Forward Port:** 3000
- **SSL:** Enable with Let's Encrypt

## Files

### docker-compose.yml
```yaml
version: '3.8'
services:
  ws-portfolio:
    build: .
    container_name: ws-portfolio-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - EMAILJS_SERVICE_ID=${EMAILJS_SERVICE_ID}
      - EMAILJS_TEMPLATE_ID=${EMAILJS_TEMPLATE_ID}
      - EMAILJS_CONTACT_TEMPLATE_ID=${EMAILJS_CONTACT_TEMPLATE_ID}
      - EMAILJS_PUBLIC_KEY=${EMAILJS_PUBLIC_KEY}
      - RECAPTCHA_SITE_KEY=${RECAPTCHA_SITE_KEY}
      - API_URL=${API_URL}
      - DEBUG_VISITOR_TRACKING=${DEBUG_VISITOR_TRACKING}
```

### Dockerfile
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

## Local Development

```bash
# Clone and setup
git clone <repo>
cd ws-portfolio-new
cp .env.example .env
# Edit .env with your values

# Run locally
npm install
npm run dev

# Or with Docker
docker-compose up -d
```

## Troubleshooting

- **Container won't start:** Check logs with `docker logs ws-portfolio-app`
- **Environment variables missing:** Ensure they're set in Portainer stack interface
- **502 errors:** Verify container is running and nginx proxy points to `ws-portfolio-app:3001`
- **Port conflict:** If you get networking errors, change external port to different number (e.g., 3002:3000)

That's it! Simple and clean.