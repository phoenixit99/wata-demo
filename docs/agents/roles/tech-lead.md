# Hướng dẫn cho Tech Lead

Bạn chịu trách nhiệm kỹ thuật cuối cùng: ký G2 (plan), G3 (refutation), G4 (merge), chốt mức rủi ro,
và giữ guardrail.

## Việc của bạn trong quy trình

| Khi | Bạn làm | Công cụ |
|---|---|---|
| Sau triage | Xem `risk:*` triage đề xuất; đổi nếu không đồng ý | GitHub |
| **G2** | Duyệt plan trong `## Test design: PASS` (QA duyệt test case) bằng `test-design --approve`. Gắn `status:ready-to-dev` | Claude Code / GitHub |
| **G3** | Đọc `## Refutation brief`, đọc kỹ các đoạn diff rủi ro, cố tìm điểm sai. Đồng ý: comment `## G3: OK` kèm điều đã kiểm. Có vấn đề: comment `## Code review: FAIL` + gắn `status:in-progress` | GitHub |
| **G4** | Chạy `/merge-gate --merge <số>`; READY thì merge | Claude Code + GitHub |
| `status:needs-human`, `status:qa-failed` | Phân công hoặc tự xử lý | — |
| Hotfix | Triage trực tiếp, chạy `/hotfix <số>` | Claude Code |
| Release | Cùng PM chuẩn bị bằng `/sprint release` | Claude Code |
| Feature lớn | Cùng BA/PO chốt `## Feature analysis` | GitHub |

## Giữ guardrail (bắt buộc trước khi bật agent)

- Branch protection trên `main`: cấm push trực tiếp, cấm force-push, bắt buộc PR, bắt buộc approval
  CODEOWNERS, required checks từ `ci.yml`.
- GitHub App của agent **không** có quyền bypass branch protection, không có quyền admin.
- `.claude/settings.json` từ template (lớp chặn dự phòng).
- CODEOWNERS bảo vệ `.github/`, `.claude/`, `docs/agents/`, `CLAUDE.md`.

## Giữ chất lượng của AI

- Điền `CLAUDE.md` và coding standard của từng app; thêm vào mục "Bẫy đã biết" mỗi khi AI hoặc người
  mắc lỗi đáng nhớ.
- Đọc lý do `## Needs human` và lỗi G3 bắt được mỗi tháng; đề xuất sửa skill lên repo trung tâm.

## Rủi ro cao

Issue `risk:high`: người làm G3 phải khác người merge; review thêm bảo mật và migration.

## Trong sprint

Nhịp sprint và sự kiện: [Quy trình Scrum](../scrum.md).

| Sự kiện | Việc của bạn |
|---|---|
| Sprint 0 | Kiến trúc, coding standard, branch protection, CODEOWNERS ([`--check`](/setup-guide)) |
| Refinement | Đánh giá rủi ro kỹ thuật, chốt size và cờ `human-code` (`refine --batch`) |
| Planning | Xác định story cần người code; kiểm năng lực review |
| Trong sprint | Kiến trúc, G2, G3, G4; giữ khung giờ review cố định |
| Kiêm AI Enablement | Skill, coding standard, MCP, workflow agent, chi phí AI; lỗi AI lặp lại phía kỹ thuật (`sprint retro`); xem [AI Enablement](ai-enablement.md) |

<!-- role-skills:start -->
## Skill của bạn

Sinh tự động từ `skills/catalog.json`. Gọi trong Claude Code bằng lệnh ở cột 3; trên GitHub, comment câu ở cột 4 (dùng được cả khi skill không được nạp sẵn).

| Skill | Dùng khi | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Định tuyến theo label; bảng việc theo vai trò | `/dev-pipeline <#>` | `@claude đọc .claude/skills/dev-pipeline/SKILL.md và làm theo cho issue #<số>` |
| `refine` | Phân tích epic (mặc định); refinement hàng loạt, size S–XL, cờ human-code (`--batch`) | `/refine --batch` | `@claude đọc .claude/skills/refine/SKILL.md và làm theo chế độ --batch cho issue #<số>` |
| `test-design` | Test case và plan trước khi code (mặc định); hỗ trợ người ký G2 (`--approve`) | `/test-design <#> --approve` | `@claude đọc .claude/skills/test-design/SKILL.md và làm theo chế độ --approve cho issue #<số>` |
| `pr-review` | Review PR ở session riêng, hai lượt (mặc định); Designer so UI với Figma (`--design`) | `/pr-review <#>` | `@claude đọc .claude/skills/pr-review/SKILL.md và làm theo cho issue #<số>` |
| `merge-gate` | Refutation brief cho G3 (mặc định); kiểm tra trước merge G4 (`--merge`) | `/merge-gate <#>  ·  --merge` | `@claude đọc .claude/skills/merge-gate/SKILL.md và làm theo chế độ --merge cho issue #<số>` |
| `hotfix` | Sửa khẩn cấp production | `/hotfix <#>` | `@claude đọc .claude/skills/hotfix/SKILL.md và làm theo cho issue #<số>` |
| `sprint` | Sự kiện Scrum: `plan`, `daily`, `review`, `retro`, `report`, `release` | `/sprint plan|daily|review|retro|report|release` | `@claude đọc .claude/skills/sprint/SKILL.md và làm theo cho issue #<số>` |
<!-- role-skills:end -->
