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
        console.error('Failed to fetch properties:', error);
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate required fields
        if (!body.title || !body.price || !body.address || !body.type) {
            return NextResponse.json(
                { error: 'Title, price, address, and type are required' },
                { status: 400 }
            );
        }

        // Validate numeric fields
        if (body.beds && isNaN(Number(body.beds))) {
            return NextResponse.json(
                { error: 'Beds must be a number' },
                { status: 400 }
            );
        }
        if (body.baths && isNaN(Number(body.baths))) {
            return NextResponse.json(
                { error: 'Baths must be a number' },
                { status: 400 }
            );
        }
        if (body.sqft && isNaN(Number(body.sqft))) {
            return NextResponse.json(
                { error: 'Square feet must be a number' },
                { status: 400 }
            );
        }

        const newProperty: Property = {
            ...body,
            beds: Number(body.beds) || 0,
            baths: Number(body.baths) || 0,
            sqft: Number(body.sqft) || 0,
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
