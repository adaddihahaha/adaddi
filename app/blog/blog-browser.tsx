'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { formatDate, urlFor, type BlogCategory, type BlogPost } from '@/lib/sanity'

export function BlogBrowser({ posts, categories }: { posts: BlogPost[]; categories: BlogCategory[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const visiblePosts = useMemo(
    () => selectedCategory === 'all'
      ? posts
      : posts.filter((post) => post.categories?.some((category) => category.title === selectedCategory)),
    [posts, selectedCategory],
  )

  return (
    <div className="blog-layout">
      <aside className="blog-sidebar" aria-label="Blog categories">
        <select
          id="blog-category"
          className="category-select"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="all">All Blogs</option>
          {categories.map((category) => <option key={category._id} value={category.title}>{category.title}</option>)}
        </select>
        <nav className="category-list" aria-label="Filter blog posts">
          <button className={selectedCategory === 'all' ? 'category-link active' : 'category-link'} onClick={() => setSelectedCategory('all')}>All Blogs</button>
          {categories.map((category) => (
            <button key={category._id} className={selectedCategory === category.title ? 'category-link active' : 'category-link'} onClick={() => setSelectedCategory(category.title)}>
              {category.title}
            </button>
          ))}
        </nav>
      </aside>

      <section className="blog-results" aria-label="Blog posts">
        {visiblePosts.length === 0 ? (
          <div className="blog-empty"><span className="eyebrow">No notes yet</span><h2>Nothing in this category.</h2><p>Try another topic or browse all field notes.</p></div>
        ) : (
          <div className="blog-grid">
            {visiblePosts.map((post) => (
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
          </div>
        )}
      </section>
    </div>
  )
}
