"use client";

import { ListingCard } from "./ListingCard";
import { motion } from "framer-motion";
import Link from "next/link";

interface FeaturedListingsProps {
    initialProperties?: any[];
}

export function FeaturedListings({ initialProperties = [] }: FeaturedListingsProps) {
    return (
        <section id="listings" className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
                        >
                            Unlock the Best <span className="text-gray-400">Deals</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-500 dark:text-gray-400"
                        >
                            Discover our hand-picked selection of the most prestigious properties available now.
                        </motion.p>
                    </div>
                    <Link
                        href="/properties"
                        className="hidden md:inline-flex items-center gap-2 border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-medium"
                    >
                        View All Properties
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {initialProperties.length > 0 ? (
                        initialProperties.map((property, index) => (
                            <ListingCard
                                key={property.id}
                                {...property}
                                index={index}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No featured properties at the moment.
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/properties"
                        className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-medium"
                    >
                        View All Properties
                    </Link>
                </div>
            </div>
        </section>
    );
}
