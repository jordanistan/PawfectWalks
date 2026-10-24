#!/usr/bin/env python3
"""Verify the built waitlist uses only the reviewed email handoff."""

from __future__ import annotations

import argparse
from pathlib import Path
import re


APPROVED_RECIPIENT = "jordan.robison@gmail.com"
UNCONFIGURED_ALIAS = "hello@pawsfectwalks.com"
REQUIRED = (
    "Waitlist request",
    "Partnership%20inquiry",
    "General interest:",
    "Do not send addresses, access codes, payment details, IDs, or medical records.",
    "Submitting opens your email app; this site does not store the form.",
)
PROHIBITED = (
    UNCONFIGURED_ALIAS,
    "formspree",
    "netlify",
    "XMLHttpRequest",
    "localStorage",
    "sessionStorage",
    "checkout",
    "booking confirmed",
)
EMAIL = re.compile(r"[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
MAILTO = re.compile(r"mailto:([A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})", re.IGNORECASE)


class InquiryError(RuntimeError):
    """The built artifact crossed the reviewed inquiry boundary."""


def inspect(bundle: str) -> None:
    for marker in REQUIRED:
        if marker not in bundle:
            raise InquiryError(f"missing inquiry boundary: {marker}")
    for marker in PROHIBITED:
        if marker.casefold() in bundle.casefold():
            raise InquiryError(f"prohibited inquiry marker: {marker}")

    addresses = {address.casefold() for address in EMAIL.findall(bundle)}
    allowed_addresses = {APPROVED_RECIPIENT, "john@example.com"}
    if addresses != allowed_addresses:
        raise InquiryError(f"unexpected public email inventory: {sorted(addresses)}")
    recipients = [recipient.casefold() for recipient in MAILTO.findall(bundle)]
    if len(recipients) < 3 or set(recipients) != {APPROVED_RECIPIENT}:
        raise InquiryError("every mailto must use the reviewed recipient")


def verify_dist(dist: Path) -> None:
    scripts = sorted((dist / "assets").glob("index-*.js"))
    if not (dist / "index.html").is_file() or len(scripts) != 1:
        raise InquiryError("expected one index.html and exactly one hashed JavaScript bundle")
    inspect(scripts[0].read_text(encoding="utf-8", errors="strict"))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dist", type=Path, default=Path("dist"))
    args = parser.parse_args()
    verify_dist(args.dist)
    print("Pawsfect inquiry handoff verified")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
