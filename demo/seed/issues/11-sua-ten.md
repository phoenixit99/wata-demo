title: [feature] Sửa tên công việc bằng nút "Sửa" trên từng dòng
labels: type:feature, priority:p2, size:s, app:web
demo: 2 (backlog sprint)
---
### Description

Là người dùng, tôi muốn sửa tên công việc đã thêm, để chỉnh lỗi chính tả mà không phải xoá rồi thêm lại.

### Acceptance Criteria

- [ ] AC1: Mỗi dòng có nút "Sửa" (`aria-label` = `Sửa "<tên>"`); bấm vào thì tên đổi thành ô nhập, có sẵn tên cũ và được focus.
- [ ] AC2: Khi nhấn Enter với tên hợp lệ, tên mới được lưu và ô nhập trở lại thành chữ.
- [ ] AC3: Khi nhấn Esc, ô nhập đóng và tên giữ nguyên như trước khi sửa.
- [ ] AC4: Khi lưu tên rỗng hoặc dài quá 120 ký tự, hiện đúng thông báo lỗi như form thêm việc và không lưu.

### Affected apps

- [x] web

### Design

Brief UI: nút "Sửa" biến thể text đặt trước nút "Xoá" (design-system mục 5).
