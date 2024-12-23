// 这是服务端组件
import { headers } from 'next/headers';
import { DashboardClient } from './DashboardClient';

export default async function DashboardPage() {
  // 在服务端获取用户信息
  const headersList = await headers();
  const cookie = headersList.get('cookie');

  let userInfo = null;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      headers: {
        cookie: cookie || '',
      },
    });
    
    if (response.ok) {
      userInfo = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }

  return <DashboardClient initialData={userInfo} />;
}