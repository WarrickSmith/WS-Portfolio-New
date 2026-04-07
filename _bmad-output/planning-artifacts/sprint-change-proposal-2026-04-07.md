---
date: 2026-04-07
trigger: Epic 5 retrospective — systemic deferred work accumulation across Epics 1-5
scope: Moderate
status: approved
epic_affected: Epic 6
---

# Sprint Change Proposal — Deferred Work & Retro Action Item Audit

**Date:** 2026-04-07
**Triggered by:** Epic 5 retrospective identified chronic deferred work accumulation and unfulfilled retro action items across Epics 1-5
**Prepared by:** Bob (Scrum Master)
**Approved by:** Warrick (2026-04-07)

---

## Section 1: Issue Summary

### Problem Statement

Across five epics, retrospectives have consistently identified issues — bugs, technical debt, documentation drift, and verification gaps — but the process has failed to resolve them. Items are documented in `deferred-work.md` and retro action items, but lack owners, deadlines, and story assignments. The result is a growing pile of ~45 deferred items and multiple retro commitments that have rolled forward across 2-4 consecutive epics without resolution.

### Evidence

- `project-context.md` flagged as stale in **every retrospective for 4 consecutive epics** — still references styled-components as the primary styling system while the codebase uses Tailwind CSS
- Live contact/integration verification committed to in Epic 1 retro — **never performed through 5 epics**
- CI pipeline confirmation through a real `main` merge committed to in Epic 1 — **never confirmed**
- Epic 4 retro committed to 12 action items — only 4 fully closed by Epic 5
- `Promise.race` timer leak identified and deferred **twice** from the same root cause (Stories 5.1 and 5.2)
- Forward delivery is excellent (100% story completion, zero rollbacks in Epics 4-5) but maintenance commitments are consistently dropped

### Root Cause

No structural mechanism converts retro commitments and deferred items into owned, scheduled work. Items are tracked but never allocated to stories. Epics start immediately after the previous one closes, leaving no maintenance window. The retrospective process documents problems but lacks accountability for resolution.

---

## Section 2: Impact Analysis

### Epic Impact

**Epic 6 (Responsive Design, Accessibility & SEO)** is the only affected epic. It is the final epic before production release. Five existing stories need targeted scope additions. One new story is required for items that have no natural home in existing stories. Stories renumbered to reflect execution order.

### Story Impact (renumbered 2026-04-07)

| Story | Change Type | Items Added |
|-------|-------------|-------------|
| **Story 6.1 (NEW)** | **New story — Technical Debt & Housekeeping** | **12 items (H1-H12)** |
| Story 6.2 (was 6.1) | Add tasks | 2 items (A1-A2) |
| Story 6.5 (was 6.4) | Add tasks | 2 items (A3-A4) |
| Story 6.6 (was 6.5) | Add task | 1 item (A5) |

### Artifact Conflicts

| Artifact | Impact | Action |
|----------|--------|--------|
| `project-context.md` | Critically stale — references styled-components | Update before Epic 6 story creation (P1) |
| `epics.md` / planning docs | Card interactivity language says "Cards 2-5" | Fix to match repo truth: cards 3-5 interactive (P2) |
| `deferred-work.md` | ~45 entries without dispositions | Update with dispositions per this proposal |
| `sprint-status.yaml` | Missing Story 6.6 entry | Add after approval |

### Technical Impact

No architectural changes. All items are implementation-level fixes: bug patches, dead code removal, configuration hygiene, and documentation corrections. No risk to existing functionality.

---

## Section 3: Recommended Approach

### Selected Path: Direct Adjustment

Modify existing Epic 6 stories to absorb naturally fitting items. Create one new housekeeping story (now Story 6.1) for remaining technical debt. Execute documentation fixes as pre-epic preparation tasks. Stories renumbered to reflect execution order.

### Rationale

- All items are small, well-defined, and independently fixable
- No items require architectural changes or scope reduction
- Existing Epic 6 stories have clear thematic alignment with most items
- A single housekeeping story cleanly contains the remaining miscellaneous debt
- Pre-epic documentation fixes improve story preparation quality for all Epic 6 stories

### Effort Estimate

