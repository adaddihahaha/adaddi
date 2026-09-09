import { getCategories, getPosts } from '@/lib/sanity'
import { BlogBrowser } from './blog-browser'

export const metadata = {
  title: 'Blog | Adaddi',
  description: 'Practical notes for making clearer electricity decisions.',
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

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
      ) : <BlogBrowser posts={posts} categories={categories} />}
    </main>
  )
}
