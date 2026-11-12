title: [feature] Lọc danh sách công việc theo trạng thái: Tất cả / Đang làm / Đã xong
labels: type:feature, priority:p1, size:s, app:web
demo: 1 (happy path, đi hết quy trình)
---
### Description

Là người dùng có nhiều công việc, tôi muốn chỉ xem những việc đang làm hoặc đã xong, để tập trung vào việc còn lại
mà không phải cuộn qua các việc đã hoàn thành.

### Acceptance Criteria

- [ ] AC1: Khi mở app, thấy nhóm 3 nút lọc "Tất cả", "Đang làm", "Đã xong" giữa form thêm việc và danh sách; "Tất cả" đang được chọn (`aria-pressed="true"`).
- [ ] AC2: Khi bấm "Đang làm", danh sách chỉ còn các việc chưa đánh dấu xong; bấm "Đã xong" thì chỉ còn các việc đã đánh dấu xong; bấm "Tất cả" thì hiện lại toàn bộ.
- [ ] AC3: Khi đang lọc "Đang làm" và đánh dấu xong một việc, việc đó biến mất khỏi danh sách ngay, không cần bấm lại nút lọc.
- [ ] AC4: Khi bộ lọc không có việc nào khớp, hiện câu "Không có công việc nào trong mục này." (khác câu khi chưa có việc nào: "Chưa có công việc nào.").
- [ ] AC5: Khi tải lại trang, bộ lọc quay về "Tất cả"; danh sách công việc vẫn giữ nguyên (không mất dữ liệu đã lưu).

### Affected apps

- [x] web

### Design

Brief UI: nhóm nút theo `docs/design-system.md` mục 4 (Button biến thể text cho nút chưa chọn, primary cho nút đang chọn), đặt theo mục 5 (giữa form và danh sách). Không cần Figma cho demo.

### Technical notes

Logic lọc viết thành hàm thuần trong `apps/web/src/tasks.ts` (ví dụ `filterTasks(tasks, filter)`), có unit test. Không lưu bộ lọc vào localStorage (AC5).
