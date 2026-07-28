import type { Metadata } from 'next'

import { getServices, getSiteContent } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Going Digital Solutions and discover more than 15 years of experience.',
}

export default async function AboutPage() {
  const [site, services] = await Promise.all([getSiteContent(), getServices()])

  return (
    <main>
      <section className="about-intro">
        <div className="shell">
          <p className="eyebrow">Why Going Digital</p>
          <h1>{site.aboutTitle}</h1>
          <hr />
        </div>
      </section>
      <section className="story">
        <div className="shell story-grid">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/studio.png" alt="Digital design and development workspace" />
          <div>
            <p className="eyebrow">{site.experience}</p>
            <h2>{site.aboutHeading}</h2>
            <p>{site.aboutBody}</p>
            <p>
              Together, we support businesses from launch and growth to brand reinforcement and
              better customer experiences.
            </p>
          </div>
        </div>
      </section>
      <section className="values">
        <div className="shell">
          <div className="center-head">
            <p className="eyebrow">Our Approach</p>
            <h2>How We Create Value</h2>
          </div>
          <div className="values-grid">
            {[
              ['Creative', 'Distinctive, credible and business-aligned design.'],
              ['Strategy', 'Clear communication planning translated into practical execution.'],
              ['Performance', 'Solutions that work in real contexts and support clear objectives.'],
              ['Partner Network', 'Specialist capabilities combined around each business need.'],
            ].map(([title, copy], index) => (
              <article className="value-card" key={title}>
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="team-section">
        <div className="shell">
          <div className="center-head">
            <p className="eyebrow">Core Solutions</p>
            <h2>Four Connected Capabilities</h2>
          </div>
          <div className="values-grid">
            {services.map((service, index) => (
              <article className="value-card" key={service.slug}>
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
