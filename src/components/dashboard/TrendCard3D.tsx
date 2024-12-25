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

  // 在客户端注入样式
  useEffect(() => {
    const styles = `
      .carousel-3d {
        perspective: 2000px;
        transform-style: preserve-3d;
      }

      .carousel-item {
        transform-style: preserve-3d;
        backface-visibility: hidden;
        transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `;

    // 只在客户端执行
    if (typeof document !== 'undefined') {
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);

      // 清理函数
      return () => {
        document.head.removeChild(styleSheet);
      };
    }
  }, []);

  return (
    <div className="relative w-full h-[380px] flex items-center justify-center -mt-8">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-800/50 via-transparent to-transparent" />
      
      {/* 3D 轮播容器 */}
      <div className="carousel-3d relative w-[500px] h-[300px]">
        {trends.map((trend, index) => (
          <div
            key={trend.id}
            className={`carousel-item absolute w-[280px] h-[220px] 
              left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              ${trend.color.gradient} ${trend.color.primary} ${trend.color.secondary}
              rounded-lg p-2.5 shadow-xl backdrop-blur-xl border border-white/10`}
            style={{
              transform: `
                translate(-50%, -50%) 
                rotateY(${(index - currentIndex) * (360 / trends.length)}deg)
                translateZ(250px)
              `,
              transformOrigin: 'center center',
              position: 'absolute',
              left: '50%',
              top: '50%',
              opacity: Math.abs(index - currentIndex) <= 1 ? 1 : 0.5,
            }}
          >
            {/* 调整卡片内容布局 */}
            <div className="relative h-full flex flex-col">
              {/* 头部 - 进一步减小间距 */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-1">
                  <span className="material-icons-round text-base text-white/90">
                    {trend.icon}
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {trend.title}
                  </h3>
                </div>
              </div>

              {/* 趋势列表 - 进一步减小间距和字体 */}
              <div className="space-y-1 flex-1">
                {trend.trends.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 rounded-md p-1 backdrop-blur-lg
                      transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-[10px]">{item.label}</span>
                      <span className={`material-icons-round text-[8px]
                        ${item.change === 'up' ? 'text-green-400' :
                          item.change === 'down' ? 'text-red-400' :
                          'text-white/60'}`}
                      >
                        {item.change === 'up' ? 'trending_up' :
                         item.change === 'down' ? 'trending_down' :
                         'trending_flat'}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 控制按钮 */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
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