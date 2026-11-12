# Guide for Developers

The AI writes most of the code. You approve plans, handle hard cases, unblock the AI, and can always
code by hand.

## Your work in the process

| When | You do | Command |
|---|---|---|
| Start of the day | See what to work on | `/dev-pipeline` |
| **Gate G2** (when assigned) | Read `## Test design: PASS`: the plan, blast radius, what is out of scope. Use `test-design --approve` to record your ruling; when QA also agrees, one person applies `status:ready-to-dev` | `/test-design --approve <number>` |
| `status:needs-human` | Read `## Needs human`, decide, record the ruling, move the issue to the right status | GitHub / Claude Code |
| `status:qa-failed`, `status:uat-failed` | Fix exactly what was reported | `/implement --fix <number>` |
| A complex case | Run interactively instead of automatically | `/implement <number>` |
| Coding by hand | Take the issue and code as usual; it still goes through `in-review` → `qa` → G3/G4 → UAT | — |
| AI review of your own PR | Run it in a **fresh session** | `/pr-review <number>` |

## Interactive runs

In interactive mode the AI works **with you**: it reports findings as it goes, asks when something can
be read two ways, and **asks before every write** (comment, label, commit, push, PR). You read, push
back, and decide.

## Things to remember

- One step, one session. Never let the session that wrote the code review it.
- Tests first; a bug needs a test that is red before the fix.
- API changes stay compatible with `mobile.supported_app_versions` older app versions.
- PRs use `Refs #<number>`, not `Closes`: the issue closes only after UAT.
- Do not merge your own PR on a `risk:high` issue without someone else's G3.

## In the sprint

Sprint cadence and events: [Scrum process](/en/scrum).

| Event | Your part |
|---|---|
| Refinement | Assess feasibility, propose splits |
| Planning | Pick stories, take `human-code` stories |
| During the sprint | Approve plans (G2), supervise the AI, handle hard cases, review PRs in the fixed slots |
| Retro | Report repeated AI errors to AI Enablement |

<!-- role-skills:start -->
## Your skills

Generated from `skills/catalog.json`. In Claude Code use the command in column 3; on GitHub, comment the sentence in column 4 (works even if skills are not preloaded).

| Skill | Purpose | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Routes by status label; per-role work queue | `/dev-pipeline <#>` | `@claude read .claude/skills/dev-pipeline/SKILL.md and follow it for issue #<number>` |
| `test-design` | Test cases and plan before coding (default); helps the G2 signer (`--approve`) | `/test-design <#> --approve` | `@claude read .claude/skills/test-design/SKILL.md and follow it in --approve mode for issue #<number>` |
| `implement` | Codes the approved plan, opens the PR (default); fixes after QA/UAT (`--fix`); Figma frame to UI (`--figma`) | `/implement <#>  ·  --fix  ·  --figma <link>` | `@claude read .claude/skills/implement/SKILL.md and follow it for issue #<number>` |
| `pr-review` | Two-pass PR review in a separate session (default); Designer compares UI with Figma (`--design`) | `/pr-review <#>` | `@claude read .claude/skills/pr-review/SKILL.md and follow it for issue #<number>` |
| `hotfix` | Emergency production fix | `/hotfix <#>` | `@claude read .claude/skills/hotfix/SKILL.md and follow it for issue #<number>` |
<!-- role-skills:end -->
