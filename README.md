# Game design portfolio

React + Vite + Tailwind CSS. Nine pages, six case studies, all content driven by files in `src/data/`.

## Run

```bash
npm install
npm run dev      # local preview
npm run build    # production build in dist/
```

## Deploy

- **Netlify**: build command `npm run build`, publish directory `dist`. `public/_redirects` handles routing.
- **Vercel**: import the repo; `vercel.json` handles routing.

## First edits

1. `src/data/site.js`: name, email, LinkedIn, location, education detail, skills. Delete any skill you cannot defend in interview.
2. Put `resume.pdf` in `public/` and set `resumeUrl: '/resume.pdf'`.
3. Replace `[ADD ...]` placeholders as assets become available (list on each case study page under "Assets still needed", and in `STRATEGY.md`).

## Projects

One file per project in `src/data/projects/`. To add one: copy a file, edit it, import it in `index.js`.

- `status: 'concept'` shows the "Planned concept" label, the predicted-risk iteration cards and the asset checklist.
- When a project is built and tested, set `status: 'shipped'`, then fill:
  - `iterations: [{ version, problem, why, change, result, before, after }]`
  - `playtests: [{ tested, expected, observed, surprised, changed }]`
  - `lessons: ['...']`
  - `hero.src`, `video` or `videoEmbed`, `finalImage`, `build`
- Images go in `public/images/<project-slug>/` and are referenced as `/images/<project-slug>/file.jpg`.

### Maps

Maps are data on a 1000 x 600 canvas: `zones` (rectangles), `paths` (point lists), `markers` (numbered notes), and for encounters `enemies` and `sightlines` with a `phase`. The included maps are draft paper layouts to build against. Redraw them to match your greybox, or swap in an exported image with `AnnotatedScreenshot`.

## Honesty rule

Nothing on the site claims a result that has not happened. Keep it that way: untested projects show plans, tested projects show observations.
