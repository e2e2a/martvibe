import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const { auth } = NextAuth(authConfig);

const DEFAULT_REDIRECT = '/'; // where to go after login
const ROOT = '/';
const PUBLIC_ROUTES = ['/signin', '/signup', '/forgot-password'];

export default auth(async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const authenticated = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: 'next-auth.session-token', // Explicitly set it
  });
  console.log('authenticated', authenticated);
  console.log('nextUrl', nextUrl);
  // const isAuthenticated = !!req.auth;
  // console.log('req', req);
  const { pathname } = nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // Redirect authenticated users away from public routes (like /signin)
  if (isPublicRoute && authenticated) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  // Redirect unauthenticated users from protected routes
  if (!authenticated && !isPublicRoute) {
    return Response.redirect(new URL('/signin', nextUrl));
  }

  // Otherwise, continue
  return undefined;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
