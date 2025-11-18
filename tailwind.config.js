/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ucao-blue': {
          50: '#e6f0f5',
          100: '#b3d1e0',
          200: '#80b2cb',
          300: '#4d93b6',
          400: '#1a74a1',
          500: '#1e3a5f',
          600: '#1a2f4d',
          700: '#16243b',
          800: '#121929',
          900: '#0e0e17',
        },
        'ucao-red': {
          50: '#f5e6e6',
          100: '#e0b3b3',
          200: '#cb8080',
          300: '#b64d4d',
          400: '#a11a1a',
          500: '#8b1538',
          600: '#7a1230',
          700: '#690f28',
          800: '#580c20',
          900: '#470918',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-particle': 'float-particle 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out',
        'slideInRight': 'slideInRight 0.5s ease-out',
        'slideInLeft': 'slideInLeft 0.5s ease-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-particle': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-30px) translateX(10px)' },
          '50%': { transform: 'translateY(-20px) translateX(-10px)' },
          '75%': { transform: 'translateY(-40px) translateX(5px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
