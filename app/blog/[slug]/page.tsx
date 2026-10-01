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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
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
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: post.seo?.metaTitle || post.title,
      description,
      images: image ? [image] : undefined,
    },
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
    author: post.author
      ? { '@type': 'Person', name: post.author.name }
      : { '@type': 'Organization', name: 'Adaddi' },
    publisher: { '@type': 'Organization', name: 'Adaddi', url: siteUrl },
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      <article>
        <div
          className={`grid gap-6 border-y border-line py-12 max-[700px]:grid-cols-1 max-[700px]:gap-5 max-[700px]:pt-9 ${post.mainImage ? 'grid-cols-[minmax(0,2fr)_minmax(0,1fr)]' : 'grid-cols-1'}`}
        >
          <div>
            <span className="font-mono text-[.69rem] font-medium uppercase tracking-[.08em] text-teal">
              {formatDate(post.publishedAt)}
            </span>
            <h1 className="my-4 text-[clamp(2.8rem,6vw,5rem)] leading-[.95] tracking-[-.075em]">
              {post.title}
            </h1>
            {post.excerpt ? <p className="text-muted">{post.excerpt}</p> : null}
          </div>
          {post.mainImage ? (
            <img
              className="my-0 block min-h-60 max-h-105 w-full object-cover max-[700px]:max-h-90"
              src={urlFor(post.mainImage).width(1400).height(760).fit('crop').url()}
              alt=""
            />
          ) : null}
        </div>
        <div className="portable-text mx-auto max-w-250 py-4 pb-15 text-[1.08rem] leading-[1.75]">
          <PortableText value={(post.body ?? []) as any} />
        </div>
      </article>
    </section>
  )
}
