/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     "./src/**/*.{js,jsx,ts,tsx}",
       "./node_modules/flowbite/**/*.js"
   ],
   theme: {
     extend: {
         colors: {
         'colegio-background': '#F2F0EB',
         'colegio-light-green': '#00FFAB',
         'colegio-green': '#14C38E',
         'colegio-dark-green': '#1A6A52',
         'colegio-green-2':'#A2FFE0'

    },
     },
   },
   plugins: [
       require('flowbite/plugin')
   ],
 }