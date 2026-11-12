# Hướng dẫn cho PO (Product Owner)

Bạn quyết định **làm gì** và **khi nào là xong**. AI giúp bạn viết yêu cầu rõ ràng và chuẩn bị
nghiệm thu; bạn không cần dùng dòng lệnh.

## Việc của bạn trong quy trình

| Khi | Bạn làm | Trên đâu | Xong khi |
|---|---|---|---|
| Có yêu cầu mới | Tạo issue bằng template, hoặc mô tả ngắn rồi comment `@claude soạn lại issue này theo mẫu` | GitHub Issues | Issue có Description và Acceptance Criteria |
| **Cổng G1** | Đọc lại issue (nhất là các dòng `[Giả định]`), sửa nếu cần, gắn `status:backlog` | GitHub | Issue có `status:backlog` |
| Issue bị `status:fail-to-dev` | Đọc comment `## Triage: FAIL`, dán/sửa theo "Câu chữ đề xuất", gắn lại `status:backlog` | GitHub | Trong SLA (đề xuất 24 giờ) |
| AI hỏi trong `## Needs human` về sản phẩm | Trả lời bằng comment, chọn một phương án | GitHub | Người phụ trách chuyển lại trạng thái |
| **Cổng G5 (UAT)** | Chạy `uat --run` (hoặc làm theo `## UAT checklist` trên staging); comment `## UAT: ACCEPTED` + gắn `status:done`, hoặc `## UAT: REJECTED` + gắn `status:uat-failed` | Staging + GitHub | Trong SLA (đề xuất 48 giờ) |
| Feature lớn | Tạo issue loại epic; đọc `## Feature analysis`; đồng ý hướng và danh sách issue con | GitHub | Đã chốt hướng |

## Viết Acceptance Criteria tốt

Đọc `../writing-acceptance-criteria.md`. Ngắn gọn:

- Mỗi tiêu chí: **Khi** <hành động> **thì** <kết quả nhìn thấy được>.
- Ghi cả trường hợp sai và **điều không được xảy ra**.
- Không dùng "nhanh", "đẹp", "dễ dùng", "hợp lý": thay bằng con số hoặc hành vi cụ thể.

## Nhờ AI ngay trên GitHub

Comment trong issue hoặc PR, bắt đầu bằng `@claude`:

- `@claude soạn lại issue này theo mẫu, hỏi tôi những gì còn thiếu`
- `@claude giải thích PR này bằng ngôn ngữ nghiệp vụ`
- `@claude issue này có trùng với issue nào không?`

## Lưu ý

- Bạn **không** gắn `status:ready-to-dev`; đó là việc của Tech Lead và QA (cổng G2).
- Lỗi phát hiện khi UAT mà AC không nhắc tới là **yêu cầu mới**: tạo issue mới, đừng reject UAT.
- Nếu bạn kiêm PM: không tự ký hai cổng liên tiếp cho cùng một issue.

## Trong sprint

Nhịp sprint và sự kiện: [Quy trình Scrum](../scrum.md).

| Sự kiện | Việc của bạn |
|---|---|
| Refinement | Trả lời câu hỏi, chốt AC, size; bổ sung story Fail to dev (`refine --batch`) |
| Planning | Đưa ưu tiên, cùng team chốt Sprint Goal |
| Duyệt thiết kế | Cùng Designer và khách chọn phương án UI trong 1–2 ngày đầu sprint |
| Sprint Review | Demo với khách, chuyển phản hồi thành story (`sprint review`) |
| Retro (kiêm AI Enablement) | Lỗi AI lặp lại do yêu cầu đầu vào: sửa DoR, template issue, hướng dẫn viết AC (`sprint retro`); xem [AI Enablement](ai-enablement.md) |

<!-- role-skills:start -->
## Skill của bạn

Sinh tự động từ `skills/catalog.json`. Gọi trong Claude Code bằng lệnh ở cột 3; trên GitHub, comment câu ở cột 4 (dùng được cả khi skill không được nạp sẵn).

| Skill | Dùng khi | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Định tuyến theo label; bảng việc theo vai trò | `/dev-pipeline <#>` | `@claude đọc .claude/skills/dev-pipeline/SKILL.md và làm theo cho issue #<số>` |
| `issue-create` | Soạn issue đúng mẫu từ ngôn ngữ tự nhiên | `/issue-create <#>` | `@claude đọc .claude/skills/issue-create/SKILL.md và làm theo cho issue #<số>` |
| `refine` | Phân tích epic (mặc định); refinement hàng loạt, size S–XL, cờ human-code (`--batch`) | `/refine --batch` | `@claude đọc .claude/skills/refine/SKILL.md và làm theo chế độ --batch cho issue #<số>` |
| `uat` | Checklist UAT cho PO (mặc định); PO nghiệm thu, soạn kết luận (`--run`) | `/uat <#> --run` | `@claude đọc .claude/skills/uat/SKILL.md và làm theo chế độ --run cho issue #<số>` |
| `sprint` | Sự kiện Scrum: `plan`, `daily`, `review`, `retro`, `report`, `release` | `/sprint plan|daily|review|retro|report|release` | `@claude đọc .claude/skills/sprint/SKILL.md và làm theo cho issue #<số>` |
<!-- role-skills:end -->
