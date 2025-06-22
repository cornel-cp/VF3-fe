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
          // Primary neon lime green colors
          primary: {
            DEFAULT: '#B6FF4C',
            50: '#F7FFE6',
            100: '#EFFFCC',
            200: '#E4FF99',
            300: '#D4FF82', // Glow aura soft chartreuse
            400: '#C5FF66',
            500: '#B6FF4C', // Main neon lime green
            600: '#9FE62D',
            700: '#7ACC1F',
            800: '#5C9915',
            900: '#3D660E',
            950: '#1F3307',
          },
          // Cyber teal highlight color
          highlight: {
            DEFAULT: '#00FFC3',
            50: '#E6FFFA',
            100: '#CCFFF5',
            200: '#99FFEB',
            300: '#66FFE0',
            400: '#33FFD6',
            500: '#00FFC3', // Main cyber teal
            600: '#00CC9C',
            700: '#009974',
            800: '#00664D',
            900: '#003326',
            950: '#001A13',
          },
          // Background colors - rich black theme
          background: {
            DEFAULT: '#060606', // Rich black
            primary: '#060606',
            secondary: '#0A0A0A',
            tertiary: '#0F0F0F',
            quaternary: '#141414',
          },
          // Surface colors
          surface: {
            DEFAULT: '#1A1F1A', // Muted greenish gray
            primary: '#1A1F1A',
            secondary: '#1F241F',
            tertiary: '#242924',
            elevated: '#292E29',
          },
          // Text colors
          text: {
            DEFAULT: '#B6FF4C', // Neon lime green for primary text
            primary: '#B6FF4C',
            secondary: '#B9B9B9', // Light gray for supporting text
            tertiary: '#8A8A8A',
            muted: '#6B6B6B',
            contrast: '#060606', // For text on bright backgrounds
          },
          // Accent colors
          accent: {
            DEFAULT: '#00FFC3', // Cyber teal
            teal: '#00FFC3',
            green: '#B6FF4C',
            gray: '#1A1F1A', // Muted greenish gray
            light: '#B9B9B9',
          },
          // Gradient colors
          gradient: {
            DEFAULT: '#B6FF4C',
            neon: {
              from: '#B6FF4C',
              to: '#D4FF82',
            },
            teal: {
              from: '#00FFC3',
              to: '#00CC9C',
            },
            cyber: {
              from: '#B6FF4C',
              via: '#00FFC3',
              to: '#D4FF82',
            },
            dark: {
              from: '#060606',
              to: '#1A1F1A',
            },
          },
          // Ring colors for focus states
          ringColor: {
            DEFAULT: '#B6FF4C',
            primary: {
              DEFAULT: '#B6FF4C',
              50: '#F7FFE6',
              100: '#EFFFCC',
              200: '#E4FF99',
              300: '#D4FF82',
              400: '#C5FF66',
              500: '#B6FF4C',
              600: '#9FE62D',
              700: '#7ACC1F',
              800: '#5C9915',
              900: '#3D660E',
              950: '#1F3307',
            },
            highlight: '#00FFC3',
          },
          ringOffsetColor: {
            DEFAULT: '#060606',
            primary: '#060606',
            surface: '#1A1F1A',
          },
          // Border colors
          border: {
            DEFAULT: '#1A1F1A', // Muted greenish gray
            primary: '#B6FF4C',
            secondary: '#00FFC3',
            muted: '#B9B9B9',
            dark: '#060606',
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
          // Neon green glow effects
          'glow': '0 0 20px rgba(182, 255, 76, 0.4)',
          'glow-lg': '0 0 30px rgba(182, 255, 76, 0.5)',
          'glow-xl': '0 0 40px rgba(182, 255, 76, 0.6)',
          'glow-2xl': '0 0 60px rgba(182, 255, 76, 0.7)',
          // Cyber teal glow effects
          'glow-teal': '0 0 20px rgba(0, 255, 195, 0.4)',
          'glow-teal-lg': '0 0 30px rgba(0, 255, 195, 0.5)',
          'glow-teal-xl': '0 0 40px rgba(0, 255, 195, 0.6)',
          // Soft chartreuse outer glow
          'aura': '0 0 40px rgba(212, 255, 130, 0.3)',
          'aura-lg': '0 0 60px rgba(212, 255, 130, 0.4)',
          // Card shadows for dark theme
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
          'card-glow': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 0 20px rgba(182, 255, 76, 0.2)',
          // Inner glow effects
          'inner-glow': 'inset 0 2px 4px 0 rgba(182, 255, 76, 0.1)',
          'inner-glow-teal': 'inset 0 2px 4px 0 rgba(0, 255, 195, 0.1)',
          // Dark theme shadows
          'dark': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          'dark-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.8)',
        },
        backdropBlur: {
          'xs': '2px',
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 2s infinite',
          'glow': 'neon-glow 2s ease-in-out infinite alternate',
          'glow-teal': 'teal-glow 2s ease-in-out infinite alternate',
          'gradient': 'gradient 3s ease infinite',
          'float': 'float 6s ease-in-out infinite',
          'flicker': 'flicker 1.5s infinite linear',
        },
        keyframes: {
          'neon-glow': {
            '0%': { 
              boxShadow: '0 0 20px rgba(182, 255, 76, 0.4), 0 0 40px rgba(212, 255, 130, 0.2)' 
            },
            '100%': { 
              boxShadow: '0 0 30px rgba(182, 255, 76, 0.6), 0 0 60px rgba(212, 255, 130, 0.4)' 
            },
          },
          'teal-glow': {
            '0%': { boxShadow: '0 0 20px rgba(0, 255, 195, 0.4)' },
            '100%': { boxShadow: '0 0 30px rgba(0, 255, 195, 0.6)' },
          },
          gradient: {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          flicker: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'gradient-neon': 'linear-gradient(135deg, rgba(182, 255, 76, 0.1) 0%, rgba(0, 255, 195, 0.1) 100%)',
          'gradient-cyber': 'linear-gradient(45deg, rgba(182, 255, 76, 0.05) 0%, rgba(212, 255, 130, 0.05) 50%, rgba(0, 255, 195, 0.05) 100%)',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  } as const;

export default config;