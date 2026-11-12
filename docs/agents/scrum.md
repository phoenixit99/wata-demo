# Quy trình Scrum ứng dụng AI Agent — v1.1

WATA Software · Tài liệu nội bộ · Vai trò, các giai đoạn, quality gate và sự chuyển dịch effort so với
Scrum truyền thống.

Tài liệu này là **lớp quản lý dự án** của bộ quy trình. Việc chi tiết của từng issue (label, cổng, skill)
nằm ở [Quy trình phát triển](process.md); hai tài liệu dùng chung vai trò, label và skill.

| Phiên bản | Thay đổi |
|---|---|
| 1.1 | Gộp vào repo chung. Thống nhất với quy trình phát triển v1.4: test case thiết kế trước khi code; review của AI ở session riêng; DoR 11 tiêu chí; duyệt thiết kế UI trước cổng G2; giới hạn WIP cho review và QA; thêm Definition of Done. Bổ sung: vai trò Security và khách hàng, chính sách việc phát sinh giữa sprint, RACI đủ vai trò, skill cho từng sự kiện. |
| 1.0 | Bản đầu (16-10-2026). |

---

## 1. Mục đích và phạm vi

Tài liệu định nghĩa quy trình Scrum của team sau khi đưa AI Agent vào phát triển phần mềm. Khung Scrum giữ
nguyên (vai trò, sự kiện, artifacts), nhưng **phân công công việc giữa người và AI** và **trọng tâm effort**
của từng giai đoạn thay đổi.

Áp dụng cho các project phát triển phần mềm của công ty, đặc biệt các project tổ chức theo monorepo (web,
admin, API, mobile trong cùng một repository).

::: tip Nguyên tắc cốt lõi
AI đảm nhận phần thực thi lặp lại (viết code, test, review vòng 1). Con người chịu trách nhiệm về **giá trị**
(làm gì, vì sao), **quyết định** (kiến trúc, merge, release) và **nghiệm thu**. AI không bao giờ giữ vai trò A
(chịu trách nhiệm cuối).
:::

## 2. Tổng quan sprint có AI

Sprint gồm 10 bước liên tiếp. Màu thể hiện hướng chuyển dịch effort so với Scrum truyền thống:
**tăng** (nút thắt mới, effort của người tăng) · **giảm** (AI đảm nhận chính) · **giữ** (gần như không đổi).

| # | Bước | Người | AI | Effort | Skill |
|---|---|---|---|---|---|
| 1 | Khám phá và viết yêu cầu | PO/BA | Soạn story, gợi ý AC | Tăng | `issue-create`, `refine` |
| 2 | Refinement và kiểm tra DoR | PO + Tech Lead | Triage tự động, tách story, ước lượng nháp | Tăng | `refine --batch`, `triage` |
| 3 | Sprint Planning | Cả team | Số liệu năng lực review/QA | Giữ | `sprint plan` |
| 4 | Thiết kế UI và kiến trúc; thiết kế test | Designer duyệt UI, Tech Lead chốt kiến trúc, QA duyệt test case | Brief UI, phương án, thiết kế test | Giảm | `design-brief`, `test-design`, `test-design --approve` |
| 5 | Lập trình và unit test | Dev giao việc, giám sát | Code, test | Giảm mạnh | `implement` |
| 6 | Code review | Người duyệt cuối | Review vòng 1 ở session riêng | Tăng | `pr-review`, `pr-review --design` |
| 7 | QA và automation | QA duyệt, test khám phá, thiết bị thật | Chạy automation theo test case đã thiết kế | Giảm | `qa`, `qa --manual` |
| 8 | CI/CD và triển khai | Phê duyệt merge và release | Kiểm tra tự động, release note | Giảm | `merge-gate`, `merge-gate --merge`, `sprint release` |
| 9 | Sprint Review và UAT | PO, khách hàng | Tài liệu demo, phản hồi thành story | Tăng | `uat`, `uat --run`, `sprint review` |
| 10 | Retrospective | Cả team | Số liệu, lỗi AI lặp lại | Giữ | `sprint retro` |

**[Đã thống nhất]** Test case được thiết kế ở bước 4, **trước khi code** (bản 1.0 đặt ở bước QA). Test bám theo
yêu cầu thay vì bám theo code AI vừa viết; QA ở bước 7 duyệt kết quả và test khám phá.

