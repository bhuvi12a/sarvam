'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';
import { Outfit } from "next/font/google"; // Import font to match layout
import "./globals.css"; // Import globals to ensure Tailwind works

const outfit = Outfit({ subsets: ["latin"] });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Global error:', error);
    }, [error]);

    return (
        <html lang="en">
            <body className={outfit.className}>
                <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="h-10 w-10 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Something went wrong!
                        </h1>

                        <p className="text-gray-500 mb-8">
                            We apologize for the inconvenience. Our team has been notified.
                        </p>

                        {/* Error Details for easier debugging if needed */}
                        {process.env.NODE_ENV !== 'production' && (
                            <div className="mb-8 p-4 bg-red-50 rounded-lg text-left overflow-auto max-h-48">
                                <p className="text-xs font-mono text-red-800 break-words">
                                    {error.message || "Unknown error occurred"}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => reset()}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors bg-black"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                Try Again
                            </button>

                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            >
                                <Home className="w-5 h-5 mr-2" />
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
