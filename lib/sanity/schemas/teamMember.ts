import { defineField, defineType } from 'sanity'

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),

    defineField({
      name: 'role',
      title: 'Role / title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().max(1000),
    }),

    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/jpeg,image/png,image/webp',
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) =>
            Rule.required().error('Alt text is required for accessibility'),
        }),
      ],
    }),

    defineField({
      name: 'isFounder',
      title: 'Is founder?',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'isAdvisor',
      title: 'Is advisor?',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'affiliation',
      title: 'Institutional affiliation (e.g. ICIPE, CGIAR)',
      type: 'string',
    }),

    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).warning(
          'Please use a full LinkedIn URL: https://linkedin.com/in/...'
        ),
    }),

    defineField({
      name: 'twitter',
      title: 'X / Twitter handle (without @)',
      type: 'string',
      validation: (Rule) => Rule.max(50),
    }),

    defineField({
      name: 'email',
      title: 'Email (public contact — optional)',
      type: 'string',
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first. Founders should be 1, 2. Advisors from 10+.',
      initialValue: 10,
      validation: (Rule) => Rule.required().integer().min(1),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
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
