import { Metadata } from "next";
import PropertiesPageClient from "./PropertiesPageClient";

export const metadata: Metadata = {
    title: "Low Budget Plots & Villas for Sale in Hosur",
    description: "Browse verified low budget plots, 2BHK/3BHK luxury villas, DTCP & HNTDA approved residential sites for sale in Hosur and Krishnagiri by Sarvam Real Estate.",
    keywords: [
        "low budget plots in hosur",
        "villas for sale in hosur",
        "2bhk villas in hosur",
        "3bhk villas in hosur",
        "plots for sale in hosur",
        "real estate agency hosur"
    ],
    openGraph: {
        title: "Low Budget Plots & Villas for Sale in Hosur | Sarvam Real Estate",
        description: "Browse verified low budget plots, 2BHK/3BHK luxury villas, DTCP & HNTDA approved residential sites for sale in Hosur and Krishnagiri.",
        url: "/properties",
    },
    alternates: {
        canonical: "/properties",
    },
};

export default function PropertiesPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000');

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            'name': 'Low Budget Plots & Villas for Sale in Hosur',
            'description': 'Browse verified low budget plots, 2BHK/3BHK luxury villas, DTCP & HNTDA approved residential sites for sale in Hosur and Krishnagiri by Sarvam Real Estate.',
            'url': `${baseUrl}/properties`,
            'publisher': {
                '@type': 'Organization',
                'name': 'Sarvam Real Estate',
                'url': baseUrl
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
                    'name': 'Properties',
                    'item': `${baseUrl}/properties`
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
            <PropertiesPageClient />
        </>
    );
}
