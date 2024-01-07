/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blueFM: '#101828',
        lightGreyFM: '#e4e7ec',
        greenFM: '#119C3C',
        textGreyFM: '#344054',
        livestockFM: '#f3f0ed',
        borderGreen: '#008627',
        beigeGrey: '#667085',
        tertiary: '#EDE8E4',
        redFM: '#F0384E',
      },
    },
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
}
