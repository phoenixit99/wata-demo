title: [chore] Đổi câu trạng thái rỗng thành "Chưa có công việc nào. Hãy thêm việc đầu tiên!"
labels: type:chore, priority:p3, size:s, app:web
demo: 1 (risk:low → bỏ cổng G3)
---
### Description

Câu hiện tại "Chưa có công việc nào." không gợi ý người dùng làm gì tiếp. PO muốn thêm lời mời thêm việc đầu tiên.

### Acceptance Criteria

- [ ] AC1: Khi chưa có công việc nào, hiện đúng câu "Chưa có công việc nào. Hãy thêm việc đầu tiên!"
- [ ] AC2: Test hiện có vẫn qua sau khi cập nhật chuỗi mong đợi; không đổi hành vi nào khác.

### Affected apps

- [x] web

### Design

Chỉ đổi chữ, giữ style `.empty` theo `docs/design-system.md`.
