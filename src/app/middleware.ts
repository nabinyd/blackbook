import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get('session_token');

    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith('/user/dashboard')) {
        if (!sessionToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/user/:path*',
};