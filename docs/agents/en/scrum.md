# Scrum with AI Agents — v1.1

WATA Software · Internal document · Roles, stages, quality gates and how effort shifts compared with
traditional Scrum. ([Tiếng Việt](/scrum))

This is the **project-management layer** of the process. Per-issue detail (labels, gates, skills) is in the
[development process](/en/process); both documents share the same roles, labels and skills.

| Version | Changes |
|---|---|
| 1.1 | Merged into the shared repo. Aligned with development process v1.4: test cases designed before coding; AI review in a separate session; 11-criterion DoR; UI design approval before gate G2; WIP limits for review and QA; Definition of Done added. Added: Security and customer roles, a mid-sprint interruption policy, a full RACI, a skill for every event. |
| 1.0 | First version (16-10-2026). |

---

## 1. Purpose and scope

This document defines the team's Scrum process once AI agents take part in software development. The Scrum
framework stays the same (roles, events, artifacts), but **the split of work between people and AI** and **where
the effort goes** in each stage change.

It applies to the company's software projects, especially monorepo projects (web, admin, API, mobile in one
repository).

::: tip Core principle
The AI does the repetitive execution (writing code, tests, first-round review). People own the **value** (what
and why), the **decisions** (architecture, merge, release) and **acceptance**. The AI is never accountable (A).
:::

## 2. A sprint with AI

A sprint has 10 consecutive steps. The effort column shows the direction compared with traditional Scrum:
**up** (a new bottleneck, more human effort) · **down** (the AI does most of it) · **same**.

| # | Step | People | AI | Effort | Skills |
|---|---|---|---|---|---|
| 1 | Discovery and requirements | PO/BA | Drafts stories, suggests AC | Up | `issue-create`, `refine` |
| 2 | Refinement and DoR | PO + Tech Lead | Automatic triage, story splitting, draft sizes | Up | `refine --batch`, `triage` |
| 3 | Sprint Planning | Whole team | Review/QA capacity data | Same | `sprint plan` |
| 4 | UI design, architecture, test design | Designer approves UI, Tech Lead decides architecture, QA approves test cases | UI brief, options, test design | Down | `design-brief`, `test-design`, `test-design --approve` |
| 5 | Coding and unit tests | Dev assigns and supervises | Code, tests | Strongly down | `implement` |
| 6 | Code review | Final reviewer | First-round review in a separate session | Up | `pr-review`, `pr-review --design` |
| 7 | QA and automation | QA reviews, explores, tests real devices | Runs automation for the designed test cases | Down | `qa`, `qa --manual` |
| 8 | CI/CD and deployment | Approves merge and release | Automated checks, release notes | Down | `merge-gate`, `merge-gate --merge`, `sprint release` |
| 9 | Sprint Review and UAT | PO, customer | Demo notes, feedback into stories | Up | `uat`, `uat --run`, `sprint review` |
| 10 | Retrospective | Whole team | Metrics, repeated AI errors | Same | `sprint retro` |

**[Aligned]** Test cases are designed in step 4, **before coding** (version 1.0 placed them in QA). Tests follow
the requirement rather than the code the AI just wrote; QA in step 7 reviews results and explores.

## 3. Roles and responsibilities

| Role | Traditional Scrum | Scrum with AI | Effort |
|---|---|---|---|
| Product Owner / BA | Write stories, prioritise the backlog, accept | Same, but tighter AC, quick answers to Fail-to-dev stories, more acceptance | Up |
| Scrum Master / PM | Facilitate events, remove impediments | Also: watch the review/QA bottleneck, WIP limits, AI cost | Same |
| Tech Lead | Architecture, review, support devs | Architecture, final PR approval, owns coding standards | Up |
| Developer | Write code, unit tests, fix bugs | Design solutions, assign work to the AI, check and own the code | Down |
| QA | Write test cases, manual testing, automation | Review AI-generated test cases, exploratory/UX testing, real devices | Down |
| Designer | Design every screen, hand over | Build and describe the design system, write UI briefs, review and refine AI-made Figma, own UX | Down (up in Sprint 0) |
| AI Enablement (new) | — | Maintains skills, coding standards, MCP configuration; analyses repeated AI errors. **Held jointly by the Tech Lead and the PO**: the Tech Lead on the technical side (accountable), the PO on the requirements side. The project-level *process owner* | New |
| Security (new) | — | Approves data policy, tokens and the AI's permissions in Sprint 0 and on change | New |
| Customer | Acceptance | Chooses UI options, accepts against AC, agrees response SLAs | Up |

