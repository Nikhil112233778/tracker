import { DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { ToastContainer } from '@/components/Toast'
import { PWAHandler } from '@/components/PWAHandler'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Job Tracker',
  description: 'Track your job applications, HR contacts, and follow-up reminders',
  applicationName: 'Job Tracker',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Job Tracker',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563EB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-background font-sans antialiased">
        <PWAHandler />
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
