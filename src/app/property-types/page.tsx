import { Metadata } from "next";
import Image from "next/image";

import { PageBanner } from "@/components/PageBanner";

export const metadata: Metadata = {
    title: "Plots, Villas, Farmlands & Commercial Properties in Hosur",
    description: "Explore property categories in Hosur: DTCP approved residential plots, luxury 2BHK/3BHK villas, agricultural farmlands, and commercial plots.",
    keywords: [
        "plots in hosur",
        "villas in hosur",
        "farmland in hosur",
        "commercial land hosur",
        "property types hosur"
    ],
    openGraph: {
        title: "Plots, Villas & Commercial Properties for Sale in Hosur | Sarvam",
        description: "Explore property categories in Hosur: DTCP approved residential plots, luxury 2BHK/3BHK villas, agricultural farmlands, and commercial plots.",
        url: "/property-types",
    },
    alternates: {
        canonical: "/property-types",
    },
};

export default function PropertyTypesPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000');

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            'name': 'Plots, Villas, Farmlands & Commercial Properties in Hosur',
            'description': 'Explore property categories in Hosur: DTCP approved residential plots, luxury 2BHK/3BHK villas, agricultural farmlands, and commercial plots.',
            'url': `${baseUrl}/property-types`,
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
                    'name': 'Property Types',
                    'item': `${baseUrl}/property-types`
                }
            ]
        }
    ];

    const types = [
        {
            title: "Luxury Villas",
            count: 45,
            image: "/listing_villa_beverly_hills.png"
        },
        {
            title: "Modern Apartments",
            count: 120,
            image: "/listing_apartment_ny.png"
        },
        {
            title: "Penthouses",
            count: 12,
            image: "/hero_property.png"
        },
        {
            title: "Commercial",
            count: 34,
            image: "/commercial_building.png"
        },
        {
            title: "Seaside Condos",
            count: 28,
            image: "/listing_mansion_miami.png"
        },
        {
            title: "Cottages",
            count: 15,
            image: "/listing_cottage_austin.png"
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PageBanner
                title="Property Types in Hosur"
                subtitle="Explore residential plots, luxury 2BHK/3BHK villas, farmlands, and commercial sites."
                imageSrc="/property_types_banner.png"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {types.map((type, index) => (
                        <div key={index} className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer">
                            <Image
                                src={type.image}
                                alt={type.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="text-2xl font-bold text-white mb-1">{type.title}</h3>
                                <p className="text-gray-300">{type.count} Listings</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
