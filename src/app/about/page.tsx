import { AboutSection } from "@/components/AboutSection";
import Image from "next/image";
import { Metadata } from "next";

import { PageBanner } from "@/components/PageBanner";

export const metadata: Metadata = {
    title: "About Sarvam Real Estate - Premier Builders & Realtors in Hosur",
    description: "Learn about Sarvam Real Estate - Hosur's most trusted real estate builders with 10+ years of excellence in low budget plots, luxury villas, and land development.",
    keywords: ["about sarvam real estate", "real estate company hosur", "sarvam builders hosur", "property dealers in hosur", "trusted real estate agent"],
    openGraph: {
        title: "About Sarvam Real Estate | Premier Builders & Realtors in Hosur",
        description: "Your trusted partner in real estate - helping you find low budget plots and luxury villas in Hosur.",
        url: "/about",
    },
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000');

    const jsonLd = {
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
    };

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PageBanner
                title="About Sarvam Real Estate"
                subtitle="Building trust and homes in Hosur for over a decade."
                imageSrc="/about_banner.png"
            />

            <AboutSection />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                            At Sarvam Builders & Realtors, our mission is to redefine the real estate experience by providing unparalleled service, expert knowledge, and ethical practices.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                            We believe that a home is more than just a place to live—it's a sanctuary, an investment, and a legacy. We are dedicated to helping you find the perfect property that aligns with your dreams.
                        </p>
                    </div>
                    <div className="relative aspect-video rounded-3xl overflow-hidden">
                        <Image
                            src="/about_banner.png"
                            alt="Team Meeting"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
