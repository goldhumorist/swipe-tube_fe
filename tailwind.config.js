/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'gradient-primary': `linear-gradient(to right, ${theme(
          'colors.purple',
        )}, ${theme('colors.blue')})`,
      }),
      fontFamily: {
        montserrat: ['Montserrat'],
      },
      fontSize: {
        'h1-mobile': '2.125rem',
        'h2-mobile': '2rem',
        'h3-mobile': '1.75rem',
        'h4-mobile': '1.5rem',
        'body-main-mobile': '1.063rem',
        'body-caption-mobile': '0.938rem',
        'body-small-mobile': '0.813rem',
        h1: '3.75rem',
        h2: '3.125rem',
        h3: '2.5rem',
        h4: '1.875rem',
        'body-main': '1.15rem',
        'body-caption': '0.938rem',
        'body-small': '0.813rem',
      },
      colors: {
        'bg-primary': '#CAF0F8',
        'bg-secondary': 'rgba(255, 255, 255, 0.7)',
        'danger-primary': '#FF5858',
        'text-primary-black': '#000000',
        'text-primary-white': '#FFFFFF',
        purple: 'rgba(162, 89, 255, 1)',
        blue: 'rgba(0, 207, 253, 1)',
      },
      boxShadow: {
        container: '0 10px 40px 5px rgba(66, 68, 90, 0.3);',
      },
    },
  },
  plugins: [],
};
