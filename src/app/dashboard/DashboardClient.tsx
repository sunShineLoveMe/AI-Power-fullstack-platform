"use client";

import { useState } from 'react';
import { HotWordCard } from '@/components/dashboard/HotWordCard';
import { HeatMap } from '@/components/dashboard/HeatMap';
import { mockPlatformData } from '@/mock/dashboardData';
import { RadarChart } from '@/components/dashboard/RadarChart';
import { TrendCard3D } from '@/components/dashboard/TrendCard3D';

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
      <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">趋势分析</h2>
        <TrendCard3D />
      </div>
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

      {/* 雷达图部分 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlatformData.map((platform) => (
          <div 
            key={platform.platform}
            className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="material-icons-round text-2xl text-blue-400">
                {platform.icon}
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                {platform.name}热词分析
              </h2>
            </div>
            <RadarChart platform={platform.platform} />
          </div>
        ))}
      </div>
    </div>
  );
} 