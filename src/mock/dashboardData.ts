import { PlatformData } from '@/types/dashboard';

export const mockPlatformData: PlatformData[] = [
  {
    platform: 'xiaohongshu',
    name: '小红书',
    icon: 'favorite',
    hotWords: Array.from({ length: 8 }, (_, i) => ({
      id: `${i + 1}`,
      word: `小红书热词${i + 1}`,
      count: Math.floor(Math.random() * 10000) + 1000,
      change: Math.random() > 0.5 ? 'up' : 'down',
      trend: Array.from({ length: 7 }, (_, j) => ({
        timestamp: new Date(Date.now() - j * 24 * 60 * 60 * 1000).toISOString(),
        value: Math.floor(Math.random() * 1000) + 500
      }))
    }))
  },
  {
    platform: 'douyin',
    name: '抖音',
    icon: 'videocam',
    hotWords: Array.from({ length: 8 }, (_, i) => ({
      id: `${i + 1}`,
      word: `抖音热词${i + 1}`,
      count: Math.floor(Math.random() * 10000) + 1000,
      change: Math.random() > 0.5 ? 'up' : 'down',
      trend: Array.from({ length: 7 }, (_, j) => ({
        timestamp: new Date(Date.now() - j * 24 * 60 * 60 * 1000).toISOString(),
        value: Math.floor(Math.random() * 1000) + 500
      }))
    }))
  },
  {
    platform: 'bilibili',
    name: 'B站',
    icon: 'play_circle',
    hotWords: Array.from({ length: 8 }, (_, i) => ({
      id: `${i + 1}`,
      word: `B站热词${i + 1}`,
      count: Math.floor(Math.random() * 10000) + 1000,
      change: Math.random() > 0.5 ? 'up' : 'down',
      trend: Array.from({ length: 7 }, (_, j) => ({
        timestamp: new Date(Date.now() - j * 24 * 60 * 60 * 1000).toISOString(),
        value: Math.floor(Math.random() * 1000) + 500
      }))
    }))
  }
]; 