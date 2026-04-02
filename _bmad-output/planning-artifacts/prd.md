---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
classification:
  projectType: 'web_app'
  domain: 'general'
  complexity: 'low'
  projectContext: 'brownfield'
inputDocuments:
  - '_bmad-output/project-context.md'
  - 'docs/index.md'
  - 'docs/project-overview.md'
  - 'docs/architecture.md'
  - 'docs/source-tree-analysis.md'
  - 'docs/component-inventory.md'
  - 'docs/development-guide.md'
  - 'docs/deployment-guide.md'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 8
workflowType: 'prd'
---

# Product Requirements Document - WS-Portfolio-New

**Author:** Warrick
**Date:** 2026-03-30

## Executive Summary

WS-Portfolio-New is a personal portfolio SPA for Warrick Smith, a full-stack developer based in Auckland, New Zealand. Built around a distinctive card-based grid layout with click-to-expand animated overlays — an uncommon interaction pattern that sets it apart from typical menu-driven portfolio sites.

This refresh modernizes the entire stack while preserving that signature UX. Tech stack updates to Node.js 24+, latest stable React, TypeScript, and supporting libraries. Styled-components migrates to a modern styling approach. The "About Me" section is redesigned for better readability and visual impact. The "My Portfolio" section is overhauled with richer project descriptions replacing brief hover-based tooltips. Stale projects (Reservations, Tic Tac Toe) are removed; remaining entries updated to reflect current tech stacks. Portfolio screenshots are refreshed — notably the RaceDay race page screenshot (live at raceday.wsapz.com). Animations are refined throughout.

Engineering gains: CI/CD pipeline with GitHub Actions building and pushing Docker images to a private registry (mirroring the raceday-sql project pattern), visitor tracking toggleable via `.env` configuration, dead code and redundant resources audited and removed. Public URL moves from warricksmith.com to ws.wsapz.com (nginx already configured). Money Manager URL updates from mm.warricksmith.com to mm.wsapz.com (nginx already configured). No automated test framework — all verification is manual in-browser.

### What Makes This Special

The card-based animated grid is the product's identity. Visitors click cards that expand into full-screen overlays with smooth Framer Motion transitions — a deliberate departure from standard navigation. The refresh elevates everything within this framework: deeper portfolio content, polished About Me experience, smoother animations, modern infrastructure — without changing the interaction paradigm.

Core insight: the interaction model is already strong and differentiated. The gap is content depth, visual polish, and engineering infrastructure catching up to that vision.

## Project Classification

- **Project Type:** Web Application (Single-Page Application)
- **Domain:** General / Personal Portfolio
- **Complexity:** Low
- **Project Context:** Brownfield — existing deployed application with established architecture, documentation, and deployment pipeline

## Success Criteria

### User Success

- **Recruiters** land on the site and immediately sense technical competence — the interaction design demonstrates frontend skill before they read content
- **Potential collaborators** quickly assess tech stack, project depth, and approach through detailed portfolio descriptions
- **Fellow developers** appreciate the uncommon card-based animated UX and recognize implementation quality
- **All visitors** find the About Me section easy to scan with clear visual hierarchy for experience, skills, and education
- Portfolio projects link to live demos and repos — visitors verify claims with one click

### Business Success

- Portfolio accurately reflects current skills and active projects (no stale entries or dead links)
- Site deployable via single CI/CD pipeline push — no manual Docker builds
- Domain transition to ws.wsapz.com seamless with no broken references
- Site serves as credible professional presence supporting job and collaboration opportunities

### Technical Success

- All Lighthouse audit categories ≥ 90 (Performance, Accessibility, Best Practices, SEO)
- Fast initial load — optimized bundle splitting, tree shaking, asset compression
- Efficient Docker image size — minimal layers, Alpine-based, no dev dependencies in production image
- Node.js 24+ as minimum runtime
- All dependencies at latest stable versions with no deprecated packages
- CI/CD pipeline builds and pushes images to private registry on merge to main
- Zero dead code, unused assets, or redundant resources after audit
- Visitor tracking fully toggleable via `.env` — disabled by default in development

### Measurable Outcomes

- Lighthouse scores ≥ 90 across all categories
- Production Docker image under 150MB
- All portfolio project links resolve to live applications
- CI/CD pipeline completes build + push in under 5 minutes
- Performance metrics as specified in Non-Functional Requirements

