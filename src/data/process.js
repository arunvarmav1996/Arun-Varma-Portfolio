export const pipeline = [
  { name: 'Research and Reference', text: 'I collect real places and shipped levels that solve a similar problem, and note the measurements and sightlines that make them work.', output: 'Reference board with notes' },
  { name: 'Design Intent', text: 'One paragraph on what the player should feel, plus three to five pillars. Every later decision is checked against it.', output: 'Intent statement and pillars' },
  { name: 'Paper Design', text: 'Bubble diagram of spaces and their relationships. Cheap to change, so this is where I throw the most away.', output: 'Bubble diagram' },
  { name: 'Beat Map', text: 'The level as a sequence of beats with an intensity value each. Pacing problems show up here before any geometry exists.', output: 'Beat sheet and pacing graph' },
  { name: '2D Map', text: 'A scaled top-down map using character metrics: jump distance, cover height, sprint speed. Encounter spaces are sized from engagement distance.', output: 'Scaled map with annotations' },
  { name: 'Greybox', text: 'Blockout in engine with plain geometry. The goal is to walk it and find out whether scale and sightlines match the map.', output: 'Walkable blockout' },
  { name: 'First Playable', text: 'Enemies, triggers and checkpoints added with placeholder scripting. It needs to be completable start to finish, however rough.', output: 'Completable build' },
  { name: 'Playtest', text: 'I watch without helping and write down what players do, where they stop, and what they say afterwards. Behaviour is recorded before opinion.', output: 'Playtest report' },
  { name: 'Iteration', text: 'Each change is tied to an observed problem and a guess at its cause. I change one thing at a time where possible, so I can tell what worked.', output: 'Iteration log with before/after' },
  { name: 'Art Pass and Final Implementation', text: 'Lighting, set dressing and final scripting. Art supports decisions already proven in greybox and is never used to fix a layout problem.', output: 'Final level and walkthrough' },
]

// Set `file` to a path in /public/documents once you have the PDF.
export const documents = [
  { name: 'Level Design Document', project: 'The Forgotten Facility', contains: ['Intent and pillars', 'Annotated map', 'Beat-by-beat walkthrough', 'Metrics used'], file: '' },
  { name: 'Encounter Design Document', project: 'Pump Hall', contains: ['Player kit assumed', 'Arena map', 'Phase script', 'Tuning notes'], file: '' },
  { name: 'Mission Flow', project: 'Night Crossing', contains: ['Objectives', 'Beat flow', 'Fail states', 'Checkpoint placement'], file: '' },
  { name: 'Beat Sheet', project: 'Night Crossing', contains: ['Beat list', 'Gameplay type', 'Intensity', 'Story purpose'], file: '' },
  { name: 'Enemy Encounter Matrix', project: 'Pump Hall', contains: ['Archetypes', 'Space each controls', 'Counters', 'Pairings to avoid'], file: '' },
  { name: 'Playtest Report', project: 'The Forgotten Facility', contains: ['Goals', 'Participants', 'Observations', 'Actions taken'], file: '' },
  { name: 'Level Map', project: 'Customs Yard', contains: ['Scaled top-down', 'Route overlay', 'Patrol paths', 'Legend'], file: '' },
  { name: 'Combat Arena Breakdown', project: 'Pump Hall', contains: ['Cover plan', 'Sightlines', 'Height layers', 'Movement loop'], file: '' },
]
