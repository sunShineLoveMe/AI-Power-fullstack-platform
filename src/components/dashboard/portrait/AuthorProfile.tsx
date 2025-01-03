"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkDetailModal from './WorkDetailModal';

interface Work {
  id: number;
  title: string;
  views: number;
  comments: number;
  shares: number;
  coverUrl: string;
}

interface WorkDetail extends Work {
  description: string;
  playCount: number;
  completionRate: number;
  retentionData: number[];
  tags: string[];
}

interface AuthorProfile {
  name: string;
  location: string;
  description: string;
  followers: string;
  avatar: string;
  categories: {
    name: string;
    color: string;
  }[];
  works: WorkDetail[];
}

export default function AuthorProfile() {
  const [searchParams, setSearchParams] = useState({
    platform: '抖音',
    keyword: ''
  });
  
  const [selectedWork, setSelectedWork] = useState<WorkDetail | null>(null);

  const [profile] = useState<AuthorProfile>({
    name: "作者昵称",
    location: "北京",
    description: "这里是作者的个人简介，简要介绍作者的身份特点或创作理念。",
    followers: "1000万+",
    avatar: "https://picsum.photos/seed/author/200",
    categories: [
      { name: "美妆", color: "bg-pink-500" },
      { name: "时尚穿搭", color: "bg-purple-500" },
      { name: "美食烹饪", color: "bg-yellow-500" }
    ],
    works: [
      { 
        id: 1, 
        title: "夏日清爽妆容分享", 
        views: 10000, 
        comments: 500, 
        shares: 200,
        coverUrl: "https://picsum.photos/seed/work1/800/450",
        description: "这是一个适合夏季的清爽妆容教程，轻松打造清新自然的妆容效果...",
        playCount: 500000,
        completionRate: 30,
        retentionData: [100, 95, 85, 70, 60, 55, 50, 45, 40, 35],
        tags: ["夏季妆容", "清透妆感", "防晒美妆"]
      },
      { 
        id: 2, 
        title: "职场穿搭技巧", 
        views: 15000, 
        comments: 700, 
        shares: 300, 
        coverUrl: "https://picsum.photos/seed/work2/800/450",
        description: "这是一个关于职场穿搭的教程，教你如何穿出专业又不失时尚感的穿搭...",
        playCount: 400000,
        completionRate: 25,
        retentionData: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
        tags: ["职场穿搭", "时尚感", "职业装"]
      },
      { 
        id: 3, 
        title: "快手早餐制作", 
        views: 20000, 
        comments: 1000, 
        shares: 500, 
        coverUrl: "https://picsum.photos/seed/work3/800/450",
        description: "这是一个快手早餐制作的教程，教你如何快速制作营养又美味的早餐...",
        playCount: 300000,
        completionRate: 20,
        retentionData: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
        tags: ["快手早餐", "营养早餐", "快手制作"]
      },
      { 
        id: 4, 
        title: "居家收纳方法", 
        views: 25000, 
        comments: 1200, 
        shares: 600, 
        coverUrl: "https://picsum.photos/seed/work4/800/450",
        description: "这是一个关于居家收纳的教程，教你如何有效整理家居空间，提高生活质量...",
        playCount: 200000,
        completionRate: 15,
        retentionData: [100, 80, 70, 60, 50, 40, 30, 20, 10, 5],
        tags: ["居家收纳", "家居整理", "生活质量"]
      },
      { 
        id: 5, 
        title: "护肤品使用顺序", 
        views: 30000, 
        comments: 1500, 
        shares: 800, 
        coverUrl: "https://picsum.photos/seed/work5/800/450",
        description: "这是一个关于护肤品使用顺序的教程，教你如何正确使用护肤品，达到最佳护肤效果...",
        playCount: 100000,
        completionRate: 10,
        retentionData: [100, 80, 70, 60, 50, 40, 30, 20, 10, 5],
        tags: ["护肤品使用", "护肤效果", "护肤品"]
      },
      { 
        id: 6, 
        title: "美食探店日记", 
        views: 35000, 
        comments: 2000, 
        shares: 1000, 
        coverUrl: "https://picsum.photos/seed/work6/800/450",
        description: "这是一个关于美食探店的日记，记录作者的美食探店经历和感受...",
        playCount: 50000,
        completionRate: 5,
        retentionData: [100, 70, 60, 50, 40, 30, 20, 10, 5, 0],
        tags: ["美食探店", "美食日记", "美食"]
      }
    ]
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (!scrollRef.current || isScrolling) return;

    const scroll = () => {
      if (!scrollRef.current) return;
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;
      
      if (scrollRef.current.scrollLeft >= scrollWidth - clientWidth) {
        scrollRef.current.scrollLeft = 0;
      } else {
        scrollRef.current.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);

    return () => clearInterval(interval);
  }, [isScrolling]);

  const platforms = ['抖音', '快手', '小红书', 'B站'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search with:', searchParams);
  };

  return (
    <div className="space-y-6">
      {/* 搜索区域 */}
      <div className="p-8 bg-slate-900/50 backdrop-blur-xl rounded-xl">
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          {/* 平台选择 */}
          <div className="relative">
            <select
              value={searchParams.platform}
              onChange={(e) => setSearchParams(prev => ({ ...prev, platform: e.target.value }))}
              className="appearance-none bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
            <span className="material-icons-round absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              expand_more
            </span>
          </div>

          {/* 搜索输入框 */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchParams.keyword}
              onChange={(e) => setSearchParams(prev => ({ ...prev, keyword: e.target.value }))}
              placeholder="搜索作者昵称或关键词"
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <span className="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
          </div>

          {/* 搜索按钮 */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            搜索
          </button>
        </form>
      </div>

      {/* 原有的个人资料卡片 */}
      <div className="p-8 bg-slate-900/50 backdrop-blur-xl rounded-xl">
        {/* 作者基本信息 */}
        <div className="flex items-start space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-800">
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
              <span className="text-slate-400">
                <span className="material-icons-round text-sm">location_on</span>
                {profile.location}
              </span>
            </div>
            <p className="text-slate-300 mb-4">{profile.description}</p>
            <div className="flex items-center space-x-6">
              <div className="text-red-500">
                <span className="text-lg font-bold">粉丝：</span>
                <span className="text-2xl font-bold">{profile.followers}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 创作领域 */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4">主要创作领域</h2>
          <div className="flex space-x-3">
            {profile.categories.map((category, index) => (
              <span
                key={index}
                className={`px-4 py-1.5 rounded-full text-white ${category.color}`}
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>

        {/* 代表作品 */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">代表作品</h2>
          <div 
            ref={scrollRef}
            className="flex space-x-4 overflow-x-hidden relative"
            onMouseEnter={() => setIsScrolling(true)}
            onMouseLeave={() => setIsScrolling(false)}
          >
            {profile.works.map((work) => (
              <motion.div
                key={work.id}
                className="flex-none w-80 bg-slate-800/50 rounded-lg overflow-hidden hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer"
                onClick={() => setSelectedWork(work)}
              >
                <div className="h-48 bg-slate-700 overflow-hidden">
                  <img 
                    src={work.coverUrl} 
                    alt={work.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 truncate">{work.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span className="flex items-center space-x-1">
                      <span className="material-icons-round text-base">thumb_up</span>
                      <span>{work.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="material-icons-round text-base">chat_bubble</span>
                      <span>{work.comments.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="material-icons-round text-base">share</span>
                      <span>{work.shares.toLocaleString()}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 作品详情弹窗 */}
      <AnimatePresence>
        {selectedWork && (
          <WorkDetailModal 
            work={selectedWork} 
            onClose={() => setSelectedWork(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
} 