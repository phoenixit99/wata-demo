# Hướng dẫn cho AI Enablement

Bạn giữ cho AI làm việc tốt: skill, coding standard, cấu hình MCP, và phân tích lỗi AI lặp lại. Ở cấp project
bạn là **process owner**. Ở cấp công ty, AI Enablement sở hữu repo trung tâm `wata-ai-process`.

## Ai đảm nhận

Ở mỗi project, vai trò này do **Tech Lead và PO cùng kiêm nhiệm**, chia theo nguồn gốc của lỗi. Tech Lead chịu
trách nhiệm chính (A) về nền tảng AI; PO chịu trách nhiệm phía yêu cầu đầu vào.

| | Tech Lead (phía kỹ thuật) | PO (phía yêu cầu) |
|---|---|---|
| Phụ trách | Skill, coding standard, `CLAUDE.md`, MCP, workflow agent, chi phí AI, nâng phiên bản quy trình | DoR, mẫu issue và AC, hướng dẫn viết yêu cầu; cùng Designer giữ design system đủ cho AI dùng |
| Lỗi AI lặp lại do | AI làm sai một bước, code lệch chuẩn, cấu hình hỏng | Yêu cầu mơ hồ, AC thiếu, story `fail-to-dev` lặp lại, UAT rejected vì AC không đúng ý |
| Sửa ở | Skill (đề xuất lên repo trung tâm), coding standard, "Bẫy đã biết" trong `CLAUDE.md` | DoR, template issue, `docs/writing-acceptance-criteria.md` (đề xuất), design system (cùng Designer) |

Khai báo cả hai trong `people.ai_enablement` của `.claude/project.yml`. Lưu ý khối lượng: effort của PO đã tăng ở
khâu yêu cầu và refinement ([Scrum mục 7](../scrum.md)); PM theo dõi để PO không quá tải.

## Việc của bạn trong quy trình

| Khi | Bạn làm | Công cụ |
|---|---|---|
| Sprint 0 | Cấu hình MCP (GitHub, Figma, Playwright); chọn công cụ AI tạo Figma; kiểm tra setup; hướng dẫn team dùng skill | [`--check`](/setup-guide) |
| Hằng ngày | Theo dõi `status:needs-human` và lỗi workflow agent; xử lý cấu hình hỏng | GitHub Actions |
| Retrospective | Tổng hợp lỗi AI lặp lại; mỗi lỗi ≥ 2 lần phải có hành động sửa skill, coding standard hoặc DoR | `/sprint retro` |
| Khi cần sửa skill | Mở issue/PR trên repo trung tâm; skill thuộc lõi, không sửa thẳng trong `.claude/skills/` của project | Repo trung tâm |
| Nâng phiên bản quy trình | Đọc CHANGELOG, chạy lệnh cài với `--upgrade`, cập nhật `process_version` | [Cài đặt](/setup-guide) |
| Chi phí AI | Cùng PM theo dõi chi phí token, điều chỉnh `max_turns_per_run` | `project.yml` |

## Chỉ số đánh giá

| Chỉ số | Mục tiêu tham khảo | Chủ yếu của |
|---|---|---|
| Tỉ lệ `needs-human` | Giảm dần qua các sprint | Tech Lead |
| Tỉ lệ đạt review vòng 1 | ≥ 60% | Tech Lead |
| Tỉ lệ fail-to-dev | < 20% và giảm dần | PO |
| Tỉ lệ UAT rejected | Giảm dần | PO |
| Lỗi lặp lại sau retro | Không lặp lại lỗi đã có hành động sửa | Cả hai |
| Chi phí AI mỗi story | Ổn định hoặc giảm | Tech Lead |

## Nguyên tắc

- Sửa nguyên nhân, không sửa triệu chứng: lỗi lặp lại ở nhiều project thì sửa ở lõi.
- Thay đổi skill đi qua PR có review và changelog như code; chạy `npm run sync` và `npm run check` trong repo trung tâm.
- Không nới guardrail để AI "chạy được"; guardrail thuộc Tech Lead và Security.

## Trong sprint

Nhịp sprint và sự kiện: [Quy trình Scrum](../scrum.md).

| Sự kiện | Việc của bạn |
|---|---|
| Sprint 0 | MCP, công cụ Figma, skill, hướng dẫn team ([`--check`](/setup-guide)) |
| Retro | Lỗi AI lặp lại thành hành động sửa skill/standard (`sprint retro`) |

<!-- role-skills:start -->
## Skill của bạn

Sinh tự động từ `skills/catalog.json`. Gọi trong Claude Code bằng lệnh ở cột 3; trên GitHub, comment câu ở cột 4 (dùng được cả khi skill không được nạp sẵn).

| Skill | Dùng khi | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Định tuyến theo label; bảng việc theo vai trò | `/dev-pipeline <#>` | `@claude đọc .claude/skills/dev-pipeline/SKILL.md và làm theo cho issue #<số>` |
| `sprint` | Sự kiện Scrum: `plan`, `daily`, `review`, `retro`, `report`, `release` | `/sprint plan|daily|review|retro|report|release` | `@claude đọc .claude/skills/sprint/SKILL.md và làm theo cho issue #<số>` |
<!-- role-skills:end -->