Role guides: [roles](/en/roles/po) (including [AI Enablement](/en/roles/ai-enablement) and [Security](/en/roles/security)).

### 3.1 RACI by stage

R = does the work, A = accountable, C = consulted, I = informed.

| Stage | PO | BA | PM | Designer | Tech Lead | Dev | QA | Customer | AI |
|---|---|---|---|---|---|---|---|---|---|
| Requirements | A/R | R | I | C | C | I | C | C | R (drafts) |
| Refinement / DoR | A | R | I | C | R | C | C | — | R (triage) |
| Sprint Planning | C | C | A/R | C | R | R | R | — | R (data) |
| UI design (Figma) | C | I | I | A | I | I | I | C (chooses) | R |
| Technical design | C | I | I | I | A/R | C | I | — | C (proposes) |
| Test design (G2) | I | I | I | — | A | R | R | — | R |
| Coding | I | I | I | I | C | A | I | — | R |
| Code review | I | I | I | C (UI) | A | R | I | — | R (round 1) |
| QA, automation | C | I | I | I | I | C | A | — | R |
| Merge and release | I | I | C | I | A/R | C | C | I | — |
| Acceptance | A/R | C | I | C | C | I | C | R | — |
| Retrospective | R | R | A | R | R | R | R | — | R (data) |

The RACI by **issue status** is in [RACI](/en/raci).

## 4. Artifacts and standards

| Artifact | Change from traditional |
|---|---|
| Product Backlog | Stories follow the template (Description, AC, UI brief, affected apps); the Figma link is added once the design is approved. Every story has exactly one `status:*` label and a `size:*` after refinement |
| Sprint Backlog | The sprint milestone. WIP limits for coding, **waiting for review and waiting for QA** to avoid pile-ups |
| Increment | Comes with test cases and automation covering every AC |
| Definition of Ready | 11 criteria R1–R11, checked automatically by the AI. UI stories need a UI brief. Stories that fail do not enter the sprint |
| Definition of Done | See [Definition of Done](/en/definition-of-done): automation covers every AC, green CI, final reviewer approved, no Blocker/Major left, UI matches the approved Figma, PO accepted |
| Design System (new) | Colours, fonts, spacing, components, layout rules and UX principles described by the Designer in a form the AI can read; mandatory input for AI-made briefs/Figma. Versioned. Template: `docs/design-system.md` |
| AI assets (new) | Skills, coding standards, `CLAUDE.md`, MCP configuration. Versioned and reviewed like code (central repo + `project.yml`) |

**[Aligned]** The DoR has 11 criteria (version 1.0 said 10): R11 adds the search for duplicates and issues changing the same code.

## 5. Scrum events and timeboxes

Reference sprint: 2 weeks. The team may move to 1-week sprints once review and acceptance flow smoothly.

| Event | Traditional | With AI | Notes | Skill |
|---|---|---|---|---|
| Sprint Planning | 4 h | 3–4 h | Plan by review/QA capacity | `sprint plan` |
| Daily Scrum | 15 min | 15 min | A label dashboard replaces status reports; focus on blocked work | `sprint daily` |
| Backlog Refinement | ≤ 10% of the sprint | 20–25% of the sprint | The biggest increase | `refine --batch` |
| Sprint Review | 2 h | 2–3 h | More features to demo | `sprint review` |
| Retrospective | 1.5 h | 1.5 h | Adds skill/standard improvements | `sprint retro` |
| Review queue (new) | — | 2 slots/day | Fixed slots for approving PRs (`sprint.review_slots`) to avoid backlog | — |
| Design approval (new) | — | 30–60 min per group of stories | PO + Designer + customer, in the first 1–2 days of the sprint | `design-brief` |

## 6. Stages in detail

Each stage: goal, split between people and AI, output, quality gate, and how effort shifts compared with
traditional Scrum.

### 6.1 Sprint 0: Foundation (once per project)

**Goal:** prepare the environment so the AI works to standard from the first sprint. Details: [Sprint 0](/en/sprint-0).

| Item | Content |
|---|---|
| Input | Contract, overall scope, tech stack |
| People | Tech Lead: architecture, coding standards. PM: labels, board, CI, access. Security: data policy, tokens, AI permissions. Designer: design system, sample brief. AI Enablement: skills, MCP |
| AI | Scaffolds the monorepo, CI, issue/PR templates (one-line install); drafts coding standards; sets up the tool for AI to create/write designs in Figma (tool chosen by the team after trials) |
| Output | Repository, skills, coding standards, design system, DoR/DoD, MCP (GitHub, Figma, Playwright) |
| Gate | Tech Lead and Security sign off standards and access; Designer approves the design system. Checked with [`--check`](/en/setup-guide) |