## 3. Vai trò và trách nhiệm

| Vai trò | Scrum truyền thống | Scrum có AI | Effort |
|---|---|---|---|
| Product Owner / BA | Viết story, ưu tiên backlog, nghiệm thu | Như cũ, nhưng viết AC chặt hơn, trả lời nhanh các story Fail to dev, nghiệm thu nhiều hơn | Tăng |
| Scrum Master / PM | Điều phối sự kiện, gỡ vướng | Thêm: theo dõi nút thắt review/QA, giới hạn WIP, chi phí AI | Giữ |
| Tech Lead | Kiến trúc, review, hỗ trợ dev | Kiến trúc, duyệt cuối PR, sở hữu coding standard | Tăng |
| Developer | Viết code, unit test, sửa lỗi | Thiết kế giải pháp, giao việc cho AI, kiểm tra và chịu trách nhiệm code | Giảm |
| QA | Viết test case, test thủ công, automation | Duyệt test case AI sinh, test khám phá/UX, test thiết bị thật | Giảm |
| Designer | Thiết kế từng màn hình, bàn giao | Xây dựng và mô tả design system, viết brief UI, duyệt và tinh chỉnh Figma, chịu trách nhiệm UX | Giảm (tăng ở Sprint 0) |
| AI Enablement (mới) | — | Bảo trì skill, coding standard, cấu hình MCP; phân tích lỗi AI lặp lại. **Tech Lead và PO cùng kiêm nhiệm**: Tech Lead phía kỹ thuật (chịu trách nhiệm chính), PO phía yêu cầu. Là *process owner* ở cấp project | Mới |
| Security (mới) | — | Duyệt chính sách dữ liệu, token, phạm vi quyền của AI ở Sprint 0 và khi thay đổi | Mới |
| Khách hàng | Nghiệm thu | Chọn phương án giao diện, nghiệm thu theo AC, thống nhất SLA phản hồi | Tăng |

Hướng dẫn chi tiết cho từng vai trò: [vai trò](roles/po.md) (gồm [AI Enablement](roles/ai-enablement.md) và [Security](roles/security.md)).

### 3.1 RACI theo giai đoạn

R = thực hiện, A = chịu trách nhiệm cuối, C = tham vấn, I = được thông báo.

| Giai đoạn | PO | BA | PM | Designer | Tech Lead | Dev | QA | Khách hàng | AI |
|---|---|---|---|---|---|---|---|---|---|
| Viết yêu cầu | A/R | R | I | C | C | I | C | C | R (soạn nháp) |
| Refinement / DoR | A | R | I | C | R | C | C | — | R (triage) |
| Sprint Planning | C | C | A/R | C | R | R | R | — | R (số liệu) |
| Thiết kế UI (Figma) | C | I | I | A | I | I | I | C (chọn phương án) | R |
| Thiết kế kỹ thuật | C | I | I | I | A/R | C | I | — | C (đề xuất) |
| Thiết kế test (G2) | I | I | I | — | A | R | R | — | R |
| Lập trình | I | I | I | I | C | A | I | — | R |
| Code review | I | I | I | C (UI) | A | R | I | — | R (vòng 1) |
| QA, automation | C | I | I | I | I | C | A | — | R |
| Merge và release | I | I | C | I | A/R | C | C | I | — |
| Nghiệm thu | A/R | C | I | C | C | I | C | R | — |
| Retrospective | R | R | A | R | R | R | R | — | R (số liệu) |

Bảng RACI theo **từng trạng thái issue** nằm ở [RACI](raci.md).

## 4. Artifacts và tiêu chuẩn

