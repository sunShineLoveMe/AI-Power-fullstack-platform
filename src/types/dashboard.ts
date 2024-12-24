export interface TrendData {
  timestamp: string;
  value: number;
}

export interface HotWord {
  id: string;
  word: string;
  count: number;
  change: 'up' | 'down';
  trend: { timestamp: string; value: number }[];
}

export interface PlatformData {
  platform: string;
  name: string;
  icon: string;
  hotWords: HotWord[];
} 