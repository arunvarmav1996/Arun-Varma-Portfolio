import usePageMeta from '../lib/usePageMeta.js'
import { projects } from '../data/projects/index.js'
import { PageHeader, ProjectFeature, Reveal } from '../components/design/Blocks.jsx'

export default function Projects() {
  usePageMeta('Work', 'Design case studies: level design, combat encounters, mission design, narrative environments and prototypes.')
  const concepts = projects.filter((p) => p.status === 'concept').length
  return (
    <>
      <PageHeader
        kicker="Work"
        title="Design case studies"
        lead="Six projects covering a full level, a combat encounter, a multi-route space, a narrative environment, a mission on paper and a traversal prototype."
      >
        {concepts > 0 && (
          <p className="mt-6 max-w-prose border-l-2 border-brass pl-4 text-[15px] text-bone-dim">
            {concepts} of {projects.length} are planned concepts. Each shows the design intent, a draft map and the test plan.
            Results are added only after real playtests.
          </p>
        )}
      </PageHeader>
      <div className="page">
        {projects.map((p, i) => (
          <Reveal key={p.slug}>
            <ProjectFeature project={p} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </>
  )
}
