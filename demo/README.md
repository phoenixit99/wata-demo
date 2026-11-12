# Kịch bản demo — Quy trình WATA AI

Repo này là project mẫu (app quản lý công việc ở `apps/web`) đã cài **WATA AI Process v1.5.0**. Dùng cho hai demo,
khán giả **dev và QA nội bộ**:

| Demo | Nội dung | Thời lượng | Issue dùng |
|---|---|---|---|
| **1. Quy trình phát triển** | Một story đi từ yêu cầu → code → review → QA → merge → nghiệm thu; các nhánh rẽ | 35–45 phút | #1 (chính), #2, #3, #4 |
| **2. Quản lý Scrum** | Planning theo năng lực review/QA, daily theo việc bị chặn, review, retro | 20–25 phút | #5–#10 + lịch sử Sprint 1 |

**Thông điệp xuyên suốt:** AI làm phần việc, con người giữ các cổng. AI không gắn `status:ready-to-dev` (G2), không
merge (G4), không gắn `status:done` (G5). Nút thắt chuyển từ *viết code* sang *review và QA*, nên Scrum lập kế hoạch
theo năng lực review/QA, không theo tốc độ AI viết code.

Có 3 giai đoạn, làm theo thứ tự:

1. **Cài máy** (một lần, khoảng 10 phút).
2. **Tập dượt = tạo dữ liệu Sprint 1** (trước buổi demo 1–2 ngày, khoảng 1,5–2 giờ). Bắt buộc, vì Demo 2 cần lịch sử thật.
3. **Buổi demo.**

---

## Giai đoạn 1 — Cài máy

```bash
git clone git@github.com:phoenixit99/wata-demo.git ~/wata-demo   # đã có sẵn ở ~/wata-demo thì bỏ qua
cd ~/wata-demo
npm --prefix apps/web ci
npm --prefix apps/web test        # 9 test xanh
npm --prefix apps/web run e2e     # 2 test Playwright xanh
gh auth status                    # đã đăng nhập phoenixit99
```

Mở Claude Code **từ thư mục repo** (mở ở thư mục khác thì skill không nạp, gõ `/triage` sẽ báo `Unknown command`):

```bash
cd ~/wata-demo && claude
```

Gõ `/dev-pipeline`. Bạn sẽ thấy bảng việc theo vai trò, nghĩa là skill đã nạp và sẵn sàng.

> **Quy ước khi chạy:** mọi lệnh `/...` chạy ở chế độ tương tác. Trước mỗi lần ghi lên GitHub (comment, label,
> commit, PR), AI cho xem nội dung chính xác và hỏi. Đọc rồi trả lời **"đồng ý"** (hoặc yêu cầu sửa).
> Các bước ghi **"Bạn (vai …)"** là cổng con người: bạn tự làm trên GitHub, không nhờ AI.

---

## Giai đoạn 2 — Tập dượt và tạo dữ liệu Sprint 1

Mục tiêu: hai story **#7** và **#6** đi hết quy trình (thành lịch sử Sprint 1), và các story khác dừng ở trạng thái
dở dang (thành dữ liệu cho daily và planning). Đây cũng là buổi tập cho Demo 1: comment và PR của #7 là **bản dự phòng**
cho từng bước khi demo live bị chậm.

> **Không đụng #1, #2, #3, #4.** Bốn issue này để demo live.

### 2.1 Tạo milestone Sprint 1

```bash
cd ~/wata-demo
gh api repos/phoenixit99/wata-demo/milestones -f title="Sprint 1" -f description="Sprint Goal: người dùng thấy số việc còn lại và sửa được tên việc"
gh issue edit 7 --milestone "Sprint 1"
gh issue edit 6 --milestone "Sprint 1"
```

### 2.2 Chạy #7 qua toàn bộ quy trình

