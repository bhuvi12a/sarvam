import { HandCoins, Search, Key, Building2 } from "lucide-react";

import { PageBanner } from "@/components/PageBanner";

export default function ServicesPage() {
    const services = [
        {
            icon: HandCoins,
            title: "Buying Property",
            description: "We help you find the perfect home that fits your lifestyle and budget, guiding you through every step of the purchase."
        },
        {
            icon: Building2,
            title: "Selling Property",
            description: "Get the best value for your property with our expert valuation, marketing strategies, and negotiation skills."
        },
        {
            icon: Search,
            title: "Property Management",
            description: "From tenant screening to maintenance, we handle the day-to-day operations so you can enjoy passive income."
        },
        {
            icon: Key,
            title: "Consulting",
            description: "Expert advice on real estate investment, market trends, and legal compliance to help you make informed decisions."
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <PageBanner
                title="Our Services"
                subtitle="Comprehensive real estate solutions tailored to your unique needs."
                imageSrc="/services_banner.png"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {services.map((service, index) => (
                        <div key={index} className="flex gap-6 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                            <div className="shrink-0 bg-black dark:bg-white text-white dark:text-black h-14 w-14 rounded-2xl flex items-center justify-center">
                                <service.icon className="h-7 w-7" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
