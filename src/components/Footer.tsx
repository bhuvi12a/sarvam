import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Building2, TreePine, Building } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-zinc-50 dark:bg-zinc-950 pt-16 pb-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col items-start gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src="/logo.png"
                                alt="Sarvam Builders & Realtors"
                                className="h-20 md:h-24 w-auto"
                            />
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
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/">Home</FooterLink>
                            <FooterLink href="/projects">Projects</FooterLink>
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/services">Services</FooterLink>
                            <FooterLink href="/contact">Contact Us</FooterLink>
                        </ul>
                    </div>

                    {/* Properties */}
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-6">Property Types</h3>
                        <ul className="space-y-3">
                            <PropertyTypeLink icon={Building2} href="#" title="Plots" description="Browse Plots" />
                            <PropertyTypeLink icon={Home} href="#" title="Villas" description="Browse Villas" />
                            <PropertyTypeLink icon={TreePine} href="#" title="Farmland" description="Browse Farmland" />
                            <PropertyTypeLink icon={Building} href="#" title="Apartments" description="Browse Apartments" />
                            <PropertyTypeLink icon={Building2} href="#" title="Commercials" description="Browse Commercials" />
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-zinc-500 dark:text-zinc-400 text-sm">
                                <MapPin className="h-5 w-5 shrink-0" />
                                <span>Pattalamman Nagar, Rayakottai Road Hosur TamilNadu 635109</span>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-sm">
                                <Phone className="h-5 w-5 shrink-0" />
                                <div>
                                    <div>+91 9940066449 <span className="text-green-600 text-xs">(WhatsApp)</span></div>
                                </div>
                            </li>
                        </ul>
                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 mt-4">
                            <Mail className="h-5 w-5 text-primary" />
                            <span>info@sarvambuilders.com</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center text-sm text-zinc-500 dark:text-zinc-400">
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

function PropertyTypeLink({ icon: Icon, href, title, description }: { icon: any; href: string; title: string; description: string }) {
    return (
        <li>
            <Link href={href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 transition-colors">
                    <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">{title}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
                </div>
            </Link>
        </li>
    );
}

