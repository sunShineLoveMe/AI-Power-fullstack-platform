import { NextResponse } from "next/server";
import Account from "@/models/Account";
import bcrypt from "bcryptjs";
// 引入sequelize,Op是sequelize ORM中用于构建
// 查询条件的运算符
import { Op } from "sequelize";

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
            return NextResponse.json({ message: "Account already exists" }, { status: 400 });
        }
        // 密码加密
        const hashedPassword = await bcrypt.hash(password, 10);
        // 创建新账号
        const account = await Account.create({ 
            username, 
            email, 
            password: hashedPassword,
            status: 'active',
         });
        return NextResponse.json({ 
            message: "注册成功", 
            id: account.id });
    } catch (error) {
        return NextResponse.json({
             message: "注册失败",
            error: error }, { status: 500 });
    }
}