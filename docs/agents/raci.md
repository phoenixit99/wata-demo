# RACI theo trạng thái

**R** làm · **A** chịu trách nhiệm cuối (ký) · **C** được hỏi ý kiến · **I** được báo.
SLA là **đề xuất**; team chốt trong `.claude/project.yml` → `sla_hours`.

| Trạng thái / bước | AI | PO | BA | PM | Designer | Dev | Tech Lead | QA | SLA đề xuất |
|---|---|---|---|---|---|---|---|---|---|
| Bước 0: phân tích feature (`type:epic`) | R | A | R | I | C | C | A | I | — |
| Bước 1: tạo issue, **G1** | R (soạn) | A | R | I | C | — | — | — | — |
| `status:backlog` → triage | R | I | I | — | — | — | C (risk) | — | tự động |
| `status:fail-to-dev` | — | A/R | R | I | — | — | — | — | 24 giờ |
| `status:blocked` | — | I | — | A (gỡ chặn) | — | C | C | — | — |
| Refinement (`refine --batch`) | R (triage, size nháp) | A | R | I | C | C | R | C | 20–25% sprint |
| Duyệt thiết kế UI (`design-brief`) | R (brief) | C | I | I | A | — | — | — | 1–2 ngày đầu sprint |
| `status:test-design` → test design | R | I | C | — | — | C | C | C | tự động |
| **G2**: duyệt plan + test case (`test-design --approve`) | — | I | — | I | — | R (plan) | A | R (test case) | 8 giờ |
| `status:in-progress` → code | R | — | — | — | C (UI) | C | I | — | tự động |
| `status:in-review` → review | R | — | — | — | R (`pr-review --design`) | I | I | — | tự động |
| `status:qa` → QA | R (auto) | — | — | I | — | — | — | R/A (manual, mobile: `qa --manual`) | 24 giờ cho manual |
| `status:qa-failed` | — | I | — | I | — | R | A | C | 8 giờ |
| `status:needs-human` | — | C (sản phẩm) | C | A (escalate) | C | R | R | — | 8 giờ |
| PR chờ người duyệt (CODEOWNERS; đo trên PR, không phải status) | R (review vòng 1) | — | — | I | C (UI) | R | A/R | — | 8 giờ (`review`) |
| **G3**: refutation | R (brief) | — | — | — | — | — | A/R | — | 8 giờ (gộp G4) |
| **G4**: merge | R (kiểm tra) | — | — | I | — | — | A/R | — | 8 giờ (gộp G3) |
| `status:uat`, **G5** (`uat --run`) | R (checklist) | A/R | C | I | C | — | — | C | 48 giờ |
| `status:uat-failed` | — | I | — | I | — | R | A | — | 8 giờ |
| Hotfix | R | I | — | I | — | R | A | R (smoke) | theo mức độ |
| Kế hoạch release (`sprint release`) | R (soạn) | C | — | A | — | — | R | I | mỗi release |
| Báo cáo tiến độ (`sprint report`) | R (soạn) | I | — | A | — | — | I | — | hằng tuần |
| Thay đổi quy trình | — | C | C | C | C | C | C | C | Process owner: A |

**AI Enablement** (Tech Lead và PO cùng kiêm nhiệm) chịu trách nhiệm (A) cho skill, cấu hình MCP và hành động sửa lỗi AI lặp lại sau retro. **Security** được hỏi ý kiến (C) ở G2/G3 cho story `risk:high` và ký duyệt quyền truy cập ở Sprint 0. **Khách hàng** chọn phương án UI và cùng PO nghiệm thu. RACI theo giai đoạn sprint ở [Quy trình Scrum mục 3.1](scrum.md).

## Kiêm nhiệm

Một người giữ nhiều vai trò được, với hai giới hạn:

1. Không tự ký hai cổng liên tiếp cho cùng một issue (G1 rồi G2; G2 rồi G3).
2. Issue `risk:high`: người làm G3 khác người merge (G4).
