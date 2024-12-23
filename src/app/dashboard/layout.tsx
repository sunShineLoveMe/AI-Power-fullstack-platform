// 这是服务端组件，不需要 "use client"
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardNav from './DashboardNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 在服务端进行认证检查
  const headersList = await headers();
  const token = headersList.get('cookie')?.includes('token');

  if (!token) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 