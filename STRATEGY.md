# Portfolio strategy

Working document for the site in this folder. Everything marked `[ADD ...]` is yours to supply.

## 1. Overall strategy

A hiring lead gives a junior portfolio well under a minute before deciding whether to keep looking. The site is built so that minute lands on **design reasoning**, not on a list of tools.

- **One claim, repeated everywhere:** "I design player experiences, and I can show why each decision exists."
- **Case studies, not project cards.** Every project follows the same spine: intent, design, prototype, playtest, problem, iteration, result.
- **Maps and greyboxes before beauty shots.** Level leads look for top-down maps, blockouts and before/after changes. Those sit above final screenshots on every page.
- **Honest about status.** Nothing is built yet, so every project is labelled a planned concept. Predicted risks and test plans are shown as plans; results stay as placeholders until you have real ones. A reviewer who spots one invented playtest result discounts the whole site.
- **Junior positioning.** Copy talks about potential, reasoning and iteration. No seniority claims.

## 2. Visual direction

Reference point: a level designer's annotated paper map pinned beside a greybox, not a game store page.

| Token | Value | Use |
|---|---|---|
| Graphite 950 | `#131416` | Page background |
| Graphite 900 / 800 | `#1A1C1F` / `#22252A` | Panels, map rooms |
| Graphite 600 | `#3D424A` | Rules, grid lines |
| Bone | `#ECE6DA` | Primary text (warm off-white) |
| Bone dim / mute | `#B9B3A8` / `#8F8B82` | Body text / labels |
| Brass | `#C8A24A` | Single accent: critical path, links, active state |

Map-only semantic colours (never used as decoration): combat `#C2674E`, traversal `#6F9BC0`, narrative `#A68FC4`, optional `#86A886`. Each also has its own line style, so meaning never depends on colour alone.

Type: **Barlow Condensed** for headlines (tall, film-title proportions), **IBM Plex Sans** for reading, **IBM Plex Mono** only for map annotations and metadata, the way a drawing is lettered.

Motion: the hero's critical path draws once on load; pages fade on navigation; sections ease in on scroll; annotations highlight on hover. All disabled under `prefers-reduced-motion`.

## 3. Sitemap

```
/                    Home
/projects            All case studies            (nav: WORK)
/projects/:slug      Case study template
/level-design        Level design principles     (nav: LEVEL DESIGN)
/combat-design       Combat philosophy + arena   (nav: COMBAT DESIGN)
/process             Pipeline + design documents (nav: PROCESS)
/about               About + skills              (nav: ABOUT)
/resume              View / download             (nav: RESUME)
/contact             Contact (footer + CTA)
```

## 4. Homepage hierarchy

1. **Hero**: positioning line, headline, two-sentence summary, two calls to action. Beside it, a live annotated level map with the critical path drawing itself. Answers "who, and what kind of designer" in one screen.
2. **Three featured case studies**: full-width rows, each with a map, the design problem in one paragraph, and tags. Answers "what is the best work".
3. **The spine**: intent to result in seven steps. Answers "how do they work".
4. **Two philosophy teasers**: level design and combat design, each one sentence plus a link.
5. **Resume and contact strip.**

## 5. Recommended projects

Build order matters. 01 and 02 alone make an interviewable portfolio; add the rest in order.

| # | Working title | Type | Target role |
|---|---|---|---|
| 01 | The Forgotten Facility | 15-20 minute linear action-adventure level | Level / Mission Designer |
| 02 | Pump Hall | Single combat encounter study | Combat / Encounter Designer |
| 03 | Customs Yard | Multi-route combat space | Level / Combat Designer |
| 04 | Relay Station | Narrative environment, no dialogue | Level / Narrative Designer |
| 05 | Night Crossing | Mission design study (paper + beat map) | Mission Designer |
| 06 | Ledge and Mantle | Traversal prototype | Technical / Gameplay Designer |

## 6. What each project must demonstrate

- **01**: pacing control over a full level; guidance without waypoints; one optional route; a reveal; a quiet beat; an escalating final encounter. Needs map, pacing graph, greybox, and at least two documented iterations.
- **02**: enemies that create reasons to move; cover that is never permanently safe; phases that change who owns the arena. Needs annotated arena, enemy matrix, before/after of at least one layout change.
- **03**: four approaches from geometry alone, in a bounded space. Needs route overlay and footage of each route.
- **04**: a story the player can retell without being told. Needs discovery-order map and a test where players describe what happened.
- **05**: mission structure and tension/release on paper. Needs beat sheet, pacing graph, mission flow document.
- **06**: implementation in service of feel. Needs rule list, tuning values, a short clip, and the level-design metrics the mechanic implies.

## 7. Design system

- Spacing on an 8px base; sections separated by 96-160px on desktop.
- Max content width 1240px; reading column capped near 68 characters.
- Thin 1px rules and a faint drafting grid; square corners; no shadows, gradients or glows.
- Buttons: solid brass (primary), outlined bone (secondary). Visible focus ring everywhere.
- Annotation language: numbered circular markers, same number in the map and in the note beside it. Every note explains a reason, never just names an object.

## 8. Reusable components

All in `src/components/design/`.

| Component | Purpose |
|---|---|
| `LevelMap` | Data-driven top-down map: zones, paths, numbered annotations, legend filter |
| `EncounterDiagram` | `LevelMap` plus a phase stepper that brings in enemies and sightlines |
| `EnemyPlacementMap`, `SightlineDiagram`, `CriticalPathOverlay` | Preset views of `LevelMap` |
| `PacingGraph` | Intensity over time, coloured by beat type |
| `BeatTimeline` | Ordered mission beats |
| `PlayerFlowDiagram` | Step and branch flow with a reason per step |
| `AnnotatedScreenshot` | Image with numbered callouts; shows a labelled placeholder until you add the image |
| `VideoEmbed` | Video or placeholder |
| `ImageComparison` / `BeforeAfter` | Slider between two images |
| `IterationComparison` | Problem / why / change / result |
| `PlaytestFinding` | Tested / expected / observed / surprised / changed |
| `DesignPillar`, `DesignCallout`, `DesignDecision` | Short reasoning blocks |
| `ProjectMetadata` | Role, engine, time, team, responsibilities |
| `DocumentPreview` | Document cover with contents list and download |

## 9. Folder structure

```
portfolio/
  public/            images, videos, documents, resume.pdf, _redirects
  src/
    data/
      site.js        name, email, links, skills (edit this first)
      projects/      one file per project + index.js
      principles.js  level and combat principles
      process.js     pipeline steps and design documents
    components/
      layout/        Header, Footer, Layout
      design/        components listed above
    pages/           one file per page
    lib/             shared constants and hooks
```

Adding a project: copy a file in `src/data/projects/`, edit it, add it to `index.js`.

## 10. Assets to prepare

Per project (exact list is on each case study page, under "Assets still needed"):

1. Top-down map exported from your own paper design (replace the draft maps in the data files).
2. Greybox screenshots: 4-6 per level, same camera positions you will reuse after iteration.
3. Before/after pairs for each layout change.
4. 60-90 second gameplay clip per project; one 3-5 minute walkthrough for 01.
5. Playtest notes: who, how many, what you asked, what they did.
6. One PDF per design document (level design document, encounter document, beat sheet, enemy matrix, playtest report).
7. Optional downloadable build for 01 and 02.

Site-wide: name, email, LinkedIn, resume PDF, a real list of tools you can defend in interview, degree details.
