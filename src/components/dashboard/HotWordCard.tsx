"use client";

import { useState } from 'react';
import { PlatformData } from '@/types/dashboard';
import { Line } from 'react-chartjs-2';

interface HotWordCardProps {
  data: PlatformData;
}

export function HotWordCard({ data }: HotWordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`
        relative p-6 rounded-xl
        bg-slate-800/30 backdrop-blur-lg
        border border-slate-700/50
        transition-all duration-300
        hover:bg-slate-800/40 hover:scale-[1.02]
        cursor-pointer
        ${isExpanded ? 'scale-[1.02]' : ''}
      `}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* 平台标题 */}
      <div className="flex items-center space-x-3 mb-6">
        <span className="material-icons-round text-2xl text-blue-400">
          {data.icon}
        </span>
        <h3 className="text-xl font-semibold text-slate-100">
          {data.name}热词榜
        </h3>
      </div>

      {/* 热词列表 */}
      <div className="space-y-4">
        {data.hotWords.map((hotWord, index) => (
          <div
            key={hotWord.id}
            className="flex items-center justify-between p-3
              bg-slate-900/30 rounded-lg
              hover:bg-slate-900/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-slate-400">#{index + 1}</span>
              <span className="text-slate-100">{hotWord.word}</span>
              <span className={`material-icons-round text-sm ${
                hotWord.change === 'up' ? 'text-green-400' :
                hotWord.change === 'down' ? 'text-red-400' :
                'text-slate-400'
              }`}>
                {hotWord.change === 'up' ? 'trending_up' :
                 hotWord.change === 'down' ? 'trending_down' :
                 'trending_flat'}
              </span>
            </div>
            
            {/* 趋势图 */}
            <div className="w-24 h-12">
              <Line
                data={{
                  labels: hotWord.trend.map(t => new Date(t.timestamp).toLocaleDateString()),
                  datasets: [{
                    data: hotWord.trend.map(t => t.value),
                    borderColor: '#60a5fa',
                    tension: 0.4,
                    pointRadius: 0,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 