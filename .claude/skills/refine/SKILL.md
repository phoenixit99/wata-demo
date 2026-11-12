---
name: refine
description: "Bước 0 và Backlog Refinement của quy trình WATA. Chế độ mặc định (tự động khi issue có label type:epic): phân tích epic, phản biện yêu cầu, hai hướng kiến trúc, chốt API contract, đề xuất issue con, đăng \"## Feature analysis\". Chế độ --batch (tương tác): refinement hàng loạt cho issue backlog/fail-to-dev: tách story, ước lượng size S–XL, cờ human-code, đăng \"## Refinement notes\". Dùng khi \"phân tích feature\", \"phân tích epic\", \"refinement\", \"ước lượng backlog\"."
---

# refine — Bước 0 và refinement

> **Vai trò:** PO, BA, Tech Lead · **Bước:** 0, refinement · **Chế độ:** tự động + tương tác · **Kích hoạt:** label `type:epic` (tự động) hoặc người gọi · **Đọc:** `## Triage: FAIL` · **Ghi:** `## Feature analysis`, `## Refinement notes`

`$ARGUMENTS`: không có cờ chế độ thì chạy chế độ mặc định; `--batch` chọn chế độ khác. Đối số còn lại theo từng chế độ bên dưới.

**Đọc `docs/agents/contract.md` trước.**

| Gọi | Việc | Chế độ chạy | Ghi |
|---|---|---|---|
| `/refine` | Bước 0: phân tích và chia nhỏ | tự động + tương tác | `## Feature analysis` |
| `/refine --batch` | refinement và ước lượng | tương tác | `## Refinement notes` |

## Luật

- **`--auto` (do `wata-agent` gọi) chỉ chạy chế độ mặc định.** Các chế độ `--batch` là việc của con người: nếu có `--auto` cùng một trong các cờ này thì dừng, không ghi gì, báo lỗi gọi sai.
- Chỉ ghi heading của chế độ đang chạy.
- Mỗi chế độ giữ luật riêng của nó (mục "Luật" trong phần của chế độ đó).

## Chế độ mặc định: Bước 0: phân tích và chia nhỏ

`$ARGUMENTS`: `<số issue epic> [--auto]`.

**Đọc `docs/agents/contract.md` trước.** Đây là suy luận kiến trúc; dùng model mạnh nhất có.

**Bước này là gì.** Một feature lớn cần quyết định trước khi cần plan. Kết quả là một bản phân tích
để PO, BA, Tech Lead tranh luận và chốt, **không phải** danh sách việc để code ngay. Ở `--auto`, skill
chỉ đăng phân tích; không bao giờ tự tạo issue con.

### Bước 1: Đọc code trước khi viết

- Model, route, màn hình, job liên quan; tính năng tương tự đã có, có một nửa, hoặc đã bỏ dở.
- `CLAUDE.md` và coding standard của từng app có thể bị đụng.
- **Trích đường dẫn thật.** Đề xuất không dựa trên code là đoán.

### Bước 2: Phản biện yêu cầu

Ghi vào phần **Kiểm chứng giải pháp**:

1. Vấn đề nêu ra có phải vấn đề thật, hay là triệu chứng?
2. Cách đơn giản nhất đạt 80% giá trị với 20% công là gì?
3. Không làm thì sao? Nếu câu trả lời là "không sao nhiều", nói thẳng.
4. Phục vụ trường hợp phổ biến hay hiếm? Đếm được thì đếm (dữ liệu thật, chỉ đọc).
5. Đang giả định điều gì? Bỏ giả định về cách làm, phát biểu lại kết quả mong muốn.

### Bước 3: Ít nhất hai hướng kiến trúc

Hai hướng **thật sự khác nhau**, mỗi hướng: mô tả, app bị đụng, ưu điểm, **điểm yếu**, công sức tương
đối. Phản biện cả hướng mình chọn. Một bảng mà mọi hàng trừ một là bù nhìn còn tệ hơn không có bảng.

### Bước 4: Phạm vi và thứ tự

- **App bị đụng**, mỗi app một dòng thay đổi gì.
- **API contract cần chốt trước** khi chia issue con: endpoint, request/response, kiểu dùng chung.
  Tương thích ngược với app mobile cũ.
- **Thiết kế:** cần Designer không, vì sao (màn hình mới hoặc đổi luồng → mặc định là cần).
- **Rủi ro và câu hỏi mở**, mỗi câu kèm người cần trả lời.
- **Issue con đề xuất:** mỗi issue một dòng tiêu đề, app, loại, phụ thuộc. Thứ tự: contract → API →
  web/admin → mobile. Mỗi issue nên nằm gọn trong một PR review được.

### Bước 5: Soạn và ghi

