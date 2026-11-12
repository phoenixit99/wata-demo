---
name: qa
description: "Bước 6 của quy trình WATA. Chế độ mặc định (tự động khi status:qa): viết và chạy Playwright cho test case auto, phân loại lỗi, đăng \"## QA report: PASS/FAIL/PENDING\". Chế độ --manual (QA gọi): dẫn QA chạy case manual/mobile và ghi \"## QA manual results\". Không bao giờ làm yếu test để xanh. Dùng khi \"chạy QA\", \"viết e2e\", \"test manual\", \"test trên điện thoại\"."
---

# qa — Bước 6: QA

> **Vai trò:** QA · **Bước:** 6 · **Chế độ:** tự động + tương tác · **Kích hoạt:** label `status:qa` (tự động) hoặc người gọi · **Đọc:** `## Test design: PASS`, `## Build write-up` · **Ghi:** `## QA report: PASS`, `## QA report: FAIL`, `## QA report: PENDING`, `## QA manual results`

`$ARGUMENTS`: không có cờ chế độ thì chạy chế độ mặc định; `--manual` chọn chế độ khác. Đối số còn lại theo từng chế độ bên dưới.

**Đọc `docs/agents/contract.md` trước.**

| Gọi | Việc | Chế độ chạy | Ghi |
|---|---|---|---|
| `/qa` | Bước 6: QA | tự động + tương tác | `## QA report: PASS`, `## QA report: FAIL`, `## QA report: PENDING` |
| `/qa --manual` | QA test manual/mobile | tương tác | `## QA manual results`, `## QA report: PASS`, `## QA report: FAIL` |

## Luật

- **`--auto` (do `wata-agent` gọi) chỉ chạy chế độ mặc định.** Các chế độ `--manual` là việc của con người: nếu có `--auto` cùng một trong các cờ này thì dừng, không ghi gì, báo lỗi gọi sai.
- Chỉ ghi heading của chế độ đang chạy.
- Mỗi chế độ giữ luật riêng của nó (mục "Luật" trong phần của chế độ đó).

## Chế độ mặc định: Bước 6: QA

`$ARGUMENTS`: `<số issue> [--auto]`. Trống: liệt kê issue `status:qa`, hỏi làm issue nào.

**Đọc `docs/agents/contract.md` trước.**

**Bước này là gì.** Chứng minh từng AC trên ứng dụng chạy thật. Lên kế hoạch trước, kết luận sau.
Bước này được ghi **code test** trong `e2e.path`; không sửa code sản phẩm (lỗi sản phẩm trả về
bước 4).

### Bước 0: Ngữ cảnh (chỉ đọc)

1. Issue đủ theo contract mục 4: AC, bảng test case (`e2e/test-cases/<số>.md` trên branch PR),
   `## Build write-up` (mục "Còn nợ"), `## Code review: PASS`, label `round:*`.
2. PR và commit cuối; checkout branch PR.
3. Cấu trúc `e2e.path`: fixture, page object, cách đăng nhập, dữ liệu test, cấu hình môi trường.

### Bước 1: Kế hoạch

- Liệt kê test case theo loại: `auto` (Playwright viết ở đây), `unit`/`integration` (đã có trong PR,
  chỉ xác nhận CI xanh), `manual`/`mobile` (QA làm).
- Với test cần dữ liệu hay tài khoản đặc biệt: cách tạo, cách dọn.
- Tương tác: cho xem kế hoạch, **chờ đồng ý**.

### Bước 2: Viết test Playwright

- Mỗi test case `auto` một test; **tên test bắt đầu bằng mã**: `test('TC-42-03 xoá đơn hàng ...')`.
- Dùng `data-testid` và role/label, không dùng CSS dễ vỡ hay text phụ thuộc ngôn ngữ khi tránh được.
- Không `waitForTimeout` cố định; đợi theo điều kiện (`expect(...).toBeVisible()`, response).
- Đăng nhập qua storage state/API, không qua UI (trừ test của chính màn hình đăng nhập).
- Test độc lập: tự tạo dữ liệu, không phụ thuộc thứ tự chạy.
- Có thể dùng Playwright MCP để khám phá giao diện và lấy selector; test cuối cùng vẫn là code trong repo.
- Commit vào branch PR: `test(e2e): TC-<số>-xx ... (#<số>)`.

### Bước 3: Chạy và phân loại

Chạy bằng `e2e.command` (giới hạn theo file/grep của issue), rồi chạy cả bộ liên quan để bắt hồi quy.

Mỗi test fail, phân loại **có bằng chứng** (trace, screenshot, log):

| Loại | Dấu hiệu | Xử lý |
|---|---|---|
| Lỗi test | Selector sai, đợi sai, dữ liệu test sai | Sửa test, chạy lại |
| Lỗi môi trường | Service không lên, timeout mạng, dữ liệu seed thiếu | Sửa cấu hình test hoặc báo; không tính là lỗi sản phẩm |
| Lỗi sản phẩm | Hành vi khác AC trên ứng dụng chạy đúng | Ghi finding; **không sửa code sản phẩm, không sửa test cho xanh** |

Test flaky (lúc qua lúc fail): chạy lại 3 lần, ghi tỉ lệ; flaky không được tính là đạt.

### Bước 4: Gom kết quả manual/mobile

- Bảng các case `manual`/`mobile` với cột Kết quả, Người test, Bằng chứng.
- Nếu QA đã ghi `## QA manual results` (skill `qa --manual`), gom vào; lấy bản mới nhất cho mỗi case. Nếu chưa: mention `people.qa`, liệt kê case
  cần test, **issue chưa được qua QA** cho đến khi mọi case P1 có kết quả đạt.

### Bước 5: Kết luận và soạn

