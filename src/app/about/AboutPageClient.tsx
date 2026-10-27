"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
    Compass, 
    Target, 
    Shield, 
    Award, 
    CheckCircle2, 
    Users, 
    Building2, 
    Quote, 
    Phone, 
    ArrowRight, 
    HeartHandshake, 
    Check,
    Clock,
    Sparkles
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";

const CORE_VALUES = [
    {
        icon: Shield,
        title: "Absolute Integrity",
        description: "Zero hidden charges, crystal-clear documentation, and transparent dealings in every transaction."
    },
    {
        icon: Award,
        title: "Uncompromising Quality",
        description: "Grade-A construction materials, precision structural engineering, and elegant architectural design."
    },
    {
        icon: HeartHandshake,
        title: "Customer-First Philosophy",
        description: "We listen to your family's dreams and financial goals to provide tailored, honest real estate advisory."
    },
    {
        icon: Building2,
        title: "Generational Legacy",
        description: "Creating properties and communities built to appreciate in value and stand strong across generations."
    }
];

const TRACK_RECORD = [
    { number: "18+", label: "Years in the Field", sub: "Since 2006 in Hosur" },
    { number: "500+", label: "Plots & Villas Handed Over", sub: "100% On-Time Delivery" },
    { number: "1,000+", label: "Happy Families", sub: "Trusted Property Partner" },
    { number: "100%", label: "DTCP & Clear Titles", sub: "Zero Legal Ambiguity" }
];

