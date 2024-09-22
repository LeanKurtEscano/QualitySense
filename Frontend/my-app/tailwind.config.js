/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        customPurple1: '#AC62F2',
        customPurple2:'#9F60DA',
        customPurple3:'#8826E4', // // 
      }
    },
  },
  plugins: [],
}

