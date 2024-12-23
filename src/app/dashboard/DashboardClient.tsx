"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserInfo {
  username: string;
  email: string;
  lastLoginAt: string;
}

export function DashboardClient({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(initialData?.data || null);

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">欢迎回来, {userInfo.username}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700">账号信息</h3>
            <p className="mt-2 text-gray-600">邮箱: {userInfo.email}</p>
            <p className="text-gray-600">
              上次登录: {new Date(userInfo.lastLoginAt).toLocaleString('zh-CN')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 