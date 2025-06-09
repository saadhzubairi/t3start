import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '~/server/auth';
import type { Session } from 'next-auth';

// --- Configuration ---

// Publicly accessible routes that do not require login.
const publicRoutes = ['/', '/welcome', '/login', '/signup', '/example'];

// The route a user with the PREUSER role is restricted to.
const preUserRoute = '/preUserSurvey';

// The route prefix a user with the USER role is restricted to.
const userRoutePrefix = '/blog';

// Default dashboards for redirection after login or on invalid access.
const adminDashboard = '/play/dashboard';
const userDashboard = '/feed';
const loginRoute = '/login';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Fetch the session. We cast it to include our custom user role.
  const session = await auth() as Session & { user?: { role?: string } } | null;
  const userRole = session?.user?.role;
  const isLoggedIn = !!session;

  // --- 1. Handle Unauthenticated Users ---
  if (!isLoggedIn) {
    // Allow access to public routes.
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }
    // For all other routes, redirect to the login page.
    const callbackUrl = new URL(loginRoute, req.url);
    callbackUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(callbackUrl);
  }

  // --- 2. Handle Authenticated Users ---
  // At this point, we know the user is logged in.

  // If a logged-in user tries to visit a public-only page (like login),
  // redirect them to their respective dashboard.
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    let homeUrl = userDashboard; // Default for USER role
    if (userRole === 'ADMIN') homeUrl = adminDashboard;
    if (userRole === 'PREUSER') homeUrl = preUserRoute;
    return NextResponse.redirect(new URL(homeUrl, req.url));
  }

  // --- 3. Role-Based Access Control ---
  switch (userRole) {
    case 'PREUSER':
      // PREUSER can ONLY access their designated survey page.
      if (!pathname.startsWith(preUserRoute)) {
        console.log("Redirecting to a preuser page")
        return NextResponse.redirect(new URL(preUserRoute, req.url));
      }
      break;

    case 'USER':
      // USER can ONLY access routes under /blog.
      // This is based on your specific request. You might want to expand this
      // to include other routes like `/feed` or `/play` by modifying the condition.
      if (!pathname.startsWith(userRoutePrefix)) {
        return NextResponse.redirect(new URL(userRoutePrefix, req.url));
      }
      break;

    case 'ADMIN':
      // ADMIN can access anything EXCEPT the pre-user survey page.
      if (pathname.startsWith(preUserRoute)) {
        return NextResponse.redirect(new URL(adminDashboard, req.url));
      }
      break;

    default:
      // If the user has an unknown or missing role, redirect to login.
      return NextResponse.redirect(new URL(loginRoute, req.url));
  }

  // If no redirection has occurred, allow the request to proceed.
  return NextResponse.next();
}

// --- Matcher Configuration ---
export const config = {
  matcher: [
    // This pattern applies the middleware to all routes except for:
    // - /api routes
    // - /_next/static (static files)
    // - /_next/image (image optimization files)
    // - /favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};