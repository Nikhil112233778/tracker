import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#1A1A1A',
        'surface-hover': '#252525',
        border: '#2A2A2A',
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
          muted: '#707070',
        },
        status: {
          applied: { text: '#60A5FA', bg: '#1E3A8A20' },
          inTouch: { text: '#4ADE80', bg: '#16653420' },
          followUp: { text: '#FBBF24', bg: '#78350F20' },
          interview: { text: '#A78BFA', bg: '#5B21B620' },
          offer: { text: '#C084FC', bg: '#6B21A820' },
          rejected: { text: '#F87171', bg: '#7F1D1D20' },
          ghosted: { text: '#9CA3AF', bg: '#37415120' },
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 4px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        card: '16px',
        button: '12px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config
