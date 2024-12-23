import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import Account from "@/models/Account";

// 响应构造器
function createResponse<T>(
  data: T | null, 
  message: string, 
  success = true, 
  status = 200
) {
  return NextResponse.json({
    success,
    message,
    ...(data && { data })
  }, { status });
}

export async function GET(request: Request) {
  try {
    // 从cookie中获取token
    const token = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return createResponse(
        null,
        "未登录",
        false,
        401
      );
    }

    // 验证token
    const decoded = verify(token, process.env.JWT_SECRET || '') as {
      id: number;
      email: string;
    };

    // 获取用户信息
    const account = await Account.findOne({
      where: { id: decoded.id },
      attributes: ['id', 'username', 'email', 'lastLoginAt']
    });

    if (!account) {
      return createResponse(
        null,
        "用户不存在",
        false,
        404
      );
    }

    return createResponse(
      {
        username: account.username,
        email: account.email,
        lastLoginAt: account.lastLoginAt
      },
      "获取用户信息成功"
    );

  } catch (error) {
    console.error('获取用户信息失败:', error);
    return createResponse(
      null,
      "获取用户信息失败",
      false,
      500
    );
  }
} 