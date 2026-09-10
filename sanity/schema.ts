export const schemaTypes = [
  {
    name: 'post',
    title: 'Blog post',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
      { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
      { name: 'publishedAt', title: 'Published at', type: 'datetime', validation: (Rule: any) => Rule.required() },
      { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] },
      { name: 'mainImage', title: 'Main image', type: 'image', description: 'Recommended size: 1200 × 675 px (16:9), matching the Tools card image ratio.', options: { hotspot: true } },
      { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
      { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
    ],
  },
  { name: 'author', title: 'Author', type: 'document', fields: [{ name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() }] },
  { name: 'category', title: 'Category', type: 'document', fields: [{ name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }] },
]
