---
name: merge-gate
description: "Bước 7–8 (cổng G3 và G4) của quy trình WATA. Chế độ mặc định (tự động khi status:qa-passed): đăng \"## Refutation brief\" để reviewer (con người) tìm điểm sai ở G3. Chế độ --merge (Tech Lead gọi): kiểm tra trước khi merge (CI trên commit cuối, CODEOWNERS, chuỗi heading PASS, G3), đăng \"## Merge readiness: READY/NOT READY\". AI không ký G3, không merge. Dùng khi \"chuẩn bị refutation\", \"merge được chưa\"."
---

# merge-gate — cổng G3 và G4

> **Vai trò:** Tech Lead, Security · **Bước:** 7–8 · **Chế độ:** tự động + tương tác · **Kích hoạt:** label `status:qa-passed` (tự động) hoặc người gọi · **Đọc:** `## Build write-up`, `## Code review: PASS`, `## QA report: PASS`, `## G3: OK` · **Ghi:** `## Refutation brief`, `## Merge readiness: READY`, `## Merge readiness: NOT READY`

`$ARGUMENTS`: không có cờ chế độ thì chạy chế độ mặc định; `--merge` chọn chế độ khác. Đối số còn lại theo từng chế độ bên dưới.

**Đọc `docs/agents/contract.md` trước.**

| Gọi | Việc | Chế độ chạy | Ghi |
|---|---|---|---|
| `/merge-gate` | chuẩn bị cổng G3 | tự động + tương tác | `## Refutation brief` |
| `/merge-gate --merge` | kiểm tra trước cổng G4 | tương tác | `## Merge readiness: READY`, `## Merge readiness: NOT READY` |

## Luật

- **`--auto` (do `wata-agent` gọi) chỉ chạy chế độ mặc định.** Các chế độ `--merge` là việc của con người: nếu có `--auto` cùng một trong các cờ này thì dừng, không ghi gì, báo lỗi gọi sai.
- Chỉ ghi heading của chế độ đang chạy.
- Mỗi chế độ giữ luật riêng của nó (mục "Luật" trong phần của chế độ đó).

## Chế độ mặc định: chuẩn bị cổng G3

`$ARGUMENTS`: `<số issue> [--auto]`.

**Đọc `docs/agents/contract.md` trước.**

**Bước này là gì.** Cổng G3 là con người đọc với mục tiêu **tìm ra điểm sai**, không phải xác nhận
điểm đúng. Skill giúp người đó dùng 10–20 phút đúng chỗ: chỉ ra claim nào dựa trên bằng chứng nào,
chỗ nào rủi ro nhất, và điều gì chưa ai kiểm. **Skill không kết luận PASS/FAIL.**

Issue `risk:low` được bỏ G3 (`docs/agents/risk-tiers.md`): skill đăng một dòng ghi nhận và dừng.

### Bước 0: Ngữ cảnh (chỉ đọc)

1. Issue đủ theo contract mục 4: AC, test design, mọi build write-up, code review, QA report.
2. PR: diff ở commit cuối, `git diff --numstat`, CI trên commit cuối, approval hiện có.

### Bước 1: Soạn brief

1. **Bảng claim.** Mỗi câu khẳng định quan trọng trong write-up, review, QA report:
   claim · ai nói · bằng chứng (test, output, `file:line`) · trạng thái (đã kiểm / chỉ đọc / chưa kiểm).
   Kiểm lại ngẫu nhiên 2–3 claim tại commit cuối; ghi kết quả.
2. **Đoạn diff rủi ro cao** (tối đa 5), mỗi đoạn `file:line` và vì sao rủi ro: auth/phân quyền, tiền,
   migration/xoá dữ liệu, đổi contract, đồng thời, xử lý lỗi bị nuốt, cấu hình/giới hạn bị đổi.
3. **Chưa được kiểm:** test case không chạy được, môi trường không có, bản app cũ chưa thử.
4. **Câu hỏi gợi ý cho reviewer** (3–5 câu), ví dụ: "Nếu request này đến hai lần cùng lúc thì sao?"
5. **Lịch sử vòng:** số vòng review/QA, finding nào lặp lại.

