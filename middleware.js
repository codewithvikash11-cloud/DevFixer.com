import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check for Appwrite session cookie (starts with a_session_)
    const hasSession = request.cookies.getAll().some(c => c.name.startsWith('a_session_'));

    // Auth Routes: Redirect to /errors if already logged in
    if (hasSession && (pathname === '/login' || pathname === '/signup')) {
        return NextResponse.redirect(new URL('/errors', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/signup', '/dashboard/:path*'],
};
