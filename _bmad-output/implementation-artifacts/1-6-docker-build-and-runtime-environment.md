# Story 1.6: Docker Build and Runtime Environment

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As the site owner,
I want a multi-stage Docker build with runtime environment variable injection,
so that a single Docker image works across all environments without baking secrets into the build.

## Acceptance Criteria

1. `Dockerfile` uses a multi-stage build. Stage 1 uses `node:24-alpine` to install dependencies and run `npm run build`. Stage 2 uses a valid official Node 24 runtime variant sized for production, copies `/dist`, installs `serve` only, and copies `docker-entrypoint.sh`. Do not use the invalid tag form `node:24-alpine slim`.
2. `docker-entrypoint.sh` reads the container environment and generates the served `config.js` payload containing `window.__ENV = { ... }` before starting `serve`.
3. `index.html` includes `<script src="/config.js"></script>` before the webpack app bundles load.
4. `docker-compose.yml` maps port `3000:3000` and passes all client-safe environment variables at runtime: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_CONTACT_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `RECAPTCHA_SITE_KEY`, `DEBUG_VISITOR_TRACKING`, `API_URL`, `ENABLE_VISITOR_TRACKING`.
5. `.env.example` documents all required environment variables and their intended usage.
6. `ENABLE_VISITOR_TRACKING` defaults to `false`, and visitor tracking is disabled unless the effective env value is explicitly enabled.
7. `docker compose build` succeeds and the final runtime image is under `150MB`.
8. `docker compose up` starts the application and serves the site correctly on port `3000`.
9. Environment variables provided by the container are reachable via `src/config/env.ts` at runtime.

## Tasks / Subtasks

- [x] Task 1: Replace the current build-time Docker pattern with a lean multi-stage runtime image (AC: 1, 7, 8)
  - [x] Rewrite `Dockerfile` with named stages such as `build` and `runtime`.
  - [x] Keep Stage 1 on `node:24-alpine` and run the production build there.
  - [x] Use one valid official runtime tag for Stage 2. Default to `node:24-alpine` unless a real runtime issue requires `node:24-slim`.
  - [x] Remove the current app-config `ARG` and `ENV` wiring from `Dockerfile`. Story 1.6 must stop baking app env vars into the image.
  - [x] Copy only the built output and the entrypoint script into the runtime image. Do not copy the full source tree into the final stage.
  - [x] Install `serve` only in the runtime stage and keep the runtime container on port `3000`.
  - [x] Ensure `docker-entrypoint.sh` is executable in the final image.

- [x] Task 2: Implement runtime config generation and template wiring (AC: 2, 3, 4, 5, 9)
  - [x] Create `docker-entrypoint.sh` as a POSIX `sh` script. Alpine compatibility matters here; do not rely on Bash-only syntax.
  - [x] Generate `config.js` into the served `dist` root so it is reachable at `/config.js`.
  - [x] Whitelist only the eight client-safe variables named in AC4 when generating `window.__ENV`. Do not dump the full container environment.
  - [x] Escape serialized env values safely for JavaScript output so quotes and backslashes do not corrupt `config.js`.
  - [x] Update the source `index.html` template, not built `dist/index.html`, so HtmlWebpackPlugin emits the config script tag ahead of the injected bundles.
  - [x] Update `docker-compose.yml` to use runtime `environment:` entries instead of the current `build.args` app-config pattern.
  - [x] Create `.env.example` with placeholders or defaults for every required key. `ENABLE_VISITOR_TRACKING=false` must be the documented default.

- [x] Task 3: Make the runtime env path real in application code instead of nominal (AC: 6, 9)
  - [x] Verify `src/config/env.ts` reads runtime values when `config.js` loads before the app bundle.
  - [x] If runtime verification shows the current exported constants resolve too early, refactor `env.ts` to lazy accessors or an equivalent getter-based pattern. If the current contract works reliably, keep the existing import surface stable.
  - [x] Parse feature-flag env values explicitly. Do not rely on raw string truthiness for `ENABLE_VISITOR_TRACKING` or `DEBUG_VISITOR_TRACKING`.
  - [x] Gate visitor tracking with `ENABLE_VISITOR_TRACKING` so the site performs no visitor-tracking side effects unless the flag is enabled.
  - [x] Tighten `src/types/env.d.ts` to reflect that app env values may be absent at runtime.
  - [x] Touch `ContactForm.tsx` and `useVisitorTracker.ts` only as needed to preserve the `env.ts` single-gateway pattern and graceful missing-config behavior.

