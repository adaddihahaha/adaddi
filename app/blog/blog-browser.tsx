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
    <>
      <div className="blog-category-filter">
        <label htmlFor="blog-category">Browse by category</label>
        <select
          id="blog-category"
          className="category-select"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="all">All Blogs</option>
          {categories.map((category) => <option key={category._id} value={category.title}>{category.title}</option>)}
        </select>
      </div>

      <div className="blog-layout">
        <section className="blog-results" aria-label="Blog posts">
        {visiblePosts.length === 0 ? (
          <div className="blog-empty"><span className="eyebrow">No notes yet</span><h2>Nothing in this category.</h2><p>Try another topic or browse all field notes.</p></div>
        ) : (
          <div className="blog-grid">
            {visiblePosts.map((post) => (
              <article className="blog-card" key={post._id}>
                {post.mainImage ? (
                  <Link className="blog-card-image" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                    <img src={urlFor(post.mainImage).width(900).height(560).fit('crop').url()} alt="" />
                  </Link>
                ) : null}
                <div className="blog-card-body">
                  {post.categories?.[0] ? <span className="blog-card-eyebrow">{post.categories[0].title}</span> : null}
                  <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                  <p className="blog-card-date">{formatDate(post.publishedAt)}</p>
                  {post.excerpt ? <p>{post.excerpt}</p> : null}
                  <Link className="card-link" href={`/blog/${post.slug}`}>Read note <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        )}
        </section>
      </div>
    </>
  )
}
