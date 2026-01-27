import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      // required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      // required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'livePreview',
          type: 'text',
          defaultValue: '',
          validate: (value: string | null | undefined) => {
            try {
              value && new URL(value)
              return true
            } catch (e) {
              return 'Live preview must be a valid URL'
            }
          },
        },
        {
          name: 'sourceCode',
          type: 'text',
          validate: (value: string | null | undefined) => {
            try {
              value && new URL(value)
              return true
            } catch (e) {
              return 'Source code must be a valid URL'
            }
          },
        }
      ]
    },
    {
      name: 'techStack',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        }
      ]
    }
  ],
}
