---
date: 2026-04-09
trigger: GitHub-reported dependency security advisories discovered after Epic 6 closure
scope: Moderate
status: approved
epic_affected: Epic 6
---

# Sprint Change Proposal - Epic 6 Security Verification Story

**Date:** 2026-04-09
**Triggered by:** GitHub dependency-security findings raised after Story 6.7 closed Epic 6
**Prepared by:** Bob (Scrum Master)
**Approved by:** Warrick (2026-04-09)

---

## Section 1: Issue Summary

### Problem Statement

Epic 6 was marked done, but new GitHub-reported dependency advisories now require explicit verification before the retrospective. The repo has recently undergone a major tech refresh, so the alerts cannot be accepted at face value or dismissed as stale without evidence. We need one final Epic 6 story that verifies the current dependency tree, assesses actual exploitability for this project, and remediates any still-valid issues.

### Evidence

Local repo verification on 2026-04-09 confirms all three reported vulnerable transitive versions are still present in the current dependency tree:

- `path-to-regexp@0.1.12` via `webpack-dev-server@5.2.3 -> express@4.22.1 -> path-to-regexp@0.1.12`
- `picomatch@2.3.1` via `ts-loader@9.5.4 -> micromatch@4.0.8 -> picomatch@2.3.1`
- `picomatch@2.3.1` also via `webpack-dev-server@5.2.3 -> chokidar@3.6.0 -> anymatch/readdirp -> picomatch@2.3.1`
- `lodash@4.17.21` via `html-webpack-plugin@5.6.6` and its `pretty-error` / `renderkid` subchain

Critical nuance: these packages currently sit in the dev/build toolchain, not the shipped React bundle. That reduces direct runtime exposure, but it does not remove local-dev, CI, or supply-chain risk. The issue is therefore not "blindly upgrade packages"; it is "verify applicability, then fix or explicitly disposition with evidence."

---

## Section 2: Impact Analysis

### Epic Impact

Only **Epic 6** is affected. No new epic is needed. The correct action is to reopen Epic 6, insert one new story before the retrospective, and block the retrospective until that story is complete.

### Story Impact

| Story | Change Type | Impact |
|-------|-------------|--------|
| Story 6.7 | Historical clarification only | Remains the final closure of the pre-existing deferred backlog, but is no longer the last Epic 6 work item |
| **Story 6.8 (NEW)** | New story | Verify and remediate GitHub-reported dependency advisories with evidence-backed release disposition |

### Artifact Conflicts

| Artifact | Impact | Action |
|----------|--------|--------|
| `epics.md` | Missing the new security story | Add Story 6.8 before retrospective |
| `sprint-status.yaml` | Epic 6 incorrectly marked `done` | Reopen Epic 6 and add Story 6.8 as `ready-for-dev` |
| Story 6.7 artifact | Claims Epic 6 could proceed to retrospective | Add dated historical clarification note |
| `deferred-work.md` | Reads like Epic 6 is fully closed | Add note that Story 6.8 is a separate post-closure security follow-up |
| Package manifests during implementation | May require upgrade or override changes | To be handled inside Story 6.8 only if advisories remain valid/actionable |

### PRD / Architecture / UX Impact

- **PRD:** No scope reduction required. Existing release-hardening and manual-verification expectations already support this work.
- **Architecture:** No architectural redesign required. Existing Webpack 5, CI/CD, and env-handling constraints remain in force.
- **UX:** No user-facing UX changes required.

### Technical Impact

- Potential package-level changes in `package.json` / `package-lock.json`
- Possible low-risk build-chain adjustments only if needed to remediate transitive vulnerabilities
- Verification must include `npm run build` and `npm run dev`

---

## Section 3: Recommended Approach

### Selected Path: Direct Adjustment

Insert **Story 6.8: Dependency Vulnerability Verification and Remediation** into Epic 6, before the retrospective.

### Rationale

