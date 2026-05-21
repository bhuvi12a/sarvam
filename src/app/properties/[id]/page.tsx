import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPropertyById, getAllProperties } from '@/lib/dataStore';
import { Bed, Bath, Maximize, MapPin, Phone, MessageSquare, ArrowLeft, Share2, Heart } from 'lucide-react';
import Link from 'next/link';
import { WhatsAppButton } from '@/components/WhatsAppButton';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const property = await getPropertyById(id);
    if (!property) return { title: 'Contact Our Expert - Low Budget Plots in Hosur' };

    return {
        title: `${property.title} in ${property.address}`,
        description: property.description,
        openGraph: {
            title: property.title,
            description: property.description,
            images: [{ url: property.imageUrl }],
        },
    };
}

export async function generateStaticParams() {
    const properties = await getAllProperties();
    return properties.map((p: any) => ({
        id: p.id.toString(),
    }));
}

export default async function PropertyDetailPage({ params }: Props) {
    const { id } = await params;
    const property = await getPropertyById(id);

    if (!property) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-accent to-white flex items-center justify-center py-20 px-4">
                <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-2xl text-center space-y-6 flex flex-col justify-center">
                    <div className="inline-flex p-4 bg-primary/10 rounded-full text-primary animate-pulse mx-auto">
                        <Phone className="h-10 w-10" />
                    </div>
                    
                    <h1 className="text-2xl sm:text-3xl font-bold text-secondary">
                        Unlock Exclusive Plots in Hosur
                    </h1>
                    
                    <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
                        Our high-demand <strong className="text-primary font-semibold">Low Budget Plots in Hosur</strong> sell out rapidly! 
                        Although this specific listing is currently reserved, our expert team has several matching premium and budget-friendly plots available right now.
                    </p>

                    <div className="bg-accent/50 rounded-2xl p-6 border border-border/60 text-left space-y-3">
                        <h3 className="font-semibold text-secondary flex items-center gap-2">
                            <span>🌟 Expert Support Benefits:</span>
                        </h3>
                        <ul className="text-sm text-zinc-600 space-y-2">
                            <li className="flex items-center gap-2">
                                <span className="text-primary font-bold">✓</span> Free Site Visit with pickup &amp; drop
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-primary font-bold">✓</span> Clear title deeds &amp; immediate DTCP/HNTDA approvals
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-primary font-bold">✓</span> Customized EMI &amp; low-budget pricing options
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a
                            href="tel:+919940066449"
                            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-0.5 text-center"
                        >
                            <Phone className="h-5 w-5" />
                            <span>Call Expert</span>
                        </a>
                        <a
                            href="https://wa.me/919940066449?text=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20Low%20Budget%20Plots%20in%20Hosur.%20Please%20share%20details."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 transform hover:-translate-y-0.5 text-center"
                        >
                            <MessageSquare className="h-5 w-5" />
                            <span>WhatsApp Expert</span>
                        </a>
                    </div>

                    <div className="pt-4">
                        <Link 
                            href="/"
                            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Return to Homepage</span>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        'name': property.title,
        'description': property.description,
        'image': property.imageUrl,
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': property.address,
            'addressCountry': 'IN'
        },
        'offers': {
            '@type': 'Offer',
            'price': property.price,
            'priceCurrency': 'INR'
        }
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
                    <Link href="/properties" className="flex items-center text-gray-600 hover:text-primary transition-colors gap-2 font-medium">
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Listings</span>
                    </Link>
                    <div className="flex gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Share2 className="h-5 w-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Heart className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Media & Description */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Main Image */}
                        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={property.imageUrl}
                                alt={property.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                    {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                                </span>
                            </div>
                        </div>

                        {/* Title & Stats */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                {property.title}
                            </h1>
                            <div className="flex items-center text-gray-500 text-lg mb-8">
                                <MapPin className="h-5 w-5 mr-2 text-primary" />
                                <span>{property.address}</span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 py-8 border-y border-gray-100">
                                <div className="flex flex-col items-center gap-2">
                                    <Bed className="h-6 w-6 text-gray-400" />
                                    <span className="font-bold text-gray-900">{property.beds}</span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider">Bedrooms</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 border-x border-gray-100">
                                    <Bath className="h-6 w-6 text-gray-400" />
                                    <span className="font-bold text-gray-900">{property.baths}</span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider">Bathrooms</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Maximize className="h-6 w-6 text-gray-400" />
                                    <span className="font-bold text-gray-900">{property.sqft.toLocaleString()}</span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider">Sq. Ft.</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Property</h2>
                            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                {property.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Contact & Price */}
                    <div className="space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
                                <div className="mb-6">
                                    <span className="text-gray-500 text-sm block mb-1">Price</span>
                                    <div className="text-4xl font-bold text-primary">{property.price}</div>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href={`tel:+919940066449`}
                                        className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors"
                                    >
                                        <Phone className="h-5 w-5" />
                                        Call Agent
                                    </a>
                                    <WhatsAppButton 
                                        phoneNumber="+919940066449" 
                                        message={`Hi, I'm interested in the property: ${property.title} (${property.address})`}
                                    />
                                    <button className="w-full flex items-center justify-center gap-3 border border-gray-200 py-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                        <MessageSquare className="h-5 w-5" />
                                        Request Info
                                    </button>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                                <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                                    <span>Sarvam Verified</span>
                                </h3>
                                <p className="text-sm text-gray-600">
                                    This property has been manually verified by our team for documentation and accuracy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
