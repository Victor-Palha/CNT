/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      "textColor": {
        "red": "#ff003c",
      },
      "backgroundColor": {
        "blue": "#136377",
        "red": "#ff003cb4",
      },
    },
  },
  plugins: [],
}

