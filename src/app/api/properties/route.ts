import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataStore';

interface Property {
    id?: string;
    title: string;
    description?: string;
    price: string;
    address: string;
    beds: number;
    baths: number;
    sqft: number;
    imageUrl: string;
    type: string;
    category?: string;
    featured: boolean;
    createdAt: string;
}

export const maxDuration = 60; // Max allowed for Vercel hobby plan
export const dynamic = 'force-dynamic';
export async function GET() {
    let properties: Property[] = [];
    try {
        properties = await readData<Property>('properties');
    } catch (error) {
        console.warn('MongoDB unavailable for GET /api/properties:', (error as Error).message);
    }

    // Fallback to mockData if MongoDB is empty or unavailable
    if (!properties || properties.length === 0) {
        try {
            const mockData = await import('@/data/mockData');
            properties = mockData.PROPERTIES.map((prop: any) => ({
                ...prop,
                featured: true,
                createdAt: new Date().toISOString(),
            }));
        } catch (error) {
            console.error('Failed to load mockData:', error);
        }
    }

    return NextResponse.json(properties);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const newProperty: Property = {
            ...body,
            beds: Number(body.beds),
            baths: Number(body.baths),
            sqft: Number(body.sqft),
            featured: body.featured || false,
            createdAt: new Date().toISOString(),
        };

        const saved = await writeData('properties', newProperty);
        return NextResponse.json(saved, { status: 201 });
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
    }
}
