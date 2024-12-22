import { NextResponse } from "next/server";
import Account from "@/models/Account";
import bcrypt from "bcryptjs";
// 引入sequelize,Op是sequelize ORM中用于构建
// 查询条件的运算符
import { Op } from "sequelize";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/mail";

/**
 * 注册账号
 * @param req 请求体
 * @returns 注册结果
 */
export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();

        // 检查账号是否已存在
        const existingAccount = await Account.findOne({
            where: {
              [Op.or]: [{ username }, { email }]
            }
        });

        if (existingAccount) {
            return NextResponse.json({ 
                message: "用户名或邮箱已存在" 
            }, { status: 400 });
        }

        // 生成验证令牌
        const verificationToken = generateVerificationToken();
        const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // 密码加密
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 创建新账号
        const account = await Account.create({ 
            username, 
            email, 
            password: hashedPassword,
            status: 'inactive',
            verificationToken,
            verificationTokenExpires,
            isVerified: false,
        });

        try {
            // 发送验证邮件
            await sendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error('邮件发送失败:', emailError);
            // 即使邮件发送失败，账号仍然创建成功
            return NextResponse.json({ 
                message: "注册成功，但邮件发送失败，请联系管理员", 
                id: account.id 
            });
        }

        return NextResponse.json({ 
            message: "注册成功，请查收验证邮件", 
            id: account.id 
        });
    } catch (error) {
        console.error('注册失败:', error);
        return NextResponse.json({
            message: "注册失败",
            error: error instanceof Error ? error.message : '未知错误'
        }, { status: 500 });
    }
}