"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <div className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
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
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                >
                    Find Your Perfect <span className="text-primary">Sanctuary</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
                >
                    Connect with the most exclusive properties in the world's most desired locations.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                    className="bg-white/95 backdrop-blur-sm p-2 rounded-2xl max-w-3xl mx-auto shadow-2xl flex flex-col md:flex-row gap-2"
                >
                    <div className="flex-1 flex items-center px-4 md:border-r border-gray-200">
                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search by Location, Property Type..."
                            className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 h-12 outline-none"
                        />
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                        <select className="w-full bg-transparent border-none focus:ring-0 text-gray-800 h-12 px-4 outline-none cursor-pointer">
                            <option value="">Property Type</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="villa">Villa</option>
                        </select>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                        <select className="w-full bg-transparent border-none focus:ring-0 text-gray-800 h-12 px-4 outline-none cursor-pointer">
                            <option value="">Price Range</option>
                            <option value="0-500k">$0 - $500k</option>
                            <option value="500k-1m">$500k - $1M</option>
                            <option value="1m+">$1M+</option>
                        </select>
                    </div>
                    <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors w-full md:w-auto shadow-lg shadow-primary/25">
                        Search
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 flex justify-center gap-10 text-sm font-medium text-gray-300"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">12k+</span>
                        <span>Premium Listings</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">8k+</span>
                        <span>Happy Clients</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">100+</span>
                        <span>Awards Won</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
