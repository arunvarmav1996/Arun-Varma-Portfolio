export default {
  slug: 'ledge-and-mantle',
  number: '06',
  title: 'Ledge and Mantle',
  workingTitle: true,
  status: 'concept',
  featured: false,
  genre: 'Third-Person Traversal',
  type: 'System and prototype study',
  disciplines: ['Gameplay Design', 'Technical Design', 'Level Metrics'],
  summary:
    'A ledge grab and mantle prototype. The design problem: make traversal forgiving enough to feel fluid in a chase and strict enough that a level designer can still build a gap the player cannot cross.',
  tags: ['Unreal Engine 5', 'Prototype', 'Traversal', 'Solo Project', 'Target: 2 weeks'],
  meta: {
    role: 'Game Designer / Technical Designer',
    engine: 'Unreal Engine 5 (planned)',
    time: 'Target: 2 weeks',
    team: 'Solo',
    responsibilities: ['Mechanic rules', 'Implementation', 'Tuning', 'Level metrics sheet and test gym'],
  },
  challenge:
    'Define the rules for when a jump becomes a grab, expose the values a designer needs to tune, and publish the level metrics that follow from them.',
  hero: {
    slot: '[ADD GAMEPLAY VIDEO]',
    spec: 'A 45-second clip in a test gym: successful grabs, a near miss, and a deliberate fail at an uncrossable gap.',
    src: '',
  },
  pillars: [
    { name: 'Forgiving on intent', text: 'If the player clearly aimed for a ledge, they get it. A grab window in front of the character catches near misses.' },
    { name: 'Strict on distance', text: 'Maximum reach is fixed and published. Level designers can build one unit past it and trust it.' },
    { name: 'Readable', text: 'The character\'s hands reach before contact, so the player sees a grab coming and a miss coming.' },
    { name: 'Design first', text: 'Every tuning value is exposed and named for what the player feels, not how the code works.' },
  ],
  experience: [
    { stage: 'Approach', see: 'A ledge at chest height or above.', think: 'I can make that.', feel: 'Confident.', do: 'Run and jump toward it.' },
    { stage: 'Near miss', see: 'Hands catching the lip, body swinging in.', think: 'Just made it.', feel: 'A small thrill.', do: 'Hold, then mantle or drop.' },
    { stage: 'Uncrossable gap', see: 'A gap that looks slightly too far.', think: 'That is not the way.', feel: 'Redirected, not cheated.', do: 'Look for another route.' },
  ],
  flow: {
    title: 'Grab decision, per frame while airborne',
    steps: [
      { title: 'Airborne and moving toward a wall?', why: 'Grabs only trigger when the player is heading at the surface, so brushing past a ledge never steals control.' },
      { title: 'Ledge found inside the grab window?', why: 'A forward trace at hand height looks for a lip. The window is larger than the hands, which is where forgiveness comes from.' },
      {
        branch: [
          { title: 'Yes: snap and hang', why: 'The character is pulled the last few centimetres over a short blend, hiding the correction.' },
          { title: 'No: continue falling', why: 'Hands reach and miss. The player sees why it failed.' },
        ],
      },
      { title: 'Input while hanging', why: 'Up mantles, down drops, sideways shimmies. Three verbs, each on the direction it moves the character.' },
      { title: 'Space above the ledge?', why: 'Mantle only plays if the character fits. Otherwise the hang continues, so a low ceiling reads as a constraint.' },
    ],
  },
  tuning: [
    { name: 'Max grab height', value: '[ADD VALUE]', feel: 'How high a ledge the player may reach from standing.' },
    { name: 'Max jump gap', value: '[ADD VALUE]', feel: 'The longest gap that ends in a grab at a full run.' },
    { name: 'Grab window depth', value: '[ADD VALUE]', feel: 'How generous a near miss is.' },
    { name: 'Snap blend time', value: '[ADD VALUE]', feel: 'How visible the correction is.' },
    { name: 'Mantle duration', value: '[ADD VALUE]', feel: 'How long the player is locked out of input.' },
  ],
  pacing: null,
  guidance: [
    { cue: 'Level metrics', text: 'The metrics sheet gives three gap sizes: always crossable, crossable with a grab, never crossable. Levels are built only from those three.' },
    { cue: 'Visual language', text: 'Grabbable edges share one trim shape. The player learns it in the test gym and reads it everywhere after.' },
  ],
  risks: [
    {
      risk: 'A generous grab window lets players cross gaps meant to block them.',
      why: 'Forgiveness added to reach extends the effective jump distance.',
      test: 'Build gaps at one-unit increments past max reach and try to cross each ten times.',
      fallback: 'Make the window generous vertically and tight horizontally, so forgiveness applies to height and never to distance.',
    },
    {
      risk: 'The snap feels like the game taking control.',
      why: 'A long blend moves the character without input.',
      test: 'Ask testers whether any grab felt like it was done for them.',
      fallback: 'Shorten the blend and add a reach animation before contact so the correction has a visible cause.',
    },
  ],
  iterations: [],
  playtestPlan: {
    tested: 'A test gym with twelve gaps and ledges, five players, success rate per obstacle.',
    expected: 'Above 90% success on "always crossable", 0% on "never crossable", and no tester able to name which grabs were assisted.',
  },
  playtests: [],
  lessons: [],
  assets: [
    { slot: '[ADD GAMEPLAY VIDEO]', replaceWith: 'Test gym clip with the debug trace visible for part of it.' },
    { slot: '[ADD LEVEL BLOCKOUT IMAGE]', replaceWith: 'Screenshot of the test gym with each obstacle labelled by gap size.' },
    { slot: '[ADD DESIGN DOCUMENT]', replaceWith: 'One-page level metrics sheet: character height, jump height, jump gap, grab reach, cover heights.' },
    { slot: '[ADD PLAYTEST RESULT]', replaceWith: 'Success rate table per obstacle, before and after tuning.' },
    { slot: '[ADD ITERATION SCREENSHOT]', replaceWith: 'Tuning values before and after, with the reason for each change.' },
  ],
}
