import { NextRequest, NextResponse } from 'next/server';
import { findUserByUsername, initializeDefaultAdmin } from '@/lib/db/users';
import { findUserByUsernameFallback } from '@/lib/db/users-fallback';
import { comparePassword, generateToken, COOKIE_CONFIG } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Validate input
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        let user;
        let usedFallback = false;

        console.log('=== LOGIN ATTEMPT ===');
        console.log('Username:', username);

        try {
            // Try MongoDB first
            console.log('Attempting MongoDB connection...');
            await initializeDefaultAdmin();
            user = await findUserByUsername(username);
            console.log('MongoDB user found:', user ? 'YES' : 'NO');
        } catch (mongoError: any) {
            console.warn('MongoDB connection failed, using fallback storage');
            console.warn('Error:', mongoError?.message || mongoError);
            usedFallback = true;
        }

        // If MongoDB failed or user not found, try fallback
        if (!user || usedFallback) {
            console.log('Using in-memory fallback storage for authentication');
            user = await findUserByUsernameFallback(username);
            console.log('Fallback user found:', user ? 'YES' : 'NO');
            if (user) {
                console.log('User details:', { id: user.id, username: user.username, role: user.role });
            }
        }

        if (!user) {
            console.log('NO USER FOUND - returning 401');
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            );
        }

        console.log('User found, verifying password...');

        // Verify password
        console.log('Password from request:', password);
        console.log('Stored password hash exists:', !!user.password);
        const isPasswordValid = await comparePassword(password, user.password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('PASSWORD MISMATCH - returning 401');
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            );
        }

        console.log('Password verified successfully, generating token...');

        // Generate JWT token
        const token = generateToken({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        });

        // Create response with user data (excluding password)
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });

        // Set HTTP-only cookie
        response.cookies.set(
            COOKIE_CONFIG.name,
            token,
            COOKIE_CONFIG.options
        );

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
