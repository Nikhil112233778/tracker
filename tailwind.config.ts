import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#F6F5F0',
        surface: '#FFFFFF',
        accent: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8'
        },
        status: {
          applied: { text: '#2563EB', bg: '#EEF2FF' },
          inTouch: { text: '#16A34A', bg: '#F0FDF4' },
          followUp: { text: '#D97706', bg: '#FFFBEB' },
          interview: { text: '#8B5CF6', bg: '#F5F3FF' },
          offer: { text: '#7C3AED', bg: '#F5F3FF' },
          rejected: { text: '#DC2626', bg: '#FEF2F2' },
          ghosted: { text: '#6B7280', bg: '#F3F4F6' },
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
