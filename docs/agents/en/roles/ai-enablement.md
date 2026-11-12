# Guide for AI Enablement

You keep the AI working well: skills, coding standards, MCP configuration, and analysis of repeated AI errors. At
project level you are the **process owner**. At company level, AI Enablement owns the central `wata-ai-process`
repository.

## Who holds it

In each project this role is **held jointly by the Tech Lead and the PO**, split by where errors come from. The
Tech Lead is accountable (A) for the AI platform; the PO owns the requirements side.

| | Tech Lead (technical side) | PO (requirements side) |
|---|---|---|
| Owns | Skills, coding standards, `CLAUDE.md`, MCP, the agent workflow, AI cost, process upgrades | DoR, issue and AC templates, requirement-writing guidance; keeps the design system usable for the AI with the Designer |
| Repeated AI errors caused by | The AI doing a step wrong, code off-standard, broken configuration | Vague requirements, missing AC, repeated `fail-to-dev`, UAT rejections because the AC missed the intent |
| Fixes in | Skills (proposed to the central repo), coding standards, "Known pitfalls" in `CLAUDE.md` | DoR, issue templates, `docs/writing-acceptance-criteria.md` (proposed), design system (with the Designer) |

List both in `people.ai_enablement` in `.claude/project.yml`. Watch the load: the PO's effort already rises in
requirements and refinement ([Scrum section 7](/en/scrum)); the PM makes sure the PO is not overloaded.

## Your work in the process

| When | You do | Tool |
|---|---|---|
| Sprint 0 | Configure MCP (GitHub, Figma, Playwright); choose the AI Figma tool; check the setup; coach the team on skills | [`--check`](/en/setup-guide) |
| Daily | Watch `status:needs-human` and agent workflow failures; fix broken configuration | GitHub Actions |
| Retrospective | Compile repeated AI errors; every error seen ≥ 2 times gets an action fixing a skill, coding standard or DoR | `/sprint retro` |
| A skill needs fixing | Open an issue/PR on the central repo; skills are core, never edited directly in the project's `.claude/skills/` | Central repo |
| Upgrading the process | Read the CHANGELOG, run the install command with `--upgrade`, update `process_version` | [Setup](/en/setup-guide) |
| AI cost | Track token cost with the PM, adjust `max_turns_per_run` | `project.yml` |

## Metrics

| Metric | Reference target | Mainly owned by |
|---|---|---|
| `needs-human` rate | Falling sprint over sprint | Tech Lead |
| First-round review pass rate | ≥ 60% | Tech Lead |
| Fail-to-dev rate | < 20% and falling | PO |
| UAT rejection rate | Falling | PO |
| Repeats after the retro | Errors with an action do not recur | Both |
| AI cost per story | Stable or falling | Tech Lead |

## Principles

- Fix causes, not symptoms: an error that recurs across projects is fixed in the core.
- Skill changes go through a reviewed PR with a changelog, like code; run `npm run sync` and `npm run check` in the central repo.
- Never loosen guardrails to make the AI "work"; guardrails belong to the Tech Lead and Security.

## In the sprint

Sprint cadence and events: [Scrum process](/en/scrum).

| Event | Your part |
|---|---|
| Sprint 0 | MCP, Figma tool, skills, team coaching ([`--check`](/en/setup-guide)) |
| Retro | Turn repeated AI errors into skill/standard fixes (`sprint retro`) |

<!-- role-skills:start -->
## Your skills

Generated from `skills/catalog.json`. In Claude Code use the command in column 3; on GitHub, comment the sentence in column 4 (works even if skills are not preloaded).

| Skill | Purpose | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Routes by status label; per-role work queue | `/dev-pipeline <#>` | `@claude read .claude/skills/dev-pipeline/SKILL.md and follow it for issue #<number>` |
| `sprint` | Scrum events: `plan`, `daily`, `review`, `retro`, `report`, `release` | `/sprint plan|daily|review|retro|report|release` | `@claude read .claude/skills/sprint/SKILL.md and follow it for issue #<number>` |
<!-- role-skills:end -->
