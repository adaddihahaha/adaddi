'use client'

import Link from 'next/link'
import { useState } from 'react'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="flex items-center justify-between pb-8 max-[700px]:relative max-[700px]:flex-row max-[700px]:gap-0 max-[700px]:pb-5.5">
      <Link
        className="flex items-center gap-2.75"
        href="/"
        aria-label="Adaddi home"
        onClick={closeMenu}
      >
        <span className="grid size-10.5 place-items-center overflow-hidden rounded-xl bg-orange">
          <img className="size-full object-cover" src="/adaddi.png" alt="" />
        </span>
        <span>
          <strong className="block text-[1.16rem] tracking-[-.04em]">Adaddi</strong>
          <small className="-mt-0.5 block text-[.7rem] text-muted">
            Electricity, made clearer.
          </small>
        </span>
      </Link>
      <button
        className="menu-toggle hidden size-10.5 cursor-pointer rounded-md border border-line bg-panel p-2 max-[700px]:ml-auto max-[700px]:block max-[700px]:relative max-[700px]:z-3"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        id="site-navigation"
        className={`flex items-center gap-1.25 text-[.86rem] font-semibold max-[700px]:absolute max-[700px]:left-0 max-[700px]:right-0 max-[700px]:top-14 max-[700px]:z-2 max-[700px]:flex-col max-[700px]:items-stretch max-[700px]:gap-0 max-[700px]:border max-[700px]:border-line max-[700px]:bg-panel max-[700px]:p-2 max-[700px]:shadow-[0_14px_30px_#24312a18] ${menuOpen ? 'max-[700px]:flex' : 'max-[700px]:hidden'}`}
        aria-label="Main navigation"
      >
        <Link
          className="rounded-lg px-2.75 py-2 hover:bg-[#e6dfd3] max-[700px]:rounded max-[700px]:px-3 max-[700px]:py-3"
          href="/"
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          className="rounded-lg px-2.75 py-2 hover:bg-[#e6dfd3] max-[700px]:rounded max-[700px]:px-3 max-[700px]:py-3"
          href="/tools"
          onClick={closeMenu}
        >
          Tools
        </Link>
        <Link
          className="rounded-lg px-2.75 py-2 hover:bg-[#e6dfd3] max-[700px]:rounded max-[700px]:px-3 max-[700px]:py-3"
          href="/blog"
          onClick={closeMenu}
        >
          Blog
        </Link>
        <Link
          className="rounded-lg px-2.75 py-2 hover:bg-[#e6dfd3] max-[700px]:rounded max-[700px]:px-3 max-[700px]:py-3"
          href="/about"
          onClick={closeMenu}
        >
          About
        </Link>
        <Link
          className="rounded-lg px-2.75 py-2 hover:bg-[#e6dfd3] max-[700px]:rounded max-[700px]:px-3 max-[700px]:py-3"
          href="/privacy-policy"
          onClick={closeMenu}
        >
          Privacy
        </Link>
      </nav>
    </header>
  )
}
