import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// 不需要认证的路径
const publicPaths = [
  '/login',
  '/signup',
  '/verify-email',
  '/verify-email-notice',
  '/forgot-password',
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/verify-email'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 检查是否是公开路径
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 获取token
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // 重定向到登录页
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // 验证token
    verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return NextResponse.next();
  } catch (error) {
    // token无效，重定向到登录页
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

// 配置需要进行中间件处理的���径
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 