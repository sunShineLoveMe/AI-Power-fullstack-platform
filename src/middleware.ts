import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 获取 cookie
  const token = request.cookies.get('token');

  // 如果是登录页面，直接放行
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  // 如果访问 dashboard 且没有 token，重定向到登录页
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};