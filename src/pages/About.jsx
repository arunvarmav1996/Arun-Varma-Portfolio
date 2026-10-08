import { Link } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta.js'
import { site, skills } from '../data/site.js'
import { PageHeader, Section } from '../components/design/Blocks.jsx'
import { Placeholder } from '../components/design/Media.jsx'

export default function About() {
  usePageMeta('About', site.tagline)
  return (
    <>
      <PageHeader kicker="About" title="I like knowing why a space works" />
      <div className="page">
        <section className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <p className="lead">
              I'm a game designer with a background combining game development and technical implementation. I'm
              particularly interested in third-person action-adventure games where level design, combat and narrative
              work together.
            </p>
            <p className="body">
              I enjoy breaking down why spaces work: how a landmark guides the player, why an encounter forces movement,
              where tension should increase, and when the player needs room to recover.
            </p>
            <p className="body">
              Because I also understand implementation and game engines, I enjoy taking designs beyond documentation and
              building playable prototypes that can be tested and iterated.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Link to="/projects" className="btn">
                View design work
              </Link>
              <Link to="/process" className="btn-ghost">
                How I work
              </Link>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <dl className="panel divide-y divide-ink-700">
              <div className="px-4 py-4">
                <dt className="label mb-1">Education</dt>
                <dd className="text-bone">{site.education}</dd>
                <dd className={site.educationDetail ? 'text-[15px] text-bone-dim' : 'font-mono text-sm text-brass'}>
                  {site.educationDetail || '[ADD INSTITUTION AND YEAR]'}
                </dd>
              </div>
              <div className="px-4 py-4">
                <dt className="label mb-1">Looking for</dt>
                <dd className="text-bone">Junior, graduate and associate roles</dd>
                <dd className="text-[15px] text-bone-dim">Level, Combat, Encounter, Mission and Gameplay Design</dd>
              </div>
              <div className="px-4 py-4">
                <dt className="label mb-1">Based in</dt>
                <dd className={site.location ? 'text-bone' : 'font-mono text-sm text-brass'}>{site.location || '[ADD LOCATION]'}</dd>
              </div>
            </dl>
            <div className="mt-4">
              <Placeholder slot="[ADD PORTRAIT, OPTIONAL]" spec="A plain photo, or leave this out. Reviewers are here for the work." ratio="16 / 7" />
            </div>
          </aside>
        </section>

        <Section title="Skills" intro="Grouped by how much they matter for the roles I am applying for. Design first; tools and code in support.">
          <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
            {skills.map((g) => (
              <div key={g.group}>
                <h3 className="label mb-4 border-b border-ink-600 pb-3 text-brass">{g.group}</h3>
                <ul className={`gap-x-8 text-bone ${g.group === 'Design' ? 'sm:columns-2' : ''}`}>
                  {g.items.map((s) => (
                    <li key={s} className="break-inside-avoid border-b border-ink-700 py-2.5 text-[15px]">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
