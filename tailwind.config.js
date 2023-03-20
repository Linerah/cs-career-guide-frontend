/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
     extend: {
         colors: {
         'colegio-background': '#E7F6D2',
         'colegio-light-green': '#00FFAB',
         'colegio-green': '#14C38E',
         'colegio-dark-green': '#1A6A52'

    },
     },
   },
   plugins: [],
 }