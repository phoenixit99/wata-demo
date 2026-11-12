# Guide for the Tech Lead

You own the final technical call: you sign G2 (plan), G3 (refutation) and G4 (merge), decide risk
tiers, and keep the guardrails in place.

## Your work in the process

| When | You do | Tool |
|---|---|---|
| After triage | Review the proposed `risk:*`; change it if you disagree | GitHub |
| **G2** | Approve the plan in `## Test design: PASS` (QA approves the test cases) with `test-design --approve`. Apply `status:ready-to-dev` | Claude Code / GitHub |
| **G3** | Read `## Refutation brief`, read the risky diff hunks closely, try to find what is wrong. Agree: comment `## G3: OK` with what you checked. Problem: comment `## Code review: FAIL` and apply `status:in-progress` | GitHub |
| **G4** | Run `/merge-gate --merge <number>`; merge when READY | Claude Code + GitHub |
| `status:needs-human`, `status:qa-failed` | Assign or handle it | — |
| Hotfix | Triage directly, run `/hotfix <number>` | Claude Code |
| Release | Prepare it with the PM using `/sprint release` | Claude Code |
| Large feature | Agree `## Feature analysis` with the BA/PO | GitHub |

## Guardrails (required before enabling the agent)

- Branch protection on `main`: no direct pushes, no force-push, PRs required, CODEOWNERS approval
  required, required checks from `ci.yml`.
- The agent's GitHub App has **no** permission to bypass branch protection and no admin rights.
- `.claude/settings.json` from the template (the backstop).
- CODEOWNERS protects `.github/`, `.claude/`, `docs/agents/`, `CLAUDE.md`.

## Keeping the AI's quality up

- Fill in `CLAUDE.md` and each app's coding standard; add a line to "Known pitfalls" whenever the AI or a
  person makes a memorable mistake.
- Review the reasons behind `## Needs human` and the defects found at G3 every month; propose skill fixes
  to the central repo.

## High risk

`risk:high` issues: the person doing G3 is not the person who merges; add a security and migration review.

## In the sprint

Sprint cadence and events: [Scrum process](/en/scrum).

| Event | Your part |
|---|---|
| Sprint 0 | Architecture, coding standards, branch protection, CODEOWNERS ([`--check`](/en/setup-guide)) |
| Refinement | Assess technical risk, decide size and the `human-code` flag (`refine --batch`) |
| Planning | Identify stories a person must code; check review capacity |
| During the sprint | Architecture, G2, G3, G4; keep the fixed review slots |
| As AI Enablement | Skills, coding standards, MCP, agent workflow, AI cost; repeated technical AI errors (`sprint retro`); see [AI Enablement](/en/roles/ai-enablement) |

<!-- role-skills:start -->
## Your skills

Generated from `skills/catalog.json`. In Claude Code use the command in column 3; on GitHub, comment the sentence in column 4 (works even if skills are not preloaded).

| Skill | Purpose | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Routes by status label; per-role work queue | `/dev-pipeline <#>` | `@claude read .claude/skills/dev-pipeline/SKILL.md and follow it for issue #<number>` |
| `refine` | Epic analysis (default); batch refinement, S–XL sizes, human-code flag (`--batch`) | `/refine --batch` | `@claude read .claude/skills/refine/SKILL.md and follow it in --batch mode for issue #<number>` |
| `test-design` | Test cases and plan before coding (default); helps the G2 signer (`--approve`) | `/test-design <#> --approve` | `@claude read .claude/skills/test-design/SKILL.md and follow it in --approve mode for issue #<number>` |
| `pr-review` | Two-pass PR review in a separate session (default); Designer compares UI with Figma (`--design`) | `/pr-review <#>` | `@claude read .claude/skills/pr-review/SKILL.md and follow it for issue #<number>` |
| `merge-gate` | Refutation brief for G3 (default); pre-merge check for G4 (`--merge`) | `/merge-gate <#>  ·  --merge` | `@claude read .claude/skills/merge-gate/SKILL.md and follow it in --merge mode for issue #<number>` |
| `hotfix` | Emergency production fix | `/hotfix <#>` | `@claude read .claude/skills/hotfix/SKILL.md and follow it for issue #<number>` |
| `sprint` | Scrum events: `plan`, `daily`, `review`, `retro`, `report`, `release` | `/sprint plan|daily|review|retro|report|release` | `@claude read .claude/skills/sprint/SKILL.md and follow it for issue #<number>` |
<!-- role-skills:end -->
