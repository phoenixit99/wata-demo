# Writing acceptance criteria

Unclear requirements are the most common cause of rework. The AI only codes when every criterion is
**testable**.

## Formula

**When** <someone does something / a condition holds> **then** <a result you can see or check>.

Given/When/Then works too: **Given** <context>, **when** <action>, **then** <result>.

## Five questions for every feature

1. Main flow: what does the user do and what do they see?
2. Invalid or missing data: what does the system say? Is anything saved?
3. Boundaries: empty, maximum, duplicate, special characters?
4. Permissions: who must **not** be able to do this, and what do they see?
5. **What must not happen**: which data must not be lost, who must not be notified, which screen must
   not change?

## Examples

| Not ready | Why | Ready |
|---|---|---|
| Users can manage orders | Nothing to check | When the user clicks Delete on an order and confirms, the order disappears from the list and `GET /orders` no longer returns it |
| The page loads fast | "Fast" is not measurable | A list of 50 orders finishes rendering in under 2 seconds on staging |
| The form is easy to use | Not observable | When Email is left empty and the user clicks Save, the Email field shows a red border with "Please enter an email", and no request is sent |
| Fix the login bug | No expected result | When logging in with an email containing capitals (`An@Mail.com`) and the correct password, the user reaches the home page |
| Admins see the report | Missing permissions and data | When an admin opens Monthly report, they see total revenue per day for the current month; when a regular user opens the same URL, they see a 403 page |

## Bugs

A bug's criteria are usually: **repeating the reproduction steps shows the expected result**, plus one
criterion that neighbouring behaviour stays unchanged.

## Self-check before applying `status:backlog`

- [ ] Every criterion has an action and a concrete result
- [ ] None of: fast, nice, easy, good, reasonable, flexible, optimal
- [ ] At least one criterion covers an error case
- [ ] What must not happen is stated (where relevant)
- [ ] No TBD, ???, or unfilled template text
