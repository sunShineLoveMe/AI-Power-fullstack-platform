import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    // 从cookie中获取token
    const token = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        message: "未登录" 
      }, { status: 401 });
    }

    // 验证token
    verify(token, process.env.JWT_SECRET || '');

    return NextResponse.json({ 
      success: true, 
      message: "已登录" 
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "认证失败" 
    }, { status: 401 });
  }
} 