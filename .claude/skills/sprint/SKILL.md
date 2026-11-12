---
name: sprint
description: "Các sự kiện Scrum và báo cáo của quy trình WATA, một lệnh với lệnh con: plan (Sprint Planning theo năng lực review/QA), daily (bảng việc bị chặn và hàng chờ), review (tài liệu demo, phản hồi thành story), retro (số liệu, lỗi AI lặp lại thành đề xuất sửa skill), report (báo cáo tiến độ và chỉ số), release (kế hoạch release). Chỉ chạy tương tác. Dùng khi \"sprint planning\", \"daily\", \"sprint review\", \"retro\", \"báo cáo tiến độ\", \"kế hoạch release\"."
---

# sprint — sự kiện Scrum và báo cáo

> **Vai trò:** PO, PM, Tech Lead, AI Enablement · **Bước:** planning, daily, review, retro · **Chế độ:** tương tác · **Kích hoạt:** người gọi · **Đọc:** `## Refinement notes`, `## Needs human`, `## UAT: ACCEPTED`, `## Build write-up`, `## Code review: FAIL`, `## QA report: FAIL`, `## UAT: REJECTED`, `## Merge readiness: READY`, `## UAT checklist` · **Ghi:** không ghi lên issue

`$ARGUMENTS`: `<lệnh con> [đối số của lệnh con]`. Lệnh con: `plan`, `daily`, `review`, `retro`, `report`, `release`.

**Đọc `docs/agents/contract.md` trước.**

| Gọi | Việc | Chế độ chạy | Ghi |
|---|---|---|---|
| `/sprint plan` | lập kế hoạch sprint theo năng lực review/QA | tương tác | không ghi lên issue |
| `/sprint daily` | bảng cho buổi daily 15 phút | tương tác | không ghi lên issue |
| `/sprint review` | demo và phản hồi | tương tác | không ghi lên issue |
| `/sprint retro` | cải tiến người và AI | tương tác | không ghi lên issue |
| `/sprint report` | báo cáo cho PM | tương tác | không ghi lên issue |
| `/sprint release` | kế hoạch release | tương tác | không ghi lên issue |

## Luật

- Chỉ chạy tương tác; không có chế độ `--auto`. Gọi không kèm lệnh con: hỏi người chạy muốn sự kiện nào.
- Mỗi lệnh con giữ luật riêng của nó (mục "Luật" trong phần của lệnh con đó).

## `/sprint plan`: lập kế hoạch sprint theo năng lực review/QA

`$ARGUMENTS` (sau `plan`): `<tên milestone sprint>` (tạo mới nếu chưa có, khi được đồng ý) `[--days 10]`.

**Đọc `docs/agents/contract.md` và `docs/agents/scrum.md` (mục Sprint Planning, Ước lượng) trước.** Cả
team chốt Sprint Goal và phạm vi; AI cung cấp số liệu và đề xuất.

### Bước 1: Số liệu (chỉ đọc)

Từ 2–3 sprint gần nhất (milestone đã đóng) hoặc 30 ngày gần nhất:

| Số liệu | Cách tính |
|---|---|
| PR review được mỗi người/ngày | PR có `## Code review` / approval theo người duyệt cuối, chia số ngày |
| Story nghiệm thu được mỗi sprint | Issue nhận `status:done` |
| Story mỗi size đã hoàn thành | Theo `size:*` |
| Lead time | `ready-to-dev` → `qa-passed` |
| Thời gian chờ review | PR mở → approval cuối |
| Tỉ lệ fail-to-dev | `## Triage: FAIL` / tổng triage |

Không đủ dữ liệu (sprint đầu): ghi rõ và dùng giả định team đưa ra; không bịa số.

### Bước 2: Năng lực sprint

- Năng lực review = số người review × PR/người/ngày × số ngày review thực tế (trừ nghỉ, sự kiện).
- Năng lực QA/nghiệm thu = case manual/mobile QA làm được + story PO nghiệm thu được.
- **Năng lực sprint = giá trị nhỏ nhất** giữa review, QA và nghiệm thu, quy về size theo số liệu Bước 1.
- Giữ dư 10–20% cho việc phát sinh (bug production, hotfix) theo chính sách gián đoạn trong `scrum.md`.

### Bước 3: Đề xuất phạm vi

1. Ứng viên: story `status:ready-to-dev`, hoặc `status:test-design` đã qua refinement và (nếu có UI) có kế
   hoạch duyệt thiết kế trong 1–2 ngày đầu sprint.
2. Sắp theo `priority:*`, rồi phụ thuộc, rồi tuổi. Cộng dồn tới năng lực.
3. Đánh dấu: story `human-code` (cần ai code), story UI cần duyệt thiết kế, story `size:xl` (đề xuất tách),
   story nhỏ cùng vùng code (gợi ý gom).

