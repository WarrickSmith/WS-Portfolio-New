# WS-Portfolio-New — Source Tree Analysis

## Directory Structure

```
ws-portfolio-new/
├── index.html                          # HTML template (Webpack HtmlWebpackPlugin)
├── package.json                        # Dependencies and scripts
├── tsconfig.json                       # TypeScript config (strict, ES2022, path aliases)
├── webpack.common.cjs                  # Shared webpack config (loaders, plugins, output)
├── webpack.dev.cjs                     # Dev server (HMR, port 3000, source maps)
├── webpack.prod.cjs                    # Production (vendor splitting, tree shaking, 2.5MB limits)
├── Dockerfile                          # Node.js 22 Alpine, build + serve
├── docker-compose.yml                  # Container config, env vars as build args
├── .env.example                        # Environment variable template
├── stack.env.example                   # Portainer stack environment template
├── NGINX-DEPLOYMENT.md                 # Deployment guide for Portainer + Nginx Proxy Manager
├── README.md                           # Project overview and installation
├── CLAUDE.md                           # AI agent instructions
│
├── public/                             # Static assets copied to dist root
│   └── favicon.ico                     # Site favicon
│
├── src/                                # Application source code
│   ├── main.tsx                        # ★ Entry point — ReactDOM.createRoot, StrictMode
│   ├── App.tsx                         # Root component — MainContainer + VisitorTracker + MainPage
│   ├── GlobalStyle.ts                  # Global CSS variables, reset, body styles
│   │
│   ├── assets/                         # Image assets (imported via webpack asset/resource)
│   │   ├── warrick.jpg                 # Profile photo (Card 1 background + About section)
│   │   ├── 211651_close_round_icon.svg # Close button icon
│   │   ├── ws-portfolio.jpg            # Portfolio project screenshot
│   │   ├── reservationizr-img.jpg      # Reservationizr project screenshot
│   │   ├── music-manager.jpg           # Music Manager project screenshot
│   │   ├── raceday.png                 # RaceDay project screenshot
│   │   └── tic-tac-toe.jpg             # Tic Tac Toe project screenshot
│   │
│   ├── components/                     # React components
│   │   ├── MainPage.tsx                # ★ Card grid + expansion state management
│   │   ├── VisitorTracker.tsx          # Non-visual visitor tracking (fires on mount)
│   │   │
│   │   ├── common/                     # Reusable components
│   │   │   ├── GridComponents.tsx      # MainContainer, GridContainer, DimmedLayer, Card
│   │   │   ├── renderChildDiv.tsx      # Maps card IDs to expanded content components
│   │   │   ├── CardHeader.tsx          # Section header with title + icon + dividers
│   │   │   ├── HoverText.tsx           # Multi-word colored text
│   │   │   ├── HoverTextWrapper.tsx    # Neon glow + explode/implode hover animation
│   │   │   ├── WordSlider.tsx          # Animated rotating word display
│   │   │   ├── BulletPoints.tsx        # Portfolio card (image → hover details)
│   │   │   ├── FaIcon.tsx              # Dynamic FontAwesome icon resolver
│   │   │   ├── CloseButton.tsx         # Fixed close button for expanded cards
│   │   │   ├── Page.tsx                # Base styled page container
│   │   │   └── ParagraphSeparator.tsx  # Gold horizontal rule divider
│   │   │
│   │   ├── box2/                       # Card 2 — Introduction
│   │   │   └── Box2.tsx                # "Hi There! I'm Warrick Smith" + WordSlider
│   │   │
│   │   ├── box3/                       # Card 3 — About Me
│   │   │   ├── Box3.tsx                # Preview ("About Me" hover text)
│   │   │   ├── Box3Content.tsx         # Expanded content (personal info + cells)
│   │   │   └── cellContent/            # About Me sub-sections
│   │   │       ├── Cell1.tsx           # GitHub repos link button
│   │   │       ├── Cell2.tsx           # Personal info grid + profile image
│   │   │       ├── Cell3.tsx           # Years of experience display
│   │   │       ├── Cell4.tsx           # Consolidated summary container
│   │   │       ├── YearsExperience.tsx # Dynamic years calculation (from 2021)
│   │   │       ├── WsImage.tsx         # Profile image background component
│   │   │       └── ConsolidatedSummary.tsx # Experience, education, skills, adaptability
│   │   │
│   │   ├── box4/                       # Card 4 — Portfolio
│   │   │   ├── Box4.tsx                # Preview ("My Portfolio" hover text)
│   │   │   └── Box4Content.tsx         # Expanded portfolio grid with BulletPoints
│   │   │
│   │   └── box5/                       # Card 5 — Contact
│   │       ├── Box5.tsx                # Preview ("Get In Touch" hover text)
│   │       ├── Box5Content.tsx         # Contact layout (info + form)
│   │       ├── ContactMe.tsx           # Contact info sidebar
│   │       └── ContactForm.tsx         # EmailJS form with reCAPTCHA
│   │
│   ├── data/                           # Data models and constants
│   │   ├── personalData.tsx            # Raw experience, education, skills arrays
│   │   ├── consolidatedProfile.tsx     # Typed profile with calculated years
│   │   └── portfolioData.tsx           # Portfolio projects (URLs, images, bullet points)
│   │
│   ├── hooks/                          # Custom React hooks
│   │   └── useVisitorTracker.ts        # Visitor tracking with rate limiting + EmailJS
│   │
│   ├── services/                       # External API integrations
│   │   └── ipGeolocationService.ts     # IP geolocation via ipapi.co (class-based)
│   │
│   └── types/                          # TypeScript type definitions
│       ├── env.d.ts                    # Process.env type declarations
│       ├── assets.d.ts                 # Image/SVG module declarations
│       └── visitor.types.ts            # VisitorData, VisitorGeolocation, RateLimitConfig
│
├── docs/                               # Generated project documentation
└── _bmad-output/                       # BMad workflow outputs
```

## Critical Folders

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `src/components/common/` | Shared UI components | GridComponents.tsx (layout system), renderChildDiv.tsx (card routing) |
| `src/components/box3/cellContent/` | About Me sub-sections | ConsolidatedSummary.tsx (main content), YearsExperience.tsx (dynamic calc) |
| `src/data/` | Application data | personalData.tsx (source of truth), consolidatedProfile.tsx (typed wrapper) |
| `src/hooks/` | Business logic hooks | useVisitorTracker.ts (visitor tracking orchestration) |
| `src/services/` | External API clients | ipGeolocationService.ts (IP lookup) |
| `src/types/` | TypeScript declarations | visitor.types.ts (data shapes), env.d.ts (env var types) |
| `src/assets/` | Image assets | Portfolio screenshots, profile photo, icons |

## Entry Points

- **Application:** `src/main.tsx` → renders `<App />` into `#root`
- **HTML Template:** `index.html` → processed by HtmlWebpackPlugin
- **Build:** `webpack.common.cjs` (entry: `./src/main.tsx`)
