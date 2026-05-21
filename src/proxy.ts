import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, COOKIE_CONFIG } from './lib/auth';

/**
 * Next.js Proxy (formerly Middleware)
 * Handles authentication for admin routes
 */
export function proxy(request: NextRequest) {
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
}

// Fallback for older versions or if the convention only renamed the file
export const middleware = proxy;

export const config = {
    matcher: '/admin/:path*',
};
