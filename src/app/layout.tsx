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
    default: 'Sarvam - Premier Real Estate & Property Solutions',
    template: '%s | Sarvam Real Estate',
  },
  description: 'Sarvam is a leading real estate company in Hosur specializing in villas, residential properties, commercial spaces, and land sales. Find your dream 2 BHK or 3 BHK villa in Hosur with expert guidance and trusted service.',
  keywords: [
    'real estate',
    'property for sale',
    'residential properties',
    'commercial properties',
    'land for sale',
    'property development',
    'real estate agent',
    'property listings',
    'buy property',
    'sell property',
    'property investment',
    'real estate services',
    'property management',
    'sarvam real estate',
    'sarvam builders',
    'sarvam realtors',
    'house for sale',
    'apartments for sale',
    'plots for sale',
    'independent house for sale',
    'gated community plots',
    'real estate solutions',
    // Location-specific keywords - Hosur & Krishnagiri
    'villas in hosur',
    'luxury villas hosur',
    '2 bhk villas in hosur',
    '3 bhk villas in hosur',
    'villas near hosur',
    'hosur real estate',
    'properties in hosur',
    'hosur villas for sale',
    'residential villas hosur',
    'land for sale in hosur',
    'plots for sale in hosur',
    'sites for sale in hosur',
    'commercial land hosur',
    'real estate agents in hosur',
    'property developers hosur',
    'sarvam real estate hosur',
    'real estate companies in hosur',
    'krishnagiri real estate',
    'plots in krishnagiri',
    'rayakottai road properties',
    // High-intent "Best" keywords
    'best plots in hosur',
    'best plots in krishnagiri',
    'best villas in hosur',
    'best villas in karapalli',
    'best plots in karapalli',
    'properties in karapalli',
    // Agency ranking keywords
    'best real estate agency in hosur',
    'top real estate agency in hosur',
    'best real estate company in hosur',
    'top builders in hosur',
    'best realtors in hosur',
  ],
  authors: [{ name: 'Sarvam Real Estate' }],
  creator: 'Sarvam Real Estate',
  publisher: 'Sarvam Real Estate',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data - Real Estate Organization */}
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
              email: 'sarvambuilder07@gmail.com',
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
                  name: 'Karapalli'
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
                // 'https://facebook.com/sarvam',
                // 'https://instagram.com/sarvam'
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
