import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataStore';
import path from 'path';

export const maxDuration = 60; // Max allowed for Vercel hobby plan
export const dynamic = 'force-dynamic';

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
    let mongoProjects: Project[] = [];
    let jsonProjects: Project[] = [];
    let deletedIds: Set<string> = new Set();

    // 1. Try MongoDB
    try {
        mongoProjects = await readData<Project>('projects');
    } catch (mongoError) {
        console.warn('MongoDB unavailable for GET /api/projects:', (mongoError as Error).message);
    }

    // 2. Fetch list of deleted JSON-seeded project IDs from MongoDB
    try {
        const { getDb } = await import('@/lib/dataStore');
        const db = await getDb();
        const deleted = await db.collection('deleted_projects').find({}).toArray();
        deletedIds = new Set(deleted.map((d: any) => String(d.projectId)));
    } catch {
        // MongoDB not available — no deletions tracked, show all JSON projects
    }

    // 3. Always try reading from projects.json as well
    try {
        jsonProjects = await readFromJson();
    } catch (fsError) {
        console.warn('Failed to read projects.json:', fsError);
    }

    // 4. Merge results — filter out deleted JSON projects
    const allProjectsMap = new Map<string, Project>();

    // Add JSON projects first (base data), skipping deleted ones
    jsonProjects.forEach(p => {
        if (p.title && !deletedIds.has(String(p.id))) {
            allProjectsMap.set(p.title.toLowerCase().trim(), p);
        }
    });

    // Add MongoDB projects (overwrites JSON if titles match — fresher data)
    mongoProjects.forEach(p => {
        if (p.title) allProjectsMap.set(p.title.toLowerCase().trim(), p);
    });

    const combinedProjects = Array.from(allProjectsMap.values());

    // Sort by createdAt descending
    combinedProjects.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json(combinedProjects);
}

export async function POST(req: Request) {
    try {
        // Next.js body parser can be memory intensive for large payloads
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
            } catch (fsError) {
                // In Vercel, the filesystem is Read-Only.
                console.warn("Vercel Read-Only Filesystem prevented JSON update for Projects:", fsError);
            }

            // Return success anyway so frontend operates normally
            return NextResponse.json(newProject, { status: 201 });
        }
    } catch (error) {
        console.error('Failed to create project:', error);
        return NextResponse.json({ error: 'Failed to create project. Payload too large or invalid.' }, { status: 500 });
    }
}
