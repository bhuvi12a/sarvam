import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataStore';

interface Inquiry {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate required fields
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const newInquiry: Inquiry = {
            ...body,
            createdAt: new Date().toISOString(),
        };

        const saved = await writeData('inquiries', newInquiry);
        return NextResponse.json(saved, { status: 201 });
    } catch (error) {
        console.error('Contact submission error:', error);
        return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const inquiries = await readData<Inquiry>('inquiries');
        return NextResponse.json(inquiries);
    } catch (error) {
        console.error('Failed to fetch inquiries:', error);
        return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
    }
}
