# Story 1.1: Upgrade Dependencies and Runtime

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As the site owner,
I want all dependencies upgraded to latest stable versions on Node.js 24,
so that the codebase is on a modern, supported stack before any migration or feature work begins.

## Acceptance Criteria

1. Given the existing project running on Node.js 22.x with TypeScript 5.9.2, React 19.1.0, and current dependency versions, when all dependencies are upgraded, then Node.js minimum is 24.x LTS, TypeScript is 6.0, React is 19.2.x, Framer Motion is 12.38.x, Webpack is latest 5.x, and all remaining dependencies are at latest stable versions.
2. `npm run dev` starts the development server successfully on port 3000.
3. `npm run build` completes a production build without errors.
4. The existing site renders correctly in the browser with no visual regressions.
5. `package.json` `engines` specifies Node.js `>=24`.
6. `tsconfig.json` is updated for TypeScript 6.0 settings.

## Tasks / Subtasks

- [x] Audit current dependency baseline and choose upgrade targets for this story only. (AC: 1)
- [x] Record the starting versions from `package.json` and confirm the runtime baseline from current local tooling.
  - [x] Upgrade runtime and package targets to the current stable line: Node 24 LTS, TypeScript 6.0.x, React 19.2.x, Framer Motion 12.38.x, latest Webpack 5.x, plus compatible supporting packages.
  - [x] Keep scope disciplined: do not introduce Tailwind/PostCSS/styled-components removal work here; that belongs to Story 1.2+.
- [x] Update package manifests and lockfile. (AC: 1, 5)
  - [x] Add or update `package.json` `engines.node` to `>=24`.
  - [x] Refresh any package versions whose compatibility is required by the upgraded core stack.
  - [x] Preserve existing script names and port `3000`.
- [x] Update TypeScript configuration for 6.0 compatibility. (AC: 1, 6)
  - [x] Review `tsconfig.json` against TypeScript 6.0 defaults and breaking changes.
  - [x] Keep explicit `"types": ["node"]` because TypeScript 6.0 no longer auto-enumerates all `@types` packages by default.
  - [x] Verify whether `rootDir` should be made explicit to avoid TS 6 output path drift; add it only if the build output shows a changed emit layout.
- [x] Run dependency install and resolve upgrade fallout. (AC: 1, 2, 3)
  - [x] Fix any compile-time, bundler, or type definition incompatibilities introduced by the upgrades.
  - [x] Prefer minimal code changes that preserve current behaviour; avoid opportunistic refactors.
- [x] Verify runtime behaviour manually. (AC: 2, 3, 4)
  - [x] Run `npm run dev` and confirm the dev server starts on port `3000`.
  - [x] Run `npm run build` and confirm production build success.
  - [x] Open the site in the browser and confirm no visual regressions in the existing card-grid experience.
  - [x] Check browser console for new warnings or runtime errors introduced by the upgrades.
- [x] Update project documentation only if the implemented versions differ from current project docs. (AC: 1)
  - [x] If actual stable versions exceed the versions named in planning docs, capture that in completion notes so later stories inherit the real baseline.

## Dev Notes

