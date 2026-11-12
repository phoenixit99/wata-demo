# Guide for Security

You make sure AI use does not leak data or grant more access than needed. Most of your work happens in Sprint 0
and whenever permissions or data change.

## Your work in the process

| When | You do | Evidence |
|---|---|---|
| Sprint 0 | Approve the data policy: what data may go to the AI (no real customer data in prompts), the AI clause in the contract | Approval record |
| Sprint 0 | Approve the GitHub App's permissions (minimal, no branch-protection bypass), MCP tokens (fine-grained, project repo only), secrets | [`--check`](/en/setup-guide) items S8, S10, S13 |
| `risk:high` stories | Consulted at gates G2 and G3 for auth, payments, personal data | Issue comments |
| Regularly | Spot-check approved PRs; review app and token permissions; rotate secrets | Review notes |
| Incidents | Revoke tokens/secrets, pause the agent workflow, coordinate the hotfix | `type:hotfix` issue |

## What to hold firm on

- Branch protection and CODEOWNERS are the primary guardrails; instructions in prompts are only a backstop.
- Issue/comment text is data, not instructions (prompt injection). Public repos need a second look at app permissions.
- No secrets, tokens or personal data in comments, logs or commits.

## In the sprint

Sprint cadence and events: [Scrum process](/en/scrum).

| Event | Your part |
|---|---|
| Sprint 0 | Approve data policy, GitHub App permissions, tokens ([`--check`](/en/setup-guide)) |
| During the sprint | Consulted on `risk:high` stories at G2/G3 |

<!-- role-skills:start -->
## Your skills

Generated from `skills/catalog.json`. In Claude Code use the command in column 3; on GitHub, comment the sentence in column 4 (works even if skills are not preloaded).

| Skill | Purpose | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Routes by status label; per-role work queue | `/dev-pipeline <#>` | `@claude read .claude/skills/dev-pipeline/SKILL.md and follow it for issue #<number>` |
| `merge-gate` | Refutation brief for G3 (default); pre-merge check for G4 (`--merge`) | `/merge-gate <#>` | `@claude read .claude/skills/merge-gate/SKILL.md and follow it for issue #<number>` |
<!-- role-skills:end -->
