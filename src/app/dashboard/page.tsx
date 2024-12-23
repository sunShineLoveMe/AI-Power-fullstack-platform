"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserInfo {
  username: string;
  email: string;
  lastLoginAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取用户信息
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/users/me');
        const data = await response.json();
        
        if (data.success) {
          setUserInfo(data.data);
        } else {
          // 如果获取用户信息失败，可能是token过期
          router.push('/login');
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  if (loading) {
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
      {/* 欢迎信息 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">欢迎回来, {userInfo?.username}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700">账号信息</h3>
            <p className="mt-2 text-gray-600">邮箱: {userInfo?.email}</p>
            <p className="text-gray-600">
              上次登录: {userInfo?.lastLoginAt ? new Date(userInfo.lastLoginAt).toLocaleString('zh-CN') : '首次登录'}
            </p>
          </div>
          {/* 可以添加更多卡片 */}
        </div>
      </div>

      {/* 快捷操作区 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">快捷操作</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => router.push('/user')}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="block text-lg font-medium">用户管理</span>
            <span className="text-sm text-gray-500">管理系统用户</span>
          </button>
          {/* 可以添加更多快捷操作按钮 */}
        </div>
      </div>
    </div>
  );
}