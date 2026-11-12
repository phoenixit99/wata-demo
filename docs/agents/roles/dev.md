# Hướng dẫn cho Developer

AI viết phần lớn code. Bạn duyệt plan, xử lý ca khó, gỡ kẹt cho AI, và luôn có thể tự code.

## Việc của bạn trong quy trình

| Khi | Bạn làm | Lệnh |
|---|---|---|
| Bắt đầu ngày | Xem việc nên làm | `/dev-pipeline` |
| **Cổng G2** (khi được giao) | Đọc `## Test design: PASS`: plan, phạm vi ảnh hưởng, những gì không làm. Dùng `test-design --approve` ghi phán quyết; khi QA cũng đồng ý, một người gắn `status:ready-to-dev` | `/test-design --approve <số>` |
| `status:needs-human` | Đọc `## Needs human`, quyết định, ghi phán quyết, chuyển lại trạng thái phù hợp | GitHub / Claude Code |
| `status:qa-failed`, `status:uat-failed` | Sửa đúng lỗi đã nêu | `/implement --fix <số>` |
| Ca phức tạp | Chạy tương tác thay vì tự động | `/implement <số>` |
| Tự code | Nhận issue, code như bình thường; vẫn đi qua `in-review` → `qa` → G3/G4 → UAT | — |
| Review bằng AI cho PR của mình | Chạy trong **session mới** | `/pr-review <số>` |

## Chạy tương tác

Ở chế độ tương tác, AI làm việc **cùng bạn**: báo phát hiện trong lúc làm, hỏi khi có hai cách hiểu,
và **hỏi trước mỗi lần ghi** (comment, label, commit, push, PR). Bạn đọc, phản biện, và quyết định.

## Những điều nên nhớ

- Mỗi bước một session. Đừng để session vừa code tự review code đó.
- Test viết trước; bug phải có test đỏ trước khi sửa.
- Đổi API: giữ tương thích với `mobile.supported_app_versions` bản app cũ.
- PR dùng `Refs #<số>`, không dùng `Closes`: issue chỉ đóng sau UAT.
- Bạn không merge PR của chính mình khi issue là `risk:high` mà chưa có G3 của người khác.

## Trong sprint

Nhịp sprint và sự kiện: [Quy trình Scrum](../scrum.md).

| Sự kiện | Việc của bạn |
|---|---|
| Refinement | Đánh giá tính khả thi, đề xuất tách story |
| Planning | Chọn story, nhận story `human-code` |
| Trong sprint | Duyệt plan (G2), giám sát AI, sửa ca khó, review PR trong khung giờ cố định |
| Retro | Báo lỗi AI lặp lại cho AI Enablement |

<!-- role-skills:start -->
## Skill của bạn

Sinh tự động từ `skills/catalog.json`. Gọi trong Claude Code bằng lệnh ở cột 3; trên GitHub, comment câu ở cột 4 (dùng được cả khi skill không được nạp sẵn).

| Skill | Dùng khi | Claude Code | GitHub |
|---|---|---|---|
| `dev-pipeline` | Định tuyến theo label; bảng việc theo vai trò | `/dev-pipeline <#>` | `@claude đọc .claude/skills/dev-pipeline/SKILL.md và làm theo cho issue #<số>` |
| `test-design` | Test case và plan trước khi code (mặc định); hỗ trợ người ký G2 (`--approve`) | `/test-design <#> --approve` | `@claude đọc .claude/skills/test-design/SKILL.md và làm theo chế độ --approve cho issue #<số>` |
| `implement` | Code theo plan, mở PR (mặc định); sửa sau QA/UAT (`--fix`); frame Figma thành UI (`--figma`) | `/implement <#>  ·  --fix  ·  --figma <link>` | `@claude đọc .claude/skills/implement/SKILL.md và làm theo cho issue #<số>` |
| `pr-review` | Review PR ở session riêng, hai lượt (mặc định); Designer so UI với Figma (`--design`) | `/pr-review <#>` | `@claude đọc .claude/skills/pr-review/SKILL.md và làm theo cho issue #<số>` |
| `hotfix` | Sửa khẩn cấp production | `/hotfix <#>` | `@claude đọc .claude/skills/hotfix/SKILL.md và làm theo cho issue #<số>` |
<!-- role-skills:end -->
