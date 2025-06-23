import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './contexts/**/*.{js,ts,jsx,tsx,mdx}',
      './providers/**/*.{js,ts,jsx,tsx,mdx}',
      './hooks/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
      extend: {
        colors: {
          // Electric neon green primary colors
          primary: {
            DEFAULT: '#39FF14', // Electric green
            50: '#F0FFF0',
            100: '#E6FFE6',
            200: '#CCFFCC',
            300: '#99FF99',
            400: '#66FF66',
            500: '#39FF14', // Main electric green
            600: '#00FF00', // Pure green
            700: '#00E600',
            800: '#00CC00',
            900: '#009900',
            950: '#006600',
          },
          // Bright electric cyan highlight
          highlight: {
            DEFAULT: '#00FFFF',
            50: '#F0FFFF',
            100: '#E6FFFF',
            200: '#CCFFFF',
            300: '#99FFFF',
            400: '#66FFFF',
            500: '#00FFFF', // Electric cyan
            600: '#00E6E6',
            700: '#00CCCC',
            800: '#009999',
            900: '#006666',
            950: '#003333',
          },
          // Pure black backgrounds for maximum contrast
          background: {
            DEFAULT: '#000000', // Pure black
            primary: '#000000',
            secondary: '#050505',
            tertiary: '#0A0A0A',
            quaternary: '#0F0F0F',
          },
          // Dark green-tinted surfaces
          surface: {
            DEFAULT: '#0A1A0A', // Very dark green tint
            primary: '#0A1A0A',
            secondary: '#0F1F0F',
            tertiary: '#142914',
            elevated: '#1A331A',
          },
          // Bright green text colors
          text: {
            DEFAULT: '#39FF14', // Electric green primary text
            primary: '#39FF14',
            secondary: '#66FF66', // Lighter green for supporting text
            tertiary: '#99FF99',
            muted: '#CCFFCC',
            contrast: '#000000', // For text on bright backgrounds
          },
          // Accent colors
          accent: {
            DEFAULT: '#00FFFF', // Electric cyan
            cyan: '#00FFFF',
            green: '#39FF14',
            emerald: '#00FF7F',
            lime: '#32FF32',
            gray: '#0A1A0A',
          },
          // Enhanced gradient colors
          gradient: {
            DEFAULT: '#39FF14',
            electric: {
              from: '#39FF14',
              to: '#00FF00',
            },
            cyber: {
              from: '#00FFFF',
              to: '#00E6E6',
            },
            matrix: {
              from: '#39FF14',
              via: '#00FF7F',
              to: '#00FFFF',
            },
            void: {
              from: '#000000',
              to: '#0A1A0A',
            },
          },
          // Ring colors for focus states
          ringColor: {
            DEFAULT: '#39FF14',
            primary: {
              DEFAULT: '#39FF14',
              50: '#F0FFF0',
              100: '#E6FFE6',
              200: '#CCFFCC',
              300: '#99FF99',
              400: '#66FF66',
              500: '#39FF14',
              600: '#00FF00',
              700: '#00E600',
              800: '#00CC00',
              900: '#009900',
              950: '#006600',
            },
            highlight: '#00FFFF',
          },
          ringOffsetColor: {
            DEFAULT: '#000000',
            primary: '#000000',
            surface: '#0A1A0A',
          },
          // Border colors
          border: {
            DEFAULT: '#0A1A0A',
            primary: '#39FF14',
            secondary: '#00FFFF',
            muted: '#66FF66',
            dark: '#000000',
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
          cyber: ['Orbitron', 'system-ui', 'sans-serif'],
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
          // Intense electric green glow effects
          'glow': '0 0 20px rgba(57, 255, 20, 0.6), 0 0 40px rgba(57, 255, 20, 0.4), 0 0 80px rgba(57, 255, 20, 0.2)',
          'glow-lg': '0 0 30px rgba(57, 255, 20, 0.7), 0 0 60px rgba(57, 255, 20, 0.5), 0 0 120px rgba(57, 255, 20, 0.3)',
          'glow-xl': '0 0 40px rgba(57, 255, 20, 0.8), 0 0 80px rgba(57, 255, 20, 0.6), 0 0 160px rgba(57, 255, 20, 0.4)',
          'glow-2xl': '0 0 60px rgba(57, 255, 20, 0.9), 0 0 120px rgba(57, 255, 20, 0.7), 0 0 240px rgba(57, 255, 20, 0.5)',
          // Electric cyan glow effects
          'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 80px rgba(0, 255, 255, 0.2)',
          'glow-cyan-lg': '0 0 30px rgba(0, 255, 255, 0.7), 0 0 60px rgba(0, 255, 255, 0.5), 0 0 120px rgba(0, 255, 255, 0.3)',
          'glow-cyan-xl': '0 0 40px rgba(0, 255, 255, 0.8), 0 0 80px rgba(0, 255, 255, 0.6), 0 0 160px rgba(0, 255, 255, 0.4)',
          // Matrix-style multi-layer glow
          'matrix': '0 0 20px rgba(57, 255, 20, 0.8), 0 0 40px rgba(0, 255, 127, 0.6), 0 0 80px rgba(0, 255, 255, 0.4)',
          'matrix-lg': '0 0 30px rgba(57, 255, 20, 0.9), 0 0 60px rgba(0, 255, 127, 0.7), 0 0 120px rgba(0, 255, 255, 0.5)',
          // Outer aura effects
          'aura': '0 0 60px rgba(57, 255, 20, 0.3), 0 0 120px rgba(57, 255, 20, 0.2)',
          'aura-lg': '0 0 80px rgba(57, 255, 20, 0.4), 0 0 160px rgba(57, 255, 20, 0.3)',
          'aura-xl': '0 0 120px rgba(57, 255, 20, 0.5), 0 0 240px rgba(57, 255, 20, 0.4)',
          // Card shadows for pure black theme
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.8), 0 2px 4px -1px rgba(0, 0, 0, 0.6)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.9), 0 4px 6px -2px rgba(0, 0, 0, 0.7)',
          'card-glow': '0 4px 6px -1px rgba(0, 0, 0, 0.8), 0 0 20px rgba(57, 255, 20, 0.4)',
          // Inner glow effects
          'inner-glow': 'inset 0 2px 4px 0 rgba(57, 255, 20, 0.2)',
          'inner-glow-cyan': 'inset 0 2px 4px 0 rgba(0, 255, 255, 0.2)',
          // Pure black shadows
          'void': '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
          'void-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.95)',
        },
        backdropBlur: {
          'xs': '2px',
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'pulse-electric': 'electric-pulse 2s ease-in-out infinite',
          'bounce-slow': 'bounce 2s infinite',
          'glow': 'electric-glow 2s ease-in-out infinite alternate',
          'glow-cyan': 'cyan-glow 2s ease-in-out infinite alternate',
          'glow-intense': 'intense-glow 1.5s ease-in-out infinite alternate',
          'gradient': 'gradient 3s ease infinite',
          'matrix-rain': 'matrix-effect 4s linear infinite',
          'float': 'float 6s ease-in-out infinite',
          'flicker': 'electric-flicker 0.8s infinite linear',
          'scan': 'scan-line 2s linear infinite',
        },
        keyframes: {
          'electric-glow': {
            '0%': { 
              boxShadow: '0 0 20px rgba(57, 255, 20, 0.6), 0 0 40px rgba(57, 255, 20, 0.4), 0 0 80px rgba(57, 255, 20, 0.2)' 
            },
            '100%': { 
              boxShadow: '0 0 30px rgba(57, 255, 20, 0.8), 0 0 60px rgba(57, 255, 20, 0.6), 0 0 120px rgba(57, 255, 20, 0.4)' 
            },
          },
          'cyan-glow': {
            '0%': { 
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4)' 
            },
            '100%': { 
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6)' 
            },
          },
          'intense-glow': {
            '0%': { 
              boxShadow: '0 0 30px rgba(57, 255, 20, 0.8), 0 0 60px rgba(57, 255, 20, 0.6), 0 0 120px rgba(57, 255, 20, 0.4)',
              filter: 'brightness(1)'
            },
            '100%': { 
              boxShadow: '0 0 50px rgba(57, 255, 20, 1), 0 0 100px rgba(57, 255, 20, 0.8), 0 0 200px rgba(57, 255, 20, 0.6)',
              filter: 'brightness(1.2)'
            },
          },
          'electric-pulse': {
            '0%, 100%': { 
              opacity: '1',
              transform: 'scale(1)'
            },
            '50%': { 
              opacity: '0.8',
              transform: 'scale(1.05)'
            },
          },
          'matrix-effect': {
            '0%': { 
              backgroundPosition: '0% 0%',
              opacity: '0.8'
            },
            '100%': { 
              backgroundPosition: '0% 100%',
              opacity: '1'
            },
          },
          gradient: {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          'electric-flicker': {
            '0%, 100%': { opacity: '1' },
            '20%': { opacity: '0.9' },
            '40%': { opacity: '0.95' },
            '60%': { opacity: '0.85' },
            '80%': { opacity: '0.98' },
          },
          'scan-line': {
            '0%': { 
              transform: 'translateY(-100%)',
              opacity: '0'
            },
            '50%': { 
              opacity: '1'
            },
            '100%': { 
              transform: 'translateY(100vh)',
              opacity: '0'
            },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'gradient-electric': 'linear-gradient(135deg, rgba(57, 255, 20, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)',
          'gradient-matrix': 'linear-gradient(45deg, rgba(57, 255, 20, 0.05) 0%, rgba(0, 255, 127, 0.05) 50%, rgba(0, 255, 255, 0.05) 100%)',
          'gradient-void': 'radial-gradient(circle at center, rgba(57, 255, 20, 0.1) 0%, rgba(0, 0, 0, 1) 70%)',
          'circuit-pattern': `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(57, 255, 20, 0.03) 2px,
            rgba(57, 255, 20, 0.03) 4px
          )`,
        },
      },
    },
  } as const;

export default config;