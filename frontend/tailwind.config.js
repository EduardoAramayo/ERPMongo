/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#00796b', // Verde azulado
          secondary: '#0288d1', // Azul cielo
          background: '#f4f6f8', // Fondo claro
        },
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };