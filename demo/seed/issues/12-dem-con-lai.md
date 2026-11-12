title: [feature] Hiện số công việc còn lại dưới danh sách
labels: type:feature, priority:p2, size:s, app:web
demo: 2 (backlog sprint)
---
### Description

Là người dùng, tôi muốn biết còn bao nhiêu việc chưa xong mà không phải đếm tay.

### Acceptance Criteria

- [ ] AC1: Khi có ít nhất một công việc, dưới danh sách hiện "Còn n việc chưa xong", n là số việc chưa đánh dấu xong.
- [ ] AC2: Khi đánh dấu xong, bỏ đánh dấu, thêm hoặc xoá việc, con số cập nhật ngay.
- [ ] AC3: Khi mọi việc đã xong, hiện "Đã xong hết!" thay cho câu đếm.
- [ ] AC4: Khi chưa có công việc nào, không hiện dòng đếm.

### Affected apps

- [x] web

### Design

Brief UI: chữ `text.small`, màu `color.muted`, căn trái dưới danh sách.