| Artifact | Thay đổi so với truyền thống |
|---|---|
| Product Backlog | Story theo template (Description, AC, brief UI, app bị ảnh hưởng); link Figma gắn sau khi thiết kế được duyệt. Mỗi story đúng một label `status:*`, có `size:*` sau refinement |
| Sprint Backlog | Milestone của sprint. Giới hạn WIP cho cả cột đang code, **chờ review và chờ QA** để tránh dồn ứ |
| Increment | Đi kèm bộ test case và automation phủ toàn bộ AC |
| Definition of Ready | 11 tiêu chí R1–R11, AI kiểm tra tự động. Story có giao diện cần brief UI. Không đạt thì không vào sprint |
| Definition of Done | Xem [Definition of Done](definition-of-done.md): automation phủ mọi AC, CI xanh, người duyệt cuối approve, không còn Blocker/Major, giao diện khớp Figma đã duyệt, PO nghiệm thu |
| Design System (mới) | Màu, font, khoảng cách, component, quy tắc layout và nguyên tắc UX do Designer mô tả ở dạng AI đọc được; đầu vào bắt buộc để AI tạo brief/Figma. Quản lý phiên bản. Mẫu: `docs/design-system.md` trong template |
| Tài sản AI (mới) | Skill, coding standard, `CLAUDE.md`, cấu hình MCP. Quản lý phiên bản và review như code (repo trung tâm + `project.yml`) |

**[Đã thống nhất]** DoR là 11 tiêu chí (bản 1.0 ghi 10): thêm R11, tìm issue trùng và issue đang sửa cùng đoạn code.

## 5. Sự kiện Scrum và timebox

Tham chiếu sprint 2 tuần. Team có thể rút sprint xuống 1 tuần khi luồng review và nghiệm thu đã ổn định.

| Sự kiện | Truyền thống | Có AI | Ghi chú | Skill |
|---|---|---|---|---|
| Sprint Planning | 4 giờ | 3–4 giờ | Lập kế hoạch theo năng lực review/QA | `sprint plan` |
| Daily Scrum | 15 phút | 15 phút | Bảng từ label thay báo cáo; tập trung vào việc bị chặn | `sprint daily` |
| Backlog Refinement | ≤ 10% sprint | 20–25% sprint | Tăng mạnh nhất | `refine --batch` |
| Sprint Review | 2 giờ | 2–3 giờ | Nhiều tính năng cần demo hơn | `sprint review` |
| Retrospective | 1,5 giờ | 1,5 giờ | Thêm phần cải tiến skill/standard | `sprint retro` |
| Review queue (mới) | — | 2 khung/ngày | Khung giờ cố định để duyệt PR (`sprint.review_slots`), tránh tồn đọng | — |
| Duyệt thiết kế (mới) | — | 30–60 phút/nhóm story | PO + Designer + khách hàng, trong 1–2 ngày đầu sprint | `design-brief` |

## 6. Quy trình chi tiết theo giai đoạn

Mỗi giai đoạn: mục tiêu, phân công người và AI, đầu ra, cổng chất lượng, và mức chuyển dịch effort so với
Scrum truyền thống.

### 6.1 Sprint 0: Thiết lập nền tảng (một lần mỗi dự án)

**Mục tiêu:** chuẩn bị môi trường để AI làm việc đúng chuẩn ngay từ sprint đầu. Chi tiết: [Sprint 0](sprint-0.md).

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | Hợp đồng, phạm vi tổng thể, stack công nghệ |
| Con người làm | Tech Lead: kiến trúc, coding standard. PM: label, board, CI, quyền truy cập. Security: chính sách dữ liệu, token, phạm vi quyền của AI. Designer: design system, brief mẫu. AI Enablement: skill, MCP |
| AI làm | Dựng khung monorepo, CI, template issue/PR (lệnh cài một dòng); bản nháp coding standard; thiết lập công cụ AI tạo/ghi thiết kế vào Figma (công cụ do team thử nghiệm và chọn) |
| Đầu ra | Repository, skill, coding standard, design system, DoR/DoD, MCP (GitHub, Figma, Playwright) |
| Cổng chất lượng | Tech Lead và Security ký bộ chuẩn và quyền truy cập; Designer duyệt design system. Kiểm tra bằng [`--check`](/setup-guide) |

**Effort: tăng.** Giai đoạn mới (khoảng 1–2 tuần), đầu tư một lần, dùng lại cho các sprint sau.

### 6.2 Khám phá và viết yêu cầu

**Mục tiêu:** biến nhu cầu của khách hàng thành user story rõ ràng, kiểm thử được.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | Nhu cầu khách hàng, biên bản họp |
| Con người làm | PO/BA: làm việc với khách, quyết định giá trị và ưu tiên, chốt AC. Designer: mô tả yêu cầu giao diện (brief UI) |
| AI làm | Soạn story theo mẫu từ biên bản; đề xuất AC dạng Given/When/Then, chỉ ra trường hợp biên còn thiếu; tách story lớn (`issue-create`, `refine`) |
| Đầu ra | Story ở `status:backlog` có Description, AC, Design, app bị ảnh hưởng |
| Cổng chất lượng | Cổng G1: PO xác nhận story đủ các mục bắt buộc |

