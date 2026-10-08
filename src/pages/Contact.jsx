import { Link } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta.js'
import { site } from '../data/site.js'
import { PageHeader } from '../components/design/Blocks.jsx'

export default function Contact() {
  usePageMeta('Contact', 'Contact details for level, combat and game design roles.')
  const rows = [
    { label: 'Email', value: site.email, href: site.email && `mailto:${site.email}`, missing: '[ADD EMAIL]' },
    { label: 'LinkedIn', value: site.linkedin && site.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: site.linkedin, missing: '[ADD LINKEDIN URL]' },
    // GitHub appears only when set: include it only if it holds relevant game work.
    site.github && { label: 'GitHub', value: site.github.replace(/^https?:\/\/(www\.)?/, ''), href: site.github },
  ].filter(Boolean)

  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Let's talk about the work"
        lead="Looking for a Level Designer, Combat Designer or Game Designer? I'd be happy to discuss my work."
      />
      <div className="page py-14 sm:py-20">
        <dl className="max-w-3xl border-t border-ink-600">
          {rows.map((r) => (
            <div key={r.label} className="grid gap-1 border-b border-ink-600 py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="label">{r.label}</dt>
              <dd>
                {r.value ? (
                  <a href={r.href} className="font-display text-3xl font-medium tracking-wide text-bone transition-colors hover:text-brass sm:text-4xl">
                    {r.value}
                  </a>
                ) : (
                  <span className="font-mono text-brass">{r.missing}</span>
                )}
              </dd>
            </div>
          ))}
          <div className="grid gap-3 border-b border-ink-600 py-6 sm:grid-cols-[10rem_1fr] sm:items-center">
            <dt className="label">Also</dt>
            <dd className="flex flex-wrap gap-3">
              <Link to="/projects" className="btn-ghost">
                Portfolio
              </Link>
              <Link to="/resume" className="btn-ghost">
                Resume
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}
