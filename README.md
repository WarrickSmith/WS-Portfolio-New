# WS-Portfolio-New

Modern portfolio site for Warrick Smith, rebuilt on React 19, TypeScript 6, Tailwind CSS 4, and Webpack 5.

Planned production target: `https://ws.wsapz.com`

## Stack

- React 19.2.x
- TypeScript 6.0.x
- Tailwind CSS 4
- Framer Motion 12
- Webpack 5
- EmailJS + reCAPTCHA
- Docker multi-stage runtime on Node 24 Alpine

## Local Development

```bash
git clone https://github.com/WarrickSmith/ws-portfolio-new.git
cd ws-portfolio-new
npm install
cp .env.example .env
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Environment Configuration

Development uses `.env` through `dotenv-webpack`.

Production uses runtime injection:

```text
container env -> docker-entrypoint.sh -> /dist/config.js -> window.__ENV -> src/config/env.ts
```

Supported client-safe variables are documented in [.env.example](./.env.example) and [stack.env.example](./stack.env.example).

## Docker

Docker Compose pulls the published image from the private registry:

```bash
docker compose up -d
```

`docker-compose.yml` uses `registry.wsapz.com/ws-portfolio-new:latest` with `pull_policy: always`.
Log in to `registry.wsapz.com` on the Docker host before running Compose.

## CI/CD

`.github/workflows/ci.yml` publishes on pushes to `main`:

1. Check out the repository
2. Log in to `registry.wsapz.com` with username `warrick`
3. Build the existing multi-stage `Dockerfile`
4. Push `registry.wsapz.com/ws-portfolio-new:latest`

The workflow uses the GitHub secret `REGISTRY_PASSWORD` and intentionally passes no application environment values as Docker build args.

## Deployment

Portainer remains the runtime deployment surface:

1. Use [`docker-compose.yml`](./docker-compose.yml) as the stack file.
2. Import runtime env vars from `stack.env`.
3. Deploy `registry.wsapz.com/ws-portfolio-new:latest`.
4. Let `docker-entrypoint.sh` generate `config.js` from those env vars at startup.

## Verification

This repo intentionally has no automated unit/integration test framework.

Use:

- `npm run build`
- `docker compose config`
- manual browser verification

## Documentation

- [docs/index.md](./docs/index.md)
- [docs/development-guide.md](./docs/development-guide.md)
- [docs/deployment-guide.md](./docs/deployment-guide.md)
- [NGINX-DEPLOYMENT.md](./NGINX-DEPLOYMENT.md)