## User Journeys

### Journey 1: Sarah the Tech Recruiter — "Who is this person?"

**Persona:** Sarah, senior tech recruiter at a mid-size Auckland firm. Reviewing 20+ developer profiles today with about 90 seconds per candidate before deciding whether to dig deeper.

**Opening Scene:** Sarah receives Warrick's portfolio link via LinkedIn. She clicks through and lands on a dark-themed page with an animated card grid. Immediately she notices this isn't a template — the hover effects and neon glow feel custom-built.

**Rising Action:** She clicks "About Me" and the card smoothly expands into a full overlay. The layout is clean — she scans experience years, skills, and education without scrolling through walls of text. She spots the GitHub repos link and opens it in a new tab. Back on the portfolio, she clicks "My Portfolio" and sees project cards with detailed descriptions — context about what each project does, the tech stack used, and links to live demos.

**Climax:** She clicks through to the RaceDay live demo and sees a polished, functional application. The portfolio description matches what she sees. This developer ships real work.

**Resolution:** Sarah bookmarks the portfolio and adds Warrick to her shortlist. The site itself demonstrated frontend competence before she even read the content. She clicks "Get In Touch" and sends a message through the contact form.

### Journey 2: Marcus the Mobile Visitor — "This better work on my phone"

**Persona:** Marcus, a fellow developer who spotted Warrick's portfolio link in a Slack community. On his phone during his commute.

**Opening Scene:** Marcus taps the link on his phone. The grid layout adapts — the background image card is hidden, remaining cards stack vertically. Load time is fast despite mobile data.

**Rising Action:** He taps "My Portfolio" and the card expands to fill the screen. Project descriptions are readable without pinching to zoom. Screenshots are responsive and load quickly. He taps through to a live demo link — it opens in a new tab cleanly.

**Climax:** He scrolls back and taps "About Me." Content is well-structured with clear headings and readable font sizes. Skills are easy to scan. No fighting the layout to get information.

**Resolution:** Marcus shares the link in the Slack channel with a "nice portfolio, check out the card animations" comment. The responsive experience held up — no broken layouts, no illegible text, no frustrating interactions.

### Journey 3: Warrick the Owner — "Ship an update"

**Persona:** Warrick, the site owner. Just finished a new side project and wants to add it to the portfolio.

**Opening Scene:** Warrick updates `portfolioData.tsx` with the new project details — title, description, tech stack, live URL, GitHub link, and a screenshot. He adds the screenshot to assets.

**Rising Action:** He runs `npm run dev` and verifies the new project card appears correctly in the Portfolio section. Visitor tracking is disabled in his dev `.env` so no spurious email notifications fire. He checks the card expansion, description layout, and live demo link.

**Climax:** He pushes to main. The GitHub Actions CI/CD pipeline automatically builds the Docker image and pushes it to the private registry. He pulls the new image in Portainer and redeploys the stack — zero manual Docker build steps.

**Resolution:** The updated portfolio is live at ws.wsapz.com within minutes of the push. The docs in `./docs` were updated as part of the same PR. The site continues to reflect his current work without manual deployment friction.

### Journey Requirements Summary

| Journey | Capabilities Revealed |
|---------|----------------------|
| Sarah (Recruiter) | Fast first impression, scannable About Me, detailed portfolio descriptions, live demo links, working contact form, visual quality that demonstrates skill |
| Marcus (Mobile) | Responsive layout, fast mobile load, readable typography at all breakpoints, touch-friendly card interactions, optimized image loading |
| Warrick (Owner) | Simple data-driven content updates, `.env`-toggleable visitor tracking, CI/CD automated deployment, documentation kept in sync, fast dev feedback loop |

## Innovation & Novel Patterns

### Detected Innovation Areas

**Per-Card Unique Expansion Animations:** Each interactive card (About Me, My Portfolio, Get In Touch) uses a distinct expansion animation style — slide, morph, unfold, or scale — rather than a uniform transition. Reinforces the card-based interaction as a signature design element and rewards exploration with visual variety.

