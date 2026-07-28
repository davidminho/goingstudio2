import type { Metadata } from 'next'
import Link from 'next/link'

import { getServices } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Website development, graphic design and corporate identity, digital marketing and CRM platforms.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <main>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">What We Offer</p>
          <h1>Our Services</h1>
        </div>
      </section>
      <section className="services-list">
        <div className="shell">
          {services.map((service, index) => (
            <article className="service-row" key={service.slug}>
              <div className="service-num">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                {service.detail && <p className="cms-note">{service.detail}</p>}
              </div>
              <Link href="/contact">Learn More →</Link>
            </article>
          ))}
        </div>
      </section>
      <section className="models">
        <div className="shell">
          <div className="center-head">
            <p className="eyebrow">Website Solutions</p>
            <h2>Built Around Your Business</h2>
          </div>
          <div className="model-grid">
            {[
              ['Corporate & Brand', 'Business Websites', 'Brand-led digital experiences for organizations, products and services.'],
              ['Commerce', 'E-commerce', 'Online storefronts designed around customer journeys and business operations.'],
              ['Campaign & CRM', 'Engagement Platforms', 'Promotions, rewards, surveys and tailored customer activities.'],
            ].map(([eyebrow, title, detail], index) => (
              <article className={`model${index === 1 ? ' featured' : ''}`} key={title}>
                <p className="eyebrow">{eyebrow}</p>
                <h3>{title}</h3>
                <p className="price">Scope-based proposal</p>
                <p className="detail">{detail}</p>
                <Link className={`button ${index === 1 ? '' : 'outline'} full`} href="/contact">
                  Start a Project
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
