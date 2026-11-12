# RACI by status

**R** does the work · **A** accountable (signs) · **C** consulted · **I** informed.
SLAs are **proposals**; the team sets them in `.claude/project.yml` → `sla_hours`.

| Status / step | AI | PO | BA | PM | Designer | Dev | Tech Lead | QA | Proposed SLA |
|---|---|---|---|---|---|---|---|---|---|
| Step 0: feature analysis (`type:epic`) | R | A | R | I | C | C | A | I | — |
| Step 1: create issue, **G1** | R (drafts) | A | R | I | C | — | — | — | — |
| `status:backlog` → triage | R | I | I | — | — | — | C (risk) | — | automatic |
| `status:fail-to-dev` | — | A/R | R | I | — | — | — | — | 24 hours |
| `status:blocked` | — | I | — | A (unblock) | — | C | C | — | — |
| Refinement (`refine --batch`) | R (triage, draft size) | A | R | I | C | C | R | C | 20–25% of the sprint |
| UI design approval (`design-brief`) | R (brief) | C | I | I | A | — | — | — | first 1–2 sprint days |
| `status:test-design` → test design | R | I | C | — | — | C | C | C | automatic |
| **G2**: approve plan + test cases (`test-design --approve`) | — | I | — | I | — | R (plan) | A | R (test cases) | 8 hours |
| `status:in-progress` → code | R | — | — | — | C (UI) | C | I | — | automatic |
| `status:in-review` → review | R | — | — | — | R (`pr-review --design`) | I | I | — | automatic |
| `status:qa` → QA | R (auto) | — | — | I | — | — | — | R/A (manual, mobile: `qa --manual`) | 24 hours for manual |
| `status:qa-failed` | — | I | — | I | — | R | A | C | 8 hours |
| `status:needs-human` | — | C (product) | C | A (escalate) | C | R | R | — | 8 hours |
| PR waiting for human approval (CODEOWNERS; measured on the PR, not a status) | R (round-1 review) | — | — | I | C (UI) | R | A/R | — | 8 hours (`review`) |
| **G3**: refutation | R (brief) | — | — | — | — | — | A/R | — | 8 hours (with G4) |
| **G4**: merge | R (checks) | — | — | I | — | — | A/R | — | 8 hours (with G3) |
| `status:uat`, **G5** (`uat --run`) | R (checklist) | A/R | C | I | C | — | — | C | 48 hours |
| `status:uat-failed` | — | I | — | I | — | R | A | — | 8 hours |
| Hotfix | R | I | — | I | — | R | A | R (smoke) | by severity |
| Release plan (`sprint release`) | R (drafts) | C | — | A | — | — | R | I | per release |
| Progress report (`sprint report`) | R (drafts) | I | — | A | — | — | I | — | weekly |
| Process change | — | C | C | C | C | C | C | C | Process owner: A |

**AI Enablement** (held jointly by the Tech Lead and the PO) is accountable (A) for skills, MCP configuration and fixing repeated AI errors after the retro. **Security** is consulted (C) at G2/G3 for `risk:high` stories and signs off access in Sprint 0. **The customer** chooses UI options and accepts together with the PO. The RACI by sprint stage is in [Scrum process section 3.1](/en/scrum).

## Holding several roles

One person may hold several roles, with two limits:

1. Never sign two consecutive gates for the same issue (G1 then G2; G2 then G3).
2. For `risk:high` issues, the person doing G3 is not the person who merges (G4).
