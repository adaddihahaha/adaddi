'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const closeToolsMenu = (event: PointerEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        toolsMenuRef.current.removeAttribute('open');
      }
    };

    document.addEventListener('pointerdown', closeToolsMenu);
    return () => document.removeEventListener('pointerdown', closeToolsMenu);
  }, []);

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
        <details ref={toolsMenuRef} className="tools-menu" onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) event.currentTarget.removeAttribute('open');
        }}>
          <summary>Tools</summary>
          <div className="menu-list">
            <Link href="/solar-savings" onClick={closeMenu}>Solar Savings Tracker</Link>
            <Link href="/appliances" onClick={closeMenu}>Appliances Calculator</Link>
          </div>
        </details>
        <Link href="/blog" onClick={closeMenu}>Blog</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link href="/privacy-policy" onClick={closeMenu}>Privacy</Link>
      </nav>
    </header>
  );
}
