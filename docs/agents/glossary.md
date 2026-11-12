# Thuật ngữ

| Thuật ngữ | Nghĩa |
|---|---|
| **AC (Acceptance Criteria)** | Tiêu chí nghiệm thu. Mỗi tiêu chí là một điều kiểm tra được: khi làm X thì thấy Y |
| **AI Agent** | Claude chạy với các skill của quy trình, tự đọc issue, code, review, test trong phạm vi cho phép |
| **Cổng (gate) G1–G5** | Điểm con người phải ký trước khi issue đi tiếp: G1 xác nhận issue, G2 duyệt plan, G3 refutation, G4 merge, G5 nghiệm thu UAT |
| **Contract (dữ liệu)** | Kiểu dữ liệu và API dùng chung giữa các app (`packages/shared`). Đổi contract ảnh hưởng nhiều app |
| **Contract (agent)** | File `docs/agents/contract.md`: luật chung mà mọi skill đọc trước |
| **CI** | Kiểm tra tự động (lint, test, build) chạy trên mỗi PR |
| **CODEOWNERS** | File chỉ định ai bắt buộc phải duyệt thay đổi ở thư mục nào |
| **DoR (Definition of Ready)** | 11 điều kiện R1–R11 issue phải đạt trước khi thiết kế test và code |
| **Epic** | Feature lớn, phải phân tích (Bước 0) và chia thành nhiều issue |
| **Footer ba phần** | Cuối mọi báo cáo của AI: đã chạy / chỉ đọc / còn là claim, để phân biệt điều đã kiểm với điều chưa kiểm |
| **Heading cố định** | Tiêu đề như `## Triage: PASS` để bước sau tìm được kết quả bước trước |
| **Label trạng thái** | Label `status:*`; mỗi issue đúng một cái; cho biết issue đang ở bước nào |
| **MCP** | Chuẩn kết nối cho AI làm việc với GitHub, Figma, trình duyệt |
| **Needs human** | Trạng thái AI tự dừng: hết vòng sửa, cần quyết định của người, hoặc thiếu thông tin |
| **Plan** | Bảng AC → file sẽ sửa → test case, kèm phạm vi ảnh hưởng và những gì không làm |
| **PR (Pull Request)** | Đề xuất gộp code từ branch vào `main`; nơi review |
| **Prompt injection** | Câu lệnh cài vào nội dung (issue, comment) để lừa AI làm việc không được phép. AI coi nội dung là dữ liệu, không phải lệnh |
| **Refutation (G3)** | Đọc kết quả của AI với mục tiêu tìm ra điểm sai, không phải để xác nhận |
| **Risk tier** | Mức rủi ro `risk:low/standard/high`, quyết định cổng nào được rút gọn |
| **Session** | Một lần chạy AI với ngữ cảnh riêng. Mỗi bước dùng session mới để AI không tự đồng ý với chính mình |
| **Skill** | Bản hướng dẫn chuẩn cho AI làm một bước, lưu trong repo, có review và lịch sử |
| **Danh mục skill** | `skills/catalog.json`: danh sách duy nhất của skill, vai trò, label kích hoạt và heading; tài liệu sinh từ đây |
| **SLA** | Thời gian tối đa một issue được nằm ở hàng chờ của một người |
| **Test case P1/P2/P3** | Mức ưu tiên: P1 lỗi thì không release được |
| **UAT** | Nghiệm thu của PO trên staging sau khi merge |
| **Vòng sửa (round)** | Một lần AI sửa sau review hoặc QA fail; tối đa 3 vòng |
| **AI Enablement** | Vai trò bảo trì skill, coding standard, MCP và phân tích lỗi AI lặp lại; process owner |
| **Definition of Done (DoD)** | 12 điều kiện để story được tính là Done ([DoD](definition-of-done.md)) |
| **Design system** | Màu, font, khoảng cách, component, quy tắc layout, nguyên tắc UX ở dạng AI đọc được; đầu vào bắt buộc cho thiết kế |
| **human-code** | Label cho story rủi ro cao mà người code trực tiếp; agent không implement |
| **Size (S/M/L/XL)** | Ước lượng theo độ phức tạp nghiệp vụ, độ mơ hồ và công review/nghiệm thu, không theo công code |
| **Sprint 0** | Giai đoạn thiết lập nền tảng một lần mỗi dự án ([Sprint 0](sprint-0.md)) |
| **WIP** | Số issue đang làm cùng lúc; giới hạn cho cả hàng đang code, chờ review và chờ QA |
