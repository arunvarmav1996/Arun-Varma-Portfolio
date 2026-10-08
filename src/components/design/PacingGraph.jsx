import { BEAT_TYPES, COLORS } from '../../lib/kinds.js'

/*
  PacingGraph: intensity (0-10) over time.
  beats = [{ label, type: keyof BEAT_TYPES, minutes, intensity }]
  Each beat is a block as wide as its duration and as tall as its intensity.
*/
export default function PacingGraph({ beats }) {
  if (!beats?.length) return null
  const total = beats.reduce((t, b) => t + b.minutes, 0)
  const L = 56, R = 990, T = 16, B = 250
  const sx = (m) => L + (m / total) * (R - L)
  const sy = (v) => B - (v / 10) * (B - T)

  let acc = 0
  const blocks = beats.map((b, i) => {
    const x0 = sx(acc)
    acc += b.minutes
    const x1 = sx(acc)
    return { ...b, i, x0, x1, mid: (x0 + x1) / 2, y: sy(b.intensity), color: BEAT_TYPES[b.type]?.color || COLORS.mute }
  })
  const line = blocks.map((b) => `${b.mid},${b.y}`).join(' ')
  const tickStep = total > 12 ? 5 : total > 5 ? 2 : 1
  const ticks = []
  for (let m = 0; m <= total; m += tickStep) ticks.push(m)
  const usedTypes = [...new Set(beats.map((b) => b.type))]
  const fmt = (m) => (Number.isInteger(m) ? m : m.toFixed(1))

  return (
    <figure>
      <div className="overflow-x-auto border border-ink-600 bg-ink-900">
        <svg
          viewBox="0 0 1000 300"
          className="block h-auto w-full min-w-[620px]"
          role="img"
          aria-label={`Pacing graph: ${beats.length} beats over about ${fmt(total)} minutes. The beat list below gives each value.`}
        >
          {[0, 5, 10].map((v) => (
            <g key={v}>
              <line x1={L} x2={R} y1={sy(v)} y2={sy(v)} stroke={COLORS.line} strokeWidth="1" strokeDasharray={v ? '2 6' : undefined} />
              <text x={L - 10} y={sy(v) + 4} textAnchor="end" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill={COLORS.mute}>
                {v}
              </text>
            </g>
          ))}
          <text x="14" y={(T + B) / 2} fontSize="11" letterSpacing="1.5" fontFamily="IBM Plex Mono, monospace" fill={COLORS.mute} transform={`rotate(-90 14 ${(T + B) / 2})`} textAnchor="middle">
            INTENSITY
          </text>
          {blocks.map((b) => (
            <g key={b.i}>
              <rect x={b.x0 + 1} y={b.y} width={Math.max(b.x1 - b.x0 - 2, 1)} height={B - b.y} fill={b.color} opacity="0.22" />
              <line x1={b.x0 + 1} x2={b.x1 - 1} y1={b.y} y2={b.y} stroke={b.color} strokeWidth="3" />
            </g>
          ))}
          <polyline points={line} fill="none" stroke={COLORS.bone} strokeWidth="1.5" strokeLinejoin="round" opacity="0.8" />
          {blocks.map((b) => (
            <g key={b.i}>
              <circle cx={b.mid} cy={b.y} r="11" fill={COLORS.ground} stroke={COLORS.bone} strokeWidth="1" />
              <text x={b.mid} y={b.y + 4} textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill={COLORS.bone}>
                {b.i + 1}
              </text>
            </g>
          ))}
          {ticks.map((m) => (
            <text key={m} x={sx(m)} y={B + 20} textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill={COLORS.mute}>
              {m}
            </text>
          ))}
          <text x={(L + R) / 2} y="290" textAnchor="middle" fontSize="11" letterSpacing="1.5" fontFamily="IBM Plex Mono, monospace" fill={COLORS.mute}>
            TIME (MINUTES)
          </text>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        {usedTypes.map((t) => (
          <span key={t} className="label flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5" style={{ background: BEAT_TYPES[t].color }} />
            {BEAT_TYPES[t].label}
          </span>
        ))}
      </div>

      <ol className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((b) => (
          <li key={b.i} className="flex items-baseline gap-3 border-b border-ink-700 py-2">
            <span className="w-5 font-mono text-xs text-bone-mute">{b.i + 1}</span>
            <span className="flex-1 text-[15px] text-bone">{b.label}</span>
            <span className="label" style={{ color: b.color }}>
              {BEAT_TYPES[b.type]?.label}
            </span>
            <span className="label w-12 text-right">{fmt(b.minutes)} min</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
