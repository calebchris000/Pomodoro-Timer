/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "violet-light": "#9280B4",
        "violet-lighter": "#E6BFED",
        "violet-lightest": "#FDE3F3",
        "violet-bg": "#252B4E",
      },
      fontFamily: {
        "poppins": ["Poppins", "san-serif"],
      },
    },
  },
  plugins: [],
};
