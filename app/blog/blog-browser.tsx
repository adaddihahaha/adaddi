'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { formatDate, urlFor, type BlogCategory, type BlogPost } from '@/lib/sanity'

type SortOption = 'a-z' | 'new-old' | 'old-new'

export function BlogBrowser({
  posts,
  categories,
}: {
  posts: BlogPost[]
  categories: BlogCategory[]
}) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sort, setSort] = useState<SortOption>('new-old')

  const visiblePosts = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? posts
        : posts.filter((post) =>
            post.categories?.some((category) => category.title === selectedCategory),
          )

    return [...filtered].sort((a, b) => {
      if (sort === 'a-z') return a.title.localeCompare(b.title)
      const comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      return sort === 'new-old' ? -comparison : comparison
    })
  }, [posts, selectedCategory, sort])

  const chooseCategory = (value: string) => setSelectedCategory(value)

  return (
    <>
      <div
        className="mt-7 flex flex-wrap items-center gap-3 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-2"
        aria-label="Filter blog posts"
      >
        <div className="relative">
          <select
            className="min-h-11 cursor-pointer rounded-md border border-line bg-panel px-3.5 text-ink hover:border-teal focus:outline-none"
            aria-label="Sort blog posts"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
          >
            <option value="new-old">Newest (Default)</option>
            <option value="old-new">Oldest</option>
            <option value="a-z">Alphabetical</option>
          </select>
        </div>
        <div className="relative max-[900px]:w-full">
          <select
            className="min-h-11 cursor-pointer rounded-md border border-line bg-panel px-3.5 text-ink hover:border-teal focus:outline-none max-[900px]:w-full"
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(event) => chooseCategory(event.target.value)}
          >
            <option value="all">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <section className="min-w-0" aria-label="Blog posts">
          {visiblePosts.length === 0 ? (
            <div className="mt-7 border-y border-line py-14">
              <span className="font-mono text-[.69rem] font-medium uppercase tracking-[.08em] text-teal">
                No notes yet
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tighter">
                Nothing in this category.
              </h2>
              <p className="text-muted">Try another topic or browse all field notes.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4.5 md:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => (
                <article className="group flex flex-col border border-line bg-panel" key={post._id}>
                  {post.mainImage ? (
                    <Link
                      className="block overflow-hidden bg-line"
                      href={`/blog/${post.slug}`}
                      aria-label={`Read ${post.title}`}
                    >
                      <img
                        className="block aspect-[1.6] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        src={urlFor(post.mainImage).width(900).height(560).fit('crop').url()}
                        alt=""
                      />
                    </Link>
                  ) : null}
                  <div className="flex flex-1 flex-col items-start p-6 max-[700px]:p-5">
                    {post.categories?.[0] ? (
                      <span className="font-mono text-xs uppercase tracking-[.08em] text-teal">
                        {post.categories[0].title}
                      </span>
                    ) : null}
                    <h2 className="my-3 text-[1.65rem] leading-[1.1] tracking-tighter">
                      <Link className="text-ink hover:text-teal" href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mb-3 font-mono text-xs uppercase tracking-[.04em] text-muted">
                      {formatDate(post.publishedAt)}
                    </p>
                    {post.excerpt ? <p className="text-muted">{post.excerpt}</p> : null}
                    <Link
                      className="mt-auto inline-flex items-center gap-2 rounded-md bg-orange px-3 py-2 text-[.8rem] font-bold text-white transition hover:brightness-95"
                      href={`/blog/${post.slug}`}
                    >
                      Read note{' '}
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
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
