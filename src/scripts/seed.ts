import { config as loadEnv } from 'dotenv'
import { getPayload } from 'payload'

import { defaultProjects, defaultServices, defaultSite } from '../content/defaults'

loadEnv({ path: '.env.local' })
loadEnv()

const { default: config } = await import('@payload-config')
const payload = await getPayload({ config })

await payload.updateGlobal({
  slug: 'site-settings',
  data: defaultSite,
  draft: false,
})

for (const service of defaultServices) {
  const existing = await payload.find({
    collection: 'services',
    where: { slug: { equals: service.slug } },
    limit: 1,
  })

  const data = { ...service, _status: 'published' as const }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'services',
      id: existing.docs[0].id,
      data,
      draft: false,
    })
  } else {
    await payload.create({
      collection: 'services',
      data,
      draft: false,
    })
  }
}

for (const project of defaultProjects) {
  const existing = await payload.find({
    collection: 'projects',
    where: { slug: { equals: project.slug } },
    limit: 1,
  })

  const { image, ...projectData } = project
  const data = {
    ...projectData,
    category: projectData.category as
      | 'website'
      | 'ecommerce'
      | 'crm'
      | 'design'
      | 'marketing',
    fallbackImage: image,
    _status: 'published' as const,
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'projects',
      id: existing.docs[0].id,
      data,
      draft: false,
    })
  } else {
    await payload.create({
      collection: 'projects',
      data,
      draft: false,
    })
  }
}

payload.logger.info('Going Studio CMS content seeded successfully.')
process.exit(0)
