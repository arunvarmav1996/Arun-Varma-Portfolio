// PROJECT TEMPLATE
// status: 'concept' shows the "Planned concept" label and treats iteration/playtest as plans.
// Change to 'shipped' once you have a playable build and real results, then fill
// `iterations`, `playtests` and `lessons` with what actually happened.
// Any image/video `src` left empty renders a labelled placeholder.

export default {
  slug: 'forgotten-facility',
  number: '01',
  title: 'The Forgotten Facility',
  workingTitle: true,
  status: 'concept',
  featured: true,
  genre: 'Third-Person Action Adventure',
  type: 'Linear action-adventure level',
  disciplines: ['Level Design', 'Combat Design', 'Environmental Storytelling'],
  summary:
    'A 15-20 minute level through a flooded hydro plant. The design problem: keep the player oriented and moving through exploration, traversal and combat without a single waypoint marker.',
  tags: ['Unreal Engine 5', 'Level Design', 'Combat Encounter', 'Solo Project', 'Target: 4 weeks'],
  meta: {
    role: 'Level Designer / Game Designer',
    engine: 'Unreal Engine 5 (planned)',
    time: 'Target: 4 weeks',
    team: 'Solo',
    responsibilities: ['Paper design and beat map', 'Greybox', 'Encounter scripting', 'Playtesting and iteration'],
  },
  challenge:
    'Create a 15-minute third-person level that alternates exploration and combat while maintaining clear player orientation without relying on HUD markers.',
  hero: {
    slot: '[ADD LEVEL BLOCKOUT IMAGE]',
    spec: 'Wide greybox shot from the control gallery looking down into the turbine hall. 16:9, 2400px wide.',
    src: '',
  },
  pillars: [
    {
      name: 'Readable',
      text: 'Every space shows its exit before it shows its threat, so the player always knows where they can move once combat starts.',
    },
    {
      name: 'Multi-layered',
      text: 'The turbine hall has floor, trench and catwalk. Each level answers a different enemy, which gives the player a reason to change height.',
    },
    {
      name: 'Cinematic',
      text: 'The level withholds the turbine hall until the control gallery, so the player sees the whole arena from above before entering it.',
    },
    {
      name: 'Paced',
      text: 'No two high-intensity beats sit together. The records room exists to drop intensity before the final escalation.',
    },
  ],
  experience: [
    {
      stage: 'Arrival: service road',
      see: 'A dam wall filling the frame, one lit doorway at its base.',
      think: 'That door is where I am going.',
      feel: 'Small, curious.',
      do: 'Walk, wade, learn the camera and movement with nothing at stake.',
    },
    {
      stage: 'Control gallery',
      see: 'The turbine hall below through broken glass, patrols moving between cover.',
      think: 'I can read their routes. Left trench or right catwalk?',
      feel: 'Anticipation, a sense of having a plan.',
      do: 'Observe, choose an entry, drop in.',
    },
    {
      stage: 'Turbine hall',
      see: 'A ranged enemy above, melee enemies closing on the floor.',
      think: 'I cannot stay behind this cover.',
      feel: 'Pressure, then control once repositioned.',
      do: 'Fight, relocate, use height.',
    },
    {
      stage: 'Records room',
      see: 'A desk, a half-packed bag, a wall of shift rotas with names crossed out.',
      think: 'They knew the dam would fail and stayed anyway.',
      feel: 'Quiet, a change of weight.',
      do: 'Explore at walking pace, pick up the key item.',
    },
  ],
  map: {
    title: 'Draft paper map, v0',
    note: 'Starting layout to build and test against. Replace with your own exported top-down map once the greybox exists.',
    zones: [
      { kind: 'room', x: 40, y: 380, w: 180, h: 170, label: 'Service road' },
      { kind: 'room', x: 240, y: 340, w: 160, h: 210, label: 'Loading dock' },
      { kind: 'optional', x: 240, y: 200, w: 200, h: 110, label: 'Maintenance crawl' },
      { kind: 'high', x: 430, y: 330, w: 150, h: 110, label: 'Control gallery' },
      { kind: 'arena', x: 610, y: 220, w: 240, h: 320, label: 'Turbine hall' },
      { kind: 'high', x: 630, y: 240, w: 200, h: 36, label: 'Catwalk' },
      { kind: 'low', x: 630, y: 470, w: 200, h: 50, label: 'Trench' },
      { kind: 'quiet', x: 610, y: 80, w: 160, h: 110, label: 'Records room' },
      { kind: 'room', x: 880, y: 230, w: 90, h: 140, label: 'Spillway' },
    ],
    paths: [
      {
        kind: 'critical',
        points: [[60, 470], [320, 450], [505, 385], [720, 400], [690, 140], [800, 258], [925, 300]],
      },
      { kind: 'optional', points: [[320, 400], [320, 255], [430, 255], [505, 340]] },
    ],
    markers: [
      { n: 1, x: 60, y: 470, title: 'Player start', why: 'The dam wall fills the frame and one lit doorway sits on the horizon line. I wanted the destination understood before the player takes a step.' },
      { n: 2, x: 320, y: 500, title: 'Landmark', why: 'A tilted crane arm points at the gallery stairs. It is visible from the road, the dock and later from the catwalk, so the player can always place themselves relative to it.' },
      { n: 3, x: 320, y: 255, title: 'Optional route', why: 'The crawl entrance is lit but off the leading line. It rewards players who look sideways with an early view of the catwalk and a resource cache, without hiding the main route.' },
      { n: 4, x: 505, y: 385, title: 'Vista', why: 'The gallery forces a pause above the arena. Seeing patrol routes and both entries first turns the fight into a plan the player made, not a surprise.' },
      { n: 5, x: 650, y: 400, title: 'Combat entry', why: 'The drop-in lands behind low cover facing the centre. The player starts safe from the front but exposed to the catwalk, which makes the first move a choice.' },
      { n: 6, x: 730, y: 258, title: 'Elevated threat', why: 'A ranged enemy arrives here in phase two. It can see the entry cover, so staying put stops being safe and repositioning becomes the natural response.' },
      { n: 7, x: 690, y: 140, title: 'Narrative beat', why: 'A single door and no enemies. Intensity drops to near zero so the escalation on the way out has somewhere to climb from.' },
      { n: 8, x: 925, y: 300, title: 'Exit', why: 'The spillway opens the frame to daylight after ten minutes indoors. The contrast marks the end of the level without a cutscene.' },
    ],
  },
  pacing: [
    { label: 'Arrival', type: 'explore', minutes: 2, intensity: 1 },
    { label: 'Loading dock', type: 'explore', minutes: 2, intensity: 2 },
    { label: 'Climb to gallery', type: 'traverse', minutes: 1.5, intensity: 3 },
    { label: 'Vista and plan', type: 'narrative', minutes: 1, intensity: 2 },
    { label: 'Turbine hall', type: 'combat', minutes: 3.5, intensity: 7 },
    { label: 'Records room', type: 'recovery', minutes: 2, intensity: 1 },
    { label: 'Alarm, catwalk run', type: 'escalation', minutes: 2, intensity: 6 },
    { label: 'Hall floods, final wave', type: 'climax', minutes: 3, intensity: 10 },
    { label: 'Spillway', type: 'recovery', minutes: 1, intensity: 2 },
  ],
  encounter: {
    intro:
      'The turbine hall is fought twice. First dry, with three height layers. Then during the flood, when the trench is removed and the catwalk becomes the only safe ground. Same geometry, different ownership.',
    factors: [
      { label: 'Arena geometry', text: 'A 30 x 40 m hall with a figure-of-eight loop around two turbines. A loop means retreating never dead-ends.' },
      { label: 'Enemy composition', text: 'Three melee enemies to push the player off cover, one ranged enemy on the catwalk to punish standing still, one heavy for the flood phase.' },
      { label: 'Engagement distance', text: 'Entry cover to the first enemy is 15-18 m: long enough to read the room, short enough that the first enemy arrives within five seconds.' },
      { label: 'Cover', text: 'Low cover on the floor, full cover only at the turbines. Full cover blocks the ranged enemy but hides the flank, so it trades safety for information.' },
      { label: 'Escape routes', text: 'Trench to the left, stairs to the right. Both rejoin the loop, so an escape becomes a flank.' },
      { label: 'Resources', text: 'Ammunition sits on the catwalk, health in the trench. The player picks which problem to solve by picking a height.' },
    ],
  },
  guidance: [
    { cue: 'Lighting', text: 'One warm light per space marks the exit. Everything else is cool and dim, so the exit is the highest-contrast point in the frame.' },
    { cue: 'Leading lines', text: 'Pipes along the loading dock ceiling converge on the gallery stairs and pull the eye up and right.' },
    { cue: 'Enemy placement', text: 'The first patrol in the hall walks toward the trench entrance, showing the player that route exists before they need it.' },
    { cue: 'Sound', text: 'Water noise rises toward the spillway. After the records room the player can navigate to the exit by ear.' },
  ],
  // Predicted problems. Becomes real iteration entries once tested.
  risks: [
    {
      risk: 'Players miss the maintenance crawl entirely.',
      why: 'Its entrance competes with the crane landmark and sits off the leading line.',
      test: 'Count how many of the first five testers look at it, and how many enter.',
      fallback: 'Move the entrance into the same frame as the landmark and place a flickering light inside it.',
    },
    {
      risk: 'Players stay on the gallery and fight from above.',
      why: 'The vista gives sightlines to most of the floor and there is no pressure to come down.',
      test: 'Time spent on the gallery after first enemy alert.',
      fallback: 'Break the gallery glass on alert and give the catwalk enemy a line to it.',
    },
    {
      risk: 'The records room reads as dead time rather than a quiet beat.',
      why: 'If the story props do not hold attention, two minutes without threat becomes boredom.',
      test: 'Ask testers afterwards what happened in that room.',
      fallback: 'Shorten the room and move one clue to the entrance so discovery starts immediately.',
    },
  ],
  iterations: [], // { version, problem, why, change, result, before: '', after: '' }
  playtestPlan: {
    tested: 'Orientation and route discovery in the greybox, five players, no instructions.',
    expected: 'Players reach the gallery within six minutes and choose an entry without prompting.',
  },
  playtests: [], // { tested, players, expected, observed, surprised, changed }
  lessons: [], // specific cause-and-effect lessons, written after testing
  assets: [
    { slot: '[ADD TOP-DOWN MAP]', replaceWith: 'Your own top-down map exported from the engine or drawn over an orthographic screenshot, with the same eight numbered annotations.' },
    { slot: '[ADD LEVEL BLOCKOUT IMAGE]', replaceWith: 'Five greybox screenshots: start vista, loading dock, gallery view, turbine hall floor, spillway exit.' },
    { slot: '[ADD ITERATION SCREENSHOT]', replaceWith: 'Before/after pairs from the same camera position for each layout change.' },
    { slot: '[ADD PLAYTEST RESULT]', replaceWith: 'Notes from at least five testers: time to gallery, route chosen, where they hesitated.' },
    { slot: '[ADD GAMEPLAY VIDEO]', replaceWith: 'A 3-5 minute walkthrough with a short text overlay naming each beat.' },
    { slot: '[ADD DOWNLOADABLE BUILD]', replaceWith: 'A packaged Windows build link (itch.io or drive) with controls listed.' },
    { slot: '[ADD DESIGN DOCUMENT]', replaceWith: 'A 4-6 page level design document as PDF.' },
  ],
}
