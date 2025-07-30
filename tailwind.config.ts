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
        // Warm orange/coral primary colors
        primary: {
          DEFAULT: '#FF6B35', // Warm orange like the fox
          50: '#FFF7F3',
          100: '#FFEDE6',
          200: '#FFD9CC',
          300: '#FFB899',
          400: '#FF9166',
          500: '#FF6B35', // Main warm orange
          600: '#FF5722',
          700: '#E64100',
          800: '#BF360C',
          900: '#8D2F00',
          950: '#5D1F00',
        },
        // Soft pink/coral highlight
        highlight: {
          DEFAULT: '#FF8A65',
          50: '#FFF3F0',
          100: '#FFE4DE',
          200: '#FFCCBC',
          300: '#FFAB91',
          400: '#FF8A65', // Soft coral
          500: '#FF7043',
          600: '#FF5722',
          700: '#F4511E',
          800: '#E64100',
          900: '#BF360C',
          950: '#8D2F00',
        },
        // Warm cream/beige backgrounds
        background: {
          DEFAULT: '#FFF8F3', // Cream white like the image background
          primary: '#FFF8F3',
          secondary: '#F5E6D3',
          tertiary: '#EDD5C1',
          quaternary: '#E4C4AF',
        },
        // Warm beige surfaces
        surface: {
          DEFAULT: '#F5E6D3', // Warm beige
          primary: '#F5E6D3',
          secondary: '#EDD5C1',
          tertiary: '#E4C4AF',
          elevated: '#DDB39D',
        },
        // Warm text colors
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
          DEFAULT: '#FF8A65', // Coral
          coral: '#FF8A65',
          orange: '#FF6B35',
          peach: '#FFAB91',
          cream: '#FFF8F3',
          brown: '#8D2F00',
        },
        // Enhanced gradient colors
        gradient: {
          DEFAULT: '#FF6B35',
          warm: {
            from: '#FF6B35',
            to: '#FF8A65',
          },
          sunset: {
            from: '#FF5722',
            to: '#FFAB91',
          },
          cozy: {
            from: '#FFF8F3',
            via: '#FF6B35',
            to: '#FF8A65',
          },
          cream: {
            from: '#FFF8F3',
            to: '#F5E6D3',
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
        playful: ['Nunito', 'system-ui', 'sans-serif'],
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
        // Warm orange glow effects
        'glow': '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4), 0 0 80px rgba(255, 107, 53, 0.2)',
        'glow-lg': '0 0 30px rgba(255, 107, 53, 0.7), 0 0 60px rgba(255, 107, 53, 0.5), 0 0 120px rgba(255, 107, 53, 0.3)',
        'glow-xl': '0 0 40px rgba(255, 107, 53, 0.8), 0 0 80px rgba(255, 107, 53, 0.6), 0 0 160px rgba(255, 107, 53, 0.4)',
        'glow-2xl': '0 0 60px rgba(255, 107, 53, 0.9), 0 0 120px rgba(255, 107, 53, 0.7), 0 0 240px rgba(255, 107, 53, 0.5)',
        // Coral glow effects
        'glow-coral': '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 80px rgba(0, 255, 255, 0.2)',
        'glow-coral-lg': '0 0 30px rgba(0, 255, 255, 0.7), 0 0 60px rgba(0, 255, 255, 0.5), 0 0 120px rgba(0, 255, 255, 0.3)',
        'glow-coral-xl': '0 0 40px rgba(0, 255, 255, 0.8), 0 0 80px rgba(0, 255, 255, 0.6), 0 0 160px rgba(0, 255, 255, 0.4)',
        // Warm sunset multi-layer glow
        'sunset': '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(0, 255, 255, 0.6), 0 0 80px rgba(255, 171, 145, 0.4)',
        'sunset-lg': '0 0 30px rgba(255, 107, 53, 0.9), 0 0 60px rgba(0, 255, 255, 0.7), 0 0 120px rgba(255, 171, 145, 0.5)',
        // Cozy warmth effects
        'warmth': '0 0 60px rgba(255, 107, 53, 0.3), 0 0 120px rgba(255, 107, 53, 0.2)',
        'warmth-lg': '0 0 80px rgba(255, 107, 53, 0.4), 0 0 160px rgba(255, 107, 53, 0.3)',
        'warmth-xl': '0 0 120px rgba(255, 107, 53, 0.5), 0 0 240px rgba(255, 107, 53, 0.4)',
        // Card shadows for warm theme
        'card': '0 4px 6px -1px rgba(245, 230, 211, 0.8), 0 2px 4px -1px rgba(245, 230, 211, 0.6)',
        'card-hover': '0 10px 15px -3px rgba(245, 230, 211, 0.9), 0 4px 6px -2px rgba(245, 230, 211, 0.7)',
        'card-glow': '0 4px 6px -1px rgba(245, 230, 211, 0.8), 0 0 20px rgba(255, 107, 53, 0.4)',
        // Inner glow effects
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 107, 53, 0.2)',
        'inner-glow-coral': 'inset 0 2px 4px 0 rgba(0, 255, 255, 0.2)',
        // Soft warm shadows
        'cozy': '0 25px 50px -12px rgba(141, 47, 0, 0.3)',
        'cozy-lg': '0 35px 60px -12px rgba(141, 47, 0, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-warm': 'warm-pulse 2s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'warm-glow 2s ease-in-out infinite alternate',
        'glow-coral': 'coral-glow 2s ease-in-out infinite alternate',
        'glow-intense': 'intense-glow 1.5s ease-in-out infinite alternate',
        'gradient': 'gradient 3s ease infinite',
        'flutter': 'flutter-effect 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'warm-twinkle 0.8s infinite linear',
        'drift': 'cozy-drift 2s linear infinite',
      },
      keyframes: {
        'warm-glow': {
          '0%': {
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4), 0 0 80px rgba(255, 107, 53, 0.2)'
          },
          '100%': {
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.8), 0 0 60px rgba(255, 107, 53, 0.6), 0 0 120px rgba(255, 107, 53, 0.4)'
          },
        },
        'coral-glow': {
          '0%': {
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4)'
          },
          '100%': {
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6)'
          },
        },
        'intense-glow': {
          '0%': {
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.8), 0 0 60px rgba(255, 107, 53, 0.6), 0 0 120px rgba(255, 107, 53, 0.4)',
            filter: 'brightness(1)'
          },
          '100%': {
            boxShadow: '0 0 50px rgba(255, 107, 53, 1), 0 0 100px rgba(255, 107, 53, 0.8), 0 0 200px rgba(255, 107, 53, 0.6)',
            filter: 'brightness(1.2)'
          },
        },
        'warm-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)'
          },
        },
        'flutter-effect': {
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
        'warm-twinkle': {
          '0%, 100%': { opacity: '1' },
          '20%': { opacity: '0.9' },
          '40%': { opacity: '0.95' },
          '60%': { opacity: '0.85' },
          '80%': { opacity: '0.98' },
        },
        'cozy-drift': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(100vw)',
            opacity: '0'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-warm': 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)',
        'gradient-sunset': 'linear-gradient(45deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 171, 145, 0.05) 50%, rgba(0, 255, 255, 0.05) 100%)',
        'gradient-cozy': 'radial-gradient(circle at center, rgba(255, 107, 53, 0.1) 0%, rgba(255, 248, 243, 1) 70%)',
        'warm-pattern': `repeating-linear-gradient(
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