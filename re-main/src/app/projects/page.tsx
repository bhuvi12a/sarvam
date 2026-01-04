import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { PageBanner } from "@/components/PageBanner";

export default function ProjectsPage() {
    const projects = [
        {
            id: 1,
            title: "Skyline Tower",
            location: "New York, NY",
            status: "Under Construction",
            image: "/listing_apartment_ny.png",
            description: "A 50-story luxury residential tower with panoramic city views."
        },
        {
            id: 2,
            title: "The Oasis",
            location: "Dubai, UAE",
            status: "Completed",
            image: "/listing_mansion_miami.png",
            description: "An exclusive community of waterfront villas."
        },
        {
            id: 3,
            title: "Green Valley Estate",
            location: "Austin, TX",
            status: "Selling Phase",
            image: "/listing_cottage_austin.png",
            description: "Sustainable living in the heart of nature."
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <PageBanner
                title="Exclusive Projects"
                subtitle="Discover our portfolio of world-class developments and upcoming communities."
                imageSrc="/projects_banner.png"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    {project.status}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{project.location}</p>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">{project.description}</p>

                                <button className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                                    View Project <ArrowUpRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
