# Sprint 0: thiết lập nền tảng

Một lần cho mỗi dự án, khoảng 1–2 tuần, trước sprint 1. Mục tiêu: AI làm việc đúng chuẩn ngay từ sprint đầu.
Đây là khoản đầu tư ban đầu được dùng lại cho mọi sprint sau ([Quy trình Scrum, mục 6.1](scrum.md)).

## Ai làm gì

| Vai trò | Việc | Đầu ra |
|---|---|---|
| Tech Lead | Chọn kiến trúc; chỉnh coding standard cho từng công nghệ; cài bộ quy trình; branch protection, CODEOWNERS | `project.yml`, coding standard, `CLAUDE.md` |
| PM | Thiết lập label, board, CI, quyền truy cập; ghi số liệu nền; thống nhất SLA phản hồi với khách | Label, board, số liệu nền |
| Security | Duyệt chính sách dữ liệu (dữ liệu nào được đưa cho AI), token và phạm vi quyền của GitHub App, điều khoản AI trong hợp đồng | Biên bản duyệt |
| Designer | Xây dựng và mô tả **design system** ở dạng AI đọc được (màu, font, khoảng cách, component, quy tắc layout, nguyên tắc UX); chuẩn bị brief mẫu | `docs/design-system.md` |
| AI Enablement | Cấu hình MCP (GitHub, Figma, Playwright); thử nghiệm và chọn công cụ để AI tạo/ghi thiết kế vào Figma; hướng dẫn team dùng skill | `.mcp.json`, ghi chú công cụ |
| PO/BA | Chuẩn bị backlog ban đầu theo template; đồng ý DoR/DoD | Backlog đầu tiên |
| AI | Dựng khung monorepo, CI, template issue/PR (lệnh cài một dòng); bản nháp coding standard; kiểm tra checklist (`--check`) | Repository, báo cáo Sprint 0 |

## Checklist

Chạy lệnh cài với `--check` để kiểm tra tự động phần làm được bằng lệnh. Từng bước cài đặt chi tiết ở
[hướng dẫn cài đặt](setup-guide.md).

- [ ] Bộ quy trình đã cài, `process_version` khớp
- [ ] `.claude/project.yml` điền đủ: app, lệnh build chạy được, `people` cho mọi vai trò, SLA, giới hạn WIP
- [ ] Coding standard từng app đã chỉnh; `CLAUDE.md` đã điền
- [ ] Design system đầy đủ, Designer đã duyệt
- [ ] Label đã tạo; board (tuỳ chọn)
- [ ] Branch protection, CODEOWNERS, required checks; GitHub App không có quyền bypass
- [ ] Secret và biến của GitHub App, Anthropic
- [ ] MCP hoạt động trên máy từng người; công cụ tạo Figma đã chọn (hoặc ghi rõ Designer dựng frame)
- [ ] Security đã duyệt chính sách dữ liệu và quyền truy cập
- [ ] Team đã đồng ý DoR (R1–R11) và [Definition of Done](definition-of-done.md)
- [ ] Số liệu nền của 1–2 sprint gần nhất (hoặc dự án tương tự)

## Cổng chất lượng

Tech Lead và Security ký bộ chuẩn và quyền truy cập; Designer ký design system. Chưa ký thì chưa bắt đầu sprint 1.
