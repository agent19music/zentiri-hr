import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Allow static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // For dashboard routes, let the client-side route guard handle authentication
  // This middleware just ensures the routes exist and are accessible
  if (pathname.startsWith('/employer/') || pathname.startsWith('/employee/')) {
    return NextResponse.next()
  }

  // For auth routes, let them pass through
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  // For onboarding routes, let them pass through
  if (pathname.startsWith('/onboarding/')) {
    return NextResponse.next()
  }

  // For root path and other paths, let them pass through
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 