"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Calendar, Loader2 } from "lucide-react";

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
}

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    async function fetchInquiries() {
        try {
            const res = await fetch('/api/contact');
            if (res.ok) {
                const data = await res.json();
                setInquiries(data);
            }
        } catch (error) {
            console.error('Failed to fetch inquiries', error);
        } finally {
            setLoading(false);
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 dark:text-white">Inquiries</h1>

            <div className="grid gap-3 sm:gap-4">
                {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-3 sm:mb-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate">{inquiry.name}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-1 truncate">
                                        <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                        <span className="truncate">{inquiry.email}</span>
                                    </div>
                                    {inquiry.phone && (
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                            <span>{inquiry.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
                                <Calendar className="h-3 w-3" />
                                {new Date(inquiry.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800/50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm leading-relaxed">
                            {inquiry.message}
                        </p>
                    </div>
                ))}

                {inquiries.length === 0 && (
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-dashed border-gray-200 dark:border-zinc-800 text-center text-gray-500">
                        No inquiries yet.
                    </div>
                )}
            </div>
        </div>
    );
}
