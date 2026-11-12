<!-- Sinh tự động bởi scripts/sync-skills.py. Không sửa tay. -->

# Skill catalog

Generated from `skills/catalog.json`, the single source for skills, roles and triggers. Each skill's instructions (written for the AI, in Vietnamese) live in the repo; click a name to read it.

## By role

| Role | Skills |
|---|---|
| PO | `dev-pipeline`, `issue-create`, `refine`, `uat`, `sprint` |
| BA | `dev-pipeline`, `issue-create`, `refine` |
| PM | `dev-pipeline`, `sprint` |
| Designer | `dev-pipeline`, `design-brief`, `pr-review` |
| Developer | `dev-pipeline`, `test-design`, `implement`, `pr-review`, `hotfix` |
| Tech Lead | `dev-pipeline`, `refine`, `test-design`, `pr-review`, `merge-gate`, `hotfix`, `sprint` |
| QA | `dev-pipeline`, `test-design`, `qa` |
| AI Enablement | `dev-pipeline`, `sprint` |
| Security | `dev-pipeline`, `merge-gate` |

## All skills

| Step | Skill | Purpose | Roles | Trigger |
|---|---|---|---|---|
| - | [`dev-pipeline`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/dev-pipeline/SKILL.md) | Routes by status label; per-role work queue | PO, BA, PM, Designer, Developer, Tech Lead, QA, AI Enablement, Security | on demand |
| 1 | [`issue-create`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/issue-create/SKILL.md) | Drafts a well-formed issue from plain language | PO, BA | on demand |
| 0, refinement | [`refine`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/refine/SKILL.md) | Epic analysis (default); batch refinement, S–XL sizes, human-code flag (`--batch`) | PO, BA, Tech Lead | label `type:epic` (automatic) or on demand |
| 2 | [`triage`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/triage/SKILL.md) | Checks Definition of Ready R1–R11 | AI (automatic) | label `status:backlog` (automatic) or on demand |
| design | [`design-brief`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/design-brief/SKILL.md) | UI brief from the design system, options, design approval before coding | Designer | on demand |
| 3 | [`test-design`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/test-design/SKILL.md) | Test cases and plan before coding (default); helps the G2 signer (`--approve`) | Developer, Tech Lead, QA | label `status:test-design` (automatic) or on demand |
| 4, 6b | [`implement`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/implement/SKILL.md) | Codes the approved plan, opens the PR (default); fixes after QA/UAT (`--fix`); Figma frame to UI (`--figma`) | Developer | label `status:ready-to-dev`, `status:in-progress` (automatic) or on demand |
| 5 | [`pr-review`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/pr-review/SKILL.md) | Two-pass PR review in a separate session (default); Designer compares UI with Figma (`--design`) | Designer, Developer, Tech Lead | label `status:in-review` (automatic) or on demand |
| 6 | [`qa`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/qa/SKILL.md) | Automation and QA verdict (default); manual/mobile testing by QA (`--manual`) | QA | label `status:qa` (automatic) or on demand |
| 7–8 | [`merge-gate`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/merge-gate/SKILL.md) | Refutation brief for G3 (default); pre-merge check for G4 (`--merge`) | Tech Lead, Security | label `status:qa-passed` (automatic) or on demand |
| 9 | [`uat`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/uat/SKILL.md) | UAT checklist for the PO (default); PO acceptance and verdict (`--run`) | PO | label `status:uat` (automatic) or on demand |
| hotfix | [`hotfix`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/hotfix/SKILL.md) | Emergency production fix | Tech Lead, Developer | on demand |
| planning, daily, review, retro | [`sprint`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/sprint/SKILL.md) | Scrum events: `plan`, `daily`, `review`, `retro`, `report`, `release` | PO, PM, Tech Lead, AI Enablement | on demand |
