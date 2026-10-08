// Shared visual language for maps, pacing graphs and beat timelines.
// Colour is always paired with a label or line style, never used alone.

export const COLORS = {
  brass: '#C8A24A',
  bone: '#ECE6DA',
  mute: '#8F8B82',
  line: '#3D424A',
  panel: '#22252A',
  ground: '#1A1C1F',
  combat: '#C2674E',
  traverse: '#6F9BC0',
  story: '#A68FC4',
  optional: '#86A886',
}

export const BEAT_TYPES = {
  explore: { label: 'Exploration', color: COLORS.optional },
  traverse: { label: 'Traversal', color: COLORS.traverse },
  narrative: { label: 'Narrative', color: COLORS.story },
  combat: { label: 'Combat', color: COLORS.combat },
  recovery: { label: 'Recovery', color: COLORS.mute },
  escalation: { label: 'Escalation', color: COLORS.brass },
  climax: { label: 'Climax', color: COLORS.bone },
}

export const PATH_KINDS = {
  critical: { label: 'Critical path', color: COLORS.brass, dash: null, width: 3 },
  optional: { label: 'Optional route', color: COLORS.optional, dash: '8 6', width: 2.5 },
  stealth: { label: 'Stealth', color: COLORS.story, dash: '2 6', width: 3 },
  aggression: { label: 'Aggression', color: COLORS.combat, dash: null, width: 3 },
  flank: { label: 'Flank', color: COLORS.traverse, dash: '12 5', width: 2.5 },
  vertical: { label: 'Vertical approach', color: COLORS.bone, dash: '10 4 2 4', width: 2.5 },
}

export const ENEMY_KINDS = {
  M: 'Melee',
  R: 'Ranged',
  H: 'Heavy',
}