- **Story scope additions (A1-A5):** Low — 5 small tasks distributed across 3 existing stories
- **Story 6.1 (Technical Debt):** Medium — 12 items, mostly mechanical fixes (dead code removal, guard clauses, config changes)
- **Pre-epic prep tasks (P1-P4):** Low-Medium — P1 and P2 are documentation edits; P3 and P4 are verification activities

### Risk Assessment: Low

- No items affect core functionality or user-facing features
- All fixes are isolated and testable
- Story 6.1 items are independent — partial completion still delivers value
- Pre-epic prep tasks reduce friction for all subsequent stories

### Timeline Impact

Minimal. Story 6.6 can run in parallel with or before Story 6.1. Pre-epic prep tasks should complete before story creation begins.

---

## Section 4: Detailed Change Proposals

### 4A. Pre-Epic Preparation Tasks

These must complete before Epic 6 story creation begins. They are not story scope — they are preparation activities that improve story quality.

#### P1: Update `project-context.md`

**File:** `_bmad-output/project-context.md`

OLD (lines 23, 52, 92):
```
- **styled-components** 6.3.12 — primary styling approach
- styled-components is the sole styling method — no CSS modules or inline styles
- Do NOT add CSS modules, Tailwind, or inline styles — styled-components is the only styling method
```

NEW:
```
- **Tailwind CSS** 4.x — primary styling approach via utility classes
- Tailwind CSS is the sole styling method — no styled-components, CSS modules, or inline styles
- Do NOT add styled-components, CSS modules, or inline styles — Tailwind CSS is the only styling method
```

Additional updates needed:
- Technology stack versions (React 19.2.4, TypeScript 6.0.2, Framer Motion 12.38.x, etc.)
- Card layout description (six cards: merged hero/identity + 4 interactive + approach)
- Overlay/state patterns (AnimatePresence, ExpandableItem, cross-card navigation)
- Feature folder names (namecard/, about/, portfolio/, contact/, approach/)
- Environment config pattern (env.ts gateway, window.__ENV runtime injection)
- Remove all styled-components references

**Owner:** Bob
**Success criteria:** Zero styled-components references. Current tech stack, card layout, folder structure, and patterns accurately described.

#### P2: Fix planning doc card-interactivity language

**File:** `_bmad-output/planning-artifacts/epics.md` and related planning docs

OLD (multiple locations):
```
Cards 2-5
```

NEW:
```
Cards 3-6 (About, Portfolio, Approach, Contact) are interactive
Cards 1-2 (hero image, identity text) are non-interactive (merging into one card in Story 6.2)
```

**Owner:** Bob
**Success criteria:** Planning docs consistently describe actual card interactivity. No "Cards 2-5" references remain.

#### P3: Live contact/integration verification

**Scope:**
- EmailJS contact form submission with real credentials
- reCAPTCHA happy path and expiry/reset behavior
- Visitor tracking enabled/disabled behavior in production-like config
- Document the env setup used and results

**Owner:** Warrick
**Success criteria:** Verification results documented. All integration paths confirmed working or issues captured.

#### P4: Confirm CI through real `main` merge

**Scope:**
- Merge current feature branch to `main`
- Verify GitHub Actions triggers, builds, and pushes image to `registry.wsapz.com`

**Owner:** Warrick
**Success criteria:** CI build-and-publish verified end-to-end with documented evidence.

---

### 4B. Items Added to Existing Epic 6 Stories

#### Story 6.2 (was 6.1) — Add 2 tasks

**A1: Fix `rounded-radius-sm` → `rounded-sm`**

Replace legacy Tailwind v3 class name with correct Tailwind v4 utility across all source files.

Affected files:
- `src/components/common/ExternalLinkButton.tsx:26`
- `src/components/about/AboutContent.tsx:361`
- `src/components/contact/ContactForm.tsx:469`
- `src/components/contact/ContactForm.tsx:637`

**A2: Align AboutContent arbitrary breakpoints to design tokens**

Replace `min-[760px]` and `min-[1180px]` in AboutContent.tsx with project design tokens (`md:` for tablet, `lg:` for desktop), consistent with the already-targeted ApproachContent `min-[860px]` fix.

Affected files:
- `src/components/about/AboutContent.tsx:165`
- `src/components/about/AboutContent.tsx:200`

---

#### Story 6.5 (was 6.4) — Add 2 tasks

**A3: Ambient background animation tuning**

