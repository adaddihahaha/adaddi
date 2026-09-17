'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { formatDate, urlFor, type BlogCategory, type BlogPost } from '@/lib/sanity'

type SortOption = 'a-z' | 'new-old' | 'old-new'

export function BlogBrowser({ posts, categories }: { posts: BlogPost[]; categories: BlogCategory[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categorySearch, setCategorySearch] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [sort, setSort] = useState<SortOption>('new-old')
  const categoryFilterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!categoryFilterRef.current?.contains(event.target as Node)) setCategoryOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(categorySearch.toLowerCase()),
  )

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

  const chooseCategory = (value: string) => {
    setSelectedCategory(value)
    setCategoryOpen(false)
    setCategorySearch('')
  }

  return (
    <>
      <div className="blog-category-filter" aria-label="Filter blog posts">
        <div className="category-picker" ref={categoryFilterRef}>
          <button
            type="button"
            className="category-picker-trigger"
            aria-expanded={categoryOpen}
            aria-haspopup="listbox"
            onClick={() => setCategoryOpen((open) => !open)}
          >
            {selectedCategory === 'all' ? 'Select Category' : selectedCategory}
            <span aria-hidden="true">⌄</span>
          </button>
          {categoryOpen ? (
            <div className="category-picker-menu">
              <label className="sr-only" htmlFor="category-search">Search categories</label>
              <input
                id="category-search"
                className="category-search"
                type="search"
                placeholder="Search categories..."
                value={categorySearch}
                onChange={(event) => setCategorySearch(event.target.value)}
                autoFocus
              />
              <div className="category-options" role="listbox" aria-label="Categories">
                <button type="button" role="option" aria-selected={selectedCategory === 'all'} onClick={() => chooseCategory('all')}>Select Category</button>
                {filteredCategories.map((category) => (
                  <button type="button" role="option" aria-selected={selectedCategory === category.title} key={category._id} onClick={() => chooseCategory(category.title)}>{category.title}</button>
                ))}
                {filteredCategories.length === 0 ? <p className="category-no-results">No categories found.</p> : null}
              </div>
            </div>
          ) : null}
        </div>
        <label className="sort-control">
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
            <option value="a-z">A - Z</option>
            <option value="new-old">New - Old</option>
            <option value="old-new">Old - New</option>
          </select>
        </label>
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
