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
        "blue-cyber": "#136377",
        "red-cyber": "#ff003cb4",
      },
      keyframes: {
        activeCard: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)', boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)' },
          '50%': { transform: 'scale(1.05)', filter: 'brightness(1.2)', boxShadow: '0 0 20px rgba(255, 0, 0, 0.7)' },
        },
        popup: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '25%': { transform: 'scale(1)', opacity: 1 }, // Adiciona um estado intermediário
          '100%': { transform: 'scale(0)', opacity: 0 },
        }
      },
      animation: {
        activeCard: 'activeCard 1s ease-in-out',
        popup: 'popup 3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

