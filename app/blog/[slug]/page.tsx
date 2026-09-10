import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { formatDate, getPost, urlFor } from '@/lib/sanity'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  return post ? { title: `${post.title} | Adaddi`, description: post.excerpt } : { title: 'Blog | Adaddi' }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <main className="content-page blog-post-page">
      <article>
        <div className="blog-post-heading">
          <span className="eyebrow">{formatDate(post.publishedAt)}</span>
          <h1>{post.title}</h1>
          {post.excerpt ? <p>{post.excerpt}</p> : null}
          {post.author ? <span className="post-author">By {post.author.name}</span> : null}
        </div>
        {post.mainImage ? <img className="blog-post-image" src={urlFor(post.mainImage).width(1400).height(760).fit('crop').url()} alt="" /> : null}
        <div className="portable-text"><PortableText value={(post.body ?? []) as any} /></div>
      </article>
    </main>
  )
}
