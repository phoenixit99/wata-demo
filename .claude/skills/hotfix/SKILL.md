---
name: hotfix
description: "Luồng hotfix của quy trình WATA cho lỗi production nghiêm trọng (type:hotfix). Tech Lead chạy tương tác. Rút gọn chờ đợi nhưng không bỏ: test tái hiện (đỏ trước, xanh sau), review ở session riêng, CI xanh, con người merge. Đăng \"## Hotfix plan\", mở PR, và tạo issue theo dõi nguyên nhân gốc sau release. Dùng khi \"hotfix\", \"lỗi production khẩn\"."
---

# hotfix — sửa khẩn cấp production

> **Vai trò:** Tech Lead, Dev · **Bước:** hotfix · **Chế độ:** tương tác · **Kích hoạt:** người gọi · **Đọc:** — · **Ghi:** `## Hotfix plan`

`$ARGUMENTS`: `<số issue>` (chỉ chạy tương tác, Tech Lead hoặc dev được Tech Lead giao).

**Đọc `docs/agents/contract.md` trước.**

## Được rút gọn / không bao giờ bỏ

| Được rút gọn | Không bao giờ bỏ |
|---|---|
| Triage tự động: Tech Lead triage trực tiếp | Test tái hiện lỗi: đỏ trước, xanh sau |
| G2: Tech Lead duyệt plan ngay trong session | Code review ở **session riêng** |
| G3 + G4 gộp, cùng Tech Lead | CI xanh trên commit cuối |
| UAT sau release | Con người merge; không deploy bởi AI |
| QA: chỉ case liên quan + smoke test | Issue theo dõi nguyên nhân gốc |

## Bước 1: Hiểu và đo (chỉ đọc)

1. Issue: Impact, Evidence, Expected vs actual. Xác nhận lỗi bằng bằng chứng production (log, request
   id), chỉ đọc. Đo phạm vi: bao nhiêu người/bản ghi bị ảnh hưởng, từ khi nào.
2. Tìm commit/release gây lỗi (`git log`, `git tag --contains <sha>`). Có thể **revert** là cách nhanh
   và an toàn nhất: luôn cân nhắc trước khi sửa mới.
3. Tìm issue/PR đang mở đụng cùng code.

## Bước 2: Hotfix plan, rồi DỪNG

```markdown
@<tech lead>: <cần duyệt gì>

## Hotfix plan

- Ảnh hưởng: <ai, bao nhiêu, từ khi nào>
- Nguyên nhân (đã kiểm / giả thuyết): <...>
- Phương án: revert <sha> | sửa tối thiểu tại `<file>` — và vì sao
- Test tái hiện: <test sẽ đỏ trước khi sửa>
- Rủi ro của bản sửa: <...>
- Kiểm tra sau release: <...>
```
Cho Tech Lead xem, **chờ đồng ý** (đây là G2 rút gọn). Đăng comment, gắn `status:in-progress`.

## Bước 3: Sửa

1. Branch `hotfix/<số>-<slug>` từ đúng nhánh đang chạy production (thường `main`; project có nhánh
   release thì theo quy ước project).
2. Test tái hiện **đỏ**, sửa tối thiểu, test **xanh**. Lint/typecheck/test/build qua.
3. Cho xem diff, chờ đồng ý, push, mở PR `fix(<app>): <mô tả> (#<số>)` với `Refs #<số>`, gắn
   `status:in-review`.

## Bước 4: Review, QA, merge

- Review bằng `pr-review` **trong session mới** (có thể là Tech Lead khác hoặc cùng Tech Lead ở
  session mới).
- QA: case liên quan tới lỗi + smoke test luồng chính.
- Tech Lead merge (G3 + G4). Deploy theo quy trình release của project, do con người.

## Bước 5: Sau release

- Kiểm tra bằng chứng production lỗi đã hết; ghi vào issue.
- Tạo issue `type:chore` (hoặc bug) theo dõi **nguyên nhân gốc** và cách phòng ngừa (test, cảnh báo,
  quy trình), link về hotfix. PO nghiệm thu UAT như bình thường.

## Luật

- Không deploy, không merge, không push vào nhánh production.
- Sửa tối thiểu. Refactor và cải tiến để sang issue khác.