**Effort: up.** A new stage (about 1–2 weeks), a one-off investment reused in later sprints.

### 6.2 Discovery and requirements

**Goal:** turn customer needs into clear, testable user stories.

| Item | Content |
|---|---|
| Input | Customer needs, meeting notes |
| People | PO/BA: work with the customer, decide value and priority, agree AC. Designer: describe UI needs (UI brief) |
| AI | Drafts stories from the notes; proposes Given/When/Then AC and missing edge cases; splits large stories (`issue-create`, `refine`) |
| Output | Story in `status:backlog` with Description, AC, Design, affected apps |
| Gate | Gate G1: the PO confirms the story has every required section |

**Effort: up about 20%.** The AI drafts fast, but the PO/BA must write more precisely because the AI follows the
text literally and does not fill gaps the way an experienced developer would.

### 6.3 Backlog Refinement and Definition of Ready

**Goal:** every story entering the sprint is ready for the AI.

| Item | Content |
|---|---|
| Input | Stories in `status:backlog` |
| People | PO + Tech Lead: answer questions, agree scope, assess risk, decide size and the `human-code` flag. PO completes Fail-to-dev stories |
| AI | Automatic triage against R1–R11; moves to `test-design` or `fail-to-dev` with proposed wording; proposes splits and S/M/L/XL sizes (`refine --batch`) |
| Output | Ready stories with `size:*` |
| Gate | Every mandatory DoR criterion met |

**Effort: up about 60%**, from about 10% to 20–25% of the PO's and Tech Lead's sprint time. This stage decides
output quality once the AI is involved.

### 6.4 Sprint Planning

**Goal:** pick an amount of work that matches the team's real capacity.

| Item | Content |
|---|---|
| Input | Ready stories, data from previous sprints |
| People | Whole team: choose stories, commit to the Sprint Goal. Tech Lead: identify stories a person must code (`human-code`) |
| AI | Data: lead time, PRs each person can review, Fail-to-dev rate; suggests splitting or grouping stories (`sprint plan`) |
| Output | Sprint Backlog (milestone), Sprint Goal |
| Gate | Total work does not exceed the team's review, QA and acceptance capacity |

**Effort: the same**, but the criterion changes: plan by review/acceptance capacity instead of coding capacity.

### 6.5 UI design, architecture and test design

**Goal:** settle the UI, the technical approach and the test set **before coding**.

| Item | Content |
|---|---|
| Input | Sprint stories, UI brief, design system |
| People | Designer: write briefs, review and refine Figma, check UX and accessibility. PO + customer: choose and confirm the UI option. Tech Lead: architecture, API contract, data model; approves the plan. QA: approves test cases |
| AI | UI brief and 2–3 options from the design system covering normal/error/empty/loading states (`design-brief`); technical options; test cases and the AC → file → test table (`test-design`) |
| Output | Approved Figma frame (`## Design approval: APPROVED`) linked to the story; a short technical design; the test-case table |
| Gate | **Gate G2**: Designer and customer confirm the UI (UI stories), Tech Lead approves the plan, QA approves test cases (`test-design --approve`), then a person applies `status:ready-to-dev` |

**Effort: down about 25%.** The AI produces the designs and options; the Designer moves from drawing every screen
to describing, reviewing and refining. Architecture decisions stay with people.

**[Aligned]** Design approval is **a condition of gate G2** for UI stories: no coding before the Figma is approved.
`pr-review --design` after coding is a comparison, not a replacement for this approval.

### 6.6 Coding and unit tests

**Goal:** implement the story to its AC and the coding standard.

| Item | Content |
|---|---|
| Input | Story in `status:ready-to-dev`, coding standard, approved Figma, technical design, test-case table |
| People | Developer: assigns work to the AI, monitors, handles what the AI gets wrong or what is complex; owns the code. `human-code` stories: a person codes |
| AI | Creates the branch, writes code and unit tests from the test-case table, runs lint/typecheck/build; opens the PR linked to the story (`implement`) |
| Output | Pull request with the AC mapping table |
| Gate | Green CI: lint, typecheck, unit tests, build |

