import {NextRequest, NextResponse} from 'next/server';
import getUserFromToken from '@/helpers/getUserFromToken';
import {Role} from './domain/Role';
import {User} from './domain/User';

const secret = process.env.JWT_SECRET!;

export async function middleware(request: NextRequest) {
    let user: Partial<User> | undefined;
    const nextUrl = request.nextUrl;
    let accessToken = request.cookies.get('accessToken')?.value;

    user = await getUserFromToken(accessToken);

    if (nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/users', request.url));
    }

    if (nextUrl.pathname.startsWith('/users') && !user) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    // if (
    //     nextUrl.pathname.startsWith('/users') &&
    //     user &&
    //     user?.role === Role.standard
    // ) {
    //     return NextResponse.redirect(new URL('/summary', request.url));
    // }

    // if (nextUrl.pathname === `/users/:path*` && user?.role === Role.standard) {
    //     return NextResponse.redirect(new URL('/summary', request.url));
    // }

    if (nextUrl.pathname === '/users') {
        if (!user) {
            // kick out non-users...
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        if (user.role === Role.standard) {
            return NextResponse.redirect(
                // new URL(`/users/${user.userId}`, request.url)
                new URL(`/summary`, request.url)
            );
        }
    }

    if (nextUrl.pathname === '/summary') {
        if (!user) {
            // kick out non-users...
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }

    if (user && nextUrl.pathname === '/signin') {
        return NextResponse.redirect(
            new URL('/users', request.url)
            // new URL(`/summary`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/signin', '/summary', '/users/:path*', '/users']
};
