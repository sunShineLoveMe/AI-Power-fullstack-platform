export interface HeatMapData {
  id: number;
  tag: string;
  likedCount: number;
  collectedCount: number;
  commentCount: number;
  shareCount: number;
  avgHeat: number;
}

export const mockHeatMapData: HeatMapData[] = [
  {
    id: 1,
    tag: "穿搭分享",
    likedCount: 25678,
    collectedCount: 12890,
    commentCount: 3456,
    shareCount: 2345,
    avgHeat: 11092
  },
  {
    id: 2,
    tag: "美食探店",
    likedCount: 18965,
    collectedCount: 9876,
    commentCount: 2987,
    shareCount: 1876,
    avgHeat: 8426
  },
  {
    id: 3,
    tag: "护肤经验",
    likedCount: 32456,
    collectedCount: 15678,
    commentCount: 4567,
    shareCount: 3234,
    avgHeat: 13983
  },
  {
    id: 4,
    tag: "旅行日记",
    likedCount: 15678,
    collectedCount: 7890,
    commentCount: 2345,
    shareCount: 1567,
    avgHeat: 6870
  },
  {
    id: 5,
    tag: "生活方式",
    likedCount: 28976,
    collectedCount: 13456,
    commentCount: 3987,
    shareCount: 2876,
    avgHeat: 12324
  },
  {
    id: 6,
    tag: "二次元",
    likedCount: 45678,
    collectedCount: 23456,
    commentCount: 6789,
    shareCount: 4567,
    avgHeat: 20123
  },
  {
    id: 7,
    tag: "宠物日常",
    likedCount: 34567,
    collectedCount: 16789,
    commentCount: 5678,
    shareCount: 3456,
    avgHeat: 15123
  },
  {
    id: 8,
    tag: "游戏实况",
    likedCount: 56789,
    collectedCount: 28976,
    commentCount: 8765,
    shareCount: 5678,
    avgHeat: 25052
  }
]; 