**Effort: down about 70%.** The biggest reduction. Developers move from writing code to designing, assigning and checking.

### 6.7 Code review

**Goal:** correct, secure, maintainable code before QA.

| Item | Content |
|---|---|
| Input | Pull request |
| People | Reviewer/Tech Lead: final approval focused on business logic, architecture and security; accepts or requests changes. Reviews in the fixed review slots |
| AI | First-round review **in a separate session** against 9 criteria, line comments (`pr-review`). Blocker/Major go back to the AI to fix **in the implement session**, then a fresh review session reviews again (up to 3 rounds) |
| Output | PR approved, story moves to QA |
| Gate | No Blocker/Major left; the final reviewer approved |

**Effort: up about 40%.** Much more code means more total review effort, even though the AI filters each PR first.
This is the new bottleneck; limit the PRs waiting for review (`limits.wip_in_review`).

**[Aligned]** The AI never reviews and fixes in the same session (version 1.0 said it "fixes Blocker/Major
itself"): the session that wrote the code is the worst one to review it.

### 6.8 QA and automation

**Goal:** prove every AC works and nothing regressed.

| Item | Content |
|---|---|
| Input | Reviewed PR, test-case table approved in 6.5 |
| People | QA: add business scenarios, exploratory and UX testing, real-device (mobile) testing with `qa --manual` |
| AI | Writes and runs Playwright for `auto` test cases; classifies failures (test, product, environment); product defects go back to coding (up to 3 rounds); reports on the PR (`qa`) |
| Output | Automated tests, QA passed/failed report |
| Gate | Every AC has at least one test; automation green; every P1 manual/mobile case passed |

**Effort: down.** Test cases and manual QA about −50%, automation about −60%. QA moves from writing and running
tests to reviewing and exploring. Automation coverage rises. The QA queue has a WIP limit (`limits.wip_qa`).

### 6.9 Integration and deployment (CI/CD)

**Goal:** ship code to staging/production safely.

| Item | Content |
|---|---|
| Input | PR with QA passed |
| People | Tech Lead: refutation (G3) and merge (G4). PM/Tech Lead: approve the production release |
| AI | CI runs every check; G3 brief (`merge-gate`), pre-merge checks (`merge-gate --merge`); release plan and notes (`sprint release`) |
| Output | Build on staging/production, release notes |
| Gate | Only people merge and approve releases |

**Effort: down about 33%**, thanks to automated checks and release notes.

### 6.10 Sprint Review and UAT

**Goal:** the customer and PO accept the features.

| Item | Content |
|---|---|
| Input | Increment on staging |
| People | PO + customer: demo, acceptance, feedback. PO: update the backlog from feedback |
| AI | UAT checklist (`uat`), guided acceptance for the PO (`uat --run`); demo notes, change summary; feedback into new stories (`sprint review`) |
| Output | Features accepted (gate G5), backlog updated |
| Gate | Customer/PO accept against the AC |

**Effort: up about 25%.** Each sprint delivers more features, so there is more to accept. Agree response times
with the customer up front.

### 6.11 Sprint Retrospective

**Goal:** improve how both people and the AI work.

| Item | Content |
|---|---|
| Input | Sprint metrics, repeated AI errors |
| People | Whole team: evaluate, choose improvements. AI Enablement: update skills, coding standards, DoR |
| AI | Compiles metrics and repeated errors from review/QA/UAT comments (`sprint retro`) |
| Output | Improvement actions; issues/PRs fixing skills (central repo) or standards (project repo) |
| Gate | Every AI error repeated ≥ 2 times gets an action fixing a skill or standard |

**Effort: the same.** Skill maintenance adds about 4% of total effort (counted under AI platform operations).

### 6.12 Mid-sprint interruptions (added)

- **Serious production defect:** the hotfix flow (`type:hotfix`, skill `hotfix`), using the 10–20% buffer kept at planning.
- **New customer request mid-sprint:** into the backlog and refinement as usual; the sprint scope changes only if
  the PO agrees and removes an equivalent amount. The PM records it for the retro.
- **Story blocked for more than 2 days:** the PM decides to take it out of the sprint or unblock it; it does not sit in progress.

## 7. Effort shift summary

The table and chart convert the total effort of a traditional sprint into **100 units** for comparison. These are
**initial reference numbers** based on a typical web/mobile project; replace them with measured numbers after 2–3
pilot sprints.

![Effort by stage: traditional vs with AI](/effort-en.svg)

| Stage | Traditional | With AI | Change | Who carries the change |
|---|---|---|---|---|
| Discovery and requirements | 10 | 12 | +20% | PO/BA |
| Refinement and DoR | 5 | 8 | +60% | PO, Tech Lead |
| Sprint Planning | 3 | 3 | 0% | Whole team |
| UI design and architecture | 8 | 6 | −25% | Designer, Tech Lead |
| Coding | 40 | 12 | −70% | Developer |
| Unit tests | 7 | 2 | −71% | Developer |
| Code review | 5 | 7 | +40% | Tech Lead, Reviewer |
| Test cases and manual QA | 10 | 5 | −50% | QA |
| Test automation | 5 | 2 | −60% | QA |
| CI/CD and deployment | 3 | 2 | −33% | Tech Lead |
| Sprint Review and UAT | 4 | 5 | +25% | PO, customer |
| AI platform operations | 0 | 4 | New | AI Enablement |
| **Total** | **100** | **68** | **−32%** | |

### 7.1 How the effort mix changes

| Work group | Traditional share | With AI share |
|---|---|---|
| Requirements, refinement, acceptance (PO/BA, customer) | 19% | 37% |
| Design, architecture, review, release (Designer, Tech Lead) | 16% | 22% |
| Execution: code, unit tests, QA, automation | 62% | 31% |
| Planning and AI platform operations | 3% | 10% |

::: tip Conclusion
Total effort drops by about 32%, but the more important change is **where the effort goes**. Execution falls from
about 62% to 31% of total effort. Requirements, decisions and acceptance rise from about 35% to nearly 60%. The
team needs more BA, review and architecture capacity, and less pure coding capacity.
:::

## 8. Estimation and measurement

### 8.1 How estimation changes

- Story points no longer reflect coding effort. Estimate by **business complexity, ambiguity and review/acceptance effort**.
- Use S / M / L / XL (`size:*`) for stories. Flag high-risk stories (security, payments, algorithms) with
  `human-code`: the agent does not code them.
- Sprint capacity is the number of PRs the team can review and stories the PO can accept, not coding velocity.

### 8.2 Metrics

| Metric | How | Reference target |
|---|---|---|
| Lead time | `ready-to-dev` → `qa-passed` | Down ≥ 40% after 3 sprints |
| Review wait | PR opened → final reviewer approval | < 1 working day |
| Fail-to-dev rate | Fail-to-dev stories / triaged stories | < 20% and falling |
| First-round review pass rate | PRs needing no Blocker/Major fix | ≥ 60% |
| AC covered by automation | AC with automated tests / all AC | ≥ 80% (web/admin/api) |
| Escaped defects | Bugs found after merge | No increase versus traditional |
| AI cost per story | Tokens/licences per story | Track the trend |

The full metric list (including time waiting on people, Needs-human rate, defects found at G3, UAT rejections) is
in [development process section 11](/en/process). `sprint report` and `sprint retro` compute them.

## 9. Risks and controls

| Risk | Control |
|---|---|
| PRs pile up waiting for review (the new bottleneck) | WIP limits on the review and QA columns; fixed daily review slots; AI first-round review |
| Vague requirements → the AI builds the wrong thing fast | 11-criterion DoR checked automatically; more refinement time; test cases designed before coding |
| Reviewers trust the AI too much | The final reviewer must check business logic and security; gate G3 refutation; spot-check approved PRs |
| The customer cannot accept in time | Response SLA in the contract; weekly acceptance batches |
| Juniors lose learning opportunities | Rotate `human-code` stories; juniors review with the Tech Lead |
| Data security, code licensing | Repo-scoped tokens; AI clause in the contract; no real customer data in prompts; Security approval in Sprint 0 |
| AI designs are generic, off-brand, less accessible | The design system is mandatory input; the Designer approves every screen before coding |
| Licensing of design assets (AI-made images, icons, fonts) | Only assets from licensed libraries; sources recorded in the design system |
| Slow customer design approval delays the sprint | Approval within the first 1–2 days; large UI stories have their design done a sprint ahead |
| Dependence on one AI vendor | Skills and standards are vendor-neutral Markdown usable with several tools |

## Open questions

- The tool for the AI to **create/write** designs in Figma: trialled and chosen in Sprint 0 (the common Figma MCP
  mostly reads designs).
- Who holds the AI Enablement role at company level (process owner of the central repo)?
- Effort numbers and metric targets are references; replace them with measurements after 2–3 pilot sprints.
