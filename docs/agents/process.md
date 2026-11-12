# Quy trình phát triển dự án sử dụng AI Agent — v1.5

WATA Software · Tài liệu nội bộ · Bản gốc (canonical) của quy trình.

Tài liệu này dành cho **mọi người tham gia phát triển phần mềm**: PO, BA, PM, Designer, Dev,
Tech Lead, QA, AI Enablement, Security. Nhịp sprint, sự kiện và ước lượng nằm ở [Quy trình Scrum](scrum.md). Nếu bạn chỉ cần biết việc của mình, đọc trang vai trò trong `roles/`
trước. Phần cài đặt kỹ thuật nằm ở `setup-guide.md`; luật cho AI nằm ở `contract.md`.

---

## Thay đổi

| Phiên bản | Thay đổi chính |
|---|---|
| 1.4 | Gộp [Quy trình Scrum](scrum.md) vào cùng bộ quy trình: duyệt thiết kế UI là điều kiện của G2 cho story có UI; giới hạn WIP cho hàng chờ review và QA; label `size:*`, `human-code`; vai trò AI Enablement (process owner), Security, khách hàng; [Definition of Done](definition-of-done.md); 7 skill cho sự kiện Scrum. |
| 1.3 | Mỗi vai trò có skill riêng (thêm `test-design --approve`, `pr-review --design`, `qa --manual`, `uat --run`, `sprint release`); catalog skill là nguồn duy nhất, có script kiểm tra đồng bộ. |
| 1.2 | Thêm vai trò PM, Bước 0 (phân tích feature), UAT, luồng hotfix, phân loại theo rủi ro, RACI, SLA cho hàng chờ của con người, hướng dẫn theo vai trò. Bước 7 và 8 ghi rõ là việc của con người. Trạng thái dùng label `status:*`. |
| 1.1 | 11 cải tiến: review ở session riêng, thiết kế test trước khi code, cổng con người G2/G3, trạng thái Needs human và Blocked, R11, guardrail phía server, contract chung, chống prompt injection, tương thích ngược API, báo cáo QA trung thực, áp dụng toàn công ty. |
| 1.0 | Bản đầu (16-10-2026). |

---

## 1. Tóm tắt

AI Agent (Claude) làm phần lớn việc lặp lại: kiểm tra yêu cầu, thiết kế test, viết code, review,
chạy automation, soạn báo cáo. **Con người ra quyết định** ở năm cổng: xác nhận yêu cầu (G1),
duyệt plan (G2), refutation (G3), merge (G4), nghiệm thu UAT (G5).

| Hạng mục | Nội dung |
|---|---|
| Mục tiêu | Rút ngắn thời gian từ yêu cầu đến tính năng chạy được; chuẩn hoá chất lượng code và test |
| Phạm vi | Toàn công ty. Lõi quy trình giống nhau; công nghệ, lệnh build, coding standard khai báo theo project |
| Công cụ | GitHub (Issue, PR, Actions, Projects), Claude Code + skills, MCP GitHub/Figma/Playwright |
| Kiểm soát | Label trạng thái, Definition of Ready, mỗi bước AI một session riêng, 5 cổng con người, CI + branch protection |

## 2. Cấu trúc

Bộ quy trình nằm ở repo trung tâm `wata-ai-process` (repo này). Mỗi project cài bộ quy trình
vào repo của mình bằng một lệnh (xem [Cài đặt](setup-guide.md)). Cấu trúc tham chiếu của một project:

```
<project>/
├── apps/{web,admin,api,mobile}/   Code từng app
├── packages/shared/               Contract dùng chung
├── e2e/                           Playwright + bảng test case
├── docs/agents/contract.md        Bản sao contract (do lệnh cài copy)
├── .claude/
│   ├── skills/                    Skill của quy trình (do lệnh cài copy, ghim phiên bản)
│   ├── project.yml                Cấu hình project
│   └── settings.json              permissions.deny: lớp chặn dự phòng
├── .github/                       Issue/PR template, CODEOWNERS, labels, workflow
├── .mcp.json                      GitHub, Figma, Playwright
└── CLAUDE.md                      Hướng dẫn chung cho AI
```

## 3. Công cụ