```markdown
@<po> @<ba> @<tech lead>: <cần quyết định gì>

## Feature analysis

### Tóm tắt (3–5 dòng)
### Kiểm chứng giải pháp
### Các hướng kiến trúc
| Hướng | Mô tả | Ưu điểm | Điểm yếu | Công sức |
|---|---|---|---|---|
**Đề xuất:** <hướng>, vì <...>.
### App bị đụng
### API contract cần chốt
### Thiết kế
### Rủi ro và câu hỏi mở
### Issue con đề xuất
| # | Tiêu đề | App | Loại | Phụ thuộc |
|---|---|---|---|---|

---
Đã chạy: ...
Chỉ đọc: ...
Còn là claim: ...
```

- Tương tác: cho xem, **chờ đồng ý**, rồi đăng. `--auto`: đăng.
- **Tạo issue con chỉ khi PO và Tech Lead đã đồng ý** trong comment, và người chạy xác nhận. Mỗi issue
  con: theo template đúng loại, link về epic ("Part of #<epic>"), **không** gắn `status:*` (PO gắn
  `status:backlog` khi xác nhận, cổng G1).

### Luật

- Không viết code, không tạo branch.
- Không tự chọn hướng thay người quyết; nêu đề xuất và lý do.

## Chế độ `--batch`: refinement và ước lượng

`$ARGUMENTS` (sau `--batch`): trống (mọi issue `status:backlog` và `status:fail-to-dev` chưa có `size:*`), `--milestone <tên>`,
hoặc danh sách số issue.

**Đọc `docs/agents/contract.md` và `docs/agents/scrum.md` (mục Ước lượng) trước.** Đây là phiên làm
việc với **PO và Tech Lead**: AI chuẩn bị và đề xuất, người quyết.

### Bước 0: Chuẩn bị (chỉ đọc)

1. Lấy danh sách story; với mỗi story đọc đủ theo contract mục 4.
2. Nhóm story cùng epic hoặc cùng vùng code để bàn liền nhau.

### Bước 1: Từng story

1. **DoR:** áp R1–R11 như `triage` (`.claude/skills/triage/SKILL.md`, Bước 1).
   Thiếu gì thì viết sẵn câu chữ đề xuất; hỏi PO ngay trong phiên thay vì chờ.
2. **Có UI?** Story đổi giao diện cần brief UI (mục Design hoặc `## UI brief`). Chưa có: ghi việc cho
   Designer (`design-brief`) và nhắc rằng story chưa thể vào sprint cho tới khi thiết kế được duyệt.
3. **Ước lượng** theo bảng (đề xuất, team chốt):

   | Size | Độ phức tạp nghiệp vụ | Độ mơ hồ | Công review/nghiệm thu |
   |---|---|---|---|
   | `size:s` | Một luồng, một app | Không | Đọc trong vài phút |
   | `size:m` | Vài luồng hoặc hai app | Thấp | Dưới một giờ |
   | `size:l` | Nhiều luồng, đổi contract | Có điểm cần hỏi | Vài giờ, có test manual/mobile |
   | `size:xl` | Nhiều app, nhiều quyết định | Cao | Nên **tách** trước khi vào sprint |

   Story point không còn phản ánh công code; đừng ước lượng theo số dòng code AI sẽ viết.
4. **Tách story:** `size:xl` hoặc AC trải nhiều app → đề xuất story con độc lập (mỗi story một PR review
   được, thứ tự contract → API → web/admin → mobile).
5. **Cờ `human-code`:** đề xuất cho story bảo mật, thanh toán, thuật toán phức tạp, hoặc dữ liệu nhạy
   cảm. Tech Lead quyết.
6. Hỏi PO/Tech Lead xác nhận size, cờ, và việc tách. Ghi đúng phán quyết.

### Bước 2: Ghi (sau khi đồng ý từng story)

```markdown
## Refinement notes

- Size: size:<x> — <lý do một dòng>
- human-code: <có/không — lý do>
- DoR: <đạt / thiếu R..., câu chữ đề xuất bên dưới>
- UI: <không đổi UI | cần brief UI (Designer) | đã có brief>
- Tách: <không | đề xuất #.., hoặc danh sách story con>
- Phán quyết: <PO/Tech Lead đã quyết gì>

---
Đã chạy: ...
Chỉ đọc: ...
Còn là claim: ...
```

- Đăng comment, gắn `size:*` và `human-code` (nếu có). Không đổi label `status:*`: triage tự động vẫn
  là bước chuyển trạng thái; nếu story đã sửa xong trong phiên, PO gắn lại `status:backlog` để triage chạy.
- Tạo story con chỉ khi PO đồng ý, qua `issue-create`.

### Bước 3: Tổng kết phiên

Bảng: story, size, cờ, sẵn sàng cho sprint (có/chưa và vì sao). Tổng size theo nhóm để `sprint plan` dùng.

### Luật

- Không tự quyết size, cờ hay việc tách; người quyết.
- Không sửa body issue; đề xuất câu chữ trong comment.
