import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const urlLength = request.url.split("/").length;
  const url = request.url.split("/").slice(3, urlLength).join();
  console.log(url);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (url == "") {
    return NextResponse.redirect(new URL("/admin/1", request.url));
  }
  if (url.startsWith("login")) {
    return NextResponse.redirect(new URL("/admin/1", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/admin/:path*", "/result", "/result/:path*", "/login"],
};
