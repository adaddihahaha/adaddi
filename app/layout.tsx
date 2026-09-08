import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './blog/blog.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ConsentBanner } from '@/components/consent-banner';

export const metadata: Metadata = {
  metadataBase: new URL('https://adaddi.io'),
  title: 'Adaddi | Electricity and solar tools',
  description: 'Practical tools to estimate bills, savings, and solar payback.',
  alternates: { canonical: '/' },
  icons: { icon: '/adaddi.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8236858958634377" />
      </head>
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <ConsentBanner />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8236858958634377"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
