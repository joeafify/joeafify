import type { CollectionConfig } from 'payload'

export const JourneyItems: CollectionConfig = {
  slug: 'journey-items',
  admin: {
    useAsTitle: 'jobTitle',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'employer',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startMonth',
          type: 'select',
          required: true,
          localized: true,
          options: [
            { label: 'January', value: 'Jan' },
            { label: 'February', value: 'Feb' },
            { label: 'March', value: 'Mar' },
            { label: 'April', value: 'Apr' },
            { label: 'May', value: 'May' },
            { label: 'June', value: 'Jun' },
            { label: 'July', value: 'Jul' },
            { label: 'August', value: 'Aug' },
            { label: 'September', value: 'Sep' },
            { label: 'October', value: 'Oct' },
            { label: 'November', value: 'Nov' },
            { label: 'December', value: 'Dec' },
          ],
        },
        {
          name: 'startYear',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'endMonth',
          type: 'select',
          localized: true,
          options: [
            { label: 'January', value: 'Jan' },
            { label: 'February', value: 'Feb' },
            { label: 'March', value: 'Mar' },
            { label: 'April', value: 'Apr' },
            { label: 'May', value: 'May' },
            { label: 'June', value: 'Jun' },
            { label: 'July', value: 'Jul' },
            { label: 'August', value: 'Aug' },
            { label: 'September', value: 'Sep' },
            { label: 'October', value: 'Oct' },
            { label: 'November', value: 'Nov' },
            { label: 'December', value: 'Dec' },
          ],
        },
        {
          name: 'endYear',
          type: 'text',
        },
      ],
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'responsibilities',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
}
