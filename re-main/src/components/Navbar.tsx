"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Home, ChevronDown, ChevronUp, Building2, Crown, Warehouse, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const PROPERTY_TYPES = [
    { title: "Plots", href: "/property-types#plots", icon: Building },
    { title: "Villas", href: "/property-types#villas", icon: Home },
    { title: "Farmland", href: "/property-types#farmland", icon: Warehouse },
    { title: "Apartments", href: "/property-types#apartments", icon: Building2 },
    { title: "Commercials", href: "/property-types#commercials", icon: Crown },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show at top, hide on scroll down, show on scroll up
            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);  // Scrolling down past 100px
            } else if (currentScrollY < lastScrollY.current) {
                setIsVisible(true);   // Scrolling up
            }

            setScrolled(currentScrollY > 20);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-sm border-zinc-100 dark:border-zinc-800 py-2"
                    : "bg-white/80 backdrop-blur-md py-3 border-transparent",
                isVisible ? "translate-y-0" : "-translate-y-full"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-28 md:h-32">
                    <div className="flex-shrink-0 h-full flex items-center">
                        <Link href="/" className="h-full flex items-center group py-1">
                            <img
                                src="/logo.png"
                                alt="Sarvam Builders & Realtors"
                                className="h-full w-auto transition-transform group-hover:scale-105"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6 lg:space-x-8">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/properties">Properties</NavLink>
                            <NavLink href="/projects">Projects</NavLink>
                            <NavLink href="/services">Services</NavLink>
                            <NavLink href="/about">About Us</NavLink>

                            <div className="relative group">
                                <button className="flex items-center gap-1 text-secondary/70 dark:text-gray-300 hover:text-primary dark:hover:text-white px-2 py-2 text-sm font-medium transition-colors outline-none tracking-wide">
                                    Property Types
                                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 opacity-70" />
                                </button>

                                <div className="absolute top-full right-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
                                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-2 overflow-hidden ring-1 ring-black/5">
                                        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 px-3 py-2 uppercase tracking-widest">
                                            Collections
                                        </div>
                                        {PROPERTY_TYPES.map((type) => (
                                            <Link
                                                key={type.title}
                                                href={type.href}
                                                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group/item"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <type.icon className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover/item:text-primary dark:group-hover/item:text-white transition-colors" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium group-hover/item:text-secondary dark:group-hover/item:text-white transition-colors">
                                                        {type.title}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <Link href="/contact">
                            <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/20 active:translate-y-0.5">
                                Contact Us
                            </button>
                        </Link>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md overflow-hidden border-t border-zinc-100"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-1 sm:px-6">
                            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                            <MobileNavLink href="/properties" onClick={() => setIsOpen(false)}>Properties</MobileNavLink>
                            <MobileNavLink href="/projects" onClick={() => setIsOpen(false)}>Projects</MobileNavLink>
                            <MobileNavLink href="/services" onClick={() => setIsOpen(false)}>Services</MobileNavLink>
                            <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>About Us</MobileNavLink>

                            <div className="py-2">
                                <div className="px-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Property Types</div>
                                <div className="space-y-1">
                                    {PROPERTY_TYPES.map((type) => (
                                        <Link
                                            key={type.title}
                                            href={type.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-secondary/70 hover:text-primary hover:bg-zinc-50 rounded-lg text-base"
                                        >
                                            <type.icon className="h-4 w-4" />
                                            {type.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                                <Link href="/contact" onClick={() => setIsOpen(false)} className="block">
                                    <button className="w-full bg-primary text-white px-5 py-3 rounded-lg font-medium shadow-md shadow-primary/20">
                                        Contact Us
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-secondary/70 dark:text-gray-300 hover:text-primary dark:hover:text-white px-2 py-2 text-sm font-medium transition-colors tracking-wide relative group"
        >
            {children}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-secondary/70 hover:text-primary hover:bg-zinc-50 block px-3 py-2.5 rounded-lg text-lg font-medium transition-colors"
        >
            {children}
        </Link>
    );
}
