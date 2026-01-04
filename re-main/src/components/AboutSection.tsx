"use client";

import { Shield, Star, Users, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
    {
        icon: Shield,
        title: "Trusted by Thousands",
        description: "A decade of experience in providing top-tier real estate services."
    },
    {
        icon: Star,
        title: "Premium Properties",
        description: "Access to exclusive listings you won't find anywhere else."
    },
    {
        icon: Users,
        title: "Expert Agents",
        description: "Our team of professionals is dedicated to finding your dream home."
    },
    {
        icon: Briefcase,
        title: "Seamless Process",
        description: "From viewing to closing, we handle every detail with care."
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
                        <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop")'
                                }}
                            />
                        </div>
                        {/* Stats Card */}
                        <div className="absolute -bottom-10 -right-10 bg-black dark:bg-white p-8 rounded-2xl shadow-xl hidden md:block">
                            <div className="text-4xl font-bold text-white dark:text-black mb-2">10+</div>
                            <div className="text-gray-400 dark:text-gray-600">Years of Excellence</div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
                        >
                            Why Choose <span className="text-gray-400">Us?</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-500 dark:text-gray-400 mb-12"
                        >
                            We go beyond traditional real estate services to provide a personalized experience that matches your unique lifestyle.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {FEATURES.map((feature, index) => (
                                <FeatureCard key={index} {...feature} index={index} />
                            ))}
                        </div>
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
