"use client";

import { useState, useEffect } from "react";
import { X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if user has already seen the popup in this session
        const hasSeenPopup = sessionStorage.getItem("sarvam_promo_popup_seen");
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1800); // Show popup after 1.8 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("sarvam_promo_popup_seen", "true");
    };

    const handleCall = () => {
        window.open("tel:+919940066449", "_self");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                    />

                    {/* Popup Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 25 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        className="relative w-full max-w-[480px] overflow-hidden rounded-[2.5rem] bg-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20"
                    >
                        {/* Interactive Clickable Image Area */}
                        <div 
                            onClick={handleCall}
                            className="cursor-pointer relative w-full group overflow-hidden"
                            title="Call Sarvam Builders"
                        >
                            <Image
                                src="/prestigious-imperial-poster.jpg"
                                alt="Prestigious Imperial Special Offer"
                                width={800}
                                height={600}
                                sizes="(max-w-480px) 100vw, 480px"
                                className="object-contain w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                                priority
                            />
                            
                            {/* Subtle micro-animation hover pulse */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>

                        {/* Interactive close overlay for the image's design button */}
                        {/* Placing a transparent, larger interactive tap-target exactly on the image's top-right close area */}
                        <button
                            onClick={handleClose}
                            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 transition-all hover:bg-black/60 hover:scale-110 active:scale-95 shadow-md"
                            aria-label="Close promotion dialog"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Quick Contact Button underneath for high mobile conversion */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%]">
                            <button
                                onClick={handleCall}
                                className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-2xl shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <PhoneCall className="h-5 w-5 animate-pulse" />
                                Call Now: +91 9940066449
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
