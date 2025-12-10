/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mac: {
          gray: '#ececeb', // Classic Mac OS background
          window: '#ffffff',
          border: '#000000',
          title: '#dddddd',
          blue: '#0000aa', // Selection blue
        }
      },
      fontFamily: {
        retro: ['"Chicago"', '"Geneva"', 'sans-serif'], // Fallback stack simulating retro
        mono: ['"Monaco"', 'monospace'],
      },
      boxShadow: {
        'retro': '2px 2px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}
