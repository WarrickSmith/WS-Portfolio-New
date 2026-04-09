# Story 6.6: SEO and Discoverability

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a search engine crawler,
I want proper meta tags, structured data, and a sitemap,
so that the portfolio is discoverable and generates good preview cards when shared.

## Acceptance Criteria

1. The HTML source includes a descriptive `<title>`, `<meta name="description">`, and a canonical URL that consistently points to `https://ws.wsapz.com` (FR43).
2. Open Graph metadata is present in the static HTML source: `og:title`, `og:description`, `og:image`, `og:url`, and `og:type`.
3. `og:image` resolves to a stable, crawler-accessible asset and produces a credible preview card for professional sharing surfaces such as LinkedIn and Slack.
4. `robots.txt` is served from the site root, allows crawler access, and points to the sitemap (FR44).
5. `sitemap.xml` is served from the site root and contains the single canonical portfolio URL (FR44).
6. Story 6.4 semantics remain intact: the page still uses semantic HTML5 elements such as `<main>`, `<article>`, `<form>`, `<button>`, and `<label>`.
7. A favicon and Apple touch icon are present, and the deferred favicon MIME issue is fixed by changing `type="image/ico"` to `type="image/x-icon"`.
8. The CSP requirement is preserved at the deployment boundary: no attempt is made to fake app-level response headers inside the SPA, and proxy-level ownership is documented or explicitly verified.
9. No new secrets or non-client-safe credentials are introduced into `index.html`, root public assets, or the discoverability implementation path.
10. Deferred-item triage is completed before story close: the in-scope favicon MIME item is resolved here, and any remaining out-of-scope discoverability follow-up is explicitly assigned to Story 6.7.

## Tasks / Subtasks

- [x] Task 1: Add static head metadata for search and social crawlers (AC: 1, 2, 3, 7)
  - [x] Update `index.html` with a production-ready `<title>` and `<meta name="description">` for the single portfolio home page.
  - [x] Add `<link rel="canonical">` using the absolute preferred URL `https://ws.wsapz.com` and keep that exact value aligned with `og:url` and `sitemap.xml`.
  - [x] Add the required Open Graph tags in `index.html`: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
  - [x] Add the low-cost recommended Open Graph metadata that improves preview quality and clarity: `og:site_name` and `og:image:alt`.
  - [x] Fix the favicon MIME type in `index.html` from `image/ico` to `image/x-icon`.
  - [x] Add an Apple touch icon link in `index.html` that points at a stable file under `public/`.
  - [x] Keep metadata in the static HTML template. Do not add `react-helmet`, a runtime head manager, or a JS-only metadata path for canonical/Open Graph data.

- [x] Task 2: Add crawler-facing root files under `public/` so Webpack ships them unchanged (AC: 3, 4, 5, 7)
  - [x] Create `public/robots.txt` with an allow-all baseline for the public site and a `Sitemap:` line pointing to the absolute sitemap URL.
  - [x] Create `public/sitemap.xml` containing the single canonical portfolio URL.
  - [x] Add stable, crawler-fetchable discoverability assets in `public/` for:
    - [x] Apple touch icon
    - [x] Open Graph preview image
  - [x] Prefer stable root assets in `public/` over `src/assets` imports for metadata references so crawlers get deterministic, non-hashed URLs directly from the built HTML.
  - [x] Keep the Open Graph image visually credible for a recruiter-share context. Reuse existing portfolio imagery only if the crop and readability still work at share-preview sizes.

- [x] Task 3: Handle structured data deliberately, without fighting the static SPA architecture (Story goal support; PRD optional enhancement)
  - [x] Evaluate a minimal JSON-LD `Person` or profile-style schema block that matches the visible page content and the current one-page portfolio structure.
  - [x] If implemented, place the JSON-LD in a standards-compliant `application/ld+json` script block and keep the data aligned with the current visible profile facts.
  - [x] If JSON-LD would create duplication or drift that is not justified for a single static page, document the decision in completion notes and do not let optional structured data block story closure.
  - [x] Do not invent claims, social profiles, or contact data that are not already visible or explicitly maintained in the repo.

