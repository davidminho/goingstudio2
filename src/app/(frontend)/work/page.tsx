import type { Metadata } from 'next'

import { ProjectGrid } from '@/components/going/ProjectGrid'
import { getProjects } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected website and CRM platform projects by Going Digital Solutions.',
}

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <main>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Our Portfolio</p>
          <h1>Featured Projects</h1>
        </div>
      </section>
      <ProjectGrid projects={projects} showFilters />
    </main>
  )
}
