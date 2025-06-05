import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  /* const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("*****************************************")
  console.log("*****************************************")
  console.log("*****************************************")
  console.log("*****************************************")
  console.log("*****************************************")
  console.log("TOKEN", token);
  console.log("*****************************************")
  console.log("*****************************************")
  console.log("*****************************************")
  console.log("*****************************************")
  console.log("*****************************************") */
  const protectedRoutes = ["/dashboard", "/userInfo", "/admin"];
  const url = req.nextUrl.clone();
  // Redirect unauthenticated users from protected routes to login
  /* if (!token && protectedRoutes.some((path) => url.pathname.startsWith(path))) {
    url.pathname = "/slashRouter";
    return NextResponse.redirect(url);
  }
  // Redirect PREUSER role to preUserSurvey page if not already there
  if (token?.role === "PREUSER" && url.pathname !== "/preUserSurvey") {
    url.pathname = "/preUserSurvey";
    return NextResponse.redirect(url);
  }
  return NextResponse.next(); */
}

// Apply middleware only on these routes (adjust as needed)
export const config = {
  matcher: ["/dashboard/:path*", "/userInfo/:path*", "/admin/:path*", "/preUserSurvey/:path*"],
};
