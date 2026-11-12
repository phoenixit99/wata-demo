#!/usr/bin/env python3
"""Tạo issue mẫu cho repo demo từ demo/seed/issues/*.md.

    python3 -I demo/seed/seed.py <owner>/<repo> [--only 1|2] [--dry-run]

Mỗi file: các dòng `khoá: giá trị` (title, labels, demo), dòng `---`, rồi thân issue.
Issue đã có tiêu đề trùng (mở hoặc đóng) thì bỏ qua, nên chạy lại nhiều lần không sinh trùng.
Script KHÔNG gắn label status:* — gắn status:backlog là cổng G1 của PO, làm trực tiếp trong buổi demo.
"""
import json
import pathlib
import subprocess
import sys

ASSIGNEE = "phoenixit99"  # R1: issue phải có assignee. Đổi nếu dùng tài khoản khác.


def gh(*args: str) -> str:
    return subprocess.run(["gh", *args], check=True, capture_output=True, text=True).stdout


def parse(path: pathlib.Path) -> dict:
    head, body = path.read_text(encoding="utf-8").split("\n---\n", 1)
    meta = dict(line.split(": ", 1) for line in head.splitlines() if ": " in line)
    meta["labels"] = [x.strip() for x in meta.get("labels", "").split(",") if x.strip()]
    meta["body"] = body.strip() + "\n"
    return meta


def main() -> None:
    args = sys.argv[1:]
    if not args or args[0].startswith("-"):
        sys.exit(__doc__)
    repo, dry = args[0], "--dry-run" in args
    only = args[args.index("--only") + 1] if "--only" in args else None

    existing = {i["title"] for i in json.loads(
        gh("issue", "list", "-R", repo, "--state", "all", "--limit", "500", "--json", "title"))}

    for path in sorted((pathlib.Path(__file__).parent / "issues").glob("*.md")):
        meta = parse(path)
        if only and not meta.get("demo", "").startswith(only):
            continue
        if meta["title"] in existing:
            print(f"  = đã có: {meta['title']}")
            continue
        if dry:
            print(f"  + (thử) {meta['title']}  [{', '.join(meta['labels'])}]")
            continue
        cmd = ["issue", "create", "-R", repo, "--title", meta["title"], "--body", meta["body"],
               "--assignee", ASSIGNEE]
        for label in meta["labels"]:
            cmd += ["--label", label]
        url = gh(*cmd).strip()
        print(f"  + {url}  {meta['title']}")


if __name__ == "__main__":
    main()
