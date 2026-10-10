# CV direction

Nathan approved replacing `/cv/` with his CV preview iteration. The page now uses `_data/cv.yml` for its overview and experience content and `cv.md` front matter for its title and description. The temporary `/cv-preview/` page has been removed.

This direction supersedes the earlier date-column CV suggestion in `docs/visual-review-recommendations.md`.

## Purpose and hierarchy

- The CV should give a quick read on Nathan's main companies and roles without requiring a long scroll, especially on mobile. It is a lightweight portfolio page, not a conventional résumé.
- Work experience has the highest visual priority. Education should remain visible, including the psychology bachelor's degree with honours and PhD, at a lower visual weight.
- Show concise information in each experience card. The design should accommodate additional roles over time.

## Published layout

- Use an overview card for a compact career profile: current role and company, recent companies, education, brief background points, and skill or interest tags. Keep the card free of a visible **Overview** heading; use **Summary** above the background points. Put the tags at the bottom of the card. Keep education compact and visually subordinate to work.
- On wide screens, the overview places summary and skills beside the facts. On narrower screens, it stacks them. Company logos have no borders.
- On mobile, keep at least `1.2rem` of padding inside the overview card so its content has breathing room.
- Use an **Experience** section below the overview, with horizontally arranged cards in reverse chronological order. The cards are static and show concise main-side content.
- Keep all experience cards the same height, determined by the tallest card's content in the experience rail. For companies with multiple roles, use a wider card with the company name, logo, and overall date range in the header. Arrange roles side by side with a horizontal connector that stays level even when titles wrap differently; end the line at the earliest role's marker. Put each role's title first, followed by its dates and teaser.
- Use the site's standard `h2` heading style for both **Summary** and **Experience**. Keep Summary inside the overview card and the Experience heading close to the card.
- Label the overview facts **Current role** and **Previous companies**. Let experience cards size to their content without excess blank space, while keeping them equal in height within the rail. Keep the current experience card's subtle gradient and border treatment.
- Keep **Education** beside **Previous companies** at every viewport width, with clear whitespace and no divider. Retain the UNSW logo and keep the education wording compact.
- Keep the Summary bullets in the site's body font, matching About copy and experience-card descriptions. On wide screens, let them use the full width of the overview's intro column. Use the display font for the **Summary** and **Experience** headings, company names, and role titles.
