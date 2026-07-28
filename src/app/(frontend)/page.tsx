import Link from 'next/link'

import { ProjectGrid } from '@/components/going/ProjectGrid'
import { getProjects, getServices, getSiteContent } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [site, services, projects] = await Promise.all([
    getSiteContent(),
    getServices(),
    getProjects(),
  ])
  const featured = projects.filter((project) => project.featured).slice(0, 3)

  return (
    <main>
      <section className="home-hero">
        <div className="hero-content">
          <p className="eyebrow">{site.heroEyebrow}</p>
          <h1>
            {site.heroTitleBefore} <span>{site.heroTitleAccent}</span> {site.heroTitleAfter}
          </h1>
          <p className="lead">{site.heroDescription}</p>
          <Link className="button" href="/work">
            View Our Work
          </Link>
          <hr className="hero-rule" />
        </div>
      </section>

      <section className="value-props">
        <div className="shell three-cols">
          <article className="value">
            <h3>Creative</h3>
            <p>Distinctive design builds credibility and gives each business a memorable presence.</p>
          </article>
          <article className="value">
            <h3>Strategy</h3>
            <p>Communication strategy and design work together as one clear digital system.</p>
          </article>
          <article className="value">
            <h3>Performance</h3>
            <p>Practical solutions support business goals and outcomes that can be evaluated.</p>
          </article>
        </div>
      </section>

      <section className="projects-section">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <Link className="button outline" href="/work">
              View All Work
            </Link>
          </div>
          <ProjectGrid projects={featured.length ? featured : projects.slice(0, 3)} />
        </div>
      </section>

      <section className="testimonial">
        <p className="eyebrow">Our Experience</p>
        <blockquote>
          “For more than 15 years, we have created graphic design, website design and
          development for brands and organizations—combining experience with a trusted partner
          network to solve broader digital challenges.”
        </blockquote>
        <cite>Going Digital Solutions Company Profile</cite>
      </section>

      <section className="cta-section">
        <div className="shell cta-grid">
          <div className="cta-copy">
            <h2>Let&apos;s Build Your Digital Solution</h2>
            <p>{site.contactDescription}</p>
            <p className="eyebrow">{site.experience}</p>
          </div>
          <div className="compact-form">
            <h3>Start a Project</h3>
            <p>Choose the capability that best matches your current goal.</p>
            <div className="field">
              <label>Project Type</label>
              <select defaultValue={services[0]?.slug}>
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <Link className="button full" href="/contact">
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
