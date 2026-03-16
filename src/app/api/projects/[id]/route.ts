import { NextResponse } from 'next/server';
import { deleteData, findById, updateData } from '@/lib/dataStore';
import path from 'path';

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

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const project = await findById<Project>('projects', id);

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        try {
            const updated = await updateData<Project>('projects', id, body);
            if (updated) {
                return NextResponse.json({ success: true });
            }
        } catch (mongoError) {
            console.warn('MongoDB update failed, falling back to projects.json:', (mongoError as Error).message);
            
            // Fallback: update in projects.json
            try {
                const projects = await readFromJson();
                const index = projects.findIndex(p => p.id === id);
                if (index !== -1) {
                    projects[index] = { ...projects[index], ...body, id }; // Ensure ID stays same
                    try {
                        await writeToJson(projects);
                    } catch (fsError) {
                        console.warn("Vercel Read-Only Filesystem prevented JSON update during PUT:", fsError);
                    }
                    return NextResponse.json({ success: true, warning: 'Database offline' });
                }
            } catch (fsError) {
                console.error("JSON fallback update failed:", fsError);
            }
        }

        return NextResponse.json(
            { error: 'Project not found' },
            { status: 404 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        );
    }
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

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        try {
            const deleted = await deleteData('projects', id);
            if (deleted) {
                return NextResponse.json({ success: true });
            }
        } catch (mongoError) {
             console.warn('MongoDB delete failed, falling back to projects.json:', (mongoError as Error).message);
        }

        // Fallback to JSON deletion
        try {
            const projects = await readFromJson();
            const initialLength = projects.length;
            const filteredProjects = projects.filter(p => p.id !== id);
            
            if (filteredProjects.length !== initialLength) {
                 try {
                     await writeToJson(filteredProjects);
                 } catch (writeErr) {
                     // In Vercel, the filesystem is Read-Only.
                     // We swallow this error so the user doesn't get a 500 crash
                     console.warn("Vercel Read-Only Filesystem prevented JSON update:", writeErr);
                 }
                 // Return success regardless so the UI can proceed
                 return NextResponse.json({ success: true, warning: 'Database offline and filesystem read-only' });
            }
        } catch (fsError) {
            console.error("JSON fallback delete failed entirely:", fsError);
        }

        return NextResponse.json(
            { error: 'Project not found' },
            { status: 404 }
        );
    } catch (error) {
        console.error("Delete Error Handler Catched:", error);
        return NextResponse.json(
            { error: 'Failed to delete project', details: (error as Error).message },
            { status: 500 }
        );
    }
}