- [x] Task 4: Preserve deployment and security boundaries while closing the deferred SEO item (AC: 6, 8, 9, 10)
  - [x] Treat CSP as deployment infrastructure owned by Nginx Proxy Manager, not as something the SPA can implement with HTML tags.
  - [x] If repo documentation does not already capture the proxy-level CSP responsibility, add a short note to `NGINX-DEPLOYMENT.md` or `docs/deployment-guide.md` so deployment steps reflect the architecture.
  - [x] Reconfirm Story 6.4 semantic structure instead of rewriting component markup just because this story references semantic HTML.
  - [x] Resolve the deferred favicon MIME item in `_bmad-output/implementation-artifacts/deferred-work.md` once the implementation is complete.
  - [x] Do not widen Story 6.6 into environment-model changes for EmailJS/reCAPTCHA. This story must not refactor contact/visitor-tracking architecture unless a true secret leak is discovered.

- [x] Task 5: Manually verify discoverability output and non-regression behavior (AC: 1-10)
  - [x] Run `npm run build`.
  - [x] Run the built app or the dev server and fetch the rendered root HTML plus root assets directly.
  - [x] Verify `index.html` contains the final title, description, canonical URL, Open Graph tags, favicon, and Apple touch icon references in the built output.
  - [x] Verify `robots.txt`, `sitemap.xml`, and the Open Graph image return successfully from the site root.
  - [x] Verify the canonical URL, `og:url`, sitemap URL entry, and `robots.txt` sitemap pointer all use the same absolute preferred URL.
  - [x] Verify Story 6.4 semantics still hold in-browser: `<main>`, `<article>`, `<form>`, `<button>`, and `<label>` remain present and unchanged in purpose.
  - [x] Verify no new secrets were introduced into `index.html`, root public files, or the discoverability asset path.
  - [x] If an external preview/debug tool is available, run at least one share-preview sanity check. If not, verify the raw HTML head and the preview image fetch locally and document the limitation.

## Dev Notes

### Critical Story Guardrails

- Story 6.6 is discoverability polish for a single static portfolio route. Do not widen it into SSR, routing changes, content rewrites, or a new metadata framework.
- Canonical and Open Graph metadata must exist in the static HTML source. Inference from Google canonical guidance plus the Open Graph protocol: static head tags are the safest path for crawlers and unfurlers, whereas JS-only mutation is weaker and unnecessary here.
- `public/` is the correct home for root-level crawler files and stable metadata assets because `webpack.common.cjs` already copies that directory to the build output unchanged.
- Keep this story out of Story 6.4 territory. Semantic HTML is already implemented; here it is a regression check, not a markup rewrite project.
- CSP remains deployment-owned. The SPA cannot emit real response headers, so implementation should document or verify the proxy-level configuration rather than invent a fake in-app substitute.
- Do not introduce secrets into SEO metadata, icons, sitemap files, or public documentation. This story must not pull environment variables into the HTML head.

### Repo Facts Discovered During Story Preparation

- `index.html` currently contains only charset, favicon, viewport, page title, and `config.js`. It has no description, canonical URL, Open Graph tags, Apple touch icon, or structured data.
- `index.html` currently uses the wrong favicon MIME value: `type="image/ico"`.
- `public/` currently contains only `config.js` and `favicon.ico`. There is no `robots.txt`, `sitemap.xml`, Apple touch icon, or Open Graph preview asset.
- `webpack.common.cjs` already uses `CopyWebpackPlugin` to copy `public/` to the build root, so robots/sitemap/icon assets belong there rather than in `src/`.
- `src/main.tsx` only mounts the React app. Metadata ownership today is static-template territory, not application state or routing.
- `src/data/personalData.tsx` already holds visible profile fields such as full name, headline, location, and GitHub URL if the optional JSON-LD enhancement is chosen.
- `src/data/portfolioData.tsx` already uses `https://ws.wsapz.com` as the portfolio live-demo URL. That is the cleanest repo-grounded canonical target unless deployment deliberately standardizes a different root form.
- `NGINX-DEPLOYMENT.md` and the deployment docs already name `ws.wsapz.com` as the production domain, but they do not currently spell out the CSP responsibility.

