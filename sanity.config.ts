import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './lib/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'nutriloop-africa-studio',
  title: 'NutriLoop Africa CMS',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('NutriLoop Africa')
          .items([
            S.listItem()
              .title('News & Updates')
              .schemaType('newsPost')
              .child(S.documentTypeList('newsPost').title('News Posts')),

            S.listItem()
              .title('Team Members')
              .schemaType('teamMember')
              .child(S.documentTypeList('teamMember').title('Team Members')),

            S.listItem()
              .title('Impact KPI Values')
              .schemaType('kpiValue')
              .child(S.documentTypeList('kpiValue').title('KPI Values')),

            S.listItem()
              .title('Affiliate Logos')
              .schemaType('affiliate')
              .child(S.documentTypeList('affiliate').title('Affiliates')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
