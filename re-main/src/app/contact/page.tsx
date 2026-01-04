import { ContactSection } from "@/components/ContactSection";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white pt-24">
            <div className="bg-zinc-800 text-white py-16 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
                    We are here to assist you with all your real estate needs.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
                    <div className="flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl">
                        <div className="h-14 w-14 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mb-6">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Visit Us</h3>
                        <p className="text-gray-500 dark:text-gray-400">123 Luxury Lane<br />Beverly Hills, CA 90210</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl">
                        <div className="h-14 w-14 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mb-6">
                            <Mail className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                        <p className="text-gray-500 dark:text-gray-400">hello@sarvambuilders.com<br />support@sarvambuilders.com</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl">
                        <div className="h-14 w-14 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mb-6">
                            <Phone className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
                        <p className="text-gray-500 dark:text-gray-400">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                    </div>
                </div>

                <ContactSection />
            </div>
        </main>
    );
}
