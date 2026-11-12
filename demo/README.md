# Kịch bản demo — Quy trình WATA AI

Repo này là project mẫu (app quản lý công việc, `apps/web`) đã cài **WATA AI Process v1.5.0**. Có hai demo cho
khán giả **dev và QA nội bộ**:

| Demo | Nội dung | Thời lượng | Lệnh chính |
|---|---|---|---|
| **1. Quy trình phát triển** | Một story đi từ yêu cầu → code → review → QA → merge → nghiệm thu, và các nhánh rẽ (thiếu thông tin, rủi ro thấp/cao) | 35–45 phút | `/issue-create`, `/triage`, `/test-design`, `/implement`, `/pr-review`, `/qa`, `/merge-gate`, `/uat` |
| **2. Quản lý Scrum** | Planning theo năng lực review/QA, daily tập trung việc bị chặn, review, retro biến lỗi AI thành sửa skill | 20–25 phút | `/sprint plan\|daily\|review\|retro\|report` |

Thông điệp xuyên suốt: **AI làm phần việc, con người giữ các cổng.** AI không bao giờ gắn `status:ready-to-dev`
(G2), không merge (G4), không gắn `status:done` (G5). Nút thắt dịch chuyển từ *viết code* sang *review và QA*,
nên Scrum lập kế hoạch theo năng lực review/QA, không theo tốc độ AI viết code.

---

## 0. Chuẩn bị (làm trước buổi demo 1 ngày)

- [ ] Máy trình bày: Claude Code đã đăng nhập, `gh auth status` OK (có scope `repo`, `workflow`), Node ≥ 20.
- [ ] `git clone https://github.com/phoenixit99/wata-demo && cd wata-demo && npm --prefix apps/web ci && npx --prefix apps/web playwright install chromium`
- [ ] Chạy thử: `npm --prefix apps/web test && npm --prefix apps/web run e2e` → xanh.
- [ ] Tạo issue mẫu: `python3 -I demo/seed/seed.py phoenixit99/wata-demo` (chạy lại không sinh trùng).
- [ ] Mở sẵn 3 cửa sổ:
  1. **Terminal A — "Dev session"**: `cd wata-demo && claude`
  2. **Terminal B — "Review session"** (session riêng, để chứng minh review độc lập): `cd wata-demo && claude`
  3. **Trình duyệt**: tab Issues, tab Pull requests, tab app chạy local (`npm --prefix apps/web run dev`).