### Architecture Compliance

- Keep the static SPA deployment model. No server-side rendering, no metadata service, and no framework migration.
- Put crawler-facing files and stable metadata assets in `public/`.
- Keep head metadata in `index.html` unless the optional JSON-LD choice clearly justifies a tiny JS injection path.
- Preserve Story 6.4 semantic structure and Story 6.5 performance constraints.
- Respect the environment boundary in `src/config/env.ts`: runtime config is for browser-side app behavior, not for SEO head generation.

### Likely Touch Points

- `index.html`
- `public/robots.txt` (new)
- `public/sitemap.xml` (new)
- `public/apple-touch-icon.png` or equivalent stable icon asset (new)
- `public/og-image.png` or equivalent stable preview asset (new)
- `public/favicon.ico` only if the underlying icon asset itself needs refresh
- `NGINX-DEPLOYMENT.md` and/or `docs/deployment-guide.md` if CSP ownership needs a deployment note
- `_bmad-output/implementation-artifacts/deferred-work.md` when closing the favicon MIME deferred item

### Likely No-Touch Files Unless a Blocker Is Found

- `src/components/*`
- `src/styles/main.css`
- `src/components/MainPage.tsx`
- `src/components/common/CardGrid.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/portfolio/ProjectCard.tsx`
- `src/config/env.ts`
- `src/hooks/useVisitorTracker.ts`
- `webpack.common.cjs` (verification-only unless public-file copying is unexpectedly broken)

### Project Structure Notes

- Root discoverability artifacts belong in `public/`, not in feature folders.
- If the Open Graph image reuses existing artwork, export or copy a stable version into `public/` rather than trying to reference hashed Webpack asset URLs from the HTML template.
- Keep deployment-only notes in deployment docs. Do not scatter CSP instructions across feature code or component files.

### Testing Requirements

- No automated testing framework. Do not add test files.
- Required verification:
  - `npm run build`
  - local app run (`npm run dev` or a static serve of `dist`)
  - direct inspection of built `index.html`, `robots.txt`, `sitemap.xml`, and metadata assets
- Manual checks:
  - the built HTML head contains the final title, description, canonical, and Open Graph fields
  - the Open Graph image is reachable and visually credible
  - the favicon and Apple touch icon links resolve correctly
  - semantic HTML from Story 6.4 still exists unchanged in role and intent
  - no new secrets or private credentials were introduced
  - deployment documentation clearly leaves CSP at the proxy-manager layer

### Cross-Story Intelligence

- Story 6.4 already completed semantic landmarks, article/form semantics, dialog labeling, and heading hierarchy. Story 6.6 should verify those semantics, not rebuild them.
- Story 6.5 already completed performance hardening. Avoid new JS metadata tooling or large discoverability assets that would create unnecessary follow-up work.
- `deferred-work.md` explicitly assigns the favicon MIME fix to Story 6.6. That is the known in-scope deferred item that must be closed here.
- Story 6.7 remains the catch-all for any residual discoverability follow-up that is real but not necessary to satisfy Story 6.6 acceptance criteria.

### Git Intelligence Summary

- Recent Epic 6 commits concentrated on accessibility and motion tuning. The SEO surface remains almost untouched, which means Story 6.6 should stay narrow and primarily focus on `index.html`, `public/`, and deployment notes.
- No recent changes suggest an existing metadata abstraction worth extending. The simplest repo-aligned path is still static HTML plus root public assets.

### Latest Technical Information

