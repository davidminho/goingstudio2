import Link from 'next/link'

import type { SiteContent } from '@/lib/cms'

export function SiteFooter({ site }: { site: SiteContent }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo.svg" alt="Going Studio" />
            </Link>
            <p>{site.description}</p>
          </div>
          <div className="footer-col">
            <h2 className="footer-title">Services</h2>
            <Link href="/services">Website Development</Link>
            <Link href="/services">Graphic Design &amp; CI</Link>
            <Link href="/services">Digital Marketing</Link>
            <Link href="/services">CRM Platform</Link>
          </div>
          <div className="footer-col">
            <h2 className="footer-title">Contact</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            <p>{site.location}</p>
          </div>
          <div className="footer-col">
            <h2 className="footer-title">Company Profile</h2>
            <p>Explore our digital capabilities, selected work and experience.</p>
            <a className="button outline" href={site.website}>
              Visit Website
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Going Studio. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Careers</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
