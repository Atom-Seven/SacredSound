/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(214.3 31.8% 91.4%)',
        background: 'hsl(222.2 47.4% 11.2%)',
        foreground: 'hsl(210 40% 98%)',
      },
    },
  },
  plugins: [],
};