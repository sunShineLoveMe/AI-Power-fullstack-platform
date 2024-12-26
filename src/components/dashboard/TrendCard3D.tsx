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
  const [rotation, setRotation] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [trends] = useState(generateMockTrendData());
  
  // 使用 requestAnimationFrame 实现匀速旋转
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;
    const rotationSpeed = 0.05; // 增加旋转速度，从 0.02 调整到 0.05

    const animate = (timestamp: number) => {
      if (!isAutoPlay) {
        lastTimestamp = timestamp;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const delta = timestamp - lastTimestamp;
      setRotation(prev => (prev + rotationSpeed * delta) % 360);
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoPlay]);

  // 更新样式注入
  useEffect(() => {
    const styles = `
      .carousel-stage {
        perspective: 2000px;
        perspective-origin: 50% 50%;
      }

      .carousel-container {
        transform-style: preserve-3d;
        transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .carousel-item {
        position: absolute;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .carousel-item::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.05)
        );
        border-radius: inherit;
        pointer-events: none;
      }

      .carousel-item::after {
        content: '';
        position: absolute;
        inset: -1px;
        background: linear-gradient(
          45deg,
          transparent,
          rgba(255, 255, 255, 0.15),
          transparent
        );
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .carousel-item:hover::after {
        opacity: 1;
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-5px) scale(1.02);
        }
      }
    `;

    let styleSheet: HTMLStyleElement | null = null;

    // 只在客户端执行
    if (typeof document !== 'undefined') {
      styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }

    // 清理函数
    return () => {
      if (styleSheet && document) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] flex items-center justify-center -mt-8">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-800/50 via-transparent to-transparent" />
      
      {/* 3D 舞台 */}
      <div className="carousel-stage w-[600px] h-[300px] relative">
        {/* 旋转容器 */}
        <div 
          className="carousel-container absolute w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transition: 'none' // 移除过渡效果，使用 requestAnimationFrame 控制
          }}
        >
          {trends.map((trend, index) => {
            const angle = (360 / trends.length) * index;
            const radius = 300; // 旋转半径

            return (
              <div
                key={trend.id}
                className={`
                  carousel-item w-[280px] h-[220px] 
                  ${trend.color.gradient} ${trend.color.primary} ${trend.color.secondary}
                  rounded-xl p-2.5 backdrop-blur-xl
                  shadow-[0_0_15px_rgba(255,255,255,0.1)]
                `}
                style={{
                  transform: `
                    translate(-50%, -50%)
                    rotateY(${angle}deg)
                    translateZ(${radius}px)
                  `,
                  left: '50%',
                  top: '50%',
                  transition: 'none', // 移除过渡效果
                  opacity: Math.cos((rotation - angle) * Math.PI / 180) > 0 ? 
                          Math.cos((rotation - angle) * Math.PI / 180) * 0.5 + 0.5 : 0
                }}
              >
                {/* 卡片内容布局 */}
                <div className="relative h-full flex flex-col">
                  <div className="flex items-center space-x-1.5 mb-2">
                    <span className="material-icons-round text-base text-white/90">
                      {trend.icon}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {trend.title}
                    </h3>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    {trend.trends.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/10 rounded-lg p-1.5
                          backdrop-blur-sm transition-transform
                          hover:scale-[1.02] duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-[10px]">
                            {item.label}
                          </span>
                          <span className={`
                            material-icons-round text-[8px]
                            ${item.change === 'up' ? 'text-green-400' :
                              item.change === 'down' ? 'text-red-400' :
                              'text-white/60'}
                          `}>
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
            );
          })}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
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