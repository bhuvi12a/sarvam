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

export async function GET() {
    try {
        const properties = await readData<Property>('properties');
        return NextResponse.json(properties);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }
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
