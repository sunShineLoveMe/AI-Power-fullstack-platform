"use client";

import { useState } from 'react';
import { HotWordCard } from '@/components/dashboard/HotWordCard';
import { mockPlatformData } from '@/mock/dashboardData';

export function DashboardClient({ initialData }: { initialData: any }) {
  const [userInfo] = useState(initialData?.data || null);

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
      {/* 欢迎信息卡片 */}
      {/* <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">
          欢迎回来, {userInfo.username}
        </h2>
        <div className="text-slate-400">
          <p>邮箱: {userInfo.email}</p>
          <p>上次登录: {new Date(userInfo.lastLoginAt).toLocaleString('zh-CN')}</p>
        </div>
      </div> */}

      {/* 热词卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlatformData.map((platform) => (
          <HotWordCard key={platform.platform} data={platform} />
        ))}
      </div>
    </div>
  );
} 