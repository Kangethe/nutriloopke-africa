import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', weight: ['400','500','600','700'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://nutriloopAfrica.com'),
  title: { default: "NutriLoop Africa — Turning Nairobi's Waste into Protein and Fertiliser", template: '%s | NutriLoop Africa' },
  description: "NutriLoop Africa converts organic waste from Nairobi's hotels, markets, and food businesses into Black Soldier Fly protein meal and frass fertiliser — in 14 days, at 50%+ gross margin.",
  openGraph: { type: 'website', locale: 'en_KE', url: 'https://nutriloopAfrica.com', siteName: 'NutriLoop Africa', images: [{ url: '/og-social-card.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', site: '@NutriLoopAfrica', images: ['/og-social-card.png'] },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
}

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1,
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#F5F7F2' }, { media: '(prefers-color-scheme: dark)', color: '#0A1A0A' }],
}

const orgSchema = { '@context': 'https://schema.org', '@type': 'Organization', name: 'NutriLoop Africa', legalName: 'NutriLoop Africa Ltd', url: 'https://nutriloopAfrica.com', logo: 'https://nutriloopAfrica.com/logo.png', description: 'NutriLoop Africa converts organic waste into BSF protein meal and frass fertiliser.', foundingDate: '2024', address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' }, contactPoint: { '@type': 'ContactPoint', email: 'hello@nutriloopAfrica.com' }, sameAs: ['https://linkedin.com/company/nutriloop-africa','https://twitter.com/NutriLoopAfrica'] }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-KE" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body className="min-h-screen antialiased font-sans bg-brand-offwhite">
        <a href="#main-content" className="skip-nav">Skip to main content</a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
