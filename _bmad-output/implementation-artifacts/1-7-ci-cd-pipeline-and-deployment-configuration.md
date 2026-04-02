# Story 1.7: CI/CD Pipeline and Deployment Configuration

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As the site owner,
I want a GitHub Actions pipeline that automatically builds and pushes Docker images on merge to main,
so that deployment is automated with zero manual Docker build steps.

## Acceptance Criteria

1. `.github/workflows/ci.yml` exists with a workflow triggered on push/merge to the `main` branch.
2. The workflow steps are: checkout -> Docker login to `registry.wsapz.com` (username `warrick`, password from `REGISTRY_PASSWORD` secret) -> multi-stage Docker build -> push to `registry.wsapz.com/ws-portfolio-new:latest`.
3. No build args are passed for environment variables. Secrets remain runtime-injected, not build-time baked. This preserves NFR13 and NFR14.
4. The pipeline is structured to complete build + push in under 5 minutes (NFR11).
5. FR36 is satisfied: the Docker image builds automatically on merge to `main`.
6. FR37 is satisfied: the image is pushed to the private container registry.
7. FR38 is satisfied: the owner can pull the latest image in Portainer to deploy.
8. FR39 is satisfied via the existing runtime env path from Story 1.6: container env -> `docker-entrypoint.sh` -> `config.js` -> `window.__ENV` -> `src/config/env.ts`.
9. `CLAUDE.md` is updated to reflect the current architecture: Tailwind CSS, runtime env access through `src/config/env.ts`, renamed feature folders, Docker runtime config injection, and GitHub Actions CI/CD.
10. Foundation documentation in `docs/` is updated so it no longer describes styled-components, build-time-only env injection, or legacy `box2`-`box5` paths.
11. Local Docker builds must not rely on Docker Compose's default auto-generated image name `ws-portfolio-new-ws-portfolio`. `docker compose up` must build or reuse an explicit shorter image name defined in `docker-compose.yml`.
12. The GitHub Actions workflow must also use explicit image tagging rather than any implicit default naming. The pushed registry image name must remain intentional and shorter than the local default auto-generated name.

## Tasks / Subtasks

- [x] Task 1: Create the GitHub Actions workflow file and trigger model (AC: 1, 5)
  - [x] Add `.github/workflows/ci.yml`.
  - [x] Configure the workflow to run on `push` to `main`, which is the event produced when pull requests are merged.
  - [x] Keep the workflow single-purpose: build and publish the production Docker image. Do not add unrelated lint/test jobs in this story.
  - [x] Add top-level `concurrency` for the `main` branch so superseded image-publish runs cancel cleanly.

- [x] Task 2: Implement secure registry login and image publication (AC: 2, 3, 4, 6)
  - [x] Use official GitHub Actions/Docker actions for checkout, Buildx setup, registry login, and Docker build/push.
  - [x] Log in to `registry.wsapz.com` with username `warrick` and password `${{ secrets.REGISTRY_PASSWORD }}`.
  - [x] Build from the repository root using the existing multi-stage `Dockerfile`.
  - [x] Push exactly `registry.wsapz.com/ws-portfolio-new:latest`.
  - [x] Define the CI image tag explicitly in workflow configuration. Do not allow Docker to infer or synthesize the image name from repository or Compose defaults.
  - [x] Do not pass EmailJS, reCAPTCHA, API, or visitor-tracking values as `build-args`.
  - [x] Prefer GitHub Actions cache (`type=gha`) for Buildx if needed to keep runtimes within the NFR11 target.

- [x] Task 3: Preserve the Story 1.6 runtime-env deployment contract and enforce explicit image naming locally (AC: 3, 7, 8, 11, 12)
  - [x] Verify the workflow relies on the existing `Dockerfile` + `docker-entrypoint.sh` runtime injection path without modifying it back to build-time env injection.
  - [x] Confirm no workflow step rewrites `config.js`, injects public env vars during build, or bypasses `src/config/env.ts`.
  - [x] Update `docker-compose.yml` to set an explicit short local image name so `docker compose up` does not generate `ws-portfolio-new-ws-portfolio`.
  - [x] Choose a concise, stable local tag such as `ws-portfolio:local` or equivalent project-approved shorthand.
  - [x] Ensure deployment documentation still describes Portainer as the place where runtime env vars are supplied after the image is pulled.
  - [x] Align `stack.env.example` with the runtime-env contract from Story 1.6, including `ENABLE_VISITOR_TRACKING=false` by default.

