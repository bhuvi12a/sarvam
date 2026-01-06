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

        const newInquiry: Inquiry = {
            ...body,
            createdAt: new Date().toISOString(),
        };

        const saved = await writeData('inquiries', newInquiry);
        return NextResponse.json(saved, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const inquiries = await readData<Inquiry>('inquiries');
        return NextResponse.json(inquiries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
    }
}
