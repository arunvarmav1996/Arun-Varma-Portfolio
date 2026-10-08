import { Link } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta.js'
import { site, spine } from '../data/site.js'
import { featured, projects } from '../data/projects/index.js'
import { combatHeadline, levelPhilosophy } from '../data/principles.js'
import LevelMap from '../components/design/LevelMap.jsx'
import { ProjectFeature, Reveal } from '../components/design/Blocks.jsx'
import { Spine } from '../components/design/Flow.jsx'

export function ResumeButton({ className = 'btn-ghost', label = 'Download resume' }) {
  return site.resumeUrl ? (
    <a href={site.resumeUrl} download className={className}>
      {label}
    </a>
  ) : (
    <Link to="/resume" className={className}>
      {label}
    </Link>
  )
}

export default function Home() {
  usePageMeta(null, site.tagline)
  const flagship = projects[0]

  return (
    <>
      <section className="grid-bg border-b border-ink-600">
        <div className="page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <div className="lg:col-span-6">
            <p className="label mb-6 text-brass">{site.positioning}</p>
            <h1 className="h1">Designing Spaces for Combat, Exploration &amp; Story.</h1>
            <p className="lead mt-7">
              I'm a Game Designer focused on level design, combat encounters and narrative gameplay. I enjoy creating
              action-adventure experiences where environment, mechanics and story work together to guide the player.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/projects" className="btn">
                View design work
              </Link>
              <ResumeButton />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Link to={`/projects/${flagship.slug}`} aria-label={`${flagship.title} case study`} className="block">
              <LevelMap map={flagship.map} compact animate />
            </Link>
            <div className="mt-3 flex flex-wrap justify-between gap-2">
              <span className="label">
                Project {flagship.number}: {flagship.title}
              </span>
              <span className="label">Critical path, 8 annotated decisions</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page pt-20 sm:pt-28">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="h2">Featured case studies</h2>
          <Link to="/projects" className="link font-mono text-xs uppercase tracking-[0.14em]">
            All {projects.length} projects
          </Link>
        </div>
        <p className="body mb-6">
          Each study follows the same order: what the player should experience, how the space delivers it, what testing
          showed and what changed.
        </p>
        {featured.map((p, i) => (
          <Reveal key={p.slug}>
            <ProjectFeature project={p} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </section>

      <section className="page pt-20 sm:pt-28">
        <Reveal>
          <h2 className="h2 max-w-4xl">I don't just build environments. I design player experiences.</h2>
          <p className="body mb-9 mt-5">
            Every project on this site is structured around the same seven steps, so you can find the reasoning,
            the test and the change in the same place each time.
          </p>
          <Spine steps={spine} />
          <Link to="/process" className="btn-ghost mt-8">
            See the full process
          </Link>
        </Reveal>
      </section>

      <section className="page grid gap-px pt-20 sm:pt-28 md:grid-cols-2">
        {[
          { to: '/level-design', kicker: 'Level design', quote: levelPhilosophy, cta: 'Level design principles' },
          { to: '/combat-design', kicker: 'Combat design', quote: combatHeadline, cta: 'Combat design breakdown' },
        ].map((b) => (
          <Reveal key={b.to} className="panel flex flex-col justify-between p-7 sm:p-10">
            <div>
              <p className="label mb-5 text-brass">{b.kicker}</p>
              <p className="font-display text-3xl font-medium uppercase leading-[1.05] tracking-wide sm:text-4xl">{b.quote}</p>
            </div>
            <Link to={b.to} className="btn-ghost mt-9 self-start">
              {b.cta}
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  )
}
