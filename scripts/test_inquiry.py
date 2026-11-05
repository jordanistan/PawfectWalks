#!/usr/bin/env python3
"""Check that contact paths use the business inbox and avoid personal email."""
import tempfile
from pathlib import Path
import unittest
from scripts.check_inquiry import APPROVED_RECIPIENT, InquiryError, PROHIBITED, REQUIRED, inspect, verify_dist

def safe_bundle():
    return ";".join(REQUIRED) + ";" + ";".join(
        "mailto:" + APPROVED_RECIPIENT + "?subject=Test" for _ in range(3)
    ) + ";you@example.com"

class InquiryTests(unittest.TestCase):
    def test_business_contact_passes(self):
        inspect(safe_bundle())
    def test_missing_submit_explanation_fails(self):
        for marker in REQUIRED:
            with self.subTest(marker=marker), self.assertRaises(InquiryError):
                inspect(safe_bundle().replace(marker,""))
    def test_personal_email_and_other_prohibited_content_fails(self):
        for marker in PROHIBITED:
            with self.subTest(marker=marker), self.assertRaises(InquiryError):
                inspect(safe_bundle() + ";" + marker)
    def test_unknown_contact_address_fails(self):
        with self.assertRaises(InquiryError):
            inspect(safe_bundle().replace(APPROVED_RECIPIENT,"other@example.com"))
    def test_artifact_shape(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp); (root/"assets").mkdir()
            (root/"assets/index-test.js").write_text(safe_bundle(),encoding="utf-8")
            verify_dist(root)

if __name__=="__main__":
    unittest.main()
