import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataStore';

interface Project {
    id?: string;
    title: string;
    description: string;
    location: string;
    status: string;
    imageUrl: string;
    featured: boolean;
    createdAt: string;
}

export async function GET() {
    try {
        const projects = await readData<Project>('projects');
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate required fields
        if (!body.title || !body.description || !body.location || !body.status) {
            return NextResponse.json(
                { error: 'Title, description, location, and status are required' },
                { status: 400 }
            );
        }

        const newProject: Project = {
            ...body,
            featured: body.featured || false,
            createdAt: new Date().toISOString(),
        };

        const saved = await writeData('projects', newProject);
        return NextResponse.json(saved, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
