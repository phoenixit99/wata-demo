# Hướng dẫn cho BA (Business Analyst)

Bạn biến nhu cầu kinh doanh thành yêu cầu làm được: phân tích feature, chia issue, làm rõ nghiệp vụ.

## Việc của bạn trong quy trình

| Khi | Bạn làm | Công cụ | Xong khi |
|---|---|---|---|
| Có feature lớn (epic) | Tạo issue loại epic; chạy (hoặc nhờ dev chạy) `/refine <số>`, hoặc comment `@claude phân tích epic này theo skill refine` | GitHub / Claude Code | Có `## Feature analysis` |
| Sau phân tích | Cùng PO và Tech Lead chốt hướng, API contract, danh sách issue con | GitHub comment | PO và Tech Lead đồng ý |
| Tạo issue con | Dùng `/issue-create` hoặc template; link về epic ("Part of #<epic>") | GitHub / Claude Code | Issue đủ AC; PO gắn `status:backlog` (G1) |
| Issue `status:fail-to-dev` về nghiệp vụ | Bổ sung theo comment triage | GitHub | Trong SLA |
| `## Needs human` về nghiệp vụ | Trả lời, ghi lý do | GitHub | — |
| Khi PO uỷ quyền | Ký cổng G1 thay PO | GitHub | — |

## Chia issue con tốt

- Mỗi issue **nằm gọn trong một PR review được** (thường dưới vài trăm dòng thay đổi).
- Thứ tự: contract chung → API → web/admin → mobile. Issue sau ghi rõ phụ thuộc issue trước.
- Mỗi issue có AC riêng, kiểm thử độc lập được.
- **Chốt API contract trước** khi các app bắt đầu, để không ai code trên contract đang đổi.

## Dùng Claude Code (khuyến nghị cho BA)

```
/refine 120        # phân tích epic #120
/issue-create <mô tả> # soạn issue con
/dev-pipeline                # xem bảng việc hôm nay
```

## Trong sprint

Nhịp sprint và sự kiện: [Quy trình Scrum](../scrum.md).

| Sự kiện | Việc của bạn |
|---|---|
| Refinement | Làm rõ nghiệp vụ, tách story, đề xuất AC (`refine --batch`) |
| Planning | Giải thích story cho team |
| Sprint Review | Ghi nhận phản hồi, chuẩn bị story mới |

<!-- role-skills:start -->
## Skill của bạn

Sinh tự động từ `skills/catalog.json`. Gọi trong Claude Code bằng lệnh ở cột 3; trên GitHub, comment câu ở cột 4 (dùng được cả khi skill không được nạp sẵn).

| Skill | Dùng khi | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Định tuyến theo label; bảng việc theo vai trò | `/dev-pipeline <#>` | `@claude đọc .claude/skills/dev-pipeline/SKILL.md và làm theo cho issue #<số>` |
| `issue-create` | Soạn issue đúng mẫu từ ngôn ngữ tự nhiên | `/issue-create <#>` | `@claude đọc .claude/skills/issue-create/SKILL.md và làm theo cho issue #<số>` |
| `refine` | Phân tích epic (mặc định); refinement hàng loạt, size S–XL, cờ human-code (`--batch`) | `/refine <#>` | `@claude đọc .claude/skills/refine/SKILL.md và làm theo cho issue #<số>` |
<!-- role-skills:end -->
