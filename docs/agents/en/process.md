# AI Agent Software Development Process — v1.5

WATA Software · Internal document · English translation of the canonical Vietnamese process ([Tiếng Việt](/process)).

This document is for **everyone who takes part in software development**: PO, BA, PM, Designer,
Developer, Tech Lead, QA, AI Enablement, Security. Sprint cadence, events and estimation are in the [Scrum process](/en/scrum). If you only need your own part, start with your page under
[role guides](/en/roles/po). Technical setup is in the [setup guide](/en/setup-guide); the rules
for the AI are in the [agent contract](/en/contract).

---

## Changes

| Version | Main changes |
|---|---|
| 1.4 | The [Scrum process](/en/scrum) joins the same process set: UI design approval is a G2 condition for UI stories; WIP limits for the review and QA queues; `size:*` and `human-code` labels; AI Enablement (process owner), Security and customer roles; [Definition of Done](/en/definition-of-done); 7 skills for Scrum events. |
| 1.3 | Every role has its own skills (adds `test-design --approve`, `pr-review --design`, `qa --manual`, `uat --run`, `sprint release`); the skill catalog is the single source, with a consistency checker. |
| 1.2 | Adds the PM role, Step 0 (feature analysis), UAT, the hotfix flow, risk tiers, RACI, SLAs for human queues, role guides. Steps 7 and 8 are explicitly human work. Status is held in `status:*` labels. |
| 1.1 | 11 improvements: review in a separate session, test design before code, human gates G2/G3, Needs human and Blocked states, R11, server-side guardrails, shared contract, prompt-injection rule, API backward compatibility, honest QA reporting, company-wide adoption. |
| 1.0 | First version (16-10-2026). |

---

## 1. Summary

The AI agent (Claude) does most of the repetitive work: checking requirements, designing tests,
writing code, reviewing, running automation and drafting reports. **People make the decisions** at
five gates: confirming the request (G1), approving the plan (G2), refutation (G3), merge (G4) and
UAT acceptance (G5).

| Item | Content |
|---|---|
| Goal | Shorten the time from request to working feature; standardise code and test quality |
| Scope | Company-wide. The core process is the same everywhere; stack, build commands and coding standards are declared per project |
| Tools | GitHub (Issues, PRs, Actions, Projects), Claude Code + skills, MCP for GitHub/Figma/Playwright |
| Controls | Status labels, Definition of Ready, a fresh AI session per step, five human gates, CI + branch protection |

## 2. Structure

