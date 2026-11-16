#!/usr/bin/env python3
"""Offline policy checks for the Pawsfect CodeQL workflow."""

from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
WORKFLOW = ROOT / ".github/workflows/codeql.yml"
CHECKOUT_SHA = "3d3c42e5aac5ba805825da76410c181273ba90b1"
CODEQL_SHA = "33d7b85da1a04171e211befe2c739303b9a4c066"


class CodeQLWorkflowTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.workflow = WORKFLOW.read_text(encoding="utf-8")

    def test_triggers_are_bounded_and_pull_request_target_is_absent(self) -> None:
        workflow = self.workflow
        self.assertIn("push:\n    branches: [main]", workflow)
        self.assertIn("pull_request:\n    branches: [main]", workflow)
        self.assertIn("schedule:\n    - cron: '17 15 * * 5'", workflow)
        self.assertIn("workflow_dispatch:", workflow)
        self.assertNotIn("pull_request_target", workflow)

    def test_permissions_are_least_privilege(self) -> None:
        workflow = self.workflow
        self.assertIn("permissions:\n  contents: read", workflow)
        analyze = workflow.split("\n  analyze:\n", 1)[1]
        for permission in (
            "actions: read",
            "contents: read",
            "packages: read",
            "security-events: write",
        ):
            with self.subTest(permission=permission):
                self.assertEqual(analyze.count(permission), 1)
        self.assertNotRegex(workflow, re.compile(r"\b(?:contents|actions|packages): write\b"))

    def test_actions_are_immutable_and_checkout_is_safe(self) -> None:
        workflow = self.workflow
        self.assertEqual(
            workflow.count(f"uses: actions/checkout@{CHECKOUT_SHA}"),
            1,
        )
        self.assertEqual(workflow.count("persist-credentials: false"), 1)
        self.assertEqual(
            workflow.count(f"uses: github/codeql-action/init@{CODEQL_SHA}"),
            1,
        )
        self.assertEqual(
            workflow.count(f"uses: github/codeql-action/analyze@{CODEQL_SHA}"),
            1,
        )
        uses = re.findall(r"^\s*uses:\s*([^\s#]+)", workflow, flags=re.MULTILINE)
        self.assertEqual(len(uses), 3)
        self.assertTrue(all(re.search(r"@[0-9a-f]{40}$", use) for use in uses))

    def test_analysis_scope_and_timeout_are_explicit(self) -> None:
        workflow = self.workflow
        self.assertEqual(workflow.count("timeout-minutes: 15"), 1)
        self.assertEqual(workflow.count("languages: javascript-typescript"), 1)
        self.assertEqual(workflow.count("queries: security-extended"), 1)


if __name__ == "__main__":
    unittest.main()
