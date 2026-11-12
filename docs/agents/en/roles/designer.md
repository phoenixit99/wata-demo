# Guide for the Designer

## Your work in the process

| When | You do | Done when |
|---|---|---|
| An issue changes UI | Provide a **link to the specific Figma frame** (not the whole file) in the Design section | The link opens the right frame |
| Designing | Cover every state: default, loading, error, empty, long text, different permissions | The AI does not have to guess |
| The AI asks about the design | Answer in the issue or PR comments | — |
| **Reviewing the UI** | Run `/pr-review --design <number>` (or comment `@claude`): it compares staging or the write-up screenshots with Figma and lists deviations; you decide what must be fixed | `## Design review: OK` or `## Design review: CHANGES` |
| A large feature | Take part in Step 0 when `## Feature analysis` says design work is needed | Frames exist before child issues are created |

## Helping the AI build the design faithfully

- Use the design system's components and tokens (colour, spacing, typography); the AI maps to the tokens
  already in the code. Values off-token are rounded to the nearest token and noted for you to confirm.
- Name layers meaningfully; use auto-layout.
- Give the team's Figma MCP account view access to the file.

## In the sprint

Sprint cadence and events: [Scrum process](/en/scrum).

| Event | Your part |
|---|---|
| Sprint 0 | Build and describe the design system (`docs/design-system.md`) |
| Refinement | Write UI briefs for UI stories |
| Design approval | Brief, options, refine Figma; record `## Design approval` (`design-brief`) in the first 1–2 sprint days |
| Review | Compare the built UI (`pr-review --design`) |

<!-- role-skills:start -->
## Your skills

Generated from `skills/catalog.json`. In Claude Code use the command in column 3; on GitHub, comment the sentence in column 4 (works even if skills are not preloaded).

| Skill | Purpose | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Routes by status label; per-role work queue | `/dev-pipeline <#>` | `@claude read .claude/skills/dev-pipeline/SKILL.md and follow it for issue #<number>` |
| `design-brief` | UI brief from the design system, options, design approval before coding | `/design-brief <#>` | `@claude read .claude/skills/design-brief/SKILL.md and follow it for issue #<number>` |
| `pr-review` | Two-pass PR review in a separate session (default); Designer compares UI with Figma (`--design`) | `/pr-review <#> --design` | `@claude read .claude/skills/pr-review/SKILL.md and follow it in --design mode for issue #<number>` |
<!-- role-skills:end -->
