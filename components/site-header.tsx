'use client';

import Link from 'next/link';
import { useState } from 'react';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Adaddi home" onClick={closeMenu}>
        <span className="brand-mark"><img src="/adaddi.png" alt="" /></span>
        <span>
          <strong>Adaddi</strong>
          <small>Electricity, made clearer.</small>
        </span>
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </button>
      <nav id="site-navigation" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/tools" onClick={closeMenu}>Tools</Link>
        <Link href="/blog" onClick={closeMenu}>Blog</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link href="/privacy-policy" onClick={closeMenu}>Privacy</Link>
      </nav>
    </header>
  );
}
