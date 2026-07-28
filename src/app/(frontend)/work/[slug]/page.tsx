import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProjectBySlug, getProjects } from '@/lib/cms'

export const dynamic = 'force-dynamic'

const categoryLabels: Record<string, string> = {
  website: 'Website Development',
  ecommerce: 'E-commerce',
  crm: 'CRM Platform',
  design: 'Graphic Design & Corporate Identity',
  marketing: 'Digital Marketing',
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — Going Studio`,
      description: project.description,
      images: [{ url: project.image, alt: `${project.title} project` }],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const projects = await getProjects()
  const project = projects.find((item) => item.slug === slug)

  if (!project) notFound()

  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <main>
      <article className="project-detail">
        <header className="project-detail-header">
          <div className="shell">
            <Link className="project-back" href="/work">
              ← Back to all projects
            </Link>
            <p className="eyebrow">{categoryLabels[project.category] || project.category}</p>
            <h1>{project.title}</h1>
            <p className="project-detail-lead">{project.description}</p>
          </div>
        </header>

        <div className="shell">
          <figure className="project-detail-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} project presentation`}
              width="2400"
              height="1350"
              decoding="async"
            />
          </figure>

          <div className="project-detail-actions">
            <div>
              <p className="eyebrow">Project Type</p>
              <p>{categoryLabels[project.category] || project.category}</p>
            </div>
            {project.externalURL && (
              <a
                className="button"
                href={project.externalURL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Visit Website ↗
              </a>
            )}
          </div>
        </div>
      </article>

      {nextProject && nextProject.slug !== project.slug && (
        <nav className="next-project" aria-label="Next project">
          <div className="shell next-project-inner">
            <div>
              <p className="eyebrow">Next Project</p>
              <h2>{nextProject.title}</h2>
            </div>
            <Link className="button outline" href={`/work/${nextProject.slug}`}>
              View Project →
            </Link>
          </div>
        </nav>
      )}
    </main>
  )
}
