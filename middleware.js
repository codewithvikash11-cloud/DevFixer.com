import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Protect Admin Routes
    if (pathname.startsWith('/admin')) {
        // We cannot easily check Appwrite session in middleware without standard cookie handling.
        // However, we can check for a custom cookie if set, or rely on client-side AdminGuard.
        // For robust security, we usually verify session here.
        // Assuming 'a_session_' cookie exists or similar.

        // For now, we'll rely on Client-Side Guard for Auth, BUT we can add headers here.
        const response = NextResponse.next();
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