The ambient background 45s gradient drift is effectively invisible (flagged in Epic 2 retro). Deferred to "after content lands" — all content epics are now complete. Tune gradient opacity, animation range, or cycle timing so the effect is perceptible when looking for it over 10-15 seconds without becoming distracting.

Acceptance criteria: Background animation detectable in a 15-second observation window. Must not impact Lighthouse Performance score. Static gradient remains for `prefers-reduced-motion`.

**A4: Per-card expansion animation tuning**

Card expansion animations are conservatively tuned (flagged in Epic 2 retro). Deferred to "after Epic 4 content lands." With all overlay content now in place, reassess spring configs and motion ranges so each card's unique character (slide-up, center-scale, bottom-unfold) is immediately striking.

Acceptance criteria: Each card's expansion animation feels distinct without side-by-side comparison. 60fps maintained. Reduced motion experience unaffected.

---

#### Story 6.6 (was 6.5) — Add 1 task

**A5: Fix favicon MIME type**

OLD (`index.html:5`):
```html
<link rel="icon" type="image/ico" href="/favicon.ico" />
```

NEW:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

---

### 4C. Story 6.1: Technical Debt & Housekeeping (was 6.6, renumbered to run first)

**As the site owner,**
**I want all accumulated technical debt and bugs from Epics 1-5 resolved before production release,**
**So that the deployed site has no known bugs, dead code, or configuration issues.**

**Acceptance Criteria:**

**Given** the codebase after Epics 1-5 are complete
**When** all housekeeping tasks are executed
**Then:**

1. **H1** — `react-server-dom-parcel` and `react-server-dom-webpack` are removed from `package.json` (zero imports, dead dependencies since Epic 1)
2. **H2** — `typescript` is moved from `dependencies` to `devDependencies` in `package.json`
3. **H3** — `declaration: true` is set to `false` (or removed) in `tsconfig.json` — no `.d.ts` emission needed for client SPA
4. **H4** — `Promise.race` timer leaks are fixed in all 3 files: `ContactForm.tsx`, `ipGeolocationService.ts`, `useVisitorTracker.ts` — `clearTimeout` called when primary promise resolves
5. **H5** — Dead `isAvailable()` method removed from `ipGeolocationService.ts`
6. **H6** — `.env` added to `.dockerignore` (currently only `.env.local` variants are excluded)
7. **H7** — `body { font-weight: 700 }` global bold default in `main.css:141` is audited — either justified with a comment or changed to `font-weight: 400` with explicit bold where needed
8. **H8** — WordSlider `setTimeout` cleanup: inner `setTimeout` in `useEffect` returns cleanup function on unmount (`src/components/common/WordSlider.tsx:17, 31`)
9. **H9** — WordSlider empty `words` array guard: early return or fallback when `words.length === 0` to prevent `NaN` from modulo-by-zero (`src/components/common/WordSlider.tsx:19`)
10. **H10** — Rate-limit `parseInt` NaN guard in `useVisitorTracker.ts:117` — handle corrupted localStorage value gracefully (return `false` from rate limit check when `parseInt` returns `NaN`)
11. **H11** — `overviewStats` in `AboutContent.tsx` moved outside component body or wrapped in `useMemo` — static data should not be recreated on every render
12. **H12** — Docker health check added to `docker-compose.yml` — basic HTTP check on port 3000 so Portainer/Docker can detect a hung `serve` process

**And** `npm run build` succeeds with zero errors after all changes
**And** `npm run dev` confirms no visual regressions
**And** all items are individually verifiable and can be committed incrementally

**Story 6.1 Implementation Notes:**
- Items are independent — can be implemented in any order
- All items are mechanical fixes with clear before/after states
- No items affect user-visible behavior (except H7 font-weight, which needs visual verification)
- Runs first in execution order to establish a clean foundation

---

### 4D. Deferred Work Disposition Summary

#### Items Confirmed Resolved (13 items — remove from `deferred-work.md`)

