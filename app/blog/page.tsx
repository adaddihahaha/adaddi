import Link from 'next/link'
import { getPosts, formatDate, urlFor } from '@/lib/sanity'

export const metadata = {
  title: 'Blog | Adaddi',
  description: 'Practical notes for making clearer electricity decisions.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="content-page blog-page">
      <div>
        <span className="eyebrow">Field notes</span>
        <h1>Useful ideas for better energy decisions.</h1>
        <p>Practical context, explainers, and lessons from the numbers behind your electricity bill.</p>
      </div>
      {posts.length === 0 ? (
        <section className="blog-empty">
          <span className="eyebrow">Coming soon</span>
          <h2>The first field note is on its way.</h2>
          <p>Publish a post in Sanity Studio and it will appear here automatically.</p>
        </section>
      ) : (
        <section className="blog-grid" aria-label="Blog posts">
          {posts.map((post) => (
            <article className="blog-card" key={post._id}>
              {post.mainImage ? <img src={urlFor(post.mainImage).width(900).height(560).fit('crop').url()} alt="" /> : null}
              <div className="blog-card-body">
                <div className="blog-meta"><span>{formatDate(post.publishedAt)}</span>{post.categories?.[0] ? <span>{post.categories[0].title}</span> : null}</div>
                <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
                <Link className="card-link" href={`/blog/${post.slug}`}>Read note →</Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}
