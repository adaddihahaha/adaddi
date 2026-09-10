import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'dblakk45',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-09-08',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title
}`

export const postsQuery = `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "author": author->{name},
  mainImage,
  categories[]->{title}
}`

export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "author": author->{name},
  mainImage,
  body,
  categories[]->{title}
}`

export type BlogCategory = {
  _id: string
  title: string
}

export type BlogPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  author?: { name: string }
  mainImage?: unknown
  categories?: { title: string }[]
}

export type BlogPostDetail = BlogPost & {
  body?: unknown[]
}

export async function getPosts() {
  return sanityClient.fetch<BlogPost[]>(postsQuery, {}, { next: { revalidate: 60 } })
}

export async function getCategories() {
  return sanityClient.fetch<BlogCategory[]>(categoriesQuery, {}, { next: { revalidate: 60 } })
}

export async function getPost(slug: string) {
  return sanityClient.fetch<BlogPostDetail | null>(postQuery, { slug }, { next: { revalidate: 60 } })
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(value))
}
