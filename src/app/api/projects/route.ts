import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataStore';
import path from 'path';

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

// Helper: read from local projects.json (fallback only)
async function readFromJson(): Promise<Project[]> {
    try {
        const fs = await import('fs/promises');
        const jsonPath = path.join(process.cwd(), 'data', 'projects.json');
        const jsonData = await fs.readFile(jsonPath, 'utf-8');
        return JSON.parse(jsonData);
    } catch {
        return [];
    }
}

// Helper: write to local projects.json (fallback only)
async function writeToJson(projects: Project[]): Promise<void> {
    const fs = await import('fs/promises');
    const jsonPath = path.join(process.cwd(), 'data', 'projects.json');
    await fs.writeFile(jsonPath, JSON.stringify(projects, null, 4), 'utf-8');
}

export async function GET() {
    // Try MongoDB first
    try {
        const projects = await readData<Project>('projects');
        if (projects && projects.length > 0) {
            return NextResponse.json(projects);
        }
    } catch (mongoError) {
        console.warn('MongoDB unavailable for GET /api/projects:', (mongoError as Error).message);
    }

    // Fallback: serve from projects.json
    const projects = await readFromJson();
    return NextResponse.json(projects);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.title || !body.location) {
            return NextResponse.json(
                { error: 'Title and location are required' },
                { status: 400 }
            );
        }

        const newProject: Project = {
            ...body,
            featured: body.featured ?? false,
            createdAt: new Date().toISOString(),
        };

        // Try MongoDB first
        try {
            const saved = await writeData('projects', newProject);
            return NextResponse.json(saved, { status: 201 });
        } catch (mongoError) {
            console.warn('MongoDB write failed, falling back to projects.json:', (mongoError as Error).message);

            // Fallback: write to projects.json (works locally, not on Vercel)
            const projects = await readFromJson();

            const maxId = projects.reduce((max, p) => {
                const n = parseInt(p.id || '0', 10);
                return n > max ? n : max;
            }, 0);

            newProject.id = String(maxId + 1);

            try {
                projects.push(newProject);
                await writeToJson(projects);
                return NextResponse.json(newProject, { status: 201 });
            } catch (fsError) {
                // Both MongoDB and filesystem failed — this is a Vercel deployment
                // without MONGODB_URI set in environment variables
                console.error('❌ Both MongoDB and filesystem failed:', fsError);
                return NextResponse.json(
                    {
                        error: 'Database not configured. Please set MONGODB_URI in your Vercel environment variables.',
                        hint: 'Go to Vercel Dashboard → Your Project → Settings → Environment Variables → Add MONGODB_URI'
                    },
                    { status: 503 }
                );
            }
        }
    } catch (error) {
        console.error('Failed to create project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