export default function AboutPageClient() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
            {/* Banner */}
            <PageBanner
                title="About Sarvam Builders & Realtors"
                subtitle="18+ Years of Visionary Leadership, Ethical Real Estate, and Generational Homes in Hosur."
                imageSrc="/about_banner.png"
            />

            {/* Founder & CEO Spotlight Section */}
            <section id="ceo" className="py-20 md:py-28 bg-gradient-to-b from-white via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
                <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-4"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Leadership & Vision
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                        >
                            Meet Our Founder & CEO
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4"
                        >
                            The visionary mind behind Sarvam Builders & Realtors with over 18 years of pioneering excellence in South India’s real estate landscape.
                        </motion.p>
                    </div>

                    {/* CEO Profile Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Left Column: Executive Leadership Card (Without Photo) */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="relative mx-auto max-w-md lg:max-w-none">
                                {/* Decorative border frame */}
                                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-primary via-amber-500/20 to-primary/30 opacity-40 blur-xl" />
                                
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800 p-8 sm:p-10 text-white flex flex-col justify-between min-h-[460px]">
                                    {/* Background luxury gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black opacity-95" />
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                                    
                                    <div className="relative z-10">
                                        {/* Top Badge */}
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                                                <Award className="w-3.5 h-3.5 text-primary" />
                                                Executive Leadership
                                            </div>
                                            <span className="text-xs font-semibold text-zinc-400">Est. 2006</span>
                                        </div>

                                        {/* Monogram Seal */}
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-amber-600 to-zinc-900 p-0.5 shadow-xl mb-6 flex items-center justify-center">
                                            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center border border-primary/40">
                                                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-primary to-amber-400 tracking-wider">
                                                    AP
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                            Anand Prabhu
                                        </h3>
                                        <p className="text-primary font-semibold text-sm mt-1">
                                            Founder & Chief Executive Officer
                                        </p>
                                        <p className="text-xs text-zinc-400 mt-0.5">
                                            Sarvam Builders & Realtors
                                        </p>

                                        <div className="mt-8 pt-6 border-t border-zinc-800/80 grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-2xl font-black text-amber-300">18+</div>
                                                <div className="text-xs text-zinc-400 font-medium">Years in the Field</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-black text-amber-300">500+</div>
                                                <div className="text-xs text-zinc-400 font-medium">Delivered Plots & Homes</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-black text-amber-300">Hosur</div>
                                                <div className="text-xs text-zinc-400 font-medium">Tamil Nadu & South India</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-black text-amber-300">100%</div>
                                                <div className="text-xs text-zinc-400 font-medium">DTCP Verified Titles</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Guarantee Banner */}
                                    <div className="relative z-10 mt-8 pt-4 border-t border-zinc-800/80 flex items-center gap-3 text-xs text-zinc-300">
                                        <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>Committed to 100% Legal Transparency & Direct Advisory</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Bio, Leadership Story & Philosophy */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-7 flex flex-col justify-center"
                        >
                            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wide uppercase mb-2">
                                <Award className="w-4 h-4" />
                                18+ Years in the Field
                            </div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                Anand Prabhu
                                <span className="block text-lg sm:text-xl font-normal text-gray-500 dark:text-gray-400 mt-1">
                                    Founder & Chief Executive Officer
                                </span>
                            </h3>

                            <div className="space-y-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>
                                    With over <strong>18 years of specialized experience</strong> in land aggregation, DTCP master layout planning, and residential villa construction, <strong>Anand Prabhu</strong> founded <strong>Sarvam Builders & Realtors</strong> to bring true transparency, legal security, and uncompromising quality to homebuyers in Hosur and across South India.
                                </p>
                                <p>
                                    Under his visionary leadership, Sarvam has transitioned from a boutique real estate firm into one of Hosur&apos;s most trusted and sought-after property developers. His hands-on approach ensures that every project—from affordable DTCP plots to bespoke luxury gated villas—undergoes rigorous title verification and meets world-class construction standards.
                                </p>
                                <p>
                                    A staunch advocate for ethical real estate practices, Anand Prabhu has personally guided hundreds of working professionals, NRIs, and local families in making secure, high-yield land and home investments.
                                </p>
                            </div>

                            {/* Quote Box */}
                            <div className="my-8 p-6 sm:p-7 rounded-2xl bg-amber-500/5 dark:bg-zinc-900/60 border-l-4 border-primary dark:border-primary relative">
                                <Quote className="w-8 h-8 text-primary/40 mb-3" />
                                <p className="italic text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed font-medium">
                                    &ldquo;Real estate is not just about transactions and land; it is about building dreams, securing generations, and honoring lifetime savings with unwavering trust. For over 18 years, our foundation has stood on three pillars: absolute transparency, legal integrity, and unyielding quality.&rdquo;
                                </p>
                                <div className="mt-4 text-sm font-bold text-gray-900 dark:text-white">
                                    — Anand Prabhu, <span className="text-primary font-semibold">Founder & CEO</span>
                                </div>
                            </div>

                            {/* Key Leadership Highlights */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                {[
                                    "18+ Years of Field Mastery in Hosur",
                                    "100% DTCP / RERA Clear Titles",
                                    "Turn-Key 2BHK/3BHK Villa Construction",
                                    "Hassle-Free Bank Loan Assistance",
                                    "Direct Transparent Customer Advisory",
                                    "500+ Plots & Completed Homes"
                                ].map((highlight, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        <span>{highlight}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-all shadow-lg shadow-primary/20"
                                >
                                    <span>Schedule a Consultation</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="https://wa.me/919940066449?text=Hello%20Anand%20Prabhu%20Sir,%20I%20would%20like%20to%20know%20more%20about%20Sarvam%20properties%20in%20Hosur"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold transition-colors border border-zinc-200 dark:border-zinc-700"
                                >
                                    <Phone className="w-4 h-4 text-emerald-500" />
                                    <span>Direct WhatsApp / Call</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section id="vision-mission" className="py-20 md:py-28 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-4"
                        >
                            <Target className="w-3.5 h-3.5" />
                            Purpose & Aspiration
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                        >
                            Our Vision & Mission
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4"
                        >
                            The core philosophy, long-term aspirations, and relentless commitments that guide every plot we lay out and every villa we construct.
                        </motion.p>
                    </div>

                    {/* Dual Vision & Mission Showcase Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                                        <Compass className="w-8 h-8" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                                        Future Direction
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                                    Our Vision
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                                    To be South India’s most dependable, visionary, and customer-admired real estate developer and realtor—creating masterfully planned, eco-conscious residential townships and luxury villa communities where modern lifestyle, architectural elegance, and sustained generational capital appreciation unite.
                                </p>

                                <div className="space-y-4 pt-6 border-t border-zinc-200/70 dark:border-zinc-800">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Visionary Pillars
                                    </h4>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <strong className="text-sm font-semibold text-gray-900 dark:text-white">Sustainable Community Living:</strong>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Crafting eco-friendly gated layouts with green tree-lined parks, wide tar roads, and underground modern amenities.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <strong className="text-sm font-semibold text-gray-900 dark:text-white">Strategic Growth Corridors:</strong>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Developing in Hosur&apos;s fastest growing economic zones near Bangalore expressway and industrial hubs.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <strong className="text-sm font-semibold text-gray-900 dark:text-white">Accessible Luxury:</strong>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Bringing premium villa architecture and DTCP plots within honest, transparent financial reach.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mission Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-zinc-50 via-white to-blue-50/20 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Target className="w-8 h-8 text-primary" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 bg-zinc-200/60 dark:bg-zinc-800 px-3.5 py-1.5 rounded-full">
                                        Our Commitment
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                                    Our Mission
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                                    To redefine the property buying and building journey into a seamless, worry-free experience by delivering 100% legally clear DTCP/RERA properties, Grade-A construction craftsmanship, ethical advisory, and lifelong customer relationships that protect and multiply our clients&apos; investments.
                                </p>

                                <div className="space-y-4 pt-6 border-t border-zinc-200/70 dark:border-zinc-800">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Mission Commitments
                                    </h4>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-zinc-900/10 dark:bg-white/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <strong className="text-sm font-semibold text-gray-900 dark:text-white">100% Legal Certainty:</strong>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Guaranteed DTCP/RERA approvals, clear parent title deeds, and hassle-free bank approvals.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-zinc-900/10 dark:bg-white/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <strong className="text-sm font-semibold text-gray-900 dark:text-white">Unrivaled Build Quality:</strong>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Top-tier materials, vetted engineering practices, and multi-stage structural inspections.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-zinc-900/10 dark:bg-white/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <strong className="text-sm font-semibold text-gray-900 dark:text-white">End-to-End Client Handholding:</strong>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Guiding you from customized architectural plans and site visits to registration and possession.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-20 md:py-24 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200/60 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary text-xs font-bold uppercase tracking-wider">The Sarvam Standard</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                            Our Core Values
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm sm:text-base">
                            The non-negotiable principles that shape our relationship with every client, partner, and home we build.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CORE_VALUES.map((val, idx) => {
                            const Icon = val.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-primary/50 shadow-sm hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                        {val.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {val.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Track Record Numbers */}
            <section className="py-16 md:py-20 bg-zinc-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url("/premium_hero_bg.jpg")' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {TRACK_RECORD.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center p-4"
                            >
                                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-primary to-amber-400">
                                    {item.number}
                                </span>
                                <span className="text-base sm:text-lg font-bold text-white mt-2">
                                    {item.label}
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                    {item.sub}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call To Action Banner */}
            <section className="py-20 md:py-24 bg-white dark:bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl border border-zinc-700">
                        <div className="max-w-2xl relative z-10">
                            <span className="text-primary font-bold text-xs uppercase tracking-wider">
                                Direct Guidance from Anand Prabhu & Team
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-3 mb-6">
                                Start Your Property Journey with Complete Confidence
                            </h2>
                            <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
                                Whether you are looking for an affordable DTCP plot, planning to build your dream 2BHK/3BHK villa, or seeking high-growth land investments in Hosur, our team is ready to guide you at every step.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href="/contact"
                                    className="px-7 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-lg shadow-primary/30 inline-flex items-center gap-2"
                                >
                                    <span>Schedule a Site Visit</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/projects"
                                    className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-sm transition-colors border border-white/20"
                                >
                                    Explore Projects
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
