"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("q", searchQuery);
        if (propertyType) params.set("type", propertyType);
        if (priceRange) params.set("price", priceRange);

        router.push(`/properties?${params.toString()}`);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="relative h-[85vh] sm:h-[90vh] min-h-[500px] sm:min-h-[600px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop")'
                }}
            >
                <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
                >
                    Find Your Perfect <span className="text-primary">Sanctuary</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-10 max-w-2xl mx-auto px-4"
                >
                    Connect with the most exclusive properties in the world's most desired locations.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                    className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-xl sm:rounded-2xl max-w-3xl mx-auto shadow-2xl flex flex-col md:flex-row gap-2"
                >
                    <div className="flex-1 flex items-center px-3 sm:px-4 md:border-r border-gray-200">
                        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2 shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search by Location..."
                            className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 h-10 sm:h-12 text-sm sm:text-base outline-none"
                        />
                    </div>
                    <div className="flex-1 flex items-center">
                        <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-gray-800 h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base outline-none cursor-pointer"
                        >
                            <option value="">Property Type</option>
                            <option value="plots">Plots</option>
                            <option value="villas">Villas</option>
                            <option value="farmland">Farmland</option>
                            <option value="apartments">Apartments</option>
                            <option value="commercials">Commercials</option>
                        </select>
                    </div>
                    <div className="flex-1 flex items-center">
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-gray-800 h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base outline-none cursor-pointer"
                        >
                            <option value="">Price Range</option>
                            <option value="0-25L">₹0 - ₹25 Lakhs</option>
                            <option value="25L-50L">₹25 - ₹50 Lakhs</option>
                            <option value="50L-1Cr">₹50L - ₹1 Cr</option>
                            <option value="1Cr+">₹1 Cr+</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:bg-primary-dark transition-colors w-full md:w-auto shadow-lg shadow-primary/25"
                    >
                        Search
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-8 sm:mt-12 flex justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-gray-300"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-xl sm:text-3xl font-bold text-white">12k+</span>
                        <span>Premium Listings</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl sm:text-3xl font-bold text-white">8k+</span>
                        <span>Happy Clients</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xl sm:text-3xl font-bold text-white">100+</span>
                        <span>Awards Won</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


