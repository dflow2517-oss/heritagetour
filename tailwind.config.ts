import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5ecd7',
        ink: '#2a1810',
        'burnt-orange': '#b8491c',
        saddle: '#8b4513',
        forest: '#3d5a3d',
        tan: '#7a5c2e',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Crimson Text"', 'Georgia', 'serif'],
        accent: ['"Special Elite"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
