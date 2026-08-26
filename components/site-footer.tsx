import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Adaddi</span>
      <span><Link href="/privacy-policy">Privacy</Link><i>·</i><Link href="/about">About</Link></span>
    </footer>
  );
}
