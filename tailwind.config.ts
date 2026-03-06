import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        surface: {
          DEFAULT: '#1A1A1A',
          elevated: '#222222',
          hover: '#282828',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          hover: 'rgba(255, 255, 255, 0.12)',
        },
        accent: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#3B82F6',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A1A1A1',
          muted: '#6B6B6B',
        },
        status: {
          applied: { text: '#60A5FA', bg: '#1E3A8A25' },
          inTouch: { text: '#34D399', bg: '#06502825' },
          followUp: { text: '#FBBF24', bg: '#78350F25' },
          interview: { text: '#A78BFA', bg: '#5B21B625' },
          offer: { text: '#C084FC', bg: '#6B21A825' },
          rejected: { text: '#F87171', bg: '#7F1D1D25' },
          ghosted: { text: '#9CA3AF', bg: '#37415125' },
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.5)',
        'button': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at top, rgba(37, 99, 235, 0.15), transparent)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config
