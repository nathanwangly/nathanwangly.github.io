#!/usr/bin/env python3
"""Check local href/src targets in generated Jekyll HTML."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if value and ((key == "href" and tag in {"a", "link"}) or
                          (key == "src" and tag in {"img", "script", "source"})):
                self.links.append(value)


def target_for(site_dir, source, url):
    parts = urlsplit(url)
    if parts.scheme or parts.netloc or url.startswith("//"):
        return None
    path = unquote(parts.path)
    if not path:
        return None
    target = site_dir / path.lstrip("/") if path.startswith("/") else source.parent / path
    if target.is_dir() or path.endswith("/"):
        target /= "index.html"
    elif not target.exists() and not target.suffix:
        target = target / "index.html"
    return target


def main():
    site_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
    if not site_dir.is_dir():
        print(f"Missing build directory: {site_dir}", file=sys.stderr)
        return 2
    failures = []
    pages = list(site_dir.rglob("*.html"))
    for page in pages:
        parser = LinkParser()
        parser.feed(page.read_text(encoding="utf-8"))
        for url in parser.links:
            target = target_for(site_dir, page, url)
            if target is not None and not target.is_file():
                failures.append(f"{page.relative_to(site_dir)}: {url}")
    if failures:
        print("Missing local targets:\n" + "\n".join(failures), file=sys.stderr)
        return 1
    print(f"Checked local links and assets in {len(pages)} HTML pages.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
