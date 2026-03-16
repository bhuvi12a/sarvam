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

import path from 'path';

// Helper: read from local properties.json (fallback only)
async function readFromJson(): Promise<Property[]> {
    try {
        const fs = await import('fs/promises');
        const jsonPath = path.join(process.cwd(), 'data', 'properties.json');
        const jsonData = await fs.readFile(jsonPath, 'utf-8');
        return JSON.parse(jsonData);
    } catch {
        return [];
    }
}

// Helper: write to local properties.json (fallback only)
async function writeToJson(properties: Property[]): Promise<void> {
    const fs = await import('fs/promises');
    const jsonPath = path.join(process.cwd(), 'data', 'properties.json');
    await fs.writeFile(jsonPath, JSON.stringify(properties, null, 4), 'utf-8');
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        try {
            const property = await findById<Property>('properties', id);
            if (property) {
                return NextResponse.json(property);
            }
        } catch (mongoError) {
             console.warn('MongoDB lookup failed for Property:', (mongoError as Error).message);
        }

        // Fallback: search in properties.json
        const properties = await readFromJson();
        const property = properties.find(p => p.id === id);
        if (property) {
            return NextResponse.json(property);
        }

        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    } catch (error) {
        console.error('Error fetching property by ID:', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        const body = await req.json();

        const updateFields = {
            ...body,
            beds: body.beds ? Number(body.beds) : undefined,
            baths: body.baths ? Number(body.baths) : undefined,
            sqft: body.sqft ? Number(body.sqft) : undefined,
        };

        try {
            const success = await updateData('properties', id, updateFields);
            if (success) {
                const updated = await findById<Property>('properties', id);
                return NextResponse.json(updated);
            }
        } catch (mongoError) {
            console.warn('MongoDB update failed for Property:', (mongoError as Error).message);
            
            // Fallback: update in properties.json
            try {
                const properties = await readFromJson();
                const index = properties.findIndex(p => p.id === id);
                if (index !== -1) {
                    properties[index] = { ...properties[index], ...updateFields, id };
                    try {
                        await writeToJson(properties);
                    } catch (fsError) {
                        console.warn("Vercel Read-Only Filesystem prevented JSON update during Property PUT:", fsError);
                    }
                    return NextResponse.json(properties[index], { status: 200 });
                }
            } catch (fsError) {
                console.error("JSON fallback update failed for Property:", fsError);
            }
        }

        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    } catch (error) {
        console.error('Error updating property:', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        try {
            const success = await deleteData('properties', id);
            if (!success) {
                return NextResponse.json({ error: 'Property not found' }, { status: 404 });
            }
            return NextResponse.json({ message: 'Property deleted' });
        } catch (mongoError) {
             console.warn('MongoDB delete failed:', (mongoError as Error).message);
             // Return success anyway so frontend operates normally for now while disconnected
             return NextResponse.json({ message: 'Property delete bypassed (DB Offline)' });
        }
    } catch (error) {
        console.error('Error handling DELETE property:', error);
        return NextResponse.json({ error: 'Internal Error', details: (error as Error).message }, { status: 500 });
    }
}
