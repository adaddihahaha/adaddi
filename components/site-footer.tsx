import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="mt-17.5 flex justify-between border-t border-line pt-4.5 text-[.78rem] text-muted max-[700px]:block">
      <span>© {new Date().getFullYear()} Adaddi</span>
      <span className="flex gap-2.5 max-[700px]:mt-1.75">
        <Link href="/privacy-policy">Privacy</Link>
        <i className="not-italic text-orange">·</i>
        <Link href="/about">About</Link>
      </span>
    </footer>
  )
}
