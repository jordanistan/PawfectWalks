#!/usr/bin/env python3
"""Check public marketing copy without exposing internal readiness details."""

from __future__ import annotations
import argparse
from pathlib import Path
import re

EXPECTED_TITLE = "Pawsfect Walks | Thoughtful Dog Walking in Austin"
EXPECTED_DESCRIPTION = (
    "Discover attentive dog walking and drop-in care in Austin. "
    "Join the client waiting list or ask about walker opportunities."
)
REQUIRED = (
    "Join the Client Waiting List",
    "Dog Walker",
    "Project Manager",
    "Request an Interview",
    "Send My Waiting List Request",
)
PROHIBITED = (
    "jordan.robison@gmail.com",
    "pilot boundary pending",
    "launch status",
    "insurance and the handling",
    "paid care is not available yet",
    "recruiting is not open",
    "building the foundation before offering care",
    "start with interest, not a reservation",
    "pre-launch concept",
)
UNSUPPORTED = re.compile(
    r"(?:booking confirmed|pay now|coverage active|fully insured|licensed and bonded|"
    r"guaranteed availability|hiring immediately)",
    re.IGNORECASE,
)

class BoundaryError(RuntimeError):
    """Public copy violates privacy, professionalism, or truthfulness checks."""

def inspect(html: str, bundle: str) -> None:
    for marker in (
        f'<meta name="description" content="{EXPECTED_DESCRIPTION}" />',
        f'<meta property="og:title" content="{EXPECTED_TITLE}" />',
        f'<meta property="og:description" content="{EXPECTED_DESCRIPTION}" />',
        f"<title>{EXPECTED_TITLE}</title>",
        '<link rel="canonical" href="https://pawsfectwalks.com/" />',
    ):
        if marker not in html:
            raise BoundaryError(f"missing page metadata: {marker}")
    normalized = " ".join(bundle.split()).casefold()
    for marker in REQUIRED:
        if marker.casefold() not in normalized:
            raise BoundaryError(f"missing customer or walker path: {marker}")
    for marker in PROHIBITED:
        if marker.casefold() in normalized or marker.casefold() in html.casefold():
            raise BoundaryError(f"prohibited personal/internal public text: {marker}")
    if match := UNSUPPORTED.search(bundle):
        raise BoundaryError(f"unsupported claim: {match.group(0)}")

def verify_dist(dist: Path) -> None:
    html_path = dist / "index.html"
    scripts = sorted((dist / "assets").glob("index-*.js"))
    if not html_path.is_file() or len(scripts) != 1:
        raise BoundaryError("expected built page and one compiled script")
    inspect(
        html_path.read_text(encoding="utf-8", errors="strict"),
        scripts[0].read_text(encoding="utf-8", errors="strict"),
    )

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dist", type=Path, default=Path("dist"))
    args = parser.parse_args()
    verify_dist(args.dist)
    print("Pawsfect public privacy and marketing checks passed")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
