---
name: implement
description: "Bước 4 và 6b của quy trình WATA. Chế độ mặc định (tự động khi status:ready-to-dev, hoặc status:in-progress sau Code review/QA report FAIL): code theo plan đã duyệt ở G2, test trước, mở PR \"Refs #<số>\", đăng \"## Build write-up\". Chế độ --fix (dev gọi): sửa issue status:qa-failed hoặc status:uat-failed, đăng \"## QA fix\". Chế độ --figma <link> [issue]: chuyển frame Figma thành UI theo design system. Dùng khi \"code issue này\", \"implement\", \"sửa theo review\", \"sửa lỗi QA\", \"code từ Figma\"."
---

# implement — Bước 4 và 6b

> **Vai trò:** Dev · **Bước:** 4, 6b · **Chế độ:** tự động + tương tác · **Kích hoạt:** label `status:ready-to-dev`, `status:in-progress` (tự động) hoặc người gọi · **Đọc:** `## Test design: PASS`, `## Plan approval`, `## Code review: FAIL`, `## QA report: FAIL`, `## Design approval: APPROVED`, `## UAT: REJECTED` · **Ghi:** `## Build write-up`, `## Needs human`, `## QA fix`

`$ARGUMENTS`: không có cờ chế độ thì chạy chế độ mặc định; `--fix`, `--figma` chọn chế độ khác. Đối số còn lại theo từng chế độ bên dưới.

**Đọc `docs/agents/contract.md` trước.**

| Gọi | Việc | Chế độ chạy | Ghi |
|---|---|---|---|
| `/implement` | Bước 4: code và mở PR | tự động + tương tác | `## Build write-up`, `## Needs human` |
| `/implement --fix` | Bước 6b: sửa sau QA hoặc UAT | tương tác | `## QA fix` |
| `/implement --figma` | từ frame Figma ra UI | tương tác | không ghi lên issue |

## Luật

- **`--auto` (do `wata-agent` gọi) chỉ chạy chế độ mặc định.** Các chế độ `--fix`, `--figma` là việc của con người: nếu có `--auto` cùng một trong các cờ này thì dừng, không ghi gì, báo lỗi gọi sai.
- Chỉ ghi heading của chế độ đang chạy.
- Mỗi chế độ giữ luật riêng của nó (mục "Luật" trong phần của chế độ đó).

## Chế độ mặc định: Bước 4: code và mở PR

`$ARGUMENTS`: `<số issue> [--auto]`. Trống: liệt kê issue `status:ready-to-dev` theo priority và
issue `status:in-progress` của người chạy, hỏi làm issue nào.

**Đọc `docs/agents/contract.md` trước**, đặc biệt mục 7 (code, branch, PR).

### Bước 0: Ngữ cảnh (chỉ đọc)

1. Issue đủ theo contract mục 4.
2. **Xác định chế độ** từ heading mới nhất:
   - `## Test design: PASS` + label `status:ready-to-dev` → **làm mới**.
   - `## Code review: FAIL` hoặc `## QA report: FAIL` mới hơn `## Build write-up` → **chế độ sửa**:
     spec của lần chạy này là các finding trong comment đó, không hơn. Đọc label `round:*`.
3. **Story có label `human-code`:** người code trực tiếp; dừng, không code (tương tác: hỏi người chạy có phải người được giao không và chỉ hỗ trợ khi được yêu cầu).
4. **Cổng G2 phải đã qua.** Làm mới mà không có `## Test design: PASS`, hoặc `status:ready-to-dev`
   không do người gắn (xem timeline): dừng, báo, không code.
5. PR hiện có của issue (cả PR đã đóng) và những gì đã merge vào vùng code này kể từ test design.
   **Tiền đề còn đúng không trên `origin/main` mới nhất?** Có thể đã có người sửa.
6. Code ở mọi app trong plan, coding standard của từng app, `.claude/project.yml` (lệnh build).

### Bước 1: Nhận việc

- Làm mới: đọc lại label, gắn `status:in-progress`. Issue chưa có assignee thì assign người chạy
  (tương tác) hoặc để trống (tự động). Không đổi assignee của người khác.
- Tương tác: nhắc lại plan đã duyệt trong 5–10 dòng, nêu điều gì đã thay đổi kể từ G2. **Chờ đồng ý.**
- Plan không còn đúng (code đã đổi, AC mâu thuẫn): **dừng**. Tương tác: hỏi. Tự động: đăng
  `## Needs human` (vấn đề, các phương án, hệ quả), gắn `status:needs-human`.

### Bước 2: Code

1. Branch từ `origin/main` mới nhất: `feat|fix|chore/<số>-<slug>`. Chế độ sửa: checkout branch của PR.
2. **Test trước.** Mỗi test case loại `unit`/`integration` trong bảng `e2e/test-cases/<số>.md` thành
   test thật, chạy và cho thấy **đỏ** trên code chưa sửa. Bug: tái hiện lỗi trước, lưu output.
