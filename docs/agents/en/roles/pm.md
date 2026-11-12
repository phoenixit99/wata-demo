# Guide for the PM (Project Manager)

When the AI writes the code, work tends to pile up in **people's queues** (plan approval, Needs human,
merge, UAT). Your job is to keep the flow moving: priorities, unblocking, reporting, risk and cost.

## Your work in the process

| Work | How |
|---|---|
| **Set priorities** | Apply `priority:p1` / `p2` / `p3` to `status:ready-to-dev` issues. The AI picks work by priority, then age, within the WIP limit |
| **WIP limit** | Set `limits.wip_in_progress` in `.claude/project.yml` (proposed 3). WIP above the team's review speed only piles up PRs |
| **Queue SLAs** | Agree `sla_hours` with the team. The `wata-sla-reminder` workflow pings owners every morning and mentions you |
| **Unblock** | Check `status:needs-human`, `status:blocked` and issues over SLA daily. Escalate or reassign |
| **Scope changes** | Criteria changed after `ready-to-dev`: have the issue updated and moved back to `status:backlog` for re-triage. Assess schedule impact |
| **Reporting** | Run `/sprint report 7` (internal) or `/sprint report 7 --client` (for the client) |
| **Releases** | Run `/sprint release <milestone>`; agree release scope, coordinate UAT with the PO and the deploy schedule with the Tech Lead |
| **AI cost** | Track token cost per project; set `limits.max_turns_per_run` and a monthly budget (proposed, team decides) |
| **Adoption** | Complete the [setup guide](/en/setup-guide) checklist with the Tech Lead; record baseline numbers before the pilot |

## Metrics to watch weekly

- **Time waiting on people** versus lead time: high means not enough reviewers, not a slow AI.
- **Fail-to-dev rate** high → help the PO/BA write requirements.
- **Needs human** rising → skills need improving; take it to the retro.
- **UAT rejections** high → criteria do not capture what the PO meant.

## Planning with an AI on the team

- Coding time drops, but **review, manual QA and UAT still take people's time**. Estimate by the slowest stage, not by how fast the AI writes code.
- Reserve Tech Lead capacity every day for signing G2/G3/G4.

## Holding several roles

You may also be the PO, but never sign two consecutive gates for the same issue.

## In the sprint

Sprint cadence and events: [Scrum process](/en/scrum).

| Event | Your part |
|---|---|
| Sprint 0 | Labels, board, CI, access, baseline numbers ([`--check`](/en/setup-guide)) |
| Planning | Compute capacity from review/QA, agree scope (`sprint plan`) |
| Daily | Blocked work and queues (`sprint daily`) |
| Review | Demo notes with the PO (`sprint review`) |
| Retro | Facilitate, track improvement actions (`sprint retro`) |

<!-- role-skills:start -->
## Your skills

Generated from `skills/catalog.json`. In Claude Code use the command in column 3; on GitHub, comment the sentence in column 4 (works even if skills are not preloaded).

| Skill | Purpose | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Routes by status label; per-role work queue | `/dev-pipeline <#>` | `@claude read .claude/skills/dev-pipeline/SKILL.md and follow it for issue #<number>` |
| `sprint` | Scrum events: `plan`, `daily`, `review`, `retro`, `report`, `release` | `/sprint plan|daily|review|retro|report|release` | `@claude read .claude/skills/sprint/SKILL.md and follow it for issue #<number>` |
<!-- role-skills:end -->
