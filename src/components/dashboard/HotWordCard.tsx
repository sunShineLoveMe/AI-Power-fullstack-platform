"use client";

import { useState, useEffect } from 'react';
import { PlatformData } from '@/types/dashboard';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// 注册所有需要的 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HotWordCardProps {
  data: PlatformData;
  flipDelay: number;    // 初始翻转延迟
  flipInterval: number; // 翻转间隔时间
}

export function HotWordCard({ data, flipDelay, flipInterval }: HotWordCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [lastUpdateTime] = useState(new Date().toLocaleString('zh-CN'));

  // 自动翻转效果
  useEffect(() => {
    // 初始延迟翻转
    const initialDelay = setTimeout(() => {
      setIsFlipped(true);
    }, flipDelay);

    // 设置定期翻转
    const flipTimer = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, flipInterval);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(flipTimer);
    };
  }, [flipDelay, flipInterval]);

  return (
    <div className="perspective-1000">
      <div
        className={`
          relative w-full h-[500px]
          transition-all ease-in-out duration-[3000ms] transform-style-3d
          cursor-pointer
          ${isFlipped ? 'rotate-y-180' : 'rotate-y-0'}
        `}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'all 6000ms ease-in-out',
        }}
      >
        {/* 正面 */}
        <div
          className={`
            absolute inset-0 w-full h-full
            backface-hidden
            p-6 rounded-xl
            bg-slate-800/30 backdrop-blur-lg
            border border-slate-700/50
            transition-all duration-[1000ms] ease-in-out
            hover:bg-slate-800/40
          `}
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {/* 标题区域 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="material-icons-round text-2xl text-blue-400">
                {data.icon}
              </span>
              <h3 className="text-xl font-semibold text-slate-100">
                {data.name}热词榜
              </h3>
            </div>
            <span className="text-sm text-slate-400">
              更新于 {lastUpdateTime}
            </span>
          </div>

          {/* 热词列表 */}
          <div className="space-y-3">
            {data.hotWords.slice(0, 5).map((hotWord, index) => (
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
                
                <div className="w-20 h-10">
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
                      plugins: { 
                        legend: { display: false } 
                      },
                      scales: {
                        x: { 
                          type: 'category',
                          display: false,
                          grid: {
                            display: false
                          }
                        }, 
                        y: { 
                          type: 'linear',
                          display: false,
                          grid: {
                            display: false
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 背面 */}
        <div
          className={`
            absolute inset-0 w-full h-full
            backface-hidden rotate-y-180
            p-6 rounded-xl
            bg-slate-800/30 backdrop-blur-lg
            border border-slate-700/50
            transition-all duration-[1000ms] ease-in-out
            hover:bg-slate-800/40
          `}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* 背面标题 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="material-icons-round text-2xl text-blue-400">
                {data.icon}
              </span>
              <h3 className="text-xl font-semibold text-slate-100">
                {data.name}热词榜 - 更多
              </h3>
            </div>
          </div>

          {/* 更多热词 */}
          <div className="space-y-3">
            {data.hotWords.slice(5).map((hotWord, index) => (
              <div
                key={hotWord.id}
                className="flex items-center justify-between p-3
                  bg-slate-900/30 rounded-lg
                  hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-slate-400">#{index + 6}</span>
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
                
                <div className="w-20 h-10">
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
                      plugins: { 
                        legend: { display: false } 
                      },
                      scales: {
                        x: { 
                          type: 'category',
                          display: false,
                          grid: {
                            display: false
                          }
                        }, 
                        y: { 
                          type: 'linear',
                          display: false,
                          grid: {
                            display: false
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 