- Google Search may use a `meta description` when it describes the page better than page content alone, and recommends high-quality, page-specific descriptions for important URLs such as the home page. [Source: https://developers.google.com/search/docs/appearance/snippet]
- Google recommends specifying the canonical URL in the HTML source for client-rendered sites and using absolute rather than relative canonical URLs. [Source: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls]
- Google treats sitemaps as a supported crawl-discovery mechanism, even for simple sites, and `robots.txt` should not be used as a canonicalization mechanism. [Source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview] [Source: https://developers.google.com/search/docs/crawling-indexing/robots/intro] [Source: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls]
- Google favicon guidance supports `rel="icon"` plus Apple touch icon variants, requires the favicon and home page to be crawlable, and recommends a square icon larger than `48x48` even though `8x8` is the minimum. [Source: https://developers.google.com/search/docs/appearance/favicon-in-search]
- The Open Graph protocol defines `og:title`, `og:type`, `og:image`, and `og:url` as the basic required properties, with `og:description` generally recommended. If `og:image` is present, `og:image:alt` should also be specified. [Source: https://ogp.me/]
- Google structured data guidance says structured data provides explicit clues about page meaning and can be generated statically or with JavaScript, but it must match page content and be validated. Inference for this story: JSON-LD is a beneficial enhancement, not worth shipping if it would drift from the visible one-page portfolio content. [Source: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data] [Source: https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript]

### References

- `_bmad-output/planning-artifacts/epics.md` - Story 6.6 acceptance criteria and course-correction favicon item
- `_bmad-output/planning-artifacts/prd.md` - FR43, FR44, security requirements, and optional JSON-LD Person note
- `_bmad-output/planning-artifacts/architecture.md` - FR43-FR44 file mapping, CSP deployment ownership, and no-secrets boundary
- `_bmad-output/planning-artifacts/ux-design-specification.md` - shareable URL and preview-card expectation
- `_bmad-output/implementation-artifacts/6-4-screen-reader-compatibility-and-semantic-html.md`
- `_bmad-output/implementation-artifacts/6-5-reduced-motion-and-performance-validation.md`
- `_bmad-output/implementation-artifacts/deferred-work.md`
- `_bmad-output/project-context.md`
- `index.html`
- `webpack.common.cjs`
- `public/config.js`
- `src/main.tsx`
- `src/App.tsx`
- `src/data/personalData.tsx`
- `src/data/portfolioData.tsx`
- `src/config/env.ts`
- `docs/project-overview.md`
- `docs/deployment-guide.md`
- `docs/architecture.md`
- `NGINX-DEPLOYMENT.md`
- `https://developers.google.com/search/docs/appearance/snippet`
- `https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls`
- `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview`
- `https://developers.google.com/search/docs/crawling-indexing/robots/intro`
- `https://developers.google.com/search/docs/appearance/favicon-in-search`
- `https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`
- `https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript`
- `https://ogp.me/`

## Story Readiness

- Status set to `ready-for-dev`
- Sprint tracking must mark `6-6-seo-and-discoverability` as `ready-for-dev`
- Story package includes static-head ownership, root-public-file ownership, CSP boundary guidance, the favicon deferred-item closure path, and an explicit assumption that JSON-LD is optional rather than a blocker

## Open Questions / Assumptions

- Assumption: the canonical public URL for all discoverability artifacts is `https://ws.wsapz.com` and should stay identical across `canonical`, `og:url`, `robots.txt`, `sitemap.xml`, and any root-level documentation references.
- Assumption: JSON-LD `Person` schema is beneficial but not required for story closure because the PRD marks it optional and the epic acceptance criteria do not make it a blocker.
- Assumption: the "no API keys, service IDs, or secrets" intent for this story means "do not introduce secrets or new metadata exposures." The existing client-side architecture already relies on browser-safe EmailJS/reCAPTCHA identifiers through runtime config, and Story 6.6 should not widen scope into changing that model unless a real secret leak is found.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `date '+%Y-%m-%d %H:%M:%S %Z'`
- `git status --short`
- `git log --oneline -5`
- `sed -n '1,220p' _bmad/bmm/config.yaml`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/sprint-status.yaml`
- `sed -n '677,900p' _bmad-output/planning-artifacts/epics.md`
- `sed -n '1,260p' _bmad-output/implementation-artifacts/6-5-reduced-motion-and-performance-validation.md`
- `sed -n '170,210p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '335,375p' _bmad-output/planning-artifacts/prd.md`
- `sed -n '510,535p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '590,605p' _bmad-output/planning-artifacts/architecture.md`
- `sed -n '700,715p' _bmad-output/planning-artifacts/ux-design-specification.md`
- `sed -n '1,160p' index.html`
- `sed -n '1,220p' webpack.common.cjs`
- `sed -n '1,220p' src/main.tsx`
- `sed -n '1,240p' src/App.tsx`
- `sed -n '1,240p' src/components/namecard/IdentityCard.tsx`
- `sed -n '1,260p' src/data/personalData.tsx`
- `sed -n '1,220p' src/data/portfolioData.tsx`
- `sed -n '1,220p' src/config/env.ts`
- `sed -n '1,220p' public/config.js`
- `sed -n '1,240p' _bmad-output/implementation-artifacts/deferred-work.md`
- `ls -la public`
- `ls -la src/assets`
- `rg -n "Story 6\\.6|6\\.6|FR43|FR44|NFR18|NFR13|canonical|og:|robots|sitemap|favicon|apple-touch|structured data|JSON-LD" _bmad-output/planning-artifacts/*.md _bmad-output/implementation-artifacts/*.md index.html public src docs`
- `file public/favicon.ico src/assets/ws-portfolio.png src/assets/warrick.jpg src/assets/music-manager.png src/assets/raceday.png`
- `xxd -l 16 public/favicon.ico`
- `node -e "<generate public/apple-touch-icon.png>"`
- `node -e "<rewrite public/favicon.ico as ICO container>"`
- `cp src/assets/ws-portfolio.png public/og-image.png`
- `npm run build`
- `file public/favicon.ico dist/favicon.ico`
- `sed -n '1,220p' dist/index.html`
- `cat dist/robots.txt`
- `cat dist/sitemap.xml`
- `python3 -m http.server 4173 -d dist`
- `curl -s http://127.0.0.1:4173/`
- `curl -I -s http://127.0.0.1:4173/robots.txt`
- `curl -I -s http://127.0.0.1:4173/sitemap.xml`
- `curl -I -s http://127.0.0.1:4173/og-image.png`
- `curl -I -s http://127.0.0.1:4173/apple-touch-icon.png`
- `google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=10000 --dump-dom http://127.0.0.1:4173/`
- `rg -n "https://ws\\.wsapz\\.com|sitemap\\.xml|og:url|rel=\\\"canonical\\\"" index.html public/robots.txt public/sitemap.xml dist/index.html dist/robots.txt dist/sitemap.xml`
- `rg -n "<article|<form|<button|<label" src/components`
- `https://developers.google.com/search/docs/appearance/snippet`
- `https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls`
- `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview`
- `https://developers.google.com/search/docs/crawling-indexing/robots/intro`
- `https://developers.google.com/search/docs/appearance/favicon-in-search`
- `https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`
- `https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript`
- `https://ogp.me/`

### Implementation Plan

- Update the static HTML template with canonical, meta-description, and Open Graph metadata, while fixing the favicon MIME type and linking stable root icons.
- Add `robots.txt`, `sitemap.xml`, and a stable Open Graph preview asset under `public/` so they ship at the site root with no runtime logic.
- Verify discoverability output directly from built files, preserve Story 6.4 semantics, and document the CSP deployment boundary instead of trying to solve headers inside the SPA.

### Completion Notes List

- `2026-04-09 17:12:22 NZST` - Created Story 6.6 and marked sprint tracking `ready-for-dev` with repo-grounded guidance for static HTML metadata, root public crawler files, CSP deployment ownership, optional JSON-LD handling, and closure of the deferred favicon MIME issue.
- `2026-04-09 17:24:00 NZST` - Updated `index.html` with a production title, meta description, canonical URL, Open Graph metadata, corrected favicon MIME type, and a stable Apple touch icon link, while keeping discoverability metadata in the static HTML template.
- `2026-04-09 17:24:00 NZST` - Added root crawler files under `public/`: `robots.txt`, `sitemap.xml`, a stable `og-image.png` copied from the existing portfolio artwork, and a generated `180x180` `apple-touch-icon.png` for non-hashed crawler access.
- `2026-04-09 17:24:00 NZST` - Deliberately did not ship JSON-LD. For this single-route SPA, duplicating profile facts in a second static data block would add drift risk without being necessary for Story 6.6 acceptance criteria.
- `2026-04-09 17:24:00 NZST` - Documented CSP ownership at the Nginx Proxy Manager layer in deployment docs and resolved the deferred favicon MIME tracking entry without widening scope into runtime config or contact/visitor-tracking changes.
- `2026-04-09 17:24:00 NZST` - Validation passed with `npm run build`, direct inspection of `dist/index.html`, local static serving via `python3 -m http.server 4173 -d dist`, successful fetches for `/robots.txt`, `/sitemap.xml`, `/og-image.png`, and `/apple-touch-icon.png`, URL consistency checks across canonical/OG/sitemap/robots, and headless Chrome plus source-level semantic verification for Story 6.4 elements.
- `2026-04-09 17:24:00 NZST` - No external share-preview debugger was used in this environment. Local verification covered the raw head metadata and direct preview-image fetch instead.
- `2026-04-09 17:24:00 NZST` - Rebuilt `public/favicon.ico` as an actual ICO container so the new `image/x-icon` declaration now matches the shipped asset format. Re-ran `npm run build` and confirmed both `public/favicon.ico` and `dist/favicon.ico` identify as Windows icon resources.
- `2026-04-09 17:24:00 NZST` - Addressed the code-review patch finding by adding `og:image:width` and `og:image:height` for the existing `1280x720` preview asset. Kept the three remaining review items deferred because they are non-blocking enhancements rather than Story 6.6 acceptance gaps.
- `2026-04-09 18:11:26 NZST` - Completed the review workflow. All Story 6.6 review findings are now either resolved in code or explicitly deferred to later work, so the story advanced from `review` to `done` and sprint tracking was synced.

### Change Log

- `2026-04-09` - Implemented Story 6.6 static discoverability metadata, root crawler files, stable preview/icon assets, proxy-layer CSP documentation, and deferred favicon MIME cleanup.
- `2026-04-09` - Addressed the Story 6.6 code-review patch by adding Open Graph image dimension metadata.
- `2026-04-09` - Completed the Story 6.6 review workflow and advanced tracking from `review` to `done`.

### File List

- `_bmad-output/implementation-artifacts/6-6-seo-and-discoverability.md`
- `_bmad-output/implementation-artifacts/deferred-work.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `NGINX-DEPLOYMENT.md`
- `docs/deployment-guide.md`
- `index.html`
- `public/apple-touch-icon.png`
- `public/favicon.ico`
- `public/og-image.png`
- `public/robots.txt`
- `public/sitemap.xml`

### Review Findings

- [x] [Review][Patch] og:image missing width/height meta tags [index.html] — valid and fixed by adding `og:image:width=1280` and `og:image:height=720` alongside the existing `og:image` metadata.
- [x] [Review][Defer] No Twitter Card meta tags [index.html] — deferred, not required by spec. Twitter/X falls back to OG tags for most card types. Potential Story 6.7 enhancement.
- [x] [Review][Defer] og-image.png is 367 KB uncompressed PNG [public/og-image.png] — deferred, functional but large. Could be significantly smaller as optimized PNG or JPEG. Not an AC violation.
- [x] [Review][Defer] favicon.ico only 32x32, no multi-resolution [public/favicon.ico] — deferred, pre-existing. Modern browsers benefit from 16x16/32x32/48x48/64x64 variants. Story only required MIME fix.