3. Code theo thứ tự contract chung → API → web/admin → mobile, theo coding standard. Không thêm
   thư viện hay nâng phiên bản nếu plan không có.
4. Đổi API: response cũ vẫn dùng được cho `mobile.supported_app_versions` bản app gần nhất.
5. Đổi UI: code theo frame trong `## Design approval: APPROVED` (không có thì dừng: story UI chưa qua G2);
   thêm `data-testid` cho phần tử mà test case `auto` cần; lấy thiết kế qua Figma MCP (skill `implement --figma`).
6. Commit theo Conventional Commits, có `#<số>`.
7. Tương tác: **cho xem diff** (mỗi file, một câu cho mỗi hunk, cái gì plan không nhắc) và chờ đồng ý.

### Bước 3: Chứng minh

1. Chạy lint, typecheck, test, build của **mọi app bị đụng** bằng lệnh trong `project.yml`. Lưu output.
2. Test của bước 2 giờ **xanh**. Lỗi cũng fail trên `main` sạch thì ghi rõ, không giấu.
3. **Phá thử:** đảo một điều kiện chính, cho thấy test đúng chuyển đỏ, rồi hoàn lại.
4. Chạy thử thật khi làm được (API local + request, web trên localhost). Nói rõ điều không chạy được.

Bất kỳ bước nào fail mà không sửa được sau 2 lần thử: dừng, `## Needs human` kèm output.

### Bước 4: Write-up và PR

Soạn `## Build write-up` (kiểm từng câu khẳng định với branch):

```markdown
## Build write-up

### Đã làm
- AC1 → `<file>`: <thay đổi>. Test: TC-<số>-01 (`<file test>`)
### Quyết định thiết kế và lý do
### Không làm (ngoài phạm vi)
### Kiểm chứng
| Lệnh | Kết quả |
|---|---|
| `<lint>` | pass |
### Còn nợ trước release
<env var, migration, index, test manual/mobile cho QA>
### Câu hỏi mở
- @<người>: ...

---
Đã chạy: ...
Chỉ đọc: ...
Còn là claim: ...
```

- Tương tác: cho xem write-up và nội dung PR, **chờ đồng ý**. `--auto`: tiếp tục.
- Push, mở PR (không draft) vào `default_branch`, body theo `.github/pull_request_template.md`, có
  `Refs #<số>` (**không** `Closes`). Chế độ sửa: push lên branch PR hiện có.
  ```bash
  git push -u origin <branch>
  gh pr create --base main --title "<type>(<app>): <mô tả> (#<số>)" --body-file <file>
  ```
- Đợi CI chạy trên **commit cuối** (`gh pr checks <pr> --watch`). Đỏ: sửa hoặc `## Needs human`.
- Đăng write-up lên issue. Chế độ sửa: đăng `## Build write-up` mới, liệt kê từng finding và cách sửa.
- Đọc lại label, gắn `status:in-review`. Nói bước tiếp: `pr-review` trong **session mới**.

### Luật

- **Thiếu spec thì dừng code.** Không đoán rồi code theo đoán.
- **Ở trong phạm vi issue.** Vấn đề gần đó ghi vào write-up, không sửa luôn.
- Không merge, không push vào `main`, không tag, không sửa workflow/CODEOWNERS/settings.
- **Không báo kết quả không tận mắt thấy.**

## Chế độ `--fix`: Bước 6b: sửa sau QA hoặc UAT

`$ARGUMENTS` (sau `--fix`): `<số issue>`. Trống: liệt kê issue `status:qa-failed` và `status:uat-failed`, của người
chạy trước, cũ nhất trước, kèm một dòng lỗi; hỏi làm issue nào.

**Đọc `docs/agents/contract.md` trước.** Skill này **chỉ chạy tương tác**: issue tới đây vì AI đã
thử đủ vòng không được, hoặc vì PO không chấp nhận. Developer dẫn dắt.

**Spec của bước này là báo cáo lỗi mới nhất**: `## QA report: FAIL` hoặc `## UAT: REJECTED`. Sửa
đúng phần đó, không hơn.

### Bước 0: Ngữ cảnh (chỉ đọc)

1. Issue đủ theo contract mục 4. Đọc **mọi** QA report và UAT trước đó, các `## Build write-up` và
   `## Code review:`: vì sao 3 vòng trước chưa hội tụ?
2. Liệt kê từng lỗi: bước, mong đợi, thực tế, môi trường/commit nơi phát hiện.
3. PR: còn mở hay đã merge (UAT failed thì đã merge), commit cuối, lệch `main` bao nhiêu.
4. Người chạy có phải assignee không. Không phải: phối hợp với assignee trước khi sửa.

### Bước 1: Tái hiện và lên kế hoạch, rồi DỪNG

