---
name: uat
description: "Bước 9 (cổng G5) của quy trình WATA. Chế độ mặc định (tự động khi status:uat): soạn \"## UAT checklist\" từ AC bằng ngôn ngữ người dùng. Chế độ --run (PO gọi): dẫn PO nghiệm thu trên staging và soạn \"## UAT: ACCEPTED/REJECTED\"; PO tự gắn status:done hoặc status:uat-failed. Dùng khi \"UAT\", \"nghiệm thu\", \"checklist UAT\"."
---

# uat — Bước 9: UAT (G5)

> **Vai trò:** PO · **Bước:** 9 · **Chế độ:** tự động + tương tác · **Kích hoạt:** label `status:uat` (tự động) hoặc người gọi · **Đọc:** `## QA report: PASS` · **Ghi:** `## UAT checklist`, `## UAT: ACCEPTED`, `## UAT: REJECTED`

`$ARGUMENTS`: không có cờ chế độ thì chạy chế độ mặc định; `--run` chọn chế độ khác. Đối số còn lại theo từng chế độ bên dưới.

**Đọc `docs/agents/contract.md` trước.**

| Gọi | Việc | Chế độ chạy | Ghi |
|---|---|---|---|
| `/uat` | chuẩn bị nghiệm thu (G5) | tự động + tương tác | `## UAT checklist` |
| `/uat --run` | PO nghiệm thu | tương tác | `## UAT: ACCEPTED`, `## UAT: REJECTED` |

## Luật

- **`--auto` (do `wata-agent` gọi) chỉ chạy chế độ mặc định.** Các chế độ `--run` là việc của con người: nếu có `--auto` cùng một trong các cờ này thì dừng, không ghi gì, báo lỗi gọi sai.
- Chỉ ghi heading của chế độ đang chạy.
- Mỗi chế độ giữ luật riêng của nó (mục "Luật" trong phần của chế độ đó).

## Chế độ mặc định: chuẩn bị nghiệm thu (G5)

`$ARGUMENTS`: `<số issue> [--auto]`.

**Đọc `docs/agents/contract.md` trước.** Người đọc kết quả là **PO**: viết bằng ngôn ngữ nghiệp
vụ, không dùng tên file, mã test hay thuật ngữ kỹ thuật.

### Bước 0: Ngữ cảnh (chỉ đọc)

1. Issue: AC, QA report (case nào đã test, môi trường), PR đã merge và thời điểm merge.
2. Đã deploy lên staging chưa? Đọc thông tin deploy nếu project có (workflow deploy, release note,
   comment). Không xác định được → ghi "Cần xác nhận đã deploy staging" ở đầu checklist.

### Bước 1: Soạn checklist

- Mỗi AC thành một hoặc vài bước kiểm tra trên staging: **làm gì → thấy gì**. Gồm cả một trường hợp
  sai/biên tiêu biểu.
- Ghi tài khoản/dữ liệu test cần dùng (không ghi mật khẩu; trỏ tới nơi lưu chung của team).
- Ghi rõ điều **ngoài phạm vi** để PO không nhầm là lỗi.

```markdown
@<po>: issue đã merge, mời nghiệm thu trên staging.

## UAT checklist

Môi trường: <staging URL> · Phiên bản/commit: <sha> · <đã deploy lúc ... | cần xác nhận đã deploy>

- [ ] 1. <Đăng nhập bằng tài khoản ...>, vào <màn hình>, bấm <...> → thấy <...>   (AC1)
- [ ] 2. Nhập <dữ liệu sai> → thấy thông báo "<...>", dữ liệu không bị lưu      (AC2)

**Ngoài phạm vi:** <...>

**Cách trả lời:**
- Đạt: comment `## UAT: ACCEPTED`, rồi gắn label `status:done` (issue tự đóng).
- Chưa đạt: comment `## UAT: REJECTED` kèm bước nào, thấy gì, mong đợi gì; gắn `status:uat-failed`.
- Phát hiện điều AC không nói tới: tạo issue mới, không tính là UAT rejected.

---
Đã chạy: ...
Chỉ đọc: ...
Còn là claim: ...
```

### Bước 2: Ghi

- Tương tác: cho xem, **chờ đồng ý**. `--auto`: ghi luôn.
- Đăng comment. Không đổi label; `status:done` và `status:uat-failed` chỉ con người gắn.

### Luật

- Không tự đánh dấu mục nào là đạt. Không gắn label nghiệm thu.

## Chế độ `--run`: PO nghiệm thu

`$ARGUMENTS` (sau `--run`): `<số issue>`. Trống: liệt kê issue `status:uat` mà người chạy là PO (theo `people.po`),
cũ nhất trước.

**Đọc `docs/agents/contract.md` trước.** Người chạy là **PO**: ngôn ngữ nghiệp vụ, câu ngắn.

**Đây là cổng G5, quyết định là của PO.** Skill hỏi, ghi và soạn; không bao giờ tự gắn `status:done`
hay `status:uat-failed` (contract mục 8). Gọi qua `@claude` thì AI chạy bằng GitHub App, và guard
cũng sẽ gỡ các label đó nếu bot gắn.

### Bước 0: Ngữ cảnh (chỉ đọc)

1. Issue: AC, `## UAT checklist` mới nhất, môi trường và commit ghi trong đó.
2. Checklist ghi "cần xác nhận đã deploy staging": hỏi PO/Tech Lead trước khi bắt đầu.

### Bước 1: Đi qua từng mục

Lần lượt từng mục trong checklist:

1. Đọc lại mục bằng lời đơn giản: làm gì, mong thấy gì.
2. Hỏi PO: **đạt / chưa đạt / không làm được**.
3. Chưa đạt: hỏi "anh/chị thấy gì?" và nhờ ảnh chụp.
4. Hỏi tiếp: **điều này AC có nói tới không?**
   - Có → lỗi UAT (tính vào REJECTED).
   - Không → **yêu cầu mới**, ghi riêng; không làm UAT bị reject.

### Bước 2: Soạn kết luận

- **ACCEPTED**: mọi mục đạt (yêu cầu mới, nếu có, ghi riêng).
- **REJECTED**: có mục chưa đạt.

```markdown
## UAT: <ACCEPTED|REJECTED>

Môi trường: <staging> · Commit: <sha> · Người nghiệm thu: @<po>

| Mục | Kết quả | Ghi chú |
|---|---|---|

### Chưa đạt            <!-- khi REJECTED -->
- Mục <n>: làm <...>, thấy <...>, mong đợi <...> (AC<k>). Ảnh: <...>

### Yêu cầu mới (không tính là lỗi UAT)
- <...> → đề xuất tạo issue mới
```

### Bước 3: PO đăng và gắn label

- Cho PO xem bản soạn. **Chờ đồng ý.** Chạy bằng tài khoản của PO (CLI) thì đăng comment khi PO đồng
  ý; qua `@claude` thì đăng như bot và ghi rõ "PO @<login> đã xác nhận trong phiên".
- Hướng dẫn PO **tự** gắn trên GitHub: ACCEPTED → `status:done` (issue tự đóng); REJECTED →
  `status:uat-failed` (dev sửa bằng `implement --fix`).
- Có yêu cầu mới: hỏi PO có muốn tạo issue không; có thì chuyển sang `issue-create` cho từng
  yêu cầu.

### Luật

- Không tự đánh dấu đạt. Không gắn label nghiệm thu.
- Không biến yêu cầu mới thành lỗi UAT.
