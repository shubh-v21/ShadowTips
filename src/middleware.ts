import { NextRequest, NextResponse } from "next/server"; // Next.js ke server-side request aur response objects import kar rahe hain
import { getToken } from "next-auth/jwt"; // JWT token fetch karne ke liye NextAuth ka helper function
export { default } from "next-auth/middleware"; // NextAuth ka built-in middleware export kar rahe hain

// 🔹 1. Middleware ko kin routes par apply karna hai uska matcher define kar rahe hain
export const config = {
  matcher: [
    "/dashboard/:path*", // Dashboard aur uske sub-routes ke liye middleware apply hoga
    "/sign-in", // Sign-in page ke liye middleware
    "/sign-up", // Sign-up page ke liye middleware
    "/", // Homepage ke liye middleware
    "/verify/:path*", // Email verification pages ke liye middleware
  ],
};

// 🔹 2. Middleware Function (Har Request Pe Execute Hoga)
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request }); // JWT Token fetch karna (Agar user authenticated hai toh token milega)
  const url = request.nextUrl; // Current request ka URL object le rahe hain

  // 🟢 Agar user authenticated hai aur wo sign-in, sign-up, verify ya home page pe ja raha hai, toh usse dashboard par bhej do
  if (
    token && // Token hai (matlab user logged in hai)
    (url.pathname.startsWith("/sign-in") || // Sign-in page pe ja raha hai
      url.pathname.startsWith("/sign-up") || // Sign-up page pe ja raha hai
      url.pathname.startsWith("/verify") || // Verification page pe ja raha hai
      url.pathname === "/") // Home page pe ja raha hai
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url)); // ✅ Redirect to Dashboard
  }

  // ❌ Agar user authenticated nahi hai aur wo dashboard par ja raha hai, toh use sign-in page pe bhejo
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url)); // ❌ Redirect to Sign-in
  }

  return NextResponse.next(); // ✅ Request allow karo (Agar koi restriction apply nahi ho rahi)
}

/*
    🚀 Middleware Execution Flow:
    1. User sends a request to a protected route (e.g., /dashboard).
    2. Middleware automatically runs before the request is processed.
    3. If the user is authenticated (token exists):
       - Redirect to /dashboard if trying to access /sign-in, /sign-up, /verify, or home (/).
    4. If the user is NOT authenticated and tries to access /dashboard:
       - Redirect them to /sign-in.
    5. If none of the above conditions are met, allow the request to proceed.
  */

/*
  📌 Important Notes:
  - Next.js automatically detects middleware.ts/middleware.js at the root level.
  - You do NOT need to import this middleware anywhere in the project.
  - Middleware only works for pages, NOT for API routes (e.g., /api/...).
  - This is executed server-side before rendering any page.
  - If middleware blocks a request, the page will never be rendered.
*/