- [ ] Đọc mục [Dự phòng](#dự-phòng-khi-ai-chạy-chậm-hoặc-lệch) và biết các issue/PR "đã chạy sẵn" để nhảy cóc.

> Mọi lệnh `/...` là **chế độ tương tác**: trước mỗi lần ghi (comment, label, commit, PR), AI cho xem nội dung
> chính xác và chờ bạn đồng ý. Đây là điểm nên nói to khi demo.

Trong demo một người đóng nhiều vai. Khi đổi vai, nói rõ: "Bây giờ tôi là PO / Tech Lead / QA".

---

## Demo 1 — Quy trình phát triển (9 bước, 5 cổng)

Sơ đồ nhắc lại (chiếu `docs/agents/process.md` mục 4 hoặc website quy trình):

```
PO viết yêu cầu ─G1─▶ triage (DoR) ─▶ test-design ─G2─▶ implement ─▶ PR ─▶ pr-review ─▶ qa ─▶ merge-gate ─G3─G4─▶ merge ─▶ uat ─G5─▶ done
   (người)      (người)   (AI)          (AI)      (người)   (AI)            (AI, session riêng) (AI)    (AI)       (người)  (người) (AI)  (người)
```

### Bước 1 — PO: từ lời nói thành issue chuẩn (3 phút) · *vai PO*

Terminal A:
```
/issue-create Người dùng muốn lọc danh sách công việc theo trạng thái: tất cả, đang làm, đã xong. Lọc rồi mà đánh dấu xong thì việc đó phải biến mất luôn. Tải lại trang thì về Tất cả.
```
**Thấy:** AI hỏi lại các điểm còn mơ hồ, soạn issue theo mẫu `feature.yml` với AC dạng "Khi … thì …", đề xuất label.
**Nói:** AC phải kiểm chứng được — đó là đầu vào cho cả test design, review lẫn UAT.

> Có thể không tạo issue mới mà dùng issue mẫu **"Lọc danh sách công việc theo trạng thái"** (đã seed) cho các bước sau
> để tiết kiệm thời gian. Chỉ cần cho xem bản AI soạn rồi từ chối ghi.

### Bước 2 — Cổng G1 và triage (4 phút) · *vai PO → AI*

1. Trên GitHub, mở issue **"Lọc danh sách…"**, gắn label `status:backlog` → **cổng G1** (PO xác nhận "issue này đáng làm").
2. Terminal A: `/triage <số issue>`

**Thấy:** bảng R1–R11 (có assignee, AC đo được, không TBD, tìm issue trùng theo cả tiêu đề và code…), đề xuất
`risk:standard`, comment `## Triage: PASS`, label chuyển `status:test-design`.

**Nhánh rẽ (2 phút):** issue **"Cải thiện màn hình công việc"** → gắn `status:backlog` → `/triage <số>`.
**Thấy:** `## Triage: FAIL` chỉ ra R2 (tiêu đề chung chung), R5 ("đẹp hơn", "nhanh", "hợp lý"), R7 (`TBD`); label
`status:fail-to-dev`. **Nói:** AI từ chối làm việc mơ hồ thay vì đoán — PO sửa issue rồi gắn lại `status:backlog`.

### Bước 3 — Test design trước khi code, cổng G2 (5 phút) · *AI → Tech Lead*

1. Terminal A: `/test-design <số issue>`
   **Thấy:** test case `TC-<số>-1…n` ánh xạ từng AC (unit / component / e2e / manual), plan "AC → file → test",
   comment `## Test design: PASS`.
2. Đổi vai Tech Lead. Terminal A: `/test-design --approve <số issue>`
   **Thấy:** AI soạn `## Plan approval` theo checklist, **nhưng không gắn** `status:ready-to-dev`.
3. Tech Lead tự gắn `status:ready-to-dev` trên GitHub → **cổng G2**.
   **Nói:** G2 là chỗ rẻ nhất để sửa sai: sửa plan rẻ hơn sửa code.

### Bước 4 — Implement (6–8 phút) · *vai Dev, AI code*

Terminal A: `/implement <số issue>`
**Thấy:** AI tạo branch, viết test trước (từ TC), code `filterTasks` trong `tasks.ts` và nút lọc trong `App.tsx`,
chạy `lint`/`typecheck`/`test`/`build`, mở PR `Refs #<số>` theo `pull_request_template.md`, đăng `## Build write-up`
với footer **đã chạy / chỉ đọc / còn là claim**. Label → `status:in-review`.
**Nói:** write-up nói rõ cái gì *đã chạy thật* và cái gì *mới là khẳng định* — reviewer biết phải nghi ngờ chỗ nào.

### Bước 5 — Review ở session riêng (5 phút) · *AI reviewer, Terminal B*

Terminal B (session mới, không biết gì về lúc code): `/pr-review <số PR>`
**Thấy:** lượt 1 đọc diff theo 9 tiêu chí; lượt 2 **cố bác bỏ** từng khẳng định trong write-up (chạy lại test, đối
chiếu AC3 "biến mất ngay"); `## Code review: PASS` hoặc `FAIL` kèm Finding [Blocker/Major/Minor].
**Nói:** người viết và người review là hai session khác nhau — giống hai dev khác nhau. FAIL → `status:in-progress`,
Terminal A chạy lại `/implement <số>`; tối đa 3 vòng (`round:*`) rồi `status:needs-human`.

### Bước 6 — QA (5 phút) · *AI QA*

Terminal A: `/qa <số issue>`
**Thấy:** AI viết Playwright cho các TC auto trong `apps/web/e2e/`, chạy `npm --prefix apps/web run e2e`, phân loại lỗi
(lỗi sản phẩm / lỗi test / môi trường), `## QA report: PASS` → `status:qa-passed`.
**Nói:** luật "không bao giờ làm yếu test để xanh". Case manual (nếu có) → `/qa --manual` cho QA thật.

### Bước 7–8 — Cổng G3 và G4 (4 phút) · *Tech Lead*

1. `/merge-gate <số issue>` → `## Refutation brief`: đoạn code nên đọc kỹ, cái chưa được kiểm, câu hỏi gợi ý.
   Người review đọc và đăng `## G3: OK` (hoặc tìm ra lỗi → `## Code review: FAIL`).
2. `/merge-gate --merge <số issue>` → kiểm CI trên commit cuối, CODEOWNERS, chuỗi heading PASS, G3 →
   `## Merge readiness: READY`.
3. **Tech Lead tự bấm Merge** trên GitHub → **cổng G4**. Cho xem: thử push thẳng `main` bị branch protection chặn.

### Bước 9 — UAT, cổng G5 (3 phút) · *PO*

1. Gắn `status:uat` (trong project thật, workflow `wata-pr-merged` tự gắn sau merge).
2. `/uat <số issue>` → `## UAT checklist` bằng ngôn ngữ người dùng (không tên file, không thuật ngữ).
3. PO mở app local, `/uat --run <số issue>` đi qua từng mục → `## UAT: ACCEPTED`.
4. **PO tự gắn** `status:done` và đóng issue → **cổng G5**.

### Phụ: hai nhánh rủi ro (nếu còn thời gian, 4 phút)

- **"Đổi câu trạng thái rỗng"** → triage đề xuất `risk:low` → bảng `docs/agents/risk-tiers.md`: **bỏ G3**, đi nhanh.
- **"Xoá các việc đã xong"** → xoá dữ liệu người dùng → triage đề xuất `risk:high` → thêm review bảo mật, G3 bắt buộc.

### Câu hỏi hay gặp từ dev/QA

| Câu hỏi | Trả lời ngắn |
|---|---|
| AI có tự merge không? | Không. Luật trong `CLAUDE.md` + branch protection + CODEOWNERS; token của agent không có quyền bypass. |
| Lỡ AI code sai thì sao? | Hai lớp chặn trước người: review session riêng (bác bỏ write-up) và QA; tối đa 3 vòng rồi giao người. |
| Chạy tự động được không? | Được: workflow `wata-agent` chạy skill khi label đổi (cần GitHub App + secrets, `docs/agents/setup-guide.md` mục 3). Repo demo tắt phần này để mọi bước đều chạy tương tác cho dễ xem. |
| QA còn làm gì? | Duyệt test case ở G2, chạy case manual/mobile (`/qa --manual`), quyết định khi AI phân loại "chưa chắc". |

---

## Demo 2 — Quản lý Scrum với AI

Dữ liệu: milestone **Sprint 1** (đã đóng, có lịch sử thật từ lần chạy thử), backlog 6 story seed (`demo: 2`), và
**Sprint 2** đang chạy. `project.yml` của repo demo đặt `sla_hours` = 1 giờ và WIP = 1 để daily có dữ liệu "quá SLA"
và "vượt WIP" thật. Project thật dùng giá trị trong mẫu (8–48 giờ, WIP 3/4/4).

### 1. Sprint Planning (7 phút) · *PM + PO + Tech Lead*

```
/sprint plan "Sprint 2"
```
**Thấy:** số liệu Sprint 1 (PR review/người/ngày, lead time, tỉ lệ fail-to-dev), **năng lực = min(review, QA,
nghiệm thu)**, danh sách đề xuất theo priority, và các cờ:
- **"Kéo thả, dự án, nhãn màu, lịch"** `size:xl` → đề xuất tách;
- **"Đăng nhập bằng email"** `human-code` + `risk:high` → cần người code, chiếm năng lực review bảo mật;
- story UI cần duyệt thiết kế trong 1–2 ngày đầu.

**Nói:** AI viết code nhanh không có nghĩa sprint chứa được nhiều hơn — chỉ chứa được bằng số PR người review kịp.
Team chốt Sprint Goal; AI chỉ tạo milestone và gắn issue **sau khi được đồng ý**.

### 2. Daily 15 phút (5 phút) · *PM*

```
/sprint daily
```
**Thấy:** chỉ 3 thứ đáng bàn — **việc bị chặn** (`needs-human`, `blocked`, `fail-to-dev`), **hàng chờ con người**
(chờ review / QA / G2 / G3 / UAT so với WIP), **quá SLA**. Tiến độ bình thường đã có trên label nên không đọc lại.
**Nói:** daily chuyển từ "hôm qua làm gì" sang "ai đang chặn ai".

### 3. Sprint Review (4 phút) · *PO*

```
/sprint review "Sprint 1"
```
**Thấy:** tài liệu demo cho khách bằng ngôn ngữ nghiệp vụ (kịch bản "làm gì → thấy gì"), story chưa xong và lý do.
Phần B: dán ghi chú buổi review → `/sprint review feedback "Sprint 1"` → tách thành bug / story mới / đổi ưu tiên,
**chờ PO đồng ý từng mục** rồi mới tạo issue.

### 4. Retro (5 phút) · *cả team + AI Enablement*

```
/sprint retro "Sprint 1"
```
**Thấy:** số liệu so với mục tiêu trong `scrum.md`; **lỗi AI lặp lại gom theo nguyên nhân** (từ các comment
`## Code review: FAIL`, `## QA report: FAIL`, `## Needs human`) → đề xuất sửa skill/coding standard/CLAUDE.md
("Bẫy đã biết").
**Nói:** retro không chỉ cải tiến người mà cải tiến cả AI — đề xuất sửa skill gửi về repo quy trình trung tâm.

### 5. Báo cáo (2 phút, tuỳ chọn) · *PM*

`/sprint report` → báo cáo tiến độ và chỉ số cho PM/khách hàng.

---

## Phần 3 — Demo cho lãnh đạo, PM, PO (dự kiến)

Dùng lại repo này, rút gọn theo người xem:

| Người xem | Nội dung | Lệnh |
|---|---|---|
| PO | Lời nói → issue chuẩn; G1; triage FAIL; nghiệm thu; phản hồi review thành story | `/issue-create`, `/uat --run`, `/sprint review feedback` |
| PM | Planning theo năng lực, daily theo việc bị chặn, báo cáo chỉ số | `/sprint plan`, `/sprint daily`, `/sprint report` |
| Lãnh đạo | Con người giữ cổng nào, kiểm soát rủi ro, chỉ số đo được, kết quả pilot | trang tổng quan (chưa làm) |

---

## Dự phòng khi AI chạy chậm hoặc lệch

- Mỗi bước đều có **bản đã chạy sẵn** từ buổi chạy thử (xem bảng "Mốc đã chạy sẵn" bên dưới): mở issue/PR đó và
  đọc comment thay vì chạy live.
- AI hỏi lại quá nhiều: trả lời ngắn "dùng giả định hợp lý, ghi vào Câu hỏi mở".
- Bước ghi bị lỗi quyền: kiểm `gh auth status`; repo public nên mọi người xem được, nhưng chỉ owner ghi được.
- Không nói "AI luôn đúng". Khi AI sai trước khán giả, đó là ví dụ tốt nhất cho việc vì sao có cổng người.

### Mốc đã chạy sẵn

<!-- Điền sau buổi chạy thử: số issue/PR cho từng bước -->

---

## Dựng lại demo từ đầu

```bash
# Issue mẫu (không trùng nếu chạy lại)
python3 -I demo/seed/seed.py phoenixit99/wata-demo
# Chỉ demo 1 hoặc chỉ demo 2
python3 -I demo/seed/seed.py phoenixit99/wata-demo --only 1
```
Để xoá sạch: đóng các issue/PR cũ (hoặc tạo repo mới và chạy lại `bootstrap.sh` + `seed.py`).
