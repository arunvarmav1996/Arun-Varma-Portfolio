import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LevelMap from './LevelMap.jsx'
import { ImageComparison, Placeholder } from './Media.jsx'

// Quiet scroll entrance. Content is visible without JavaScript or with reduced motion.
export function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return el?.classList.add('is-in')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

export function PageHeader({ kicker, title, lead, children }) {
  return (
    <header className="grid-bg border-b border-ink-600">
      <div className="page py-16 sm:py-24">
        {kicker && <p className="label mb-5 text-brass">{kicker}</p>}
        <h1 className="h1 max-w-5xl">{title}</h1>
        {lead && <p className="lead mt-7">{lead}</p>}
        {children}
      </div>
    </header>
  )
}

// Numbered case-study section. Numbers are a real sequence: the order a reviewer reads in.
export function Section({ n, title, intro, children, id }) {
  return (
    <section id={id} className="border-t border-ink-600 py-14 sm:py-20">
      <Reveal>
        <div className="mb-9 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          {n && <span className="font-mono text-sm text-brass">{n}</span>}
          <h2 className="h2">{title}</h2>
        </div>
        {intro && <p className="lead mb-10">{intro}</p>}
        {children}
      </Reveal>
    </section>
  )
}

export function ConceptBadge({ project }) {
  if (project.status !== 'concept') return null
  return (
    <span className="inline-block border border-dashed border-brass px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-brass">
      Planned concept{project.workingTitle ? ', working title' : ''}
    </span>
  )
}

export function DesignPillar({ name, text }) {
  return (
    <div className="border-t-2 border-brass pt-4">
      <h3 className="font-display text-2xl font-semibold uppercase tracking-wide">{name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-bone-dim">{text}</p>
    </div>
  )
}

// A single reasoned statement set apart from body text.
export function DesignCallout({ label = 'Design intent', children }) {
  return (
    <aside className="max-w-prose border-l-2 border-brass bg-ink-900 py-4 pl-5 pr-4">
      <p className="label mb-2 text-brass">{label}</p>
      <div className="text-lg leading-relaxed text-bone">{children}</div>
    </aside>
  )
}

// A named factor and the reason behind it.
export function DesignDecision({ label, text }) {
  return (
    <div className="grid gap-x-6 gap-y-1 border-b border-ink-700 py-4 sm:grid-cols-[13rem_1fr]">
      <dt className="label pt-1 text-bone">{label}</dt>
      <dd className="text-[15px] leading-relaxed text-bone-dim">{text}</dd>
    </div>
  )
}

export function ProjectMetadata({ meta }) {
  const rows = [
    ['Role', meta.role],
    ['Engine', meta.engine],
    ['Development time', meta.time],
    ['Team', meta.team],
  ]
  return (
    <dl className="panel divide-y divide-ink-700">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 px-4 py-3">
          <dt className="label pt-0.5">{k}</dt>
          <dd className="text-[15px] text-bone">{v}</dd>
        </div>
      ))}
      <div className="grid grid-cols-[9rem_1fr] gap-3 px-4 py-3">
        <dt className="label pt-0.5">Responsibilities</dt>
        <dd>
          <ul className="space-y-1 text-[15px] text-bone">
            {meta.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  )
}

const Field = ({ label, children, pending }) => (
  <div className="px-4 py-3">
    <p className="label mb-1">{label}</p>
    <p className={`text-[15px] leading-relaxed ${pending ? 'font-mono text-sm text-brass' : 'text-bone-dim'}`}>{children}</p>
  </div>
)

