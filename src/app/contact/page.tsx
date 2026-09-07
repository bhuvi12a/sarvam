import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
    title: "Contact Sarvam Real Estate Hosur - Free Site Visit",
    description: "Connect with Sarvam Builders & Realtors in Rayakottai Road, Hosur. Call +91 99400 66449 for free site visits, DTCP plot inquiries, and villa bookings.",
    keywords: [
        "contact sarvam real estate",
        "real estate agent hosur contact",
        "sarvam builders phone number",
        "plots in hosur contact"
    ],
    openGraph: {
        title: "Contact Sarvam Real Estate Hosur | Book Free Site Visit",
        description: "Connect with Sarvam Builders & Realtors in Rayakottai Road, Hosur. Call +91 99400 66449 for free site visits.",
        url: "/contact",
    },
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000');

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            'name': 'Contact Sarvam Real Estate Hosur',
            'description': 'Connect with Sarvam Builders & Realtors in Rayakottai Road, Hosur. Call +91 99400 66449 for free site visits, DTCP plot inquiries, and villa bookings.',
            'url': `${baseUrl}/contact`,
            'mainEntity': {
                '@type': 'RealEstateAgent',
                'name': 'Sarvam Real Estate',
                'telephone': '+919940066449',
                'email': 'info@sarvambuilders.com',
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
                    'name': 'Contact Us',
                    'item': `${baseUrl}/contact`
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
            <ContactPageClient />
        </>
    );
}
