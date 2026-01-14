"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    location: string;
    status: string;
    imageUrl: string;
    featured: boolean;
    createdAt: string;
}

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/projects");
            if (!response.ok) throw new Error("Failed to fetch projects");
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            setError("Failed to load projects");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete project");

            setProjects(projects.filter((p) => p.id !== id));
        } catch (err) {
            alert("Failed to delete project");
            console.error(err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">
                    Projects Management
                </h1>
                <button
                    onClick={() => (window.location.href = "/admin/projects/new")}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                    <Plus className="h-5 w-5" />
                    Add Project
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {projects.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800">
                        <p className="text-gray-500 dark:text-gray-400">
                            No projects found. Create your first project!
                        </p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold dark:text-white">
                                            {project.title}
                                        </h3>
                                        {project.featured && (
                                            <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded">
                                                Featured
                                            </span>
                                        )}
                                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        {project.description}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        📍 {project.location}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
                                        Created: {new Date(project.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() =>
                                            (window.location.href = `/admin/projects/${project.id}/edit`)
                                        }
                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                        title="Edit"
                                    >
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => deleteProject(project.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
