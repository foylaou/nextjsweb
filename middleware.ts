// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 需要登入才能訪問的路徑
const protectedRoutes = [
  '/products'
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // 檢查當前路徑是否需要驗證
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // 如果是受保護的路由且沒有token,重定向到登入頁
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // 如果已登入且訪問登入頁,重定向到首頁
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

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
