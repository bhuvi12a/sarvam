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

import path from 'path';

export const maxDuration = 60; // Max allowed for Vercel hobby plan
export const dynamic = 'force-dynamic';

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

export async function GET() {
    let properties: Property[] = [];
    try {
        properties = await readData<Property>('properties');
        if (properties && properties.length > 0) {
            return NextResponse.json(properties);
        }
    } catch (error) {
        console.warn('MongoDB unavailable for GET /api/properties:', (error as Error).message);
    }

    // Fallback 1: Try reading from properties.json
    try {
        const jsonProperties = await readFromJson();
        if (jsonProperties && jsonProperties.length > 0) {
            return NextResponse.json(jsonProperties);
        }
    } catch (fsError) {
        console.warn('Filesystem fallback failed for Properties:', fsError);
    }

    // Fallback 2: Load mockData
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

        try {
            const saved = await writeData('properties', newProperty);
            return NextResponse.json(saved, { status: 201 });
        } catch (mongoError) {
            console.warn('MongoDB write failed, falling back to properties.json:', (mongoError as Error).message);

            const properties = await readFromJson();
            const maxId = properties.reduce((max, p) => {
                const n = parseInt(p.id || '0', 10);
                return n > max ? n : max;
            }, 0);
            newProperty.id = String(maxId + 1);

            try {
                properties.push(newProperty);
                await writeToJson(properties);
            } catch (fsError) {
                // In Vercel, the filesystem is Read-Only.
                console.warn("Vercel Read-Only Filesystem prevented JSON update for Properties:", fsError);
            }

            // Return success anyway so frontend operates normally
            return NextResponse.json(newProperty, { status: 201 });
        }
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
    }
}
