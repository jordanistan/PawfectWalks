#!/usr/bin/env python3
"""Offline policy checks for the Pawsfect pre-launch workflow."""

from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
WORKFLOW = ROOT / ".github/workflows/prelaunch-boundary.yml"
CHECKOUT_SHA = "3d3c42e5aac5ba805825da76410c181273ba90b1"
SETUP_NODE_SHA = "249970729cb0ef3589644e2896645e5dc5ba9c38"


class PrelaunchWorkflowTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.workflow = WORKFLOW.read_text(encoding="utf-8")

    def test_triggers_are_exact_and_pull_request_target_is_absent(self) -> None:
        triggers = self.workflow.split("on:\n", 1)[1].split("\npermissions:\n", 1)[0]
        self.assertEqual(
            triggers,
            "  pull_request:\n"
            "    branches: [main]\n"
            "  push:\n"
            "    branches: [main]\n"
            "  workflow_dispatch:\n",
        )
        self.assertNotIn("pull_request_target", self.workflow)

    def test_permissions_concurrency_and_timeout_are_bounded(self) -> None:
        permissions = self.workflow.split("permissions:\n", 1)[1].split(
            "\nconcurrency:\n", 1
        )[0]
        self.assertEqual(permissions, "  contents: read\n")
        self.assertEqual(
            self.workflow.count("permissions:\n  contents: read\n"),
            1,
        )
        self.assertEqual(
            len(
                re.findall(
                    r"^\s*permissions:\s*$", self.workflow, flags=re.MULTILINE
                )
            ),
            1,
        )
        self.assertEqual(
            self.workflow.count(
                "concurrency:\n"
                "  group: prelaunch-boundary-${{ github.ref }}\n"
                "  cancel-in-progress: true"
            ),
            1,
        )
        self.assertEqual(self.workflow.count("timeout-minutes: 10"), 1)

    def test_actions_are_immutable_and_checkout_is_safe(self) -> None:
        self.assertEqual(
            self.workflow.count(f"uses: actions/checkout@{CHECKOUT_SHA}"),
            1,
        )
        self.assertEqual(
            self.workflow.count(f"uses: actions/setup-node@{SETUP_NODE_SHA}"),
            1,
        )
        self.assertEqual(self.workflow.count("persist-credentials: false"), 1)
        uses = re.findall(
            r"^\s*uses:\s*([^\s#]+)", self.workflow, flags=re.MULTILINE
        )
        self.assertEqual(len(uses), 2)
        self.assertTrue(all(re.search(r"@[0-9a-f]{40}$", use) for use in uses))

    def test_locked_runtime_and_build_commands_are_exact(self) -> None:
        self.assertEqual(self.workflow.count("node-version: 24"), 1)
        self.assertEqual(self.workflow.count("cache: npm"), 1)
        self.assertEqual(self.workflow.count("run: npm ci --ignore-scripts"), 1)
        self.assertEqual(self.workflow.count("run: npm run lint"), 1)
        self.assertEqual(self.workflow.count("run: npm run typecheck"), 1)
        self.assertEqual(self.workflow.count("run: npm run build"), 1)
        self.assertEqual(
            re.findall(r"^\s+run:\s*(.*)$", self.workflow, flags=re.MULTILINE),
            [
                "npm ci --ignore-scripts",
                "npm run lint",
                "npm run typecheck",
                "npm run build",
                "|",
            ],
        )

    def test_public_boundary_command_set_is_exact(self) -> None:
        marker = "      - name: Test the public boundary\n        run: |\n"
        self.assertEqual(self.workflow.count(marker), 1)
        commands = self.workflow.split(marker, 1)[1]
        self.assertEqual(
            commands,
            "          python3 -m unittest scripts.test_prelaunch_workflow -v\n"
            "          python3 -m unittest scripts.test_secret_scan_workflow -v\n"
            "          python3 -m unittest scripts.test_codeql_workflow -v\n"
            "          python3 -m unittest scripts.test_prelaunch_boundary -v\n"
            "          python3 -m unittest scripts.test_inquiry -v\n"
            "          python3 scripts/check_prelaunch.py\n"
            "          python3 scripts/check_inquiry.py\n",
        )


if __name__ == "__main__":
    unittest.main()
