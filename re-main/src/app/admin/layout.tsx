"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutDashboard, Building2, FolderKanban, MessageSquare, LogOut, Menu, X, Users } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-zinc-950 overflow-hidden">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-zinc-900 rounded-lg shadow-lg"
            >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800
                transform transition-transform duration-200 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <div className="flex items-center gap-2 mb-8 px-2 pt-12 lg:pt-0">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <LayoutDashboard className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold dark:text-white">Admin Panel</span>
                    </div>

                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href="/admin"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 group"
                            >
                                <LayoutDashboard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/properties"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 group"
                            >
                                <Building2 className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Properties</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/projects"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 group"
                            >
                                <FolderKanban className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Projects</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/inquiries"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 group"
                            >
                                <MessageSquare className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Inquiries</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/users"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 group"
                            >
                                <Users className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Users</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="pt-8 mt-8 border-t border-gray-200 dark:border-zinc-800">
                        <Link
                            href="/"
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 group"
                        >
                            <LogOut className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ml-3">Back to Site</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
                {children}
            </main>
        </div>
    );
}
