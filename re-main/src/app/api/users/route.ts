import { NextResponse } from 'next/server';
import { readData, writeData, generateId } from '@/lib/dataStore';

interface User {
    id: string;
    email: string;
    role: 'admin' | 'user';
    name?: string;
    createdAt: string;
}

export async function GET() {
    try {
        const users = await readData<User>('users');
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.email || !body.role) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newUser: User = {
            id: generateId(),
            email: body.email,
            role: body.role,
            name: body.name,
            createdAt: new Date().toISOString(),
        };

        const created = await writeData('users', newUser);
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
