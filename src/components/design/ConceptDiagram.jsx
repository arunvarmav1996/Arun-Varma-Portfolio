import { COLORS as C } from '../../lib/kinds.js'

// Small schematic drawings for the Level Design page, one per principle.
// Shared language: grey = geometry, brass = player route, dot = player, ring = goal.

const wall = { fill: C.panel, stroke: C.line, strokeWidth: 1.5 }
const route = { fill: 'none', stroke: C.brass, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
const faint = { fill: 'none', stroke: C.mute, strokeWidth: 1.5, strokeDasharray: '4 5' }
const Player = ({ x, y }) => <circle cx={x} cy={y} r="6" fill={C.brass} />
const Goal = ({ x, y }) => <circle cx={x} cy={y} r="8" fill="none" stroke={C.bone} strokeWidth="2" />
const T = ({ x, y, children, anchor = 'start' }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize="10" letterSpacing="1" fontFamily="IBM Plex Mono, monospace" fill={C.mute}>
    {children}
  </text>
)

const DRAWINGS = {
  flow: {
    alt: 'A room whose widest opening leads toward the goal, with a narrow side exit.',
    el: (
      <>
        <path d="M20 40 H130 V20 H300 V75 H220 V125 H300 V160 H130 V140 H20 Z" {...wall} />
        <path d="M45 90 C120 90 150 95 200 100 S270 100 290 100" {...route} />
        <Player x={45} y={90} />
        <Goal x={292} y={100} />
        <T x={225} y={93}>WIDE = FORWARD</T>
        <T x={140} y={36}>NARROW = OPTIONAL</T>
      </>
    ),
  },
  readability: {
    alt: 'Three recurring shapes: low cover, climbable edge and walkable ramp, each drawn the same way wherever it appears.',
    el: (
      <>
        <line x1="20" y1="140" x2="300" y2="140" stroke={C.line} strokeWidth="1.5" />
        <rect x="35" y="112" width="60" height="28" {...wall} />
        <rect x="130" y="70" width="60" height="70" {...wall} />
        <line x1="130" y1="70" x2="190" y2="70" stroke={C.brass} strokeWidth="3" />
        <path d="M225 140 L290 95 V140 Z" {...wall} />
        <T x={65} y={160} anchor="middle">COVER</T>
        <T x={160} y={160} anchor="middle">CLIMB EDGE</T>
        <T x={258} y={160} anchor="middle">RAMP</T>
      </>
    ),
  },
  pacing: {
    alt: 'An intensity curve with two peaks separated by a low beat.',
    el: (
      <>
        <line x1="25" y1="145" x2="300" y2="145" stroke={C.line} strokeWidth="1.5" />
        <path d="M25 135 C60 130 70 60 105 60 S140 125 165 128 S215 25 245 25 S280 120 300 132" {...route} />
        <line x1="165" y1="128" x2="165" y2="145" {...faint} />
        <T x={105} y={50} anchor="middle">PEAK</T>
        <T x={165} y={118} anchor="middle">REST</T>
        <T x={245} y={16} anchor="middle">CLIMAX</T>
      </>
    ),
  },
  landmarks: {
    alt: 'A tall landmark seen from three different positions along a winding route.',
    el: (
      <>
        <path d="M30 150 C70 120 60 80 110 85 S170 140 220 120 S270 60 295 50" {...route} />
        <rect x="150" y="20" width="18" height="50" fill={C.bone} />
        {[[30, 150], [110, 85], [220, 120]].map(([x, y]) => (
          <g key={x}>
            <line x1={x} y1={y} x2="159" y2="45" {...faint} />
            <circle cx={x} cy={y} r="5" fill={C.brass} />
          </g>
        ))}
        <T x={175} y={30}>LANDMARK</T>
      </>
    ),
  },
  reveals: {
    alt: 'A tight corridor with a bend that hides a large room until the player turns the corner.',
    el: (
      <>
        <path d="M20 120 H110 V70 H150 V20 H300 V160 H150 V150 H20 Z" {...wall} />
        <path d="M35 135 H128 V95 L150 80" {...route} />
        <path d="M150 80 L295 25 M150 80 L295 155" {...faint} />
        <Player x={35} y={135} />
        <T x={30} y={112}>COMPRESS</T>
        <T x={215} y={95}>RELEASE</T>
      </>
    ),
  },
  storytelling: {
    alt: 'A tidy grid of identical objects with one out of place.',
    el: (
      <>
        <rect x="20" y="20" width="280" height="140" {...wall} />
        {[0, 1, 2, 3, 4].map((i) =>
          [0, 1].map((j) =>
            i === 3 && j === 1 ? null : (
              <rect key={`${i}${j}`} x={45 + i * 50} y={45 + j * 55} width="26" height="36" fill="none" stroke={C.mute} strokeWidth="1.5" />
            ),
          ),
        )}
        <rect x="200" y="108" width="26" height="36" transform="rotate(38 213 126)" fill="none" stroke={C.brass} strokeWidth="2.5" />
        <T x={160} y={175} anchor="middle">ORDER MAKES DISORDER READ</T>
      </>
    ),
  },
  verticality: {
    alt: 'Side view: high ground with a wide view cone and a single way down.',
    el: (
      <>
        <path d="M20 150 H150 V80 H300 V150" {...wall} />
        <line x1="20" y1="150" x2="300" y2="150" stroke={C.line} strokeWidth="1.5" />
        <path d="M210 68 L40 148 M210 68 L140 148" {...faint} />
        <Player x={210} y={68} />
        <path d="M150 150 V80" stroke={C.brass} strokeWidth="3" />
        <T x={225} y={60}>SEES MORE</T>
        <T x={158} y={120}>ONE WAY DOWN</T>
      </>
    ),
  },
  optionality: {
    alt: 'A main route with a side loop that leaves and rejoins it further on.',
    el: (
      <>
        <path d="M25 110 H295" {...route} />
        <path d="M95 110 C95 40 215 40 215 110" fill="none" stroke={C.optional} strokeWidth="2.5" strokeDasharray="7 5" />
        <rect x="145" y="45" width="20" height="20" fill="none" stroke={C.optional} strokeWidth="2" />
        <Player x={25} y={110} />
        <Goal x={295} y={110} />
        <T x={155} y={36} anchor="middle">REWARD</T>
        <T x={215} y={130} anchor="middle">REJOINS AHEAD</T>
      </>
    ),
  },
}

export default function ConceptDiagram({ name }) {
  const d = DRAWINGS[name]
  if (!d) return null
  return (
    <div className="grid-bg border border-ink-600 bg-ink-900 p-3">
      <svg viewBox="0 0 320 180" role="img" aria-label={d.alt} className="block h-auto w-full">
        {d.el}
      </svg>
    </div>
  )
}
