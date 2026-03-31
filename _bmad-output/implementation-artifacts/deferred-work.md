# Deferred Work

## Deferred from: code review of 1-1-upgrade-dependencies-and-runtime (2026-03-31)

- Dead dependencies: `react-server-dom-parcel` and `react-server-dom-webpack` are unused in this client SPA — zero imports across all source files. Consider removing in a later cleanup story.
- TypeScript (`^6.0.2`) is in `dependencies` instead of `devDependencies`. Semantically incorrect for a build tool. Safe to move in a future housekeeping pass since Dockerfile uses `npm install` (not `npm ci --omit=dev`).
- Dev server `static.directory` removal in `webpack.dev.cjs` is correct — old config served from `./dist` redundantly. CopyWebpackPlugin handles asset copying. If new static files are added to `public/` in future, they need CopyWebpackPlugin patterns, not devServer.static.
- `declaration: true` + `noEmit: false` in tsconfig causes `.d.ts` files to be emitted into `dist/`. Unnecessary for a client SPA. Consider disabling in a later cleanup.
- Favicon `<link>` uses `type="image/ico"` — correct MIME type is `image/x-icon`. Pre-existing.
- `serve` is installed globally in Docker via `RUN npm install -g serve`. Works but adds attack surface. Consider copying from node_modules in a future Docker optimization pass.
- `@types/node` at `^24.12.0` aligns with Node 24 runtime but may lag behind the TypeScript 6.0 `ts6.0` dist-tag target. Build passes. Low priority.
- `tsconfig.json` `paths` config (`@/*`) is dead — no source files use `@/` imports. Webpack alias handles resolution. Not harmful but could mislead developers.