**Effort: tăng khoảng 20%.** AI soạn nhanh, nhưng PO/BA phải viết chi tiết và chính xác hơn vì AI thực thi
đúng theo chữ, không tự bù chỗ thiếu như dev có kinh nghiệm.

### 6.3 Backlog Refinement và Definition of Ready

**Mục tiêu:** mọi story vào sprint đều đủ điều kiện để AI làm.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | Story ở `status:backlog` |
| Con người làm | PO + Tech Lead: trả lời câu hỏi, chốt phạm vi, đánh giá rủi ro, chốt size và cờ `human-code`. PO bổ sung story bị Fail to dev |
| AI làm | Triage tự động theo R1–R11; chuyển `test-design` hoặc `fail-to-dev` kèm câu chữ đề xuất; đề xuất tách story, ước lượng S/M/L/XL (`refine --batch`) |
| Đầu ra | Danh sách story sẵn sàng, có `size:*` |
| Cổng chất lượng | Đạt toàn bộ tiêu chí DoR bắt buộc |

**Effort: tăng khoảng 60%**, từ khoảng 10% lên 20–25% thời gian sprint của PO và Tech Lead. Đây là khâu quyết
định chất lượng đầu ra khi có AI.

### 6.4 Sprint Planning

**Mục tiêu:** chọn khối lượng việc vừa với năng lực thực của team trong sprint.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | Story sẵn sàng, số liệu các sprint trước |
| Con người làm | Cả team: chọn story, cam kết Sprint Goal. Tech Lead: xác định story cần người code trực tiếp (`human-code`) |
| AI làm | Số liệu: lead time, số PR mỗi người review được, tỉ lệ Fail to dev; gợi ý chia nhỏ hoặc gom story (`sprint plan`) |
| Đầu ra | Sprint Backlog (milestone), Sprint Goal |
| Cổng chất lượng | Tổng khối lượng không vượt năng lực review, QA và nghiệm thu của team |

**Effort: giữ nguyên**, nhưng tiêu chí đổi: lập kế hoạch theo năng lực review/nghiệm thu thay vì năng lực code.

### 6.5 Thiết kế UI, kiến trúc và thiết kế test

**Mục tiêu:** chốt giao diện, giải pháp kỹ thuật và bộ test **trước khi code**.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | Story trong sprint, brief UI, design system |
| Con người làm | Designer: viết brief, duyệt và tinh chỉnh Figma, kiểm tra UX và khả năng tiếp cận. PO + khách hàng: chọn và xác nhận phương án giao diện. Tech Lead: kiến trúc, contract API, mô hình dữ liệu; duyệt plan. QA: duyệt test case |
| AI làm | Brief UI và 2–3 phương án theo design system, đủ trạng thái bình thường/lỗi/rỗng/đang tải (`design-brief`); phương án kỹ thuật; test case và bảng AC → file → test (`test-design`) |
| Đầu ra | Frame Figma đã duyệt (`## Design approval: APPROVED`) gắn vào story; thiết kế kỹ thuật ngắn; bảng test case |
| Cổng chất lượng | **Cổng G2**: Designer và khách xác nhận UI (story có UI), Tech Lead duyệt plan, QA duyệt test case (`test-design --approve`), rồi người gắn `status:ready-to-dev` |

**Effort: giảm khoảng 25%.** AI tạo bản thiết kế và phương án; Designer chuyển từ vẽ từng màn hình sang mô tả,
duyệt và tinh chỉnh. Quyết định kiến trúc vẫn do người.

**[Đã thống nhất]** Duyệt thiết kế là **điều kiện của cổng G2** cho story có UI: không code khi Figma chưa được
duyệt. `pr-review --design` sau khi code chỉ để đối chiếu, không thay buổi duyệt này.

### 6.6 Lập trình và unit test

