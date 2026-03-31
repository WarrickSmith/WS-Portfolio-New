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

## Deferred from: code review of 1-2-tailwind-css-integration-and-utility-helpers (2026-03-31)

- oklch relative color syntax (`oklch(from #ffb400 l c h / 15%)`) has limited browser support — no CSS fallbacks provided. Values are spec-mandated. Consider adding rgba fallbacks before oklch declarations for older browsers.
- Dual CSS reset — Tailwind preflight (via `@import "tailwindcss"`) and GlobalStyle.ts both reset base styles. Currently working but potential ordering conflicts (e.g., body font-weight). Address when GlobalStyle is removed in story 1.5.
- tailwind-merge not configured for custom theme tokens — `cn()` won't correctly resolve conflicts on custom utilities like `text-text-primary`. Configure `extendTailwindMerge` when custom utilities are first consumed in story 1.3+.
- TypeScript in dependencies instead of devDependencies — pre-existing from story 1.1 (already tracked above).
- ContactForm.tsx `e.preventDefault()` called after early return on captcha check — page reloads when captcha is incomplete. Pre-existing bug, not related to story 1.2.
- ContactForm.tsx unsafe process.env access — typed as always-present `string` but may be undefined at runtime if .env key is missing. Pre-existing.
- env.d.ts types ProcessEnv vars as non-optional `string` — hides potential undefined at runtime. Pre-existing pattern.
- AC7 specifies "accessor functions" but implementation uses `export const` (per Task 7 pattern). Constants evaluate once at import time. Revisit in Story 1.6 when `window.__ENV` is wired up via Docker entrypoint — may need to refactor to lazy accessor functions if injection timing requires it.

## Deferred from: code review of 1-3-component-migration-common-and-leaf-components (2026-04-01)

- WordSlider setTimeout not cleaned up on unmount — inner setTimeout in useEffect not cleared on component unmount, may cause React state-update-on-unmount warning. Pre-existing.
- CloseButton click event propagates to parent Card onClick — no stopPropagation on button click, event may bubble to Card's handleCardClick. Pre-existing.
- GoldPulseText card preview titles have no semantic heading role — rendered as `<span>` without ARIA roles. Pre-existing, tracked for Epic 6 accessibility work.
- Empty words array crashes WordSlider — `(prevIndex + 1) % words.length` produces NaN when words is empty. Pre-existing.
