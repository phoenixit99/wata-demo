# Glossary

| Term | Meaning |
|---|---|
| **AC (Acceptance Criteria)** | Each criterion is a checkable statement: when X happens, Y is observed |
| **AI agent** | Claude running the process skills: reads issues, codes, reviews and tests within its permissions |
| **Gates G1–G5** | Points where a person must sign before an issue moves on: G1 confirm the issue, G2 approve the plan, G3 refutation, G4 merge, G5 UAT acceptance |
| **Contract (data)** | Types and API shared between apps (`packages/shared`). Changing it affects several apps |
| **Contract (agent)** | The file `docs/agents/contract.md`: shared rules every skill reads first |
| **CI** | Automated checks (lint, tests, build) on every PR |
| **CODEOWNERS** | File naming who must approve changes in which folders |
| **DoR (Definition of Ready)** | The 11 conditions R1–R11 an issue must meet before test design and coding |
| **Epic** | A large feature that is analysed (Step 0) and split into several issues |
| **Three-part footer** | The end of every AI report: run / read only / still a claim, separating what was verified from what was not |
| **Fixed heading** | A heading such as `## Triage: PASS` so the next step can find the previous result |
| **Status label** | A `status:*` label; exactly one per issue; tells which step the issue is in |
| **MCP** | Protocol that lets the AI work with GitHub, Figma and a browser |
| **Needs human** | The status where the AI stops: fix rounds used up, a human decision needed, or information missing |
| **Plan** | Table of criterion → files to change → test case, with blast radius and what is out of scope |
| **PR (pull request)** | Proposal to merge a branch into `main`; where review happens |
| **Prompt injection** | Instructions planted in content (issues, comments) to trick the AI into unauthorised actions. The AI treats content as data, not instructions |
| **Refutation (G3)** | Reading the AI's results with the goal of finding what is wrong, not confirming it |
| **Risk tier** | `risk:low/standard/high`, which decides which gates may be shortened |
| **Session** | One AI run with its own context. Each step uses a fresh session so the AI does not agree with itself |
| **Skill** | A standard instruction set for the AI to perform one step, versioned and reviewed in the repo |
| **Skill catalog** | `skills/catalog.json`: the single list of skills, roles, triggers and headings; documents are generated from it |
| **SLA** | Maximum time an issue may wait in one person's queue |
| **Test case P1/P2/P3** | Priority: a P1 failure blocks the release |
| **UAT** | PO acceptance on staging after merge |
| **Fix round** | One AI fix after a failed review or QA; at most 3 |
| **AI Enablement** | Role that maintains skills, coding standards, MCP and analyses repeated AI errors; the process owner |
| **Definition of Done (DoD)** | The 12 conditions for a story to count as Done ([DoD](/en/definition-of-done)) |
| **Design system** | Colours, fonts, spacing, components, layout rules, UX principles in a form the AI can read; mandatory input for design |
| **human-code** | Label for high-risk stories a person codes; the agent does not implement them |
| **Size (S/M/L/XL)** | Estimate by business complexity, ambiguity and review/acceptance effort, not coding effort |
| **Sprint 0** | One-off foundation stage per project ([Sprint 0](/en/sprint-0)) |
| **WIP** | Number of issues in progress at once; limited for coding, waiting-for-review and waiting-for-QA queues |