**Mục tiêu:** hiện thực story đúng AC, đúng coding standard.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | Story `status:ready-to-dev`, coding standard, Figma đã duyệt, thiết kế kỹ thuật, bảng test case |
| Con người làm | Developer: giao việc cho AI, theo dõi, xử lý phần AI làm sai hoặc phần phức tạp; chịu trách nhiệm cuối cùng về code. Story `human-code`: người code |
| AI làm | Tạo branch, code và unit test theo bảng test case, chạy lint/typecheck/build; mở PR liên kết story (`implement`) |
| Đầu ra | Pull Request kèm bảng đối chiếu AC |
| Cổng chất lượng | CI xanh: lint, typecheck, unit test, build |

**Effort: giảm khoảng 70%.** Đây là khâu giảm nhiều nhất. Dev chuyển từ viết code sang thiết kế, giao việc và kiểm tra.

### 6.7 Code review

**Mục tiêu:** code đúng, an toàn, dễ bảo trì trước khi vào QA.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | Pull Request |
| Con người làm | Reviewer/Tech Lead: duyệt cuối, tập trung nghiệp vụ, kiến trúc, bảo mật; quyết định chấp nhận hoặc yêu cầu sửa. Duyệt trong các khung giờ review cố định |
| AI làm | Review vòng 1 **trong session riêng** theo 9 tiêu chí, comment theo dòng (`pr-review`). Blocker/Major trả về để AI sửa **ở session implement**, rồi một session review mới review lại (tối đa 3 vòng) |
| Đầu ra | PR được duyệt, story chuyển QA |
| Cổng chất lượng | Không còn Blocker/Major; người duyệt cuối đã approve |

**Effort: tăng khoảng 40%.** Lượng code tăng mạnh nên tổng effort review tăng, dù mỗi PR được AI lọc trước. Đây
là nút thắt mới, cần giới hạn số PR chờ review (`limits.wip_in_review`).

**[Đã thống nhất]** AI không tự review rồi tự sửa trong cùng một session (bản 1.0 ghi "tự sửa lỗi Blocker/Major"):
session đã viết code là session tệ nhất để review chính code đó.

### 6.8 QA và automation

**Mục tiêu:** chứng minh mọi AC hoạt động, không gây lỗi hồi quy.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | PR đã qua review, bảng test case đã duyệt ở bước 6.5 |
| Con người làm | QA: bổ sung kịch bản nghiệp vụ, test khám phá, test UX, test trên thiết bị thật (mobile) bằng `qa --manual` |
| AI làm | Viết và chạy automation Playwright cho các test case `auto`; phân loại lỗi (test, sản phẩm, môi trường); lỗi sản phẩm trả về bước lập trình (tối đa 3 vòng); báo cáo lên PR (`qa`) |
| Đầu ra | Automation test, báo cáo QA passed/failed |
| Cổng chất lượng | Mọi AC có ít nhất 1 test; automation xanh; mọi case P1 manual/mobile đạt |

**Effort: giảm.** Test case và QA thủ công khoảng −50%, automation khoảng −60%. QA chuyển từ viết và chạy test
sang duyệt và khám phá. Độ phủ automation tăng. Hàng chờ QA có giới hạn WIP (`limits.wip_qa`).

### 6.9 Tích hợp và triển khai (CI/CD)

**Mục tiêu:** đưa code lên staging/production an toàn.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | PR QA passed |
| Con người làm | Tech Lead: refutation (G3) và merge (G4). PM/Tech Lead: phê duyệt release production |
| AI làm | CI chạy toàn bộ kiểm tra; brief cho G3 (`merge-gate`), kiểm tra trước merge (`merge-gate --merge`); kế hoạch release và release note (`sprint release`) |
| Đầu ra | Bản build trên staging/production, release note |
| Cổng chất lượng | Chỉ con người được merge và phê duyệt release |

**Effort: giảm khoảng 33%**, nhờ tự động hoá kiểm tra và release note.

### 6.10 Sprint Review và UAT

**Mục tiêu:** khách hàng và PO nghiệm thu tính năng.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | Increment trên staging |
| Con người làm | PO + khách hàng: demo, nghiệm thu, phản hồi. PO: cập nhật backlog theo phản hồi |
| AI làm | UAT checklist (`uat`), dẫn PO nghiệm thu (`uat --run`); tài liệu demo, tóm tắt thay đổi; chuyển phản hồi thành story mới (`sprint review`) |
| Đầu ra | Tính năng được nghiệm thu (cổng G5), backlog cập nhật |
| Cổng chất lượng | Khách hàng/PO chấp nhận theo AC |