- [x] Task 4: Verify the Docker path end to end without breaking the existing dev workflow (AC: 6, 7, 8, 9)
  - [x] Run `docker compose build` and confirm the final image size is below `150MB`.
  - [x] Run `docker compose up` and confirm the site loads successfully at `http://localhost:3000`.
  - [x] Verify `http://localhost:3000/config.js` is served and contains the expected whitelisted keys.
  - [x] Verify `window.__ENV` is populated in the browser before the React bundle executes.
  - [x] With `ENABLE_VISITOR_TRACKING=false`, confirm initial page load does not trigger visitor-tracking network calls.
  - [x] With `ENABLE_VISITOR_TRACKING=true`, confirm the runtime path can enable tracking again.
  - [x] Run `npm run dev` after the Docker changes and confirm the existing `dotenv-webpack` development workflow still works.

## Dev Notes

### Critical Guardrails

- This story replaces the current build-time app-config injection pattern in `Dockerfile` and `docker-compose.yml`. Do not preserve `build.args` for the app env vars.
- `src/config/env.ts` remains the sole gateway to application environment values. Do not introduce React context, global state, or direct `window.__ENV` reads in feature code.
- Only the client-safe public keys listed in AC4 belong in `config.js`. Never expose registry credentials, container secrets, or unrelated process env vars.
- `ENABLE_VISITOR_TRACKING=false` must disable the actual runtime behavior, not just document an intended default.
- `index.html` is a HtmlWebpackPlugin template. Edit the source template so the generated bundle ordering stays correct.
- Keep `docker-entrypoint.sh` POSIX-compatible. Alpine images do not guarantee `bash`.
- Story 1.7 owns CI/CD workflow creation. Do not expand this story into `.github/workflows/ci.yml`.
- Preserve the existing UI and Tailwind migration work from Stories 1.3-1.5. This is infrastructure and env-path work, not a frontend redesign story.

### Architecture Compliance

- The approved production path is: container env -> `docker-entrypoint.sh` -> `config.js` -> `window.__ENV` -> `src/config/env.ts` -> feature code.
- The approved development path remains: `.env` -> `dotenv-webpack` -> `process.env` -> `src/config/env.ts`.
- `src/config/env.ts` is the only sanctioned import point for EmailJS, reCAPTCHA, API, and visitor-tracking flags.
- Runtime config generation must keep the SPA static. Do not introduce a backend service, SSR layer, or API proxy for this story.

### Repo Facts Discovered During Story Preparation

- `Dockerfile` is currently single-stage, copies the entire repo, builds with app-config `ARG`/`ENV`, and installs `serve` globally in the same image.
- `docker-compose.yml` currently passes app config only through `build.args`; it does not define service-level runtime `environment:`.
- `index.html` currently has no `/config.js` script tag.
- `.env.example` does not exist in the repo today.
- `webpack.common.cjs` uses `HtmlWebpackPlugin` with `./index.html` as the template, so script ordering must be handled in the template source.
- `src/config/env.ts` already centralizes app env access with `window.__ENV ?? process.env ?? ''`.
- `ENABLE_VISITOR_TRACKING` and `DEBUG_VISITOR_TRACKING` already exist in `env.ts` and `env.d.ts`, but no current code path enforces the feature flag.
- `VisitorTracker` is mounted unconditionally from `src/App.tsx`.

### Previous Story Intelligence

- Story 1.5 completed the Tailwind cutover and dead-code cleanup. Keep Story 1.6 isolated to Docker/runtime config plus only the code changes required to make env-driven behavior work.
- Story 1.5 review explicitly deferred Story 1.6 work around:
  - the Docker runtime `serve` installation strategy
  - verifying whether `env.ts` constants need lazy accessors once `window.__ENV` is active
  - tightening env typing now that runtime injection is real
- Recent implementation work reinforced the `src/config/env.ts` import pattern. Do not regress back to direct `process.env` usage in app features.

### Git Intelligence

- Recent commits are concentrated in Story 1.5 cleanup and one focused bug fix:
  - `5b81271 chore: mark story 1.5 complete and update sprint tracking`
  - `83e852c fix: prevent CloseButton click from propagating to parent Card (story 1.5)`
  - `887e625 refactor: remove stale portfolio entries and dead assets (story 1.5)`
  - `3f3e738 refactor: replace legacy --fs-* variables with semantic Tailwind text tokens (story 1.5)`
  - `8ffa931 refactor: migrate BulletPoints from styled-components to Tailwind + Framer Motion (story 1.5)`
- `git status --short` is currently clean. The dev agent can work without merging around unrelated local edits.

### Latest Technical Verification

