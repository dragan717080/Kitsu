const plugin = require('tailwindcss/plugin');
const colorNames=require('./config/color-names');

let myStyles = {};
colorNames.forEach((color) => {
  myStyles[`.bg-${color}`] = { background: color };
  myStyles[`.t-${color}`] = { color };
});

module.exports = plugin(({ addUtilities }) => {
  addUtilities(myStyles);
});
