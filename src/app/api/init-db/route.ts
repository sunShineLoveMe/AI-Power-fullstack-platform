import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/initDb';

export async function GET() {
  try {
    await initializeDatabase();
    return NextResponse.json({ message: '数据库初始化成功' });
  } catch (error) {
    console.error('初始化数据库错误:', error);
    return NextResponse.json(
      { error: '数据库初始化失败' },
      { status: 500 }
    );
  }
}