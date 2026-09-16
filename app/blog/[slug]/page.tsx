import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { formatDate, getPost, urlFor } from '@/lib/sanity'

const siteUrl = 'https://adaddi.io'

function getPostUrl(slug: string) {
  return `${siteUrl}/blog/${slug}`
}

function getSocialImage(post: NonNullable<Awaited<ReturnType<typeof getPost>>>) {
  const image = post.seo?.ogImage ?? post.mainImage
  return image ? urlFor(image).width(1200).height(630).fit('crop').url() : undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Blog | Adaddi' }

  const canonicalUrl = post.seo?.canonicalUrl || getPostUrl(slug)
  const description = post.seo?.metaDescription || post.excerpt || `Read ${post.title} on Adaddi.`
  const image = getSocialImage(post)

  return {
    title: post.seo?.metaTitle || `${post.title} | Adaddi`,
    description,
    alternates: { canonical: canonicalUrl },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: post.seo?.metaTitle || post.title,
      description,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: image ? [{ url: image, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title: post.seo?.metaTitle || post.title, description, images: image ? [image] : undefined },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const canonicalUrl = post.seo?.canonicalUrl || getPostUrl(slug)
  const description = post.seo?.metaDescription || post.excerpt || `Read ${post.title} on Adaddi.`
  const image = getSocialImage(post)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    url: canonicalUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: image ? [image] : undefined,
    author: post.author ? { '@type': 'Person', name: post.author.name } : { '@type': 'Organization', name: 'Adaddi' },
    publisher: { '@type': 'Organization', name: 'Adaddi', url: siteUrl },
  }

  return (
    <main className="content-page blog-post-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />
      <article>
        <div className="blog-post-heading">
          <span className="eyebrow">{formatDate(post.publishedAt)}</span>
          <h1>{post.title}</h1>
          {post.excerpt ? <p>{post.excerpt}</p> : null}
        </div>
        {post.mainImage ? <img className="blog-post-image" src={urlFor(post.mainImage).width(1400).height(760).fit('crop').url()} alt="" /> : null}
        <div className="portable-text"><PortableText value={(post.body ?? []) as any} /></div>
      </article>
    </main>
  )
}
