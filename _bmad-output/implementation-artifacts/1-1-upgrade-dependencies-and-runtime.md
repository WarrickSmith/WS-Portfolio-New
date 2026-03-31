# Story 1.1: Upgrade Dependencies and Runtime

Status: ready-for-dev

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

- [ ] Audit current dependency baseline and choose upgrade targets for this story only. (AC: 1)
- [ ] Record the starting versions from `package.json` and confirm the runtime baseline from current local tooling.
  - [ ] Upgrade runtime and package targets to the current stable line: Node 24 LTS, TypeScript 6.0.x, React 19.2.x, Framer Motion 12.38.x, latest Webpack 5.x, plus compatible supporting packages.
  - [ ] Keep scope disciplined: do not introduce Tailwind/PostCSS/styled-components removal work here; that belongs to Story 1.2+.
- [ ] Update package manifests and lockfile. (AC: 1, 5)
  - [ ] Add or update `package.json` `engines.node` to `>=24`.
  - [ ] Refresh any package versions whose compatibility is required by the upgraded core stack.
  - [ ] Preserve existing script names and port `3000`.
- [ ] Update TypeScript configuration for 6.0 compatibility. (AC: 1, 6)
  - [ ] Review `tsconfig.json` against TypeScript 6.0 defaults and breaking changes.
  - [ ] Keep explicit `"types": ["node"]` because TypeScript 6.0 no longer auto-enumerates all `@types` packages by default.
  - [ ] Verify whether `rootDir` should be made explicit to avoid TS 6 output path drift; add it only if the build output shows a changed emit layout.
- [ ] Run dependency install and resolve upgrade fallout. (AC: 1, 2, 3)
  - [ ] Fix any compile-time, bundler, or type definition incompatibilities introduced by the upgrades.
  - [ ] Prefer minimal code changes that preserve current behaviour; avoid opportunistic refactors.
- [ ] Verify runtime behaviour manually. (AC: 2, 3, 4)
  - [ ] Run `npm run dev` and confirm the dev server starts on port `3000`.
  - [ ] Run `npm run build` and confirm production build success.
  - [ ] Open the site in the browser and confirm no visual regressions in the existing card-grid experience.
  - [ ] Check browser console for new warnings or runtime errors introduced by the upgrades.
- [ ] Update project documentation only if the implemented versions differ from current project docs. (AC: 1)
  - [ ] If actual stable versions exceed the versions named in planning docs, capture that in completion notes so later stories inherit the real baseline.

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

### Completion Notes List

- Story scope intentionally excludes Tailwind integration and component migration.
- Latest stable versions were captured on 2026-03-31 so the dev agent can implement against the real ecosystem baseline, not just the planning draft.

### File List

- /home/warrick/Dev/WS-Portfolio-New/_bmad-output/implementation-artifacts/1-1-upgrade-dependencies-and-runtime.md
