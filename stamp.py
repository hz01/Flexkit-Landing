"""Add a version tag (?v=<hash>) to every local CSS, JS and image link in the HTML pages.

Browsers keep /style.css and the images in their cache, so after a change visitors can see
the new HTML with the old styles. The tag changes whenever the file's content changes, which
makes browsers fetch the new copy. Run after editing any asset: python3 stamp.py
"""
import hashlib, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent
REF = re.compile(r'(?P<attr>(?:href|src|srcset)=")(?P<path>/(?:style\.css|main\.js|img/[^"?]+))(?:\?v=[0-9a-f]+)?"')

def tag(path):
    return hashlib.sha1((ROOT / path.lstrip("/")).read_bytes()).hexdigest()[:10]

for page in ROOT.rglob("*.html"):
    if ".git" in page.parts:
        continue
    text = page.read_text(encoding="utf-8")
    new = REF.sub(lambda m: f'{m["attr"]}{m["path"]}?v={tag(m["path"])}"', text)
    if new != text:
        page.write_text(new, encoding="utf-8")
        print("stamped", page.relative_to(ROOT))


# ── Sitemap ──
# Lists every indexable page with the date it last changed (today if it has uncommitted
# changes) and the images Google may show for it.
import datetime, subprocess

PAGES = {
    "index.html": ["og-image.png", "img/swipr-512.png", "img/scribr-512.png",
                   "img/subtrakr-512.png", "img/loadr-512.png", "img/loadr-light.webp"],
    "swipr/index.html": ["img/swipr-512.png", "img/og-swipr.png"],
    "scribr/index.html": ["img/scribr-512.png", "img/og-scribr.png"],
    "subtrakr/index.html": ["img/subtrakr-512.png", "img/og-subtrakr.png"],
}

def changed(path):
    git = ["git", "-C", str(ROOT)]
    dirty = subprocess.run(git + ["status", "--porcelain", "--", path], capture_output=True, text=True).stdout.strip()
    if dirty:
        return datetime.date.today().isoformat()
    last = subprocess.run(git + ["log", "-1", "--format=%cs", "--", path], capture_output=True, text=True).stdout.strip()
    return last or datetime.date.today().isoformat()

rows = []
for page, images in PAGES.items():
    loc = "https://flexkit.net/" + page.removesuffix("index.html")
    imgs = "".join(f"\n    <image:image><image:loc>https://flexkit.net/{i}</image:loc></image:image>" for i in images)
    rows.append(f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{changed(page)}</lastmod>{imgs}\n  </url>")
(ROOT / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
    + "\n".join(rows) + "\n</urlset>\n", encoding="utf-8")
print("wrote sitemap.xml")
