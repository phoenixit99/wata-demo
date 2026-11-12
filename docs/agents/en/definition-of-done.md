# Definition of Done

A story only counts as **Done** (`status:done`) when every condition below holds. The DoD is the team's shared
commitment; together with the [Definition of Ready](/en/process) (R1–R11) it frames every story.

| # | Condition | Confirmed by | Evidence |
|---|---|---|---|
| D1 | Every AC is implemented and has at least one test | Reviewer, QA | AC → test table in `## Build write-up`, `## QA report` |
| D2 | Automation covers every automatable AC; automation green | QA | `## QA report: PASS` |
| D3 | Every P1 manual/mobile case tested and passed | QA | `## QA manual results` |
| D4 | Green CI on the head commit: lint, typecheck, unit tests, build | Tech Lead | PR checks |
| D5 | No Blocker/Major left in review; the final reviewer approved (CODEOWNERS) | Tech Lead | `## Code review: PASS`, approval |
| D6 | Gate G3 passed (except `risk:low`) | Tech Lead/Reviewer | `## G3: OK` |
| D7 | The UI matches the approved Figma frame | Designer | `## Design approval: APPROVED`, `## Design review: OK` (UI stories) |
| D8 | Changed APIs stay compatible with supported mobile app versions | Reviewer | Contract section of `## Code review` |
| D9 | "Owed before release" items are done (migrations, env vars, configuration) | Tech Lead | `## Build write-up`, `sprint release` |
| D10 | Merged and deployed to staging | Tech Lead | PR merged, deploy record |
| D11 | The PO (and the customer when needed) accepted against the AC | PO | `## UAT: ACCEPTED` |
| D12 | User docs/README/release notes updated when behaviour changed | Dev, PO | PR or release notes |

**By risk tier** ([risk tiers](/en/risk-tiers)): `risk:low` skips D6, and D7 when the UI does not change;
`risk:high` adds a security/migration review and G3 by someone other than the merger.

**Not Done:** merged but not accepted; accepted but release prerequisites not done; "works on my machine"; tests
skipped or weakened to go green.

`merge-gate --merge` checks D1–D9 before gate G4; `uat --run` records D11.