| # | Ai làm | Làm gì | Kết quả mong đợi |
|---|---|---|---|
| 1 | Bạn (PO) | GitHub → issue #7 → gắn label `status:backlog` (**G1**) | Mỗi issue chỉ có **đúng một** label `status:*`: mỗi lần bạn gắn label mới thì gỡ label cũ |
| 2 | Claude (cửa sổ A) | `/triage 7` | `## Triage: PASS`, label → `status:test-design` |
| 3 | Claude (cửa sổ A) | `/test-design 7` | `## Test design: PASS` với `TC-7-1…`, plan |
| 4 | Claude (cửa sổ A), bạn đóng vai Designer | `/design-brief brief 7` | `## UI brief` (story có UI bắt buộc duyệt thiết kế trước G2) |
| 5 | Claude (cửa sổ A), bạn đóng vai Designer + PO | `/design-brief approve 7`, trả lời "duyệt" | `## Design approval: APPROVED` |
| 6 | Claude (cửa sổ A) | `/test-design --approve 7` | `## Plan approval` (AI **không** gắn ready-to-dev) |
| 7 | Bạn (Tech Lead) | Gắn `status:ready-to-dev` (**G2**), gỡ `status:test-design` | |
| 8 | Claude (cửa sổ A) | `/implement 7` | branch + PR "Refs #7", `## Build write-up`, label → `status:in-review` |
| 9 | Claude (**cửa sổ B, session mới**: mở terminal khác, `cd ~/wata-demo && claude`) | `/pr-review 7` (số **issue**, không phải số PR) | `## Code review: PASS`, label → `status:qa` (hoặc FAIL → `status:in-progress`, quay lại bước 8 ở cửa sổ A) |
| 10 | Claude (cửa sổ A) | `/qa 7` | Playwright mới trong `apps/web/e2e/`, `## QA report: PASS`, label → `status:qa-passed` |
| 11 | Claude (cửa sổ A) | `/merge-gate 7` | `## Refutation brief` |
| 12 | Bạn (reviewer) | Đọc brief, comment trên issue `## G3: OK` (một dòng đầu đúng như vậy, dưới đó ghi đã đọc gì) | |
| 13 | Claude (cửa sổ A) | `/merge-gate --merge 7` | **Dự kiến `NOT READY` chỉ vì M7** (thiếu approval của Code Owner: bạn là tác giả PR nên không tự approve được). Mọi mục khác phải đạt; mục nào khác không đạt thì xử lý trước. Khi AI hỏi có đăng không: đồng ý, để giữ làm bằng chứng |
| 14 | Bạn (Tech Lead) | Merge PR trên GitHub (**G4**): tích "Merge without waiting for requirements to be met" (quyền admin), rồi comment trên issue "[chạy thử] merge bằng quyền admin vì một người đóng mọi vai; project thật cần Code Owner thứ hai approve" | PR merged |
| 15 | Bạn | Gắn `status:uat`, gỡ `status:qa-passed` (trong project thật, workflow `wata-pr-merged` tự gắn) | |
| 16 | Claude (cửa sổ A) | `/uat 7` | `## UAT checklist` |
| 17 | Claude (cửa sổ A) | Chạy app `npm --prefix apps/web run dev`, rồi `/uat --run 7` và kiểm từng mục cùng AI | `## UAT: ACCEPTED` |
| 18 | Bạn (PO) | Gắn `status:done`, gỡ `status:uat`, đóng issue #7 (**G5**) | |

**Ghi lại** số PR của #7 vào bảng [Mốc đã chạy sẵn](#mốc-đã-chạy-sẵn) ở cuối file.

### 2.3 Chạy #6 như #7

Làm lại các bước 1–18 với **#6**. Nếu review hoặc QA báo FAIL thì **càng tốt**: đó là dữ liệu thật cho retro. Cứ để
AI sửa (`/implement 6`) rồi review lại.

### 2.4 Đóng Sprint 1, mở Sprint 2 với việc dở dang

```bash
# Đóng Sprint 1
M=$(gh api repos/phoenixit99/wata-demo/milestones --jq '.[] | select(.title=="Sprint 1") | .number')
gh api -X PATCH repos/phoenixit99/wata-demo/milestones/$M -f state=closed
```

Mở Sprint 2 (đã chạy được vài ngày) và gắn các story dở dang. `/sprint daily` chỉ đọc issue **trong milestone đang mở**,
nên các story này phải nằm trong Sprint 2:

```bash
gh api repos/phoenixit99/wata-demo/milestones -f title="Sprint 2" -f due_on="2026-11-26T17:00:00Z" \
  -f description="Sprint Goal: người dùng thấy việc quá hạn và tìm nhanh được việc"
for n in 5 8 10; do gh issue edit $n --milestone "Sprint 2"; done
```
(Đổi `due_on` thành khoảng 2 tuần sau ngày bạn tập dượt.)

Tạo dữ liệu (mỗi lệnh `/...` chạy ở cửa sổ A):

