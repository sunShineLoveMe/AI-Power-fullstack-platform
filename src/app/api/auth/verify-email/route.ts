import { NextResponse } from "next/server";
import Account from "@/models/Account";
import { Op } from "sequelize";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ message: "无效的验证令牌" }, { status: 400 });
    }

    const account = await Account.findOne({
      where: {
        verificationToken: token,
        verificationTokenExpires: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!account) {
      return NextResponse.json({ message: "验证令牌无效或已过期" }, { status: 400 });
    }

    // 更新账户状态
    await account.update({
      isVerified: true,
      status: 'active',
      verificationToken: null,
      verificationTokenExpires: null
    });

    return NextResponse.json({ message: "邮箱验证成功" });
  } catch (error) {
    console.error('邮箱验证失败:', error);
    return NextResponse.json({ message: "邮箱验证失败" }, { status: 500 });
  }
}
