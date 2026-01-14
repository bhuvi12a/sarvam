import type { Metadata, Viewport } from 'next';
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'Sarvam - Premier Construction & Real Estate Company',
    template: '%s | Sarvam Construction',
  },
  description: 'Sarvam is a leading construction and real estate company specializing in residential, commercial, and infrastructure projects. Quality construction services with innovative designs.',
  keywords: [
    'construction company',
    'real estate',
    'residential construction',
    'commercial construction',
    'infrastructure projects',
    'building contractors',
    'property development',
    'sarvam construction',
    'construction services',
    'quality construction',
  ],
  authors: [{ name: 'Sarvam' }],
  creator: 'Sarvam',
  publisher: 'Sarvam',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Sarvam - Premier Construction & Real Estate Company',
    description: 'Leading construction and real estate company specializing in residential, commercial, and infrastructure projects.',
    siteName: 'Sarvam Construction',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sarvam Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarvam - Premier Construction & Real Estate Company',
    description: 'Leading construction and real estate company specializing in residential, commercial, and infrastructure projects.',
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
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: '/',
  },
  category: 'construction',
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

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sarvam Construction',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
              logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo.png`,
              description: 'Leading construction and real estate company',
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