```markdown
# Đề xuất Sprint <tên> (<ngày bắt đầu> – <ngày kết thúc>)

Sprint Goal (đề xuất): <...>
Năng lực: review <n> PR · QA <n> case · nghiệm thu <n> story → khoảng <n> story cỡ M

| # | Story | Size | Priority | Cờ | Ghi chú |
|---|---|---|---|---|---|

Ngoài sprint (vượt năng lực): ...
Giả định: ...
```

### Bước 4: Chốt

- Team thảo luận, sửa danh sách, chốt Sprint Goal. **Chờ đồng ý.**
- Khi đồng ý: tạo milestone (nếu chưa có) với Sprint Goal trong mô tả và ngày kết thúc; gắn milestone cho
  các story đã chốt.
  ```bash
  gh api repos/{owner}/{repo}/milestones -f title="<tên>" -f due_on="<ISO>" -f description="<Sprint Goal>"
  gh issue edit <n> --milestone "<tên>"
  ```
- Không đổi label `status:*`, không gắn `status:ready-to-dev` (cổng G2 vẫn là của người).

### Luật

- Lập kế hoạch theo năng lực review/QA/nghiệm thu, không theo tốc độ AI viết code.
- Không tự quyết phạm vi; đề xuất kèm lý do.

## `/sprint daily`: bảng cho buổi daily 15 phút

`$ARGUMENTS` (sau `daily`): `[tên milestone sprint]` (mặc định milestone đang mở có hạn gần nhất).

**Đọc `docs/agents/contract.md` trước.** Skill chỉ đọc. Buổi họp tập trung vào **việc bị chặn**; tiến độ
bình thường đã có trên label.

### Thu thập (chỉ đọc)

```bash
gh issue list --state all --milestone "<sprint>" --json number,title,labels,assignees,state,updatedAt
```
Đọc `limits`, `sla_hours`, `sprint.review_slots` trong `.claude/project.yml`; comment `## Needs human` mới
nhất của các issue bị chặn.

### Bảng

```markdown
# Daily — <sprint> — <ngày> (ngày <n>/<tổng>)

## Bị chặn (bàn trong buổi họp)
| # | Trạng thái | Từ bao giờ | Cần ai | Việc cần làm |
|---|---|---|---|---|

## Hàng chờ con người
| Hàng chờ | Số issue | Giới hạn | Ghi chú |
|---|---|---|---|
| Chờ review (in-review) | n | wip_in_review | khung giờ review hôm nay: 10:00, 15:00 |
| Chờ QA (qa) | n | wip_qa | case manual còn chờ |
| Chờ duyệt plan (G2) | n | — | |
| Chờ G3/G4 (qa-passed) | n | — | |
| Chờ UAT | n | — | |

## Quá SLA
## Tiến độ Sprint Goal
<done / tổng; story có nguy cơ trễ và vì sao>

---
Nguồn: GitHub đến <thời điểm>.
```

Đưa cho PM trong chat. Không đăng lên issue, không nhắc ai (việc nhắc do `wata-sla-reminder` và PM).

### Luật

- Chỉ đọc. Không đổi label, không phân công thay PM.
- Ghi rõ dữ liệu không lấy được (API lỗi, milestone thiếu); không đoán.

## `/sprint review`: demo và phản hồi

`$ARGUMENTS` (sau `review`): `[tên milestone sprint]` hoặc `feedback [tên milestone]` (sau buổi review).

**Đọc `docs/agents/contract.md` trước.** Người đọc tài liệu demo là **PO và khách hàng**: ngôn ngữ
nghiệp vụ, không tên file hay thuật ngữ kỹ thuật.

### Phần A: Tài liệu demo (chỉ đọc)

1. Story trong milestone: đã nghiệm thu (`## UAT: ACCEPTED`), đang UAT, chưa xong.
2. Với story đã xong: AC viết lại thành **kịch bản demo** (làm gì → thấy gì), môi trường staging, dữ liệu
   demo cần chuẩn bị.
3. Tóm tắt thay đổi theo sprint từ `## Build write-up` (bỏ chi tiết kỹ thuật).

```markdown
# Sprint Review — <sprint>

Sprint Goal: <...> · Kết quả: <đạt / một phần — vì sao>

## Đã hoàn thành
| Tính năng | Kịch bản demo | Ghi chú |
|---|---|---|
## Chưa hoàn thành và lý do
## Cần khách hàng quyết định
## Dữ liệu/tài khoản demo cần chuẩn bị
```
Đưa cho PO trong chat; lưu `reports/sprint-review-<sprint>.md` khi PO đồng ý.

### Phần B: Phản hồi thành story (sau buổi review)

