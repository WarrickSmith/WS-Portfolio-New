# WS-Portfolio-New — Source Tree Analysis

## Directory Structure

```text
ws-portfolio-new/
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions build and publish workflow
├── Dockerfile                         # Multi-stage build and runtime image
├── docker-compose.yml                 # Image-only compose file for local Docker and Portainer
├── docker-entrypoint.sh               # Writes /dist/config.js from runtime env vars
├── .env.example                       # Local development env template
├── stack.env.example                  # Portainer/runtime env template
├── README.md
├── CLAUDE.md
├── NGINX-DEPLOYMENT.md
├── package.json
├── webpack.common.cjs
├── webpack.dev.cjs
├── webpack.prod.cjs
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── assets/
│   ├── components/
│   │   ├── MainPage.tsx
│   │   ├── VisitorTracker.tsx
│   │   ├── about/
│   │   ├── common/
│   │   ├── contact/
│   │   ├── namecard/
│   │   └── portfolio/
│   ├── config/
│   │   └── env.ts                     # Runtime/build env access gateway
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   │   └── cn.ts                      # clsx + tailwind-merge helper
│   ├── services/
│   ├── styles/
│   │   └── main.css                   # Tailwind import + theme tokens
│   └── types/
├── docs/
└── _bmad-output/
```

## Important Paths

| Path | Purpose |
|------|---------|
| `src/components/MainPage.tsx` | Top-level card layout and expansion state |
| `src/components/common/renderChildDiv.tsx` | Maps selected card IDs to expanded content |
| `src/components/about/` | About card preview and expanded content |
| `src/components/portfolio/` | Portfolio preview and expanded content |
| `src/components/contact/` | Contact preview, layout, and form |
| `src/config/env.ts` | Reads runtime env from `window.__ENV` with dev fallback |
| `src/styles/main.css` | Tailwind tokens, typography, spacing, animation utilities |
| `docker-entrypoint.sh` | Generates runtime `config.js` from container env |
| `.github/workflows/ci.yml` | Builds and publishes the Docker image on pushes to `main` |

## Notes

- The old `box2`-`box5` folder structure is gone.
- `GlobalStyle.ts` is gone; Tailwind token definitions live in `src/styles/main.css`.
- `docker-compose.yml` pulls `registry.wsapz.com/ws-portfolio-new:latest` for both local Docker and Portainer.
- Production publishing targets `registry.wsapz.com/ws-portfolio-new:latest`.
