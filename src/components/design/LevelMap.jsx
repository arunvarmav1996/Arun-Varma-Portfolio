import { useId, useState } from 'react'
import { COLORS, ENEMY_KINDS, PATH_KINDS } from '../../lib/kinds.js'

/*
  LevelMap: data-driven top-down map on a 1000 x 600 canvas.

  map = {
    title, note, filterable,
    zones:   [{ kind: 'room'|'arena'|'high'|'low'|'cover'|'optional'|'quiet', x, y, w, h, label }],
    paths:   [{ kind: keyof PATH_KINDS, label?, points: [[x, y], ...] }],
    markers: [{ n, x, y, title, why }],          // numbered annotations
    enemies: [{ id, kind: 'M'|'R'|'H', x, y, phase, until? }],
    sightlines: [{ from: [x, y], to: [x, y], phase, until? }],
  }

  Props:
    phase    current encounter phase (enemies and sightlines appear from their phase)
    compact  map only: no legend, no annotation list (used for previews)
    animate  draw the critical path once on mount
    show     { zones, paths, markers, enemies, sightlines } to switch layers off
*/

const ZONE_STYLE = {
  room: { fill: COLORS.panel, stroke: COLORS.line, label: 'Interior' },
  arena: { fill: 'rgba(194,103,78,0.07)', stroke: COLORS.combat, label: 'Combat arena' },
  high: { fill: 'hatch', stroke: '#B9B3A8', label: 'High ground' },
  low: { fill: '#0E0F11', stroke: COLORS.line, dash: '4 4', label: 'Low ground' },
  cover: { fill: COLORS.mute, stroke: 'none', label: 'Cover' },
  optional: { fill: COLORS.ground, stroke: COLORS.optional, dash: '6 5', label: 'Optional space' },
  quiet: { fill: 'rgba(166,143,196,0.08)', stroke: COLORS.story, label: 'Narrative space' },
}

const inPhase = (item, phase) =>
  phase == null || (phase >= (item.phase ?? 1) && (item.until == null || phase <= item.until))

function Enemy({ kind, x, y }) {
  const c = COLORS.combat
  const shape =
    kind === 'R' ? (
      <polygon points={`${x},${y - 15} ${x + 14},${y + 11} ${x - 14},${y + 11}`} fill={COLORS.ground} stroke={c} strokeWidth="2" />
    ) : kind === 'H' ? (
      <rect x={x - 16} y={y - 16} width="32" height="32" fill={COLORS.ground} stroke={c} strokeWidth="3" />
    ) : (
      <rect x={x - 11} y={y - 11} width="22" height="22" transform={`rotate(45 ${x} ${y})`} fill={COLORS.ground} stroke={c} strokeWidth="2" />
    )
  return (
    <g className="marker-in">
      {shape}
      <text x={x} y={y + (kind === 'R' ? 7 : 4)} textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill={c}>
        {kind}
      </text>
    </g>
  )
}

