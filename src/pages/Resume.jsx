import { Link } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta.js'
import { site } from '../data/site.js'
import { PageHeader } from '../components/design/Blocks.jsx'
import { Placeholder } from '../components/design/Media.jsx'

export default function Resume() {
  usePageMeta('Resume', `Resume for ${site.role}: level design, combat encounters and narrative gameplay.`)
  const has = Boolean(site.resumeUrl)
  return (
    <>
      <PageHeader kicker="Resume" title="Resume" lead="One page, PDF. The design work is on the case study pages.">
        <div className="mt-8 flex flex-wrap gap-3">
          {has ? (
            <>
              <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="btn">
                View resume
              </a>
              <a href={site.resumeUrl} download className="btn-ghost">
                Download PDF
              </a>
            </>
          ) : (
            <span className="btn-disabled">[ADD RESUME PDF]</span>
          )}
          <Link to="/projects" className="btn-ghost">
            View design work
          </Link>
        </div>
      </PageHeader>
      <div className="page py-14">
        {has ? (
          <object data={site.resumeUrl} type="application/pdf" aria-label="Resume PDF" className="h-[80vh] w-full border border-ink-600">
            <p className="body p-6">
              Your browser cannot display the PDF here.{' '}
              <a href={site.resumeUrl} className="link">
                Open the resume
              </a>
              .
            </p>
          </object>
        ) : (
          <Placeholder
            slot="[ADD RESUME PDF]"
            spec="Save a one-page PDF as public/resume.pdf, then set resumeUrl to '/resume.pdf' in src/data/site.js. It will preview here and both buttons will work."
            ratio="16 / 7"
          />
        )}
      </div>
    </>
  )
}
