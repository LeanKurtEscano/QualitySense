/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        customPurple3:'#8826E4',

        customtext:'#1DB6C1',
        darkbg:"#1F1F1F",
        darkpurple:"#9171f8",
        inputcolor: "#3f3f3f",
        inputtext: "#717171",
        formcolor: "#282828",
        formhover: "#4C4A4A",
        darktext: "#ba9ffb",
        darktext2: "#8b8b8b",
        darktext3: "#C9C9C9",
        buttonbg: '#1DB6C1',
        googlebg: '#828592'
          // 8826E4
      }
    },
  },
  plugins: [],
}

