import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { defaultProjects, defaultServices, defaultSite } from '@/content/defaults'

export type SiteContent = typeof defaultSite
export type ServiceContent = (typeof defaultServices)[number]
export type ProjectContent = (typeof defaultProjects)[number]

type MediaValue = {
  url?: string | null
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!process.env.DATABASE_URL) return defaultSite

  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      draft: false,
    })

    return {
      ...defaultSite,
      ...Object.fromEntries(
        Object.entries(settings).filter(([, value]) => typeof value === 'string' && value.length > 0),
      ),
    } as SiteContent
  } catch {
    return defaultSite
  }
}

export async function getServices(): Promise<ServiceContent[]> {
  if (!process.env.DATABASE_URL) return defaultServices

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'services',
      draft: false,
      limit: 20,
      sort: 'order',
    })

    if (!result.docs.length) return defaultServices

    return result.docs.map((service) => ({
      title: service.title,
      slug: service.slug,
      summary: service.summary,
      detail: service.detail || '',
      order: service.order,
    }))
  } catch {
    return defaultServices
  }
}

export async function getProjects(): Promise<ProjectContent[]> {
  if (!process.env.DATABASE_URL) return defaultProjects

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      draft: false,
      limit: 50,
      sort: 'order',
    })

    if (!result.docs.length) return defaultProjects

    return result.docs.map((project) => {
      const media = typeof project.media === 'object' ? (project.media as MediaValue) : undefined
      return {
        title: project.title,
        slug: project.slug,
        category: project.category,
        description: project.description,
        image: media?.url || project.fallbackImage || '/assets/work-italthai-07.jpg',
        externalURL: project.externalURL || undefined,
        featured: Boolean(project.featured),
        order: project.order,
      }
    })
  } catch {
    return defaultProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectContent | undefined> {
  const projects = await getProjects()
  return projects.find((project) => project.slug === slug)
}
