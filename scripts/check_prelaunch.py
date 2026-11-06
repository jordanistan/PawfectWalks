#!/usr/bin/env python3
"""Fail closed when the built public artifact crosses the pre-launch boundary."""

from __future__ import annotations

import argparse
from pathlib import Path
import re


EXPECTED_TITLE = "Pawsfect Walks | Austin Pre-launch Waitlist"
EXPECTED_DESCRIPTION = (
    "Pawsfect Walks is a pre-launch Austin dog-care concept. Join the waitlist; "
    "no booking, paid care, or recruiting is available."
)
REQUIRED = (
    "Join the Waitlist",
    "Pre-launch",
    "Submitting this waitlist request does not create a booking.",
    "Paid care is not available yet.",
    "Recruiting is not open.",
    "Do not send addresses, access codes, payment details, IDs, or medical records.",
)
PROHIBITED = (
    "Hiring now",
    "Apply in minutes",
    "Walk dogs, get paid",
    "Get paid to walk dogs",
    "We bring the bookings",
    "Apply by email",
    "Tell us about yourself",
    "government-issued state ID",
    "Dog Sitting",
    "sitting services",
    "Austin, TX and surrounding areas",
    "Central & Downtown",
    "South Austin",
    "East Austin",
    "North Austin",
    "pickup to return",
    "any special needs",
)
COMMERCE = re.compile(
    r"(?:\$[1-9]\d{1,3}(?:\.\d{2})?|\bper (?:hour|walk)\b|Book now|Booking confirmed|Checkout|Stripe|coverage active|care is available now)",
    re.IGNORECASE,
)
RECRUITING = re.compile(
    r"(?:\bapply\s+(?:now|by email|for|to)\b|(?:\b|%20)applications?\b|\bcareers?\b|"
    r"\b(?:send|upload)\s+(?:(?:a|your)\s+)?resume\b|\bcandidates?\b|\bhiring\b|become a walker)",
    re.IGNORECASE,
)


class BoundaryError(RuntimeError):
    """The artifact is not a truthful waitlist-only public surface."""


def inspect(html: str, bundle: str) -> None:
    expected_meta = (
        f'<meta name="description" content="{EXPECTED_DESCRIPTION}" />',
        f'<meta property="og:title" content="{EXPECTED_TITLE}" />',
        f'<meta property="og:description" content="{EXPECTED_DESCRIPTION}" />',
        f"<title>{EXPECTED_TITLE}</title>",
        '<link rel="canonical" href="https://pawsfectwalks.com/" />',
    )
    for marker in expected_meta:
        if marker not in html:
            raise BoundaryError(f"missing exact metadata: {marker}")

    normalized = " ".join(bundle.split())
    folded = normalized.casefold()
    for marker in REQUIRED:
        if " ".join(marker.split()).casefold() not in folded:
            raise BoundaryError(f"missing required boundary: {marker}")
    for marker in PROHIBITED:
        if " ".join(marker.split()).casefold() in folded:
            raise BoundaryError(f"prohibited public claim: {marker}")
    if match := COMMERCE.search(normalized):
        raise BoundaryError(f"review-required commerce claim: {match.group(0)}")

    recruiting_text = folded
    for approved_negative in (
        "recruiting is not open.",
        "no booking, paid care, or recruiting is available.",
    ):
        recruiting_text = recruiting_text.replace(approved_negative, "")
    if match := RECRUITING.search(recruiting_text):
        raise BoundaryError(f"prohibited staffing claim: {match.group(0)}")


def verify_dist(dist: Path) -> None:
    if not dist.is_dir():
        raise BoundaryError(f"missing build directory: {dist}")
    html_path = dist / "index.html"
    scripts = sorted((dist / "assets").glob("index-*.js"))
    if not html_path.is_file() or len(scripts) != 1:
        raise BoundaryError("expected one index.html and exactly one hashed JavaScript bundle")
    inspect(
        html_path.read_text(encoding="utf-8", errors="strict"),
        scripts[0].read_text(encoding="utf-8", errors="strict"),
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dist", type=Path, default=Path("dist"))
    args = parser.parse_args()
    verify_dist(args.dist)
    print("Pawsfect pre-launch boundary verified")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
