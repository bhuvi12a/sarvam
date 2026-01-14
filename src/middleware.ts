import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, COOKIE_CONFIG } from './lib/auth';

export function middleware(request: NextRequest) {
    // Temporarily disabled to test login
    // Will re-enable after confirming auth works
    console.log('Middleware bypassed for testing');
    return NextResponse.next();

    /* ORIGINAL CODE - COMMENTED OUT FOR TESTING
    const { pathname } = request.nextUrl;

    // Allow access to login page
    if (pathname === '/admin/login') {
        return NextResponse.next();
    }

    // Check for admin routes
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get(COOKIE_CONFIG.name)?.value;

        // No token, redirect to login
        if (!token) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // Verify token
        const payload = verifyToken(token);

        // Invalid token, redirect to login
        if (!payload) {
            const loginUrl = new URL('/admin/login', request.url);
            const response = NextResponse.redirect(loginUrl);

            // Clear invalid cookie
            response.cookies.set(COOKIE_CONFIG.name, '', {
                ...COOKIE_CONFIG.options,
                maxAge: 0,
            });

            return response;
        }

        // Token is valid, allow access
        return NextResponse.next();
    }

    return NextResponse.next();
    */
}

export const config = {
    matcher: '/admin/:path*',
};

