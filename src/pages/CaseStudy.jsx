import { Link, useParams } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta.js'
import { getProject, projects } from '../data/projects/index.js'
import NotFound from './NotFound.jsx'
import LevelMap from '../components/design/LevelMap.jsx'
import EncounterDiagram from '../components/design/EncounterDiagram.jsx'
import PacingGraph from '../components/design/PacingGraph.jsx'
import { BeatTimeline, PlayerFlowDiagram } from '../components/design/Flow.jsx'
import { AnnotatedScreenshot, Placeholder, VideoEmbed } from '../components/design/Media.jsx'
import {
  ConceptBadge,
  DesignCallout,
  DesignDecision,
  DesignPillar,
  IterationComparison,
  PlaytestFinding,
  ProjectMetadata,
  Section,
} from '../components/design/Blocks.jsx'

const STAGE_COLS = ['see', 'think', 'feel', 'do']

function Experience({ rows }) {
  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <div key={r.stage} className="panel grid lg:grid-cols-[14rem_1fr]">
          <h3 className="border-b border-ink-600 px-4 py-3 font-display text-xl font-semibold uppercase tracking-wide lg:border-b-0 lg:border-r">
            {r.stage}
          </h3>
          <dl className="grid sm:grid-cols-2 xl:grid-cols-4">
            {STAGE_COLS.map((c) => (
              <div key={c} className="border-b border-ink-700 px-4 py-3 last:border-b-0 sm:border-r xl:border-b-0 xl:last:border-r-0">
                <dt className="label mb-1 text-brass">{c}</dt>
                <dd className="text-[15px] leading-relaxed text-bone-dim">{r[c]}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const p = getProject(slug)
  usePageMeta(p ? p.title : 'Not found', p?.summary)
  if (!p) return <NotFound />

  const concept = p.status === 'concept'
  const next = projects[(projects.indexOf(p) + 1) % projects.length]
  const entries = p.iterations?.length ? p.iterations : p.risks || []
  const findings = p.playtests?.length ? p.playtests : p.playtestPlan ? [p.playtestPlan] : []

  // Sections are numbered in reading order; a section with no data is skipped and the rest renumber.
  const sections = [
    {
      title: 'Overview',
      body: (
        <>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <DesignCallout label="The design challenge">{p.challenge}</DesignCallout>
              {p.understand && (
                <dl className="mt-8 max-w-prose space-y-5">
                  <div>
                    <dt className="label mb-1 text-brass">What should the player understand?</dt>
                    <dd className="text-bone-dim">{p.understand.what}</dd>
                  </div>
                  <div>
                    <dt className="label mb-1 text-brass">How does the environment communicate it?</dt>
                    <dd className="text-bone-dim">{p.understand.how}</dd>
                  </div>
                </dl>
              )}
            </div>
            <div className="lg:col-span-5">
              <ProjectMetadata meta={p.meta} />
            </div>
          </div>
          <div className="mt-10">
            {p.hero?.slot === '[ADD GAMEPLAY VIDEO]' ? (
              <VideoEmbed src={p.hero.src} spec={p.hero.spec} />
            ) : (
              <AnnotatedScreenshot {...p.hero} alt={`${p.title} overview`} ratio="21 / 9" />
            )}
          </div>
        </>
      ),
    },
    p.pillars && {
      title: 'Design goals',
      body: (
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {p.pillars.map((x) => (
            <DesignPillar key={x.name} {...x} />
          ))}
        </div>
      ),
    },
    p.experience && {
      title: 'Player experience',
      intro: 'What the player should see, think, feel and do at each major stage.',
      body: <Experience rows={p.experience} />,
    },
    p.phases && p.map
      ? { title: 'Encounter flow', intro: 'Step through the phases. Each one changes which part of the arena is safe.', body: <EncounterDiagram map={p.map} phases={p.phases} /> }
      : p.map
        ? { title: 'Level flow', body: <LevelMap map={p.map} /> }
        : p.beats
          ? { title: 'Mission flow', intro: 'Eleven beats. Each changes location, objective or the relationship.', body: <BeatTimeline beats={p.beats} /> }
          : p.flow && { title: 'System logic', body: <PlayerFlowDiagram steps={p.flow.steps} title={p.flow.title} /> },
    p.pacing && {
      title: 'Pacing',
      intro: 'Planned intensity over time. Block width is duration, height is intensity.',
      body: <PacingGraph beats={p.pacing} />,
    },
    p.encounter && {
      title: 'Combat encounter design',
      intro: p.encounter.intro,
      body: (
        <dl className="border-t border-ink-700">
          {p.encounter.factors.map((f) => (
            <DesignDecision key={f.label} {...f} />
          ))}
        </dl>
      ),
    },
    p.tuning && {
      title: 'Tuning values',
      intro: 'Each value is named for what the player feels. Numbers are added once tuned in engine.',
      body: (
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-ink-600">
                {['Value', 'Setting', 'What it changes for the player'].map((h) => (
                  <th key={h} scope="col" className="label px-4 py-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700">
              {p.tuning.map((t) => (
                <tr key={t.name}>
                  <th scope="row" className="px-4 py-3 font-medium text-bone">
                    {t.name}
                  </th>
                  <td className="px-4 py-3 font-mono text-sm text-brass">{t.value}</td>
                  <td className="px-4 py-3 text-bone-dim">{t.feel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    p.guidance && {
      title: 'Player guidance',
      intro: 'How the player finds the way without waypoints.',
      body: (
        <dl className="border-t border-ink-700">
          {p.guidance.map((g) => (
            <DesignDecision key={g.cue} label={g.cue} text={g.text} />
          ))}
        </dl>
      ),
    },
    {
      title: 'Iteration',
      intro: p.iterations?.length
        ? 'What testing exposed, why it happened, what I changed and what the change did.'
        : 'Not yet tested. These are the problems I expect, why I expect them, and the change I will make if testing confirms them.',
      body: (
        <div className="space-y-6">
          {entries.map((e, i) => (
            <IterationComparison key={i} entry={e} index={i} />
          ))}
        </div>
      ),
    },
    {
      title: 'Playtesting',
      intro: p.playtests?.length ? null : 'Test plan. Observations are filled in after the first session.',
      body: (
        <div className="space-y-4">
          {findings.map((f, i) => (
            <PlaytestFinding key={i} finding={f} />
          ))}
        </div>
      ),
    },
    {
      title: 'Final result',
      body: (
        <div className="grid gap-4 md:grid-cols-2">
          <VideoEmbed src={p.video} embed={p.videoEmbed} spec="Gameplay clip or walkthrough of the finished project." />
          <AnnotatedScreenshot src={p.finalImage} slot="[ADD LEVEL BLOCKOUT IMAGE]" spec="Final screenshot from the same camera as the first greybox shot." />
          <div className="md:col-span-2">
            {p.build ? (
              <a href={p.build} className="btn">
                Download build
              </a>
            ) : (
              <span className="btn-disabled">[ADD DOWNLOADABLE BUILD]</span>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'What I learned',
      body: p.lessons?.length ? (
        <ul className="max-w-prose space-y-5 text-bone-dim">
          {p.lessons.map((l, i) => (
            <li key={i} className="border-l-2 border-brass pl-4">
              {l}
            </li>
          ))}
        </ul>
      ) : (
        <Placeholder
          slot="[ADD DESIGN LESSONS]"
          spec="Two or three specific cause-and-effect lessons from testing. Name what you built, what players did, why, and what fixed it."
          ratio="auto"
          className="max-w-prose py-10"
        />
      ),
    },
  ].filter(Boolean)

  return (
    <article>
      <header className="grid-bg border-b border-ink-600">
        <div className="page py-14 sm:py-20">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Link to="/projects" className="label hover:text-brass">
              Work
            </Link>
            <span className="label">/</span>
            <span className="font-mono text-sm text-brass">Project {p.number}</span>
            <ConceptBadge project={p} />
          </div>
          <h1 className="h1">{p.title}</h1>
          <p className="label mt-4 text-bone-dim">
            {p.type} • {p.genre}
          </p>
          <p className="lead mt-6">{p.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
          <nav aria-label="Sections" className="mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-600 pt-5">
            {sections.map((s, i) => (
              <a key={s.title} href={`#s${i + 1}`} className="label hover:text-brass">
                {String(i + 1).padStart(2, '0')} {s.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="page">
        {sections.map((s, i) => (
          <Section key={s.title} id={`s${i + 1}`} n={String(i + 1).padStart(2, '0')} title={s.title} intro={s.intro}>
            {s.body}
          </Section>
        ))}

        {concept && p.assets && (
          <section className="border-t border-ink-600 py-14">
            <h2 className="h3 mb-2">Assets still needed</h2>
            <p className="body mb-6">Build checklist for this page. Remove this block when the project is complete.</p>
            <ul className="panel divide-y divide-ink-700">
              {p.assets.map((a, i) => (
                <li key={i} className="grid gap-x-6 gap-y-1 px-4 py-3 md:grid-cols-[17rem_1fr]">
                  <span className="font-mono text-sm text-brass">{a.slot}</span>
                  <span className="text-[15px] text-bone-dim">{a.replaceWith}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="Next project" className="border-t border-ink-600 py-14">
          <p className="label mb-3">Next case study</p>
          <Link to={`/projects/${next.slug}`} className="h2 transition-colors hover:text-brass">
            {next.number} {next.title} →
          </Link>
        </nav>
      </div>
    </article>
  )
}