- The issue is real enough to block retrospective sign-off because the vulnerable transitive versions are present now.
- The scope is still contained inside Epic 6. No new epic, rollback, or PRD rewrite is justified.
- The right engineering response is targeted verification plus minimal-risk remediation, not a broad toolchain change.
- Keeping this as a discrete story creates an auditable release gate.

### Effort Estimate

- **Story creation and backlog update:** Low
- **Implementation effort for Story 6.8:** Low-Medium
- **Risk level:** Medium, because upstream transitive chains may limit clean upgrades

### Alternative Paths Considered

- **Rollback:** Not viable. No completed Epic 6 work needs reverting to address dependency advisories.
- **New Epic:** Not viable. This is contained release-hardening work inside the existing final epic.
- **Ignore as dev-only:** Not viable without evidence-backed threat-model assessment and explicit disposition.

### Timeline Impact

Minimal, but Epic 6 is no longer retrospective-ready until Story 6.8 is complete.

---

## Section 4: Detailed Change Proposals

### 4A. Epic 6 Planning Update

**File:** `_bmad-output/planning-artifacts/epics.md`

OLD:
```md
### Story 6.7: Deferred Items Catch-All
...
**Story 6.7 Scope Additions:**
- **Deferred-item triage:** Collect and resolve all remaining deferred items from Stories 6.3-6.6 that were not addressed in their respective stories.
```

NEW:
```md
### Story 6.7: Deferred Items Catch-All
...
**Story 6.7 Scope Additions:**
- **Deferred-item triage:** Collect and resolve all remaining deferred items from Stories 6.3-6.6 that were not addressed in their respective stories.

### Story 6.8: Dependency Vulnerability Verification and Remediation
...
**Note:** This is a post-closure course-correction story created on 2026-04-09. It must be completed before the Epic 6 retrospective.
```

### 4B. Sprint Tracking Update

**File:** `_bmad-output/implementation-artifacts/sprint-status.yaml`

OLD:
```yaml
  epic-6: done
  6-7-deferred-items-catch-all: done
  epic-6-retrospective: optional
```

NEW:
```yaml
  epic-6: in-progress
  6-7-deferred-items-catch-all: done
  6-8-dependency-vulnerability-verification-and-remediation: ready-for-dev
  epic-6-retrospective: optional
```

### 4C. Historical Audit Clarification

**Files:**
- `_bmad-output/implementation-artifacts/6-7-deferred-items-catch-all.md`
- `_bmad-output/implementation-artifacts/deferred-work.md`

Add a dated clarification that Story 6.7 still closed the pre-existing deferred backlog, but Epic 6 was later reopened for a separate GitHub security follow-up story.

### 4D. New Story File

**File:** `_bmad-output/implementation-artifacts/6-8-dependency-vulnerability-verification-and-remediation.md`

Create a ready-for-dev story that:

- captures the verified dependency baseline
- assesses each advisory against actual repo exposure
- remediates valid findings or explicitly documents constrained accepted risk
- verifies `npm run build` and `npm run dev`
- blocks retrospective until final disposition is recorded

---

## Section 5: Implementation Handoff

### Scope Classification

**Moderate** - backlog reorganization plus one new implementation story

### Handoff Recipients

- **Bob / Scrum Master**
  - Update planning and sprint-tracking artifacts
  - Prepare the Story 6.8 implementation package
- **Developer Agent**
  - Execute Story 6.8
  - Apply the smallest safe remediation path
  - Record exact advisory dispositions and verification evidence
- **Warrick**
  - Review any accepted-risk rationale if a clean remediation path does not exist
  - Approve Epic 6 retrospective only after Story 6.8 is closed

### Success Criteria

- Story 6.8 exists as a ready-for-dev Epic 6 story
- Epic 6 is reopened in sprint tracking
- Each advisory ends with a concrete disposition: fixed, stale/not applicable, or accepted constrained risk with rationale
- Epic 6 retrospective remains blocked until Story 6.8 is complete
