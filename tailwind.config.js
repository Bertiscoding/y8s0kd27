/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#5856D6",
        "brand-primary-light": "#DFDEF7",
        "brand-primary-light-II": "#7D7CDF",
        "brand-primary-dark": "#545479",
        "brand-primary-dark-II": "#F3F3F7 ",
        "brand-off-white": "#F6F8FA",
        "brand-grey-light": "#D5DBE1",
        "brand-grey": "#6A7383",
        "brand-grey-dark": "#707070",
        "brand-dark": "#30313D",
      },
      spacing: {
        base: '15px',
      },
      fontSize: {
        'xxs-10': ['10px', {fontWeight: '600'}],
      },
    },
  },
  plugins: [],
};
