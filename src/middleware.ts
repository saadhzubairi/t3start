import { auth } from '~/server/auth';
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  const protectedRoutes = ["/dashboard", "/admin"]; // Add your protected routes here

  if (!session && protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Add routes that require authentication
};