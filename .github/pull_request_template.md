Refs #<số issue>

## Thay đổi

<!-- Một đoạn ngắn: thay đổi gì, vì sao. Chi tiết nằm ở `## Build write-up` trên issue. -->

## Acceptance Criteria → code → test

| AC | Thay đổi | Test case |
|---|---|---|
| AC1 | `<file>` | TC-<số>-01 |

## Checklist

- [ ] Code theo coding standard của app bị ảnh hưởng
- [ ] Unit test cho logic mới; với bug: test đỏ trước khi sửa, xanh sau khi sửa
- [ ] Lint, typecheck, test, build qua trên commit cuối
- [ ] Đổi API: response cũ vẫn đọc được với bản app mobile cũ (`mobile.supported_app_versions`)
- [ ] Đổi UI: có `data-testid` cho automation; khớp frame Figma
- [ ] Không có secret, token, dữ liệu cá nhân trong code/log
- [ ] Không có thay đổi ngoài phạm vi issue

## Chưa làm được / còn nợ

<!-- Test chưa chạy được, việc cần làm trước release (env var, migration, index...). -->
