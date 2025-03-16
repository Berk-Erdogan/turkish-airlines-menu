/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'thy-red': '#E81932',
          'thy-dark-red': '#C61122',
          'thy-gray': '#5C5C5C',
          'thy-light-gray': '#F5F5F5',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        boxShadow: {
          'card': '0 2px 5px 0 rgba(0, 0, 0, 0.1)',
          'card-hover': '0 4px 10px 0 rgba(0, 0, 0, 0.1)',
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
        },
        animation: {
          'pulse-red': 'pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }