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

    const redirectToUsers = NextResponse.redirect(
        new URL('/users', request.url)
    );
    const redirectToSignin = NextResponse.redirect(
        new URL('/signin', request.url)
    );
    const redirectToSummary = NextResponse.redirect(
        new URL('/summary', request.url)
    );

    if (nextUrl.pathname === '/') {
        if (!user) {
            return redirectToSignin;
        }

        if (user.role === Role.admin) {
            return redirectToUsers;
        }

        return redirectToSummary;
    }

    if (nextUrl.pathname.startsWith('/users')) {
        if (!user) {
            return redirectToSignin;
        }

        if (user.role === Role.standard) {
            return redirectToSummary;
        }
    }

    if (nextUrl.pathname === `/users/:path*`) {
        if (user?.role === Role.standard) {
            redirectToSummary;
        }
    }

    if (nextUrl.pathname === '/summary') {
        if (!user) {
            return redirectToSignin;
        }
    }

    if (nextUrl.pathname === '/signin') {
        if (user?.role === Role.admin) {
            return redirectToUsers;
        }

        if (user?.role === Role.standard) {
            return redirectToSummary;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/signin', '/summary', '/users/:path*', '/users']
};
