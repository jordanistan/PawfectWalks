#!/usr/bin/env python3
"""Offline policy checks for the Pawsfect secret-scanning workflow."""

from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
WORKFLOW = ROOT / ".github/workflows/secret-scan.yml"
CHECKOUT_SHA = "3d3c42e5aac5ba805825da76410c181273ba90b1"
GITLEAKS_SHA = "e0c47f4f8be36e29cdc102c57e68cb5cbf0e8d1e"


class SecretScanWorkflowTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.workflow = WORKFLOW.read_text(encoding="utf-8")

    def test_triggers_are_bounded_and_pull_request_target_is_absent(self) -> None:
        workflow = self.workflow
        self.assertIn("push:\n    branches: [main]", workflow)
        self.assertIn("pull_request:\n    branches: [main]", workflow)
        self.assertIn("schedule:\n    - cron: '43 15 * * 1'", workflow)
        self.assertIn("workflow_dispatch:", workflow)
        self.assertNotIn("pull_request_target", workflow)

    def test_permissions_and_runtime_are_bounded(self) -> None:
        workflow = self.workflow
        self.assertIn("permissions:\n  contents: read", workflow)
        self.assertNotRegex(
            workflow,
            re.compile(r"\b(?:actions|contents|packages|security-events): write\b"),
        )
        self.assertEqual(workflow.count("timeout-minutes: 10"), 1)
        self.assertIn(
            "concurrency:\n  group: repository-secret-scan-${{ github.ref }}\n"
            "  cancel-in-progress: true",
            workflow,
        )

    def test_actions_are_immutable_and_checkout_scans_full_history(self) -> None:
        workflow = self.workflow
        self.assertEqual(
            workflow.count(f"uses: actions/checkout@{CHECKOUT_SHA}"),
            1,
        )
        self.assertEqual(
            workflow.count(f"uses: gitleaks/gitleaks-action@{GITLEAKS_SHA}"),
            1,
        )
        self.assertEqual(workflow.count("fetch-depth: 0"), 1)
        self.assertEqual(workflow.count("persist-credentials: false"), 1)
        uses = re.findall(r"^\s*uses:\s*([^\s#]+)", workflow, flags=re.MULTILINE)
        self.assertEqual(len(uses), 2)
        self.assertTrue(all(re.search(r"@[0-9a-f]{40}$", use) for use in uses))

    def test_gitleaks_receives_only_bounded_outputs(self) -> None:
        workflow = self.workflow
        self.assertEqual(
            workflow.count("GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}"),
            1,
        )
        self.assertEqual(
            workflow.count("GITLEAKS_ENABLE_COMMENTS: 'false'"),
            1,
        )
        self.assertEqual(
            workflow.count("GITLEAKS_ENABLE_UPLOAD_ARTIFACT: 'false'"),
            1,
        )


if __name__ == "__main__":
    unittest.main()
