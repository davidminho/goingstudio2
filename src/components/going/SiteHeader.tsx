'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/work', 'Work'],
  ['/services', 'Services'],
  ['/contact', 'Contact Us'],
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <Link className="brand" href="/" aria-label="Going Studio home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.svg" alt="Going Studio" />
        </Link>
        <nav className={`main-nav${open ? ' open' : ''}`} aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link
              className={pathname === href ? 'active' : undefined}
              href={href}
              key={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          className="menu-toggle"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          ☰
        </button>
        <Link className="button" href="/contact">
          Get Started
        </Link>
      </div>
    </header>
  )
}
