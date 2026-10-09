# Working on this site

This is a Jekyll site for GitHub Pages. Preserve its restrained, readable portfolio style and existing public URLs. Work on the requested scope and keep content claims faithful to the source.

## Author-owned content

- All site copy and content must be personally written by Nathan. Do not create, rewrite, polish, expand, or otherwise change copy without his express permission for that specific content change.
- This applies to page and section headings, titles, navigation labels, project descriptions, CV and research copy, posts, captions, alt text, metadata, and any other user-facing wording or claims.
- For UI or structural work, preserve existing wording exactly. Use neutral placeholders only when necessary, and make them clearly identifiable as placeholders rather than publishable copy.
- If a requested design or implementation change appears to require new or revised wording, leave the wording untouched and ask for express permission before changing it. Suggestions may be offered separately, but must not be inserted into the site.

## Before editing

1. Read `README.md` and inspect the page, data file, layout, and CSS affected by the task.
2. Check `git status --short`; do not overwrite unrelated work.
3. For visual changes, consider narrow phones (320–390px), large phones, tablets, and desktop. Use semantic HTML, visible keyboard focus, and useful image alt text.

## Conventions

- Content lives in Markdown and `_data/*.yml`; shared structure belongs in `_layouts/` and `_includes/`.
- Shared colours, typography, and spacing tokens belong in `assets/css/main.css`. Page CSS should use these tokens where practical.
- Use `relative_url` for local links and assets, and `absolute_url` for canonical/social metadata. Keep external URLs explicit.
- Preserve the permalinks of published pages and posts. If a URL must change, plan a redirect before removal.
- Use local, optimised images for portfolio visuals. Do not hotlink company logos; check usage rights and provide a text fallback.
- Avoid adding a framework or JavaScript dependency solely for a static presentation change. The Park&Ride tool is the only interactive feature today.
- Do not alter the separately maintained Park&Ride data pipeline from this repository.

## Verify changes

```sh
bundle exec jekyll build
python3 scripts/check_site_links.py _site
```

For layout work, also inspect Home, About, CV, Projects, Research, and the Park&Ride tool in a browser at phone and desktop widths. Check keyboard navigation and the browser console. If browser inspection is unavailable, report that limit plainly.

`.github/workflows/verify.yml` runs the build and local-link check in CI. Deployment is controlled separately in GitHub Pages settings.
