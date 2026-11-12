title: [feature] Sắp xếp công việc bằng kéo thả, nhóm theo dự án, nhãn màu và chế độ xem lịch
labels: type:feature, priority:p3, size:xl, app:web
demo: 2 (size:xl → AI đề xuất tách khi planning)
---
### Description

Là người dùng, tôi muốn tự sắp xếp thứ tự công việc, gom chúng theo dự án, gắn nhãn màu và xem theo lịch tháng.

### Acceptance Criteria

- [ ] AC1: Khi kéo một dòng công việc và thả ở vị trí khác, thứ tự mới được giữ sau khi tải lại trang.
- [ ] AC2: Khi tạo dự án và gán công việc vào dự án, danh sách hiển thị theo nhóm dự án.
- [ ] AC3: Khi gắn nhãn màu cho công việc, dòng đó có chấm màu tương ứng.
- [ ] AC4: Khi chuyển sang chế độ "Lịch", các việc có hạn chót hiện trong ô ngày của lịch tháng.

### Affected apps

- [x] web

### Design

Brief UI: cần Designer bổ sung brief cho chế độ Lịch và kéo thả trước khi vào sprint.

### Technical notes

AC4 phụ thuộc issue "Đặt hạn chót cho công việc".