| Issue | Làm | Trạng thái để lại | Daily sẽ thấy |
|---|---|---|---|
| #5 Hạn chót | Gắn `status:backlog` → `/triage 5` → `/test-design 5` | `status:test-design` | Hàng chờ "duyệt plan (G2)" |
| #8 Tìm kiếm | Gắn `status:backlog` → `/triage 8` → `/test-design 8` → `/design-brief brief 8` → `/design-brief approve 8` → bạn gắn `status:ready-to-dev` → `/implement 8`. **Dừng khi PR đã mở**, không review | `status:in-review`, có PR mở | Hàng chờ review = 1 = WIP; quá SLA review (sau 1 giờ) |
| #10 Đăng nhập | Gắn `status:backlog` → `/triage 10` | Triage sẽ vướng điểm cần quyết định (backend, nhà cung cấp email): `fail-to-dev` hoặc `needs-human`. Giữ nguyên | Mục "Bị chặn" |
| #9 Kéo thả | Không làm gì, không gắn milestone | Không có `status:*` | (Planning đề xuất tách vì `size:xl`) |

> Số liệu Sprint 1 (lead time, thời gian chờ review) sẽ tính bằng phút hoặc giờ, vì mọi thứ chạy trong một ngày. Khi
> demo, nói trước điều này: số liệu là thật, nhưng của một sprint tập dượt.

Đợi **ít nhất 1 giờ** trước buổi demo. `sla_hours` của repo này đặt bằng 1 giờ, nên `/sprint daily` sẽ có mục "Quá SLA"
thật. Project thật dùng 8–48 giờ.

### 2.5 Thử trước các lệnh Scrum

Chạy một lần `/sprint daily "Sprint 2"`, `/sprint retro "Sprint 1"`, `/sprint plan "Sprint 2"` (ở bước chốt thì **từ chối**,
để lúc demo làm lại). Xem kết quả có hợp lý không; nếu lệch thì báo lại để chỉnh dữ liệu.

---

## Giai đoạn 3 — Buổi demo

### Chuẩn bị 15 phút trước

- [ ] Cửa sổ A: `cd ~/wata-demo && claude`. Cửa sổ B: `cd ~/wata-demo && claude` (session riêng cho review)
- [ ] Terminal C: `npm --prefix apps/web run dev`, mở http://localhost:5173 (xoá dữ liệu cũ: DevTools → Application → Local Storage)
- [ ] Trình duyệt: tab Issues, tab Pull requests của repo, tab website quy trình (sơ đồ ở `docs/agents/process.md` mục 4)
- [ ] `git checkout main && git pull` ở `~/wata-demo`
- [ ] Mở sẵn PR và issue #7 ở một tab (bản dự phòng). Lưu ý: #7 có `NOT READY` ở merge-gate, giống hệt điều sẽ xảy ra với #1

Một người đóng nhiều vai. Mỗi lần đổi vai, nói rõ: "Bây giờ tôi là PO / Tech Lead / QA".

### Demo 1 — Quy trình phát triển (35–45 phút)

```
PO ─G1─▶ triage ─▶ test-design ─G2─▶ implement ─▶ pr-review ─▶ qa ─▶ merge-gate ─G3─G4─▶ uat ─G5─▶ done
(người)   (AI)        (AI)      (người)   (AI)    (AI, session riêng) (AI)   (AI)    (người)   (AI)  (người)
```

