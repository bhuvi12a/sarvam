import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-zinc-50 dark:bg-zinc-950 pt-16 pb-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col items-start gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-primary p-2 rounded-lg">
                                <Home className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl text-secondary dark:text-white">
                                Sarvam Builders & Realtors
                            </span>
                        </Link>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">
                            Redefining luxury living. We help you find properties that match your lifestyle and aspirations.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon icon={Facebook} />
                            <SocialIcon icon={Twitter} />
                            <SocialIcon icon={Instagram} />
                            <SocialIcon icon={Linkedin} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/">Home</FooterLink>
                            <FooterLink href="#listings">Properties</FooterLink>
                            <FooterLink href="#about">About Us</FooterLink>
                            <FooterLink href="#services">Services</FooterLink>
                            <FooterLink href="#contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Properties */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Property Types</h3>
                        <ul className="space-y-3">
                            <FooterLink href="#">Luxury Villas</FooterLink>
                            <FooterLink href="#">Modern Apartments</FooterLink>
                            <FooterLink href="#">PentHouses</FooterLink>
                            <FooterLink href="#">Seaside Condos</FooterLink>
                            <FooterLink href="#">Commercial</FooterLink>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-zinc-500 dark:text-zinc-400 text-sm">
                                <MapPin className="h-5 w-5 shrink-0" />
                                <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-sm">
                                <Phone className="h-5 w-5 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                        </ul>
                        <div className="flex items-center gap-3 text-secondary/80 dark:text-gray-400 mt-4">
                            <Mail className="h-5 w-5 text-primary" />
                            <span>hello@sarvambuilders.com</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center text-sm text-secondary/60 dark:text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} Sarvam Builders & Realtors. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
            <Icon className="h-5 w-5" />
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                {children}
            </Link>
        </li>
    );
}
