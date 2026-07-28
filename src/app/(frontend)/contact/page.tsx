import type { Metadata } from 'next'

import { getServices, getSiteContent } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a digital project with Going Studio.',
}

export default async function ContactPage() {
  const [site, services] = await Promise.all([getSiteContent(), getServices()])

  return (
    <main>
      <section className="contact-main">
        <div className="shell contact-grid">
          <div className="contact-info">
            <p className="eyebrow">Connect</p>
            <h1>{site.contactHeading}</h1>
            <div className="info-block">
              <strong>Our Studio</strong>
              {site.location}
            </div>
            <div className="info-block">
              <strong>Email Us</strong>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </div>
            <div className="location">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/bangkok.png" alt="Bangkok skyline" />
              <span>Bangkok Studio Location</span>
            </div>
          </div>
          <form className="project-form" action={`mailto:${site.email}`} method="post">
            <h2>Start Your Project</h2>
            <div className="form-row">
              <div className="field">
                <label htmlFor="first-name">First Name</label>
                <input id="first-name" name="first-name" required />
              </div>
              <div className="field">
                <label htmlFor="last-name">Last Name</label>
                <input id="last-name" name="last-name" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="field">
              <label htmlFor="project-type">Project Type</label>
              <select id="project-type" name="project-type">
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your business goal and the digital solution you need."
                required
              />
            </div>
            <button className="button full" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
