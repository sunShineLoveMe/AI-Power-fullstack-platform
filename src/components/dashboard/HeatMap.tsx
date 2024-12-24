"use client";

import { useState } from 'react';
import { HeatMapData, mockHeatMapData } from '@/mock/heatmapData';

export function HeatMap() {
  const [data, setData] = useState<HeatMapData[]>(mockHeatMapData);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof HeatMapData;
    direction: 'asc' | 'desc';
  } | null>(null);

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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
              热词标签
            </th>
            {['likedCount', 'collectedCount', 'commentCount', 'shareCount', 'avgHeat'].map((key) => (
              <th 
                key={key}
                className="px-4 py-3 text-left text-sm font-semibold text-slate-300 cursor-pointer hover:text-slate-100"
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
        <tbody>
          {data.map((row) => (
            <tr 
              key={row.tag}
              className="hover:bg-slate-800/30 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-slate-300">
                {row.tag}
              </td>
              {['likedCount', 'collectedCount', 'commentCount', 'shareCount', 'avgHeat'].map((key) => (
                <td 
                  key={key}
                  className="px-4 py-3 text-sm"
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
  );
} 