- **PASS**: mọi test `auto` đạt (không flaky), CI xanh trên commit cuối, mọi case P1 manual/mobile đạt.
- **FAIL**: có lỗi sản phẩm, hoặc case P1 manual/mobile fail.
- Chưa đủ kết quả manual → **chưa kết luận**: đăng `## QA report: PENDING` (kết quả automation, commit đã chạy, case manual còn chờ), giữ `status:qa`, mention QA chạy `qa --manual`. Skill đó sẽ kết luận khi QA xong.

```markdown
@<tác giả PR> @<qa>: <cần làm gì>

## QA report: <PASS|FAIL>

- <tóm tắt> · Vòng <n>/<max_fix_rounds>

---
| Test case | Loại | Kết quả | Bằng chứng |
|---|---|---|---|
| TC-42-01 | auto | pass | `e2e/...spec.ts` |
| TC-42-04 | mobile | pass | @qa, ảnh chụp |

### Lỗi sản phẩm
#### Finding N: <một dòng>
Bước, mong đợi (AC), thực tế, bằng chứng.

### Chưa test được
<case nào, vì sao>

---
Đã chạy: <lệnh, số test, môi trường, commit>
Chỉ đọc: ...
Còn là claim: ...
```
Đăng thêm một comment ngắn trên PR trỏ về báo cáo.

### Bước 6: Ghi

- Tương tác: cho xem, **chờ đồng ý**. `--auto`: ghi luôn.
- Đọc lại label (vẫn `status:qa`?), push test, đăng comment.
- **PASS** → gắn `status:qa-passed`.
- **FAIL** → tăng `round:*`.
  - Vòng ≤ `max_fix_rounds` → gắn `status:in-progress` (implement sửa theo các finding).
  - Vượt → gắn `status:qa-failed`, mention Tech Lead: developer cần sửa (skill `implement --fix`).

### Luật

- Không sửa code sản phẩm. Không xoá hay nới assertion để test xanh.
- Không gọi là "đạt" khi chưa thấy chạy. Nêu rõ case chưa test được.

## Chế độ `--manual`: QA test manual/mobile

`$ARGUMENTS` (sau `--manual`): `<số issue>`. Trống: liệt kê issue `status:qa` còn case manual/mobile chưa có kết quả,
hỏi làm issue nào.

**Đọc `docs/agents/contract.md` trước.** Người chạy là **QA**: hỏi từng câu ngắn, không bắt QA viết
định dạng; skill lo phần định dạng.

### Bước 0: Ngữ cảnh (chỉ đọc)

1. Issue đủ theo contract mục 4. Bảng test case (`e2e/test-cases/<số>.md` trên branch PR, hoặc bảng
   trong `## Test design: PASS`). Lấy các case loại `manual` và `mobile`.
2. `## QA report: PENDING` mới nhất (nếu có): kết quả automation, commit nó đã chạy.
3. `## QA manual results` trước đó (nếu có): case nào đã có kết quả, khỏi hỏi lại.
4. PR: commit cuối hiện tại. **So với commit trong QA report: PENDING.** Khác nhau nghĩa là code đã
   đổi sau lần chạy automation.

### Bước 1: Chuẩn bị

Nói với QA trong vài dòng: môi trường cần dùng (staging/preview, phiên bản app mobile, tài khoản test
theo nơi lưu chung của team), số case cần test, case nào P1. Hỏi QA đang test trên môi trường và thiết
bị nào để ghi vào kết quả.

### Bước 2: Đi qua từng case

Lần lượt từng case, P1 trước:

1. Hiển thị: mã, mô tả, các bước, kết quả mong đợi (lấy từ AC).
2. Hỏi: **đạt / không đạt / không test được**, và bằng chứng (link ảnh, video, ghi chú).
3. Không đạt: hỏi thêm "thấy gì" và bước nào; nhắc QA đính kèm ảnh.
4. Không test được: hỏi lý do (môi trường, thiết bị, dữ liệu).

Không tự điền kết quả thay QA. Không suy ra "đạt" từ việc QA không phản đối.

### Bước 3: Ghi kết quả manual

```markdown
## QA manual results

Môi trường: <...> · Thiết bị/phiên bản app: <...> · Commit: <sha> · Người test: @<qa>

| Test case | Ưu tiên | Loại | Kết quả | Bằng chứng / ghi chú |
|---|---|---|---|---|

---
Đã chạy: test tay bởi @<qa> như bảng trên
Chỉ đọc: bảng test case, QA report trước
Còn là claim: —
```
Cho QA xem, **chờ đồng ý**, rồi đăng.

### Bước 4: Kết luận QA (để issue không kẹt)

- **Chưa có kết quả automation**, hoặc **commit đã đổi** sau lần chạy automation: không kết luận. Báo
  QA: gỡ rồi gắn lại label `status:qa` để automation chạy lại trên commit mới (người gắn label thì
  workflow chạy). `qa` sẽ đọc `## QA manual results` và kết luận.
- **Có kết quả automation trên đúng commit cuối:** làm theo `qa` (`.claude/skills/qa/SKILL.md`)
  Bước 5 và 6, gộp cả hai bảng:
  - PASS khi automation đạt và mọi case P1 manual/mobile đạt → `## QA report: PASS`, gắn `status:qa-passed`.
  - FAIL khi có lỗi sản phẩm → `## QA report: FAIL`, xử lý vòng (`round:*`) như `qa`.
  - Case P1 "không test được" → chưa PASS; nêu điều cần để test được và ai lo.

Cho QA xem báo cáo và label sẽ gắn, **chờ đồng ý**.

### Luật

- Kết quả là của QA. AI chỉ hỏi, ghi và định dạng.
- Không sửa test case trong bảng; thiếu case thì ghi đề xuất vào ghi chú cho lần test design sau.
- Không gắn label cổng con người.