1. PO dán ghi chú hoặc biên bản buổi review.
2. Tách từng phản hồi: lỗi so với AC (→ bug), yêu cầu mới (→ story), thay đổi ưu tiên (→ việc của PO).
3. Với mỗi lỗi/yêu cầu: đề xuất tiêu đề, mô tả, AC nháp. **Chờ PO đồng ý từng mục**, rồi tạo bằng
   `issue-create` (không gắn `status:*`; PO gắn `status:backlog` là cổng G1).

### Luật

- Không trình bày story chưa nghiệm thu như đã xong.
- Không tạo issue khi PO chưa đồng ý. Không tự đổi ưu tiên.

## `/sprint retro`: cải tiến người và AI

`$ARGUMENTS` (sau `retro`): `[tên milestone sprint]`.

**Đọc `docs/agents/contract.md` và `docs/agents/process.md` mục 11 (chỉ số) trước.** Cả team chọn hành
động; AI tổng hợp và soạn đề xuất.

### Bước 1: Số liệu sprint (chỉ đọc)

Như `sprint report` (`.claude/skills/sprint/SKILL.md`, Bước 1–2), giới hạn trong milestone. So với
mục tiêu tham khảo trong `scrum.md`: lead time, thời gian chờ review, tỉ lệ fail-to-dev, đạt review vòng 1,
độ phủ AC bằng automation, lỗi lọt, chi phí AI mỗi story.

### Bước 2: Lỗi AI lặp lại

Đọc mọi `## Code review: FAIL`, `## QA report: FAIL`, `## UAT: REJECTED`, `## Needs human`, comment
`## Code review: FAIL` của người ở G3 trong sprint. Gom theo **nguyên nhân**, không theo issue:

| Nguyên nhân | Số lần | Issue | Loại |
|---|---|---|---|
| Ví dụ: thiếu trạng thái rỗng trên màn hình danh sách | 3 | #.., #.. | coding standard |

Loại: skill (cách AI làm một bước) · coding standard · DoR/AC (yêu cầu đầu vào) · design system · môi
trường/dữ liệu test · khác.

### Bước 3: Hành động

**Mỗi nguyên nhân lặp lại ≥ 2 lần phải có một hành động.** Với từng cái, soạn sẵn:
- Skill hoặc tài liệu chung (thuộc lõi) → bản nháp đoạn sửa + nội dung **issue cho repo quy trình trung tâm**
  `phoenixit99/wata-ai-process` (tiêu đề, bằng chứng, đề xuất sửa).
- Coding standard, `CLAUDE.md` "Bẫy đã biết", design system (thuộc project) → bản nháp đoạn sửa trong repo
  project.
- DoR/AC → đề xuất cho PO/BA.

```markdown
# Retro — <sprint>

## Số liệu so với mục tiêu
## Lỗi AI lặp lại
## Hành động đề xuất
| Hành động | Loại | Người chịu trách nhiệm | Bản nháp |
|---|---|---|---|
## Điều làm tốt (giữ lại)
```

### Bước 4: Ghi

- Đưa cho team trong chat. Khi team chọn hành động: tạo issue trên repo trung tâm hoặc mở PR sửa
  coding standard/`CLAUDE.md` trong project — **mỗi lần ghi cần đồng ý**.
- Không tự sửa skill đang dùng trong project (`.claude/skills/`): skill thuộc lõi, sửa ở repo trung tâm rồi
  nâng phiên bản.

### Luật

- Gom theo nguyên nhân, nêu bằng chứng (số issue). Không đổ lỗi cho người.
- Không bịa số; chỉ số không tính được thì ghi lý do.

## `/sprint report`: báo cáo cho PM

`$ARGUMENTS` (sau `report`): `[số ngày, mặc định 7] [--client]`. `--client`: bản gửi khách hàng (ít chi tiết nội bộ).

**Đọc `docs/agents/contract.md` (mục 1, 2) và `docs/agents/process.md` mục 11 (chỉ số).** Skill chỉ đọc;
kết quả đưa cho PM, không tự đăng.

### Bước 1: Thu thập (chỉ đọc)

```bash
gh issue list --state all --limit 500 --search "updated:>=<ngày bắt đầu>" \
  --json number,title,labels,state,createdAt,closedAt,assignees
gh api repos/{owner}/{repo}/issues/<n>/timeline --paginate   # thời điểm từng label status:*
gh api repos/{owner}/{repo}/issues/<n>/comments --paginate   # heading kết quả từng bước
```
Đọc `sla_hours` và `limits` trong `.claude/project.yml`.

### Bước 2: Tính

