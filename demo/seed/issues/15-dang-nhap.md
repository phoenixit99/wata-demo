title: [feature] Đăng nhập bằng email để đồng bộ công việc giữa các thiết bị
labels: type:feature, priority:p3, size:l, app:web, risk:high, human-code
demo: 2 (risk:high + human-code → cần người code, ảnh hưởng năng lực sprint)
---
### Description

Là người dùng, tôi muốn đăng nhập để công việc trên điện thoại và máy tính giống nhau.

### Acceptance Criteria

- [ ] AC1: Khi nhập email hợp lệ và bấm "Gửi link đăng nhập", nhận được email có link đăng nhập dùng một lần, hết hạn sau 15 phút.
- [ ] AC2: Khi mở link còn hạn, được đăng nhập và thấy danh sách công việc đã lưu trên máy chủ.
- [ ] AC3: Khi mở link đã dùng hoặc hết hạn, thấy "Link đăng nhập không còn hiệu lực" và không được đăng nhập.
- [ ] AC4: Lần đầu đăng nhập trên một máy đã có công việc trong localStorage, được hỏi "Đưa n việc trên máy này lên tài khoản?" với hai lựa chọn Có / Không.

### Affected apps

- [x] web

### Design

Brief UI: màn hình đăng nhập một cột, Input email + Button primary.

### Technical notes

Cần backend mới (chưa có trong repo): API gửi link, lưu công việc. Đụng `**/auth/**` (high_risk_paths). Cần quyết định nhà cung cấp email.
