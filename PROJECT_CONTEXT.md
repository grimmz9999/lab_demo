# Project Context: Sang-ri Yi Lab Website Demo

## Current Project

Main working folder:

`C:\Users\DELL\Documents\Codex\2026-06-09\pdf\outputs\sangri-static-revised`

This is a static HTML/CSS/JS website demo for Dr. Sang-ri Yi's Engineering Risk, Uncertainty, and Resilience Lab at Rice University.

The current demo is based on content from:

- `https://uncertainty.blogs.rice.edu/`
- `https://uncertainty.blogs.rice.edu/research/`
- `https://uncertainty.blogs.rice.edu/teaching/`

The main files are:

- `index.html`
- `styles.css`
- `script.js`
- `research-demo.css`
- `research-demo.js`
- `assets/research/research-content.js`

## Overall Design Direction

The desired style is polished, editorial, restrained, and academic, inspired by BBC/OpenAI/Anthropic pages rather than a generic university WordPress site.

Important visual preferences:

- Keep the site clean, concise, and organized.
- Avoid redundant explanatory sections.
- Use wide, well-aligned section titles.
- Use thin gray dividers between major sections.
- Keep section gaps relatively compact.
- Use `Inter` for navigation, metadata, buttons, and compact labels.
- Use `Source Serif 4` for important prose paragraphs where a more editorial voice is desired.
- Avoid awkwardly cropped technical diagrams unless cropping is intentionally part of a background/hero treatment.
- Technical images should usually use `object-fit: contain`.
- Buttons/nav should feel close to OpenAI style: light weight, non-current nav black, hovered inactive nav gray, active item in a striking blue.
- Header should have transparent glass blur.

## Current Major Sections

The homepage currently includes:

- Hero / Computational UQ for resilient infrastructure
- About Sang-ri Yi
- Research
- Team
- Publications
- Teaching
- News
- Contact Us

The old redundant sections such as Welcome, Research Challenge, and Methods were removed.

## Hero / Header

The hero uses a generated UQ/multi-hazard background image:

- `assets/uq-hero-background-clean.png`

The first section uses image-as-background, with text over the blank/cleaner side of the image.

The site header is sticky, transparent, and glass-like:

- blurred background
- subtle saturation
- faint downward fade

The hero has a scroll snap-like behavior: scrolling down from the first screen moves to the Bio section.

## About Sang-ri Yi

The Bio section includes:

- Full personal intro text
- Portrait image
- Education box
- Profile buttons/icons for Google Scholar, LinkedIn, ORCID
- GitHub icon moved to the footer

Important preference:

- Portrait should not be cropped.
- Portrait should align visually with the bio/education content.
- Main bio paragraphs use a serif style similar to Anthropic-like editorial prose.
- Keywords/metadata/button text should remain Inter, not serif.

Current bio wording includes:

`Dr. Sang-ri Yi is an Assistant Professor of Civil and Environmental Engineering at Rice University. Her work connects uncertainty quantification (UQ) methods with open-source simulation tools and regional resilience analysis.`

## Team

The Team section uses an editorial roster design rather than a simple letter-avatar card.

Current state:

- No large title in the Team section.
- Section label is `Team`.
- `Current Members` is a folding section opened by default.
- `Alumni` is a parallel folding section with no members listed yet.
- Dr. Seonghyun Lim is shown as a compact horizontal profile row with portrait, role, name, serif bio, topic tags, Email, and Google Scholar link.
- Seonghyun's Google Scholar link uses the same local Google Scholar icon/button style as Sang-ri's profile links.
- Sang-ri should remain out of this section because PI information belongs in the Bio section.

Design intent:

- With one member, the section should not look empty.
- With more members later, repeat the same profile card pattern or group by member type such as Current Members, Graduate Students, Visiting Researchers, and Alumni.
- Bio prose should use `Source Serif 4`; role, topics, and links should use `Inter`.

## Research Section

The Research section is currently the modal/drawer design, chosen from three earlier demos.

Research data/content lives in:

`assets/research/research-content.js`

Research styling and interaction live in:

- `research-demo.css`
- `research-demo.js`

The four research areas are:

- Surrogate Modeling
- System-Reliability-based Resilience Assessment
- Regional Risk Assessment
- Random Vibrations and Random Fields

Current Research card order:

1. Text block: title and summary
2. Zoomable image
3. Keywords and applications
4. `Learn more` button

Current Research card preferences:

- The orange mini-title inside each card was removed as redundant.
- Card summary text uses `Source Serif 4`.
- Keywords/applications remain Inter.
- Keywords are italicized.
- Card columns are compact: smaller text and reduced padding.
- Card images are zoomable.

Current drawer preferences:

- Drawer opens from the right.
- Drawer header/close bar has glass blur like the main header.
- Drawer should not repeat the main overview/card image.
- Drawer detail cards show text on the left and image on the right.
- Drawer body text uses `Source Serif 4`.
- Drawer keywords/applications remain Inter.
- Images inside drawer are zoomable with a lightbox.

## Publications

The Publications section was redesigned into a compact unified list instead of side-by-side Journals / Conference columns.

Current preference:

- Short list only.
- Mix journals and selected conference presentations in date order.
- Use labels such as `Journal` and `Conference`.
- Keep rows compact with aligned full-width dividers.
- Preserve the `View complete publication list` button.

Avoid returning to a side-by-side layout because horizontal lines looked poorly aligned.

## Teaching

Teaching was added between Publications and News.

Source page:

`https://uncertainty.blogs.rice.edu/teaching/`

Teaching content centers on:

- `CEVE456/556 Uncertainty Quantification`
- Fall semesters
- Civil & Environmental Engineering
- Graduate / advanced undergraduate

Teaching section should feel like an academic course feature, not a syllabus card.

It uses:

- Featured image
- Compact teaching image strip/grid
- Serif course description paragraph
- `View course page` link

## News

News/activity images should be horizontally aligned by CSS.

Each activity should include at most one image.

The earlier explanatory line:

`Recent updates are grouped as a timeline...`

was removed.

## Contact

The section was renamed from `Join Us` to `Contact Us`.

Gaps before the Contact section were reduced.

## Icons / Footer

Profile/footer icon preferences:

- Use LinkedIn/GitHub icons in a style similar to OpenAI's footer icons.
- Google Scholar uses local asset:
  `assets/google-scholar.png`
- ORCID icon is styled as `iD`, with green lettering.
- GitHub icon links to:
  `https://github.com/yisangriB`

Footer should not include Research/Publications text links.

## Previous Demo Folders

Research migration demos were created here:

- `outputs/research-demos/accordion/`
- `outputs/research-demos/separate-page/`
- `outputs/research-demos/modal/`

The third/modal design was applied to the main site.

Those folders are references only; the main site is:

`outputs/sangri-static-revised`

## Current Cache Versions

At the time this context file was created:

- `styles.css?v=51`
- `research-demo.css?v=7`
- `research-demo.js?v=4`

When editing CSS/JS, update the cache query version in `index.html` so browser refreshes show changes.

## How To Continue In A New Chat

In a new Codex chat, say:

`Please read PROJECT_CONTEXT.md first, then inspect index.html, styles.css, research-demo.css, research-demo.js, and assets/research/research-content.js before editing.`

Do not assume the context file is enough by itself. Always inspect the actual files before making changes.
