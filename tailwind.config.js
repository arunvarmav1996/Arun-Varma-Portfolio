/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#131416', 900: '#1A1C1F', 800: '#22252A', 700: '#2E3238', 600: '#3D424A' },
        bone: { DEFAULT: '#ECE6DA', dim: '#B9B3A8', mute: '#8F8B82' },
        brass: '#C8A24A',
        combat: '#C2674E',
        traverse: '#6F9BC0',
        story: '#A68FC4',
        optional: '#86A886',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Arial Narrow', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { page: '1240px', prose: '68ch' },
    },
  },
  plugins: [],
}