export default function LevelMap({ map, phase, compact = false, animate = false, show = {} }) {
  const uid = useId().replace(/:/g, '')
  const [active, setActive] = useState(null)
  const [isolated, setIsolated] = useState(null)
  if (!map) return null

  const layers = { zones: true, paths: true, markers: true, enemies: true, sightlines: true, ...show }
  const zones = layers.zones ? map.zones || [] : []
  const paths = layers.paths ? map.paths || [] : []
  const markers = layers.markers ? map.markers || [] : []
  const enemies = layers.enemies ? (map.enemies || []).filter((e) => inPhase(e, phase)) : []
  const sightlines = layers.sightlines ? (map.sightlines || []).filter((s) => inPhase(s, phase)) : []

  const zoneKinds = [...new Set(zones.map((z) => z.kind))]
  const enemyKinds = [...new Set((map.enemies || []).map((e) => e.kind))]

  const svg = (
    <svg
      viewBox="0 0 1000 600"
      className="block h-auto w-full"
      role="img"
      aria-label={`${map.title || 'Level map'}. ${markers.length} numbered annotations are listed beside the map.`}
    >
      <defs>
        <pattern id={`hatch-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill={COLORS.panel} />
          <line x1="0" y1="0" x2="0" y2="8" stroke="#5A5F68" strokeWidth="2" />
        </pattern>
      </defs>

      {zones.map((z, i) => {
        const s = ZONE_STYLE[z.kind] || ZONE_STYLE.room
        return (
          <g key={i}>
            <rect
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              fill={s.fill === 'hatch' ? `url(#hatch-${uid})` : s.fill}
              stroke={s.stroke}
              strokeWidth="1.5"
              strokeDasharray={s.dash}
            />
            {z.label && !compact && (
              <text
                x={z.x + 8}
                y={z.y + 17}
                fontSize="11"
                letterSpacing="1.2"
                fontFamily="IBM Plex Mono, monospace"
                fill={COLORS.bone}
                opacity="0.72"
                paintOrder="stroke"
                stroke={COLORS.ground}
                strokeWidth="3"
              >
                {z.label.toUpperCase()}
              </text>
            )}
          </g>
        )
      })}

      {sightlines.map((s, i) => (
        <line
          key={i}
          className="marker-in"
          x1={s.from[0]}
          y1={s.from[1]}
          x2={s.to[0]}
          y2={s.to[1]}
          stroke={COLORS.combat}
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
      ))}

      {paths.map((p, i) => {
        const k = PATH_KINDS[p.kind] || PATH_KINDS.critical
        const dim = isolated && isolated !== p.kind
        const d = 'M' + p.points.map((pt) => pt.join(' ')).join(' L')
        const drawIt = animate && !k.dash
        const end = p.points[p.points.length - 1]
        return (
          <g key={i} opacity={dim ? 0.12 : 1} style={{ transition: 'opacity .25s' }}>
            <path
              d={d}
              fill="none"
              stroke={k.color}
              strokeWidth={k.width}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={drawIt ? undefined : k.dash || undefined}
              pathLength={drawIt ? 1 : undefined}
              className={drawIt ? 'draw-path' : undefined}
            />
            <circle cx={end[0]} cy={end[1]} r="5" fill={k.color} />
          </g>
        )
      })}

      {enemies.map((e) => (
        <Enemy key={e.id} {...e} />
      ))}

      {markers.map((m, i) => {
        const on = active === m.n
        return (
          <g
            key={m.n}
            className={animate ? 'marker-in' : undefined}
            style={animate ? { animationDelay: `${0.5 + i * 0.25}s` } : undefined}
            onMouseEnter={() => setActive(m.n)}
            onMouseLeave={() => setActive(null)}
          >
            <title>{`${m.n}. ${m.title}`}</title>
            <circle cx={m.x} cy={m.y} r="15" fill={on ? COLORS.brass : COLORS.ground} stroke={COLORS.brass} strokeWidth="1.5" />
            <text
              x={m.x}
              y={m.y + 4.5}
              textAnchor="middle"
              fontSize="13"
              fontWeight="500"
              fontFamily="IBM Plex Mono, monospace"
              fill={on ? COLORS.ground : COLORS.bone}
            >
              {String(m.n).padStart(2, '0')}
            </text>
          </g>
        )
      })}
    </svg>
  )

  if (compact) return <div className="grid-bg border border-ink-600 bg-ink-900 p-2 sm:p-3">{svg}</div>

  return (
    <figure>
      {(map.title || map.note) && (
        <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="label text-bone">{map.title}</span>
          {map.note && <span className="text-sm text-bone-mute">{map.note}</span>}
        </figcaption>
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <div className="grid-bg overflow-x-auto border border-ink-600 bg-ink-900">
            <div className="min-w-[620px] p-3">{svg}</div>
          </div>
          <p className="label mt-2 sm:hidden">Swipe sideways to pan the map</p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {paths.map((p) => {
              const k = PATH_KINDS[p.kind]
              const swatch = (
                <svg width="34" height="8" aria-hidden="true">
                  <line x1="0" y1="4" x2="34" y2="4" stroke={k.color} strokeWidth={k.width} strokeDasharray={k.dash || undefined} />
                </svg>
              )
              return map.filterable ? (
                <button
                  key={p.kind}
                  type="button"
                  aria-pressed={isolated === p.kind}
                  onClick={() => setIsolated(isolated === p.kind ? null : p.kind)}
                  className={`label flex min-h-[32px] items-center gap-2 border px-2 ${
                    isolated === p.kind ? 'border-brass text-bone' : 'border-ink-600 hover:border-bone-mute'
                  }`}
                >
                  {swatch}
                  {p.label || k.label}
                </button>
              ) : (
                <span key={p.kind} className="label flex items-center gap-2">
                  {swatch}
                  {p.label || k.label}
                </span>
              )
            })}
            {zoneKinds
              .filter((k) => k !== 'room')
              .map((k) => {
                const s = ZONE_STYLE[k]
                return (
                  <span key={k} className="label flex items-center gap-2">
                    <svg width="16" height="12" aria-hidden="true">
                      <rect
                        x="1"
                        y="1"
                        width="14"
                        height="10"
                        fill={s.fill === 'hatch' ? `url(#hatch-${uid})` : s.fill}
                        stroke={s.stroke}
                        strokeDasharray={s.dash ? '3 2' : undefined}
                      />
                    </svg>
                    {s.label}
                  </span>
                )
              })}
            {layers.enemies &&
              enemyKinds.map((k) => (
                <span key={k} className="label flex items-center gap-2">
                  <span className="text-combat">{k}</span>
                  {ENEMY_KINDS[k]} enemy
                </span>
              ))}
          </div>
        </div>

        {markers.length > 0 && (
          <ol className="divide-y divide-ink-700 border-y border-ink-700">
            {markers.map((m) => (
              <li
                key={m.n}
                tabIndex={0}
                onMouseEnter={() => setActive(m.n)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(m.n)}
                onBlur={() => setActive(null)}
                className={`grid grid-cols-[2.5rem_1fr] gap-x-3 px-2 py-3 transition-colors ${
                  active === m.n ? 'bg-ink-800' : ''
                }`}
              >
                <span className={`font-mono text-sm ${active === m.n ? 'text-brass' : 'text-bone-mute'}`}>
                  {String(m.n).padStart(2, '0')}
                </span>
                <div>
                  <p className="label text-bone">{m.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-bone-dim">{m.why}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </figure>
  )
}