The process lives in the central repository `wata-ai-process` (this site's source). Each project
installs it with one command (see [Setup](setup-guide.md)). Reference layout of a project:

```
<project>/
├── apps/{web,admin,api,mobile}/   App code
├── packages/shared/               Shared contract (types)
├── e2e/                           Playwright + test-case tables
├── docs/agents/                   Contract and process docs (copied by the installer)
├── .claude/
│   ├── skills/                    Process skills (copied, version-pinned)
│   ├── project.yml                Project configuration
│   └── settings.json              permissions.deny: backstop
├── .github/                       Issue/PR templates, CODEOWNERS, labels, workflows
├── .mcp.json                      GitHub, Figma, Playwright
└── CLAUDE.md                      General instructions for the AI
```

## 3. Tools

- **MCP:** GitHub (issues, labels, comments, PRs), Figma (read designs), Playwright (drive a browser).
- **Skills:** every step and every role has skills; the full list is the [skill catalog](/en/skills), generated from `skills/catalog.json`.
- **Automatic runs:** the `wata-agent` workflow runs exactly one skill, in a fresh session, whenever an issue gets the matching `status:*` label. Labels changed by the agent must use a GitHub App token, because events created with `GITHUB_TOKEN` do not start new workflow runs.
- **Interactive runs:** a developer types `/dev-pipeline <issue>` in Claude Code; the router picks the right step.
- **People who do not use the CLI (PO, BA, PM, QA, Designer):** work on GitHub. Create issues from templates, comment `@claude <request>` (workflow `wata-mention`), and change labels at their own gates.

## 4. Status flow

The full label table is in the [agent contract](/en/contract), section 1. In short:

```
                      ┌──────────── fail-to-dev ◄──┐
                      │                            │ missing information
 (G1) ──► backlog ────┼──► test-design ──(G2)──► ready-to-dev ──► in-progress ──► in-review
                      │         │                                    ▲   │  ▲          │
                      └► blocked└► fail-to-dev        request changes└───┘  │          ▼
                                                                            │  qa ──► qa-failed
   needs-human ◄── (any AI step: 3 rounds used up / decision needed)        └───────────┘
                                                                     qa-passed
                                                                        │ (G3) refutation
                                                                        │ (G4) merge
                                                                        ▼
                                                    uat ──(G5)──► done
                                                     └──► uat-failed ──► in-review
```

## 5. Definition of Ready

The AI moves an issue to `status:test-design` only when every mandatory condition holds. Otherwise
it moves to `status:fail-to-dev` with the list of gaps and **ready-to-paste replacement wording**;
an issue blocked by R8 moves to `status:blocked`.

| # | Condition | Mandatory |
|---|---|---|
| R1 | Someone is assigned | Yes |
| R2 | The title says concretely what changes | Yes |
| R3 | The description explains the problem and why (user story encouraged) | Yes |
| R4 | Acceptance criteria with at least one criterion | Yes |
| R5 | Every criterion is testable: an action and an observable result, no vague words | Yes |
| R6 | Affected apps are identified | Yes |
| R7 | No TBD, "???" or unfilled template text | Yes |
| R8 | Not blocked by an unfinished issue | Yes (blocked → `blocked`) |
| R9 | Bugs: steps to reproduce, expected and actual result | Yes (bugs) |
| R10 | API changes describe request/response. UI stories have a UI brief; **the Figma frame must be approved (`## Design approval: APPROVED`) before gate G2** | Yes (UI stories); recommended (API) |
| R11 | Duplicates and issues changing the same code were searched for; any found are linked with an order | Yes |

How to write criteria: [Writing acceptance criteria](/en/writing-acceptance-criteria).

## 6. Steps in detail

Every step the AI runs is **a separate session**. Steps 7, 8 and the acceptance part of step 9 are
human work; the AI only prepares material.

| Step | Who leads | Skill | Trigger | Output |
|---|---|---|---|---|
| 0. Feature analysis | BA + Tech Lead | `refine` | issue `type:epic` | `## Feature analysis`, proposed child issues |
| 1. Create issue | PO/BA, AI drafts | `issue-create` | on demand | well-formed issue body, `status:backlog` |
| 2. Triage | AI | `triage` | `status:backlog` | `## Triage: PASS/FAIL/BLOCKED` |
| 3. Test design + plan | AI drafts, people approve | `test-design` | `status:test-design` | `## Test design: PASS/FAIL` |
| 3. Gate G2 | Tech Lead, Dev, QA | `test-design --approve` | on demand | `## Plan approval` |
| 4. Code + PR | AI | `implement` | `status:ready-to-dev` | PR, `## Build write-up` |
| 5. Code review | AI, fresh session | `pr-review` | `status:in-review` | `## Code review: PASS/FAIL/HOLD` |
| 5. Design review | Designer | `pr-review --design` | on demand | `## Design review: OK/CHANGES` |
| 6. QA | AI | `qa` | `status:qa` | `## QA report: PASS/FAIL/PENDING` |
| 6. Manual/mobile QA | QA | `qa --manual` | on demand | `## QA manual results` |
| 6b. Fix after QA/UAT | Dev + AI | `implement --fix` | developer | `## QA fix` |
| 7. Refutation (G3) | Reviewer | `merge-gate` prepares | `status:qa-passed` | `## Refutation brief` |
| 8. Merge (G4) | Tech Lead | `merge-gate --merge` checks | on demand | `## Merge readiness` |
| 9. UAT (G5) | PO | `uat` prepares | `status:uat` | `## UAT checklist` |
| 9. Acceptance | PO | `uat --run` | on demand | `## UAT: ACCEPTED/REJECTED` |
| Release | PM, Tech Lead | `sprint release` | on demand | release plan (no issue comment) |
| Reporting | PM | `sprint report` | on demand | weekly report (no issue comment) |

### Step 0: Feature analysis (for large work)

- Used when a request is bigger than one issue: several apps, several screens, or a product/architecture decision.
- The AI reads the relevant code, challenges the request (what is the real problem, what is the simplest solution, what happens if we do nothing) and proposes at least two architectures with the weaknesses of each.
- **The API contract is frozen before child issues are created**, so no app builds against a moving contract.
- Output: `## Feature analysis` and proposed child issues. Child issues are created only after the PO and Tech Lead agree.

### Step 1: Create the issue

- The PO/BA describes the need in plain language (in Claude Code, or with `@claude` on GitHub); the AI drafts it from the template: Description, Acceptance Criteria, Affected apps, Design, Technical notes.
- Anything the AI had to assume is marked `[Assumption]` for the PO to confirm.
- **Gate G1:** the PO confirms the content and applies `status:backlog`.

### Step 2: Triage

- The AI checks R1–R11, including the duplicate search, and proposes a risk tier (`risk:*`).
- Pass → `status:test-design`. Gaps → `status:fail-to-dev` with replacement wording. Blocked → `status:blocked`.

### Step 3: Test design and plan

- The AI derives test cases from each criterion: main flow, invalid data, boundaries, state changes, cross-app sync, and **what must not happen**.
- IDs `TC-<issue>-<n>`, priority P1–P3, type `auto` / `manual` / `mobile`.
- A table **criterion → files to change → test case**, the blast radius, and what is deliberately out of scope.
- The test-case table is saved in `e2e/test-cases/<issue>.md` and summarised on the issue.
- **Gate G2:** the Tech Lead/Dev approves the plan and QA approves the test cases (skill `test-design --approve` helps); UI stories need `## Design approval: APPROVED` (Designer + PO/customer, skill `design-brief`). Then **a person** applies `status:ready-to-dev`.
- Stories labelled `human-code` are coded by a person; the agent does not run implement.

### Step 4: Code and pull request

- Branch from the latest `main`; implement the approved plan; shared contract → API → web/admin → mobile.
- Tests first; for a bug, the test is **red before the fix and green after**.
- Lint, typecheck, unit tests and build pass before the PR opens. The PR body carries `Refs #<issue>`.
- Stuck, or facing a decision that is not the AI's → `status:needs-human`.

### Step 5: Code review (fresh session)

- A new session, never the one that wrote the code. Two passes: read the diff against the checklist; **try to refute the write-up**.
- Nine criteria: acceptance criteria, correctness, coding standard, contract (including **backward compatibility with older mobile app versions**), security, tests, performance, design, verification (build ran on the head commit, claims have evidence).
- A Designer can run `pr-review --design`; "must fix" items count as Major.
- Blocker/Major → `status:in-progress`. At most 3 rounds, then `status:needs-human`. Pass → `status:qa`.

### Step 6: QA

- The AI writes and runs Playwright for `auto` cases; test names start with the test-case ID.
- Failures are classified: test defect, product defect, environment problem. Tests are never weakened to go green when the product is wrong.
- `manual` and `mobile` cases: QA runs them with `qa --manual`, which records `## QA manual results`. **QA passes when automation passes and every P1 manual/mobile case has passed.** If manual results are missing, the AI posts `## QA report: PENDING`.
- Three-part footer: run / read only / still a claim.

### Step 6b: Fix after QA or UAT

- `status:qa-failed`: the AI tried 3 rounds without success; **a developer** fixes it (optionally with `implement --fix`).
- `status:uat-failed`: the PO did not accept; fix exactly what the PO listed.
- After the fix → `status:in-review`, reviewed again in a fresh session.

### Step 7: Refutation (G3)

- The AI drafts `## Refutation brief`: each claim with its evidence, the riskiest diff hunks, and tests that could not be run.
- The reviewer reads it **to find what is wrong** and comments `## G3: OK` or `## Code review: FAIL`. It can be combined with step 8 when it is the same person, except for `risk:high` issues.
- `risk:low` issues skip G3 (see [risk tiers](/en/risk-tiers)).

### Step 8: Merge (G4)

- The Tech Lead runs `merge-gate --merge`: CI green on the head commit, CODEOWNERS approval, all PASS headings present.
- A person merges. Branch protection blocks anything that is missing. The issue moves to `status:uat` (it is not closed).

### Step 9: UAT (G5)

- After the staging deploy, the AI drafts `## UAT checklist` from the criteria in user language.
- The PO checks on staging (skill `uat --run` walks through it), comments `## UAT: ACCEPTED` and applies `status:done` (closes the issue), or `## UAT: REJECTED` with what failed and applies `status:uat-failed`.
- Something the criteria never mentioned is a **new issue**, not a UAT failure.

### Hotfix flow

- A serious production defect: issue `type:hotfix`, `risk:high` by default.
- **May be shortened:** no wait for automatic triage (the Tech Lead triages directly), G2 folded into the start, G3 and G4 combined, UAT after release.
- **Never skipped:** a reproducing test (red then green), code review in a fresh session, green CI, a person merges.
- Skill `hotfix` guides the whole flow; after release there must be an issue tracking the root cause.

## 7. Risk tiers

Not every change needs all five gates. Details and thresholds (proposed): [risk tiers](/en/risk-tiers).

| Tier | Examples | May skip |
|---|---|---|
| `risk:low` | Text fixes, small style changes, chores with no behaviour change | G3; a lighter G2 (Tech Lead only, no QA) |
| `risk:standard` | Features, ordinary bugs | Nothing |
| `risk:high` | Auth, payments, migrations, contract changes | Nothing; G3 by someone other than the merger; extra security review |

## 8. Coding standards

Each stack has a standard ([Next.js](/en/coding-standards/nextjs), [NestJS](/en/coding-standards/nestjs),
[Flutter](/en/coding-standards/flutter)) that is copied into the project and adjusted by its Tech Lead.
The AI reads it before coding and uses it when reviewing. Shared conventions: Conventional Commits,
branch names per the contract, a PR template with a checklist, CI running lint/test/build/automation.

**API backward compatibility:** mobile apps ship on their own store cadence. Never remove or retype a
response field that an older app still uses; only add fields, or version the endpoint. The number of
supported app versions is declared in `mobile.supported_app_versions`.

## 9. Roles

Each role has a guide under [role guides](/en/roles/po); who does what in each status is in [RACI](/en/raci).

| Role | Main work | Gates signed | AI support |
|---|---|---|---|
| PO | Requirements, criteria, product priorities, acceptance | G1, G5 | Drafts issues, flags gaps, prepares and runs UAT |
| BA | Feature analysis, splitting work, clarifying the business | G1 (when delegated by the PO) | Feature analysis, proposed child issues |
| PM | Planning, queue priority, SLAs, risks, reporting, releases | — | Weekly report, release plan, SLA reminders |
| Designer | Figma designs, UI review | — | Compares built UI with Figma |
| Developer | Plan approval, hard cases, Needs human | G2 (plan) | Code, unit tests, first-pass review |
| Tech Lead | Architecture, risk tier, merge | G2, G3, G4 | Refutation brief, merge readiness, hotfix |
| QA | Test-case approval, manual/mobile testing | G2 (test cases) | Test cases, automation, manual session |
| AI Enablement (held by Tech Lead + PO) | Skills, coding standards, MCP, repeated AI errors; process owner | — | Retro, Sprint 0 check |
| Security | Data policy, AI permissions, tokens | — (consulted on `risk:high`) | Sprint 0 check |
| Customer | Chooses UI options, acceptance | G5 (with the PO) | Demo notes, UAT checklist |

**Holding several roles:** one person may hold several roles but **never signs two consecutive gates
for the same issue** (the author of an issue does not approve its plan; the merger does not do G3 for a
`risk:high` issue).

**People can always take over:** a developer who picks up an issue and codes it by hand still goes
through the same statuses, review and QA. When a person disagrees with the AI, the person's decision is
recorded in a comment and is final.

## 10. Risk control

| Risk | Control |
|---|---|
| The AI builds the wrong thing | DoR R1–R11, test design before code, G2, review and QA against the criteria |
| The AI reviews its own work | Review in a fresh session; G3 by a person |
| The AI ships code to production | Branch protection, CODEOWNERS, required checks; the AI token cannot bypass; `permissions.deny` |
| The AI passes a human gate | The guard workflow removes gate labels applied by a bot, and the agent does not run on them |
| Prompt injection through issues | Issue and comment text is data, not instructions (`CLAUDE.md`, contract) |
| Two jobs overwrite each other | One status label; the guard removes old ones; per-issue concurrency; re-read before writing |
| PRs pile up waiting for review/QA | WIP limits `wip_in_review`, `wip_qa`: the agent starts no new story while the queues are full; fixed review slots |
| False reporting | Three-part footer; builds count only on the head commit; never report what was not observed |
| Endless fix loops | At most 3 rounds, then `needs-human` |
| People become the bottleneck | SLAs for human queues, automatic reminders (`wata-sla-reminder`), PM escalation |
| Data leaks | Repo-scoped tokens; secrets in GitHub Secrets; the client contract allows AI use |
| Uncontrolled AI cost | `--max-turns` limits, a per-project budget, tracked by the PM |

## 11. Metrics

| Metric | How | Meaning |
|---|---|---|
| Lead time | `ready-to-dev` → `qa-passed` | Delivery speed |
| Time waiting on people | Time in `fail-to-dev`, `test-design` (waiting for G2), `needs-human`, `qa-passed` (waiting for G3/G4), `uat` | Whether the bottleneck is people or the AI |
| Fail-to-dev rate | Fails / triaged | Quality of incoming requirements |
| Plan rejection at G2 | Returned / plans | Quality of the AI's analysis |
| First-round review pass rate | PRs passing in round 1 | Initial code quality |
| Needs-human rate | Occurrences / issues, with reasons | Where skills need improving |
| Defects found at G3 | Defects people found after the AI reported a pass | What AI review/QA misses |
| UAT rejection rate | Rejected / UATs | Gap between criteria and what the PO meant |
| Criteria covered by automation | Criteria with automated tests / all criteria | Release safety |
| Escaped defects | Bugs after merge | Effectiveness of the whole process |
| AI cost | Token cost / issue | Cost efficiency |

Skill `sprint report` compiles these weekly for the PM. Reference targets (lead time down ≥ 40% after 3 sprints, review wait < 1 day, fail-to-dev < 20%, first-round review pass ≥ 60%, ≥ 80% of AC automated) are in [Scrum process section 8](/en/scrum).

## 12. Company-wide adoption

| Layer | Contains | Owner | Can a project change it? |
|---|---|---|---|
| Core | Statuses, DoR, DoD, five gates, guardrails, contract, report format, process skills, `wata-*` workflows, labels | Company-level AI Enablement (process owner) | No; differences need an approved exception |
| Configuration | Tracker, apps and stacks, build commands, coding standards, supported app versions, gate signers, SLAs | Project Tech Lead + PM | Yes, within the `project.yml` schema |
| Extensions | Project-specific skills, extra review criteria | Project Tech Lead | Only additions; never loosen the core |

- GitHub is the reference implementation. Projects on a client's tracker (Azure DevOps, Jira) keep the core; the tracker read/write parts of the skills must be rewritten.
- Projects **pin a version** (`process_version`) and upgrade deliberately. Core changes go through a PR to the central repo, with a changelog and semver (patch: small fix; minor: new step or criterion; major: status flow or label/heading changes).
- Lessons flow back: a monthly retro on Needs human, defects found at G3, UAT rejections and escaped defects. Causes that recur across projects are fixed in the core.
- Anyone can propose a process change with an issue on the central repo.

**Adoption prerequisites:** see the checklist in the [setup guide](/en/setup-guide).

**Roadmap:**

1. Foundation: central repo, contract, templates, triage running on a sample repo.
2. Pilot with 1–2 projects: enable triage → test design → implement → review → QA → UAT step by step; compare metrics with the baseline.
3. Standardise: fix skills from pilot lessons, release a stable version, train each role.
4. Roll out: new projects adopt from day one; running projects migrate gradually.

**Open questions:**

- Who holds the company-level AI Enablement role (process owner)?
- Are projects on a client's tracker in scope for the first phase?
- The SLAs, WIP limit, AI budget and risk thresholds in these documents are **proposals**; the team decides before the pilot.