**Skills-to-Proof Mapping:** The About Me section evolves from a static skills list into an evidence-based credibility system. Technologies and skills link directly to the portfolio projects that demonstrate them, creating two-way navigation between "what I know" and "what I've built." Visitors verify claims without hunting.

**Skeleton Loading with Card Grid Shape:** Initial page load uses skeleton screens that mirror the exact card grid layout — dark placeholder cards with subtle shimmer animations matching the grid structure. The design language is present from the first frame; the transition from skeleton to content feels intentional rather than jarring.

**Ambient Background Motion:** The dark theme gains subtle life through slow-moving ambient motion — a gentle gradient shift, soft particle field, or slow colour pulse in the background. Creates visual depth and atmosphere without competing with content or impacting performance.

### Validation Approach

- All innovations validated through manual browser testing
- Per-card animations: test each card expansion independently across breakpoints
- Skills-to-proof mapping: confirm all skill-project links resolve correctly
- Skeleton loading: throttle network in DevTools, confirm visual continuity
- Ambient motion: confirm no performance impact via Lighthouse, no distraction through user feedback

### Risk Mitigation

- Per-card animations: fall back to uniform expansion if individual animations create inconsistency or maintenance burden
- Skills-to-proof mapping: fall back to one-way linking (skill → projects) if bidirectional adds too much complexity
- Skeleton loading: straightforward with modern React (Suspense/lazy) — low risk
- Ambient motion: CSS animations or lightweight canvas — must not impact Lighthouse Performance score; disable if it does

## Web Application Specific Requirements

### Project-Type Overview

Single-page application (SPA) serving as a personal developer portfolio. Client-side rendered with no backend — static assets served from a Docker container. Entirely presentational except for EmailJS integrations (visitor tracking and contact form).

### Technical Architecture Considerations

**Browser Support:**
- Modern evergreen browsers only: Chrome, Firefox, Safari, Edge (latest 2 versions)
- No IE11 or legacy browser support
- ES2022+ syntax used freely — no transpilation for legacy targets
- Modern CSS features (container queries, :has(), nesting) available if beneficial

**Responsive Design:**
- Mobile-first with breakpoints at 768px (mobile) and 1000px (tablet)
- Card grid: 3-column (desktop) → 2-column (tablet) → 1-column (mobile)
- Card 1 (background image) hidden on mobile — existing pattern preserved
- All expanded card content fully readable and navigable on mobile
- Touch-friendly interaction targets (minimum 44px tap targets)
- Mobile view compliance validated across common device widths (375px, 390px, 414px, 768px)

**SEO Strategy:**
- Basic-level SEO sufficient for portfolio discoverability
- Semantic HTML5 elements (main, section, article, nav, header)
- Meta tags: title, description, Open Graph (og:title, og:description, og:image)
- Canonical URL set to ws.wsapz.com
- Favicon and Apple touch icon
- robots.txt and sitemap.xml (single-page, minimal)
- Structured data (JSON-LD Person schema) — optional, beneficial for developer portfolio

### Implementation Considerations

- No server-side rendering — static SPA served via `serve`
- Environment variables build-time only (dotenv-webpack) — no runtime config
- All external service calls (EmailJS, ipapi.co, reCAPTCHA) are client-side
- No WebSocket or real-time features
- Asset loading: webpack code splitting + lazy loading for expanded card content
- Font loading: system fonts or preloaded web fonts to avoid FOIT/FOUT

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience-quality MVP — the portfolio must look and feel polished from day one since it represents professional capability. No "rough draft" release.
**Resource:** Solo developer (Warrick). Phasing accounts for sequential execution — no parallel workstreams.

### MVP Feature Set (Phase 1)

The MVP is split into ordered sub-phases. Each sub-phase produces a deployable state.

**Phase 1a: Foundation (Infrastructure & Stack)**
- Upgrade Node.js to 24+, React, TypeScript, Webpack, and all dependencies to latest stable
- Migrate from styled-components to modern styling approach (Tailwind CSS, CSS Modules, or zero-runtime CSS-in-JS)
- Set up CI/CD GitHub Actions workflow for Docker image build and push to private registry
- Update Dockerfile and docker-compose for new stack
- Update `.env` / `.env.example` with visitor tracking enable/disable toggle
- Dead code audit and cleanup (redundant assets, unused components, stale imports)
- Update project-context.md constraints to reflect new styling standard
- Update `./docs` for all foundation changes

