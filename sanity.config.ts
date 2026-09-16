import { defineConfig } from 'sanity'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'Adaddi',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  schema: {
    types: schemaTypes,
  },
})
