import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface ListingCardProps {
    id: number;
    title: string;
    price: string;
    address: string;
    beds: number;
    baths: number;
    sqft: number;
    imageUrl: string;
    type: string;
    index: number;
}

export function ListingCard({
    id,
    title,
    price,
    address,
    beds,
    baths,
    sqft,
    imageUrl,
    type,
    index
}: ListingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{title}</h3>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 shrink-0" />
                            <span className="line-clamp-1">{address}</span>
                        </div>
                    </div>
                    <div className="bg-black dark:bg-white text-white dark:text-black rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shrink-0 ml-2">
                        <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 sm:py-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 sm:gap-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium">
                        <div className="flex items-center gap-1">
                            <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                            <span>{beds} Beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                            <span>{baths} Baths</span>
                        </div>
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">
                        {sqft.toLocaleString()} sqft
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 sm:pt-4 mt-1 sm:mt-2">
                    <span className="text-xl sm:text-2xl font-bold text-primary">{price}</span>
                    <Link 
                        href={`/properties/${id}`}
                        className="text-xs sm:text-sm font-semibold underline decoration-2 underline-offset-4 decoration-transparent group-hover:decoration-current transition-all"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

