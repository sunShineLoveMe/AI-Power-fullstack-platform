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
 * 用户登录接口
 */

export async function POST(req: Request) {
    try {
        // 获取并验证请求数据
        const { email, password } = await req.json();

        // 验证邮箱和密码
        if (!email || !password) {
            return NextResponse.json({ message: "邮箱和密码不能为空" }, { status: 400 });
        }

        // 查找用户
        const account = await Account.findOne({ where: { email } });
        if (!account) {
            return NextResponse.json({ message: "用户不存在" }, { status: 401 });
        }

        // 验证账号状态，值为1代表账号已验证，其他代表账号未验证
        if (!account.isVerified) {
            return NextResponse.json({ message: "请先验证邮箱" }, { status: 401 });
        }
        // 验证账号状态 status,active代表激活，inactive代表未激活
        if (account.status !== "active") {
            return NextResponse.json({ message: "账号未激活" }, { status: 401 });
        }

        // 验证密码
        const isPasswordValid = await bcrypt.compare(password, account.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "密码错误" }, { status: 401 });
        }

        // 生成JWT令牌
        const token = sign(
            { 
                id: account.id,
                email: account.email,
                username: account.username,
            },
            process.env.JWT_SECRET || "",
            { expiresIn: "24h" }
        );

        // 更新用户登录时间
        await account.update({
             lastLoginAt: new Date(),
             status: "active" 
        });
        
        // 设置Cookie
        const response = createResponse(
            { token },
            "登陆成功"
        );

        // 返回令牌
        return NextResponse.json({ token }, { status: 200 });

        
    } catch (error) {
        
    }
}

