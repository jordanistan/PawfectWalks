#!/usr/bin/env python3
"""Offline policy checks for the Pawsfect secret-scanning workflow."""

from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
WORKFLOW = ROOT / ".github/workflows/secret-scan.yml"
CHECKOUT_SHA = "3d3c42e5aac5ba805825da76410c181273ba90b1"
GITLEAKS_SHA = "e0c47f4f8be36e29cdc102c57e68cb5cbf0e8d1e"
EXPECTED_WORKFLOW = f"""name: Repository secret scan

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
  schedule:
    - cron: '43 15 * * 1'
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: repository-secret-scan-${{{{ github.ref }}}}
  cancel-in-progress: true

jobs:
  secrets:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Check out full history without persisted credentials
        uses: actions/checkout@{CHECKOUT_SHA} # v7
        with:
          fetch-depth: 0
          persist-credentials: false
      - name: Scan repository history for secrets
        uses: gitleaks/gitleaks-action@{GITLEAKS_SHA} # v3.0.0
        env:
          GITHUB_TOKEN: ${{{{ secrets.GITHUB_TOKEN }}}}
          GITLEAKS_ENABLE_COMMENTS: 'false'
          GITLEAKS_ENABLE_UPLOAD_ARTIFACT: 'false'
"""


class SecretScanWorkflowTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.workflow = WORKFLOW.read_text(encoding="utf-8")

    def test_complete_workflow_contract_is_exact(self) -> None:
        self.assertEqual(self.workflow, EXPECTED_WORKFLOW)

    def test_triggers_are_exact_and_pull_request_target_is_absent(self) -> None:
        triggers = self.workflow.split("on:\n", 1)[1].split(
            "\npermissions:\n", 1
        )[0]
        self.assertEqual(
            triggers,
            "  pull_request:\n"
            "    branches: [main]\n"
            "  push:\n"
            "    branches: [main]\n"
            "  schedule:\n"
            "    - cron: '43 15 * * 1'\n"
            "  workflow_dispatch:\n",
        )
        self.assertNotIn("pull_request_target", self.workflow)

    def test_permissions_and_runtime_are_bounded(self) -> None:
        permissions = self.workflow.split("permissions:\n", 1)[1].split(
            "\nconcurrency:\n", 1
        )[0]
        self.assertEqual(permissions, "  contents: read\n")
        self.assertEqual(
            len(
                re.findall(
                    r"^\s*permissions:\s*$", self.workflow, flags=re.MULTILINE
                )
            ),
            1,
        )
        concurrency = self.workflow.split("concurrency:\n", 1)[1].split(
            "\njobs:\n", 1
        )[0]
        self.assertEqual(
            concurrency,
            "  group: repository-secret-scan-${{ github.ref }}\n"
            "  cancel-in-progress: true\n",
        )
        self.assertEqual(self.workflow.count("timeout-minutes: 10"), 1)
        self.assertEqual(self.workflow.count("runs-on: ubuntu-latest"), 1)
        self.assertEqual(self.workflow.count("  secrets:\n"), 1)
        self.assertEqual(self.workflow.count("concurrency:\n"), 1)
        self.assertEqual(self.workflow.count("jobs:\n"), 1)

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
        checkout_with = workflow.split("        with:\n", 1)[1].split(
            "      - name: Scan repository history for secrets\n", 1
        )[0]
        self.assertEqual(
            checkout_with,
            "          fetch-depth: 0\n"
            "          persist-credentials: false\n",
        )
        self.assertEqual(workflow.count("        with:\n"), 1)
        uses = re.findall(r"^\s*uses:\s*([^\s#]+)", workflow, flags=re.MULTILINE)
        self.assertEqual(
            uses,
            [
                f"actions/checkout@{CHECKOUT_SHA}",
                f"gitleaks/gitleaks-action@{GITLEAKS_SHA}",
            ],
        )
        self.assertEqual(
            re.findall(r"^\s+run:\s*", workflow, flags=re.MULTILINE),
            [],
        )

    def test_gitleaks_receives_only_bounded_outputs(self) -> None:
        env = self.workflow.split("        env:\n", 1)[1]
        self.assertEqual(
            env,
            "          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n"
            "          GITLEAKS_ENABLE_COMMENTS: 'false'\n"
            "          GITLEAKS_ENABLE_UPLOAD_ARTIFACT: 'false'\n",
        )
        self.assertEqual(self.workflow.count("        env:\n"), 1)


if __name__ == "__main__":
    unittest.main()
