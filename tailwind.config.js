/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F4C75',
          hover: '#3282B8'
        },
        secondary: '#3282B8',
        background: {
          dark: '#1B262C',
          darker: '#1a1a1a'
        },
        text: {
          light: '#f0f0f0'
        },
        error: '#FF3B30'
      }
    },
  },
  plugins: [],
}

