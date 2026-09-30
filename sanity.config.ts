import { defineConfig } from 'sanity'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'Adaddi',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'dblakk45',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  schema: {
    types: schemaTypes,
  },
})
