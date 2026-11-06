#!/usr/bin/env python3
"""Verify that the canonical public site matches a fresh reviewed build exactly."""

from __future__ import annotations

import argparse
from dataclasses import dataclass
import hashlib
from html.parser import HTMLParser
from pathlib import Path
import re
import urllib.error
import urllib.parse
import urllib.request


ORIGIN = "https://pawsfectwalks.com"
TIMEOUT_SECONDS = 10
FILE_LIMIT = 512_000
TOTAL_LIMIT = 1_000_000
USER_AGENT = "PawsfectWalks-live-integrity/1.0"

FIXED_FILES = {"index.html", "robots.txt", "sitemap.xml"}
ASSET_PATTERN = re.compile(r"assets/index-[A-Za-z0-9_-]+\.(?:css|js)\Z")
CONTENT_TYPES = {
    ".html": {"text/html"},
    ".css": {"text/css"},
    ".js": {"application/javascript", "text/javascript"},
    ".txt": {"text/plain"},
    ".xml": {"application/xml", "text/xml"},
}


class IntegrityError(RuntimeError):
    """The local artifact or public response crossed the reviewed boundary."""


class NoRedirect(urllib.request.HTTPRedirectHandler):
    """Reject redirects instead of silently changing the audited endpoint."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: N802
        return None


@dataclass(frozen=True)
class ExpectedFile:
    path: str
    data: bytes

    @property
    def digest(self) -> str:
        return hashlib.sha256(self.data).hexdigest()


class ResourceParser(HTMLParser):
    """Collect active resources from the tiny Vite shell."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.scripts: list[str] = []
        self.styles: list[str] = []
        self.canonicals: list[str] = []

    def handle_starttag(self, tag: str, attrs) -> None:
        values = dict(attrs)
        if tag == "script" and "src" in values:
            self.scripts.append(values["src"])
        if tag == "link" and "href" in values:
            relations = set((values.get("rel") or "").casefold().split())
            if "stylesheet" in relations:
                self.styles.append(values["href"])
            elif "canonical" in relations:
                self.canonicals.append(values["href"])
            elif relations & {"preload", "modulepreload", "prefetch", "dns-prefetch", "preconnect"}:
                raise IntegrityError("index.html contains an unexpected fetched link")
        if tag in {"base", "iframe", "object", "embed", "form"}:
            raise IntegrityError(f"index.html contains prohibited element: {tag}")


def _safe_file(root: Path, path: Path) -> bytes:
    if path.is_symlink() or not path.is_file():
        raise IntegrityError(f"artifact entry is not a regular file: {path.relative_to(root)}")
    try:
        relative = path.relative_to(root).as_posix()
    except ValueError as exc:
        raise IntegrityError("artifact entry escaped the dist directory") from exc
    if relative not in FIXED_FILES and not ASSET_PATTERN.fullmatch(relative):
        raise IntegrityError(f"unexpected artifact file: {relative}")
    size = path.stat().st_size
    if size <= 0 or size > FILE_LIMIT:
        raise IntegrityError(f"artifact file has unsafe size: {relative}")
    return path.read_bytes()


