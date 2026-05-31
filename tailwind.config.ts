/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#101415',
          dim: '#101415',
          bright: '#363a3b',
          'container-lowest': '#0b0f10',
          'container-low': '#191c1e',
          container: '#1d2022',
          'container-high': '#272a2c',
          'container-highest': '#323537',
        },
        on: {
          surface: '#e0e3e5',
          'surface-variant': '#c5c6cd',
        },
        outline: {
          DEFAULT: '#8f9097',
          variant: '#44474d',
        },
        primary: {
          DEFAULT: '#b9c7e4',
          container: '#0a192f',
          'on-container': '#74829d',
        },
        secondary: {
          DEFAULT: '#ffb4a4',
          container: '#b72301',
          'on-container': '#ffcdc2',
        },
        tertiary: {
          DEFAULT: '#3cddc7',
          container: '#001d19',
          'on-container': '#009282',
        },
        training: '#FF5733',
        recovery: '#2DD4BF',
        warning: '#FACC15',
        success: '#22C55E',
        error: '#ffb4ab',
      },
      fontFamily: {
        display: ['Hanken Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'monospace'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em' }],
        'headline-lg': ['32px', { lineHeight: '40px' }],
        'headline-md': ['24px', { lineHeight: '32px' }],
        'title-md': ['20px', { lineHeight: '28px' }],
        'body-lg': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'data-display': ['24px', { lineHeight: '32px', letterSpacing: '-0.05em' }],
        'label-caps': ['12px', { lineHeight: '16px' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 87, 51, 0.15)',
        'glow-teal': '0 0 20px rgba(45, 212, 191, 0.15)',
        'glow-orange-lg': '0 0 30px rgba(255, 87, 51, 0.25)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(185, 199, 228, 0.08) 0%, rgba(45, 212, 191, 0.05) 100%)',
        'btn-primary': 'linear-gradient(135deg, #FF5733, #FF7043)',
        'surface-gradient': 'linear-gradient(135deg, #0a0f14 0%, #101415 50%, #0d1117 100%)',
      },
      backdropBlur: {
        glass: '20px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'beam-grow': 'beamGrow 1s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
        beamGrow: {
          '0%': { strokeDashoffset: '80' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
