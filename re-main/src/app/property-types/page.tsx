import Image from "next/image";

import { PageBanner } from "@/components/PageBanner";

export default function PropertyTypesPage() {
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
            <PageBanner
                title="Property Types"
                subtitle="We offer a diverse range of properties to suit every lifestyle."
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
