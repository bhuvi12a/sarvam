"use client";

import { motion } from "framer-motion";

export function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-zinc-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-zinc-800 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zinc-800/30 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Ready to Find Your <br /> <span className="text-zinc-500">Dream Home?</span>
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8 max-w-md">
                                Let's start a conversation. Our agents are ready to help you navigate the market with confidence.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-zinc-800/50 border border-zinc-700 text-white px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-zinc-600 w-full sm:w-auto min-w-[300px]"
                                />
                                <button className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-zinc-200 transition-colors">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden hidden lg:block">
                            <div
                                className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700 ease-out"
                                style={{
                                    backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop")'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