- **MCP:** GitHub (issue, label, comment, PR), Figma (đọc thiết kế), Playwright (mở trình duyệt).
- **Skill:** mỗi bước và mỗi vai trò có skill; danh sách đầy đủ ở [danh mục skill](skills.md), sinh từ `skills/catalog.json`.
- **Chạy tự động:** workflow `wata-agent` chạy đúng một skill mỗi khi issue nhận label `status:*` tương ứng, trong session mới. Label do agent đổi phải dùng token của GitHub App để kích hoạt được bước sau (sự kiện tạo bằng `GITHUB_TOKEN` không chạy workflow mới).
- **Chạy tương tác:** dev gõ `/dev-pipeline <số issue>` trong Claude Code; skill định tuyến sang bước đúng.
- **Người không dùng CLI (PO, BA, PM, QA):** làm việc trên GitHub: tạo issue bằng template, comment `@claude <yêu cầu>` để nhờ AI (workflow `wata-mention`), đổi label ở các cổng của mình.

## 4. Luồng trạng thái

Bảng label đầy đủ ở `contract.md` mục 1. Tóm tắt:

```
                      ┌──────────── fail-to-dev ◄──┐
                      │                            │ thiếu thông tin
 (G1) ──► backlog ────┼──► test-design ──(G2)──► ready-to-dev ──► in-progress ──► in-review
                      │         │                                    ▲   │  ▲          │
                      └► blocked└► fail-to-dev        request changes└───┘  │          ▼
                                                                            │  qa ──► qa-failed
   needs-human ◄── (bất kỳ bước AI nào: hết 3 vòng / cần quyết định)        └───────────┘
                                                                     qa-passed
                                                                        │ (G3) refutation
                                                                        │ (G4) merge
                                                                        ▼
                                                    uat ──(G5)──► done
                                                     └──► uat-failed ──► in-review
```

## 5. Definition of Ready

AI chỉ chuyển issue sang `status:test-design` khi đạt mọi điều kiện bắt buộc. Không đạt thì sang
`status:fail-to-dev` kèm danh sách phần thiếu và **câu chữ thay thế viết sẵn**; vướng R8 thì sang
`status:blocked`.

| # | Điều kiện | Bắt buộc |
|---|---|---|
| R1 | Có người được assign | Có |
| R2 | Tiêu đề cụ thể, nói rõ thay đổi gì | Có |
| R3 | Description giải thích vấn đề và lý do (khuyến khích user story) | Có |
| R4 | Acceptance Criteria có ít nhất 1 tiêu chí | Có |
| R5 | Mỗi tiêu chí kiểm thử được: hành động + kết quả quan sát được, không từ mơ hồ | Có |
| R6 | Xác định app bị ảnh hưởng | Có |
| R7 | Không còn TBD, "???", phần mẫu chưa điền | Có |
| R8 | Không bị chặn bởi issue chưa xong | Có (vướng → blocked) |
| R9 | Bug: có bước tái hiện, kết quả mong đợi, kết quả thực tế | Có (bug) |
| R10 | Đổi API có request/response. Story đổi UI có brief UI; **frame Figma phải được duyệt (`## Design approval: APPROVED`) trước cổng G2** | Có (story UI); khuyến nghị (API) |
| R11 | Đã tìm issue trùng và issue đang sửa cùng đoạn code; có thì link và ghi thứ tự | Có |

Cách viết AC: `writing-acceptance-criteria.md`.

## 6. Chi tiết từng bước

Bước có AI chạy thì **mỗi bước là một session riêng**. Bước 7, 8 và phần nghiệm thu của bước 9 là
việc của con người; AI chỉ chuẩn bị tài liệu.

