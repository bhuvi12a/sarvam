import { PageBanner } from "@/components/PageBanner";
import { FeaturedListings } from "@/components/FeaturedListings";

export default function PropertiesPage() {
    return (
        <main className="min-h-screen bg-white">
            <PageBanner
                title="Our Properties"
                subtitle="Explore our curated list of premium properties available for sale and rent."
                imageSrc="/properties_banner.png"
            />
            <FeaturedListings />
        </main>
    );
}
