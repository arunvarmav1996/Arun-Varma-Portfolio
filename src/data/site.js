// Edit this file first. Everything personal on the site reads from here.
// Leave a value as '' to show a visible "[ADD ...]" placeholder instead of a broken link.

export const site = {
  name: 'ARUN VARMA',
  role: 'Game Designer',
  positioning: 'Game Designer | Level Design • Combat Encounters • Narrative Gameplay',
  tagline:
    'I design gameplay spaces, encounters and interactive experiences built around player flow, readable combat, exploration and storytelling.',
  location: 'London, UK', // e.g. 'London, UK'
  email: 'arunvarmav@gmail.com', // e.g. 'you@example.com'
  linkedin: 'https://www.linkedin.com/in/arunvarmav/', // full URL
  github: '', // only if it contains relevant game work
  resumeUrl: '', // put resume.pdf in /public and set this to '/resume.pdf'
  education: "Master's in Game Design and Development", // add institution and year below
  educationDetail: 'Kingston University, 2023', // e.g. 'University name, 2026'
}

// Keep only what you can defend in an interview. Delete the rest.
export const skills = [
  {
    group: 'Design',
    items: [
      'Level Design',
      'Combat Design',
      'Encounter Design',
      'Mission Design',
      'Gameplay Design',
      'Player Guidance',
      'Gameplay Pacing',
      'Environmental Storytelling',
      'Greyboxing',
      'Playtesting',
      'Design Documentation',
      'Rapid Prototyping',
    ],
  },
  {
    group: 'Tools',
    // Add Perforce, Jira or others only if you use them.
    items: ['Unreal Engine 5', 'Unity', 'Git', 'Visual Studio'],
  },
  {
    group: 'Technical',
    // Add 'Blueprints' or 'Basic AI behaviour implementation' if they apply.
    items: ['C#', 'C++', 'Gameplay Scripting', 'Debugging', 'Version Control'],
  },
]

export const nav = [
  { to: '/projects', label: 'Work' },
  { to: '/level-design', label: 'Level Design' },
  { to: '/combat-design', label: 'Combat Design' },
  { to: '/process', label: 'Process' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
]

// The backbone shown on the home page and reused by case studies.
export const spine = ['Intent', 'Design', 'Prototype', 'Playtest', 'Problem', 'Iteration', 'Result']
