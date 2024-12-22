import { NextResponse } from "next/server";
import User from "@/models/User";

/**
 * 获取用户数据
 * @param request 请求
 * @returns 用户数据
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = (page - 1) * limit;
  try {
    // 获取总数和分页数据
    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return NextResponse.json({
      data: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    return NextResponse.json({ error: "获取用户数据失败" }, { status: 500 });
  }
}
