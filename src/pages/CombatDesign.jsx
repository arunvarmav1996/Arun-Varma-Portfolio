import { Link } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta.js'
import { combatFlow, combatHeadline, combatPrinciples } from '../data/principles.js'
import { getProject } from '../data/projects/index.js'
import { DesignDecision, PageHeader, Reveal, Section } from '../components/design/Blocks.jsx'
import EncounterDiagram from '../components/design/EncounterDiagram.jsx'
import { PlayerFlowDiagram } from '../components/design/Flow.jsx'

export default function CombatDesign() {
  usePageMeta('Combat Design', combatHeadline)
  const arena = getProject('pump-hall')
  return (
    <>
      <PageHeader
        kicker="Combat design"
        title={combatHeadline}
        lead="I build an encounter from the position I expect the player to hold, then ask what makes them leave it and where they can go."
      />
      <div className="page">
        <section className="grid gap-x-10 gap-y-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-3">
          {combatPrinciples.map((p) => (
            <Reveal key={p.name}>
              <article className="border-t-2 border-brass pt-4">
                <h2 className="h3">{p.name}</h2>
                <p className="label mt-2 text-brass">{p.line}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-dim">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </section>

        {arena && (
          <Section
            title="One arena, six phases"
            intro={`Draft layout for ${arena.title}. Step through the phases to see which enemy removes which kind of safety.`}
          >
            <EncounterDiagram map={arena.map} phases={arena.phases} />
          </Section>
        )}

        {arena?.encounter && (
          <Section title="Who controls which space" intro={arena.encounter.intro}>
            <dl className="border-t border-ink-700">
              {arena.encounter.factors.map((f) => (
                <DesignDecision key={f.label} {...f} />
              ))}
            </dl>
          </Section>
        )}

        <Section title="Encounter structure" intro="The shape I start from. Every step exists to make the next decision necessary.">
          <PlayerFlowDiagram steps={combatFlow} />
          {arena && (
            <Link to={`/projects/${arena.slug}`} className="btn mt-10">
              Read the encounter case study
            </Link>
          )}
        </Section>
      </div>
    </>
  )
}