/*
  IterationComparison
  Real entry:    { version, problem, why, change, result, before, after }
  Planned entry: { risk, why, test, fallback }  (shown until a real entry replaces it)
*/
export function IterationComparison({ entry, index }) {
  const real = Boolean(entry.problem)
  return (
    <article className="panel">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-600 px-4 py-3">
        <span className="font-mono text-sm text-bone">
          {real ? entry.version || `Version ${String(index + 1).padStart(2, '0')}` : `Risk ${String(index + 1).padStart(2, '0')}`}
        </span>
        <span className={`label ${real ? 'text-optional' : 'text-brass'}`}>{real ? 'Tested and changed' : 'Predicted, not yet tested'}</span>
      </header>
      <div className="grid divide-y divide-ink-700 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="divide-y divide-ink-700">
          <Field label={real ? 'Problem' : 'Problem I expect'}>{real ? entry.problem : entry.risk}</Field>
          <Field label={real ? 'Why it happened' : 'Why it would happen'}>{entry.why}</Field>
        </div>
        <div className="divide-y divide-ink-700">
          <Field label={real ? 'Change' : 'Planned change if it does'}>{real ? entry.change : entry.fallback}</Field>
          {real ? <Field label="Result">{entry.result}</Field> : <Field label="How I will check">{entry.test}</Field>}
          {!real && (
            <Field label="Result" pending>
              [ADD PLAYTEST RESULT]
            </Field>
          )}
        </div>
      </div>
      <div className="border-t border-ink-600 p-4">
        <ImageComparison before={entry.before} after={entry.after} />
      </div>
    </article>
  )
}

/*
  PlaytestFinding
  { tested, players, expected, observed, surprised, changed }
  Missing fields show as placeholders, so a plan can be published before results.
*/
export function PlaytestFinding({ finding }) {
  const f = finding
  const rows = [
    ['What I tested', f.tested],
    ['What I expected', f.expected],
    ['What players did', f.observed, '[ADD PLAYTEST RESULT]'],
    ['What surprised me', f.surprised, '[ADD PLAYTEST RESULT]'],
    ['What changed', f.changed, '[ADD PLAYTEST RESULT]'],
  ]
  return (
    <div className="panel grid divide-y divide-ink-700 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
      {rows.map(([label, value, missing], i) => (
        <div key={label} className={`${i > 0 ? 'lg:border-l lg:border-ink-700' : ''} ${i % 2 ? 'sm:border-l sm:border-ink-700' : ''} sm:border-b sm:border-ink-700 lg:border-b-0`}>
          <Field label={label} pending={!value}>
            {value || missing}
          </Field>
        </div>
      ))}
    </div>
  )
}

// Large case-study row used on Home and Projects. The map is the lead image until a screenshot exists.
export function ProjectFeature({ project, flip = false }) {
  const p = project
  const to = `/projects/${p.slug}`
  return (
    <article className="grid items-start gap-8 border-t border-ink-600 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12">
      <Link to={to} aria-label={`${p.title} case study`} className={`group block lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        {p.hero?.src ? (
          <img src={p.hero.src} alt="" loading="lazy" className="block w-full border border-ink-600" />
        ) : p.map ? (
          <div className="transition-opacity group-hover:opacity-90">
            <LevelMap map={p.map} compact phase={p.phases ? 4 : undefined} />
          </div>
        ) : (
          <Placeholder slot={p.hero?.slot} spec={p.hero?.spec} ratio="5 / 3" />
        )}
        <p className="label mt-2">
          {p.hero?.src ? 'Final screenshot' : p.map ? `${p.map.title}. Blockout image to follow.` : 'Asset to follow'}
        </p>
      </Link>
      <div className="lg:col-span-5">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-brass">Project {p.number}</span>
          <ConceptBadge project={p} />
        </div>
        <h3 className="h2">
          <Link to={to} className="transition-colors hover:text-brass">
            {p.title}
          </Link>
        </h3>
        <p className="label mt-3 text-bone-dim">{p.genre}</p>
        <p className="label mt-1">{p.disciplines.join(' • ')}</p>
        <p className="body mt-5">{p.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        <Link to={to} className="btn-ghost mt-7">
          View case study →
        </Link>
      </div>
    </article>
  )
}
