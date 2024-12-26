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
        count: 156789,
        change: 'up',
        trend: generateTrendData(85000, 156789)
      },
      {
        id: '2',
        word: '护肤分享',
        count: 142345,
        change: 'down',
        trend: generateTrendData(165000, 142345)
      },
      {
        id: '3',
        word: '美食探店',
        count: 138567,
        change: 'up',
        trend: generateTrendData(98000, 138567)
      },
      {
        id: '4',
        word: '生活方式',
        count: 125678,
        change: 'same',
        trend: generateTrendData(124000, 125678)
      },
      {
        id: '5',
        word: '家居布置',
        count: 115234,
        change: 'up',
        trend: generateTrendData(89000, 115234)
      },
      {
        id: '6',
        word: '旅行日记',
        count: 98765,
        change: 'up',
        trend: generateTrendData(76000, 98765)
      },
      {
        id: '7',
        word: '健身打卡',
        count: 87654,
        change: 'down',
        trend: generateTrendData(95000, 87654)
      },
      {
        id: '8',
        word: '读书笔记',
        count: 76543,
        change: 'up',
        trend: generateTrendData(65000, 76543)
      }
    ]
  },
  {
    platform: 'douyin',
    name: '抖音',
    icon: 'videocam',
    hotWords: [
      {
        id: '1',
        word: '街头美食',
        count: 256789,
        change: 'up',
        trend: generateTrendData(185000, 256789)
      },
      {
        id: '2',
        word: '生活日常',
        count: 242345,
        change: 'down',
        trend: generateTrendData(265000, 242345)
      },
      {
        id: '3',
        word: '舞蹈视频',
        count: 238567,
        change: 'up',
        trend: generateTrendData(198000, 238567)
      },
      {
        id: '4',
        word: '搞笑短剧',
        count: 225678,
        change: 'same',
        trend: generateTrendData(224000, 225678)
      },
      {
        id: '5',
        word: '宠物日常',
        count: 215234,
        change: 'up',
        trend: generateTrendData(189000, 215234)
      },
      {
        id: '6',
        word: '美妆教程',
        count: 198765,
        change: 'up',
        trend: generateTrendData(176000, 198765)
      },
      {
        id: '7',
        word: '情感故事',
        count: 187654,
        change: 'down',
        trend: generateTrendData(195000, 187654)
      },
      {
        id: '8',
        word: '生活技巧',
        count: 176543,
        change: 'up',
        trend: generateTrendData(165000, 176543)
      }
    ]
  },
  {
    platform: 'bilibili',
    name: 'B站',
    icon: 'play_circle',
    hotWords: [
      {
        id: '1',
        word: '二次元',
        count: 356789,
        change: 'up',
        trend: generateTrendData(285000, 356789)
      },
      {
        id: '2',
        word: '游戏实况',
        count: 342345,
        change: 'down',
        trend: generateTrendData(365000, 342345)
      },
      {
        id: '3',
        word: '动漫鉴赏',
        count: 338567,
        change: 'up',
        trend: generateTrendData(298000, 338567)
      },
      {
        id: '4',
        word: '科技评测',
        count: 325678,
        change: 'same',
        trend: generateTrendData(324000, 325678)
      },
      {
        id: '5',
        word: '音乐推荐',
        count: 315234,
        change: 'up',
        trend: generateTrendData(289000, 315234)
      },
      {
        id: '6',
        word: '知识分享',
        count: 298765,
        change: 'up',
        trend: generateTrendData(276000, 298765)
      },
      {
        id: '7',
        word: '美食探店',
        count: 287654,
        change: 'down',
        trend: generateTrendData(295000, 287654)
      },
      {
        id: '8',
        word: '生活日常',
        count: 276543,
        change: 'up',
        trend: generateTrendData(265000, 276543)
      }
    ]
  }
];

// 生成趋势数据的辅助函数
function generateTrendData(startValue: number, endValue: number) {
  const days = 7;
  const step = (endValue - startValue) / (days - 1);
  
  return Array.from({ length: days }, (_, i) => ({
    timestamp: new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000).toISOString(),
    value: Math.round(startValue + step * i + (Math.random() - 0.5) * step * 0.5) // 添加一些随机波动
  }));
} 