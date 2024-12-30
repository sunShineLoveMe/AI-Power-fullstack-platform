import { motion } from 'framer-motion';

interface WorkDetail {
  id: number;
  title: string;
  views: number;
  comments: number;
  shares: number;
  coverUrl: string;
  description: string;
  playCount: number;
  completionRate: number;
  retentionData: number[];
  tags: string[];
}

interface WorkDetailModalProps {
  work: WorkDetail;
  onClose: () => void;
}

export default function WorkDetailModal({ work, onClose }: WorkDetailModalProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 rounded-xl w-[90%] max-w-4xl max-h-[85vh] overflow-hidden"
      >
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">{work.title}</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <span className="material-icons-round">close</span>
          </button>
        </div>

        {/* 内容区域 */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 60px)' }}>
          {/* 视频预览区 */}
          <div className="aspect-video bg-slate-800 rounded-lg mb-6 relative group">
            <img 
              src={work.coverUrl} 
              alt={work.title} 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-icons-round text-6xl text-white">play_circle</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* 数据指标 */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-4">播放量</h3>
                <div className="text-3xl font-bold text-blue-500">
                  {work.playCount.toLocaleString()} 次
                </div>
              </div>

              {/* 完播率 */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-4">完播率</h3>
                <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${work.completionRate}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-blue-500 h-full"
                  />
                </div>
                <div className="text-right text-sm text-slate-400 mt-1">
                  {work.completionRate}%
                </div>
              </div>
            </div>

            {/* 观众留存率图表 */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">观众留存率</h3>
              <div className="h-40 flex items-end space-x-2">
                {work.retentionData.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="w-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors rounded-t"
                    />
                    <span className="text-xs text-slate-400 mt-1">{index + 1}0%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 作品描述 */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-3">作品描述</h3>
            <p className="text-slate-300">{work.description}</p>
          </div>

          {/* 相关话题 */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-3">相关话题</h3>
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 transition-colors"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 