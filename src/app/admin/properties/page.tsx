"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface Property {
    id: string;
    title: string;
    price: string;
    type: string;
    beds: number;
    baths: number;
    sqft: number;
    imageUrl: string;
}

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties();
    }, []);

    async function fetchProperties() {
        try {
            const res = await fetch('/api/properties');
            if (res.ok) {
                const data = await res.json();
                setProperties(data);
            }
        } catch (error) {
            console.error('Failed to fetch properties', error);
        } finally {
            setLoading(false);
        }
    }

    async function deleteProperty(id: string) {
        if (!confirm('Are you sure you want to delete this property?')) return;

        try {
            const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProperties(properties.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete property', error);
            alert('Failed to delete property');
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">Properties</h1>
                <Link
                    href="/admin/properties/new"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition w-full sm:w-auto justify-center"
                >
                    <Plus className="h-4 w-4" />
                    Add Property
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm sm:text-base">
                        <thead className="bg-gray-50 dark:bg-zinc-800/50 text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm">
                            <tr>
                                <th className="px-3 sm:px-6 py-3 sm:py-4">Title</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4">Price</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4">Type</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">Details</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {properties.map((property) => (
                                <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            {property.imageUrl && (
                                                <img
                                                    src={property.imageUrl}
                                                    alt={property.title}
                                                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover flex-shrink-0"
                                                />
                                            )}
                                            <span className="font-medium text-gray-900 dark:text-white truncate text-sm sm:text-base">{property.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap text-sm sm:text-base">{property.price}</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${property.type === 'Sale'
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                            }`}>
                                            {property.type}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 text-xs sm:text-sm hidden md:table-cell whitespace-nowrap">
                                        {property.beds}bd • {property.baths}ba • {property.sqft}sqft
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => deleteProperty(property.id)}
                                                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {properties.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No properties found. Add your first property!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
