#!/usr/bin/env python3
"""Deterministic tests for the Pawsfect exact-byte live verifier."""

from __future__ import annotations

from email.message import Message
import io
from pathlib import Path
import tempfile
import unittest

from scripts.verify_live import FILE_LIMIT, IntegrityError, load_dist, public_url, verify


FILES = {
    "index.html": (
        b'<link rel="canonical" href="https://pawsfectwalks.com/">'
        b'<script src="/assets/index-Test_1.js"></script>'
        b'<link rel="stylesheet" href="/assets/index-Test_1.css">'
    ),
    "assets/index-Test_1.js": b"console.log('safe')",
    "assets/index-Test_1.css": b"body{color:#222}",
    "robots.txt": b"User-agent: *\nAllow: /\n",
    "sitemap.xml": b"<urlset></urlset>\n",
}
TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript",
    ".css": "text/css",
    ".txt": "text/plain",
    ".xml": "application/xml",
}


class Response(io.BytesIO):
    def __init__(self, data: bytes, url: str, content_type: str, status: int = 200, length=None):
        super().__init__(data)
        self.status = status
        self._url = url
        self.headers = Message()
        self.headers["Content-Type"] = content_type
        if length is not False:
            self.headers["Content-Length"] = str(len(data) if length is None else length)

    def geturl(self):
        return self._url

    def getcode(self):
        return self.status


class Opener:
    def __init__(
        self, files=None, *, redirect=None, wrong_type=None, oversized=None,
        oversized_body=None, drift=None, status=200,
    ):
        self.files = files or FILES
        self.redirect = redirect
        self.wrong_type = wrong_type
        self.oversized = oversized
        self.oversized_body = oversized_body
        self.drift = drift
        self.status = status
        self.urls = []

    def open(self, request, timeout):
        self.urls.append((request.full_url, timeout))
        path = "index.html" if request.full_url.endswith("/") else request.full_url.split(".com/", 1)[1]
        data = self.files[path]
        if path == self.drift:
            data += b"drift"
        if path == self.oversized_body:
            data = b"x" * (FILE_LIMIT + 1)
        suffix = Path(path).suffix
        return Response(
            data,
            self.redirect or request.full_url,
            "application/octet-stream" if path == self.wrong_type else TYPES[suffix],
            status=self.status,
            length=(FILE_LIMIT + 1 if path == self.oversized else (False if path == self.oversized_body else None)),
        )


def make_dist(root: Path, files=None):
    for name, data in (files or FILES).items():
        path = root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)


class LiveIntegrityTests(unittest.TestCase):
    def test_exact_artifact_passes_and_uses_only_fixed_urls(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            make_dist(root)
            opener = Opener()
            files = verify(root, opener=opener)
            self.assertEqual(5, len(files))
            self.assertEqual(
                {public_url(path) for path in FILES},
                {url for url, _ in opener.urls},
            )
            self.assertTrue(all(timeout == 10 for _, timeout in opener.urls))

    def test_byte_drift_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); make_dist(root)
            with self.assertRaisesRegex(IntegrityError, "differs from the reviewed build"):
                verify(root, opener=Opener(drift="assets/index-Test_1.js"))

    def test_redirect_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); make_dist(root)
            with self.assertRaisesRegex(IntegrityError, "redirected"):
                verify(root, opener=Opener(redirect="https://example.com/"))

    def test_wrong_mime_and_oversized_response_fail(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); make_dist(root)
            with self.assertRaisesRegex(IntegrityError, "content type"):
                verify(root, opener=Opener(wrong_type="robots.txt"))
            with self.assertRaisesRegex(IntegrityError, "unsafe content length"):
                verify(root, opener=Opener(oversized="sitemap.xml"))
            with self.assertRaisesRegex(IntegrityError, "response byte limit"):
                verify(root, opener=Opener(oversized_body="robots.txt"))

    def test_non_200_status_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); make_dist(root)
            with self.assertRaisesRegex(IntegrityError, "HTTP 503"):
                verify(root, opener=Opener(status=503))

    def test_missing_extra_and_bad_asset_names_fail(self):
        mutations = []
        missing = dict(FILES); missing.pop("robots.txt"); mutations.append(missing)
        extra = dict(FILES); extra["secret.env"] = b"no"; mutations.append(extra)
        bad = dict(FILES); bad["assets/app.js"] = bad.pop("assets/index-Test_1.js"); mutations.append(bad)
        for files in mutations:
            with self.subTest(paths=sorted(files)), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp); make_dist(root, files)
                with self.assertRaises(IntegrityError):
                    load_dist(root)

    def test_symlinked_file_and_directory_fail(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "dist"; root.mkdir(); make_dist(root)
            target = root / "robots.txt"
            target.unlink(); target.symlink_to(root / "sitemap.xml")
            with self.assertRaisesRegex(IntegrityError, "not a regular file"):
                load_dist(root)
            link = Path(tmp) / "dist-link"
            link.symlink_to(root, target_is_directory=True)
            with self.assertRaisesRegex(IntegrityError, "real directory"):
                load_dist(link)

    def test_public_url_is_fixed_and_encoded(self):
        self.assertEqual("https://pawsfectwalks.com/", public_url("index.html"))
        self.assertEqual(
            "https://pawsfectwalks.com/assets/index-Test_1.js",
            public_url("assets/index-Test_1.js"),
        )
        for path in ("", "/index.html", "../index.html", "assets/../index-X.js", "assets\\index-X.js", "assets/app.js"):
            with self.subTest(path=path), self.assertRaisesRegex(IntegrityError, "unsafe artifact path"):
                public_url(path)

    def test_invalid_html_and_unexpected_resource_fail(self):
        cases = []
        invalid = dict(FILES); invalid["index.html"] = b"\xff"; cases.append(invalid)
        external = dict(FILES); external["index.html"] += b'<script src="https://example.com/x.js"></script>'; cases.append(external)
        preload = dict(FILES); preload["index.html"] += b'<link rel="preload" href="/other.js">'; cases.append(preload)
        for files in cases:
            with self.subTest(index=files["index.html"][-40:]), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp); make_dist(root, files)
                with self.assertRaises(IntegrityError):
                    load_dist(root)


if __name__ == "__main__":
    unittest.main()
