import { NextResponse } from "next/server";
import Account from "@/models/Account";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

// 定义响应格式
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// 响应构造器
function createResponse<T>(
  data: T | null, 
  message: string, 
  success = true, 
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success,
    message,
    ...(data && { data }),
    ...((!success && data) && { error: data as string })
  }, { status });
}

/**
 * 用户登录
 * @param req 请求体
 * @returns 登录结果
 */
export async function POST(req: Request) {
  try {
    // 1. 获取并验证请求数据
    const { email, password } = await req.json();

    if (!email || !password) {
      return createResponse(
        null,
        "请输入邮箱和密码",
        false,
        400
      );
    }

    // 2. 查找账号
    const account = await Account.findOne({
      where: { email }
    });

    if (!account) {
      return createResponse(
        null,
        "账号不存在",
        false,
        401
      );
    }

    // 3. 验证账号状态
    if (!account.isVerified) {
      return createResponse(
        null,
        "请先验证邮箱",
        false,
        401
      );
    }

    if (account.status === 'locked') {
      return createResponse(
        null,
        "账号已被锁定，请联系管理员",
        false,
        401
      );
    }

    // 4. 验证密码
    const isValidPassword = await bcrypt.compare(password, account.password);
    if (!isValidPassword) {
      return createResponse(
        null,
        "密码错误",
        false,
        401
      );
    }

    // 5. 生成JWT令牌
    const token = sign(
      { 
        id: account.id,
        email: account.email,
        username: account.username 
      },
      process.env.JWT_SECRET || '',
      { expiresIn: '24h' }
    );

    // 6. 更新最后登录时间
    await account.update({
      lastLoginAt: new Date(),
      status: 'active'
    });

    // 7. 创建响应对象
    const response = NextResponse.json(
      {
        success: true,
        message: "登录成功",
        data: { token }
      },
      { status: 200 }
    );

    // 8. 设置 cookie
    const cookieOptions = {
      httpOnly: true,
      secure: false, // 开发环境设置为 false
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 24 * 60 * 60, // 24小时，单位是秒
    };

    // 使用 Set-Cookie 头部设置 cookie
    response.headers.set(
      'Set-Cookie',
      `token=${token}; Path=${cookieOptions.path}; Max-Age=${cookieOptions.maxAge}; ${cookieOptions.httpOnly ? 'HttpOnly;' : ''} SameSite=${cookieOptions.sameSite}`
    );

    return response;

  } catch (error) {
    console.error('登录失败:', error);
    return createResponse(
      error instanceof Error ? error.message : '未知错误',
      "登录失败，请稍后重试",
      false,
      500
    );
  }
} 