title: [feature] Đặt hạn chót cho công việc và tô đỏ việc quá hạn
labels: type:feature, priority:p1, size:m, app:web
demo: 2 (backlog sprint)
---
### Description

Là người dùng, tôi muốn gắn hạn chót cho công việc và thấy ngay việc nào đã quá hạn, để không bỏ lỡ việc gấp.

### Acceptance Criteria

- [ ] AC1: Form thêm việc có ô chọn ngày "Hạn chót" (không bắt buộc); khi thêm việc có chọn ngày, dòng công việc hiện "Hạn: dd/mm/yyyy".
- [ ] AC2: Khi hạn chót trước ngày hôm nay và việc chưa xong, chữ ngày hiện màu `color.danger` kèm chữ "(quá hạn)".
- [ ] AC3: Khi việc đã đánh dấu xong, không hiện "(quá hạn)" dù hạn chót đã qua.
- [ ] AC4: Khi chọn ngày trong quá khứ lúc thêm việc, vẫn cho thêm (người dùng ghi lại việc trễ) và hiện "(quá hạn)" ngay.
- [ ] AC5: Dữ liệu cũ trong localStorage không có hạn chót vẫn hiển thị bình thường, không lỗi.

### Affected apps

- [x] web

### Design

Brief UI: Input biến thể date đặt giữa ô tên và nút "Thêm"; ngày dùng `text.small` (design-system mục 2, 4).

### Technical notes

So sánh theo ngày lịch giờ địa phương, không theo mốc giờ. Hàm `isOverdue(task, today)` thuần, có test.