| Bước | Ai làm chính | Skill | Kích hoạt | Kết quả |
|---|---|---|---|---|
| 0. Phân tích feature | BA + Tech Lead | `refine` | issue `type:epic` | `## Feature analysis`, danh sách issue con đề xuất |
| 1. Tạo issue | PO/BA, AI soạn | `issue-create` | người gọi | issue body đúng mẫu, `status:backlog` |
| 2. Triage | AI | `triage` | `status:backlog` | `## Triage: PASS/FAIL/BLOCKED` |
| 3. Test design + plan | AI soạn, người duyệt | `test-design` | `status:test-design` | `## Test design: PASS/FAIL` |
| 3. Cổng G2 | Tech Lead, Dev, QA | `test-design --approve` | người gọi | `## Plan approval` |
| 4. Code + PR | AI | `implement` | `status:ready-to-dev` | PR, `## Build write-up` |
| 5. Code review | AI, session riêng | `pr-review` | `status:in-review` | `## Code review: PASS/FAIL/HOLD` |
| 5. Design review | Designer | `pr-review --design` | người gọi | `## Design review: OK/CHANGES` |
| 6. QA | AI | `qa` | `status:qa` | `## QA report: PASS/FAIL/PENDING` |
| 6. QA manual/mobile | QA | `qa --manual` | người gọi | `## QA manual results` |
| 6b. Sửa sau QA/UAT | Dev + AI | `implement --fix` | dev gọi | `## QA fix` |
| 7. Refutation (G3) | Reviewer | `merge-gate` chuẩn bị | `status:qa-passed` | `## Refutation brief` |
| 8. Merge (G4) | Tech Lead | `merge-gate --merge` kiểm tra | người gọi | `## Merge readiness` |
| 9. UAT (G5) | PO | `uat` chuẩn bị | `status:uat` | `## UAT checklist` |
| 9. Nghiệm thu | PO | `uat --run` | người gọi | `## UAT: ACCEPTED/REJECTED` |
| Release | PM, Tech Lead | `sprint release` | người gọi | kế hoạch release (không ghi issue) |
| Báo cáo | PM | `sprint report` | người gọi | báo cáo tuần (không ghi issue) |

### Bước 0: Phân tích feature (cho việc lớn)

- Dùng khi yêu cầu lớn hơn một issue: nhiều app, nhiều màn hình, hoặc cần quyết định sản phẩm/kiến trúc.
- AI đọc code liên quan, phản biện yêu cầu (vấn đề thật là gì, cách đơn giản nhất, không làm thì sao), đề xuất ít nhất hai hướng kiến trúc kèm điểm yếu của từng hướng.
- **Chốt API contract trước khi chia issue con**, để các app không code trên contract đang thay đổi.
- Kết quả: `## Feature analysis` và danh sách issue con đề xuất. Chỉ tạo issue con khi PO và Tech Lead đồng ý.

### Bước 1: Tạo issue

- PO/BA mô tả bằng ngôn ngữ tự nhiên (trong Claude Code, hoặc comment `@claude` trên GitHub); AI soạn theo template: Description, Acceptance Criteria, Affected apps, Design, Technical notes.
- Điểm AI phải giả định được đánh dấu `[Giả định]` để PO xác nhận.
- **Cổng G1:** PO xác nhận nội dung và gắn `status:backlog`.

### Bước 2: Triage

- AI kiểm tra R1–R11, gồm tìm issue trùng. Đề xuất mức rủi ro (`risk:*`).
- Đạt → `status:test-design`. Thiếu → `status:fail-to-dev` kèm câu chữ thay thế. Bị chặn → `status:blocked`.

### Bước 3: Test design và plan

- AI sinh test case từ mỗi AC: luồng chính, dữ liệu sai, biên, chuyển trạng thái, đồng bộ giữa app, và **điều không được xảy ra**.
- Mã `TC-<số issue>-<thứ tự>`, ưu tiên P1–P3, đánh dấu `auto` / `manual` / `mobile`.
- Bảng **AC → file sẽ sửa → test case**, phạm vi ảnh hưởng, những gì không làm.
- Bảng test case lưu ở `e2e/test-cases/<số issue>.md`; tóm tắt trên issue.
- **Cổng G2:** Tech Lead/Dev duyệt plan, QA duyệt test case (skill `test-design --approve` hỗ trợ); story có UI phải có `## Design approval: APPROVED` (Designer + PO/khách hàng, skill `design-brief`). Rồi **con người** gắn `status:ready-to-dev`.
- Story gắn `human-code`: người code trực tiếp; agent không chạy implement.

### Bước 4: Code và PR

- Branch từ `main` mới nhất; code theo plan đã duyệt; contract → API → web/admin → mobile.
- Test viết trước; với bug, test **đỏ trước khi sửa, xanh sau khi sửa**.
- Lint, typecheck, unit test, build qua trước khi mở PR. PR có `Refs #<số>`.
- Kẹt hoặc gặp quyết định không phải của AI → `status:needs-human`.

### Bước 5: Code review (session riêng)

