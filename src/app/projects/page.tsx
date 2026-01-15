"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { Loader2 } from "lucide-react";

interface Project {
    id: number;
    title: string;
    description: string;
    location: string;
    status: string;
    imageUrl: string;
    price?: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch("/api/projects");
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <PageBanner
                title="Our Projects"
                subtitle="Discover our latest residential and commercial developments."
                imageSrc="/projects_banner.png"
            />

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {projects.map((project, index) => (
                                <div key={project.id} className="group relative overflow-hidden rounded-3xl shadow-lg border border-zinc-100">
                                    <div className="aspect-video relative overflow-hidden">
                                        <Image
                                            src={project.imageUrl || "/projects_banner.png"}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full">
                                            <span className="text-sm font-semibold text-primary">{project.status}</span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                                                {project.price && (
                                                    <p className="text-xl font-bold text-primary mt-2">
                                                        Starting from {project.price}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{project.location}</span>
                                        </div>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <button className="text-primary font-semibold hover:text-secondary transition-colors group-hover:underline underline-offset-4 decoration-2">
                                            View Project Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    No projects found yet.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
