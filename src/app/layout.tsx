import type { Metadata, Viewport } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/data/site';
import { absoluteUrl, organisationJsonLd } from '@/lib/seo';
import './globals.css';

/**
 * Fonts are served from a self-contained system stack (see --font-inter /
 * --font-display in globals.css) so the app builds with no external requests.
 *
 * On Vercel you can swap in the real families by uncommenting the block below —
 * it needs network access to fonts.googleapis.com at build time:
 *
 *   import { Fraunces, Inter } from 'next/font/google';
 *   const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
 *   const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-display' });
 *
 * then pass `className={`${inter.variable} ${fraunces.variable}`}` to <html>.
 */

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'Naya Nazimabad',
    'Naya Nazimabad apartments',
    'Karachi real estate',
    'Signature Tower',
    'Peace Apartments',
    'Globe Residency',
    'Rahat Residency',
    'Manghopir Road Karachi',
  ],
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_PK',
    url: absoluteUrl('/'),
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: absoluteUrl('/') },
};

export const viewport: Viewport = {
  themeColor: '#0f5c5c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organisationJsonLd()} />
      </body>
    </html>
  );
}
