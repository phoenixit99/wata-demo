# Hướng dẫn cài đặt cho một project

Dành cho Tech Lead và PM của project. Làm theo thứ tự; mỗi mục có cách kiểm tra.

## 0. Điều kiện trước

- [ ] Hợp đồng và chính sách dữ liệu của khách hàng **cho phép dùng AI** trên source code và dữ liệu test
- [ ] Repo trên GitHub (org), có quyền admin để cấu hình branch protection, secrets, GitHub App
- [ ] Repo nên là private. Nếu public: `wata-agent` chỉ chạy cho issue do OWNER/MEMBER/COLLABORATOR tạo, nhưng vẫn nên xem lại quyền của GitHub App
- [ ] Đã ghi số liệu nền 1–2 sprint gần nhất (lead time, số bug sau release) để so sánh sau pilot

## 1. Cài bộ quy trình vào repo

Vào thư mục repo project và dán **một lệnh**:

```bash
cd <project-repo>
curl -fsSL https://raw.githubusercontent.com/phoenixit99/wata-ai-process/main/scripts/bootstrap.sh | bash
```
Lệnh tải bản quy trình mới nhất vào thư mục tạm, copy template, skill, contract vào repo, tự điền `repo:` trong
`.claude/project.yml` từ `git remote origin`, rồi xoá thư mục tạm. Cần `git`, `curl`, `tar`, `python3`.

- Nâng cấp: `curl -fsSL https://raw.githubusercontent.com/phoenixit99/wata-ai-process/main/scripts/bootstrap.sh | bash -s -- --upgrade`
- Kiểm tra Sprint 0: `curl -fsSL https://raw.githubusercontent.com/phoenixit99/wata-ai-process/main/scripts/bootstrap.sh | bash -s -- --check`
- Ghim phiên bản (khuyên dùng cho project đang chạy): thêm `WATA_REF=v1.5.0` trước `bash`, ví dụ `... | WATA_REF=v1.5.0 bash`
- Đã clone repo quy trình: `~/wata-ai-process/scripts/install.sh .` vẫn dùng được như trước

Sau khi cài, **mở Claude Code từ chính thư mục project** (`cd <project-repo> && claude`) thì mới gọi được `/issue-create`,
`/dev-pipeline`... Mở từ thư mục khác sẽ báo `Unknown command`.

Script **không ghi đè** file cấu hình đã có (in ra danh sách bỏ qua); so sánh và gộp tay các file đó. `--upgrade` chỉ ghi đè lớp lõi (skill, `docs/agents/*`, workflow `wata-*.yml`, `labels.yml`).

Kiểm tra: có `.claude/skills/triage/SKILL.md`, `docs/agents/contract.md`, `.github/workflows/wata-agent.yml`.

## 2. Điền cấu hình

- [ ] `.claude/project.yml`: `repo`, `apps` (đường dẫn, stack, lệnh lint/typecheck/test/build chạy được thật), `e2e`, `people`, `sla_hours`, `limits`
- [ ] `CLAUDE.md`: mô tả project, cách chạy local, bẫy đã biết
- [ ] Coding standard: copy từ `docs/coding-standards/` vào đường dẫn khai báo ở `apps[].standard`, Tech Lead chỉnh
- [ ] `.github/CODEOWNERS`: thay `@<org>/...` bằng team thật
- [ ] `.github/ISSUE_TEMPLATE/*.yml`: danh sách app trong checkbox khớp `project.yml`

Kiểm tra: chạy từng lệnh trong `apps[].commands` trên máy local, tất cả chạy được.

## 3. GitHub App cho agent (bắt buộc)

