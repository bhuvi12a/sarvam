import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataStore';

interface Project {
    id?: string;
    title: string;
    description: string;
    location: string;
    status: string;
    imageUrl: string;
    price?: string;
    featured: boolean;
    createdAt: string;
}

export async function GET() {
    try {
        let projects = await readData<Project>('projects');

        // Fallback to JSON file if MongoDB is empty
        if (!projects || projects.length === 0) {
            const fs = await import('fs/promises');
            const path = await import('path');
            const jsonPath = path.join(process.cwd(), 'data', 'projects.json');

            try {
                const jsonData = await fs.readFile(jsonPath, 'utf-8');
                projects = JSON.parse(jsonData);
            } catch (error) {
                console.error('Failed to read projects.json:', error);
            }
        }

        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const newProject: Project = {
            ...body,
            featured: body.featured || false,
            createdAt: new Date().toISOString(),
        };

        const saved = await writeData('projects', newProject);
        return NextResponse.json(saved, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
