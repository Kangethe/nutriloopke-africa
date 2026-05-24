import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require admin authentication
const PROTECTED_ROUTES = ['/admin', '/admin/submissions', '/admin/kpis']

// API routes that need rate limiting metadata injection
const RATE_LIMITED_API_ROUTES = ['/api/apply', '/api/contact', '/api/newsletter']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // ── Inject IP and user-agent for rate limiting in API routes ──────────────
  if (RATE_LIMITED_API_ROUTES.some((route) => pathname.startsWith(route))) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      '127.0.0.1'

    response.headers.set('x-client-ip', ip)
    response.headers.set(
      'x-client-ua',
      request.headers.get('user-agent') ?? 'unknown'
    )
  }

  // ── Protect admin routes ───────────────────────────────────────────────────
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    const sessionToken =
      request.cookies.get('next-auth.session-token') ??
      request.cookies.get('__Secure-next-auth.session-token')

    if (!sessionToken) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // ── Block direct access to internal API config endpoints ─────────────────
  if (pathname.startsWith('/api/auth/') && request.method === 'GET') {
    const allowedAuthPaths = [
      '/api/auth/signin',
      '/api/auth/signout',
      '/api/auth/session',
      '/api/auth/csrf',
      '/api/auth/providers',
      '/api/auth/callback',
    ]
    const isAllowed = allowedAuthPaths.some((allowed) => pathname.startsWith(allowed))
    if (!isAllowed) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  // ── Cache control for API responses ───────────────────────────────────────
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  }

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|icons|images|fonts).*)',
  ],
}