**Effort: tăng khoảng 25%.** Mỗi sprint giao nhiều tính năng hơn nên khối lượng nghiệm thu tăng. Cần thống nhất
trước với khách về thời gian phản hồi.

### 6.11 Sprint Retrospective

**Mục tiêu:** cải tiến cách làm việc của cả người và AI.

| Hạng mục | Nội dung |
|---|---|
| Đầu vào | Số liệu sprint, các lỗi AI lặp lại |
| Con người làm | Cả team: đánh giá, chọn hành động cải tiến. AI Enablement: cập nhật skill, coding standard, DoR |
| AI làm | Tổng hợp số liệu và các lỗi lặp lại từ comment review/QA/UAT (`sprint retro`) |
| Đầu ra | Hành động cải tiến; issue/PR sửa skill (repo trung tâm) hoặc standard (repo project) |
| Cổng chất lượng | Mỗi lỗi AI lặp lại ≥ 2 lần phải có hành động sửa skill hoặc standard |

**Effort: giữ nguyên.** Phát sinh thêm việc bảo trì skill (khoảng 4% tổng effort, tính ở mục Vận hành nền tảng AI).

### 6.12 Việc phát sinh giữa sprint (bổ sung)

- **Lỗi production nghiêm trọng:** luồng hotfix (`type:hotfix`, skill `hotfix`), dùng phần năng lực dự phòng
  10–20% đã giữ lại khi planning.
- **Yêu cầu mới của khách giữa sprint:** vào backlog, refinement như bình thường; chỉ đổi phạm vi sprint khi PO
  đồng ý và bỏ ra khối lượng tương đương. PM ghi lại để retro.
- **Story bị chặn quá 2 ngày:** PM quyết định đưa ra khỏi sprint hoặc gỡ chặn; không để nằm trong cột đang làm.

## 7. Tổng hợp chuyển dịch effort

Bảng và biểu đồ quy đổi tổng effort của một sprint truyền thống thành **100 đơn vị** để dễ so sánh. Đây là
**số liệu tham khảo ban đầu** dựa trên một project web/mobile thông thường; team cần thay bằng số đo thực tế sau
2–3 sprint thí điểm.

![Effort theo giai đoạn: truyền thống và có AI](/effort-vi.svg)

| Giai đoạn | Truyền thống | Có AI | Thay đổi | Ai gánh phần thay đổi |
|---|---|---|---|---|
| Khám phá và yêu cầu | 10 | 12 | +20% | PO/BA |
| Refinement và DoR | 5 | 8 | +60% | PO, Tech Lead |
| Sprint Planning | 3 | 3 | 0% | Cả team |
| Thiết kế UI và kiến trúc | 8 | 6 | −25% | Designer, Tech Lead |
| Lập trình | 40 | 12 | −70% | Developer |
| Unit test | 7 | 2 | −71% | Developer |
| Code review | 5 | 7 | +40% | Tech Lead, Reviewer |
| Test case và QA thủ công | 10 | 5 | −50% | QA |
| Automation test | 5 | 2 | −60% | QA |
| CI/CD và triển khai | 3 | 2 | −33% | Tech Lead |
| Sprint Review và UAT | 4 | 5 | +25% | PO, khách hàng |
| Vận hành nền tảng AI | 0 | 4 | Mới | AI Enablement |
| **Tổng** | **100** | **68** | **−32%** | |

### 7.1 Cơ cấu effort thay đổi thế nào

| Nhóm công việc | Tỉ trọng truyền thống | Tỉ trọng có AI |
|---|---|---|
| Yêu cầu, refinement, nghiệm thu (PO/BA, khách) | 19% | 37% |
| Thiết kế, kiến trúc, review, release (Designer, Tech Lead) | 16% | 22% |
| Thực thi: code, unit test, QA, automation | 62% | 31% |
| Lập kế hoạch và vận hành nền tảng AI | 3% | 10% |

::: tip Kết luận
Tổng effort giảm khoảng 32%, nhưng điều quan trọng hơn là **trọng tâm dịch chuyển**. Phần thực thi giảm từ khoảng
62% xuống 31% tổng effort. Phần yêu cầu, quyết định và nghiệm thu tăng từ khoảng 35% lên gần 60%. Team cần nhiều
năng lực BA, review và kiến trúc hơn, và ít năng lực code thuần hơn.
:::

