import { BEAT_TYPES } from '../../lib/kinds.js'

const Arrow = () => (
  <div aria-hidden="true" className="flex h-8 justify-center">
    <svg width="12" height="32" viewBox="0 0 12 32">
      <line x1="6" y1="0" x2="6" y2="26" stroke="#3D424A" strokeWidth="1.5" />
      <path d="M1 22 L6 30 L11 22" fill="none" stroke="#8F8B82" strokeWidth="1.5" />
    </svg>
  </div>
)

function Node({ n, title, why }) {
  return (
    <div className="panel grid grid-cols-[2.5rem_1fr] gap-x-3 p-4">
      <span className="font-mono text-sm text-brass">{n}</span>
      <div>
        <p className="label text-bone">{title}</p>
        {why && <p className="mt-1.5 text-[15px] leading-relaxed text-bone-dim">{why}</p>}
      </div>
    </div>
  )
}

/*
  PlayerFlowDiagram: ordered steps, each with the reason it exists.
  steps = [{ title, why } | { branch: [{ title, why }, ...] }]
*/
export function PlayerFlowDiagram({ steps, title }) {
  const num = (i) => String(i + 1).padStart(2, '0')
  return (
    <figure className="max-w-3xl">
      {title && <figcaption className="label mb-4 text-bone">{title}</figcaption>}
      <ol>
        {steps.map((s, i) => (
          <li key={i}>
            {i > 0 && <Arrow />}
            {s.branch ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {s.branch.map((b, j) => (
                  <Node key={j} n={`${num(i)}${'abcd'[j] || ''}`} {...b} />
                ))}
              </div>
            ) : (
              <Node n={num(i)} {...s} />
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}

/*
  BeatTimeline: mission beats in order, coloured by gameplay type.
  beats = [{ label, type: keyof BEAT_TYPES, text }]
*/
export function BeatTimeline({ beats }) {
  return (
    <ol className="relative max-w-3xl border-l border-ink-600 pl-6 sm:pl-8">
      {beats.map((b, i) => {
        const t = BEAT_TYPES[b.type] || {}
        return (
          <li key={i} className="relative pb-7 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-1.5 h-3 w-3 border border-ink-950 sm:-left-[39px]"
              style={{ background: t.color }}
            />
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span className="font-mono text-xs text-bone-mute">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="font-display text-xl font-semibold uppercase tracking-wide text-bone">{b.label}</h4>
              <span className="label" style={{ color: t.color }}>
                {t.label}
              </span>
            </div>
            <p className="mt-1 text-[15px] leading-relaxed text-bone-dim">{b.text}</p>
          </li>
        )
      })}
    </ol>
  )
}

// Horizontal spine: Intent to Result.
export function Spine({ steps }) {
  return (
    <ol className="grid grid-cols-2 border-l border-t border-ink-600 sm:grid-cols-4 lg:grid-cols-7">
      {steps.map((s, i) => (
        <li key={s} className="border-b border-r border-ink-600 px-4 py-5">
          <span className="font-mono text-xs text-brass">{String(i + 1).padStart(2, '0')}</span>
          <p className="mt-2 font-display text-xl font-semibold uppercase tracking-wide">{s}</p>
        </li>
      ))}
    </ol>
  )
}
