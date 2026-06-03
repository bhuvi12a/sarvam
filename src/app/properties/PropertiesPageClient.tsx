"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageBanner } from "@/components/PageBanner";
import { FeaturedListings } from "@/components/FeaturedListings";
import { ListingCard } from "@/components/ListingCard";
import { Loader2, Search, X } from "lucide-react";

interface Property {
    id: number;
    title: string;
    price: string;
    address: string;
    beds: number;
    baths: number;
    sqft: number;
    imageUrl: string;
    type: string;
}

function PropertiesContent() {
    const searchParams = useSearchParams();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    // Get filter values from URL params
    const searchQuery = searchParams.get("q") || "";
    const typeFilter = searchParams.get("type") || "";
    const priceFilter = searchParams.get("price") || "";

    const hasFilters = searchQuery || typeFilter || priceFilter;

    useEffect(() => {
        async function fetchProperties() {
            try {
                const res = await fetch("/api/properties");
                if (res.ok) {
                    const data = await res.json();
                    setProperties(data);
                }
            } catch (error) {
                console.error("Failed to fetch properties", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProperties();
    }, []);

    // Filter properties based on search params
    const filteredProperties = useMemo(() => {
        return properties.filter(property => {
            // Search query filter (matches title, address, or type)
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const title = (property.title || '').toLowerCase();
                const address = (property.address || '').toLowerCase();
                const type = (property.type || '').toLowerCase();

                // Check for exact match on address (for location dropdown)
                // or partial match on any field (for text search)
                const matchesSearch =
                    address === query || // Exact location match
                    title.includes(query) ||
                    address.includes(query) ||
                    type.includes(query);
                if (!matchesSearch) return false;
            }

            // Property type filter (match against title since type field is sale/rent)
            if (typeFilter) {
                const titleLower = property.title.toLowerCase();
                const filterLower = typeFilter.toLowerCase();

                // Map filter values to what might be in titles
                const typeKeywords: { [key: string]: string[] } = {
                    'plots': ['plot', 'plots', 'land'],
                    'villas': ['villa', 'villas'],
                    'farmland': ['farmland', 'farm', 'agricultural'],
                    'apartments': ['apartment', 'flat', '2bhk', '3bhk', '1bhk'],
                    'commercials': ['commercial', 'shop', 'office', 'showroom']
                };

                const keywords = typeKeywords[filterLower] || [filterLower];
                const matchesType = keywords.some(keyword => titleLower.includes(keyword));
                if (!matchesType) return false;
            }

            // Price filter - parse Lakhs/Cr format
            if (priceFilter) {
                const priceStr = property.price.toLowerCase();
                let priceLakhs = 0;

                // Extract number from price string
                const numMatch = priceStr.match(/[\d.]+/);
                if (numMatch) {
                    const num = parseFloat(numMatch[0]);
                    if (priceStr.includes('cr')) {
                        priceLakhs = num * 100; // 1 Cr = 100 Lakhs
                    } else {
                        priceLakhs = num; // Already in Lakhs
                    }
                }

                switch (priceFilter) {
                    case "0-25L":
                        if (priceLakhs > 25) return false;
                        break;
                    case "25L-50L":
                        if (priceLakhs < 25 || priceLakhs > 50) return false;
                        break;
                    case "50L-1Cr":
                        if (priceLakhs < 50 || priceLakhs > 100) return false;
                        break;
                    case "1Cr+":
                        if (priceLakhs < 100) return false;
                        break;
                }
            }

            return true;
        });
    }, [properties, searchQuery, typeFilter, priceFilter]);

    const clearFilters = () => {
        window.location.href = "/properties";
    };

    return (
        <main className="min-h-screen bg-white">
            <PageBanner
                title="Our Properties"
                subtitle="Explore our curated collection of premium properties."
                imageSrc="/properties_banner.png"
            />

            {/* Show filters if any are active */}
            {hasFilters && (
                <div className="bg-primary/5 border-b border-primary/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">
                                <Search className="h-4 w-4 inline mr-1" />
                                Active Filters:
                            </span>
                            {searchQuery && (
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                    Search: "{searchQuery}"
                                </span>
                            )}
                            {typeFilter && (
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize">
                                    Type: {typeFilter}
                                </span>
                            )}
                            {priceFilter && (
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                    Price: {priceFilter.replace("-", " - ").replace("L", " Lakhs").replace("Cr", " Cr")}
                                </span>
                            )}
                            <button
                                onClick={clearFilters}
                                className="ml-auto flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
                            >
                                <X className="h-4 w-4" />
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!hasFilters && <FeaturedListings />}

            <section className="py-24 bg-zinc-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {hasFilters ? "Search Results" : "All Properties"}
                    </h2>
                    {hasFilters && (
                        <p className="text-gray-500 mb-8">
                            Found {filteredProperties.length} properties matching your criteria
                        </p>
                    )}
                    {!hasFilters && <div className="mb-8" />}

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProperties.map((property, index) => (
                                <ListingCard
                                    key={property.id}
                                    {...property}
                                    index={index}
                                />
                            ))}
                            {filteredProperties.length === 0 && (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 mb-4">
                                        {hasFilters
                                            ? "No properties match your search criteria."
                                            : "No properties found. Check back soon!"}
                                    </p>
                                    {hasFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-primary font-medium hover:underline"
                                        >
                                            Clear filters and show all properties
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default function PropertiesPageClient() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <PropertiesContent />
        </Suspense>
    );
}
