
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emsPink: '#E94E77',
        emsOrange: '#F9D423',
        emsYellow: '#FCEE21',
        emsGreen: '#00A99D',
        emsBlue: '#3FA9F5',
        emsPurple: '#662D91',
        emsWhite: '#FFFFFF',
      },
    },
  },
  plugins: [],
}