**Phase 1b: Content & Redesign**
- Remove Reservations and Tic Tac Toe from portfolio data; delete unused screenshot assets
- Update portfolio project URLs (Money Manager → mm.wsapz.com)
- Capture and replace RaceDay race page screenshot
- Scan `/home/warrick/Dev` projects to confirm and update technical skills data
- Redesign "My Portfolio" section — richer project descriptions replacing hover tooltips
- Redesign "About Me" section — improved readability, visual hierarchy, scannable layout
- Update all portfolio project descriptions and tech stacks to current state
- Update `./docs` for all content changes

**Phase 1c: Visual Polish & Innovation**
- Skeleton loading with card grid shape during initial render
- Per-card unique expansion animations (slide, morph, unfold per card)
- Review and improve all main page hover effects
- Enhance Framer Motion animations across card transitions
- Ambient background motion (subtle gradient/particle effect)
- Skills-to-proof mapping (skills link to portfolio projects that demonstrate them)
- Leverage React features for performance (Suspense, lazy loading)
- Basic SEO (meta tags, Open Graph, canonical URL, semantic HTML)
- Accessibility pass (keyboard nav, focus management, contrast, alt text)
- Update `./docs` for all visual and innovation changes

**Core User Journeys Supported:**
- Sarah (Recruiter): Full journey — polished first impression, scannable About Me, detailed portfolio, contact form
- Marcus (Mobile): Full journey — responsive layout, fast load, readable on all breakpoints
- Warrick (Owner): Full journey — CI/CD pipeline, `.env` toggle, data-driven content updates

### Post-MVP Features

**Phase 2 (Growth):**
- Additional visual enhancements — refined neon glow effects, micro-interactions, subtle particle/gradient effects
- Performance optimisation pass based on real Lighthouse audit results
- Image format optimisation (WebP/AVIF with fallbacks)
- Structured data (JSON-LD Person schema)

**Phase 3 (Vision):**
- Portfolio becomes a living showcase trivially updated when new projects ship
- Animation quality rivals dedicated creative portfolio sites
- Site itself serves as a portfolio piece — implementation demonstrates described skills

### Risk Mitigation Strategy

**Technical Risks:**
- *Styling migration scope* — touching every component is the largest risk. Mitigate by completing migration in Phase 1a before any redesign work, so 1b and 1c work on the new styling foundation
- *Innovation features underdelivering* — per-card animations and ambient motion have fallbacks defined (uniform animation, disable ambient). Skills-to-proof can fall back to one-way linking
- *Dependency upgrade breakage* — upgrade all deps first in isolation before any feature work; verify build and runtime before proceeding

**Resource Risks:**
- Solo developer means sequential execution — if Phase 1a takes longer than expected, 1b and 1c shift but remain unaffected in scope
- If time-constrained: Phase 1c innovation features can be deferred to Phase 2 without compromising core portfolio value. Foundation (1a) and content (1b) deliver a complete, polished site on their own
- Minimum viable release: Phase 1a + 1b is a fully deployable, modernised portfolio even without innovation features

## Functional Requirements

### Card Grid & Navigation

- FR1: Visitor can view a card-based grid layout presenting all content sections on the landing page
- FR2: Visitor can click interactive cards (About Me, My Portfolio, Get In Touch) to expand them into full-screen overlays
- FR3: Visitor can close an expanded card to return to the grid view
- FR4: Visitor can see unique expansion animations per card (distinct animation style for each interactive card)
- FR5: Visitor can see skeleton loading placeholders that mirror the card grid shape during initial page load
- FR6: Visitor can see subtle ambient background motion on the landing page (gradient, particle, or colour pulse)
- FR7: Visitor can interact with hover effects on card previews that invite exploration

### About Me

- FR8: Visitor can view personal profile information (name, nationality, status, languages)
- FR9: Visitor can view professional experience with timeline presentation
- FR10: Visitor can view education history
- FR11: Visitor can view a skills inventory with skills linked to portfolio projects that demonstrate them (skills-to-proof mapping)
- FR12: Visitor can view dynamically calculated years of professional experience
- FR13: Visitor can navigate from a skill to the portfolio project(s) that evidence it
- FR14: Visitor can access GitHub profile via a direct link

