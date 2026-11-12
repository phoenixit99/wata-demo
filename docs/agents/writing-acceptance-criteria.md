# Viết Acceptance Criteria

Yêu cầu không rõ là nguyên nhân phổ biến nhất gây làm lại. AI chỉ code khi mỗi AC **kiểm thử được**.

## Công thức

**Khi** <ai đó làm gì / điều kiện gì> **thì** <kết quả nhìn thấy hoặc kiểm tra được>.

Dạng Given/When/Then cũng được: **Cho** <bối cảnh>, **khi** <hành động>, **thì** <kết quả>.

## Năm câu hỏi cho mỗi tính năng

1. Luồng chính: người dùng làm gì và thấy gì?
2. Dữ liệu sai hoặc thiếu: hệ thống báo gì? Dữ liệu có được lưu không?
3. Giá trị biên: rỗng, tối đa, trùng, ký tự đặc biệt?
4. Quyền: ai **không** được làm việc này, và họ thấy gì?
5. **Điều không được xảy ra**: dữ liệu nào không được mất, ai không được nhận thông báo, màn hình nào
   không được đổi?

## Ví dụ

| Không đạt | Vì sao | Đạt |
|---|---|---|
| Người dùng quản lý được đơn hàng | Không biết kiểm tra cái gì | Khi người dùng bấm Xoá trên một đơn hàng và xác nhận, đơn biến mất khỏi danh sách và API `GET /orders` không còn trả về đơn đó |
| Trang tải nhanh | "Nhanh" không đo được | Danh sách 50 đơn hàng hiển thị xong trong dưới 2 giây trên staging |
| Form dễ dùng | Không quan sát được | Khi bỏ trống Email và bấm Lưu, ô Email viền đỏ với dòng "Vui lòng nhập email", và không có request nào được gửi |
| Sửa lỗi đăng nhập | Không nói kết quả mong đợi | Khi đăng nhập bằng email có chữ hoa (`An@Mail.com`) với mật khẩu đúng, người dùng vào được trang chủ |
| Admin xem báo cáo | Thiếu quyền, thiếu dữ liệu | Khi admin mở Báo cáo tháng, thấy tổng doanh thu theo ngày của tháng hiện tại; khi người dùng thường mở cùng URL, thấy trang 403 |

## Bug

AC của bug thường là: **làm lại đúng các bước tái hiện thì thấy kết quả mong đợi**, cộng một AC giữ
hành vi liền kề không đổi.

## Tự kiểm trước khi gắn `status:backlog`

- [ ] Mỗi AC có hành động và kết quả cụ thể
- [ ] Không có từ: nhanh, đẹp, dễ, tốt, hợp lý, linh hoạt, tối ưu
- [ ] Có ít nhất một AC cho trường hợp sai
- [ ] Có ghi điều không được xảy ra (khi liên quan)
- [ ] Không còn TBD, ???, phần mẫu chưa điền
