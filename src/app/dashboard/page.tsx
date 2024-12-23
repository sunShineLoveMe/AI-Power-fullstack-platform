// 这是服务端组件
import { headers } from 'next/headers';
import { DashboardClient } from './DashboardClient';

export default async function DashboardPage() {
  // 在服务端获取用户信息
  const headersList = await headers();
  const cookie = headersList.get('cookie');
  
  // 获取当前环境的 URL
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = headersList.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  let userInfo = null;
  
  try {
    const response = await fetch(`${baseUrl}/api/users/me`, {
      headers: {
        cookie: cookie || '',
      },
      // 添加缓存控制
      cache: 'no-store', // 禁用缓存，确保每次都获取最新数据
    });
    
    if (response.ok) {
      userInfo = await response.json();
    } else {
      console.error('Failed to fetch user info:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }

  return <DashboardClient initialData={userInfo} />;
}