| Bước | Thời gian | Bạn làm | Khán giả thấy | Nói gì |
|---|---|---|---|---|
| **1. PO viết yêu cầu** | 3' | Cửa sổ A: `/issue-create Người dùng muốn lọc danh sách công việc theo trạng thái: tất cả, đang làm, đã xong. Lọc rồi mà đánh dấu xong thì việc đó phải biến mất luôn. Tải lại trang thì về Tất cả.` Khi AI hỏi có tạo issue không: **từ chối**, nói "issue này đã có sẵn là #1" | AI hỏi lại chỗ mơ hồ, soạn AC dạng "Khi … thì …" | AC kiểm chứng được là đầu vào cho test, review và UAT |
| **2. G1 + triage** | 3' | GitHub: #1 gắn `status:backlog`. Cửa sổ A: `/triage 1` | Bảng R1–R11, tìm issue trùng, đề xuất `risk:standard`, `## Triage: PASS` | Cổng G1 là của PO; AI chỉ kiểm tra issue đã đủ thông tin chưa (Definition of Ready) |
| **2b. Nhánh: issue mơ hồ** | 2' | #2 gắn `status:backlog`. `/triage 2` | `## Triage: FAIL`: R2, R5 ("đẹp hơn", "nhanh"), R7 (`TBD`); label `status:fail-to-dev` | AI từ chối đoán. PO sửa xong mới làm tiếp |
| **3. Test trước code, duyệt thiết kế, G2** | 7' | `/test-design 1` → `/design-brief brief 1` → `/design-brief approve 1` → `/test-design --approve 1`. Bạn gắn `status:ready-to-dev`, gỡ `status:test-design` | TC-1-1…n theo từng AC, plan AC → file → test, `## UI brief` + `## Design approval: APPROVED`, `## Plan approval` | AI không tự gắn G2. Sửa plan rẻ hơn sửa code |
| **4. Implement** | 6–8' | `/implement 1` | Branch, test viết trước, code `filterTasks`, chạy lint/typecheck/test/build, PR, `## Build write-up` | Write-up chia rõ **đã chạy / chỉ đọc / còn là claim** |
| **5. Review session riêng** | 5' | **Cửa sổ B:** `/pr-review 1` (số issue) | Lượt 1: 9 tiêu chí. Lượt 2: cố bác bỏ write-up. Kết luận PASS/FAIL | Người viết và người review là hai session khác nhau. FAIL → sửa, tối đa 3 vòng, rồi giao người |
| **6. QA** | 5' | Cửa sổ A: `/qa 1` | Viết Playwright theo TC, chạy, phân loại lỗi, `## QA report` | Không bao giờ làm yếu test cho xanh |
| **7–8. G3 + G4** | 4' | `/merge-gate 1`; đọc brief, comment `## G3: OK`; `/merge-gate --merge 1`; bấm Merge (bypass bằng quyền admin) | Refutation brief; `## Merge readiness: NOT READY` **chỉ vì M7** (chưa có Code Owner approve) | Nói: "NOT READY vì thiếu người thứ hai, đúng ý đồ: AI không cho một người tự duyệt rồi tự merge. Project thật có Code Owner khác approve." Chỉ vào khung merge của PR: "Review required" và "Required status check: web". Chỉ admin mới bypass được; token của agent không có quyền này. (Đừng demo `git push origin main`: bạn là admin nên push vẫn qua, chỉ kèm cảnh báo) |
| **9. UAT + G5** | 3' | Gắn `status:uat` (gỡ `status:qa-passed`); `/uat 1`; mở app ở tab C, `/uat --run 1`; gắn `status:done` (gỡ `status:uat`) | Checklist bằng ngôn ngữ người dùng, `## UAT: ACCEPTED` | Chỉ PO đóng việc |
| **Phụ: rủi ro** | 4' | #3: `status:backlog` → `/triage 3`. #4: `status:backlog` → `/triage 4` | #3 được đề xuất `risk:low`, **bỏ G3**. #4 (xoá dữ liệu) được đề xuất `risk:high`, thêm review bảo mật | Mở `docs/agents/risk-tiers.md`: cổng thay đổi theo mức rủi ro |

**Bước nào AI chạy quá 3 phút hoặc đi lệch:** dừng (Esc), mở comment tương ứng của **#7** và nói "đây là kết quả lần
chạy hôm qua".

**Câu hỏi hay gặp:**

| Câu hỏi | Trả lời |
|---|---|
| AI có tự merge không? | Không. Có ba lớp chặn: luật trong `CLAUDE.md`, branch protection, CODEOWNERS. Token của agent không được bypass |
| Lỡ AI code sai? | Review ở session riêng, rồi QA, rồi G3 do người làm. Tối đa 3 vòng tự sửa, sau đó giao người |
| Chạy tự động được không? | Được: workflow `wata-agent` chạy skill khi label đổi (cần GitHub App và secrets, xem `docs/agents/setup-guide.md` mục 3). Repo demo tắt phần này để từng bước diễn ra trước mắt khán giả |
| QA còn làm gì? | Duyệt test case ở G2, chạy case manual/mobile (`/qa --manual`), quyết định ở các chỗ AI phân loại "chưa chắc" |

### Demo 2 — Quản lý Scrum (20–25 phút)

