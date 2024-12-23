import { NextResponse } from "next/server";
import Account from "@/models/Account";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/mail";

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
 * 注册账号
 * @param req 请求体
 * @returns 注册结果
 */
export async function POST(req: Request) {
  try {
    // 1. 获取并验证请求数据
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return createResponse(
        null,
        "请填写完整的注册信息",
        false,
        400
      );
    }

    // 2. 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return createResponse(
        null,
        "邮箱格式不正确",
        false,
        400
      );
    }

    // 3. 检查账号是否已存在
    const existingAccount = await Account.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingAccount) {
      const field = existingAccount.username === username ? "用户名" : "邮箱";
      return createResponse(
        null,
        `该${field}已被注册`,
        false,
        400
      );
    }

    // 4. 生成验证令牌和过期时间
    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 5. 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. 创建新账号
    const account = await Account.create({
      username,
      email,
      password: hashedPassword,
      status: 'inactive',
      verificationToken,
      verificationTokenExpires,
      isVerified: false,
    });

    // 7. 发送验证邮件
    try {
      await sendVerificationEmail(email, verificationToken);
      
      return createResponse(
        { id: account.id },
        "注册成功，请查收验证邮件"
      );
    } catch (emailError: any) {
      // 邮件发送失败的处理
      if (emailError.message.includes('频率超限')) {
        return createResponse(
          'RATE_LIMIT_EXCEEDED',
          "系统繁忙，请稍后重试",
          false,
          429
        );
      }

      // 其他邮件发送错误
      console.error('邮件发送失败:', emailError);
      return createResponse(
        { 
          id: account.id,
          error: 'EMAIL_SEND_FAILED' 
        },
        "注册成功，但邮件发送失败，请联系管理员",
        true,
        201
      );
    }
  } catch (error) {
    // 记录详细错误信息
    console.error('注册失败:', error);
    
    // 返回用户友好的错误信息
    return createResponse(
      error instanceof Error ? error.message : '未知错误',
      "注册失败，请稍后重试",
      false,
      500
    );
  }
}