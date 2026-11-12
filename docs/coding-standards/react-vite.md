# Coding standard — apps/web (React + Vite + TypeScript)

Bản ngắn cho repo demo. Tech Lead chỉnh khi áp dụng thật.

## Cấu trúc
- Nghiệp vụ thuần (không React) đặt ở `src/*.ts`, ví dụ `src/tasks.ts`. Component chỉ gọi hàm nghiệp vụ.
- Hàm nghiệp vụ không đọc giờ hệ thống hay sinh id ngẫu nhiên bên trong; nhận `now`, `id` qua tham số (có giá trị mặc định) để test được.
- Mỗi file `x.ts` có `x.test.ts` cạnh nó; component có `X.test.tsx` (Testing Library, truy vấn theo role/label).

## TypeScript
- `strict` bật; không `any`, không `as unknown as`. Kiểu kết quả có lỗi dùng union `{ ok: true } | { ok: false; error }`.
- Không thêm thư viện mới khi chưa có trong issue/plan (cần Tech Lead đồng ý).

## UI và a11y
- Mọi input có `<label>` (có thể ẩn bằng `.sr-only`); lỗi hiển thị bằng `role="alert"`.
- Nút chỉ có icon/từ chung (Xoá, Sửa) phải có `aria-label` nêu rõ đối tượng.
- Chuỗi giao diện bằng tiếng Việt, đặt thẳng trong component (demo chưa có i18n).

## Dữ liệu
- Lưu localStorage qua `loadTasks`/`saveTasks`; đọc dữ liệu cũ phải chịu được thiếu trường mới (migration mềm).

## Lệnh phải qua trước khi mở PR
`npm --prefix apps/web run lint && npm --prefix apps/web run typecheck && npm --prefix apps/web test && npm --prefix apps/web run build`
