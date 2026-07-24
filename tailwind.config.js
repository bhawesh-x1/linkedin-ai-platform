/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#5B5FEF',
          blue: '#74B9FF',
          violet: '#7C6BFF',
          50: '#F0F2FF',
          100: '#E1E5FF',
          500: '#5B5FEF',
          600: '#4B4FE0',
          700: '#3B3FCF',
        },
        bgLight: '#FCFCFD',
        surfaceLight: '#F7F8FC',
        borderLight: '#E6EAF2',
        headingLight: '#111827',
        bodyLight: '#6B7280',
        
        bgDark: '#0B0E14',
        surfaceDark: '#141824',
        borderDark: '#23293A',
        headingDark: '#F9FAFB',
        bodyDark: '#9CA3AF',
        
        statusSuccess: '#22C55E',
        statusWarning: '#F59E0B',
        statusDanger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'soft': '0 10px 40px rgba(17, 24, 39, 0.06)',
        'floating': '0 30px 80px rgba(91, 95, 239, 0.15)',
        'glow': '0 0 50px rgba(91, 95, 239, 0.25)',
        'glow-violet': '0 0 50px rgba(124, 107, 255, 0.3)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 0%, rgba(91, 95, 239, 0.15) 0%, rgba(124, 107, 255, 0.08) 35%, transparent 70%)',
        'dark-hero-gradient': 'radial-gradient(circle at 50% 0%, rgba(91, 95, 239, 0.25) 0%, rgba(124, 107, 255, 0.12) 40%, transparent 75%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(247,248,252,0.6) 100%)',
        'card-gradient-dark': 'linear-gradient(135deg, rgba(20,24,36,0.9) 0%, rgba(11,14,20,0.6) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
