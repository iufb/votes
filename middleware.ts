import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const url = new URL(request.url);
  const pathname = url.pathname; // Extract the pathname part of the URL

  console.log("Pathname:", pathname);

  // If no token, redirect to login (but avoid infinite loop if already on /login)
  if (!token) {
    if (!pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next(); // Allow access to /login
  }

  // If the user is authenticated but on /login, redirect to /admin/1
  if (pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/admin/1", request.url));
  }

  // If the user is on the root path, redirect to /admin/1
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/admin/1", request.url));
  }

  // Allow other routes to proceed
  return NextResponse.next();
}

// Configuration for matching specific paths
export const config = {
  matcher: ["/", "/admin/:path*", "/result", "/result/:path*", "/login"],
};
