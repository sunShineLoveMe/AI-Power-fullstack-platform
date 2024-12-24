import { PlatformData } from '@/types/dashboard';

export const mockPlatformData: PlatformData[] = [
  {
    platform: 'xiaohongshu',
    name: '小红书',
    icon: 'favorite',
    hotWords: [
      {
        id: '1',
        word: '穿搭技巧',
        count: 12500,
        change: 'up',
        trend: Array.from({ length: 7 }, (_, i) => ({
          timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
          value: Math.floor(Math.random() * 1000) + 500
        }))
      },
      // ... 更多热词
    ]
  },
  // ... 抖音和B站的数据
]; 