| ID | Item | Resolution |
|----|------|------------|
| R1 | Dual CSS reset (Tailwind + GlobalStyle) | GlobalStyle.ts deleted in Story 1.5 |
| R2 | CloseButton click propagation | stopPropagation added in Story 1.5 |
| R3 | ContactForm unsafe process.env access | Uses env.ts gateway since Story 1.6 |
| R4 | env.d.ts types non-optional string | All fields optional since Story 1.6 |
| R5 | AC7 constants vs accessor functions | readEnv() pattern works correctly |
| R6 | docker-compose version: '3.8' | No longer present in file |
| R7 | Dead tsconfig paths @/* | Removed from tsconfig.json |
| R8 | learningAdaptability never rendered | Now rendered in ApproachContent.tsx (Story 4.3) |
| R9 | ContactForm e.preventDefault bug | ContactForm rewritten in Story 5.1 |
| R10 | onCaptchaChange sets true on null | ContactForm rewritten in Story 5.1 |
| R11 | EmailJS empty string silent failure | ContactForm rewritten in Story 5.1 |
| R12 | closeCard/isClosed state churn | AnimatePresence pattern replaced this in Epic 2 |
| R13 | oklch relative color syntax fallbacks | Design decision — 28+ occurrences, not a regression |

#### Items Already Targeted in Epic 6 (7 items — no action needed)

| ID | Item | Target |
|----|------|--------|
| T1 | Card consolidation (merge Card 1 + Card 2) | Story 6.2 |
| T2 | Card preview layout rework | Story 6.2 |
| T3 | Even card sizing constraint | Story 6.2 |
| T4 | Card ID magic numbers → named constants | Story 6.2 |
| T5 | ApproachContent min-[860px] breakpoint | Story 6.2 |
| T6 | Missing skill badges | Story 6.2 |
| T7 | GoldPulseText no semantic heading role | Story 6.4 |

#### Items Added to Existing Stories (5 items)

| ID | Item | Target |
|----|------|--------|
| A1 | `rounded-radius-sm` → `rounded-sm` | Story 6.2 |
| A2 | AboutContent arbitrary breakpoints | Story 6.2 |
| A3 | Ambient background tuning | Story 6.5 |
| A4 | Per-card animation tuning | Story 6.5 |
| A5 | Favicon MIME type fix | Story 6.6 |

#### Items in Story 6.1 — Technical Debt & Housekeeping (12 items)

| ID | Item | Priority |
|----|------|----------|
| H1 | Dead dependencies removal | Medium |
| H2 | TypeScript → devDependencies | Low |
| H3 | declaration: true cleanup | Low |
| H4 | Promise.race timer leak (3 files) | Medium |
| H5 | Dead isAvailable() method | Low |
| H6 | .env in .dockerignore | Medium |
| H7 | body font-weight: 700 audit | Medium |
| H8 | WordSlider setTimeout cleanup | Medium |
| H9 | WordSlider empty array guard | Medium |
| H10 | localStorage parseInt NaN guard | Medium |
| H11 | overviewStats memoization | Low |
| H12 | Docker health check | Low |

#### Items Accepted/Dismissed (40 items)

Accepted as permanent state — theoretical concerns, library limitations, design decisions, or issues with no practical impact. Full rationale documented in the analysis. These items should be removed from active tracking in `deferred-work.md`.

---

## Section 5: Implementation Handoff

### Change Scope: Moderate

Requires backlog reorganization (new story, task additions to existing stories) plus pre-epic documentation preparation.

### Handoff Plan

| Recipient | Responsibility | Items |
|-----------|---------------|-------|
| **Bob (Scrum Master)** | Execute pre-epic prep tasks P1 and P2. Update `deferred-work.md` with dispositions. Update `sprint-status.yaml` and `epics.md` with story additions and renumbering. | P1, P2, all tracking updates |
| **Warrick (Project Lead)** | Execute pre-epic verification tasks P3 and P4. Sign off on prep completion before story creation begins. | P3, P4 |
| **Dev Agent** | Implement Story 6.1 (tech debt) and all scope additions within Stories 6.2, 6.5, 6.6. | A1-A5, H1-H12 |

### Execution Sequence

1. **Pre-epic prep** (P1-P4) — Bob handles docs, Warrick handles verification
2. **Story creation** — Bob prepares stories using updated artifacts
3. **Story 6.1** (Technical Debt) — runs first to establish clean foundation
4. **Stories 6.2-6.6** — execute in order per sprint plan with scope additions incorporated

### Success Criteria

- Zero items in `deferred-work.md` without a disposition
- `project-context.md` matches live repo truth
- Planning docs reflect actual card interactivity
- All 12 Story 6.1 items verified in browser
- All 5 scope additions verified within their parent stories
- `npm run build` passes after all changes
- No known bugs remain at production release
