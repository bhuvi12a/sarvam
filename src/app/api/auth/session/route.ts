import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_CONFIG } from '@/lib/auth';
import { findUserById } from '@/lib/db/users';
import { findUserByIdFallback } from '@/lib/db/users-fallback';

export async function GET(request: NextRequest) {
    try {
        // Get token from cookie
        const token = request.cookies.get(COOKIE_CONFIG.name)?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Verify token
        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        let user;

        try {
            // Try MongoDB first
            user = await findUserById(payload.userId);
        } catch (mongoError) {
            console.warn('MongoDB connection failed, using fallback storage');
            // Use fallback in-memory storage
            user = await findUserByIdFallback(payload.userId);
        }

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Session verification error:', error);
        return NextResponse.json(
            { error: 'An error occurred during session verification' },
            { status: 500 }
        );
    }
}