| Sự kiện | Thời gian | Bạn làm | Khán giả thấy | Nói gì |
|---|---|---|---|---|
| **Sprint Planning** | 7' | `/sprint plan "Sprint 2"` (Sprint 2 đã mở; AI đề xuất bổ sung phạm vi) | Số liệu Sprint 1 (lead time, review/ngày, fail-to-dev), **năng lực = min(review, QA, nghiệm thu)**, danh sách đề xuất. Các cờ: #9 `size:xl` (đề xuất tách), #10 `human-code` + `risk:high` | Sprint chỉ chứa được số việc mà người kịp review và QA. Team chốt Sprint Goal; AI tạo milestone **sau khi được đồng ý** (đồng ý luôn trong demo) |
| **Daily** | 5' | `/sprint daily "Sprint 2"` | Việc bị chặn (#10), hàng chờ con người: chờ review #8 (= WIP 1), chờ G2 #5; quá SLA | Daily hỏi "ai đang chặn ai", không còn "hôm qua làm gì" |
| **Sprint Review** | 4' | `/sprint review "Sprint 1"` | Tài liệu demo cho khách bằng ngôn ngữ nghiệp vụ (#6, #7) | Bản cho khách: không tên file, không thuật ngữ |
| **Review feedback** | 3' | `/sprint review feedback "Sprint 1"`, dán: *"Khách muốn số việc còn lại hiện cả ở tiêu đề tab trình duyệt. Khi sửa tên mà bấm ra ngoài ô thì đang mất chữ vừa gõ."* | AI tách thành 1 story mới và 1 bug, soạn AC nháp, **chờ PO đồng ý từng mục** | Phản hồi của khách thành issue ngay trong buổi họp |
| **Retro** | 5' | `/sprint retro "Sprint 1"` | Số liệu so với mục tiêu trong `scrum.md`; lỗi AI lặp lại gom theo nguyên nhân, kèm đề xuất sửa skill, coding standard và mục "Bẫy đã biết" | Retro cải tiến cả người lẫn AI. Đề xuất sửa skill được gửi về repo quy trình trung tâm |
| **Báo cáo** (tuỳ chọn) | 2' | `/sprint report` | Báo cáo tiến độ và chỉ số cho PM | |

---

## Mốc đã chạy sẵn

Điền trong lúc tập dượt (Giai đoạn 2):

| Bước | Issue/PR | Link |
|---|---|---|
| Triage PASS | #7 | |
| Test design + Plan approval | #7 | |
| PR + Build write-up | PR # | |
| Code review | PR # | |
| QA report | #7 | |
| Refutation brief + Merge readiness | #7 | |
| UAT checklist + ACCEPTED | #7 | |
| Review/QA FAIL (nếu có) | #6 | |

---

## Phần 3 — Demo cho lãnh đạo, PM, PO (dự kiến)

Dùng lại repo và dữ liệu này, rút gọn theo người xem:

| Người xem | Nội dung | Lệnh |
|---|---|---|
| PO | Lời nói thành issue chuẩn; G1; triage FAIL; nghiệm thu; phản hồi review thành story | `/issue-create`, `/triage`, `/uat --run`, `/sprint review feedback` |
| PM | Planning theo năng lực, daily theo việc bị chặn, báo cáo chỉ số | `/sprint plan`, `/sprint daily`, `/sprint report` |
| Lãnh đạo | Con người giữ cổng nào, kiểm soát rủi ro, chỉ số đo được | Trang tổng quan (chưa làm) |

---

## Sự cố thường gặp

| Hiện tượng | Cách xử lý |
|---|---|
| `/triage` báo `Unknown command` | Claude Code không mở từ `~/wata-demo`. Thoát, `cd ~/wata-demo && claude` |
| AI hỏi lại quá nhiều | Trả lời "dùng giả định hợp lý, ghi vào Câu hỏi mở" |
| Không merge được vì thiếu approval | Bạn là tác giả PR nên không tự approve được. Tích "Merge without waiting for requirements to be met (bypass)" (bạn là admin) |
| CI chưa xanh khi merge-gate | Đợi job `ci / web` xong (khoảng 40 giây), rồi chạy lại `/merge-gate --merge` |
| `npm run e2e` treo khi tải trình duyệt | `npx --prefix apps/web playwright install chromium`; repo dùng Playwright 1.65.0 |
| AI sai trước khán giả | Không sao. Đó là ví dụ tốt nhất cho việc vì sao cần cổng người |

## Dựng lại từ đầu

```bash
python3 -I demo/seed/seed.py phoenixit99/wata-demo           # tạo lại issue mẫu, bỏ qua issue đã có
python3 -I demo/seed/seed.py phoenixit99/wata-demo --only 1  # chỉ issue Demo 1
```
Để có repo sạch hoàn toàn: tạo repo mới, chạy `bootstrap.sh` của quy trình, copy `apps/` và `demo/`, rồi chạy `seed.py`.
