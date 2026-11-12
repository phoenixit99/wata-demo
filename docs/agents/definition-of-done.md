# Definition of Done

Một story chỉ được tính là **Done** (`status:done`) khi đạt mọi điều kiện dưới đây. DoD là cam kết chung của
team; cùng với [Definition of Ready](process.md) (R1–R11) nó tạo thành hai đầu của mỗi story.

| # | Điều kiện | Ai xác nhận | Bằng chứng |
|---|---|---|---|
| D1 | Mọi AC được hiện thực và có ít nhất một test | Reviewer, QA | Bảng AC → test trong `## Build write-up`, `## QA report` |
| D2 | Automation phủ mọi AC tự động hoá được; automation xanh | QA | `## QA report: PASS` |
| D3 | Mọi case P1 manual/mobile đã test và đạt | QA | `## QA manual results` |
| D4 | CI xanh trên commit cuối: lint, typecheck, unit test, build | Tech Lead | Checks của PR |
| D5 | Review không còn Blocker/Major; người duyệt cuối đã approve (CODEOWNERS) | Tech Lead | `## Code review: PASS`, approval |
| D6 | Cổng G3 đã qua (trừ `risk:low`) | Tech Lead/Reviewer | `## G3: OK` |
| D7 | Giao diện khớp frame Figma đã duyệt | Designer | `## Design approval: APPROVED`, `## Design review: OK` (story có UI) |
| D8 | API thay đổi vẫn tương thích với bản app mobile còn hỗ trợ | Reviewer | Mục Contract trong `## Code review` |
| D9 | Việc "còn nợ trước release" đã xong (migration, env var, cấu hình) | Tech Lead | `## Build write-up`, `sprint release` |
| D10 | Đã merge và deploy staging | Tech Lead | PR merged, thông tin deploy |
| D11 | PO (và khách hàng khi cần) nghiệm thu theo AC | PO | `## UAT: ACCEPTED` |
| D12 | Tài liệu người dùng/README/release note cập nhật khi hành vi thay đổi | Dev, PO | PR hoặc release note |

**Theo mức rủi ro** ([phân loại rủi ro](risk-tiers.md)): `risk:low` bỏ D6 và D7 nếu không đổi UI; `risk:high`
thêm review bảo mật/migration và người làm G3 khác người merge.

**Không tính là Done:** đã merge nhưng chưa UAT; UAT đạt nhưng còn việc trước release chưa làm; "chạy được trên
máy dev"; test bị bỏ qua (`skip`) hoặc bị nới để xanh.

`merge-gate --merge` kiểm tra D1–D9 trước cổng G4; `uat --run` ghi D11.
