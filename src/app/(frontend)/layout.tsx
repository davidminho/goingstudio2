import type { Metadata } from 'next'
import { Google_Sans_Flex } from 'next/font/google'
import React from 'react'

import { MotionEffects } from '@/components/going/MotionEffects'
import { SiteFooter } from '@/components/going/SiteFooter'
import { SiteHeader } from '@/components/going/SiteHeader'
import { getSiteContent } from '@/lib/cms'

import './globals.css'

const googleSans = Google_Sans_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-google-sans',
  weight: 'variable',
  adjustFontFallback: false,
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    default: 'Going Studio — Creative, Strategy, Performance',
    template: '%s — Going Studio',
  },
  description:
    'Website development, graphic design and corporate identity, digital marketing and CRM platforms.',
  icons: {
    icon: '/assets/favicon.svg',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteContent()

  return (
    <html className={googleSans.variable} lang="en">
      <body>
        <MotionEffects />
        <SiteHeader />
        {children}
        <SiteFooter site={site} />
      </body>
    </html>
  )
}
