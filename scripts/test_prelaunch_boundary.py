#!/usr/bin/env python3
"""Offline public-site marketing and privacy policy checks."""
import tempfile
from pathlib import Path
import unittest
from scripts.check_prelaunch import BoundaryError, EXPECTED_DESCRIPTION, EXPECTED_TITLE, PROHIBITED, REQUIRED, inspect, verify_dist

def html():
    return f'''<link rel="canonical" href="https://pawsfectwalks.com/" />
<meta name="description" content="{EXPECTED_DESCRIPTION}" />
<meta property="og:title" content="{EXPECTED_TITLE}" />
<meta property="og:description" content="{EXPECTED_DESCRIPTION}" />
<title>{EXPECTED_TITLE}</title>'''

def safe_bundle():
    return ";".join(REQUIRED)

class PublicTests(unittest.TestCase):
    def test_approved_public_skeleton_passes(self):
        inspect(html(), safe_bundle())
    def test_missing_customer_and_career_action_fails(self):
        for text in REQUIRED:
            with self.subTest(text=text), self.assertRaises(BoundaryError):
                inspect(html(), safe_bundle().replace(text, ""))
    def test_private_email_and_internal_status_fails(self):
        for text in PROHIBITED:
            with self.subTest(text=text), self.assertRaises(BoundaryError):
                inspect(html(), safe_bundle() + ";" + text)
    def test_unverified_claim_fails(self):
        for text in ("Fully insured", "Booking confirmed", "Guaranteed availability"):
            with self.subTest(text=text), self.assertRaises(BoundaryError):
                inspect(html(), safe_bundle() + ";" + text)
    def test_wrong_metadata_fails(self):
        with self.assertRaises(BoundaryError):
            inspect(html().replace(EXPECTED_TITLE, "Test Title", 1), safe_bundle())
    def test_built_artifact_shape(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp); (root/"assets").mkdir()
            (root/"index.html").write_text(html(),encoding="utf-8")
            (root/"assets/index-test.js").write_text(safe_bundle(),encoding="utf-8")
            verify_dist(root)

if __name__=="__main__":
    unittest.main()
