import { defineField, defineType } from 'sanity'

export const newsPostSchema = defineType({
  name: 'newsPost',
  title: 'News Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'meta', title: 'Metadata' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required().min(10).max(120).error('Title must be 10–120 characters'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'meta',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Milestone', value: 'milestone' },
          { title: 'Media Coverage', value: 'media_coverage' },
          { title: 'Research', value: 'research' },
          { title: 'Partnership', value: 'partnership' },
          { title: 'Impact', value: 'impact' },
          { title: 'Product', value: 'product' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'A 1–2 sentence summary used in card grids and OG description. Max 200 characters.',
      validation: (Rule) =>
        Rule.required().min(20).max(200).error('Excerpt must be 20–200 characters'),
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'content',
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
            Rule.required().error(
              'Alt text is required for accessibility and SEO'
            ),
        }),
        defineField({
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      group: 'meta',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'meta',
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'seo',
      title: 'SEO overrides',
      type: 'object',
      group: 'seo',
      description: 'Leave blank to use title and excerpt as defaults',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta title',
          type: 'string',
          validation: (Rule) => Rule.max(60).warning('Keep meta title under 60 characters'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta description',
          type: 'text',
          rows: 2,
          validation: (Rule) =>
            Rule.max(160).warning('Keep meta description under 160 characters'),
        }),
        defineField({
          name: 'ogImage',
          title: 'OG image (overrides featured image)',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'noIndex',
          title: 'Hide from search engines',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
    },
    prepare({ title, subtitle, media }: { title: string; subtitle: string; media: unknown }) {
      const categoryLabels: Record<string, string> = {
        milestone: 'Milestone',
        media_coverage: 'Media Coverage',
        research: 'Research',
        partnership: 'Partnership',
        impact: 'Impact',
        product: 'Product',
      }
      return {
        title,
        subtitle: categoryLabels[subtitle] ?? subtitle,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Published Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
