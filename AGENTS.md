# Working on this site

This is a Jekyll site for GitHub Pages. Preserve its restrained, readable portfolio style and existing public URLs. Work on the requested scope and keep content claims faithful to the source.

## Site guidance

Before making a change, consult the relevant source-of-truth documents in [`docs/website/`](docs/website/README.md):

- [`intent.md`](docs/website/intent.md) for the site's purpose and audience.
- [`visual-design.md`](docs/website/visual-design.md) for visual preferences.
- [`product-principles.md`](docs/website/product-principles.md) for UX, structure, and implementation preferences.
- [`cv.md`](docs/website/cv.md) when working on the CV or its preview.
- [`about.md`](docs/website/about.md), [`projects.md`](docs/website/projects.md), [`posts.md`](docs/website/posts.md), or [`research.md`](docs/website/research.md) when working on those sections.

Treat these files as Nathan's preferences only where he has filled them in or explicitly confirmed them. Do not infer preferences from scaffold prompts. Follow the current request and the constraints in this file; if relevant guidance conflicts or leaves an important choice unresolved, ask Nathan before making that choice.

When Nathan confirms or changes a preference during a task, update the relevant `docs/website/` guidance in that task. Replace superseded guidance rather than adding a running history. Mark experiments and unresolved choices as provisional; do not turn an agent proposal or a temporary preview into a settled preference.

If enduring context for a section or component has no suitable topic file, create a short, focused Markdown file in `docs/website/` and link it from this section and `docs/website/README.md`. Distinguish the current implementation from Nathan's confirmed preferences, and leave unresolved choices open. Do not create a file for a one-off task detail.

## Author-owned content

- All site copy and content must be personally written by Nathan. Do not create, rewrite, polish, expand, or otherwise change copy without his express permission for that specific content change.
- This applies to page and section headings, titles, navigation labels, project descriptions, CV and research copy, posts, captions, alt text, metadata, and any other user-facing wording or claims.
- Agents may create and edit project guidance and other non-user-facing documentation in `docs/` without separate permission. Keep it faithful to Nathan's stated preferences and the repository's current decisions; do not treat it as published site copy.
- For UI or structural work, preserve existing wording exactly. Use neutral placeholders only when necessary, and make them clearly identifiable as placeholders rather than publishable copy.
- If a requested design or implementation change appears to require new or revised wording, leave the wording untouched and ask for express permission before changing it. Suggestions may be offered separately, but must not be inserted into the site.

## Human-editable content

- Give Nathan one obvious source for the content of each page or repeatable section. Use Markdown (and its front matter) for prose pages, and `_data/*.yml` for structured lists, cards, and other repeated content. Keep presentation logic in layouts and includes.
- When building or revising a data-driven section, put its editable wording, dates, links, image paths, and meaningful alt text in that section's content source. Avoid scattering page-specific copy through Liquid markup, CSS, or JavaScript. Keep generated text in scripts only when the interaction requires it, and document where Nathan edits it.
- Prefer one canonical source for content reused across views. If a provisional preview intentionally has independent copy, give it a clearly named source and document that distinction. Do not silently synchronize or rewrite Nathan's wording.
- Update `README.md`'s editing map when a content source is added or moved. Keep the relevant `docs/website/` guidance current when Nathan confirms a lasting preference.

## Before editing

1. Read `README.md` and inspect the page, data file, layout, and CSS affected by the task.
2. Check `git status --short`; do not overwrite unrelated work.
3. For visual changes, consider narrow phones (320–390px), large phones, tablets, and desktop. Use semantic HTML, visible keyboard focus, and useful image alt text.

## Conventions

- Content lives in Markdown and `_data/*.yml`; shared structure belongs in `_layouts/` and `_includes/`.
- The `/cv-preview/` content is in `_data/cv_preview.yml`; the published `/cv/` content is in `_data/experience.yml`. They are independent while the preview is under review.
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

For layout work, inspect Home, About, CV, Projects, Research, and the Park&Ride tool in the browser available within Codex at phone and desktop widths. Do not launch or control Nathan's personal Safari or another personal browser. Check keyboard navigation and the browser console. If the Codex browser is unavailable, report that limit plainly.

`.github/workflows/verify.yml` runs the build and local-link check in CI. Deployment is controlled separately in GitHub Pages settings.
