# Design system — WATA Demo (Công việc)

> Bản tối giản cho repo demo. Đầu vào của `design-brief`, `implement --figma`, `pr-review --design`.

Phiên bản: 0.1 · Figma library: (demo không dùng Figma) · Người duyệt: @phoenixit99

## 1. Màu

| Token | Giá trị | Dùng cho |
|---|---|---|
| `color.primary` | `#e31e2d` | Nút chính |
| `color.heading` | `#9e1b20` | Tiêu đề, nút phụ dạng chữ |
| `color.danger` | `#b60205` | Thông báo lỗi, trạng thái quá hạn |
| `color.text` | `#1f2328` | Chữ chính |
| `color.muted` | `#666666` | Chữ phụ, trạng thái rỗng, việc đã xong |
| `color.surface` | `#f6f7f9` | Nền trang |
| `color.border` | `#e5e7eb` | Đường kẻ giữa các dòng |

Độ tương phản tối thiểu: 4.5:1 cho chữ thường.

## 2. Chữ

| Token | Font | Cỡ / dòng | Đậm | Dùng cho |
|---|---|---|---|---|
| `text.h1` | system-ui | 32 / 40 | 700 | Tiêu đề trang |
| `text.body` | system-ui | 16 / 24 | 400 | Nội dung |
| `text.small` | system-ui | 13 / 18 | 400 | Ngày, nhãn phụ |

## 3. Khoảng cách và lưới

Bước khoảng cách: 4 / 8 / 12 / 16 / 24 / 32. Một cột, rộng tối đa 560px, lề 16px. Không có breakpoint riêng.

## 4. Component

| Component | Biến thể | Trạng thái bắt buộc | Code |
|---|---|---|---|
| Button | primary (nền đỏ), text (chữ đỏ, nền trong) | default, hover, disabled | `apps/web/src/App.tsx` |
| Input | text, date | default, focus, error (`aria-invalid` + `role="alert"`) | `apps/web/src/App.tsx` |
| Task row | thường, đã xong (gạch ngang, màu muted), quá hạn (chữ ngày màu danger) | | `apps/web/src/App.tsx` |
| Empty state | | | `.empty` |

## 5. Quy tắc layout

- Form thêm việc ở trên cùng: input chiếm phần còn lại, nút "Thêm" bên phải.
- Bộ lọc (nếu có) nằm giữa form và danh sách, dạng nhóm nút.
- Hành động trên một dòng (Sửa, Xoá) nằm bên phải dòng.

## 6. Nguyên tắc UX

- Thông báo lỗi nói điều người dùng cần làm, bằng tiếng Việt.
- Không có xác nhận "Bạn chắc chắn?" cho thao tác nhỏ; với xoá hàng loạt thì có.
- Danh sách rỗng (kể cả rỗng sau khi lọc) có câu giải thích.

## 7. Tài sản và bản quyền

Không dùng ảnh hoặc icon ngoài; chỉ chữ và CSS.
