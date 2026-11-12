---
name: issue-create
description: "Bước 1 của quy trình WATA. Biến yêu cầu bằng ngôn ngữ tự nhiên của PO/BA thành issue GitHub đúng mẫu (Description, Acceptance Criteria kiểm thử được, Affected apps, Design, Technical notes), đánh dấu giả định. Cũng dùng để giúp PO sửa issue đang ở status:fail-to-dev. Dùng khi \"tạo issue\", \"viết ticket\", \"soạn lại issue theo mẫu\"."
---

# issue-create — Bước 1: tạo issue

> **Vai trò:** PO, BA · **Bước:** 1 · **Chế độ:** tương tác · **Kích hoạt:** người gọi · **Đọc:** `## Triage: FAIL`, `## Feature analysis` · **Ghi:** không ghi lên issue

`$ARGUMENTS`: mô tả yêu cầu, hoặc `<số issue>` để soạn lại một issue có sẵn (thường đang ở
`status:fail-to-dev`).

**Đọc `docs/agents/contract.md` và `docs/agents/writing-acceptance-criteria.md` trước.**

Người dùng skill này thường là **PO hoặc BA**, không phải dev. Dùng ngôn ngữ nghiệp vụ, tránh
thuật ngữ kỹ thuật khi không cần, và giải thích ngắn khi phải dùng.

## Bước 1: Hiểu yêu cầu (chỉ đọc)

1. Nếu là issue có sẵn: đọc đủ theo contract mục 4, đặc biệt comment `## Triage: FAIL` mới nhất,
   vì nó liệt kê phần thiếu và câu chữ đề xuất.
2. **Tìm việc trùng hoặc liên quan** (contract mục 4, bước 6) trước khi soạn: theo từ khoá nghiệp
   vụ và theo màn hình/API có thể bị đụng.
   ```bash
   gh issue list --state all --search "<từ khoá> in:title,body" --json number,title,state,labels
   ```
3. Đọc nhanh code liên quan để biết app nào bị ảnh hưởng và tính năng đã có một phần chưa.
4. Nếu yêu cầu thực chất là nhiều việc (nhiều màn hình, nhiều app, cần quyết định kiến trúc):
   đề xuất tạo **epic** và chạy `refine` thay vì nhồi vào một issue.

## Bước 2: Hỏi những gì còn thiếu

Hỏi người đang chạy, **gộp thành một lượt**, tối đa 5 câu, ưu tiên điều ảnh hưởng tới AC:
ai dùng, khi nào, dữ liệu sai thì sao, điều gì không được xảy ra, có thiết kế chưa.
Điều không hỏi được thì ghi là `[Giả định] ...` trong issue để PO xác nhận.

## Bước 3: Soạn issue

Theo template trong `.github/ISSUE_TEMPLATE/` đúng loại (feature / bug / chore):

```markdown
## Description
<vấn đề và lý do; user story nếu hợp>

## Acceptance Criteria
- [ ] AC1: Khi <hành động>, thì <kết quả quan sát được>
- [ ] AC2: Khi <dữ liệu sai/biên>, thì <kết quả>, và <điều không được xảy ra>

## Affected apps
web / admin / api / mobile

## Design
<link frame Figma, hoặc "Không đổi UI">

## Technical notes
<request/response nếu đổi API; issue liên quan #...; issue chặn #...>

## Assumptions
- [Giả định] ...
```

Tự kiểm bản nháp theo R1–R11 (`docs/agents/process.md` mục 5) trước khi đưa người xem. Mỗi AC phải
quan sát được; thay "nhanh", "dễ dùng" bằng con số hoặc hành vi cụ thể, hoặc hỏi lại.

## Bước 4: Xác nhận rồi ghi (cổng G1)

- Cho người chạy xem **toàn bộ** tiêu đề, body và label sẽ gắn. **Chờ đồng ý.**
- Tạo mới:
  ```bash
  gh issue create --title "<tiêu đề>" --body-file <file> \
    --label "type:<loại>" --label "app:<app>"
  ```
  **Không gắn `status:backlog`.** PO đọc lại trên GitHub và tự gắn `status:backlog`: đó là cổng G1.
  (Issue người tự tạo bằng template thì template gắn sẵn.)
- Soạn lại issue có sẵn: đưa body mới cho PO dán, hoặc `gh issue edit <n> --body-file <file>` khi
  PO đồng ý; sau đó PO chuyển lại `status:backlog` để triage chạy lại.

## Luật

- Không tự quyết phạm vi hay hành vi sản phẩm. Hai cách hiểu → hỏi, hoặc ghi `[Giả định]`.
- Không tạo nhiều issue một lúc khi chưa có epic và `refine` được duyệt.
- Chế độ `--auto` không áp dụng: tạo issue luôn cần người xác nhận.