## 8. Ước lượng và đo lường

### 8.1 Thay đổi cách ước lượng

- Story point không còn phản ánh công sức code. Ước lượng theo **độ phức tạp nghiệp vụ, độ mơ hồ và công
  review/nghiệm thu**.
- Dùng thang S / M / L / XL (`size:*`) cho story. Gắn cờ `human-code` cho story có rủi ro cao (bảo mật, thanh
  toán, thuật toán): agent không tự code những story này.
- Năng lực sprint tính theo số PR team review được và số story PO nghiệm thu được, không theo velocity code.

### 8.2 Chỉ số theo dõi

| Chỉ số | Cách đo | Mục tiêu tham khảo |
|---|---|---|
| Lead time | `ready-to-dev` → `qa-passed` | Giảm ≥ 40% sau 3 sprint |
| Thời gian chờ review | PR mở → người duyệt cuối approve | < 1 ngày làm việc |
| Tỉ lệ Fail to dev | Story Fail to dev / story được triage | < 20% và giảm dần |
| Tỉ lệ đạt review vòng 1 | PR không cần sửa Blocker/Major | ≥ 60% |
| Độ phủ AC bằng automation | AC có test tự động / tổng AC | ≥ 80% (web/admin/api) |
| Lỗi lọt sau release | Bug phát hiện sau merge | Không tăng so với truyền thống |
| Chi phí AI mỗi story | Token/license chia theo story | Theo dõi xu hướng |

Danh sách chỉ số đầy đủ (gồm thời gian chờ con người, tỉ lệ Needs human, lỗi G3 bắt được, UAT rejected) ở
[quy trình phát triển mục 11](process.md). `sprint report` và `sprint retro` tính các chỉ số này.

## 9. Rủi ro và kiểm soát

| Rủi ro | Kiểm soát |
|---|---|
| PR dồn ứ chờ review (nút thắt mới) | Giới hạn WIP cột chờ review và QA; khung giờ review cố định mỗi ngày; AI review vòng 1 trước |
| Yêu cầu mơ hồ → AI làm nhanh nhưng sai | DoR 11 tiêu chí kiểm tra tự động; tăng thời gian refinement; test case thiết kế trước khi code |
| Reviewer tin AI quá mức | Người duyệt cuối bắt buộc kiểm tra nghiệp vụ và bảo mật; cổng G3 refutation; kiểm tra ngẫu nhiên PR đã duyệt |
| Khách hàng không nghiệm thu kịp | Thống nhất SLA phản hồi trong hợp đồng; nghiệm thu theo lô hằng tuần |
| Junior thiếu cơ hội học | Luân phiên story `human-code`; junior tham gia review cùng Tech Lead |
| Bảo mật dữ liệu, bản quyền code | Token giới hạn theo repo; điều khoản AI trong hợp đồng; không đưa dữ liệu thật của khách vào prompt; Security duyệt ở Sprint 0 |
| Thiết kế AI tạo ra rập khuôn, lệch thương hiệu, kém khả năng tiếp cận | Bắt buộc dùng design system làm đầu vào; Designer duyệt mọi màn hình trước khi code |
| Bản quyền tài sản thiết kế (ảnh, icon, font do AI tạo) | Chỉ dùng tài sản từ thư viện đã được cấp phép; ghi nguồn trong design system |
| Khách duyệt thiết kế chậm làm trễ sprint | Giới hạn duyệt trong 1–2 ngày đầu sprint; story có UI lớn thì tách phần thiết kế làm trước một sprint |
| Phụ thuộc nhà cung cấp AI | Skill và standard viết dạng Markdown trung lập, dùng được cho nhiều công cụ |

## Câu hỏi mở

- Công cụ để AI **tạo/ghi** thiết kế vào Figma: team thử nghiệm và chọn ở Sprint 0 (Figma MCP phổ biến chủ yếu
  dùng để đọc thiết kế).
- Ai giữ vai trò AI Enablement ở cấp công ty (process owner của repo trung tâm)?
- Số liệu effort và mục tiêu chỉ số là tham khảo; thay bằng số đo sau 2–3 sprint thí điểm.
