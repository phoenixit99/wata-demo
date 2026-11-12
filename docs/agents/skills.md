<!-- Sinh tự động bởi scripts/sync-skills.py. Không sửa tay. -->

# Danh mục skill

Danh sách sinh tự động từ `skills/catalog.json`, nguồn duy nhất cho skill, vai trò và cách kích hoạt. Nội dung từng skill (dành cho AI) nằm trong repo; bấm vào tên để xem.

## Theo vai trò

| Vai trò | Skill |
|---|---|
| PO | `dev-pipeline`, `issue-create`, `refine`, `uat`, `sprint` |
| BA | `dev-pipeline`, `issue-create`, `refine` |
| PM | `dev-pipeline`, `sprint` |
| Designer | `dev-pipeline`, `design-brief`, `pr-review` |
| Dev | `dev-pipeline`, `test-design`, `implement`, `pr-review`, `hotfix` |
| Tech Lead | `dev-pipeline`, `refine`, `test-design`, `pr-review`, `merge-gate`, `hotfix`, `sprint` |
| QA | `dev-pipeline`, `test-design`, `qa` |
| AI Enablement | `dev-pipeline`, `sprint` |
| Security | `dev-pipeline`, `merge-gate` |

## Tất cả skill

| Bước | Skill | Dùng khi | Vai trò | Kích hoạt |
|---|---|---|---|---|
| - | [`dev-pipeline`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/dev-pipeline/SKILL.md) | Định tuyến theo label; bảng việc theo vai trò | PO, BA, PM, Designer, Dev, Tech Lead, QA, AI Enablement, Security | người gọi |
| 1 | [`issue-create`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/issue-create/SKILL.md) | Soạn issue đúng mẫu từ ngôn ngữ tự nhiên | PO, BA | người gọi |
| 0, refinement | [`refine`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/refine/SKILL.md) | Phân tích epic (mặc định); refinement hàng loạt, size S–XL, cờ human-code (`--batch`) | PO, BA, Tech Lead | label `type:epic` (tự động) hoặc người gọi |
| 2 | [`triage`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/triage/SKILL.md) | Kiểm tra Definition of Ready R1–R11 | AI (tự động) | label `status:backlog` (tự động) hoặc người gọi |
| design | [`design-brief`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/design-brief/SKILL.md) | Brief UI từ design system, phương án giao diện, duyệt thiết kế trước khi code | Designer | người gọi |
| 3 | [`test-design`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/test-design/SKILL.md) | Test case và plan trước khi code (mặc định); hỗ trợ người ký G2 (`--approve`) | Dev, Tech Lead, QA | label `status:test-design` (tự động) hoặc người gọi |
| 4, 6b | [`implement`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/implement/SKILL.md) | Code theo plan, mở PR (mặc định); sửa sau QA/UAT (`--fix`); frame Figma thành UI (`--figma`) | Dev | label `status:ready-to-dev`, `status:in-progress` (tự động) hoặc người gọi |
| 5 | [`pr-review`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/pr-review/SKILL.md) | Review PR ở session riêng, hai lượt (mặc định); Designer so UI với Figma (`--design`) | Designer, Dev, Tech Lead | label `status:in-review` (tự động) hoặc người gọi |
| 6 | [`qa`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/qa/SKILL.md) | Automation và kết luận QA (mặc định); QA test manual/mobile (`--manual`) | QA | label `status:qa` (tự động) hoặc người gọi |
| 7–8 | [`merge-gate`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/merge-gate/SKILL.md) | Refutation brief cho G3 (mặc định); kiểm tra trước merge G4 (`--merge`) | Tech Lead, Security | label `status:qa-passed` (tự động) hoặc người gọi |
| 9 | [`uat`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/uat/SKILL.md) | Checklist UAT cho PO (mặc định); PO nghiệm thu, soạn kết luận (`--run`) | PO | label `status:uat` (tự động) hoặc người gọi |
| hotfix | [`hotfix`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/hotfix/SKILL.md) | Sửa khẩn cấp production | Tech Lead, Dev | người gọi |
| planning, daily, review, retro | [`sprint`](https://github.com/phoenixit99/wata-ai-process/blob/main/skills/sprint/SKILL.md) | Sự kiện Scrum: `plan`, `daily`, `review`, `retro`, `report`, `release` | PO, PM, Tech Lead, AI Enablement | người gọi |
