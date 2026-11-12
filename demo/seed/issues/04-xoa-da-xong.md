title: [feature] Nút "Xoá các việc đã xong" có hộp xác nhận
labels: type:feature, priority:p2, size:m, app:web
demo: 1 (xoá dữ liệu → đề xuất risk:high, thêm review bảo mật)
---
### Description

Là người dùng, tôi muốn xoá một lần tất cả việc đã xong, để danh sách gọn mà không phải bấm Xoá từng dòng.

### Acceptance Criteria

- [ ] AC1: Khi có ít nhất một việc đã xong, thấy nút "Xoá các việc đã xong (n)" dưới danh sách, n là số việc đã xong; khi không có việc nào đã xong thì nút bị ẩn.
- [ ] AC2: Khi bấm nút, hiện hộp xác nhận "Xoá n việc đã xong? Không thể hoàn tác." với hai nút "Xoá" và "Huỷ".
- [ ] AC3: Khi bấm "Xoá" trong hộp xác nhận, mọi việc đã xong bị xoá khỏi danh sách và khỏi localStorage; các việc đang làm giữ nguyên thứ tự.
- [ ] AC4: Khi bấm "Huỷ" hoặc nhấn Esc, hộp đóng và không việc nào bị xoá.

### Affected apps

- [x] web

### Design

Brief UI: nút biến thể text màu `color.danger`; hộp xác nhận dùng `<dialog>` gốc của trình duyệt, nút "Xoá" primary, "Huỷ" text (design-system mục 4, 6: xoá hàng loạt phải có xác nhận).
