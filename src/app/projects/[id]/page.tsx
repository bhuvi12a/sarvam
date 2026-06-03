import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectById, getAllProjects } from '@/lib/dataStore';
import { MapPin, Phone, MessageSquare, ArrowLeft, Share2, Heart, CheckCircle2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { WhatsAppButton } from '@/components/WhatsAppButton';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = await getProjectById(id);
    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title} - Real Estate Project in ${project.location}`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [{ url: project.imageUrl || '/projects_banner.png' }],
        },
        alternates: {
            canonical: `/projects/${id}`,
        },
    };
}

export async function generateStaticParams() {
    const projects = await getAllProjects();
    return projects.map((p: any) => ({
        id: p.id.toString(),
    }));
}

export default async function ProjectDetailPage({ params }: Props) {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        'name': project.title,
        'description': project.description,
        'image': project.imageUrl,
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': project.location,
            'addressCountry': 'IN'
        },
        'status': project.status
    };

    return (
        <main className="min-h-screen bg-white pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Navigation Bar / Back Button */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/projects" className="flex items-center text-gray-600 hover:text-primary transition-colors gap-2 font-medium">
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Projects</span>
                    </Link>
                    <div className="flex gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Share2 className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Media & Description */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Main Image */}
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <Image
                                src={project.imageUrl || '/projects_banner.png'}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute top-8 left-8">
                                <span className="bg-white/90 backdrop-blur-md text-primary px-6 py-2 rounded-full text-sm font-bold shadow-xl border border-primary/10">
                                    {project.status}
                                </span>
                            </div>
                        </div>

                        {/* Title & Stats */}
                        <div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-lg mb-8">
                                <div className="flex items-center">
                                    <MapPin className="h-6 w-6 mr-2 text-primary" />
                                    <span>{project.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-6 w-6 mr-2 text-primary" />
                                    <span>Launched {new Date(project.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 py-8 border-y border-gray-100">
                                <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-2xl font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>RERA Approved</span>
                                </div>
                                <div className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-2xl font-semibold">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span>Bank Finance Available</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                            <p className="text-xl leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Contact & Price */}
                    <div className="space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-zinc-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-zinc-900/20">
                                {project.price && (
                                    <div className="mb-8">
                                        <span className="text-zinc-400 text-sm block mb-1 uppercase tracking-widest">Investment Starting From</span>
                                        <div className="text-4xl font-bold text-white">{project.price}</div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <a
                                        href={`tel:+919940066449`}
                                        className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-colors"
                                    >
                                        <Phone className="h-5 w-5" />
                                        Call for Details
                                    </a>
                                    <WhatsAppButton 
                                        phoneNumber="+919940066449" 
                                        message={`Hi, I'm interested in the project: ${project.title} located at ${project.location}. Please share more details.`}
                                    />
                                    <button className="w-full flex items-center justify-center gap-3 border border-zinc-700 py-4 rounded-2xl font-bold text-zinc-300 hover:bg-zinc-800 transition-colors">
                                        <MessageSquare className="h-5 w-5" />
                                        Request Brochure
                                    </button>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4 text-xl">Project Location</h3>
                                <div className="flex items-center gap-3 text-gray-600 mb-4">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{project.location}</span>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Located in one of the most promising areas of {project.location}, this project offers great connectivity and future appreciation potential.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