1. **Tái hiện từng lỗi** đúng cách QA/PO làm, trên cùng loại môi trường, trước khi đổi gì. Lưu bằng chứng.
2. **QA/PO có đúng không?** Lỗi không tái hiện được, hoặc hành vi mong đợi khác với AC đã duyệt:
   **đó là phát hiện**. Soạn trả lời kèm bằng chứng, dừng, không code. AC chưa nói tới hành vi đó →
   đó là yêu cầu mới (issue mới), không phải lỗi.
3. Kế hoạch: cách sửa từng lỗi, file, test sẽ đỏ khi chưa sửa. Không gì ngoài lỗi đã nêu.
4. Với `status:qa-failed`: nêu vì sao các vòng trước sai (thiếu ngữ cảnh, AC mơ hồ, môi trường) để
   ghi vào bài học.

**Chờ đồng ý.**

### Bước 2: Sửa

1. PR còn mở: checkout branch PR. PR đã merge (UAT): branch mới từ `origin/main` mới nhất,
   `fix/<số>-uat-<slug>`.
2. Test trước, **đỏ** trên code chưa sửa; rồi sửa; commit có `#<số>`.
3. Cho xem diff và kết quả test (đỏ rồi xanh). **Chờ đồng ý** trước khi push.
4. Chạy lại đúng cách QA/PO đã làm; lưu bằng chứng.

### Bước 3: Trả lại

1. Push. PR đã merge thì mở PR mới với `Refs #<số>`. CI xanh trên commit cuối.
2. Comment trên issue:

```markdown
@<qa hoặc po>: <cần kiểm tra lại gì>

## QA fix

| Lỗi | Nguyên nhân | Sửa | Test ghim |
|---|---|---|---|

### Vì sao các vòng trước chưa hội tụ
<một đến ba dòng; đưa vào retro>

---
Đã chạy: ...
Chỉ đọc: ...
Còn là claim: ...
```

3. Gỡ `round:*`, đọc lại label, gắn `status:in-review`. Bước tiếp: `pr-review` trong session mới,
   sau đó QA chạy lại.

### Luật

- Chỉ sửa phần đã nêu. Vấn đề mới gặp → ghi chú, hoặc issue mới khi được đồng ý.
- Không cãi QA/PO khi không có bằng chứng. Đưa bản tái hiện hoặc AC, và tag họ.
- Không merge, không push vào `main`.

## Chế độ `--figma`: từ frame Figma ra UI

`$ARGUMENTS` (sau `--figma`): `<link frame Figma> [số issue]`.

**Đọc `docs/agents/contract.md` và coding standard của app đích trước.** Skill này ghi code chỉ khi
được `implement` gọi (hoặc người chạy đồng ý); bản thân nó không mở PR.

### Bước 1: Đọc thiết kế

- Qua Figma MCP: cấu trúc layout, auto-layout/khoảng cách, màu, typography, trạng thái (hover, lỗi,
  rỗng, loading), ảnh chụp frame. Không có quyền truy cập → báo và dừng, không đoán từ mô tả.
- Liệt kê điều thiết kế không nói: trạng thái lỗi/rỗng/loading, responsive, text dài, quyền khác nhau.
  Đó là câu hỏi cho Designer, không tự bịa.

### Bước 2: Map sang code có sẵn

- **Tái sử dụng trước:** tìm component, token màu/spacing, theme hiện có (`file:line`). Không tạo style
  mới khi đã có tương đương; không hard-code màu/cỡ chữ (web: token Tailwind; Flutter: `Theme`).
- Khác biệt nhỏ giữa Figma và token có sẵn (lệch vài px, màu gần giống): dùng token có sẵn, ghi chú
  để Designer xác nhận.
- Component mới chỉ khi thật sự chưa có; đặt đúng chỗ theo cấu trúc feature của app.

### Bước 3: Code

- Theo coding standard; đủ trạng thái loading/lỗi/rỗng; `data-testid` cho phần tử test case `auto` cần.
- Văn bản hiển thị qua cơ chế i18n của app nếu có.

### Bước 4: Đối chiếu

- Chạy app (web: localhost + Playwright MCP chụp màn hình; mobile: simulator/emulator nếu có).
- So ảnh chụp với frame: bố cục, khoảng cách, màu, chữ, trạng thái. Ghi lệch còn lại và lý do.
- Không chạy được app → nói rõ "chưa đối chiếu bằng ảnh", ghi vào write-up.

### Kết quả

Đưa cho skill gọi (hoặc người chạy): danh sách file, component tái sử dụng, lệch so với Figma và câu
hỏi cho Designer. Mục này đi vào `## Build write-up` của issue.

### Luật

- Không đoán thiết kế khi không mở được Figma; báo và dừng.
- Tái sử dụng component và token có sẵn trước khi tạo mới; không hard-code màu/cỡ chữ.
- Không mở PR, không đổi label: phần đó thuộc `implement`.
