import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'adaddi-blog',
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'dblakk45',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
})
