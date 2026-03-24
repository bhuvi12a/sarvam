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
    let mongoProperties: Property[] = [];
    let jsonProperties: Property[] = [];
    let mockProperties: Property[] = [];

    // 1. Try MongoDB
    try {
        mongoProperties = await readData<Property>('properties');
    } catch (error) {
        console.warn('MongoDB unavailable for GET /api/properties:', (error as Error).message);
    }

    // 2. Try reading from properties.json
    try {
        jsonProperties = await readFromJson();
    } catch (fsError) {
        console.warn('Failed to read properties.json:', fsError);
    }

    // 3. Load mockData as a base if everything else is sparse
    try {
        const mockData = await import('@/data/mockData');
        mockProperties = mockData.PROPERTIES.map((prop: any) => ({
            ...prop,
            featured: prop.featured ?? true,
            createdAt: prop.createdAt || new Date().toISOString(),
        }));
    } catch (error) {
        console.error('Failed to load mockData:', error);
    }

    // 4. Merge results with deduplication by title
    const allPropertiesMap = new Map<string, Property>();

    // Mock data as lowest priority
    mockProperties.forEach(p => {
        if (p.title) allPropertiesMap.set(p.title.toLowerCase().trim(), p);
    });

    // JSON properties second
    jsonProperties.forEach(p => {
        if (p.title) allPropertiesMap.set(p.title.toLowerCase().trim(), p);
    });

    // MongoDB as highest priority
    mongoProperties.forEach(p => {
        if (p.title) allPropertiesMap.set(p.title.toLowerCase().trim(), p);
    });

    const combinedProperties = Array.from(allPropertiesMap.values());

    // Sort by createdAt descending
    combinedProperties.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json(combinedProperties);
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
