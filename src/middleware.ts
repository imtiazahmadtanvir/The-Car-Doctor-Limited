import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(_req) {
    // This function runs only if the user is authenticated
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes that don't require authentication
        const publicRoutes = [
          "/",
          "/login",
          "/register",
          "/api/auth/signin",
          "/api/auth/signup",
          "/api/auth/callback",
          "/api/auth/session",
          "/api/auth/providers",
          "/api/auth/csrf",
        ]

        // Check if the current path is a public route
        const isPublicRoute = publicRoutes.some((route) => {
          if (route === "/") {
            return pathname === "/"
          }
          return pathname.startsWith(route)
        })

        // Allow access to public routes
        if (isPublicRoute) {
          return true
        }

        // For all other routes, require authentication
        return !!token
      },
    },
  },
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
}
