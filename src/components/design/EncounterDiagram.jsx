import { useState } from 'react'
import LevelMap from './LevelMap.jsx'

/*
  EncounterDiagram: a LevelMap with a phase stepper.
  phases = [{ n, title, why }]
  Enemies and sightlines in map data appear from their `phase` until their `until`.
*/
export default function EncounterDiagram({ map, phases }) {
  const [phase, setPhase] = useState(1)
  const current = phases.find((p) => p.n === phase) || phases[0]

  return (
    <div>
      <div className="mb-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div role="group" aria-label="Encounter phase" className="flex flex-wrap gap-2">
          {phases.map((p) => (
            <button
              key={p.n}
              type="button"
              aria-pressed={p.n === phase}
              onClick={() => setPhase(p.n)}
              className={`min-h-[44px] border px-3 text-left font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
                p.n === phase
                  ? 'border-brass bg-brass text-ink-950'
                  : 'border-ink-600 text-bone-dim hover:border-bone-mute'
              }`}
            >
              Phase {p.n}
            </button>
          ))}
        </div>
        <div aria-live="polite" className="border-l-2 border-brass pl-4">
          <p className="label text-bone">
            Phase {current.n} of {phases.length}: {current.title}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-bone-dim">{current.why}</p>
        </div>
      </div>
      <LevelMap map={map} phase={phase} />
    </div>
  )
}