- [x] Task 4: Refresh architecture and deployment documentation (AC: 9, 10)
  - [x] Update `CLAUDE.md` to reflect the current codebase, not the pre-migration styled-components architecture.
  - [x] Update `README.md` to describe the current stack, local setup, and Docker/GitHub Actions deployment model.
  - [x] Update the stale foundation docs in `docs/` that still reference styled-components, build-time-only env injection, or `box2`/`box3`/`box4`/`box5` paths.
  - [x] Update `NGINX-DEPLOYMENT.md` so its sample `docker-compose.yml`, Dockerfile notes, and Portainer instructions match the runtime-env strategy.
  - [x] Keep documentation changes scoped to Epic 1 foundation work. Do not pull Epic 4 content-refresh work forward just because some old URLs still exist in app data.

- [x] Task 5: Validate locally and document realistic verification boundaries (AC: 1-10)
  - [x] Run `npm run build` to confirm the repo still builds after workflow/docs changes.
  - [x] Run `docker compose build` to confirm the CI workflow is targeting a Docker build path that works locally.
  - [x] Manually inspect `.github/workflows/ci.yml` to confirm it has no public env `build-args` and uses `REGISTRY_PASSWORD` via the GitHub `secrets` context.
  - [x] Run targeted `rg` checks across docs to confirm stale references to styled-components, build-time-only env injection, and legacy feature folders are removed or intentionally constrained.
  - [x] If live GitHub validation is not possible from the local environment, record that limitation explicitly in the completion notes instead of claiming the remote workflow was executed.

## Dev Notes

### Critical Guardrails

- Story 1.6 already established the production env path: container env -> `docker-entrypoint.sh` -> `/dist/config.js` -> `window.__ENV` -> `src/config/env.ts`. Story 1.7 must preserve that architecture exactly.
- Do not reintroduce Docker `build-args` for `EMAILJS_*`, `RECAPTCHA_SITE_KEY`, `API_URL`, `DEBUG_VISITOR_TRACKING`, or `ENABLE_VISITOR_TRACKING`.
- Do not rely on Docker Compose's default project-service image naming. Local Compose image naming must be explicit and intentionally short.
- Scope is CI/CD and foundation-documentation correction. Avoid unnecessary app-code or UI changes unless validation proves a docs-related contract is wrong.
- `REGISTRY_PASSWORD` is the only GitHub secret defined by the architecture for this pipeline. Do not invent additional secrets unless the registry integration proves it is truly required.
- Use `push` on `main` as the authoritative deployment trigger. A merged pull request results in a push to `main`; no separate merge event handler is needed.
- Keep the image tag contract simple: `registry.wsapz.com/ws-portfolio-new:latest`. Do not introduce version-tagging or preview-image scope unless requested separately.
- The project intentionally has no automated unit/integration test framework. Verification is build-level, Docker-level, workflow-config review, and manual browser/runtime checks.

### Repo Facts Discovered During Story Preparation

- `.github/workflows/` currently has no CI workflow file for this project.
- `Dockerfile` is already a working multi-stage build using `node:24-alpine` for both build and runtime stages.
- `docker-compose.yml` already passes client-safe variables at runtime through `environment:` instead of `build.args`.
- `docker-compose.yml` currently has no explicit `image:` field, so local Compose builds can fall back to Docker's default generated image name pattern based on project + service.
- `docker-entrypoint.sh` writes `window.__ENV` from a whitelist of client-safe keys and then starts `serve`.
- `public/config.js` exists as a development stub so `/config.js` is available during `npm run dev`.
- `src/config/env.ts` already centralizes runtime/build env access and explicitly parses `DEBUG_VISITOR_TRACKING` and `ENABLE_VISITOR_TRACKING` as booleans.
- `stack.env.example` is out of sync with Story 1.6. It still omits `ENABLE_VISITOR_TRACKING` and includes settings that are not part of the documented client-safe runtime contract.
- Documentation drift is real and broad:
  - `CLAUDE.md`, `README.md`, `docs/index.md`, `docs/project-overview.md`, `docs/development-guide.md`, and `docs/deployment-guide.md` still describe styled-components or build-time-only env injection.
  - `docs/component-inventory.md` and `docs/source-tree-analysis.md` still reference `box2`-`box5` and `GlobalStyle.ts`.
  - `docs/index.md` and `docs/project-overview.md` still reference `warricksmith.com` instead of the planned `ws.wsapz.com` deployment target documented in the planning artifacts.

### Previous Story Intelligence

