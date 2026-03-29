# WS-Portfolio-New — Development Guide

## Prerequisites

- **Node.js** 22.x (recommended: use nvm)
- **npm** (ships with Node.js)
- **Docker** (optional, for containerized deployment)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/WarrickSmith/ws-portfolio-new.git
cd ws-portfolio-new

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your EmailJS and reCAPTCHA keys

# Start development server
npm run dev
```

The application will start on **http://localhost:3000** with hot module replacement.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start webpack dev server (port 3000, HMR, auto-open browser) |
| `npm run build` | Production build to `dist/` |
| `npm start` | Serve production build via `serve -s dist -l 3000` |

## Environment Variables

Create a `.env` file in the project root (see `.env.example`):

| Variable | Required | Description |
|----------|----------|-------------|
| `API_URL` | No | Application URL (default: http://localhost:3000) |
| `EMAILJS_SERVICE_ID` | Yes | EmailJS service identifier |
| `EMAILJS_TEMPLATE_ID` | Yes | EmailJS visitor notification template |
| `EMAILJS_CONTACT_TEMPLATE_ID` | Yes | EmailJS contact form template |
| `EMAILJS_PUBLIC_KEY` | Yes | EmailJS public API key |
| `RECAPTCHA_SITE_KEY` | Yes | Google reCAPTCHA v2 site key |
| `DEBUG_VISITOR_TRACKING` | No | Enable visitor tracking debug logs (default: false) |

**Important:** Environment variables are injected at **build time** via dotenv-webpack, not at runtime. Changing `.env` requires a rebuild.

## Build System

### Webpack Configuration

Three-file webpack setup using `webpack-merge`:

- **`webpack.common.cjs`** — Entry point (`src/main.tsx`), TypeScript loader, CSS loader, asset handling, plugins, path alias (`@` → `src/`)
- **`webpack.dev.cjs`** — Dev server config: HMR, inline source maps, port 3000, historyApiFallback
- **`webpack.prod.cjs`** — Production: source maps, vendor chunk splitting, tree shaking, 2.5MB asset/entrypoint limits

### TypeScript Configuration

- **Target:** ES2022
- **Module:** ESNext
- **Strict mode:** Enabled
- **JSX:** react-jsx (automatic runtime)
- **Path alias:** `@/*` → `src/*`
- **Isolated modules:** true

## Docker Deployment

### Local Docker

```bash
docker-compose up -d
```

### Portainer Stack Deployment

1. Create stack in Portainer named `ws-portfolio`
2. Set environment variables in Portainer UI (see `stack.env.example`)
3. Deploy using `docker-compose.yml`
4. Configure Nginx Proxy Manager:
   - Forward host: `ws-portfolio-app`
   - Forward port: 3000
   - Enable SSL with Let's Encrypt

See `NGINX-DEPLOYMENT.md` for detailed deployment instructions.

## Project Conventions

### File Naming
- Components: **PascalCase** (`Box2.tsx`, `ContactForm.tsx`)
- Hooks: **camelCase** with `use` prefix (`useVisitorTracker.ts`)
- Services: **camelCase** (`ipGeolocationService.ts`)
- Data: **camelCase** (`portfolioData.tsx`)

### Component Patterns
- All components are functional (no class components)
- Default exports for components
- Named exports for data/utilities
- styled-components for all styling (no CSS modules or inline styles)

### Git Workflow
- Branch naming: `feat/`, `fix/`, `refactor/`, `chore/` prefixes
- Commit messages: Conventional Commits (`feat: description`, `fix: description`)
- Semantic versioning via git tags (`vX.Y.Z`)

### Testing
- No automated test framework — manual browser verification only
- Run `npm run dev` and confirm changes visually in the browser
