#!/usr/bin/env python3
"""Offline tests for the Pawsfect inquiry handoff boundary."""

import tempfile
from pathlib import Path
import unittest

from scripts.check_inquiry import (
    APPROVED_RECIPIENT,
    InquiryError,
    PROHIBITED,
    REQUIRED,
    inspect,
    verify_dist,
)


def safe_bundle() -> str:
    return ";".join(REQUIRED) + ";john@example.com;" + ";".join(
        f"mailto:{APPROVED_RECIPIENT}?subject=test" for _ in range(3)
    )


class InquiryTests(unittest.TestCase):
    def test_reviewed_handoff_passes(self) -> None:
        inspect(safe_bundle())

    def test_every_required_boundary_is_required(self) -> None:
        for marker in REQUIRED:
            with self.subTest(marker=marker), self.assertRaises(InquiryError):
                inspect(safe_bundle().replace(marker, ""))

    def test_every_prohibited_marker_is_rejected(self) -> None:
        for marker in PROHIBITED:
            with self.subTest(marker=marker), self.assertRaises(InquiryError):
                inspect(safe_bundle() + marker)

    def test_recipient_drift_and_extra_email_are_rejected(self) -> None:
        for changed in (
            safe_bundle().replace(APPROVED_RECIPIENT, "other@example.com"),
            safe_bundle() + ";support@example.com",
            f"mailto:{APPROVED_RECIPIENT};" + ";".join(REQUIRED),
        ):
            with self.subTest(changed=changed), self.assertRaises(InquiryError):
                inspect(changed)

    def test_artifact_inventory_is_bounded(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "assets").mkdir()
            (root / "index.html").write_text("<!doctype html>", encoding="utf-8")
            (root / "assets/index-test.js").write_text(safe_bundle(), encoding="utf-8")
            verify_dist(root)
            (root / "assets/index-other.js").write_text(safe_bundle(), encoding="utf-8")
            with self.assertRaises(InquiryError):
                verify_dist(root)


if __name__ == "__main__":
    unittest.main()