- Story 1.6 explicitly reserved `.github/workflows/ci.yml` for Story 1.7. Do not backfill Story 1.6 inside this story; build on it.
- Story 1.6 proved the runtime-env contract locally, including `config.js` generation, image-size viability, and `ENABLE_VISITOR_TRACKING` gating. Treat those outcomes as the baseline to preserve.
- Story 1.6 added `.env.example`, `public/config.js`, and tightened env typings. The Story 1.7 docs refresh must explain those changes instead of describing the old build-time-only model.
- Story 1.6 completion notes confirm `docker compose build` and `docker compose up` worked locally. The CI workflow should mirror that known-good Docker path rather than inventing a separate publish mechanism.

### Git Intelligence

- Recent commits are concentrated in Story 1.6:
  - `80748b1 chore: mark story 1.6 complete and update sprint tracking`
  - `a9d2f7a docs: document client-safe env vars in .env.example (story 1.6)`
  - `723db40 feat: gate visitor tracking behind ENABLE_VISITOR_TRACKING flag (story 1.6)`
  - `16e3bb0 feat: multi-stage Docker build with runtime env injection (story 1.6)`
- `git status --short` was clean during story preparation, so the dev agent can work without reconciling unrelated local edits.

### Latest Technical Verification

- GitHub's workflow syntax docs confirm `on.push.branches` is the correct branch filter for running a workflow only on pushes to `main`.
- GitHub's secrets docs confirm secrets should be passed via the `secrets` context, for example `${{ secrets.REGISTRY_PASSWORD }}`.
- GitHub's secrets docs also note secrets cannot be referenced directly in `if:` expressions. Avoid any workflow design that depends on `if: ${{ secrets.REGISTRY_PASSWORD != '' }}`.
- Docker's official GitHub Actions docs recommend using Docker's maintained actions for registry login and image builds.
- Current official Docker docs examples show these action majors as the up-to-date baseline during story preparation:
  - `actions/checkout@v6`
  - `docker/login-action@v4`
  - `docker/setup-buildx-action@v4`
  - `docker/build-push-action@v7`
- `docker/build-push-action` supports repository-context builds and direct push configuration, which matches this project's need to build the existing `Dockerfile` and publish a single image tag without introducing separate shell scripting.

### Architecture Compliance

- Architecture maps FR36-FR39 directly to:
  - `.github/workflows/ci.yml`
  - `Dockerfile`
  - `docker-compose.yml`
  - `docker-entrypoint.sh`
- Production deployment remains:
  - GitHub Actions builds and pushes `registry.wsapz.com/ws-portfolio-new:latest`
  - Portainer pulls that image
  - Portainer injects runtime env vars
  - `docker-entrypoint.sh` writes `config.js`
  - the browser reads `window.__ENV`
  - `src/config/env.ts` exposes those values to the app
- The architecture document's older phrase "`node:24-alpine` slim" is descriptive, not a valid tag. Preserve the working `node:24-alpine` runtime base already implemented in Story 1.6.
- The PRD still contains older build-time env wording for FR39, but Story 1.6 and the architecture supersede that with runtime injection. Follow the newer architecture, not the older PRD phrasing.

### File Structure Notes

- Must create:
  - `.github/workflows/ci.yml`
- Must update:
  - `docker-compose.yml` to set an explicit short local image name
- Expected documentation files to update:
  - `CLAUDE.md`
  - `README.md`
  - `docs/index.md`
  - `docs/project-overview.md`
  - `docs/architecture.md`
  - `docs/development-guide.md`
  - `docs/deployment-guide.md`
  - `docs/component-inventory.md`
  - `docs/source-tree-analysis.md`
  - `NGINX-DEPLOYMENT.md`
  - `stack.env.example`
- Likely no source-code changes are required in `src/` for this story. If the implementation touches application code, the change needs a concrete CI/CD or documentation justification.
- `docs/project-scan-report.json` appears generated and stale. Do not hand-edit it unless the underlying scan/generation process is rerun as part of this story.

### Testing Requirements

- No automated test framework. Manual and build-level verification only.
- Required checks for this story:
  - `npm run build`
  - `docker compose build`
  - `docker image ls --format '{{.Repository}}:{{.Tag}}' | rg "ws-portfolio"`
  - review `.github/workflows/ci.yml` for correct trigger, action usage, and secret handling
  - `rg -n "styled-components|build-time only|build time|box2|box3|box4|box5|GlobalStyle" README.md CLAUDE.md docs NGINX-DEPLOYMENT.md`
  - `rg -n "build-args|EMAILJS_|RECAPTCHA_SITE_KEY|ENABLE_VISITOR_TRACKING" .github/workflows/ci.yml`
  - verify the locally built image name is the explicit short tag, not `ws-portfolio-new-ws-portfolio`
