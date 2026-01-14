import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects Management | Sarvam Admin Dashboard',
    description: 'Manage construction projects, upload images, track progress, and update project details in the Sarvam admin panel.',
    keywords: ['project management', 'construction projects', 'admin dashboard', 'sarvam projects'],
    robots: {
        index: false,
        follow: false,
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
