/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3A4D6D',
          dark: '#2A3A55',
          light: '#AFC8E6',
        },
        bg: {
          DEFAULT: '#FFFCF2',
          dark: '#1A2235',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#243044',
          '2': '#F5F0E8',
          '2dark': '#2D3D56',
        },
        palette: {
          peach: '#FFD4B2',
          yellow: '#FFEB99',
          mint: '#CDE8D3',
          blue: '#AFC8E6',
        },
        'palette-hover': {
          peach: '#FFC090',
          yellow: '#FFD966',
          mint: '#A8D8B8',
          blue: '#8BB4D8',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1400px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
