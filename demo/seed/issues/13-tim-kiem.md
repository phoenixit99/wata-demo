title: [feature] Ô tìm kiếm công việc theo tên
labels: type:feature, priority:p3, size:s, app:web
demo: 2 (backlog sprint)
---
### Description

Là người dùng có nhiều công việc, tôi muốn gõ vài chữ để tìm nhanh một việc.

### Acceptance Criteria

- [ ] AC1: Có ô "Tìm công việc" phía trên danh sách; khi gõ, danh sách chỉ còn việc có tên chứa chuỗi đã gõ, không phân biệt hoa thường và không phân biệt dấu ("hop" khớp "Họp sprint").
- [ ] AC2: Khi xoá hết chữ trong ô tìm kiếm, danh sách hiện lại đầy đủ.
- [ ] AC3: Khi không có việc nào khớp, hiện "Không tìm thấy công việc nào khớp “<chuỗi>”."

### Affected apps

- [x] web

### Design

Brief UI: Input text rộng hết hàng, đặt dưới form thêm việc (design-system mục 4, 5).