| Chỉ số | Cách tính |
|---|---|
| Đang mở theo trạng thái | Đếm theo label `status:*` |
| Hoàn thành trong kỳ | Issue nhận `status:done` trong kỳ |
| Lead time | `ready-to-dev` → `qa-passed`, trung vị và lớn nhất |
| Thời gian chờ con người | Tổng giờ ở `fail-to-dev`, `test-design` sau `## Test design: PASS`, `needs-human`, `qa-passed`, `uat` |
| Quá SLA | Issue đang ở hàng chờ con người lâu hơn `sla_hours` |
| Tỉ lệ fail-to-dev | `## Triage: FAIL` / tổng triage |
| Đạt review vòng 1 | Issue có `## Code review: PASS` mà không có FAIL trước đó |
| Needs human | Số lần và lý do (tóm tắt từ comment `## Needs human`) |
| UAT rejected | `## UAT: REJECTED` / tổng UAT |

Ghi rõ chỉ số nào không tính được và vì sao (thiếu dữ liệu, quá ít mẫu). **Không ước lượng thay số đo.**

### Bước 3: Soạn

```markdown
# Báo cáo tiến độ <project> — <từ ngày> đến <đến ngày>

## Tóm tắt
<3 dòng: hoàn thành gì, kẹt ở đâu, rủi ro chính>

## Hoàn thành
| # | Tiêu đề | Hoàn thành |
## Đang làm
<bảng theo trạng thái>
## Kẹt và quá SLA
| # | Trạng thái | Bao lâu | Cần ai | Việc cần làm |
## Chỉ số
<bảng chỉ số, so với kỳ trước nếu có>
## Rủi ro và đề xuất
<mỗi rủi ro: ảnh hưởng, đề xuất, người quyết>

---
Nguồn: GitHub issues/timeline đến <thời điểm>. Không tính được: <...>
```

Bản `--client`: bỏ chỉ số nội bộ của AI (vòng sửa, needs-human), giữ hoàn thành, đang làm, rủi ro
ảnh hưởng tiến độ, việc cần khách hàng quyết định.

### Bước 4: Giao

Đưa báo cáo cho PM trong chat hoặc lưu file (`reports/<yyyy-mm-dd>.md` khi PM đồng ý). Không đăng
lên issue, không gửi ra ngoài.

### Luật

- Chỉ đọc. Không đăng lên issue, không đổi label, không gửi báo cáo ra ngoài.
- Không ước lượng thay số đo; chỉ số không tính được thì ghi rõ lý do.

## `/sprint release`: kế hoạch release

`$ARGUMENTS` (sau `release`): `<tên milestone>` hoặc trống (lấy mọi issue `status:qa-passed` và `status:uat`).

**Đọc `docs/agents/contract.md` trước.** Skill chỉ đọc.

### Bước 1: Thu thập (chỉ đọc)

```bash
gh issue list --state all --milestone "<milestone>" --json number,title,labels,state,assignees
gh issue list --state open --label status:qa-passed --json number,title,labels
gh issue list --state open --label status:uat --json number,title,labels
```
Với mỗi issue: trạng thái, `risk:*`, PR (đã merge chưa), `## Merge readiness` mới nhất, mục "Còn nợ
trước release" trong `## Build write-up`, `## UAT:` nếu có.

### Bước 2: Phân loại

| Nhóm | Điều kiện |
|---|---|
| Sẵn sàng | Đã merge và `## UAT: ACCEPTED`, hoặc `## Merge readiness: READY` |
| Gần xong | `status:qa-passed` chưa có G3/G4; `status:uat` chưa nghiệm thu |
| Chặn | `needs-human`, `qa-failed`, `uat-failed`, `blocked`, hoặc phụ thuộc issue chưa xong |
| Ngoài release | Chưa tới QA |

### Bước 3: Việc trước release

Gom từ write-up: migration (thứ tự, có chạy lại an toàn không), biến môi trường, cấu hình, feature
flag, index, dữ liệu cần chuẩn bị, thay đổi contract ảnh hưởng app mobile (bản app tối thiểu). Mỗi việc
một người chịu trách nhiệm (hỏi PM nếu chưa rõ).

### Bước 4: Soạn kế hoạch

```markdown
# Kế hoạch release <milestone> — <ngày dự kiến>

## Tóm tắt
<gồm gì, rủi ro chính, quyết định cần PM/PO>

## Phạm vi
| # | Tiêu đề | Nhóm | Risk | Còn thiếu gì | Ai |
## Việc trước release
| Việc | Issue | Ai | Khi nào |
## Thứ tự merge / deploy
## Lịch UAT
## Rollback
<với mỗi issue risk:high: cách hoàn tác (revert, tắt flag, migration ngược)>
## Rủi ro và quyết định cần có

---
Nguồn: GitHub đến <thời điểm>. Chưa xác minh: <...>
```

### Bước 5: Giao

Đưa PM trong chat; lưu `reports/release-<milestone>.md` khi PM đồng ý. Không đăng lên issue, không
đổi label, không gửi ra ngoài.

### Luật

- Không quyết phạm vi release thay PM/PO; nêu đề xuất và lý do.
- Không merge, không deploy.
