import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    defaultColumns: ['title', 'category', 'featured', 'order', 'updatedAt'],
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Website', value: 'website' },
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'CRM Platform', value: 'crm' },
        { label: 'Graphic Design & CI', value: 'design' },
        { label: 'Digital Marketing', value: 'marketing' },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional CMS image. The bundled fallback image remains available.',
      },
    },
    { name: 'fallbackImage', type: 'text' },
    { name: 'externalURL', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', required: true, defaultValue: 1, min: 1 },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
