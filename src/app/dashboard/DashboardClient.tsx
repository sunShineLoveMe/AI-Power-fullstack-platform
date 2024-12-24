"use client";

import { useState } from 'react';
import { HotWordCard } from '@/components/dashboard/HotWordCard';
import { HeatMap } from '@/components/dashboard/HeatMap';
import { mockPlatformData } from '@/mock/dashboardData';

export function DashboardClient({ initialData }: { initialData: any }) {
  const [userInfo] = useState(initialData?.data || null);

  // 调整为更从容的翻转配置
  const platformConfigs = [
    { 
      initialDelay: 5000,     // 小红书：5秒后开始第一次翻转
      interval: 8000         // 之后每20秒翻转一次
    },
    { 
      initialDelay: 2000,    // 抖音：12秒后开始第一次翻转
      interval: 4000         // 之后每25秒翻转一次
    },
    { 
      initialDelay: 3000,    // B站：18秒后开始第一次翻转
      interval: 6000         // 之后每30秒翻转一次
    }
  ];

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
      {/* 热词卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlatformData.map((platform, index) => (
          <HotWordCard 
            key={platform.platform} 
            data={platform} 
            flipDelay={platformConfigs[index].initialDelay}
            flipInterval={platformConfigs[index].interval}
          />
        ))}
      </div>

      {/* 热力图部分 */}
      <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">热力图</h2>
        <HeatMap />
      </div>
    </div>
  );
} 