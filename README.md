# WATA Demo — Quy trình phát triển và Scrum ứng dụng AI Agent

Repo **mẫu** để trình diễn [Quy trình WATA AI](https://github.com/phoenixit99/wata-ai-process) (v1.5.0) trên một
project chạy thật: app web quản lý công việc nhỏ, đã cài đủ skill, label, cổng kiểm soát và CI của quy trình.

> Đây không phải sản phẩm. Không có backend, không có dữ liệu thật. Mọi issue và PR trong repo là dữ liệu demo.

**Kịch bản demo (bắt đầu từ đây): [`demo/README.md`](demo/README.md)**

## Hai demo

| Demo | Cho ai | Nội dung | Thời lượng |
|---|---|---|---|
| **1. Quy trình phát triển** | Dev, QA | Một story đi qua 9 bước và 5 cổng: yêu cầu → triage → test design → code → review ở session riêng → QA → merge → nghiệm thu. Kèm các nhánh: issue mơ hồ bị trả lại, rủi ro thấp được bỏ cổng, rủi ro cao thêm review | 35–45 phút |
| **2. Quản lý Scrum** | Dev, QA, PM | Planning theo năng lực review/QA, daily tập trung việc bị chặn, sprint review, retro biến lỗi AI lặp lại thành đề xuất sửa skill | 20–25 phút |
| 3. Lãnh đạo, PM, PO | Lãnh đạo, PM, PO | Rút gọn từ hai demo trên (đang chuẩn bị) | — |

**Thông điệp chính:** AI làm phần việc, con người giữ các cổng. AI không duyệt plan (G2), không merge (G4), không
nghiệm thu (G5).

## Bắt đầu nhanh

Cần: Node ≥ 20, `gh` đã đăng nhập, [Claude Code](https://claude.com/claude-code).

```bash
git clone git@github.com:phoenixit99/wata-demo.git && cd wata-demo
npm --prefix apps/web ci
npm --prefix apps/web test          # unit + component (Vitest)
npm --prefix apps/web run e2e       # Playwright (lần đầu: npx --prefix apps/web playwright install chromium)
npm --prefix apps/web run dev       # http://localhost:5173

claude                              # mở Claude Code TỪ THƯ MỤC REPO để nạp skill
> /dev-pipeline                     # bảng việc theo vai trò; thấy bảng là skill đã nạp
```

Sau đó làm theo [`demo/README.md`](demo/README.md): **Giai đoạn 2 (tập dượt) là bắt buộc** trước buổi demo, vì
Demo 2 cần lịch sử sprint thật.

## Issue mẫu

| # | Issue | Dùng cho |
|---|---|---|
| [#1](https://github.com/phoenixit99/wata-demo/issues/1) | Lọc danh sách theo trạng thái | Demo 1, luồng chính (chạy live, **giữ sạch**) |
| [#2](https://github.com/phoenixit99/wata-demo/issues/2) | Cải thiện màn hình công việc (cố ý mơ hồ) | Demo 1, triage FAIL → `fail-to-dev` |
| [#3](https://github.com/phoenixit99/wata-demo/issues/3) | Đổi câu trạng thái rỗng | Demo 1, `risk:low` → bỏ cổng G3 |
| [#4](https://github.com/phoenixit99/wata-demo/issues/4) | Xoá các việc đã xong | Demo 1, xoá dữ liệu → `risk:high` |
| [#5](https://github.com/phoenixit99/wata-demo/issues/5)–[#8](https://github.com/phoenixit99/wata-demo/issues/8) | Hạn chót, sửa tên, đếm việc còn lại, tìm kiếm | Demo 2: #6, #7 làm Sprint 1 khi tập dượt; #5, #8 dở dang ở Sprint 2 |
| [#9](https://github.com/phoenixit99/wata-demo/issues/9) | Kéo thả + dự án + nhãn + lịch (`size:xl`) | Demo 2, planning đề xuất tách |
| [#10](https://github.com/phoenixit99/wata-demo/issues/10) | Đăng nhập email (`risk:high`, `human-code`) | Demo 2, việc bị chặn, cần người code |

Nội dung issue nằm ở [`demo/seed/issues/`](demo/seed/issues); tạo lại bằng
`python3 -I demo/seed/seed.py phoenixit99/wata-demo` (bỏ qua issue đã có).

## Cấu trúc

```
wata-demo/
├── apps/web/                 App React 19 + Vite + TypeScript
│   ├── src/tasks.ts          Nghiệp vụ thuần (thêm, đánh dấu xong, xoá, lưu localStorage) + tasks.test.ts
│   ├── src/App.tsx           Giao diện + App.test.tsx (Testing Library)
│   └── e2e/                  Test Playwright (skill qa viết thêm vào đây)
├── demo/
│   ├── README.md             Kịch bản demo từng bước
│   └── seed/                 Issue mẫu + script tạo issue
├── .claude/
│   ├── skills/               13 skill của quy trình (triage, test-design, implement, pr-review, qa, sprint…)
│   └── project.yml           Cấu hình project: app, lệnh, người ký cổng, SLA, WIP
├── .github/                  Issue template, label, CODEOWNERS, CI, workflow wata-*
├── docs/
│   ├── agents/               Tài liệu quy trình (contract, process, scrum, risk tiers, DoD…)
│   ├── coding-standards/     Coding standard React + Vite
│   └── design-system.md      Design system (đầu vào cho skill design-brief)
└── CLAUDE.md                 Luật cho AI trong repo này
```

## Khác với một project thật

Repo demo cố ý cấu hình khác project thật ở mấy điểm. **Đừng copy các giá trị này sang project thật.**

| Điểm | Repo demo | Project thật |
|---|---|---|
| Người ký cổng (`people` trong `project.yml`) | Một người (`phoenixit99`) đóng mọi vai | Mỗi vai một người hoặc một team |
| `sla_hours` | 1 giờ, để `/sprint daily` có mục "Quá SLA" | 8–48 giờ |
| `limits.wip_*` | 1, để thấy vượt WIP | 3 / 4 / 4 |
| Workflow tự động `wata-agent`, `wata-mention`, `wata-pr-merged`, `wata-sla-reminder` | **Tắt**: mọi bước chạy tương tác cho khán giả xem | Bật, cần GitHub App + secrets ([setup-guide mục 3](docs/agents/setup-guide.md)) |
| Branch protection `main` | Bắt buộc PR, Code Owner approve, CI `web` xanh, cấm force-push; **admin bypass được** | Không cho ai bypass |
| `merge-gate --merge` | Báo `NOT READY` ở M7 (tác giả PR không tự approve được), merge bằng quyền admin | Code Owner khác approve, `READY` |

Bật lại workflow tự động: `gh workflow enable wata-agent -R phoenixit99/wata-demo` (tương tự cho các workflow khác),
sau khi đã cấu hình `WATA_APP_ID`, `WATA_APP_PRIVATE_KEY`, `ANTHROPIC_API_KEY`.

## Quy trình được cài

- Phiên bản: `1.5.0` (ghim trong `.claude/project.yml` → `process_version`)
- Nguồn: [phoenixit99/wata-ai-process](https://github.com/phoenixit99/wata-ai-process). Bản gốc của quy trình là
  `docs/process.md` ở repo đó; `docs/agents/` ở đây là bản sao khi cài.
- Nâng cấp: `curl -fsSL https://raw.githubusercontent.com/phoenixit99/wata-ai-process/main/scripts/bootstrap.sh | bash -s -- --upgrade`
- Kiểm tra Sprint 0: thay `--upgrade` bằng `--check`
