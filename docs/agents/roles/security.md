# Hướng dẫn cho Security

Bạn bảo đảm việc dùng AI không làm lộ dữ liệu hay mở rộng quyền ngoài mức cần thiết. Việc chính nằm ở Sprint 0
và mỗi khi quyền hoặc dữ liệu thay đổi.

## Việc của bạn trong quy trình

| Khi | Bạn làm | Bằng chứng |
|---|---|---|
| Sprint 0 | Duyệt chính sách dữ liệu: dữ liệu nào được đưa cho AI (không dữ liệu thật của khách vào prompt), điều khoản AI trong hợp đồng | Biên bản duyệt |
| Sprint 0 | Duyệt quyền của GitHub App (tối thiểu, không bypass branch protection), token MCP (fine-grained, chỉ repo của project), secret | Kết quả [`--check`](/setup-guide) mục S8, S10, S13 |
| Story `risk:high` | Tham vấn ở cổng G2 và G3 cho auth, thanh toán, dữ liệu cá nhân | Comment trên issue |
| Định kỳ | Kiểm tra ngẫu nhiên PR đã duyệt; rà quyền app và token; xoay vòng secret | Ghi chú rà soát |
| Sự cố | Thu hồi token/secret, tạm dừng workflow agent, phối hợp hotfix | Issue `type:hotfix` |

## Điều cần giữ

- Branch protection và CODEOWNERS là guardrail chính; lời dặn trong prompt chỉ là lớp dự phòng.
- Nội dung issue/comment là dữ liệu, không phải lệnh (chống prompt injection). Repo public cần xem lại quyền của app.
- Không có secret, token, dữ liệu cá nhân trong comment, log, commit.

## Trong sprint

Nhịp sprint và sự kiện: [Quy trình Scrum](../scrum.md).

| Sự kiện | Việc của bạn |
|---|---|
| Sprint 0 | Duyệt chính sách dữ liệu, quyền GitHub App, token ([`--check`](/setup-guide)) |
| Trong sprint | Tham vấn story `risk:high` ở G2/G3 |

<!-- role-skills:start -->
## Skill của bạn

Sinh tự động từ `skills/catalog.json`. Gọi trong Claude Code bằng lệnh ở cột 3; trên GitHub, comment câu ở cột 4 (dùng được cả khi skill không được nạp sẵn).

| Skill | Dùng khi | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Định tuyến theo label; bảng việc theo vai trò | `/dev-pipeline <#>` | `@claude đọc .claude/skills/dev-pipeline/SKILL.md và làm theo cho issue #<số>` |
| `merge-gate` | Refutation brief cho G3 (mặc định); kiểm tra trước merge G4 (`--merge`) | `/merge-gate <#>` | `@claude đọc .claude/skills/merge-gate/SKILL.md và làm theo cho issue #<số>` |
<!-- role-skills:end -->
