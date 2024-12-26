"use client";

import { useState, useEffect } from 'react';
import { HeatMapData, mockHeatMapData } from '@/mock/heatmapData';

export function HeatMap() {
  const [data, setData] = useState<HeatMapData[]>(mockHeatMapData);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof HeatMapData;
    direction: 'asc' | 'desc';
  } | null>(null);

  // 生成16条数据
  useEffect(() => {
    // 复制原始数据并添加新的变体
    const extendedData = [
      ...mockHeatMapData,
      ...mockHeatMapData.map((item, index) => ({
        ...item,
        id: item.id + mockHeatMapData.length,
        tag: `${item.tag} Plus`,
        likedCount: Math.floor(item.likedCount * 1.2),
        collectedCount: Math.floor(item.collectedCount * 1.2),
        commentCount: Math.floor(item.commentCount * 1.2),
        shareCount: Math.floor(item.shareCount * 1.2),
        avgHeat: Math.floor(item.avgHeat * 1.2)
      }))
    ];
    setData(extendedData);
  }, []);

  // 排序函数
  const sortData = (key: keyof HeatMapData) => {
    let direction: 'asc' | 'desc' = 'desc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }

    const sortedData = [...data].sort((a, b) => {
      const aValue = Number(a[key]);
      const bValue = Number(b[key]);
      if (direction === 'asc') {
        return aValue < bValue ? -1 : 1;
      }
      return aValue > bValue ? -1 : 1;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  // 获取热度颜色
  const getHeatColor = (value: number, max: number) => {
    const intensity = Math.min(value / max, 1);
    return `rgba(59, 130, 246, ${intensity * 0.8})`; // 使用蓝色作为基础色
  };

  // 格式化数字
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('zh-CN').format(num);
  };

  // 获取列的最大值
  const getMaxValue = (key: keyof HeatMapData) => {
    return Math.max(...data.map(item => Number(item[key])));
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .scroll-container {
          animation: scrollUp 30s linear infinite;
        }
        .scroll-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <table className="w-full">
        <thead className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm">
          <tr>
            <th className="w-[200px] px-4 py-3 text-left text-sm font-semibold text-slate-300">
              热词标签
            </th>
            {['likedCount', 'collectedCount', 'commentCount', 'shareCount', 'avgHeat'].map((key) => (
              <th 
                key={key}
                className="w-[160px] px-4 py-3 text-left text-sm font-semibold text-slate-300 cursor-pointer hover:text-slate-100"
                onClick={() => sortData(key as keyof HeatMapData)}
              >
                {key === 'likedCount' ? '点赞数' :
                 key === 'collectedCount' ? '收藏数' :
                 key === 'commentCount' ? '评论数' :
                 key === 'shareCount' ? '分享数' : '平均热度'}
                {sortConfig?.key === key && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <div className="scroll-container">
        <table className="w-full">
          <tbody>
            {[...data, ...data].map((row, index) => (
              <tr 
                key={`${row.id}-${index}`}
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="w-[200px] px-4 py-3 text-sm text-slate-300">
                  {row.tag}
                </td>
                {['likedCount', 'collectedCount', 'commentCount', 'shareCount', 'avgHeat'].map((key) => (
                  <td 
                    key={key}
                    className="w-[160px] px-4 py-3 text-sm"
                    style={{
                      background: getHeatColor(
                        Number(row[key as keyof HeatMapData]), 
                        getMaxValue(key as keyof HeatMapData)
                      )
                    }}
                  >
                    <div className="text-slate-200 font-medium">
                      {formatNumber(Number(row[key as keyof HeatMapData]))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 