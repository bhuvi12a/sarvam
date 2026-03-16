import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');

        try {
            await mkdir(uploadDir, { recursive: true });
            await writeFile(path.join(uploadDir, filename), buffer);

            return NextResponse.json({
                url: `/uploads/${filename}`,
                success: true
            });
        } catch (fsError: any) {
            console.error('Filesystem error:', fsError);
            
            // Helpful error for Vercel users
            if (process.env.VERCEL) {
                return NextResponse.json({ 
                    error: 'Image upload to server is not supported on Vercel.',
                    hint: 'Please use the "Paste URL" tab instead, or set up Cloudinary/Supabase storage.'
                }, { status: 501 });
            }
            
            throw fsError;
        }
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
    }
}