### Portfolio

- FR15: Visitor can view portfolio projects with detailed descriptions including project purpose, tech stack, and key features
- FR16: Visitor can access live demo links for each portfolio project
- FR17: Visitor can access GitHub repository links for each portfolio project
- FR18: Visitor can view current, accurate screenshots for each portfolio project
- FR19: Visitor can navigate from a portfolio project back to related skills in the About Me section (proof-to-skills reverse mapping)

### Contact

- FR20: Visitor can submit a contact message via an integrated contact form
- FR21: Visitor can complete reCAPTCHA verification before submitting the contact form
- FR22: Visitor can view contact information (location, email, social links)

### Visitor Tracking

- FR23: System can detect and track visitor landings with comprehensive visitor intelligence
- FR24: System can capture IP address and geolocation data (country, city, region, ISP)
- FR25: System can capture browser and device fingerprint data (user agent, browser, OS, device type, screen resolution, viewport size)
- FR26: System can capture referral and traffic source data (referrer URL, UTM parameters if present)
- FR27: System can capture visitor behaviour signals (landing timestamp, timezone, preferred language, connection type)
- FR28: System can compile all captured visitor data into a comprehensive email notification
- FR29: System can rate-limit visitor tracking to prevent duplicate notifications within a configurable window
- FR30: Owner can enable or disable visitor tracking via environment variable configuration
- FR31: Visitor tracking is disabled by default in development environment

### Responsive & Accessible Experience

- FR32: Visitor can view and interact with the full site on mobile devices with an adapted layout
- FR33: Visitor can navigate all interactive elements using keyboard only
- FR34: Visitor can access all content with screen reader compatibility
- FR35: Visitor can view the site in a consistent dark theme across all sections and breakpoints

### CI/CD & Deployment

- FR36: System can automatically build a Docker image on merge to main branch
- FR37: System can push built Docker images to a private container registry
- FR38: Owner can deploy the site by pulling the latest image in Portainer
- FR39: System can inject environment variables at build time for all external service integrations

### Content Management

- FR40: Owner can add, update, or remove portfolio projects by editing data files
- FR41: Owner can update personal profile data (experience, skills, education) by editing data files
- FR42: Owner can update portfolio screenshots by replacing asset files

### SEO & Discoverability

- FR43: Search engines can discover and index the site via meta tags, Open Graph, and canonical URL
- FR44: Search engines can access a robots.txt and sitemap

## Non-Functional Requirements

### Performance

- First Contentful Paint < 1.5s on standard broadband connection
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Lighthouse Performance score ≥ 90
- Card expansion animations render at 60fps with no visible frame drops
- Ambient background motion runs without measurable main thread impact
- Production bundle size within 2.5MB per asset/entrypoint
- Skeleton-to-content transition completes without layout shift
- Vendor chunk splitting for cache efficiency
- Image assets optimised (WebP/AVIF where supported, responsive srcset)
- Docker image builds complete in under 5 minutes in CI/CD pipeline
- Production Docker image under 150MB

### Security

- No API keys, service IDs, or secrets committed to the repository
- Environment variables injected at build time only — no runtime exposure of secrets in client bundle
- reCAPTCHA validation required before contact form submission
- Visitor tracking data transmitted via EmailJS (HTTPS) — no plaintext transmission
- No personally identifiable information stored client-side beyond localStorage rate-limiting key
- Content Security Policy headers configured to restrict script and resource origins

### Accessibility

- Lighthouse Accessibility score ≥ 90
- WCAG AA colour contrast compliance across all dark theme elements
- All interactive elements reachable and operable via keyboard (Tab, Enter, Escape)
- Focus trapped within expanded card overlays; focus restored on close
- All images include descriptive alt text
- Semantic HTML structure (landmarks, headings, roles) throughout
- Mobile touch targets minimum 44x44px
- Site fully functional and readable across device widths 375px to 1920px+

### Integration

- EmailJS service degradation must not affect site usability �� visitor tracking and contact form fail silently with no visible error to visitor
- ipapi.co geolocation lookup failure must not block visitor tracking — system sends notification with available data
- reCAPTCHA service unavailability must not permanently block contact form — graceful error message displayed
- All external service calls include timeout handling (no indefinite pending states)
