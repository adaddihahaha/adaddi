export const schemaTypes = [
  {
    name: 'post',
    title: 'Blogs',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
      { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
      {
        name: 'seo',
        title: 'SEO settings',
        type: 'object',
        description: 'Optional search and social sharing overrides. Leave blank to use the post title, excerpt, and main image.',
        fields: [
          { name: 'metaTitle', title: 'Meta title', type: 'string', description: 'Recommended: 50–60 characters.', validation: (Rule: any) => Rule.max(60) },
          { name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3, description: 'Recommended: 120–160 characters.', validation: (Rule: any) => Rule.max(160) },
          { name: 'canonicalUrl', title: 'Canonical URL', type: 'url', description: 'Use only when this article should point search engines to another URL.' },
          { name: 'ogImage', title: 'Social sharing image', type: 'image', description: 'Optional image for social cards. Recommended size: 1200 × 630 px.', options: { hotspot: true } },
          { name: 'noIndex', title: 'Hide from search engines', type: 'boolean', description: 'Turn on for drafts, thin content, or pages that should not appear in search results.', initialValue: false },
        ],
      },
      { name: 'publishedAt', title: 'Published at', type: 'datetime', validation: (Rule: any) => Rule.required() },
      { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] },
      { name: 'mainImage', title: 'Main image', type: 'image', description: 'Recommended size: 1200 × 675 px (16:9), matching the Tools card image ratio.', options: { hotspot: true } },
      { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
      { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
    ],
  },
  { name: 'author', title: 'Authors', type: 'document', fields: [{ name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() }] },
  { name: 'category', title: 'Categories', type: 'document', fields: [{ name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }] },
]
