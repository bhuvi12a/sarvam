import { Landmark, Hammer, Droplets, Sofa, PenTool } from "lucide-react";

import { PageBanner } from "@/components/PageBanner";

export default function ServicesPage() {
    const services = [
        {
            icon: Landmark,
            title: "Loan Facility",
            description: "We assist you in securing the best home loan options with competitive interest rates and flexible repayment terms to make your dream home affordable."
        },
        {
            icon: Hammer,
            title: "Construction",
            description: "From foundation to finishing, our expert construction team delivers high-quality residential and commercial building projects on time and within budget."
        },
        {
            icon: Droplets,
            title: "Borewell",
            description: "Professional borewell drilling services with advanced equipment to ensure reliable water supply for your property with proper geological assessment."
        },
        {
            icon: Sofa,
            title: "Interiors",
            description: "Transform your space with our creative interior design solutions that combine functionality with aesthetics to reflect your personal style."
        },
        {
            icon: PenTool,
            title: "Architecture",
            description: "Innovative architectural design services that bring your vision to life with sustainable, modern, and structurally sound building plans."
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <PageBanner
                title="Our Services"
                subtitle="Comprehensive real estate solutions tailored to your unique needs."
                imageSrc="/services_banner.png"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                    {services.map((service, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                            <div className="shrink-0 bg-black dark:bg-white text-white dark:text-black h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center">
                                <service.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{service.title}</h3>
                                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
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

