import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'adaddi-blog',
  deployment: {
    appId: 'p2znx1cvjhbivl828o1kqtpt',
  },
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'dblakk45',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
})
