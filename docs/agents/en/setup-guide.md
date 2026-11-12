# Project setup guide

For a project's Tech Lead and PM. Work through it in order; every section says how to check it.

## 0. Prerequisites

- [ ] The client's contract and data policy **allow AI** on the source code and test data
- [ ] The repo is on GitHub (in an organisation), with admin rights to configure branch protection, secrets and a GitHub App
- [ ] The repo should be private. If public, `wata-agent` only runs for issues opened by OWNER/MEMBER/COLLABORATOR, but review the GitHub App's permissions anyway
- [ ] Baseline numbers recorded for the last 1–2 sprints (lead time, bugs after release) for comparison after the pilot

## 1. Install the process into the repo

Go to the project repo and paste **one command**:

```bash
cd <project-repo>
curl -fsSL https://raw.githubusercontent.com/phoenixit99/wata-ai-process/main/scripts/bootstrap.sh | bash
```
It downloads the latest process into a temporary folder, copies the templates, skills and contract into the repo,
fills `repo:` in `.claude/project.yml` from `git remote origin`, then deletes the temporary folder. Needs `git`,
`curl`, `tar` and `python3`.

- Upgrade: `curl -fsSL https://raw.githubusercontent.com/phoenixit99/wata-ai-process/main/scripts/bootstrap.sh | bash -s -- --upgrade`
- Sprint 0 check: `curl -fsSL https://raw.githubusercontent.com/phoenixit99/wata-ai-process/main/scripts/bootstrap.sh | bash -s -- --check`
- Pin a version (recommended for a running project): put `WATA_REF=v1.5.0` before `bash`, e.g. `... | WATA_REF=v1.5.0 bash`
- Already cloned the process repo: `~/wata-ai-process/scripts/install.sh .` still works

After installing, **start Claude Code from the project folder itself** (`cd <project-repo> && claude`) so that
`/issue-create`, `/dev-pipeline`... are available. Started from another folder, they show `Unknown command`.

The script **never overwrites** configuration files that already exist (it lists what it skipped);
compare and merge those by hand. `--upgrade` overwrites only the core layer (skills, `docs/agents/*`,
`wata-*.yml` workflows, `labels.yml`).

Check: `.claude/skills/triage/SKILL.md`, `docs/agents/contract.md` and `.github/workflows/wata-agent.yml` exist.

## 2. Fill in the configuration

- [ ] `.claude/project.yml`: `repo`, `apps` (paths, stack, lint/typecheck/test/build commands that really work), `e2e`, `people`, `sla_hours`, `limits`
- [ ] `CLAUDE.md`: project description, how to run locally, known pitfalls
- [ ] Coding standards: adjust the copies in `docs/coding-standards/` (paths declared in `apps[].standard`)
- [ ] `.github/CODEOWNERS`: replace `@<org>/...` with real teams
- [ ] `.github/ISSUE_TEMPLATE/*.yml`: the app checkboxes match `project.yml`

Check: run every command in `apps[].commands` locally; all of them work.

## 3. GitHub App for the agent (required)

Events created with the default `GITHUB_TOKEN` **do not start new workflow runs** (except
`workflow_dispatch` and `repository_dispatch`). If the agent changed labels with `GITHUB_TOKEN`, the
next step would never run and nothing would report an error. So the agent uses a GitHub App token.
([GitHub Docs](https://docs.github.com/en/actions/concepts/security/github_token))

- [ ] Create a GitHub App at organisation level (one app shared by all projects is enough) with minimal permissions:
      Contents: read & write · Issues: read & write · Pull requests: read & write · Metadata: read ·
      Actions: read. **No** Administration permission, and not on any branch-protection bypass list.
- [ ] Install the app on the project repo
- [ ] Repo variable `WATA_APP_ID`. Repo secrets `WATA_APP_PRIVATE_KEY`, `ANTHROPIC_API_KEY`

Check: open a test issue and apply `status:backlog`; `wata-agent` runs triage, and when triage applies
`status:test-design` a new `wata-agent` run appears.

## 4. Check the Claude Code workflows

- [ ] The input names (`prompt`, `anthropic_api_key`, `github_token`, `claude_args`) were checked against
      `action.yml` of `anthropics/claude-code-action`. Re-check when upgrading the action.
- [ ] Try `@claude` on an issue: if the AI does not recognise a skill name, use the fallback sentence
      `@claude read .claude/skills/<skill>/SKILL.md and follow it for issue #<number>` (listed on every role page).
- [ ] Add toolchain setup (Node/pnpm, Flutter, Playwright) to `wata-agent.yml` where it says `TODO(project)`
- [ ] Skills are installed in `.claude/skills/`, so they are called directly as `/triage`. If
      you use the plugin form instead of copying, skill names get the `wata:` prefix and the workflow `prompt` must change accordingly.

## 5. Labels and board

```bash
~/wata-ai-process/scripts/setup-labels.sh <owner>/<repo>
```
- [ ] The `status:*`, `type:*`, `risk:*`, `priority:*`, `round:*` and `app:*` labels exist
- [ ] (Optional) A GitHub Projects board for viewing, columns by `status:*` label. The board is a view; labels are the source of truth

## 6. Server-side guardrails (required)

On the `main` branch (Settings → Branches or Rulesets):

- [ ] Require a pull request before merging
- [ ] Require approvals, with **Require review from Code Owners**
- [ ] Dismiss stale approvals when new commits are pushed
- [ ] Required status checks: the jobs in `ci.yml`
- [ ] Block force-pushes and branch deletion
- [ ] The agent's GitHub App cannot bypass

Check: try pushing straight to `main` with the app's token → rejected.

## 7. Each person's machine

- [ ] Install Claude Code; open the repo; `/dev-pipeline` shows the work queue
- [ ] Environment variable `GITHUB_MCP_TOKEN` (fine-grained PAT, this repo only) for the GitHub MCP
- [ ] Figma MCP: enable the Dev Mode MCP server in Figma Desktop. The address in `.mcp.json`
      (`http://127.0.0.1:3845/mcp`) should be checked against current Figma documentation
- [ ] `gh auth login` (skills use the `gh` CLI)

## 8. Pilot

1. Week one: only triage and test design (remove the other branches from the `case` in `wata-agent.yml`, or run interactively).
2. Enable implement and review once G2 runs smoothly.
3. Enable QA and UAT.
4. After 2–4 weeks: `/sprint report 30`, compare with the baseline, run a retro, send skill improvements back to the central repo.
