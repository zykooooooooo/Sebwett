/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#dc2626', // Red
          dark: '#b91c1c',
        },
        dark: {
          DEFAULT: '#374151', // Dark gray
          light: '#4b5563',
          darker: '#1f2937',
        }
      },
    },
  },
  plugins: [],
} 