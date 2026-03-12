import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request) {
  const { supabase, user, supabaseResponse } = await updateSession(request);

  // Define protected routes (same as Clerk setup)
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/doctors") ||
    request.nextUrl.pathname.startsWith("/onboarding") ||
    request.nextUrl.pathname.startsWith("/doctor") ||
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/video-call") ||
    request.nextUrl.pathname.startsWith("/appointments");

  // If the route is protected and the user is NOT logged in, redirect to login
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in"; // Adjust this based on your Supabase Auth UI path
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