```markdown
@<tech lead / reviewer G3>: brief cho cổng G3, ước tính <n> phút đọc.

## Refutation brief

| Claim | Nguồn | Bằng chứng | Trạng thái |
|---|---|---|---|

### Đọc kỹ những đoạn này
1. `<file:line>`: <vì sao>

### Chưa được kiểm
### Câu hỏi gợi ý
### Lịch sử vòng

---
Đã chạy: ...
Chỉ đọc: ...
Còn là claim: ...

Reviewer: nếu đồng ý, comment `## G3: OK` kèm điều đã kiểm; nếu tìm thấy vấn đề, gắn `status:in-progress`
kèm comment `## Code review: FAIL` ghi finding.
```

### Bước 2: Ghi

- Tương tác: cho xem, **chờ đồng ý**. `--auto`: ghi luôn.
- Đăng comment. **Không đổi label.** Issue ở `status:qa-passed` chờ G3 và G4.
- Issue `risk:high`: nhắc trong comment rằng người làm G3 phải khác người merge (G4).

### Luật

- Không viết "an toàn để merge", "đã đạt". Brief là bản đồ để người tìm lỗi, không phải kết luận.
- Không approve PR.

## Chế độ `--merge`: kiểm tra trước cổng G4

`$ARGUMENTS` (sau `--merge`): `<số issue>` (Tech Lead chạy tương tác).

**Đọc `docs/agents/contract.md` trước.** Skill chỉ đọc và đăng một comment. **Merge là việc của
con người** (`gh pr merge` bị chặn trong `.claude/settings.json`).

### Kiểm tra

| # | Điều kiện | Cách kiểm |
|---|---|---|
| M1 | Issue ở `status:qa-passed` | `gh issue view <n> --json labels` |
| M2 | Có đủ chuỗi: `## Triage: PASS`, `## Test design: PASS`, `## Build write-up`, `## Code review: PASS`, `## QA report: PASS` — và mỗi cái mới hơn lần sửa cuối | comment theo thời gian |
| M3 | G2 do người ký: label `status:ready-to-dev` do người (không phải bot) gắn | timeline |
| M4 | G3 đã có: comment `## G3: OK` của người (không phải bot), sau `## Refutation brief` (bỏ qua nếu `risk:low`) | comment |
| M5 | `risk:high`: người làm G3 khác người sắp merge | so login |
| M6 | CI xanh **trên commit cuối** của PR | `gh pr view <pr> --json headRefOid,statusCheckRollup` |
| M7 | Đủ approval CODEOWNERS, không còn "changes requested" | `gh pr view <pr> --json reviewDecision,reviews` |
| M8 | Không conflict với `main` mới nhất | `git merge-tree --write-tree origin/main <head>` |
| M9 | PR body có `Refs #<số>`, không có `Closes/Fixes #<số>` | PR body |
| M10 | "Còn nợ trước release" trong write-up đã có người nhận (env var, migration...) | write-up + comment |
| M11 | Không có commit mới sau lần QA cuối (nếu có: QA/review phải chạy lại) | so thời gian commit với QA report |
| M12 | Story có UI: `## Design approval: APPROVED` có mặt; nếu có `## Design review` sau code thì là OK | comment |

M1–M12 tương ứng D1–D9 của [Definition of Done](../../docs/agents/definition-of-done.md) (`docs/agents/definition-of-done.md`); D10–D12 kiểm sau merge.

### Kết luận

```markdown
@<tech lead>: <READY: có thể merge | NOT READY: cần xử lý mục ...>

## Merge readiness: <READY|NOT READY>

| # | Điều kiện | Kết quả | Ghi chú |
|---|---|---|---|

---
Đã chạy: ...
Chỉ đọc: ...
Còn là claim: ...
```

- Cho người chạy xem, **chờ đồng ý** rồi đăng. Không đổi label.
- READY: nhắc rằng merge xong, workflow `wata-pr-merged` tự chuyển issue sang `status:uat`.
- NOT READY: nêu ai cần làm gì cho từng mục fail.

### Luật

- Không merge, không approve, không bấm "Update branch".
