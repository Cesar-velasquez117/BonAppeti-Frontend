/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#8A0917',

          secondary: '#FFFF',

          accent: '#56AB00',

          neutral: 'D9D9D9',

          'base-100': '#FFFF',

          info: '#3ABFF8',

          success: '#7AF078',

          warning: '#FBBD23',

          error: '#F97171'
        }
      }
    ]
  }
};
