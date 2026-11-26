# flexkit.net

The Flexkit website: a static page for Swipr, Scribr, SubTrakr and Loadr.

Plain HTML, CSS and a little JavaScript. No build step, no dependencies, no third-party requests.
Served by GitHub Pages from the repository root (`CNAME` sets the domain to `flexkit.net`).

To preview locally: `python3 -m http.server` and open http://localhost:8000.

`ads.txt` and `app-ads.txt` must stay at the root: the ad networks used by the mobile apps read them from flexkit.net.

## Updating

After changing anything, run `python3 stamp.py` before committing. It adds a version tag to every stylesheet, script and image link so visitors get the new files instead of old cached ones, and it rewrites `sitemap.xml` with each page's last-changed date. A new page must be added to `PAGES` in `stamp.py` to appear in the sitemap.
