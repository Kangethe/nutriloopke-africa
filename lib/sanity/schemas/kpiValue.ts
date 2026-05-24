import { defineField, defineType } from 'sanity'

export const kpiValueSchema = defineType({
  name: 'kpiValue',
  title: 'KPI Value',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Key (unique identifier)',
      type: 'string',
      description:
        'Machine-readable key used in code (e.g. waste_diverted_year1). Do not change after creation.',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[a-z][a-z0-9_]*$/, { name: 'snake_case' })
          .error('Key must be lowercase letters, numbers, and underscores only'),
    }),

    defineField({
      name: 'label',
      title: 'Display label',
      type: 'string',
      description: 'Human-readable label shown below the number on the site.',
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: 'value',
      title: 'Numeric value',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'prefix',
      title: 'Prefix (shown before the number)',
      type: 'string',
      description: 'e.g. "KES" for currency. Leave blank for most KPIs.',
    }),

    defineField({
      name: 'unit',
      title: 'Unit (shown after the number)',
      type: 'string',
      description: 'e.g. "tonnes", "%", "SDGs", "days". Shown in smaller text.',
    }),

    defineField({
      name: 'suffix',
      title: 'Suffix qualifier',
      type: 'string',
      description: 'e.g. "+" for 22,000+, "B" for KES 200B. Appended directly.',
    }),

    defineField({
      name: 'description',
      title: 'Description / footnote',
      type: 'text',
      rows: 2,
      description: 'Source or qualifier shown in tooltips or footnotes (e.g. "Year 1 projection").',
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description: 'Controls the order in the KPI strip. Lower = first.',
      initialValue: 10,
      validation: (Rule) => Rule.required().integer().min(1),
    }),

    defineField({
      name: 'isPublic',
      title: 'Show on public site',
      type: 'boolean',
      description: 'Uncheck to hide this KPI from the impact page without deleting it.',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'label',
      prefix: 'prefix',
      value: 'value',
      unit: 'unit',
      suffix: 'suffix',
    },
    prepare({
      title,
      prefix,
      value,
      unit,
      suffix,
    }: {
      title: string
      prefix: string
      value: number
      unit: string
      suffix: string
    }) {
      const formatted = [prefix, value?.toLocaleString(), suffix, unit]
        .filter(Boolean)
        .join(' ')
      return { title, subtitle: formatted }
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
