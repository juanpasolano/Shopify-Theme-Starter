const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./theme/**/*.liquid"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
