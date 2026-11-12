---
name: triage
description: "Bước 2 của quy trình WATA. Kiểm tra issue ở status:backlog theo Definition of Ready R1–R11 (gồm tìm issue trùng), đề xuất mức rủi ro, đăng \"## Triage: PASS/FAIL/BLOCKED\" và chuyển sang status:test-design, status:fail-to-dev hoặc status:blocked. Dùng khi \"triage issue\", \"issue này đủ để làm chưa\"."
---

# triage — Bước 2: Definition of Ready

> **Vai trò:** AI (tự động) · **Bước:** 2 · **Chế độ:** tự động + tương tác · **Kích hoạt:** label `status:backlog` (tự động) hoặc người gọi · **Đọc:** — · **Ghi:** `## Triage: PASS`, `## Triage: FAIL`, `## Triage: BLOCKED`

`$ARGUMENTS`: `<số issue> [--auto]`. Trống: liệt kê issue `status:backlog` theo priority rồi tuổi,
hỏi làm issue nào, không thay đổi gì.

**Đọc `docs/agents/contract.md` trước.** File này chỉ thêm phần riêng của triage.

**Bước này là gì.** Cửa vào của engineering: yêu cầu đã đủ rõ để thiết kế test và code chưa.
Không review code, không thiết kế test. Mục tiêu là **làm issue tốt hơn**, không chỉ dán nhãn:
khi thiếu, viết sẵn câu chữ để PO dán vào.

## Bước 0: Ngữ cảnh (chỉ đọc)

1. Đọc issue đủ theo contract mục 4, cả 8 bước. Kiểm tra issue đang đúng `status:backlog`.
2. **Hotfix** (`type:hotfix`): không chờ đủ R1–R11. Kiểm tra có Impact, Evidence, Expected vs
   actual; mention Tech Lead (`people.tech_lead`) và chuyển sang skill `hotfix`. Dừng ở đây.
3. Đọc `.claude/project.yml` để biết danh sách app hợp lệ và `high_risk_paths`.
4. Tìm code mà issue sẽ đụng trên `origin/main` mới nhất (ghi SHA), đủ để xác định app và rủi ro.

## Bước 1: Kiểm tra R1–R11

Với **từng** điều kiện, ghi Đạt / Không đạt / Không áp dụng, kèm bằng chứng một dòng.

| # | Kiểm tra cụ thể |
|---|---|
| R1 | Có assignee |
| R2 | Tiêu đề nói rõ thay đổi gì (không phải "Sửa lỗi", "Cải thiện màn hình") |
| R3 | Có Description nêu vấn đề và lý do |
| R4 | Có ít nhất một AC |
| R5 | Mỗi AC có hành động + kết quả quan sát được; không có từ mơ hồ (nhanh, đẹp, dễ, tốt, hợp lý, v.v.) |
| R6 | App bị ảnh hưởng xác định được và có trong `project.yml` |
| R7 | Không còn `TBD`, `???`, `<...>`, phần mẫu chưa điền |
| R8 | Không có issue chặn đang mở (đọc trạng thái hiện tại của mọi issue được nhắc là phụ thuộc) |
| R9 | Bug: có bước tái hiện, kết quả mong đợi, kết quả thực tế, môi trường |
| R10 | Đổi API: có request/response (khuyến nghị). Đổi UI: có brief UI trong mục Design (bắt buộc); link Figma đã duyệt được gắn sau ở bước thiết kế, trước G2 |
| R11 | Tìm trùng/chồng lấn: theo tiêu đề **và** theo code bị đụng; đọc cả issue đã đóng; có đối chứng dương |

Cho R11:
```bash
gh issue list --state all --search "<từ khoá tiêu đề> in:title,body" --json number,title,state
gh issue list --state all --search "<route|model|component bị đụng>" --json number,title,state
gh issue list --search "<số issue này>" --json number   # đối chứng dương: phải trả về chính nó
gh pr list --state all --search "<file|route bị đụng>" --json number,title,state
```
Phát hiện trùng → đề xuất đóng một bên. Issue khác đang sửa cùng đoạn code → link và ghi thứ tự.

**Câu khẳng định trong body** (nguyên nhân bug, "đã có sẵn", "chỉ cần sửa X") là claim: kiểm tra
nhanh trên code; sai thì ghi rõ, chưa kiểm được thì ghi vào footer.

## Bước 2: Đề xuất mức rủi ro

Theo `docs/agents/risk-tiers.md`: `risk:high` nếu đụng `high_risk_paths`, auth, thanh toán, migration, đổi
contract dùng chung; `risk:low` nếu chỉ text/style/chore không đổi hành vi; còn lại `risk:standard`.
Tech Lead chốt; triage chỉ đề xuất (gắn label kèm lý do để Tech Lead đổi nếu không đồng ý).

## Bước 3: Kết luận và soạn comment

- **PASS**: mọi điều kiện bắt buộc đạt.
- **FAIL**: có điều kiện bắt buộc không đạt (trừ R8).
- **BLOCKED**: chỉ vướng R8.

Một quyết định mà người được assign có thể trả lời ngay **không phải lý do FAIL** khi họ đang chạy
skill: hỏi họ, ghi phán quyết vào comment.

Soạn comment (file tạm), heading đúng contract:

```markdown
@<assignee/tác giả>: <một câu mỗi người: cần làm gì>

## Triage: <PASS|FAIL|BLOCKED>

- <2–4 gạch đầu dòng: vì sao>

---
| # | Kết quả | Ghi chú |
|---|---|---|
| R1 | Đạt | ... |
...

---
### Câu chữ đề xuất          <!-- bắt buộc khi FAIL -->
<Description / AC thay thế, viết sẵn để dán>

### Việc trùng hoặc liên quan
- #<số> <tiêu đề> (<trạng thái>): <quan hệ>

### Rủi ro đề xuất
risk:<mức>: <lý do một dòng>

---
Đã chạy: ...
Chỉ đọc: ... (SHA origin/main: <sha>)
Còn là claim: ...
```

## Bước 4: Ghi

- Tương tác: cho xem comment và label sẽ gắn, **chờ đồng ý**.
- `--auto`: ghi luôn.

Theo thứ tự: đọc lại label (vẫn `status:backlog`?), đăng comment, gắn `risk:*`, gắn label trạng
thái (guard tự gỡ label cũ), đọc lại.

```bash
gh issue comment <n> --body-file <file>
gh issue edit <n> --add-label "risk:<mức>"
gh issue edit <n> --add-label "status:test-design"   # PASS
gh issue edit <n> --add-label "status:fail-to-dev"   # FAIL
gh issue edit <n> --add-label "status:blocked"       # BLOCKED
```

Kết thúc bằng một dòng: issue đang ở trạng thái nào, bước tiếp theo là gì, ai làm.

## Luật

- **Không sửa body issue.** Đưa câu chữ đề xuất trong comment; PO quyết định.
- Không viết test, không đụng code.
- Không gắn `status:ready-to-dev`. Triage PASS chỉ đưa issue tới `status:test-design`.
