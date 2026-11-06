#!/usr/bin/env python3
"""Deterministic tests for the built-artifact pre-launch policy."""

import tempfile
from pathlib import Path
import unittest

from scripts.check_prelaunch import (
    BoundaryError,
    EXPECTED_DESCRIPTION,
    EXPECTED_TITLE,
    PROHIBITED,
    REQUIRED,
    inspect,
    verify_dist,
)


def valid_html() -> str:
    return f'''<!doctype html>
<link rel="canonical" href="https://pawsfectwalks.com/" />
<meta property="og:title" content="{EXPECTED_TITLE}" />
<meta property="og:description" content="{EXPECTED_DESCRIPTION}" />
<meta name="description" content="{EXPECTED_DESCRIPTION}" />
<title>{EXPECTED_TITLE}</title>'''


def valid_bundle() -> str:
    return ";".join(REQUIRED)


class PolicyTests(unittest.TestCase):
    def test_safe_fixture_passes(self) -> None:
        inspect(valid_html(), valid_bundle())

    def test_every_required_boundary_is_required(self) -> None:
        for marker in REQUIRED:
            with self.subTest(marker=marker), self.assertRaises(BoundaryError):
                inspect(valid_html(), valid_bundle().replace(marker, ""))

    def test_every_known_unsupported_claim_is_rejected(self) -> None:
        for marker in PROHIBITED:
            with self.subTest(marker=marker), self.assertRaises(BoundaryError):
                inspect(valid_html(), f"{valid_bundle()};{marker}")

    def test_commerce_and_staffing_paths_are_rejected(self) -> None:
        for marker in ("$50", "per hour", "Book now", "Apply now", "Send a resume"):
            with self.subTest(marker=marker), self.assertRaises(BoundaryError):
                inspect(valid_html(), f"{valid_bundle()};{marker}")

    def test_exact_metadata_is_required(self) -> None:
        with self.assertRaises(BoundaryError):
            inspect(valid_html().replace(EXPECTED_TITLE, "Changed", 1), valid_bundle())

    def test_artifact_inventory_is_bounded(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "assets").mkdir()
            (root / "index.html").write_text(valid_html(), encoding="utf-8")
            (root / "assets/index-test.js").write_text(valid_bundle(), encoding="utf-8")
            verify_dist(root)
            (root / "assets/index-other.js").write_text(valid_bundle(), encoding="utf-8")
            with self.assertRaises(BoundaryError):
                verify_dist(root)


if __name__ == "__main__":
    unittest.main()
