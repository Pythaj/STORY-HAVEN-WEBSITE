import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware to protect admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Check if accessing from allowed environment
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    // In production, you can add additional checks here:
    // - IP whitelist
    // - Geographic restrictions
    // - Time-based access
    
    // For now, allow access but log it
    const clientIP = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown'
    console.log(`[SECURITY] Admin access attempt from: ${clientIP}`)
    
    // You can add custom headers for security
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'no-referrer')
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    
    return response
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
