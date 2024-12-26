import { Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// 添加模拟数据生成函数
const generateMockData = (platform: string) => {
  // 调整基础数据范围，扩大覆盖面
  const baseRanges = {
    xiaohongshu: {
      liked: { min: 8000, max: 150000 },    // 扩大点赞范围
      collected: { min: 3000, max: 80000 },  // 扩大收藏范围
      comment: { min: 1500, max: 40000 },    // 扩大评论范围
      share: { min: 800, max: 20000 }        // 扩大分享范围
    },
    douyin: {
      liked: { min: 15000, max: 500000 },    // 抖音互动量普遍较大
      collected: { min: 8000, max: 200000 },
      comment: { min: 5000, max: 100000 },
      share: { min: 3000, max: 80000 }
    },
    bilibili: {
      liked: { min: 10000, max: 300000 },    // B站数据介于两者之间
      collected: { min: 5000, max: 120000 },
      comment: { min: 3000, max: 80000 },
      share: { min: 2000, max: 40000 }
    }
  };

  const ranges = baseRanges[platform as keyof typeof baseRanges] || baseRanges.xiaohongshu;
  
  // 更新热词数据，增加多样性
  const mockHotWords = [
    // 小红书热词
    ...(platform === 'xiaohongshu' ? [
      { word: '穿搭技巧', change: 'up' },
      { word: '护肤分享', change: 'down' },
      { word: '美食探店', change: 'up' },
      { word: '生活方式', change: 'same' },
      { word: '家居布置', change: 'up' }
    ] : []),
    
    // 抖音热词
    ...(platform === 'douyin' ? [
      { word: '街头美食', change: 'up' },
      { word: '生活日常', change: 'down' },
      { word: '舞蹈视频', change: 'up' },
      { word: '搞笑短剧', change: 'same' },
      { word: '宠物日常', change: 'up' }
    ] : []),
    
    // B站热词
    ...(platform === 'bilibili' ? [
      { word: '二次元', change: 'up' },
      { word: '游戏实况', change: 'down' },
      { word: '动漫鉴赏', change: 'up' },
      { word: '科技评测', change: 'same' },
      { word: '音乐推荐', change: 'up' }
    ] : [])
  ].map(item => {
    // 使用指数分布来创造更真实的数据差异
    const exponentialRandom = (min: number, max: number) => {
      const lambda = Math.random();
      return Math.floor(min + (max - min) * (1 - Math.exp(-lambda * 5)));
    };

    // 为每个维度生成数据，并确保数据之间有合理的关联性
    const likedCount = exponentialRandom(ranges.liked.min, ranges.liked.max);
    const collectedRatio = 0.3 + Math.random() * 0.3; // 收藏数约为点赞数的30%-60%
    const commentRatio = 0.1 + Math.random() * 0.2;   // 评论数约为点赞数的10%-30%
    const shareRatio = 0.05 + Math.random() * 0.15;   // 分享数约为点赞数的5%-20%

    return {
      ...item,
      likedCount,
      collectedCount: Math.floor(likedCount * collectedRatio),
      commentCount: Math.floor(likedCount * commentRatio),
      shareCount: Math.floor(likedCount * shareRatio)
    };
  });

  // 按照综合热度排序
  mockHotWords.sort((a, b) => {
    const getHeatScore = (item: any) => 
      item.likedCount + 
      item.collectedCount * 2 + 
      item.commentCount * 3 + 
      item.shareCount * 4;
    return getHeatScore(b) - getHeatScore(a);
  });

  return {
    platform,
    name: platform === 'xiaohongshu' ? '小红书' : 
          platform === 'douyin' ? '抖音' : 'B站',
    hotWords: mockHotWords
  };
};

interface RadarChartProps {
  platform: string;
}

// 添加平台配色方案
const getPlatformColors = (platform: string) => {
  const colors = {
    xiaohongshu: {
      primary: 'rgba(255, 72, 72',    // 小红书红色
      secondary: 'rgba(255, 144, 144'
    },
    douyin: {
      primary: 'rgba(45, 211, 255',   // 抖音蓝色
      secondary: 'rgba(131, 231, 255'
    },
    bilibili: {
      primary: 'rgba(251, 114, 153',  // B站粉色
      secondary: 'rgba(255, 173, 196'
    }
  };

  return colors[platform as keyof typeof colors] || colors.xiaohongshu;
};

export function RadarChart({ platform }: RadarChartProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [scanAngle, setScanAngle] = useState(0);
  const [currentData, setCurrentData] = useState(generateMockData(platform));
  const [previousData, setPreviousData] = useState(currentData);

  // 数据更新间隔（10秒）
  const DATA_UPDATE_INTERVAL = 10000;
  // 扫描速度（降低到每帧0.5度）
  const SCAN_SPEED = 0.5;

  // 数据平滑更新
  useEffect(() => {
    const updateData = () => {
      setPreviousData(currentData);
      setCurrentData(generateMockData(platform));
      setAnimationProgress(0);
    };

    const dataTimer = setInterval(updateData, DATA_UPDATE_INTERVAL);
    return () => clearInterval(dataTimer);
  }, [platform, currentData]);

  // 数据过渡动画
  useEffect(() => {
    const animate = () => {
      setAnimationProgress(prev => {
        const next = prev + 0.01; // 降低过渡速度
        return next > 1 ? 1 : next;
      });
    };

    const timer = setInterval(animate, 32); // 降低更新频率
    return () => clearInterval(timer);
  }, [currentData]);

  // 扫描动画
  useEffect(() => {
    const scanAnimation = () => {
      setScanAngle(prev => (prev + SCAN_SPEED) % 360);
    };

    const timer = setInterval(scanAnimation, 16);
    return () => clearInterval(timer);
  }, []);

  // 数据插值计算
  const interpolateData = (prev: any, next: any, progress: number) => {
    return next.hotWords.map((word: any, index: number) => ({
      ...word,
      likedCount: Math.round(prev.hotWords[index].likedCount + (word.likedCount - prev.hotWords[index].likedCount) * progress),
      collectedCount: Math.round(prev.hotWords[index].collectedCount + (word.collectedCount - prev.hotWords[index].collectedCount) * progress),
      commentCount: Math.round(prev.hotWords[index].commentCount + (word.commentCount - prev.hotWords[index].commentCount) * progress),
      shareCount: Math.round(prev.hotWords[index].shareCount + (word.shareCount - prev.hotWords[index].shareCount) * progress)
    }));
  };

  const interpolatedData = {
    ...currentData,
    hotWords: interpolateData(previousData, currentData, animationProgress)
  };

  const chartData = {
    labels: ['点赞数', '收藏数', '评论数', '分享数'],
    datasets: interpolatedData.hotWords.map((word: any, index: number) => ({
      label: word.word,
      data: [
        word.likedCount,
        word.collectedCount,
        word.commentCount,
        word.shareCount
      ],
      backgroundColor: `${getPlatformColors(platform).secondary}, ${0.15 - index * 0.02})`,
      borderColor: `${getPlatformColors(platform).primary}, ${0.8 - index * 0.1})`,
      borderWidth: 2,
      pointBackgroundColor: `${getPlatformColors(platform).primary}, ${0.8 - index * 0.1})`,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: `${getPlatformColors(platform).primary}, ${0.8 - index * 0.1})`,
      pointRadius: 4,
      pointHoverRadius: 6,
      lineTension: 0.4,
    }))
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1
        },
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)',
          circular: true,
          lineWidth: 1
        },
        pointLabels: {
          display: true,
          centerPointLabels: true,
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: 500
          }
        },
        ticks: {
          display: true,
          color: 'rgba(255, 255, 255, 0.5)',
          backdropColor: 'transparent',
          backdropPadding: 2,
          font: {
            size: 10,
            family: "'Inter', sans-serif",
            weight: 400
          },
          // 计算合适的步长
          stepSize: Math.ceil(Math.max(...interpolatedData.hotWords.slice(0, 5).flatMap(
            (word: any) => [
              word.likedCount, 
              word.collectedCount, 
              word.commentCount, 
              word.shareCount
            ]
          )) / 5),
          count: 5, // 限制刻度数量
          showLabelBackdrop: false // 移除刻度标签的背景
        },
        min: 0, // 确保从0开始
        // 动态计算最大值，并向上取整到最接近的整数
        max: Math.ceil(Math.max(...interpolatedData.hotWords.slice(0, 5).flatMap(
          (word: any) => [
            word.likedCount, 
            word.collectedCount, 
            word.commentCount, 
            word.shareCount
          ]
        )) / 1000) * 1000 // 向上取整到最近的千位数
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: 500
          },
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
          weight: 600
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
          weight: 400
        },
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          title: function(context: any[]) {
            return context[0].label;
          },
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toLocaleString('zh-CN')}`;
          }
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.4, // 使线条更平滑
        fill: true // 填充区域
      },
      point: {
        borderWidth: 2,
        radius: 4,
        hoverRadius: 6,
        hitRadius: 8
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
      includeInvisible: true
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
      delay: (context: any) => context.dataIndex * 100
    },
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    }
  };

  // 在客户端注入样式
  useEffect(() => {
    const styles = `
      @keyframes ping-slow {
        0% {
          transform: scale(1);
          opacity: 0.2;
        }
        50% {
          transform: scale(1.05);
          opacity: 0.15;
        }
        100% {
          transform: scale(1);
          opacity: 0.2;
        }
      }

      .animate-ping-slow {
        animation: ping-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
    <div className="relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-500/5" />
      
      {/* 科技感扫描效果 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 旋转扫描线 */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `rotate(${scanAngle}deg)`,
            transformOrigin: 'center',
            transition: 'transform 0.1s linear'
          }}
        >
          <div className="absolute top-0 left-1/2 h-full w-[1px] origin-bottom"
            style={{
              background: `linear-gradient(to bottom, 
                transparent 0%,
                ${getPlatformColors(platform).primary}, 0.5) 50%,
                transparent 100%)`
            }}
          />
        </div>

        {/* 扫描光圈 */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                from ${scanAngle}deg,
                ${getPlatformColors(platform).primary}, 0.05) 0deg,
                transparent 45deg,
                transparent 360deg
              )`
            }}
          />
        </div>

        {/* 脉冲圆环 */}
        <div className="absolute inset-0 animate-ping-slow opacity-20">
          <div className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: `${getPlatformColors(platform).primary}, 0.2)`
            }}
          />
        </div>
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="relative h-[400px]">
        <Radar 
          data={chartData} 
          options={options}
          className="filter drop-shadow-lg relative z-10"
        />
      </div>
    </div>
  );
} 