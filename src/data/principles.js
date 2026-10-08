export const levelPhilosophy =
  "Good levels don't simply provide a route to an objective. They control information, establish expectations, create decisions and shape the player's emotional rhythm."

// `diagram` selects a drawing in components/design/ConceptDiagram.jsx
export const levelPrinciples = [
  {
    key: 'flow',
    name: 'Player Flow',
    line: 'How spaces move players between objectives.',
    text: 'I shape rooms so the widest, brightest opening is the way forward. A player who is never told where to go but always ends up there keeps a sense of authorship.',
  },
  {
    key: 'readability',
    name: 'Readability',
    line: 'How players understand the environment.',
    text: 'Walkable ground, climbable edges and cover each keep one consistent shape. Once learned, the player reads a new room in a glance, which leaves attention free for enemies.',
  },
  {
    key: 'pacing',
    name: 'Pacing',
    line: 'How exploration, traversal, combat and narrative moments alternate.',
    text: 'I plot intensity before I draw a layout. If two peaks touch, one is moved or a low beat goes between them, because a peak is only felt against what came before.',
  },
  {
    key: 'landmarks',
    name: 'Landmarks',
    line: 'How spaces maintain orientation.',
    text: 'One tall, distinct shape is kept in view from most of the level. Seeing it from a new side tells the player how far they have come without a map.',
  },
  {
    key: 'reveals',
    name: 'Reveals',
    line: 'How geometry controls what the player sees and when.',
    text: 'A tight corridor before a large space makes the space read larger. I use a bend or a doorway to hide a room until the camera can take in all of it at once.',
  },
  {
    key: 'storytelling',
    name: 'Environmental Storytelling',
    line: 'How spaces communicate history and narrative.',
    text: 'A space is kept orderly so that the one disordered thing in it becomes the story. Players notice change against a baseline, so I set the baseline first.',
  },
  {
    key: 'verticality',
    name: 'Verticality',
    line: 'How elevation changes traversal and combat.',
    text: 'Height gives information and removes escape routes. I pair every high position with a cost, so climbing is a decision and never simply the best place to stand.',
  },
  {
    key: 'optionality',
    name: 'Optionality',
    line: 'How secondary spaces reward curiosity.',
    text: 'Optional spaces are visible from the main route and rejoin it further on. The player who takes one returns with a resource or a new angle and never has to backtrack.',
  },
]

export const combatHeadline = 'Combat spaces should create decisions, not simply contain enemies.'

export const combatPrinciples = [
  {
    name: 'Player Agency',
    line: 'Give the player multiple meaningful responses.',
    text: 'For each threat I check that the arena offers two answers with different costs. If one answer is always best, the other is decoration and gets changed or removed.',
  },
  {
    name: 'Pressure',
    line: 'Enemies should create reasons to move.',
    text: 'I start from the position I expect the player to hold and ask which enemy makes it unsafe. An arena with good routes and no pressure produces a player who never uses them.',
  },
  {
    name: 'Spatial Control',
    line: 'Different enemy archetypes influence different areas of the arena.',
    text: 'Melee enemies own the ground near the player, ranged enemies own lanes, heavies own wherever they walk. Composition is choosing which parts of the map are denied at each moment.',
  },
  {
    name: 'Readability',
    line: 'Players should understand threats quickly.',
    text: 'Enemies enter through doors the player has already seen and each archetype has a distinct silhouette. A threat the player could not have read feels unfair even when it is beatable.',
  },
  {
    name: 'Rhythm',
    line: 'Encounters should build, release and escalate.',
    text: 'I script a lull before the final wave. It gives the player time to reload and reposition, and it makes the climax land as a rise instead of more of the same.',
  },
  {
    name: 'Movement',
    line: 'The arena should reward repositioning rather than static play.',
    text: 'Layouts are built as loops so retreating never dead-ends. Resources sit along the loop, away from the strongest cover, so moving is paid for.',
  },
]

// Shown on the Combat Design page as a flow with a reason per step.
export const combatFlow = [
  { title: 'Player start', why: 'A threshold with a full view of the arena. The fight begins with information.' },
  { title: 'Initial safe space', why: 'Low cover near the entry lets the player learn enemy behaviour at low cost before the space turns against them.' },
  { title: 'Melee pressure approaches front', why: 'Closing enemies set a timer on the first position without removing it outright.' },
  { title: 'Ranged enemy controls central lane', why: 'The direct route forward is now expensive, which makes the side routes worth considering.' },
  {
    branch: [
      { title: 'Left flank', why: 'Hidden from the ranged enemy, narrow, close-quarters risk.' },
      { title: 'Right elevation', why: 'Clear shot at the ranged enemy, exposed climb, one way down.' },
    ],
  },
  { title: 'Reinforcement changes arena ownership', why: 'New enemies arrive where the player just was. The space behind them closes and the fight keeps moving forward.' },
  { title: 'Final enemy creates climax', why: 'A threat that ignores the cover the player relied on. The answer is movement, the skill the encounter has been building.' },
]
