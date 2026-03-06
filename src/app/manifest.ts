import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Job Tracker - Track Your Job Applications',
    short_name: 'Job Tracker',
    description: 'Mobile-first PWA for tracking job applications, HR contacts, conversations, and follow-up reminders',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F5F0',
    theme_color: '#2563EB',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['productivity', 'business'],
  }
}
