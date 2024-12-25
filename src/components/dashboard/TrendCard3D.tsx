import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 定义卡片数据类型
interface TrendData {
  id: number;
  type: 'time' | 'user' | 'content' | 'spread';
  title: string;
  icon: string;
  trends: {
    label: string;
    value: string;
    change?: 'up' | 'down' | 'same';
  }[];
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

// 生成模拟数据
const generateMockTrendData = (): TrendData[] => [
  {
    id: 1,
    type: 'time',
    title: '时间维度趋势',
    icon: 'schedule',
    color: {
      primary: 'from-blue-500',
      secondary: 'to-blue-700',
      gradient: 'bg-gradient-to-br'
    },
    trends: [
      { label: '本周热门话题', value: '#时尚穿搭', change: 'up' },
      { label: '视频趋势', value: '视频笔记热度上升45%', change: 'up' },
      { label: '热门创作者', value: '@时尚博主', change: 'same' }
    ]
  },
  {
    id: 2,
    type: 'user',
    title: '用户行为分析',
    icon: 'group',
    color: {
      primary: 'from-green-500',
      secondary: 'to-green-700',
      gradient: 'bg-gradient-to-br'
    },
    trends: [
      { label: '最受欢迎话题', value: '#美食探店', change: 'up' },
      { label: '用户互动最高', value: '#生活方式', change: 'up' },
      { label: '新增热门标签', value: '#家居布置', change: 'same' }
    ]
  },
  {
    id: 3,
    type: 'content',
    title: '内容维度分析',
    icon: 'article',
    color: {
      primary: 'from-purple-500',
      secondary: 'to-purple-700',
      gradient: 'bg-gradient-to-br'
    },
    trends: [
      { label: '热门标题关键词', value: '#旅行攻略', change: 'up' },
      { label: '美妆类热词', value: '#新品试用', change: 'down' },
      { label: '科技类热词', value: '#数码评测', change: 'up' }
    ]
  },
  {
    id: 4,
    type: 'spread',
    title: '传播维度洞察',
    icon: 'share',
    color: {
      primary: 'from-orange-500',
      secondary: 'to-orange-700',
      gradient: 'bg-gradient-to-br'
    },
    trends: [
      { label: '最具传播力', value: '#创意特效', change: 'up' },
      { label: '热搜引发话题', value: '#夏季穿搭', change: 'up' },
      { label: '地域传播热点', value: '#本地美食', change: 'same' }
    ]
  }
];

export function TrendCard3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [trends] = useState(generateMockTrendData());

  // 自动轮播
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trends.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, trends.length]);

  // 3D 轮播动画变体
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    })
  };

  return (
    <div className="relative h-[400px] w-full perspective-1000">
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={currentIndex}
          custom={1}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`absolute inset-0 ${trends[currentIndex].color.gradient} 
            ${trends[currentIndex].color.primary} ${trends[currentIndex].color.secondary}
            rounded-2xl p-6 shadow-xl backdrop-blur-xl
            border border-white/10 transform-gpu`}
        >
          {/* 卡片内容 */}
          <div className="relative h-full">
            {/* 头部 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="material-icons-round text-3xl text-white/90">
                  {trends[currentIndex].icon}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {trends[currentIndex].title}
                </h3>
              </div>
              <div className="flex space-x-2">
                {trends.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${idx === currentIndex ? 'bg-white' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </div>

            {/* 趋势列表 */}
            <div className="space-y-4">
              {trends[currentIndex].trends.map((trend, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-lg p-4 backdrop-blur-lg
                    transform transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{trend.label}</span>
                    <span className={`material-icons-round text-sm
                      ${trend.change === 'up' ? 'text-green-400' :
                        trend.change === 'down' ? 'text-red-400' :
                        'text-white/60'}`}
                    >
                      {trend.change === 'up' ? 'trending_up' :
                       trend.change === 'down' ? 'trending_down' :
                       'trending_flat'}
                    </span>
                  </div>
                  <div className="text-xl font-semibold text-white mt-2">
                    {trend.value}
                  </div>
                </div>
              ))}
            </div>

            {/* 光影效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent 
              via-white/5 to-transparent animate-shimmer pointer-events-none" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 控制按钮 */}
      <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 
            backdrop-blur-lg transition-all"
        >
          <span className="material-icons-round text-white">
            {isAutoPlay ? 'pause' : 'play_arrow'}
          </span>
        </button>
      </div>
    </div>
  );
} 