- Optional but useful checks if tooling/access is available:
  - `gh workflow view ci` after the workflow is pushed
  - GitHub Actions run inspection after a test merge/push to `main`
- Do not claim the registry push or remote GitHub Actions run was verified unless it actually happened.

### Project Context Reference

- Follow the repo rule from `project-context.md`: no automated test files, verify changes manually.
- Preserve existing architecture conventions: components default export, utilities/config named exports, no new global state, no UI redesign inside infrastructure stories.
- Keep Docker/deployment work aligned with the current Node 24, Webpack, and runtime-env architecture already present in the repo.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic-1-Foundation--CICD-Pipeline]
- [Source: _bmad-output/planning-artifacts/epics.md#Story-17-CICD-Pipeline-and-Deployment-Configuration]
- [Source: _bmad-output/planning-artifacts/architecture.md#Infrastructure--Deployment]
- [Source: _bmad-output/planning-artifacts/architecture.md#Requirements-to-Structure-Mapping]
- [Source: _bmad-output/planning-artifacts/architecture.md#Development-Workflow-Integration]
- [Source: _bmad-output/planning-artifacts/prd.md]
- [Source: _bmad-output/planning-artifacts/implementation-readiness-report-2026-03-31.md]
- [Source: _bmad-output/implementation-artifacts/1-6-docker-build-and-runtime-environment.md]
- [Source: _bmad-output/project-context.md]
- [Source: CLAUDE.md]
- [Source: README.md]
- [Source: docs/index.md]
- [Source: docs/project-overview.md]
- [Source: docs/development-guide.md]
- [Source: docs/deployment-guide.md]
- [Source: docs/component-inventory.md]
- [Source: docs/source-tree-analysis.md]
- [Source: NGINX-DEPLOYMENT.md]
- [Source: Dockerfile]
- [Source: docker-compose.yml]
- [Source: docker-entrypoint.sh]
- [Source: src/config/env.ts]
- [Source: src/types/env.d.ts]
- [External: https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions]
- [External: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets]
- [External: https://docs.docker.com/build/ci/github-actions/]
- [External: https://github.com/docker/login-action]
- [External: https://github.com/docker/build-push-action]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `git log --oneline -5`
- `git status --short`
- `find .github -maxdepth 3 -type f | sort`
- `sed -n '1,260p' Dockerfile`
- `sed -n '1,260p' docker-compose.yml`
- `sed -n '1,240p' docker-entrypoint.sh`
- `sed -n '1,240p' src/config/env.ts`
- `sed -n '1,220p' src/types/env.d.ts`
- `sed -n '1,260p' .github/workflows/ci.yml`
- `docker image ls --format '{{.Repository}}:{{.Tag}}'`
- `sed -n '1,260p' CLAUDE.md`
- `sed -n '1,260p' README.md`
- `sed -n '1,260p' docs/index.md`
- `sed -n '1,260p' docs/project-overview.md`
- `sed -n '1,260p' docs/development-guide.md`
- `sed -n '1,260p' docs/deployment-guide.md`
- `sed -n '1,260p' docs/architecture.md`
- `sed -n '1,260p' docs/component-inventory.md`
- `sed -n '1,260p' docs/source-tree-analysis.md`
- `sed -n '1,260p' NGINX-DEPLOYMENT.md`
- `sed -n '1,260p' stack.env.example`
- `npm run build`
- `docker compose build`
- `rg -n "styled-components|build-time only|build time|box2|box3|box4|box5|GlobalStyle" README.md CLAUDE.md docs NGINX-DEPLOYMENT.md`
- `rg -n "build-args|EMAILJS_|RECAPTCHA_SITE_KEY|ENABLE_VISITOR_TRACKING|REGISTRY_PASSWORD" .github/workflows/ci.yml`

### Implementation Plan

- Create `.github/workflows/ci.yml` with a `push` to `main` trigger, Docker registry login, Buildx-backed image build, and push to `registry.wsapz.com/ws-portfolio-new:latest`.
- Keep the workflow aligned with Story 1.6 by using the existing Dockerfile, by passing no runtime app configuration as build args, and by setting explicit image names in both CI and local Compose.
- Refresh the foundation documentation so it accurately reflects Tailwind, runtime env injection, renamed feature folders, and Portainer-based deployment.
- Validate locally with `npm run build`, `docker compose build`, image-name inspection, and targeted documentation/workflow grep checks before handing off for review.

### Completion Notes List

- 2026-04-02: Added `.github/workflows/ci.yml` to publish `registry.wsapz.com/ws-portfolio-new:latest` on pushes to `main` using `actions/checkout@v6`, `docker/setup-buildx-action@v4`, `docker/login-action@v4`, and `docker/build-push-action@v7`.
- 2026-04-02: Preserved the Story 1.6 runtime-env path by keeping env delivery at container start (`docker-entrypoint.sh` -> `/dist/config.js` -> `window.__ENV` -> `src/config/env.ts`) and by avoiding workflow `build-args`.
- 2026-04-02: Updated `docker-compose.yml` to use explicit local image tag `ws-portfolio:local`; verified the built image name via `docker image ls --format '{{.Repository}}:{{.Tag}}' | rg "ws-portfolio"`.
- 2026-04-02: Refreshed `CLAUDE.md`, `README.md`, `docs/`, and `NGINX-DEPLOYMENT.md` to reflect Tailwind CSS, semantic component folders, runtime env injection, GitHub Actions CI/CD, and planned `ws.wsapz.com` deployment.
- 2026-04-02: Local validation passed with `npm run build` and `docker compose build`. `docker compose build` emitted a non-blocking Compose warning that `version` is obsolete, but the image build completed successfully.
- 2026-04-02: Remote GitHub Actions execution and registry push were not run from this local environment; workflow correctness was validated by file inspection and targeted grep checks only.
- 2026-04-02: Reviewed post-implementation findings against official Docker/GitHub sources. `docker/login-action@v4` and `docker/setup-buildx-action@v4` are valid current majors; added `timeout-minutes: 5` to the CI job to align more directly with NFR11.
- 2026-04-02: Review workflow completed. All patch findings were resolved or dismissed, deferred items remain tracked in `deferred-work.md`, and Story 1.7 was advanced to `done`.

### File List

- `.github/workflows/ci.yml`
- `docker-compose.yml`
- `stack.env.example`
- `CLAUDE.md`
- `README.md`
- `docs/index.md`
- `docs/project-overview.md`
- `docs/architecture.md`
- `docs/development-guide.md`
- `docs/deployment-guide.md`
- `docs/component-inventory.md`
- `docs/source-tree-analysis.md`
- `NGINX-DEPLOYMENT.md`
- `stack.env.example`

### Review Findings

- [x] [Review][Dismissed] `docker/login-action@v4` exists. Official `docker/login-action` release `v4.0.0` was published 2026-03-04, so no downgrade to `@v3` is warranted.
- [x] [Review][Dismissed] `docker/setup-buildx-action@v4` exists. Official `docker/setup-buildx-action` release `v4.0.0` was published 2026-03-05, so no downgrade to `@v3` is warranted.
- [x] [Review][Fixed] Added `timeout-minutes: 5` to the `build-and-publish` job in `.github/workflows/ci.yml` to enforce the NFR11 five-minute ceiling more directly.
- [x] [Review][Defer] `image:` + `build:` ordering surprise in docker-compose — deferred, pre-existing
- [x] [Review][Defer] `cancel-in-progress` can kill a working build — deferred, intentional tradeoff
- [x] [Review][Defer] Stale `styled-components` in `docs/project-scan-report.json` — deferred, story explicitly excludes hand-editing this generated file
- [x] [Review][Defer] `.env` not in `.dockerignore` — deferred, pre-existing
- [x] [Review][Defer] Deprecated `version: '3.8'` in docker-compose.yml — deferred, pre-existing
- [x] [Review][Defer] No health check in Dockerfile or docker-compose.yml — deferred, pre-existing, out of story scope

## Change Log

- `2026-04-02`: Story created and marked `ready-for-dev` with CI/CD, runtime-env, and documentation guardrails based on Epic 1 architecture and Story 1.6 outcomes.
- `2026-04-02`: Implemented CI publish workflow, explicit local Docker image naming, runtime-env deployment documentation refresh, and local validation for Story 1.7.
- `2026-04-02`: Reviewed follow-up findings for Story 1.7, dismissed two invalid Docker action-version claims against official upstream releases, and added CI job timeout enforcement.
- `2026-04-02`: Completed code review closure for Story 1.7 and marked the story `done`.
