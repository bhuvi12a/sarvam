'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    FaBars,
    FaTimes,
    FaPhone,
    FaEnvelope,
    FaChevronDown,
    FaCaretRight
} from 'react-icons/fa';
import {
    HiOutlineVideoCamera,
    HiOutlineChip,
    HiOutlineCloud,
    HiOutlineShieldCheck
} from 'react-icons/hi';
import { Home, Building2, Crown, Warehouse, Building } from 'lucide-react';

const PROPERTY_TYPES = [
    { title: "Plots", href: "/property-types#plots", icon: Building },
    { title: "Villas", href: "/property-types#villas", icon: Home },
    { title: "Farmland", href: "/property-types#farmland", icon: Warehouse },
    { title: "Apartments", href: "/property-types#apartments", icon: Building2 },
    { title: "Commercials", href: "/property-types#commercials", icon: Crown },
];

export function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Ensure component is mounted before rendering interactive elements
    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent background scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
                setOpenDropdown(null);
                setMobileOpenDropdown(null);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const navItems = [
        {
            href: '/',
            label: 'Home'
        },
        {
            href: '/projects',
            label: 'Projects'
        },
        {
            href: '/services',
            label: 'Services'
        },
        {
            href: '/about',
            label: 'About Us'
        },
        {
            href: '/property-types',
            label: 'Property Types',
            hasDropdown: true,
            dropdownItems: PROPERTY_TYPES.map(type => ({
                href: type.href,
                label: type.title,
                icon: <type.icon className="w-4 h-4" />,
                description: `Browse ${type.title}`
            }))
        },
    ];

    const handleDropdownEnter = (label: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setOpenDropdown(label);
    };

    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 200);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => {
            if (prev) {
                setMobileOpenDropdown(null);
            }
            return !prev;
        });
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setMobileOpenDropdown(null);
    };

    const toggleMobileDropdown = (label: string) => {
        setMobileOpenDropdown(prev => prev === label ? null : label);
    };

    // Animation variants
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: "easeOut"
            }
        })
    };

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    // Logo Component for Desktop
    const DesktopLogo = () => (
        <div className="flex items-center h-full">
            <Link href="/" className="border-0 flex-shrink-0 flex items-center justify-center h-full py-1">
                <img
                    src="/logo.png"
                    alt="Sarvam Builders & Realtors"
                    className="h-full w-auto transition-transform hover:scale-105"
                />
            </Link>
        </div>
    );

    // Logo Component for Mobile
    const MobileLogo = () => (
        <Link href="/" className="border-0 flex-shrink-0 flex items-center h-full py-1">
            <img
                src="/logo.png"
                alt="Sarvam Builders & Realtors"
                className="h-full w-auto transition-transform hover:scale-105"
            />
        </Link>
    );

    return (
        <header
            ref={navRef}
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
                : 'bg-white border-b border-gray-200/30'
                }`}
        >
            {/* Top Bar for Tagline and Contact Info */}
            <div 
                className={`bg-secondary text-white text-[11px] sm:text-xs transition-all duration-300 overflow-hidden ${
                    isScrolled ? 'h-0 opacity-0 border-none' : 'h-10 sm:h-8 opacity-100 py-1.5 sm:py-1 border-b border-secondary/20 shadow-sm'
                } relative z-50`}
            >
                <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 font-medium tracking-wide">
                    <div className="flex items-center gap-1.5 text-center justify-center sm:justify-start">
                        <span className="inline-block text-yellow-400 animate-bounce">🏡</span>
                        <span>Discover Top-Rated &amp; <strong className="text-yellow-400 font-semibold">Low Budget Plots in Hosur</strong> for Sale</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 justify-center">
                        <a href="tel:+919940066449" className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                            <FaPhone className="w-2.5 h-2.5 text-yellow-400" />
                            <span>+91 99400 66449</span>
                        </a>
                        <span className="text-white/20">|</span>
                        <a href="mailto:info@sarvambuilders.com" className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                            <FaEnvelope className="w-2.5 h-2.5 text-yellow-400" />
                            <span>info@sarvambuilders.com</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <nav className={`flex items-center justify-between transition-all duration-300 ${
                    isScrolled ? 'h-20 md:h-24' : 'h-32 md:h-36'
                }`}>
                    {/* Desktop Logo - Hidden on mobile */}
                    <div className="hidden xl:block h-full">
                        <DesktopLogo />
                    </div>

                    {/* Mobile Logo - Visible on mobile */}
                    <div className="xl:hidden h-full">
                        <MobileLogo />
                    </div>

                    {/* Desktop Navigation - Hidden below xl */}
                    <div className="hidden xl:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                custom={index}
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                className="relative"
                                onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.label)}
                                onMouseLeave={() => item.hasDropdown && handleDropdownLeave()}
                            >
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname.startsWith(item.href)
                                                ? 'text-primary bg-primary/10'
                                                : 'text-secondary/70 hover:text-primary hover:bg-primary/5'
                                                }`}
                                        >
                                            <span className="font-medium">{item.label}</span>
                                            <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        {/* Desktop Dropdown */}
                                        <AnimatePresence>
                                            {openDropdown === item.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                                                    onMouseEnter={() => handleDropdownEnter(item.label)}
                                                    onMouseLeave={handleDropdownLeave}
                                                >
                                                    <div className="p-2">
                                                        {item.dropdownItems!.map((subItem) => (
                                                            <Link
                                                                key={subItem.href}
                                                                href={subItem.href}
                                                                className="flex items-start p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 group"
                                                                onClick={() => setOpenDropdown(null)}
                                                            >
                                                                <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${pathname === subItem.href
                                                                    ? 'bg-primary/20 text-primary'
                                                                    : 'bg-gray-100 text-gray-600 group-hover:bg-primary/20 group-hover:text-primary'
                                                                    }`}>
                                                                    {subItem.icon}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between">
                                                                        <span className={`font-medium transition-colors duration-200 ${pathname === subItem.href
                                                                            ? 'text-primary'
                                                                            : 'text-gray-800 group-hover:text-primary'
                                                                            }`}>
                                                                            {subItem.label}
                                                                        </span>
                                                                        <FaCaretRight className="w-3 h-3 text-gray-400 group-hover:text-primary transition-colors" />
                                                                    </div>
                                                                    <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600">
                                                                        {subItem.description}
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname === item.href
                                            ? 'text-primary bg-primary/10'
                                            : 'text-secondary/70 hover:text-primary hover:bg-primary/5'
                                            }`}
                                    >
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact & CTA - Hidden below xl */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        className="hidden xl:flex items-center space-x-4"
                    >
                        <div className="flex items-center space-x-3">
                            <Link href="/contact">
                                <motion.button
                                    className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaEnvelope className="w-4 h-4" />
                                    <span className="font-medium">Contact Us</span>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Mobile Menu Button - Shows below xl */}
                    <motion.button
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        className="xl:hidden p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMenuOpen ? (
                            <FaTimes className="w-6 h-6 text-primary" />
                        ) : (
                            <FaBars className="w-6 h-6 text-gray-700" />
                        )}
                    </motion.button>
                </nav>
            </div>

            {/* Mobile Menu - Dropdown from top */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed bg-black/50 backdrop-blur-sm xl:hidden"
                            style={{
                                top: isScrolled ? '80px' : '160px',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 30
                            }}
                            onClick={closeMenu}
                        />

                        {/* Menu Content - Slides down from top */}
                        <motion.div
                            initial={{ opacity: 0, maxHeight: 0 }}
                            animate={{ opacity: 1, maxHeight: '70vh' }}
                            exit={{ opacity: 0, maxHeight: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="absolute top-full left-0 right-0 bg-white backdrop-blur-lg shadow-2xl z-40 xl:hidden overflow-hidden flex flex-col border-t border-gray-200/50"
                        >
                            {/* Main Menu or Dropdown Content */}
                            {!mobileOpenDropdown ? (
                                /* Main Menu Items */
                                <div className="flex-grow overflow-y-auto max-h-[calc(70vh-120px)]">
                                    <ul className="divide-y divide-gray-100/30">
                                        {navItems.map((item, index) => (
                                            <motion.li
                                                key={item.href}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="border-b border-gray-100/30"
                                            >
                                                {item.hasDropdown ? (
                                                    <button
                                                        onClick={() => toggleMobileDropdown(item.label)}
                                                        className={`flex items-center justify-between w-full py-5 px-6 transition-all duration-300 group hover:bg-primary/5 ${pathname.startsWith(item.href)
                                                            ? 'text-primary bg-primary/10'
                                                            : 'hover:text-primary'
                                                            }`}
                                                    >
                                                        <span className="font-semibold text-gray-800">{item.label}</span>
                                                        <FaChevronDown
                                                            className="w-5 h-5 text-gray-500 group-hover:text-primary transform transition-all duration-300"
                                                        />
                                                    </button>
                                                ) : (
                                                    <Link
                                                        href={item.href}
                                                        onClick={closeMenu}
                                                        className={`flex items-center py-5 px-6 transition-all duration-300 group hover:bg-primary/5 ${pathname === item.href
                                                            ? 'text-primary bg-primary/10'
                                                            : 'hover:text-primary'
                                                            }`}
                                                    >
                                                        <span className="font-semibold text-gray-800">{item.label}</span>
                                                    </Link>
                                                )}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                /* Dropdown Content View */
                                <div className="flex flex-col h-full max-h-[calc(70vh-120px)]">
                                    {/* Back Button Header */}
                                    <div className="p-4 border-b border-gray-200 flex items-center bg-primary/5 shrink-0">
                                        <button
                                            className="flex items-center text-gray-600 hover:text-primary transition-colors duration-300"
                                            onClick={() => setMobileOpenDropdown(null)}
                                        >
                                            <svg
                                                className="w-5 h-5 mr-2 transition-transform duration-300 hover:-translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            <span className="font-medium">Back</span>
                                        </button>
                                        <span className="ml-2 font-semibold text-primary">
                                            {mobileOpenDropdown}
                                        </span>
                                    </div>

                                    {/* Dropdown Items */}
                                    <div className="flex-1 overflow-y-auto">
                                        <div className="p-4">
                                            <div className="space-y-2">
                                                {navItems
                                                    .find(item => item.label === mobileOpenDropdown)
                                                    ?.dropdownItems?.map((subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            onClick={closeMenu}
                                                            className={`flex items-start p-4 rounded-lg transition-all duration-300 border ${pathname === subItem.href
                                                                ? 'bg-primary/10 text-primary border-primary/20 shadow-sm'
                                                                : 'hover:bg-primary/5 text-gray-900 hover:text-primary border-gray-100 hover:border-primary/20'
                                                                }`}
                                                        >
                                                            <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${pathname === subItem.href
                                                                ? 'bg-primary/20 text-primary'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-primary/20 hover:text-primary'
                                                                }`}>
                                                                {subItem.icon}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="font-medium">
                                                                    {subItem.label}
                                                                    {pathname === subItem.href && (
                                                                        <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full"></span>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs text-gray-500 mt-1">{subItem.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Contact Section at Bottom */}
                            <div className="p-6 border-t border-gray-200/50 bg-primary/5 shrink-0">
                                <div className="space-y-3">
                                    <Link
                                        href="/contact"
                                        onClick={closeMenu}
                                        className="flex items-center p-3 bg-primary rounded-lg text-white hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20"
                                    >
                                        <div className="p-2 rounded-lg bg-white/20 mr-3">
                                            <FaEnvelope className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">Contact Us</div>
                                            <div className="text-sm font-medium">Get in touch</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
        .external-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }

        .external-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .external-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
          margin: 4px;
        }

        .external-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
          border: 2px solid #f1f1f1;
        }

        .external-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
        </header>
    );
}
