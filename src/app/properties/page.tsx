import { Metadata } from "next";
import PropertiesPageClient from "./PropertiesPageClient";

export const metadata: Metadata = {
    title: "Our Properties - Sarvam Real Estate",
    description: "Explore our curated collection of premium and low budget properties, plots, and villas for sale in Hosur.",
    alternates: {
        canonical: "/properties",
    },
};

export default function PropertiesPage() {
    return <PropertiesPageClient />;
}
