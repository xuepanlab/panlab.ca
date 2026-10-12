# Pan Lab website redesign notes

This redesign is on the `redesign/science-discovery` branch. The `main` branch and live site have not been replaced.

## Design direction
- Science & Discovery visual style: deep teal, sage accents, white backgrounds and spacious typography.
- Responsive navigation shared across public pages.
- Minimal footer.
- Plain HTML and one shared `PanLab.css`; no framework or build step is required.

## Pages
- `index.html`: homepage and research highlights.
- `Research.html`: research themes and methods.
- `People.html`: compact staff/student lists and available public links.
- `Lab_News.html`: image-card news page.
- `Publications.html`: 27 peer-reviewed article cards, plus compact book chapter and conference presentation lists.
- `Join.html`: prospective student and postdoctoral information.
- `Teaching.html`: legacy redirect to Lab News, so old bookmarks do not lead to a dead page.
- `footer.html`: minimal shared footer fragment retained for the internal Lab page.

## Simple HTML maintenance

### Add a publication
Open `Publications.html`, copy one `<article class="publication-card">...</article>` block, then replace:
1. The image path in both `href` and `src`.
2. The title and DOI/publisher URL.
3. The year in the small metadata line.

The redesign currently uses relevant existing lab visuals as starter thumbnails rather than claiming they are the original figures for each paper. Replace them with manuscript-specific images or graphical abstracts when available.

### Add a news item
Open `Lab_News.html`, copy a `<article class="news-card">...</article>` block, then update the image, category, date, title, summary and link. Add new items near the top so the latest story appears first. The homepage has a separate featured-news card that can be updated when the headline story changes.

### Update a person
Open `People.html`, copy an existing `<article class="person-row">...</article>` block within the appropriate group. Update the image, name, role, and research description. Add contact links only when the individual has provided the relevant public profile.

## Items to verify before merging
- Several profiles still use `images/people/pending.jpg` because the repository does not currently provide a matching portrait path for those names. Replace with each person's approved photo when available.
- Confirm current student roles and the alumni list before publishing.
- Publication card thumbnails should be replaced with specific figures where practical.
- Preview the branch on desktop and mobile before merging to `main`.
