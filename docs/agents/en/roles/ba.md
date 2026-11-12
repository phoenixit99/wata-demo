# Guide for the BA (Business Analyst)

You turn business needs into buildable requirements: analysing features, splitting work, clarifying
the business rules.

## Your work in the process

| When | You do | Tool | Done when |
|---|---|---|---|
| A large feature (epic) | Open an epic issue; run (or ask a developer to run) `/refine <number>`, or comment `@claude analyse this epic with the refine skill` | GitHub / Claude Code | `## Feature analysis` exists |
| After the analysis | Agree the direction, API contract and child issues with the PO and Tech Lead | GitHub comments | PO and Tech Lead agree |
| Child issues | Use `/issue-create` or the template; link back to the epic ("Part of #<epic>") | GitHub / Claude Code | Issue has full criteria; the PO applies `status:backlog` (G1) |
| `status:fail-to-dev` on business rules | Fill the gaps listed by triage | GitHub | Within SLA |
| `## Needs human` about business rules | Answer and give the reason | GitHub | — |
| When delegated by the PO | Sign gate G1 for the PO | GitHub | — |

## Splitting child issues well

- Each issue **fits in one reviewable PR** (usually a few hundred changed lines at most).
- Order: shared contract → API → web/admin → mobile. Later issues state their dependency on earlier ones.
- Each issue has its own criteria and can be tested on its own.
- **Freeze the API contract first**, before the apps start, so nobody builds against a moving contract.

## Using Claude Code (recommended for BAs)

```
/refine 120        # analyse epic #120
/issue-create <text>  # draft a child issue
/dev-pipeline                # today's work queue
```

## In the sprint

Sprint cadence and events: [Scrum process](/en/scrum).

| Event | Your part |
|---|---|
| Refinement | Clarify business rules, split stories, propose AC (`refine --batch`) |
| Planning | Explain stories to the team |
| Sprint Review | Capture feedback, prepare new stories |

<!-- role-skills:start -->
## Your skills

Generated from `skills/catalog.json`. In Claude Code use the command in column 3; on GitHub, comment the sentence in column 4 (works even if skills are not preloaded).

| Skill | Purpose | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Routes by status label; per-role work queue | `/dev-pipeline <#>` | `@claude read .claude/skills/dev-pipeline/SKILL.md and follow it for issue #<number>` |
| `issue-create` | Drafts a well-formed issue from plain language | `/issue-create <#>` | `@claude read .claude/skills/issue-create/SKILL.md and follow it for issue #<number>` |
| `refine` | Epic analysis (default); batch refinement, S–XL sizes, human-code flag (`--batch`) | `/refine <#>` | `@claude read .claude/skills/refine/SKILL.md and follow it for issue #<number>` |
<!-- role-skills:end -->
