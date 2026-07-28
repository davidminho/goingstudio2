import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { defaultSite } from '../content/defaults'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Website Content',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company',
          fields: [
            { name: 'companyName', type: 'text', required: true, defaultValue: defaultSite.companyName },
            { name: 'tagline', type: 'text', required: true, defaultValue: defaultSite.tagline },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              defaultValue: defaultSite.description,
            },
            { name: 'experience', type: 'text', defaultValue: defaultSite.experience },
            { name: 'email', type: 'email', defaultValue: defaultSite.email },
            { name: 'phone', type: 'text', defaultValue: defaultSite.phone },
            { name: 'location', type: 'text', defaultValue: defaultSite.location },
            { name: 'website', type: 'text', defaultValue: defaultSite.website },
          ],
        },
        {
          label: 'Home',
          fields: [
            { name: 'heroEyebrow', type: 'text', defaultValue: defaultSite.heroEyebrow },
            { name: 'heroTitleBefore', type: 'text', defaultValue: defaultSite.heroTitleBefore },
            { name: 'heroTitleAccent', type: 'text', defaultValue: defaultSite.heroTitleAccent },
            { name: 'heroTitleAfter', type: 'text', defaultValue: defaultSite.heroTitleAfter },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue: defaultSite.heroDescription,
            },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'aboutTitle', type: 'text', defaultValue: defaultSite.aboutTitle },
            { name: 'aboutHeading', type: 'text', defaultValue: defaultSite.aboutHeading },
            { name: 'aboutBody', type: 'textarea', defaultValue: defaultSite.aboutBody },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'contactHeading', type: 'text', defaultValue: defaultSite.contactHeading },
            {
              name: 'contactDescription',
              type: 'textarea',
              defaultValue: defaultSite.contactDescription,
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
    max: 20,
  },
}
