import { Building2, FolderKanban, MessageSquare } from "lucide-react";

async function getStats() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://sarvambuilders.com' : 'http://localhost:3000');

    try {
        const [propertiesRes, projectsRes, inquiriesRes] = await Promise.all([
            fetch(`${baseUrl}/api/properties`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/projects`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/contact`, { cache: 'no-store' }),
        ]);

        const properties = await propertiesRes.json();
        const projects = await projectsRes.json();
        const inquiries = await inquiriesRes.json();

        return {
            propertyCount: Array.isArray(properties) ? properties.length : 0,
            projectCount: Array.isArray(projects) ? projects.length : 0,
            inquiryCount: Array.isArray(inquiries) ? inquiries.length : 0,
        };
    } catch (error) {
        return { propertyCount: 0, projectCount: 0, inquiryCount: 0 };
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 dark:text-white">Dashboard Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <StatsCard
                    title="Total Properties"
                    value={stats.propertyCount}
                    icon={Building2}
                    color="text-blue-500 bg-blue-50"
                />
                <StatsCard
                    title="Active Projects"
                    value={stats.projectCount}
                    icon={FolderKanban}
                    color="text-purple-500 bg-purple-50"
                />
                <StatsCard
                    title="Inquiries"
                    value={stats.inquiryCount}
                    icon={MessageSquare}
                    color="text-green-500 bg-green-50"
                />
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="text-3xl font-bold mt-2 dark:text-white">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
