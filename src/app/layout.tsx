import type { Metadata, Viewport } from 'next';
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
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
    'house for sale',
    'apartments for sale',
    'plots for sale',
    'real estate solutions',
    // Location-specific keywords - Hosur
    'villas in hosur',
    '2 bhk villas in hosur',
    '3 bhk villas in hosur',
    'villas near hosur',
    'hosur real estate',
    'properties in hosur',
    'hosur villas for sale',
    'residential villas hosur',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Sarvam Real Estate',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
              logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo.png`,
              description: 'Leading real estate company specializing in residential properties, commercial spaces, land sales, and property development',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
              },
              sameAs: [
                // Add your social media URLs here
                // 'https://facebook.com/sarvam',
                // 'https://twitter.com/sarvam',
                // 'https://linkedin.com/company/sarvam',
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
