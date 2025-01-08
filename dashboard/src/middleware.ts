import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth";

const authRoutes = ["/login", "/register"]; // Routes accessible without authentication

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user || !user.id) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the user is authenticated, allow access to the requested route
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
