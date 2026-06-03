import { AboutSection } from "@/components/AboutSection";
import Image from "next/image";
import { Metadata } from "next";

import { PageBanner } from "@/components/PageBanner";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Sarvam Real Estate - your trusted partner in finding the perfect property. We specialize in residential, commercial, and land sales with expert guidance and personalized service.",
    keywords: ["about sarvam real estate", "real estate company", "property experts", "trusted real estate agent"],
    openGraph: {
        title: "About Sarvam Real Estate",
        description: "Your trusted partner in real estate - helping you find the perfect property with expert guidance.",
    },
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <PageBanner
                title="About Us"
                subtitle="Building trust and homes for over a decade."
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
