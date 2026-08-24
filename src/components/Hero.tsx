"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, Home, Building } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [availableLocations, setAvailableLocations] = useState<string[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const [propertiesRes, projectsRes] = await Promise.all([
                    fetch('/api/properties'),
                    fetch('/api/projects')
                ]);

                const properties = await propertiesRes.json();
                const projects = await projectsRes.json();

                const locationSet = new Set<string>();

                if (Array.isArray(properties)) {
                    properties.forEach((item: any) => {
                        if (item.address && item.address.trim()) {
                            locationSet.add(item.address.trim());
                        }
                    });
                }

                if (Array.isArray(projects)) {
                    projects.forEach((item: any) => {
                        if (item.location && item.location.trim()) {
                            locationSet.add(item.location.trim());
                        }
                    });
                }

                const sortedLocations = Array.from(locationSet).sort();
                setAvailableLocations(sortedLocations);
            } catch (error) {
                console.error('Failed to fetch locations:', error);
            }
        };

        fetchLocations();
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set("q", location);
        if (propertyType) params.set("type", propertyType);

        router.push(`/properties?${params.toString()}`);
    };

    return (
        <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax effect */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 transform animate-ken-burns"
                style={{
                    backgroundImage: 'url("/premium_hero_bg.jpg")'
                }}
            >
                {/* Gradient Overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 text-center text-white flex flex-col items-center">
                
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    <span className="text-sm font-medium tracking-wide">#1 Real Estate Agency in Hosur</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-2xl"
                >
                    Find Your Dream <br className="hidden sm:block" />
                    Property with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Sarvam</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto px-4 font-light drop-shadow-lg"
                >
                    Discover premium luxury villas, low budget plots, and commercial lands across Hosur & Krishnagiri. Experience real estate excellence.
                </motion.p>

                {/* Glassmorphic Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-3 mb-16"
                >
                    <div className="flex-1 relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-hover:text-primary transition-colors">
                            <MapPin className="h-5 w-5" />
                        </div>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-white/5 hover:bg-white/10 border-none text-white text-sm sm:text-base rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary appearance-none cursor-pointer transition-all outline-none [&>option]:text-black"
                        >
                            <option value="">All Locations in Hosur</option>
                            {availableLocations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-px bg-white/20 hidden md:block" />

                    <div className="flex-1 relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-hover:text-primary transition-colors">
                            <Home className="h-5 w-5" />
                        </div>
                        <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="w-full bg-white/5 hover:bg-white/10 border-none text-white text-sm sm:text-base rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary appearance-none cursor-pointer transition-all outline-none [&>option]:text-black"
                        >
                            <option value="">Property Type</option>
                            <option value="Villa">Luxury Villa</option>
                            <option value="Plot">Residential Plot</option>
                            <option value="Commercial">Commercial Land</option>
                            <option value="House">Independent House</option>
                        </select>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,107,0,0.4)] md:ml-2"
                    >
                        <Search className="h-5 w-5" />
                        <span>Search</span>
                    </button>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 w-full max-w-4xl pt-8 border-t border-white/20"
                >
                    <div className="flex flex-col items-center group cursor-default">
                        <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 group-hover:scale-110 transition-transform duration-300">12k+</span>
                        <span className="text-sm text-gray-300 mt-2 font-medium tracking-wide">Properties</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-default">
                        <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 group-hover:scale-110 transition-transform duration-300">8k+</span>
                        <span className="text-sm text-gray-300 mt-2 font-medium tracking-wide">Happy Clients</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-default">
                        <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 group-hover:scale-110 transition-transform duration-300">10+</span>
                        <span className="text-sm text-gray-300 mt-2 font-medium tracking-wide">Years Exp</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-default">
                        <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 group-hover:scale-110 transition-transform duration-300">100+</span>
                        <span className="text-sm text-gray-300 mt-2 font-medium tracking-wide">Awards</span>
                    </div>
                </motion.div>
            </div>
            
            {/* Custom CSS for ken-burns effect */}
            <style jsx global>{`
                @keyframes ken-burns {
                    0% { transform: scale(1.05); }
                    100% { transform: scale(1.15); }
                }
                .animate-ken-burns {
                    animation: ken-burns 20s ease-in-out infinite alternate;
                }
            `}</style>
        </div>
    );
}
