import type { Metadata, Viewport } from 'next';
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000')
  ),
  title: {
    default: 'Sarvam Real Estate - Low Budget Plots & Villas for Sale in Hosur',
    template: '%s | Sarvam Real Estate Hosur',
  },
  description: 'Sarvam Real Estate is the premier agency for premium & low budget plots in Hosur. Discover luxury 2BHK/3BHK villas, residential plots, and commercial lands in Hosur & Krishnagiri. Trusted builders with 10+ years of excellence.',
  keywords: [
    '2bhk villas in hosur',
    '3bhk villas in hosur',
    '2bhk villas sale near me',
    '2bhk villas sale in hosur',
    'low budget villas in hosur',
    'low budget villas near me',
    'villas in hosur',
    'low  budget plots in hosur',
    'plots in hosur',
    'low budget plots in hosur',
    'low budget plots for sale in hosur',
    'real estate hosur',
    'villas in hosur for sale',
    'best real estate agency in hosur',
    'sarvam builders hosur',
    'residential properties hosur',
    'commercial land hosur',
    'luxury villas in hosur',
    '2 bhk villa in hosur',
    '3 bhk villa in hosur',
    'krishnagiri real estate',
    'plots for sale in krishnagiri',
    'land for sale in hosur',
    'gated community villas hosur',
    'sarvam realtors',
    'property dealers in hosur',
    'buy house in hosur',
    'independent house for sale in hosur',
    'sites for sale in hosur',
    'plots in rayakottai road hosur',
    'plots for sale in mathigiri',
    'villas in bagalur road hosur',
    'prestigious imperial',
    'prestigious imperial hosur',
    'prestigious imperial villas',
    'prestigious imperial bagalur road',
    'premium villa plots in bagalur road',
    'luxury villas bagalur road',
  ],
  authors: [{ name: 'Sarvam Real Estate' }],
  creator: 'Sarvam Real Estate',
  publisher: 'Sarvam Real Estate',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Sarvam - Premier Real Estate & Property Solutions',
    description: 'Leading real estate company specializing in residential properties, commercial spaces, land sales, and property development. Find your dream property with us.',
    siteName: 'Sarvam Real Estate',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sarvam Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarvam - Premier Real Estate & Property Solutions',
    description: 'Leading real estate company specializing in residential properties, commercial spaces, land sales, and property development.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '3BI3KFpSsh3AybnBQy_B5uTLw-AE6FxV-S77f8FHypU',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: '/',
  },
  category: 'real estate',
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Hosur',
    'geo.position': '12.7409;77.8253',
    'ICBM': '12.7409, 77.8253',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional SEO tags */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data - Real Estate Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Sarvam Real Estate',
              image: [
                `${process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000')}/logo.png`,
                `${process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000')}/og-image.jpg`
              ],
              url: process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000'),
              logo: `${process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000')}/logo.png`,
              description: 'Leading real estate company in Hosur specializing in villas, residential properties, commercial spaces, and land sales.',
              telephone: '+919940066449',
              email: 'info@sarvambuilders.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Pattalamman Nagar, Rayakottai Road',
                addressLocality: 'Hosur',
                addressRegion: 'Tamil Nadu',
                postalCode: '635109',
                addressCountry: 'IN'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 12.7409,
                longitude: 77.8253
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Hosur'
                },
                {
                  '@type': 'City',
                  name: 'Krishnagiri'
                },
                {
                  '@type': 'City',
                  name: 'Bangalore'
                }
              ],
              priceRange: '₹5 Lakhs - ₹5 Crores',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                  ],
                  opens: '09:00',
                  closes: '21:00'
                }
              ],
              sameAs: [
                'https://youtube.com/@sarvambuildersrealtors?si=tQHfD7SHbMchwcp7'
              ],
            }),
          }}
        />
      </head>
      <body className={outfit.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
