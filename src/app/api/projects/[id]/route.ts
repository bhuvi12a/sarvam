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
        
        // 1. Try MongoDB
        try {
            const project = await findById<Project>('projects', id);
            if (project) {
                return NextResponse.json(project);
            }
        } catch (mongoError) {
            console.warn('MongoDB lookup failed for individual project:', mongoError);
        }

        // 2. Fallback to JSON
        const projects = await readFromJson();
        const project = projects.find(p => p.id === id);

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

        // 1. Try MongoDB delete (handles both ObjectId and plain string id)
        try {
            const deleted = await deleteData('projects', id);
            if (deleted) {
                return NextResponse.json({ success: true });
            }
        } catch (mongoError) {
            console.warn('MongoDB delete failed, falling back to projects.json:', (mongoError as Error).message);
        }

        // 2. Fallback: delete from local projects.json
        try {
            const projects = await readFromJson();
            const initialLength = projects.length;
            // Match by id field OR by stringified _id
            const filteredProjects = projects.filter(
                (p: any) => String(p.id) !== String(id) && String(p._id) !== String(id)
            );

            if (filteredProjects.length !== initialLength) {
                // 3. Try writing the updated JSON file (works locally, not on Vercel)
                let jsonWritten = false;
                try {
                    await writeToJson(filteredProjects);
                    jsonWritten = true;
                } catch (writeErr) {
                    console.warn('Vercel Read-Only Filesystem — storing deletion in MongoDB instead:', writeErr);
                }

                // 4. If filesystem write failed, record deletion in MongoDB as a tombstone
                if (!jsonWritten) {
                    try {
                        const { getDb } = await import('@/lib/dataStore');
                        const db = await getDb();
                        await db.collection('deleted_projects').updateOne(
                            { projectId: String(id) },
                            { $set: { projectId: String(id), deletedAt: new Date() } },
                            { upsert: true }
                        );
                    } catch (tombstoneErr) {
                        console.error('Failed to record deletion tombstone:', tombstoneErr);
                    }
                }

                return NextResponse.json({ success: true });
            }
        } catch (fsError) {
            console.error('JSON fallback delete failed entirely:', fsError);
        }

        return NextResponse.json(
            { error: 'Project not found' },
            { status: 404 }
        );
    } catch (error) {
        console.error('Delete Error Handler Caught:', error);
        return NextResponse.json(
            { error: 'Failed to delete project', details: (error as Error).message },
            { status: 500 }
        );
    }
}
