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
      { name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true } },
      { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
      { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
    ],
  },
  { name: 'author', title: 'Author', type: 'document', fields: [{ name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() }] },
  { name: 'category', title: 'Category', type: 'document', fields: [{ name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() }] },
]