- Session mới, không phải session đã viết code. Hai lượt: đọc diff theo checklist; **cố bác bỏ write-up**.
- 9 tiêu chí: AC, tính đúng, coding standard, contract (gồm **tương thích ngược với bản app mobile cũ**), bảo mật, test, hiệu năng, thiết kế, kiểm chứng (build chạy trên commit cuối, claim có bằng chứng).
- Designer có thể chạy `pr-review --design`; mục "phải sửa" tính là Major.
- Blocker/Major → `status:in-progress`. Tối đa 3 vòng, sau đó `status:needs-human`. Đạt → `status:qa`.

### Bước 6: QA

- AI viết và chạy Playwright cho case `auto`; tên test bắt đầu bằng mã test case.
- Lỗi được phân loại: lỗi test, lỗi sản phẩm, lỗi môi trường. Không sửa test cho xanh khi lỗi ở sản phẩm.
- Case `manual` và `mobile`: QA chạy bằng `qa --manual`, skill ghi `## QA manual results`. **QA passed khi automation đạt và mọi case P1 manual/mobile đã có kết quả đạt.** Thiếu kết quả manual thì AI đăng `## QA report: PENDING`.
- Footer ba phần: đã chạy / chỉ đọc / còn là claim.

### Bước 6b: Sửa sau QA hoặc UAT

- `status:qa-failed`: AI đã thử 3 vòng không được; **developer** sửa (có thể dùng `implement --fix`).
- `status:uat-failed`: PO không chấp nhận; sửa đúng phần PO nêu.
- Sửa xong → `status:in-review`, một session review mới review lại.

### Bước 7: Refutation (G3)

- AI soạn `## Refutation brief`: từng claim kèm bằng chứng, các đoạn diff rủi ro cao, test chưa chạy được.
- Reviewer đọc với mục tiêu **tìm ra điểm sai**, rồi comment `## G3: OK` hoặc `## Code review: FAIL`. Có thể gộp với bước 8 khi cùng một người, trừ issue `risk:high`.
- Issue `risk:low` được bỏ G3 (xem `risk-tiers.md`).

### Bước 8: Merge (G4)

- Tech Lead gọi `merge-gate --merge` để kiểm tra: CI xanh trên commit cuối, đủ approval CODEOWNERS, đủ heading PASS.
- Con người merge. Branch protection chặn nếu thiếu điều kiện. Issue chuyển `status:uat` (không đóng).

### Bước 9: UAT (G5)

- Sau khi deploy staging, AI soạn `## UAT checklist` từ AC bằng ngôn ngữ người dùng.
- PO kiểm tra trên staging (skill `uat --run` dẫn từng mục), comment `## UAT: ACCEPTED` và gắn `status:done` (đóng issue), hoặc `## UAT: REJECTED` kèm điều chưa đạt và gắn `status:uat-failed`.
- Lỗi phát hiện ngoài phạm vi AC là **issue mới**, không phải UAT failed.

### Luồng hotfix

- Lỗi production nghiêm trọng: issue `type:hotfix`, `risk:high` mặc định.
- **Được rút gọn:** bỏ thời gian chờ triage tự động (Tech Lead triage trực tiếp), gộp G2 vào lúc bắt đầu, gộp G3 và G4, UAT sau release.
- **Không bao giờ bỏ:** test tái hiện lỗi (đỏ trước, xanh sau), code review ở session riêng, CI xanh, con người merge.
- Skill `hotfix` hướng dẫn toàn bộ; sau release phải có issue theo dõi nguyên nhân gốc.

## 7. Phân loại theo rủi ro

Không phải thay đổi nào cũng cần đủ 5 cổng. Chi tiết và ngưỡng (đề xuất): `risk-tiers.md`.

| Mức | Ví dụ | Bỏ được |
|---|---|---|
| `risk:low` | Sửa text, style nhỏ, chore không đổi hành vi | G3; G2 rút gọn (Tech Lead duyệt nhanh, không cần QA) |
| `risk:standard` | Tính năng, bug thông thường | Không bỏ gì |
| `risk:high` | Auth, thanh toán, migration, đổi contract | Không bỏ gì; G3 phải do người khác người merge; thêm review bảo mật |

## 8. Coding standard

