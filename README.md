# Nathan Wang-Ly's website

A personal portfolio built with Jekyll and hosted at <https://nathanwangly.github.io>.

## Run locally

Install Ruby 3.2.2 (see `.ruby-version`) and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000/`. To check the generated site without starting a server:

```sh
bundle exec jekyll build
python3 scripts/check_site_links.py _site
```

The build writes to `_site/`, which is ignored by Git. The link check covers local links and assets in generated HTML; it does not check external websites or visual layout.

## Where things live

| Area | Source |
| --- | --- |
| Shared page shell and navigation | `_layouts/`, `_includes/` |
| Main pages | `index.md`, `about.md`, `cv.md`, `projects.md`, `research.md` |
| CV, project list, publications | `_data/*.yml` |
| Project detail pages and posts | `_projects/`, `_posts/` |
| Shared and page-specific styles | `assets/css/` |
| Park&Ride interactive tool | `_projects/carpark_tracker.md`, `assets/js/carpark_tracker.js` |
| Images and downloadable papers | `assets/images/`, `assets/pdfs/` |

For repository conventions and an agent checklist, see [AGENTS.md](AGENTS.md).

## Editing content

- Edit CV entries in `_data/experience.yml`, project summaries in `_data/projects.yml`, and publications in `_data/publications.yml`.
- Add a long project page in `_projects/` only when it needs its own URL. The project list currently has separate summary data; keep both entries in sync.
- Add posts as `_posts/YYYY-MM-DD-slug.md` with front matter matching the existing post.
- Use `relative_url` for internal links and assets in Liquid templates and Markdown files that contain HTML. Preserve existing public URLs when reorganising files.
- Keep images in `assets/images/`; use descriptive alt text and appropriately sized assets.

## Publishing

This repository has no custom deployment workflow. GitHub Pages publishing is configured in the repository's Pages settings, which should be checked before changing the deployment process. The workflow in `.github/workflows/verify.yml` validates pull requests and pushes; it does not publish the site.
