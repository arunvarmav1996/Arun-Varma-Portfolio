import usePageMeta from '../lib/usePageMeta.js'
import { documents, pipeline } from '../data/process.js'
import { spine } from '../data/site.js'
import { PageHeader, Reveal, Section } from '../components/design/Blocks.jsx'
import { Spine } from '../components/design/Flow.jsx'
import { DocumentPreview } from '../components/design/Media.jsx'

export default function Process() {
  usePageMeta('Design Process', 'A ten-step level design pipeline from research to final implementation, with example design documents.')
  return (
    <>
      <PageHeader
        kicker="Process"
        title="Decisions come before the art pass"
        lead="Layout, pacing and encounter problems are found and fixed in greybox, where a change costs minutes. By the time a space looks finished, it has already been played."
      />
      <div className="page">
        <section className="py-16 sm:py-20">
          <ol>
            {pipeline.map((s, i) => (
              <li key={s.name}>
                <Reveal className="grid gap-x-8 gap-y-2 border-t border-ink-600 py-7 md:grid-cols-[5rem_minmax(0,22rem)_1fr]">
                  <span className="font-display text-5xl font-medium leading-none text-brass">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="h3 self-center">{s.name}</h2>
                  <div>
                    <p className="text-bone-dim">{s.text}</p>
                    <p className="label mt-3">Output: {s.output}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <Section title="The spine of every project" intro="The ten steps collapse to seven questions a reviewer can check on any case study.">
          <Spine steps={spine} />
        </Section>

        <Section
          id="documents"
          title="Design documents"
          intro="Working documents from the projects on this site. No employer or university confidential material."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {documents.map((d) => (
              <DocumentPreview key={d.name} {...d} />
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
