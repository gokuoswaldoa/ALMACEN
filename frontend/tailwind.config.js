export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          // Fondos y superficies
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          surfaceMuted: '#F1F5F9',
          
          // Primario (Menta)
          primary: '#006c49',
          primaryHover: '#059669',
          primaryContainer: '#D1FAE5',
          onPrimaryContainer: '#065F46',
          
          // Secundario (Lavanda)
          secondary: '#6b38d4',
          secondaryContainer: '#EDE9FE',
          onSecondaryContainer: '#5B21B6',
          
          // Terciario (Ice Blue / Peach)
          iceBg: '#E0F2FE',
          iceText: '#075985',
          peachBg: '#FFEDD5',
          peachText: '#9A3412',
          
          // Textos
          textHeading: '#0F172A',
          textBody: '#334155',
          textMuted: '#64748B',
          
          // Bordes
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      spacing: {
        'thumb-reach': '5.5rem',
        'thumb-btn': '52px',
        'thumb-touch': '48px',
        'thumb-touch-min': '44px'
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out forwards',
      },
      borderRadius: {
        'xl': '16px',
      },
      boxShadow: {
        'card': '0 2px 4px -1px rgba(15, 23, 42, 0.03), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',
        'float': '0 12px 28px -6px rgba(15, 23, 42, 0.10), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',
      }
    },
  },
  plugins: [],
}
