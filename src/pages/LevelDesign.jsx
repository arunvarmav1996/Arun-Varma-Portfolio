import { Link } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta.js'
import { levelPhilosophy, levelPrinciples } from '../data/principles.js'
import { projects } from '../data/projects/index.js'
import { PageHeader, Reveal, Section } from '../components/design/Blocks.jsx'
import ConceptDiagram from '../components/design/ConceptDiagram.jsx'
import LevelMap from '../components/design/LevelMap.jsx'
import PacingGraph from '../components/design/PacingGraph.jsx'

export default function LevelDesign() {
  usePageMeta('Level Design', levelPhilosophy)
  const flagship = projects[0]
  return (
    <>
      <PageHeader kicker="Level design" title="Levels control information" lead={levelPhilosophy} />
      <div className="page">
        <section className="grid gap-x-10 gap-y-14 py-16 sm:py-20 md:grid-cols-2">
          {levelPrinciples.map((p) => (
            <Reveal key={p.key}>
              <article className="grid gap-5 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:grid-cols-1 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                <ConceptDiagram name={p.key} />
                <div>
                  <h2 className="h3">{p.name}</h2>
                  <p className="label mt-2 text-brass">{p.line}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-bone-dim">{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </section>

        <Section title="Applied: one level, annotated" intro={`The same principles on the draft map for ${flagship.title}. Hover a number to find its note.`}>
          <LevelMap map={flagship.map} />
          <div className="mt-14">
            <h3 className="h3 mb-6">Its pacing plan</h3>
            <PacingGraph beats={flagship.pacing} />
          </div>
          <Link to={`/projects/${flagship.slug}`} className="btn mt-10">
            Read the full case study
          </Link>
        </Section>
      </div>
    </>
  )
}