- This is the foundation story for Epic 1. Keep it narrow: modernize the runtime and package baseline without starting the Tailwind migration, folder renames, or Docker/runtime-env injection work yet. [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/epics.md#Story-11-Upgrade-Dependencies-and-Runtime]
- Architecture sequence matters. Tailwind integration, `cn()` helper creation, env helper creation, and component migration all occur after this story. Do not pull those changes forward into 1.1. [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/architecture.md#Decision-Impact-Analysis]
- The repo is a brownfield React + TypeScript + Webpack application. Preserve the existing build system and scripts. No bundler migration. [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/architecture.md#Selected-Approach-In-Place-Migration]
- Manual verification only. Do not add Jest, Vitest, or any automated test framework. [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/project-context.md#Testing-Rules]
- The project context currently lists React `19.2.3`, TypeScript `5.9.2`, Webpack `5.101.0`, Framer Motion `12.23.12`, and Node.js `22.x Alpine`; this story is expected to advance those baselines. [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/project-context.md#Technology-Stack--Versions]
- Keep local state architecture, component export conventions, and styled-components usage untouched in this story except where dependency compatibility forces a mechanical change. The styling migration belongs later. [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/project-context.md#Critical-Dont-Miss-Rules]

### Current Repo Baseline

- `package.json` currently has no `engines` field and uses `react`/`react-dom` `^19.2.3`, `typescript` `^5.9.2`, `framer-motion` `^12.23.12`, `webpack` `^5.101.0`, `webpack-cli` `^5.1.4`, and `webpack-dev-server` `^5.2.0`.
- `tsconfig.json` already sets `target` `ES2022`, `module` `ESNext`, strict mode, `jsx` `react-jsx`, and explicit `"types": ["node"]`.
- The dev server is already configured for port `3000` in `webpack.dev.cjs`.
- Production performance limits are already set in `webpack.prod.cjs` with `maxAssetSize` and `maxEntrypointSize` at `2500000`.

### Latest Version Intelligence

- Current npm registry checks performed on 2026-03-31 indicate:
  - Node 24 LTS line latest release: `v24.14.1` (`Krypton`)
  - `typescript`: `6.0.2`
  - `react`: `19.2.4`
  - `framer-motion`: `12.38.0`
  - `webpack`: `5.105.4`
  - `webpack-cli`: `7.0.2`
  - `webpack-dev-server`: `5.2.3`
- Use these as the default target versions unless install-time compatibility constraints force a narrower patch/minor target.
- The planning artifacts mention React `19.2.x` and Framer Motion `12.38.x`, which still align. They mention TypeScript `6.0`, which is now a stable released line, not a preview.

### TypeScript 6.0 Guardrails

- TypeScript 6.0 changes defaults around `types` and `rootDir`. This repo already explicitly sets `"types": ["node"]`, which should remain.
- TS 6.0 may require explicitly setting `rootDir` if emitted output starts nesting under `dist/src`; verify before changing.
- Avoid introducing deprecated TypeScript options just to silence issues. Fix underlying config or code where feasible.

### Project Structure Notes

- Expected primary touch points for this story:
  - `package.json`
  - `package-lock.json`
  - `tsconfig.json`
  - `webpack.common.cjs`
  - `webpack.dev.cjs`
  - `webpack.prod.cjs`
  - `Dockerfile` only if local/runtime Node alignment is required for build success in this story
  - `.nvmrc` only if one already exists or the team wants a local runtime pin
- Existing source structure remains in place for this story:
  - `src/components/box2`
  - `src/components/box3`
  - `src/components/box4`
  - `src/components/box5`
  - `src/components/common`
- Do not perform the planned feature-folder renames in Story 1.1. Those belong to the later migration story sequence. [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/architecture.md#Decision-Impact-Analysis]

### Testing Requirements

- Required verification for this story:
  - `npm install`
  - `npm run dev`
  - `npm run build`
  - Manual browser smoke check of the existing landing page and interactive cards
- No test files are to be created. [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/project-context.md#Testing-Rules]

### Risks / Watch Items

- `webpack-cli` has advanced well past the currently pinned major version, so verify config compatibility before accepting a major bump.
- `@types/react` and `@types/react-dom` should be checked alongside the React upgrade to avoid stale type packages.
- `styled-components` type packages may need review because the repo currently uses `styled-components` `6.x` with `@types/styled-components` `5.x`; if compatibility warnings appear, document whether that mismatch is benign for Story 1.1 or needs correction now.
- `react-server-dom-*` packages are present but may be unnecessary in a client-only SPA. Do not remove them in this story unless they directly block the upgrade; note them for later cleanup if needed.

### References

- [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/epics.md#Epic-1-Foundation--CICD-Pipeline]
- [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/epics.md#Story-11-Upgrade-Dependencies-and-Runtime]
- [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/architecture.md#Selected-Approach-In-Place-Migration]
- [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/planning-artifacts/architecture.md#Decision-Impact-Analysis]
- [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/project-context.md#Technology-Stack--Versions]
- [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/project-context.md#Testing-Rules]
- [Source: /home/warrick/Dev/WS-Portfolio-New/_bmad-output/project-context.md#Critical-Implementation-Rules]
- External reference: https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/

## Dev Agent Record

### Agent Model Used

gpt-5

### Debug Log References

- Story prepared from planning artifacts, architecture, UX spec, project context, current repo manifests/config, npm registry checks, and Node dist index data.
- 2026-03-31 18:01 NZDT: Confirmed local runtime baseline `node v24.12.0`, `npm 11.7.0`; verified npm registry targets for TypeScript `6.0.2`, React `19.2.4`, Framer Motion `12.38.0`, Webpack `5.105.4`, `webpack-cli` `7.0.2`, and `webpack-dev-server` `5.2.3`.
- 2026-03-31 18:03 NZDT: `npm install` completed after manifest upgrades; refreshed `package-lock.json` and aligned Docker runtime to Node 24 Alpine.
- 2026-03-31 18:04 NZDT: TS 6 build failures required explicit `rootDir: "./src"`, `moduleResolution: "bundler"`, and a relative alias path entry `./src/*`.
- 2026-03-31 18:05 NZDT: Fixed dev-server upgrade fallout by removing redundant `devServer.static.directory` serving from `dist` and correcting the favicon path to `/favicon.ico`.
- 2026-03-31 18:06 NZDT: Manual smoke verification completed with headless Chrome against `http://127.0.0.1:3000`; landing page card grid rendered without visible regressions.
- 2026-03-31 18:09 NZDT: Review follow-up pass confirmed three valid stale version references and corrected them in `docs/deployment-guide.md`, `NGINX-DEPLOYMENT.md`, and `CLAUDE.md`.

### Implementation Plan

- Update top-level package versions and add `engines.node >=24` while preserving existing scripts and the dev server port.
- Keep the TypeScript 6 guardrail of explicit `"types": ["node"]`, and only add `rootDir` if the upgraded compiler changes emit layout.
- Run install, resolve any Webpack/TypeScript compatibility fallout with minimal code changes, then verify `npm run build` and `npm run dev`.

### Completion Notes List

- Story scope intentionally excludes Tailwind integration and component migration.
- Latest stable versions were captured on 2026-03-31 so the dev agent can implement against the real ecosystem baseline, not just the planning draft.
- Upgraded the runtime baseline to Node 24 with `package.json` `engines.node >=24`, Docker `node:24-alpine`, TypeScript `6.0.2`, React `19.2.4`, Framer Motion `12.38.0`, Webpack `5.105.4`, `webpack-cli` `7.0.2`, and `webpack-dev-server` `5.2.3`.
- Updated `tsconfig.json` for TypeScript 6 by keeping explicit `"types": ["node"]`, adding `rootDir`, switching `moduleResolution` to `bundler`, and making the alias path entry explicitly relative.
- Preserved existing scripts and port `3000`; `npm run build` now succeeds and `npm run dev` serves the app cleanly on normal browser GET traffic.
- Manual verification used headless Chrome screenshot and DOM capture against the live dev server; the existing card-grid landing page rendered correctly with no visible regression in the current experience.
- Project docs and agent context were updated to reflect the real post-upgrade baseline so later stories inherit the actual versions rather than the planning snapshot.
- Resolved review patch findings for stale version references in embedded Dockerfile snippets and the Claude guidance doc, then re-ran `npm run build` successfully.
- Code review completed with all patch findings resolved; no decision-needed items remained open, so the story is complete.

### File List

- CLAUDE.md
- Dockerfile
- NGINX-DEPLOYMENT.md
- _bmad-output/implementation-artifacts/1-1-upgrade-dependencies-and-runtime.md
- _bmad-output/project-context.md
- docs/architecture.md
- docs/deployment-guide.md
- docs/development-guide.md
- docs/index.md
- docs/project-overview.md
- docs/project-scan-report.json
- docs/source-tree-analysis.md
- index.html
- package-lock.json
- package.json
- tsconfig.json
- webpack.dev.cjs

### Change Log

- 2026-03-31: Upgraded the project runtime and dependency baseline to Node 24 / TypeScript 6, resolved TS 6 and webpack-dev-server compatibility issues, and updated versioned documentation to the new baseline.
- 2026-03-31: Addressed code review patch findings for stale version references in deployment docs and `CLAUDE.md`.
- 2026-03-31: Code review workflow completed; Story 1.1 advanced from `review` to `done`.

### Review Findings

- [x] [Review][Patch] Stale Node 22 in docs/deployment-guide.md embedded Dockerfile code block [docs/deployment-guide.md:16]
- [x] [Review][Patch] Stale Node 22 in NGINX-DEPLOYMENT.md embedded Dockerfile code block [NGINX-DEPLOYMENT.md:56]
- [x] [Review][Patch] Stale version references in CLAUDE.md — Node.js 22.x, TypeScript 5.9.2, React 19.1.0 [CLAUDE.md:26,80,81,83]
- [x] [Review][Defer] Dead dependencies: react-server-dom-parcel and react-server-dom-webpack unused in client SPA [package.json:25-26] — deferred, pre-existing
- [x] [Review][Defer] TypeScript in dependencies instead of devDependencies [package.json:28] — deferred, pre-existing
- [x] [Review][Defer] Dev server static serving removal — correct change, CopyWebpackPlugin handles assets, old config served from ./dist redundantly [webpack.dev.cjs] — deferred, documented behavioral change
- [x] [Review][Defer] declaration: true emits .d.ts files into dist alongside webpack output [tsconfig.json] — deferred, pre-existing
- [x] [Review][Defer] Favicon MIME type should be image/x-icon not image/ico [index.html] — deferred, pre-existing
- [x] [Review][Defer] serve installed globally in Docker production image [Dockerfile] — deferred, pre-existing
- [x] [Review][Defer] @types/node ^24.12.0 — may lag behind TS 6.0 recommended major, but aligns with Node 24 runtime [package.json] — deferred, debatable
- [x] [Review][Defer] tsconfig paths without baseUrl is dead config — no source files use @/ imports [tsconfig.json] — deferred, not harmful
