import LevelMap from './LevelMap.jsx'

// Preset views of LevelMap. Each takes the same `map` data and switches layers.

// Where enemies stand in a given phase, without routes or notes competing.
export function EnemyPlacementMap({ map, phase }) {
  return <LevelMap map={map} phase={phase} show={{ paths: false, sightlines: false }} />
}

// Which positions each ranged threat can see.
export function SightlineDiagram({ map, phase }) {
  return <LevelMap map={map} phase={phase} show={{ paths: false, markers: false }} />
}

// Routes only: critical path and alternatives over the bare layout.
export function CriticalPathOverlay({ map, animate }) {
  return <LevelMap map={map} animate={animate} show={{ enemies: false, sightlines: false, markers: false }} />
}
