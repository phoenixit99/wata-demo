# Risk tiers

Purpose: small changes should not have to pass every gate (otherwise people route around the process),
and dangerous changes get checked harder. **The thresholds below are proposals; the Tech Lead and the
process owner decide.**

## Three tiers

| Tier | When | Examples |
|---|---|---|
| `risk:low` | No business behaviour change, no data touched, easy to undo | Text and typo fixes, small style changes, documentation, internal renames with no API change |
| `risk:standard` | Default | New features, ordinary bugs, new screens |
| `risk:high` | A mistake loses money, loses or leaks data, or breaks a running app | Auth/permissions, payments, migrations or data deletion, changes to the shared contract or to API responses older mobile apps use, anything under `high_risk_paths`, hotfixes |

## Gates by tier

| Gate | `risk:low` | `risk:standard` | `risk:high` |
|---|---|---|---|
| G1 confirm issue | Yes | Yes | Yes |
| Automatic triage | Yes | Yes | Yes |
| Test design | Short (main cases only) | Full | Full + security/data cases |
| G2 approve plan | Quick Tech Lead approval, no QA | Tech Lead + QA | Tech Lead + QA |
| Code review (AI, fresh session) | Yes | Yes | Yes + security/migration pass |
| QA | Related automation | Full | Full + regression |
| G3 refutation | **Skipped** | Yes (may combine with G4) | Yes, **by someone other than the merger** |
| G4 merge | Yes | Yes | Yes |
| G5 UAT | Quick PO look, or skipped if nothing user-visible changed | Yes | Yes |

## Who decides

- Triage **proposes** a tier with a reason.
- The Tech Lead **decides** (changes the label if they disagree).
- A PR touching `high_risk_paths` on an issue that is not `risk:high`: the reviewer raises it to
  `risk:high` and says so in `## Code review`.
- Nobody may lower the tier to skip a gate once the issue has reached `status:in-review`.
