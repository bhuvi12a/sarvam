import { NextResponse } from 'next/server';
import { COOKIE_CONFIG } from '@/lib/auth';

export async function POST() {
    try {
        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        });

        // Clear the authentication cookie
        response.cookies.set(COOKIE_CONFIG.name, '', {
            ...COOKIE_CONFIG.options,
            maxAge: 0,
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'An error occurred during logout' },
            { status: 500 }
        );
    }
}
