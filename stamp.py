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