Mỗi công nghệ có một bộ chuẩn (`docs/coding-standards/`), copy vào project và Tech Lead điều chỉnh.
AI đọc trước khi code và dùng khi review. Quy ước chung: Conventional Commits, tên branch theo
contract, PR template có checklist, CI chạy lint/test/build/automation.

**Tương thích ngược API:** app mobile lên store theo chu kỳ riêng. Không xoá hoặc đổi kiểu field
mà bản app cũ còn dùng; chỉ thêm field mới hoặc tách version endpoint. Số bản cần hỗ trợ khai báo ở
`mobile.supported_app_versions`.

## 9. Phân vai

Chi tiết từng vai trò ở `roles/`; bảng ai làm gì ở từng trạng thái ở `raci.md`.

| Vai trò | Việc chính | Cổng ký | AI hỗ trợ |
|---|---|---|---|
| PO | Yêu cầu, AC, ưu tiên sản phẩm, nghiệm thu | G1, G5 | Soạn issue, chỉ ra phần thiếu, chuẩn bị và dẫn UAT |
| BA | Phân tích feature, chia issue, làm rõ nghiệp vụ | G1 (khi được PO uỷ quyền) | Phân tích feature, đề xuất issue con |
| PM | Kế hoạch, ưu tiên hàng chờ, theo dõi SLA, rủi ro, báo cáo, release | — | Báo cáo tuần, kế hoạch release, nhắc SLA |
| Designer | Thiết kế Figma, duyệt UI | — | So UI đã code với Figma |
| Dev | Duyệt plan, sửa ca khó, xử lý Needs human | G2 (plan) | Code, unit test, review sơ bộ |
| Tech Lead | Kiến trúc, mức rủi ro, merge | G2, G3, G4 | Refutation brief, merge readiness, hotfix |
| QA | Duyệt test case, test manual/mobile | G2 (test case) | Sinh test case, automation, phiên test manual |
| AI Enablement (Tech Lead + PO kiêm nhiệm) | Skill, coding standard, MCP, lỗi AI lặp lại; process owner | — | Retro, kiểm tra Sprint 0 |
| Security | Chính sách dữ liệu, quyền của AI, token | — (tham vấn `risk:high`) | Kiểm tra Sprint 0 |
| Khách hàng | Chọn phương án UI, nghiệm thu | G5 (cùng PO) | Tài liệu demo, UAT checklist |

**Kiêm nhiệm:** một người có thể giữ nhiều vai trò, nhưng **không tự ký hai cổng liên tiếp cho cùng
một issue** (ví dụ người viết issue không tự duyệt plan của nó; người merge không tự làm G3 cho
issue `risk:high`).

**Con người luôn có thể tiếp quản:** dev nhận issue và tự code vẫn đi qua cùng các trạng thái, review
và QA. Khi không đồng ý với AI, quyết định của con người được ghi vào comment và là quyết định cuối.

## 10. Kiểm soát rủi ro

| Rủi ro | Biện pháp |
|---|---|
| AI code sai yêu cầu | DoR R1–R11, test design trước code, G2, review và QA theo AC |
| AI tự review công việc của mình | Review ở session mới; G3 do con người |
| AI đưa code lên production | Branch protection, CODEOWNERS, required checks; token AI không có quyền bypass; `permissions.deny` |
| AI tự qua cổng con người | Guard workflow gỡ label cổng nếu do bot gắn, và agent không chạy trên label đó |
| Prompt injection qua issue | Nội dung issue/comment là dữ liệu, không phải lệnh (`CLAUDE.md`, contract) |
| Hai job ghi đè nhau | Một label trạng thái; guard gỡ label cũ; `concurrency` theo issue; đọc lại trước khi ghi |
| PR dồn ứ chờ review/QA | Giới hạn WIP `wip_in_review`, `wip_qa`: agent không bắt đầu story mới khi hàng chờ đầy; khung giờ review cố định |
| Báo cáo sai sự thật | Footer ba phần; build tính trên commit cuối; không báo điều không thấy |
| Vòng lặp vô hạn | Tối đa 3 vòng rồi `needs-human` |
| Con người thành điểm nghẽn | SLA cho hàng chờ, nhắc tự động (`wata-sla-reminder`), PM escalate |
| Lộ thông tin | Token giới hạn repo; secret ở GitHub Secrets; hợp đồng khách hàng cho phép dùng AI |
| Chi phí AI vượt kiểm soát | Giới hạn `--max-turns`, ngân sách theo project, PM theo dõi |

