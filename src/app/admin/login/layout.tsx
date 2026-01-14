import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Login | Sarvam - Construction Management Dashboard',
    description: 'Secure admin login portal for Sarvam Construction Management System. Access project management, client data, and business analytics.',
    keywords: ['admin login', 'construction management', 'sarvam admin', 'project dashboard', 'construction admin panel'],
    authors: [{ name: 'Sarvam' }],
    robots: {
        index: false, // Don't index admin pages
        follow: false,
    },
    openGraph: {
        title: 'Admin Login | Sarvam Construction',
        description: 'Secure admin access to Sarvam Construction Management System',
        type: 'website',
        locale: 'en_US',
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
