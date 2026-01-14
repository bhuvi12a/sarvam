import { NextResponse } from 'next/server';
import { createUser, findUserByUsername } from '@/lib/db/users';

export async function POST() {
    try {
        // Check if admin already exists
        const existingAdmin = await findUserByUsername('admin');

        if (existingAdmin) {
            return NextResponse.json({
                success: false,
                message: 'Admin user already exists',
            }, { status: 400 });
        }

        // Create admin user
        const admin = await createUser(
            'admin',
            'admin123',
            'admin@sarvam.com',
            'admin'
        );

        if (!admin) {
            return NextResponse.json({
                success: false,
                message: 'Failed to create admin user',
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Admin user created successfully',
            user: {
                username: admin.username,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('Error creating admin user:', error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred while creating admin user',
            error: error instanceof Error ? error.message : 'Unknown error',
        }, { status: 500 });
    }
}
