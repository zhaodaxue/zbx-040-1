/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#E8F2FC',
          100: '#D1E6F9',
          200: '#A3CDF3',
          300: '#75B4ED',
          400: '#479BE7',
          500: '#4A90D9',
          600: '#3B73AE',
          700: '#2C5682',
          800: '#1E3A57',
          900: '#0F1D2B',
        },
        tooth: {
          normal: '#FAFAFA',
          loose: '#FF9800',
          fallen: '#9E9E9E',
          permanent: '#4CAF50',
        },
        accent: {
          pink: '#F8BBD0',
          purple: '#E1BEE7',
        }
      },
      fontFamily: {
        display: ['"ZCOOL KuaiLe"', '"Noto Sans SC"', 'sans-serif'],
        body: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'none', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(24px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
