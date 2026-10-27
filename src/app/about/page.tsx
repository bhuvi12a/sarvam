import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
    title: "About Sarvam Builders & Realtors - Vision, Mission & Founder Anand Prabhu",
    description: "Learn about Sarvam Builders & Realtors in Hosur. Founded by Anand Prabhu with 18+ years in real estate development. Discover our vision, mission, DTCP plots, and luxury villas.",
    keywords: [
        "about sarvam builders",
        "anand prabhu sarvam",
        "anand prabhu ceo",
        "founder sarvam builders",
        "sarvam builders and realtors",
        "vision and mission sarvam",
        "real estate company hosur",
        "sarvam builders hosur",
        "property developers in hosur",
        "trusted real estate agent hosur"
    ],
    openGraph: {
        title: "About Sarvam Builders & Realtors | Vision, Mission & Founder Anand Prabhu",
        description: "18+ years of real estate leadership in Hosur founded by Anand Prabhu. Discover our mission, vision, and verified plots & luxury villas.",
        url: "/about",
        images: [
            {
                url: "/about_banner.png",
                width: 1200,
                height: 630,
                alt: "About Sarvam Builders & Realtors Hosur",
            },
        ],
    },
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000');

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            'name': 'About Sarvam Builders & Realtors',
            'description': 'Sarvam Builders & Realtors was founded by Anand Prabhu with 18+ years of real estate expertise in Hosur, delivering DTCP plots and luxury villas with 100% legal clarity.',
            'url': `${baseUrl}/about`,
            'mainEntity': {
                '@type': 'RealEstateAgent',
                'name': 'Sarvam Builders & Realtors',
                'url': baseUrl,
                'logo': `${baseUrl}/logo.png`,
                'telephone': '+919940066449',
                'email': 'info@sarvambuilders.com',
                'founder': {
                    '@type': 'Person',
                    'name': 'Anand Prabhu',
                    'jobTitle': 'Founder & CEO',
                    'description': 'Founder and CEO of Sarvam Builders & Realtors with over 18 years in real estate development and construction in Hosur and South India.'
                },
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': 'Pattalamman Nagar, Rayakottai Road',
                    'addressLocality': 'Hosur',
                    'addressRegion': 'Tamil Nadu',
                    'postalCode': '635109',
                    'addressCountry': 'IN'
                }
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': baseUrl
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'About Us',
                    'item': `${baseUrl}/about`
                }
            ]
        }
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AboutPageClient />
        </>
    );
}
