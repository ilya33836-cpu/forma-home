import type { Metadata, Viewport } from 'next'
import { Manrope, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { site, nav } from '@/lib/site'
import SmoothScroll from '@/components/SmoothScroll'
import Cursor from '@/components/Cursor'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(`${site.basePath}/`, site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: '/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: `${site.name} — студия дизайна интерьеров`,
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#F4F1EB',
  colorScheme: 'light',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: { '@type': 'PostalAddress', ...site.address },
  areaServed: 'RU',
  priceRange: site.priceRange,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Услуги',
    itemListElement: site.services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title },
    })),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Cursor />
        <Header nav={nav} phone={site.phone} />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