- Official Docker guidance for multi-stage builds is to use multiple `FROM` stages and copy only the required artifacts into the final stage. Use named stages so future reordering does not break `COPY --from=...`.
- Official Node Docker image docs list `node:alpine` and `node:slim` as separate variants. That means the epic/architecture wording `node:24-alpine slim` is invalid shorthand, not a usable tag. Implement with one valid runtime base.
- Official Docker Compose guidance says container env vars are made available through explicit service `environment:` or `env_file` configuration. For this project, use service `environment:` rather than continuing the current build-arg pattern.
- Implementation-readiness review explicitly states that the PRD's older "build-time env vars only" wording is superseded by the architecture decision for runtime injection via `docker-entrypoint.sh` and `config.js`.

### Testing Requirements

- No automated test framework. Follow the project rule: manual verification only.
- Required checks for this story:
  - `npm run build`
  - `npm run dev`
  - `docker compose build`
  - `docker compose up`
  - browser verification at `http://localhost:3000`
  - direct check of `http://localhost:3000/config.js`
  - image-size verification for the final runtime image
- For visitor tracking verification, use browser network inspection:
  - with `ENABLE_VISITOR_TRACKING=false`, there should be no startup requests to the visitor-tracking path
  - with `ENABLE_VISITOR_TRACKING=true`, the tracking path may run again

### Project Structure Notes

- Expected files to touch:
  - `Dockerfile`
  - `docker-compose.yml`
  - `docker-entrypoint.sh` (new)
  - `index.html`
  - `.env.example` (new)
  - `src/config/env.ts`
  - `src/types/env.d.ts`
  - `src/App.tsx` and/or `src/components/VisitorTracker.tsx`
  - `src/hooks/useVisitorTracker.ts`
  - `src/components/contact/ContactForm.tsx` only if the env contract requires it
- Files that should stay out of scope for Story 1.6:
  - `.github/workflows/ci.yml`
  - Epic 2+ feature files
  - broad documentation refresh outside `.env.example`