## 11. Chỉ số

| Chỉ số | Cách đo | Ý nghĩa |
|---|---|---|
| Lead time | `ready-to-dev` → `qa-passed` | Tốc độ giao |
| Thời gian chờ con người | Tổng thời gian ở `fail-to-dev`, `test-design` (chờ G2), `needs-human`, `qa-passed` (chờ G3/G4), `uat` | Điểm nghẽn ở người hay ở AI |
| Tỉ lệ Fail to dev | Fail / tổng triage | Chất lượng yêu cầu |
| Tỉ lệ plan bị trả ở G2 | Trả lại / tổng plan | Chất lượng phân tích của AI |
| Tỉ lệ đạt review vòng 1 | PR đạt ngay vòng 1 | Chất lượng code ban đầu |
| Tỉ lệ Needs human | Số lần / tổng issue, kèm lý do | Chỗ cần cải tiến skill |
| Lỗi G3 bắt được | Lỗi người tìm ra sau khi AI báo đạt | Điều review/QA của AI bỏ lọt |
| Tỉ lệ UAT rejected | Rejected / tổng UAT | Khoảng cách giữa AC và ý PO |
| Độ phủ AC bằng automation | AC có test tự động / tổng AC | An toàn khi release |
| Lỗi lọt sau release | Bug sau merge | Hiệu quả toàn quy trình |
| Chi phí AI | Chi phí token / issue | Hiệu quả chi phí |

Skill `sprint report` tổng hợp các chỉ số này hằng tuần cho PM. Mục tiêu tham khảo (lead time giảm ≥ 40% sau 3 sprint, chờ review < 1 ngày, fail-to-dev < 20%, đạt review vòng 1 ≥ 60%, ≥ 80% AC có automation) ở [Quy trình Scrum mục 8](scrum.md).

## 12. Áp dụng cho toàn công ty

| Lớp | Gồm | Ai sở hữu | Project được đổi? |
|---|---|---|---|
| Lõi | Trạng thái, DoR, DoD, 5 cổng, guardrail, contract, format báo cáo, skill quy trình, workflow `wata-*`, label | AI Enablement cấp công ty (process owner) | Không; muốn khác phải xin ngoại lệ |
| Cấu hình | Tracker, app và công nghệ, lệnh build, coding standard, số bản app hỗ trợ, người ký cổng, SLA | Tech Lead + PM project | Có, trong khuôn mẫu `project.yml` |
| Mở rộng | Skill nghiệp vụ riêng, tiêu chí review thêm | Tech Lead project | Chỉ được thêm, không nới lỏng lõi |

- GitHub là bản triển khai tham chiếu. Project dùng tracker của khách hàng (Azure DevOps, Jira) giữ nguyên lõi; cần viết lại phần đọc/ghi tracker trong skill.
- Project **ghim phiên bản** (`process_version`) và nâng cấp chủ động. Thay đổi lõi đi qua PR vào repo trung tâm, có changelog, semver (patch: sửa nhỏ; minor: thêm bước/tiêu chí; major: đổi luồng trạng thái).
- Bài học chảy ngược: retro hằng tháng trên Needs human, lỗi G3 bắt được, UAT rejected, lỗi lọt. Nguyên nhân lặp ở nhiều project thì sửa ở lõi.
- Mọi người đều có thể đề xuất thay đổi quy trình bằng issue trên repo trung tâm.

**Điều kiện áp dụng:** xem checklist ở `setup-guide.md`.

**Lộ trình:**

1. Nền tảng: repo trung tâm, contract, template, triage chạy trên một repo mẫu.
2. Pilot 1–2 project: bật dần triage → test design → implement → review → QA → UAT; so chỉ số với số liệu nền.
3. Chuẩn hoá: sửa skill theo bài học pilot, phát hành bản ổn định, đào tạo theo vai trò.
4. Mở rộng: project mới áp dụng từ đầu; project đang chạy chuyển dần.

**Câu hỏi mở:**

- Ai giữ vai trò AI Enablement cấp công ty (process owner)?
- Project dùng tracker của khách hàng có nằm trong giai đoạn đầu không?
- SLA, giới hạn WIP, ngân sách AI và ngưỡng rủi ro trong tài liệu là **đề xuất**; team chốt trước pilot.
