import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // Primary brand colors
          primary: {
            DEFAULT: '#843dff',
            50: '#f3f1ff',
            100: '#ebe5ff',
            200: '#d9ceff',
            300: '#bea6ff',
            400: '#9f75ff',
            500: '#843dff',
            600: '#7c1aff',
            700: '#7012ea',
            800: '#5a0fc4',
            900: '#4b0da2',
            950: '#2d0663',
          },
          // Dark theme colors
          dark: {
            DEFAULT: '#1e293b',
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          },
          // Background colors for the dark theme
          background: {
            DEFAULT: '#0a0a0b',
            primary: '#0a0a0b',
            secondary: '#1a1a1d',
            tertiary: '#2d2d33',
            quaternary: '#3a3a42',
          },
          // Surface colors
          surface: {
            DEFAULT: '#1e1e23',
            primary: '#1e1e23',
            secondary: '#26262d',
            tertiary: '#2f2f38',
            elevated: '#35353f',
          },
          // Text colors
          text: {
            DEFAULT: '#ffffff',
            primary: '#ffffff',
            secondary: '#a1a1aa',
            tertiary: '#71717a',
            muted: '#52525b',
          },
          // Accent colors from the image
          accent: {
            DEFAULT: '#843dff',
            purple: '#843dff',
            pink: '#ff4081',
            cyan: '#00bcd4',
            orange: '#ff9800',
            red: '#f44336',
            green: '#4caf50',
          },
          // Gradient colors
          gradient: {
            DEFAULT: '#843dff',
            purple: {
              from: '#843dff',
              to: '#7c1aff',
            },
            pink: {
              from: '#ff4081',
              to: '#e91e63',
            },
            cyan: {
              from: '#00bcd4',
              to: '#0097a7',
            },
            multicolor: {
              from: '#ff4081',
              via: '#843dff',
              to: '#00bcd4',
            },
          },
          ringColor: {
            DEFAULT: '#843dff',
            primary: {
              DEFAULT: '#843dff',
              50: '#f3f1ff',
              100: '#ebe5ff',
              200: '#d9ceff',
              300: '#bea6ff',
              400: '#9f75ff',
              500: '#843dff',
              600: '#7c1aff',
              700: '#7012ea',
              800: '#5a0fc4',
              900: '#4b0da2',
              950: '#2d0663',
            },
          },
          ringOffsetColor: {
            DEFAULT: '#843dff',
            primary: {
              DEFAULT: '#843dff',
              50: '#f3f1ff',
              100: '#ebe5ff',
              200: '#d9ceff',
              300: '#bea6ff',
              400: '#9f75ff',
              500: '#843dff',
              600: '#7c1aff',
              700: '#7012ea',
              800: '#5a0fc4',
              900: '#4b0da2',
              950: '#2d0663',
            },
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        },
        fontSize: {
          'xs': ['0.75rem', { lineHeight: '1rem' }],
          'sm': ['0.875rem', { lineHeight: '1.25rem' }],
          'base': ['1rem', { lineHeight: '1.5rem' }],
          'lg': ['1.125rem', { lineHeight: '1.75rem' }],
          'xl': ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1' }],
          '6xl': ['3.75rem', { lineHeight: '1' }],
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
          '128': '32rem',
        },
        borderRadius: {
          'xl': '0.75rem',
          '2xl': '1rem',
          '3xl': '1.5rem',
          '4xl': '2rem',
        },
        boxShadow: {
          'glow': '0 0 20px rgba(132, 61, 255, 0.3)',
          'glow-lg': '0 0 30px rgba(132, 61, 255, 0.4)',
          'glow-xl': '0 0 40px rgba(132, 61, 255, 0.5)',
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
          'inner-glow': 'inset 0 2px 4px 0 rgba(132, 61, 255, 0.1)',
          'dark': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          'dark-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.6)',
        },
        backdropBlur: {
          'xs': '2px',
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 2s infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'gradient': 'gradient 3s ease infinite',
          'float': 'float 6s ease-in-out infinite',
        },
        keyframes: {
          glow: {
            '0%': { boxShadow: '0 0 20px rgba(132, 61, 255, 0.3)' },
            '100%': { boxShadow: '0 0 30px rgba(132, 61, 255, 0.6)' },
          },
          gradient: {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'gradient-mesh': 'linear-gradient(135deg, rgba(132, 61, 255, 0.1) 0%, rgba(255, 64, 129, 0.1) 100%)',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  } as const;

export default config;