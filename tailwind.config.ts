import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── NutriLoop Brand Palette ──────────────────────────────────────────
        brand: {
          // Forest Green — primary (from logo)
          green: {
            DEFAULT: '#2E7D32',
            50: '#E8F5E9',
            100: '#C8E6C9',
            200: '#A5D6A7',
            300: '#81C784',
            400: '#66BB6A',
            500: '#4CAF50',
            600: '#43A047',
            700: '#388E3C',
            800: '#2E7D32',
            900: '#1B5E20',
            950: '#0A1A0A',
          },
          // Earth Brown — secondary (from logo)
          brown: {
            DEFAULT: '#6D3B0A',
            50: '#FBF0E6',
            100: '#F3D5B5',
            200: '#E8B67A',
            300: '#D4924A',
            400: '#B8722A',
            500: '#8D4E12',
            600: '#6D3B0A',
            700: '#4E2907',
            800: '#321804',
            900: '#180C01',
          },
          // Warm Amber — accent (CTAs, highlights)
          amber: {
            DEFAULT: '#B85C00',
            50: '#FFF3E0',
            100: '#FFE0B2',
            200: '#FFCC80',
            300: '#FFB74D',
            400: '#FFA726',
            500: '#FF9800',
            600: '#E65100',
            700: '#B85C00',
            800: '#8B4200',
            900: '#5E2D00',
          },
          // Off-white green — light base
          offwhite: '#F5F7F2',
          // Deep green-black — dark base
          dark: '#0A1A0A',
        },
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-clash-display)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'Menlo', 'monospace'],
      },

      fontSize: {
        // Hero H1
        hero: ['clamp(2.25rem, 5vw + 1rem, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        // Section H2
        h2: ['clamp(1.75rem, 3vw + 0.5rem, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        // Sub-heading H3
        h3: ['clamp(1.25rem, 2vw + 0.25rem, 1.75rem)', { lineHeight: '1.3' }],
      },

      spacing: {
        section: '5rem',
        'section-sm': '3rem',
      },

      borderRadius: {
        glass: '16px',
        card: '12px',
      },

      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 24px rgba(46, 125, 50, 0.15)',
      },

      backdropBlur: {
        glass: '20px',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-dark':
          'linear-gradient(180deg, rgba(10, 26, 10, 0.95) 0%, rgba(10, 26, 10, 0.7) 60%, rgba(10, 26, 10, 0.9) 100%)',
        'section-fade':
          'linear-gradient(180deg, transparent 0%, rgba(10, 26, 10, 0.05) 100%)',
      },

      animation: {
        'counter-up': 'counterUp 2s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'ticker-scroll': 'tickerScroll 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'logo-grey': 'logoGrey 0.3s ease-out forwards',
      },

      keyframes: {
        counterUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        tickerScroll: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