def load_dist(dist: Path) -> list[ExpectedFile]:
    if dist.is_symlink() or not dist.is_dir():
        raise IntegrityError("dist must be a real directory")
    files = sorted(path for path in dist.rglob("*") if path.is_file() or path.is_symlink())
    loaded = [ExpectedFile(path.relative_to(dist).as_posix(), _safe_file(dist, path)) for path in files]
    paths = {item.path for item in loaded}
    if not FIXED_FILES.issubset(paths):
        raise IntegrityError("artifact is missing index.html, robots.txt, or sitemap.xml")
    scripts = [path for path in paths if path.endswith(".js")]
    styles = [path for path in paths if path.endswith(".css")]
    if len(loaded) != 5 or len(scripts) != 1 or len(styles) != 1:
        raise IntegrityError("expected exactly the root, robots, sitemap, one script, and one stylesheet")
    total = sum(len(item.data) for item in loaded)
    if total > TOTAL_LIMIT:
        raise IntegrityError("artifact exceeds the total byte limit")

    html = next(item.data for item in loaded if item.path == "index.html")
    try:
        page = html.decode("utf-8", errors="strict")
    except UnicodeDecodeError as exc:
        raise IntegrityError("index.html is not strict UTF-8") from exc
    parser = ResourceParser()
    parser.feed(page)
    parser.close()
    if parser.scripts != [f"/{scripts[0]}"]:
        raise IntegrityError("index.html must reference exactly the reviewed module")
    if parser.styles != [f"/{styles[0]}"]:
        raise IntegrityError("index.html must reference exactly the reviewed stylesheet")
    if parser.canonicals != [f"{ORIGIN}/"]:
        raise IntegrityError("index.html must contain the approved canonical URL")
    return loaded


def public_url(path: str) -> str:
    if (
        not path
        or "\\" in path
        or path.startswith("/")
        or any(part in {"", ".", ".."} for part in path.split("/"))
        or (path not in FIXED_FILES and not ASSET_PATTERN.fullmatch(path))
    ):
        raise IntegrityError("unsafe artifact path")
    if path == "index.html":
        return f"{ORIGIN}/"
    encoded = urllib.parse.quote(path, safe="/-_.")
    url = f"{ORIGIN}/{encoded}"
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme != "https" or parsed.netloc != "pawsfectwalks.com" or parsed.query or parsed.fragment:
        raise IntegrityError(f"unsafe public URL for {path}")
    return url


def _content_type(response) -> str:
    value = response.headers.get("Content-Type", "")
    return value.split(";", 1)[0].strip().casefold()


def fetch_exact(item: ExpectedFile, opener=None) -> None:
    url = public_url(item.path)
    expected_types = CONTENT_TYPES[Path(item.path).suffix]
    request = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept-Encoding": "identity"},
    )
    client = opener or urllib.request.build_opener(NoRedirect())
    try:
        response = client.open(request, timeout=TIMEOUT_SECONDS)
    except urllib.error.HTTPError as exc:
        raise IntegrityError(f"{item.path} returned HTTP {exc.code}") from exc
    except urllib.error.URLError as exc:
        raise IntegrityError(f"{item.path} request failed") from exc
    with response:
        status = getattr(response, "status", response.getcode())
        if status != 200:
            raise IntegrityError(f"{item.path} returned HTTP {status}")
        if response.geturl() != url:
            raise IntegrityError(f"{item.path} redirected or changed URL")
        if _content_type(response) not in expected_types:
            raise IntegrityError(f"{item.path} returned an unexpected content type")
        length = response.headers.get("Content-Length")
        if length is not None:
            try:
                declared = int(length)
            except ValueError as exc:
                raise IntegrityError(f"{item.path} returned an invalid content length") from exc
            if declared < 0 or declared > FILE_LIMIT:
                raise IntegrityError(f"{item.path} declared an unsafe content length")
        data = response.read(FILE_LIMIT + 1)
    if len(data) > FILE_LIMIT:
        raise IntegrityError(f"{item.path} exceeded the response byte limit")
    if data != item.data:
        actual = hashlib.sha256(data).hexdigest()
        raise IntegrityError(
            f"{item.path} differs from the reviewed build: expected {item.digest}, got {actual}"
        )


def verify(dist: Path, opener=None) -> list[ExpectedFile]:
    files = load_dist(dist)
    for item in files:
        fetch_exact(item, opener=opener)
    return files


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dist", type=Path, default=Path("dist"))
    args = parser.parse_args(argv)
    files = verify(args.dist)
    print(
        "Pawsfect live integrity passed: "
        f"files={len(files)}; bytes={sum(len(item.data) for item in files)}; "
        f"root_sha256={next(item.digest for item in files if item.path == 'index.html')}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
