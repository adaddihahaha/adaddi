'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { formatDate, urlFor, type BlogCategory, type BlogPost } from '@/lib/sanity'

type SortOption = 'a-z' | 'new-old' | 'old-new'

export function BlogBrowser({ posts, categories }: { posts: BlogPost[]; categories: BlogCategory[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sort, setSort] = useState<SortOption>('new-old')

  const visiblePosts = useMemo(() => {
    const filtered = selectedCategory === 'all'
      ? posts
      : posts.filter((post) => post.categories?.some((category) => category.title === selectedCategory))

    return [...filtered].sort((a, b) => {
      if (sort === 'a-z') return a.title.localeCompare(b.title)
      const comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      return sort === 'new-old' ? -comparison : comparison
    })
  }, [posts, selectedCategory, sort])

  const chooseCategory = (value: string) => setSelectedCategory(value)

  return (
    <>
      <div className="blog-category-filter" aria-label="Filter blog posts">
        <div className="category-picker">
          <select
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(event) => chooseCategory(event.target.value)}
          >
            <option value="all">Select Category</option>
            {categories.map((category) => <option key={category._id} value={category.title}>{category.title}</option>)}
          </select>
        </div>
        <div className="sort-control">
          <select
            aria-label="Sort blog posts"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
          >
            <option value="new-old">Newest (Default)</option>
            <option value="old-new">Oldest</option>
            <option value="a-z">Alphabetical</option>
          </select>
        </div>
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
