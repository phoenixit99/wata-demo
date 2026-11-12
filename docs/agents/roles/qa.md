# Hướng dẫn cho QA

AI sinh test case và chạy automation. Bạn bảo đảm test case đúng và đủ, test phần AI không làm được
(manual, mobile, UX), và có tiếng nói ở cổng G2.

## Việc của bạn trong quy trình

| Khi | Bạn làm | Trên đâu |
|---|---|---|
| **G2** | Đọc bảng test case trong `## Test design: PASS`: thiếu luồng nào, ưu tiên P1–P3 đúng chưa, case nào phải manual/mobile. Ghi phán quyết bằng `test-design --approve` | Claude Code / GitHub |
| Issue `status:qa` | Chạy `/qa --manual <số>`: skill dẫn bạn qua từng case `manual` và `mobile` và ghi kết quả | Staging / thiết bị + GitHub |
| `## QA report` | Kiểm tra kết luận của AI; lỗi AI bỏ sót thì comment kèm bằng chứng | GitHub |
| `status:qa-failed` | Hỗ trợ dev tái hiện | — |
| Định kỳ | Đề xuất bổ sung bộ regression e2e | Repo `e2e/` |

## Ghi kết quả test manual/mobile

`qa --manual` ghi giúp bạn, theo định dạng:

```markdown
## QA manual results

Môi trường: <...> · Thiết bị/phiên bản app: <...> · Commit: <sha> · Người test: @<qa>

| Test case | Ưu tiên | Loại | Kết quả | Bằng chứng / ghi chú |
|---|---|---|---|---|
| TC-42-04 | P1 | mobile | pass | ảnh chụp |
| TC-42-05 | P2 | manual | fail | Bước 3 hiện "..." thay vì "..." |
```
AI gom kết quả này vào `## QA report`. Issue chỉ qua QA khi **mọi case P1** có kết quả đạt.

## Viết test case tốt (khi góp ý ở G2)

- Mỗi AC ít nhất: luồng chính, dữ liệu sai, giá trị biên, và **điều không được xảy ra**.
- Case liên quan nhiều app (web tạo, mobile hiển thị) là case dễ sót nhất.
- Ưu tiên P1 = lỗi thì không release được.

## Trong sprint

Nhịp sprint và sự kiện: [Quy trình Scrum](../scrum.md).

| Sự kiện | Việc của bạn |
|---|---|
| Refinement | Chỉ ra case khó kiểm thử, AC còn mơ hồ |
| Planning | Báo năng lực test manual/mobile của sprint |
| Trong sprint | Duyệt test case (G2), test manual/mobile (`qa --manual`) |
| Retro | Báo lỗi AI bỏ sót khi test |

<!-- role-skills:start -->
## Skill của bạn

Sinh tự động từ `skills/catalog.json`. Gọi trong Claude Code bằng lệnh ở cột 3; trên GitHub, comment câu ở cột 4 (dùng được cả khi skill không được nạp sẵn).

| Skill | Dùng khi | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Định tuyến theo label; bảng việc theo vai trò | `/dev-pipeline <#>` | `@claude đọc .claude/skills/dev-pipeline/SKILL.md và làm theo cho issue #<số>` |
| `test-design` | Test case và plan trước khi code (mặc định); hỗ trợ người ký G2 (`--approve`) | `/test-design <#> --approve` | `@claude đọc .claude/skills/test-design/SKILL.md và làm theo chế độ --approve cho issue #<số>` |
| `qa` | Automation và kết luận QA (mặc định); QA test manual/mobile (`--manual`) | `/qa <#> --manual` | `@claude đọc .claude/skills/qa/SKILL.md và làm theo chế độ --manual cho issue #<số>` |
<!-- role-skills:end -->
