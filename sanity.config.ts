import { defineConfig } from 'sanity'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'Adaddi',
  projectId: 'dblakk45',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
})
