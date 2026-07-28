'use client'

import { useState } from 'react'

import type { ProjectContent } from '@/lib/cms'

const filters = [
  ['all', 'All'],
  ['website', 'Website'],
  ['ecommerce', 'E-commerce'],
  ['crm', 'CRM Platform'],
  ['design', 'Graphic Design & CI'],
] as const

const categoryLabels: Record<string, string> = {
  website: 'Website',
  ecommerce: 'E-commerce',
  crm: 'CRM Platform',
  design: 'Graphic Design & CI',
  marketing: 'Digital Marketing',
}

export function ProjectGrid({
  projects,
  showFilters = false,
}: {
  projects: ProjectContent[]
  showFilters?: boolean
}) {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? projects : projects.filter((project) => project.category === filter)

  return (
    <>
      {showFilters && (
        <div className="filter-bar">
          <div className="shell filters">
            <span>Filter By:</span>
            {filters.map(([value, label]) => (
              <button
                className={`filter-btn${filter === value ? ' active' : ''}`}
                data-filter={value}
                key={value}
                onClick={() => setFilter(value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="project-grid">
        {visible.map((project) => (
          <article className="project-card" data-category={project.category} key={project.slug}>
            <div className="project-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} project`}
                width="2400"
                height="1350"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="project-meta">
              <span>{categoryLabels[project.category]}</span>
            </div>
            <h3>{project.title}</h3>
            <p className="desc">{project.description}</p>
            <div className="project-foot">
              <span>
                {project.category === 'crm'
                  ? 'CRM Campaign'
                  : project.category === 'design'
                    ? 'Brand Identity'
                    : 'Digital Experience'}
              </span>
              <a href={project.externalURL || '/services'}>
                {project.externalURL ? 'Visit Website →' : 'Our Services →'}
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
