import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ConsentBanner } from '@/components/consent-banner';

export const metadata: Metadata = {
  title: 'Adaddi | Electricity and solar tools',
  description: 'Practical tools to estimate bills, savings, and solar payback.',
  icons: { icon: '/adaddi.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <ConsentBanner />
      </body>
    </html>
  );
}
