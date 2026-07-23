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
    // ── MongoDB is the single source of truth ──────────────────────────────
    // When MongoDB responds, use ONLY its data (so admin deletes take effect).
    // Only fall back to projects.json if MongoDB is completely unreachable.
    try {
        const mongoProjects = await readData<Project>('projects');
        mongoProjects.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return NextResponse.json(mongoProjects);
    } catch (mongoError) {
        console.warn('MongoDB unavailable, serving projects.json fallback:', (mongoError as Error).message);
    }

    // ── Emergency fallback: read from bundled projects.json ────────────────
    const jsonProjects = await readFromJson();
    jsonProjects.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(jsonProjects);
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
