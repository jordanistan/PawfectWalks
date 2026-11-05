#!/usr/bin/env python3
"""Check public contact links and guard against personal-address exposure."""

from __future__ import annotations
import argparse
from pathlib import Path
import re

APPROVED_RECIPIENT = "hello@pawsfectwalks.com"
REQUIRED = (
    "Client waiting list request",
    "Request an Interview",
    "Send the email",
)
PROHIBITED = (
    "jordan.robison@gmail.com",
    "formspree",
    "XMLHttpRequest",
    "checkout",
    "booking confirmed",
)
EMAIL = re.compile(r"[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
MAILTO = re.compile(r"mailto:([A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})", re.IGNORECASE)

class InquiryError(RuntimeError):
    """Unexpected public contact path or email."""

def inspect(bundle: str) -> None:
    for marker in REQUIRED:
        if marker.casefold() not in bundle.casefold():
            raise InquiryError(f"missing contact flow: {marker}")
    for marker in PROHIBITED:
        if marker.casefold() in bundle.casefold():
            raise InquiryError(f"prohibited contact text: {marker}")
    recipients = {email.casefold() for email in MAILTO.findall(bundle)}
    if recipients != {APPROVED_RECIPIENT}:
        raise InquiryError(f"unexpected mailto recipient inventory: {sorted(recipients)}")
    addresses = {email.casefold() for email in EMAIL.findall(bundle)}
    if addresses - {APPROVED_RECIPIENT, "you@example.com"}:
        raise InquiryError(f"unexpected public email inventory: {sorted(addresses)}")

def verify_dist(dist: Path) -> None:
    scripts = sorted((dist / "assets").glob("index-*.js"))
    if len(scripts) != 1:
        raise InquiryError("missing or multiple compiled JS assets")
    inspect(scripts[0].read_text(encoding="utf-8", errors="strict"))

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dist", type=Path, default=Path("dist"))
    args = parser.parse_args()
    verify_dist(args.dist)
    print("Pawsfect business inbox-only inquiry paths verified")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
