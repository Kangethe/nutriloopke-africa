import { defineField, defineType } from 'sanity'

export const affiliateSchema = defineType({
  name: 'affiliate',
  title: 'Affiliate / Partner Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organisation name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: 'logo',
      title: 'Logo (SVG or PNG, ideally on transparent background)',
      type: 'image',
      options: {
        accept: 'image/svg+xml,image/png,image/webp',
        hotspot: false,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Science Partner', value: 'science_partner' },
          { title: 'Funder / Accelerator', value: 'funder' },
          { title: 'Regulatory', value: 'regulatory' },
          { title: 'Certification', value: 'certification' },
          { title: 'Accelerator', value: 'accelerator' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description: 'Controls order in the logo strip. ICIPE = 1, CGIAR = 2, etc.',
      initialValue: 10,
      validation: (Rule) => Rule.required().integer().min(1),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
    },
    prepare({
      title,
      subtitle,
      media,
    }: {
      title: string
      subtitle: string
      media: unknown
    }) {
      const labels: Record<string, string> = {
        science_partner: 'Science Partner',
        funder: 'Funder / Accelerator',
        regulatory: 'Regulatory',
        certification: 'Certification',
        accelerator: 'Accelerator',
      }
      return { title, subtitle: labels[subtitle] ?? subtitle, media }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
})
