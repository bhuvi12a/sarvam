import { NextResponse } from 'next/server';
import { findById, updateData, deleteData } from '@/lib/dataStore';

interface Property {
    id: string;
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

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const property = await findById<Property>('properties', params.id);

        if (!property) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json(property);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();

        const updateFields = {
            ...body,
            beds: body.beds ? Number(body.beds) : undefined,
            baths: body.baths ? Number(body.baths) : undefined,
            sqft: body.sqft ? Number(body.sqft) : undefined,
        };

        const success = await updateData('properties', params.id, updateFields);

        if (!success) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        const updated = await findById<Property>('properties', params.id);
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const success = await deleteData('properties', params.id);

        if (!success) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Property deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