Sự kiện do `GITHUB_TOKEN` mặc định tạo ra **không kích hoạt workflow mới** (trừ `workflow_dispatch`
và `repository_dispatch`). Nếu agent đổi label bằng `GITHUB_TOKEN`, bước sau sẽ không bao giờ chạy và
không có lỗi nào báo. Vì vậy agent dùng token của một GitHub App.
([GitHub Docs](https://docs.github.com/en/actions/concepts/security/github_token))

- [ ] Tạo GitHub App ở cấp org (một app dùng chung cho các project là đủ), quyền tối thiểu:
      Contents: read & write · Issues: read & write · Pull requests: read & write · Metadata: read ·
      Actions: read. **Không** cấp Administration, không thêm vào danh sách bypass branch protection.
- [ ] Cài app vào repo của project
- [ ] Repo variables: `WATA_APP_ID`. Repo secrets: `WATA_APP_PRIVATE_KEY`, `ANTHROPIC_API_KEY`

Kiểm tra: tạo issue thử, gắn `status:backlog`; workflow `wata-agent` chạy triage, và khi triage gắn
`status:test-design` thì một lần chạy `wata-agent` mới xuất hiện.

## 4. Kiểm tra workflow Claude Code

- [ ] Tên input (`prompt`, `anthropic_api_key`, `github_token`, `claude_args`) đã được đối chiếu với
      `action.yml` của `anthropics/claude-code-action`. Khi nâng phiên bản action, đối chiếu lại.
- [ ] Thử `@claude` trên một issue: nếu AI không nhận ra tên skill, dùng câu gọi dự phòng
      `@claude đọc .claude/skills/<skill>/SKILL.md và làm theo cho issue #<số>` (có trong trang vai trò).
- [ ] Thêm bước cài toolchain (Node/pnpm, Flutter, Playwright) vào `wata-agent.yml` ở chỗ `TODO(project)`
- [ ] Skill được cài ở `.claude/skills/` nên gọi trực tiếp `/triage`. Nếu dùng dạng plugin
      thay vì copy, tên skill có tiền tố `wata:` và cần sửa `prompt` trong workflow tương ứng.

## 5. Label và board

```bash
~/wata-ai-process/scripts/setup-labels.sh <owner>/<repo>
```
- [ ] Bộ label `status:*`, `type:*`, `risk:*`, `priority:*`, `round:*`, `app:*` đã tạo
- [ ] (Tuỳ chọn) GitHub Projects board để xem; cột theo label `status:*`. Board chỉ để xem, label là nguồn sự thật

## 6. Guardrail phía server (bắt buộc)

Trên nhánh `main` (Settings → Branches hoặc Rulesets):

- [ ] Bắt buộc pull request trước khi merge
- [ ] Bắt buộc approval, bật **Require review from Code Owners**
- [ ] Bỏ approval cũ khi có commit mới (dismiss stale approvals)
- [ ] Required status checks: các job trong `ci.yml`
- [ ] Cấm force-push, cấm xoá nhánh
- [ ] Không cho GitHub App của agent bypass

Kiểm tra: thử push thẳng vào `main` bằng token của app → bị từ chối.

## 7. Máy của từng người

- [ ] Cài Claude Code; mở repo; chạy `/dev-pipeline` thấy bảng việc
- [ ] Biến môi trường `GITHUB_MCP_TOKEN` (fine-grained PAT, chỉ repo của project) cho GitHub MCP
- [ ] Figma MCP: bật Dev Mode MCP server trong Figma Desktop. Địa chỉ trong `.mcp.json`
      (`http://127.0.0.1:3845/mcp`) cần đối chiếu với tài liệu Figma hiện hành
- [ ] `gh auth login` (skill dùng `gh` CLI)

## 8. Pilot

1. Tuần đầu chỉ bật triage và test design (gỡ các nhánh khác khỏi `case` trong `wata-agent.yml`, hoặc
   chạy tương tác).
2. Bật implement và review khi G2 chạy trơn tru.
3. Bật QA và UAT.
4. Sau 2–4 tuần: `/sprint report 30`, so với số liệu nền, retro, gửi đề xuất sửa skill về repo trung tâm.
