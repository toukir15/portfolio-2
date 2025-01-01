import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth";

const publicRoutes = ["/login", "/register"]; // Routes accessible without authentication

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next(); // Allow access
  }

  // Fetch the current user
  const user = await getCurrentUser();

  if (!user || !user.id) {
    // If the user is not authenticated, redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated, allow access to the requested route
  return NextResponse.next();
}

// Define paths that should trigger the middleware
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"], // Matches all routes except static files and API
};
