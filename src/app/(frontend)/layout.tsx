import type { Metadata } from 'next'
import React from 'react'

import { MotionEffects } from '@/components/going/MotionEffects'
import { SiteFooter } from '@/components/going/SiteFooter'
import { SiteHeader } from '@/components/going/SiteHeader'
import { getSiteContent } from '@/lib/cms'

import './globals.css'

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
    <html lang="en">
      <body>
        <MotionEffects />
        <SiteHeader />
        {children}
        <SiteFooter site={site} />
      </body>
    </html>
  )
}
