# Nginx Proxy Manager Deployment Guide

## Overview

Simplified deployment guide for running behind nginx proxy manager (as you were using with Vite).

## Quick Start

### 1. Environment Setup
```bash
cp .env.example .env
# Edit .env with your actual values
```

### 2. Deploy Container

**Option A: Local Docker Compose**
```bash
docker-compose up -d
```

**Option B: Portainer Stack**
1. In Portainer, go to **Stacks** → **Add Stack**
2. **Name:** `ws-portfolio-new`
3. **Build method:** Repository or Upload
4. **Environment Variables:** Import your environment file or add manually:
   ```
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   RECAPTCHA_SITE_KEY=your_recaptcha_key
   API_URL=https://your-domain.com
   DEBUG_VISITOR_TRACKING=false
   ```
5. **Deploy Stack**

**Option C: Direct Docker Run**
```bash
docker run -d \
  --name ws-portfolio-app \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  ws-portfolio:latest
```

### 3. Configure Nginx Proxy Manager

**Add Proxy Host:**
- **Domain Name:** your-domain.com
- **Scheme:** http
- **Forward Hostname/IP:** 
  - If on same Docker network: `ws-portfolio-app`
  - If different host: `your-docker-host-ip`
- **Forward Port:** 3000
- **Cache Assets:** ✅ Enabled
- **Block Common Exploits:** ✅ Enabled
- **Websockets Support:** ❌ Not needed

**SSL Tab:**
- **SSL Certificate:** Use existing or request new Let's Encrypt
- **Force SSL:** ✅ Enabled
- **HTTP/2 Support:** ✅ Enabled

## Simple Files Overview

### docker-compose.yml (Local Development)
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
      - API_URL=${API_URL:-http://localhost:3000}
      - DEBUG_VISITOR_TRACKING=${DEBUG_VISITOR_TRACKING:-false}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
```

### For Portainer
Portainer reads environment variables from the stack interface, so use `docker-compose.portainer.yml` or the above format without `env_file`.

### .env (Required Variables)
```env
NODE_ENV=production

# EmailJS Configuration
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
EMAILJS_PUBLIC_KEY=your_public_key

# reCAPTCHA
RECAPTCHA_SITE_KEY=your_recaptcha_key

# Optional
API_URL=https://your-domain.com
DEBUG_VISITOR_TRACKING=false
```

## Container Management

### Check Status
```bash
# View logs
docker logs ws-portfolio-app

# Check health
docker inspect ws-portfolio-app | grep -A 5 Health

# Resource usage
docker stats ws-portfolio-app
```

### Updates
```bash
# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Or with manual commands
docker stop ws-portfolio-app
docker rm ws-portfolio-app
docker build -t ws-portfolio:latest .
docker run -d --name ws-portfolio-app --restart unless-stopped -p 3000:3000 --env-file .env ws-portfolio:latest
```

## Troubleshooting

### Container Issues
```bash
# Container won't start
docker logs ws-portfolio-app

# Check if port is available
netstat -tlnp | grep :3000

# Check environment variables
docker exec ws-portfolio-app env | grep EMAILJS
```

### Portainer Deployment Issues
1. **Environment file not found**: 
   - Error: `env file /data/compose/.../.env not found`
   - Solution: Remove `env_file: - .env` from docker-compose.yml
   - Use environment variables in Portainer stack interface instead
   - Reference variables as `${VARIABLE_NAME}` in docker-compose.yml

2. **Stack deployment fails**:
   - Use `docker-compose.portainer.yml` for Portainer deployments
   - Ensure all required environment variables are set in stack

### Nginx Proxy Issues
1. **502 Bad Gateway**: Container not running or wrong port
2. **SSL Issues**: Check certificate status in nginx proxy manager
3. **Connection timeout**: Check firewall rules for port 3000

### Common Solutions
- Ensure container name matches nginx proxy configuration
- Verify environment variables are set correctly
- Check Docker network connectivity
- Restart nginx proxy manager if needed

## Performance Notes

- **Container Size**: ~50MB (optimized)
- **Memory Usage**: ~64MB typical
- **CPU Usage**: Minimal when idle
- **Startup Time**: ~5-10 seconds

## Migration from Vite

If you were previously using Vite configuration:
1. Your nginx proxy manager config should work exactly the same
2. Just point to the new container name `ws-portfolio-app`
3. Port remains 3000
4. Environment variables changed (no VITE_ prefix)

## Security

- Container runs as non-root user
- Only serves static built files
- Health checks ensure reliability
- Nginx proxy manager handles SSL/security headers