- Avoid unnecessary package-manifest churn. The runtime image can install `serve` directly in the runtime stage; do not add unrelated dependencies unless implementation proves it is required.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic-1-Foundation--CICD-Pipeline]
- [Source: _bmad-output/planning-artifacts/epics.md#Story-16-Docker-Build-and-Runtime-Environment]
- [Source: _bmad-output/planning-artifacts/epics.md#Story-52-Visitor-Tracking-and-Notification-System]
- [Source: _bmad-output/planning-artifacts/architecture.md#Infrastructure--Deployment]
- [Source: _bmad-output/planning-artifacts/architecture.md#Development-Workflow-Integration]
- [Source: _bmad-output/planning-artifacts/architecture.md#Requirements-to-Structure-Mapping]
- [Source: _bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md]
- [Source: _bmad-output/implementation-artifacts/1-5-styled-components-removal-and-dead-code-cleanup.md]
- [Source: _bmad-output/implementation-artifacts/deferred-work.md]
- [Source: _bmad-output/project-context.md]
- [External: https://docs.docker.com/build/building/multi-stage/]
- [External: https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/]
- [External: https://github.com/nodejs/docker-node]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `git log --oneline -5`
- `git status --short`
- `rg -n "Story 1\\.6|1\\.6|Epic 1" _bmad-output docs -g '*.md'`
- `rg -n "docker|entrypoint|config.js|window\\.__ENV|ENABLE_VISITOR_TRACKING|API_URL|env.ts|runtime" _bmad-output/planning-artifacts/*.md`
- `rg -n "process\\.env|window\\.__ENV" src index.html Dockerfile docker-compose.yml`
- `sed -n '1,260p' Dockerfile`
- `sed -n '1,260p' docker-compose.yml`
- `sed -n '1,220p' index.html`
- `sed -n '1,260p' src/config/env.ts`
- `sed -n '1,260p' src/types/env.d.ts`
- `sed -n '1,260p' src/components/contact/ContactForm.tsx`
- `sed -n '1,260p' src/hooks/useVisitorTracker.ts`
- `sed -n '1,260p' src/components/VisitorTracker.tsx`
- `sed -n '1,260p' webpack.common.cjs`
- `npm run build`
- `sed -n '1,220p' dist/index.html`
- `sed -n '1,40p' dist/config.js`
- `docker compose build`
- `docker image inspect ws-portfolio-new-ws-portfolio:latest --format '{{.Size}}'`
- `docker compose up -d --force-recreate`
- `curl -sSf http://localhost:3000/config.js`
- `google-chrome --headless --disable-gpu --virtual-time-budget=7000 --log-net-log=/tmp/ws-netlog-true.json --dump-dom http://localhost:3000`
- `google-chrome --headless --disable-gpu --virtual-time-budget=5000 --log-net-log=/tmp/ws-netlog-false.json --dump-dom http://localhost:3000`
- `docker compose down`
- `npm run dev`
- `curl -sSf http://localhost:3000/`
- `curl -sSf http://localhost:3000/config.js`

### Implementation Plan

- Replace the single-stage Dockerfile and build-arg env pattern with a named multi-stage build plus runtime entrypoint generation.
- Create the runtime config handoff (`docker-entrypoint.sh` + `index.html` script tag + compose runtime envs + `.env.example`).
- Make `ENABLE_VISITOR_TRACKING` a real feature gate and tighten the env gateway only where runtime verification requires it.
- Validate Docker runtime behavior, image size, served `config.js`, and preservation of the existing local dev workflow.

### Completion Notes List

- Replaced the single-stage Docker image with named `build` and `runtime` stages, removed app-config build args, and kept the final runtime image on `node:24-alpine` with `serve` only.
- Added `docker-entrypoint.sh` runtime config generation, wired `/config.js` into the HtmlWebpack template, moved compose env delivery to service `environment:`, and documented the client-safe keys in `.env.example`.
- Hardened `src/config/env.ts` with an explicit runtime/build gateway, parsed feature flags to booleans, tightened env typings, and gated visitor tracking so startup side effects only occur when `ENABLE_VISITOR_TRACKING=true`.
- Added `public/config.js` as a development stub so `npm run dev` continues to serve `/config.js` without a 404 while Docker runtime injection still overwrites the file in the container.
- Reviewed post-CR follow-up items: kept the `VisitorTracker` effect on `[trackVisitor]` because it is the correct exhaustive-deps form and `[]` would not change Strict Mode double-invocation behavior; ensured `public/config.js` is included in git tracking for the next commit.
- Manual validation only, per project rules:
  - `npm run build` passed.
  - `docker compose build` passed.
  - Final runtime image size verified at `60685985` bytes.
  - `docker compose up` served the site and `/config.js` on `http://localhost:3000`.
  - Headless browser verification confirmed no `ipapi.co` request when `ENABLE_VISITOR_TRACKING=false`.
  - Recreating the same image with runtime-only `ENABLE_VISITOR_TRACKING=true` produced `ipapi.co/json/` requests in the browser netlog, confirming the runtime `config.js -> window.__ENV -> env.ts` path is live.
  - `npm run dev` served the app and the stub `/config.js` successfully.

### File List

- `.env.example`
- `Dockerfile`
- `docker-compose.yml`
- `docker-entrypoint.sh`
- `index.html`
- `public/config.js`
- `src/components/VisitorTracker.tsx`
- `src/config/env.ts`
- `src/hooks/useVisitorTracker.ts`
- `src/types/env.d.ts`

### Review Findings

- [x] [Review][Dismissed] `trackVisitor` dependency array changed from `[]` to `[trackVisitor]` in VisitorTracker.tsx:22 — no code change. `[trackVisitor]` is the correct exhaustive-deps form for the current callback chain, and switching back to `[]` would intentionally suppress dependency tracking while still double-firing in React Strict Mode development.
- [x] [Review][Patch] `public/config.js` is untracked — resolved by adding [`public/config.js`] to git tracking so the dev `/config.js` stub is not omitted from the next commit.
- [x] [Review][Defer] Debug logging effect fires multiple times per tracking cycle [`src/components/VisitorTracker.tsx`:24-35] — deferred, dev-only, gated behind `DEBUG_VISITOR_TRACKING`
- [x] [Review][Defer] `serve@14.2.5` pinned without justification comment [`Dockerfile`:14] — deferred, pinning is good practice
- [x] [Review][Defer] No build-output validation in Dockerfile [`Dockerfile`:20] — deferred, pre-existing pattern, `npm run build` failure stops Docker build
- [x] [Review][Defer] `npm start` without `.env` silently produces non-functional features — deferred, pre-existing, documented in `.env.example`
- [x] [Review][Defer] `.env` has `EMAILJS_PUBLIC_KEY` commented out — deferred, pre-existing local config issue

### Resolved Deferred Items (from earlier reviews, addressed by Story 1.6)

- `env.d.ts` types ProcessEnv vars as non-optional string → **Resolved**: all fields now optional
- AC7 constants vs accessor functions → **Resolved**: `readEnv()` reads `window.__ENV` at call time; module-level constants work correctly with runtime injection
- ContactForm unsafe `process.env` access → **Resolved**: ContactForm imports from `env.ts` gateway with empty-string guards
- `serve` installed globally in Docker → **Partially resolved**: still global but pinned to `serve@14.2.5`

### Change Log

- 2026-04-01: Reviewed post-CR findings — dismissed the `trackVisitor` dependency-array note as non-actionable and added `public/config.js` to git tracking.
- 2026-04-01: Code review completed — 1 decision-needed, 1 patch, 5 deferred, 8 dismissed.
- 2026-04-01: Implemented Story 1.6 runtime Docker environment delivery, env-gateway hardening, visitor-tracking flag gating, and full manual Docker/dev verification.
