---
name: design-brief
description: "Giai đoạn Thiết kế UI trong quy trình Scrum WATA, cho Designer. Từ story và design system của dự án, soạn \"## UI brief\" (màn hình, trạng thái, component, quy tắc), đề xuất 2–3 phương án giao diện, hỗ trợ tạo/tinh chỉnh frame Figma, rồi ghi kết quả duyệt \"## Design approval: APPROVED/CHANGES\" (Designer + PO/khách hàng) trước khi code. Dùng khi \"brief UI\", \"thiết kế cho story\", \"duyệt thiết kế\"."
---

# design-brief — brief UI và duyệt thiết kế trước khi code

> **Vai trò:** Designer · **Bước:** design · **Chế độ:** tương tác · **Kích hoạt:** người gọi · **Đọc:** `## Refinement notes` · **Ghi:** `## UI brief`, `## Design approval: APPROVED`, `## Design approval: CHANGES`

`$ARGUMENTS`: `<số issue>` hoặc `brief <số issue>` / `approve <số issue>`.

**Đọc `docs/agents/contract.md` và design system của dự án (`design_system` trong `.claude/project.yml`)
trước.** Không có design system: dừng, báo Designer hoàn thành nó ở Sprint 0 (đây là đầu vào bắt buộc).

**Thiết kế là trách nhiệm của Designer; quyết định chọn phương án là của PO và khách hàng.** AI soạn,
đề xuất và ghi lại.

## Phần A: Brief UI

1. Đọc story: AC, người dùng, luồng, quyền, `## Refinement notes`.
2. Liệt kê màn hình và **mọi trạng thái**: mặc định, đang tải, lỗi, rỗng, text dài, quyền khác nhau, màn
   hình nhỏ.
3. Map sang design system: component có sẵn, token màu/chữ/khoảng cách, quy tắc layout. Thứ chưa có trong
   design system → ghi rõ là **đề xuất bổ sung design system**, không tự chế style.
4. Đề xuất 2–3 phương án bố cục khác nhau thật sự, mỗi phương án: mô tả, ưu, nhược (khả năng tiếp cận,
   số bước thao tác, độ phức tạp code).
5. Designer xem, sửa, chọn phương án đưa đi duyệt. Đăng:

```markdown
## UI brief

Design system: <đường dẫn, phiên bản>

### Màn hình và trạng thái
| Màn hình | Trạng thái | Component | Ghi chú |
|---|---|---|---|
### Phương án
1. <tên>: <mô tả> — ưu: ... nhược: ...
### Đề xuất bổ sung design system
### Câu hỏi cho PO/khách hàng
```

## Phần B: Frame Figma

- Công cụ AI tạo/ghi vào Figma **do team chọn ở Sprint 0** (Figma MCP phổ biến chủ yếu để đọc thiết kế).
  Có công cụ ghi: tạo frame theo phương án đã chọn, dùng component/token của design system. Không có:
  Designer dựng frame theo brief.
- Đọc lại frame qua Figma MCP và đối chiếu với brief (đủ trạng thái, đúng token). Ghi chỗ lệch cho Designer.

## Phần C: Duyệt thiết kế (trước khi code)

1. Designer kiểm tra UX và khả năng tiếp cận; PO/khách hàng chọn và xác nhận phương án (buổi duyệt thiết
   kế, trong `sprint.design_approval_days` ngày đầu sprint).
2. Hỏi và ghi đúng kết quả:

```markdown
## Design approval: <APPROVED|CHANGES>

Frame: <link frame cụ thể> · Phương án: <tên>
Người duyệt: Designer @<login>; PO/khách hàng: <tên, kênh xác nhận>

### Cần đổi            <!-- khi CHANGES -->
```

3. **APPROVED** là điều kiện để story có UI qua cổng G2 (`test-design --approve` kiểm tra). Gắn link frame vào mục
   Design của story (đề xuất PO dán, hoặc comment link).

## Luật

- Không đánh dấu APPROVED khi chưa có xác nhận của Designer **và** PO/khách hàng.
- Không dùng tài sản (ảnh, icon, font) ngoài thư viện đã được cấp phép trong design system.
- Không đổi label trạng thái.
