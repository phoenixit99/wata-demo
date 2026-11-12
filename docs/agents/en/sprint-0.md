# Sprint 0: foundation

Once per project, about 1–2 weeks, before sprint 1. Goal: the AI works to standard from the first sprint. This
one-off investment is reused in every later sprint ([Scrum process, section 6.1](/en/scrum)).

## Who does what

| Role | Work | Output |
|---|---|---|
| Tech Lead | Choose the architecture; adapt coding standards per stack; install the process; branch protection, CODEOWNERS | `project.yml`, coding standards, `CLAUDE.md` |
| PM | Set up labels, board, CI, access; record baseline numbers; agree response SLAs with the customer | Labels, board, baseline |
| Security | Approve the data policy (what data may go to the AI), tokens and the GitHub App's permissions, the AI clause in the contract | Approval record |
| Designer | Build and describe the **design system** in a form the AI can read (colours, fonts, spacing, components, layout rules, UX principles); prepare a sample brief | `docs/design-system.md` |
| AI Enablement | Configure MCP (GitHub, Figma, Playwright); trial and choose the tool for AI to create/write designs in Figma; coach the team on skills | `.mcp.json`, tool notes |
| PO/BA | Prepare the initial backlog from the template; agree DoR/DoD | First backlog |
| AI | Scaffold the monorepo, CI, issue/PR templates (one-line install); draft coding standards; check the checklist (`--check`) | Repository, Sprint 0 report |

## Checklist

Run the install command with `--check` to check automatically what commands can check. Detailed installation steps are in the
[setup guide](/en/setup-guide).

- [ ] Process installed, `process_version` matches
- [ ] `.claude/project.yml` complete: apps, working build commands, `people` for every role, SLAs, WIP limits
- [ ] Coding standard per app adapted; `CLAUDE.md` filled in
- [ ] Design system complete and approved by the Designer
- [ ] Labels created; board (optional)
- [ ] Branch protection, CODEOWNERS, required checks; the GitHub App cannot bypass
- [ ] Secrets and variables for the GitHub App and Anthropic
- [ ] MCP works on everyone's machine; Figma creation tool chosen (or recorded that the Designer builds frames)
- [ ] Security approved the data policy and access
- [ ] The team agreed the DoR (R1–R11) and the [Definition of Done](/en/definition-of-done)
- [ ] Baseline numbers from the last 1–2 sprints (or a similar project)

## Quality gate

Tech Lead and Security sign off the standards and access; the Designer signs off the design system. No sprint 1
before these sign-offs.
