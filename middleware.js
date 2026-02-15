import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth-token';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // 1. Protect Admin Routes
    if (pathname.startsWith('/admin')) {
        // Allow login page
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        const session = await verifySession();
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
