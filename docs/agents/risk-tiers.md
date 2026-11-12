# Phân loại theo rủi ro

Mục đích: thay đổi nhỏ không phải đi qua đủ cổng (nếu không, mọi người sẽ lách quy trình), và thay
đổi nguy hiểm được kiểm kỹ hơn. **Ngưỡng dưới đây là đề xuất; Tech Lead và process owner chốt.**

## Ba mức

| Mức | Khi nào | Ví dụ |
|---|---|---|
| `risk:low` | Không đổi hành vi nghiệp vụ, không đụng dữ liệu, dễ hoàn tác | Sửa text, chính tả, style nhỏ, cập nhật tài liệu, đổi tên nội bộ không đổi API |
| `risk:standard` | Mặc định | Tính năng mới, bug thông thường, màn hình mới |
| `risk:high` | Sai thì mất tiền, mất dữ liệu, lộ dữ liệu, hoặc hỏng app đang chạy | Auth/phân quyền, thanh toán, migration/xoá dữ liệu, đổi contract dùng chung hoặc response API mà app mobile cũ dùng, đụng `high_risk_paths`, hotfix |

## Cổng theo mức

| Cổng | `risk:low` | `risk:standard` | `risk:high` |
|---|---|---|---|
| G1 xác nhận issue | Có | Có | Có |
| Triage tự động | Có | Có | Có |
| Test design | Rút gọn (chỉ case chính) | Đầy đủ | Đầy đủ + case bảo mật/dữ liệu |
| G2 duyệt plan | Tech Lead duyệt nhanh, không cần QA | Tech Lead + QA | Tech Lead + QA |
| Code review (AI, session riêng) | Có | Có | Có + lượt bảo mật/migration |
| QA | Automation liên quan | Đầy đủ | Đầy đủ + regression |
| G3 refutation | **Bỏ** | Có (gộp G4 được) | Có, **người khác người merge** |
| G4 merge | Có | Có | Có |
| G5 UAT | PO xem nhanh hoặc bỏ nếu không có thay đổi người dùng thấy | Có | Có |

## Ai quyết định

- Triage **đề xuất** mức và ghi lý do.
- Tech Lead **chốt** (đổi label nếu không đồng ý).
- Thay đổi trong PR đụng `high_risk_paths` mà issue không phải `risk:high`: reviewer nâng lên
  `risk:high` và ghi vào `## Code review`.
- Không ai được hạ mức để bỏ qua cổng khi issue đã ở `status:in-review` trở đi.
