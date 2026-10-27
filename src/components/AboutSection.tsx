"use client";

import { Shield, Star, Users, Briefcase, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const FEATURES = [
    {
        icon: Shield,
        title: "18+ Years of Trust",
        description: "Over 18 years of ethical leadership under Founder & CEO Anand Prabhu, delivering verified properties."
    },
    {
        icon: Star,
        title: "Premium Properties",
        description: "Access to exclusive DTCP-approved plots and luxury villas you won't find anywhere else."
    },
    {
        icon: Users,
        title: "Expert Advisory",
        description: "Personalized guidance from experienced consultants dedicated to finding your dream property."
    },
    {
        icon: Briefcase,
        title: "Seamless Process",
        description: "From site visit and bank loan sanction to registration and key handover, we handle everything."
    }
];

export function AboutSection() {
    return (
        <section id="about" className="py-24 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-2xl relative">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop")'
                                }}
                            />
                            {/* Founder & CEO Badge Tag */}
                            <div className="absolute top-6 left-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-zinc-200/50 dark:border-zinc-800 flex items-center gap-2.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide">
                                    Led by Founder & CEO Anand Prabhu
                                </span>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="absolute -bottom-8 -right-6 md:-bottom-10 md:-right-10 bg-black dark:bg-white p-7 md:p-8 rounded-2xl shadow-2xl">
                            <div className="flex items-center gap-2 mb-1">
                                <Award className="w-6 h-6 text-amber-400 dark:text-amber-600" />
                                <div className="text-4xl font-extrabold text-white dark:text-black">18+</div>
                            </div>
                            <div className="text-sm font-semibold text-gray-300 dark:text-gray-700">Years of Excellence</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Hosur & South India</div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4"
                        >
                            <Shield className="w-3.5 h-3.5" />
                            Sarvam Builders & Realtors
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
                        >
                            Building Generational Trust <span className="text-primary">Since 2006</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                        >
                            Founded by real estate pioneer <strong>Anand Prabhu</strong>, Sarvam Builders & Realtors has established an 18+ year benchmark of excellence in DTCP-approved layouts, low-budget plots, and custom luxury villas across Hosur.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            {FEATURES.map((feature, index) => (
                                <FeatureCard key={index} {...feature} index={index} />
                            ))}
                        </div>

                        {/* Founder / Vision Link Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center font-bold text-sm tracking-wider shrink-0 shadow-sm">
                                    AP
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Anand Prabhu</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Founder & CEO • 18+ Years Experience</p>
                                </div>
                            </div>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                            >
                                Vision, Mission & Founder Story
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (index * 0.1) }}
            className="flex flex-col gap-3"
        >
            <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
