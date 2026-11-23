# DataxAgents website

Source for **https://dataxagents.github.io**, the site of *DataxAgents: Workshop on Data Systems for AI Agents* (proposed, co-located with ACM SIGMOD/PODS 2027).

Built with [Astro](https://astro.build) as a fully static site: one plain stylesheet in the style of the SIGMOD/PODS site, a few lines of inline JS, no trackers.

## Edit content

**All content lives in [`src/data/site.yaml`](src/data/site.yaml).** Dates, news, topics, program, speakers, organizers, accepted papers, and contact info are all there. You normally never need to touch any other file.

- Write `TBD` for any unknown value; it renders as a subtle "TBD" badge.
- Text fields support `**bold**`, `*italic*`, `` `code` ``, and `[links](https://...)`.
- Important dates with a `deadline: YYYY-MM-DD` are struck through automatically after 11:59 PM AoE on that day.
- Remove the "Tentative" banner by setting `status.show: false` once the workshop is confirmed.
- Photos: put images in `public/img/organizers/` or `public/img/speakers/` and set `photo: /img/...` on the person. Without a photo, an initials avatar is shown.

Push to `main` and the site redeploys in about a minute.

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:4321, live reload
npm run build      # outputs to dist/
npm run preview    # serve the built site
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main` (or manually via *Actions → Deploy to GitHub Pages → Run workflow*). In the repo settings, **Settings → Pages → Source** must be set to **GitHub Actions**. No secrets or deploy keys are needed.

## Layout

```
src/data/site.yaml      all editable content
src/pages/              one file per page (Home, CFP, Program, Speakers, Organizers, Papers, Contact)
src/components/         dates list, person/speaker cards, avatar, hero figure
src/layouts/Base.astro  header, status banner, footer, SEO tags
src/styles/global.css   the single stylesheet
public/                 favicon, social image, robots.txt, photos
```

The social image is `public/og-image.svg`; after editing it, regenerate the PNG with `npm run og` (needs `rsvg-convert`, e.g. `brew install librsvg`).
