"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { 
    name: '仪表盘', 
    path: '/dashboard', 
    icon: 'dashboard'
  },
  
  {
    name: '全域画像',
    path: '/dashboard/portrait',
    icon: 'hub',
    subItems: [
      {
        name: '用户画像',
        path: '/dashboard/portrait/user',
        icon: 'person_search'
      },
      {
        name: '地域画像',
        path: '/dashboard/portrait/region',
        icon: 'location_on'
      }
    ]
  },
  {
    name: '商业价值',
    path: '/dashboard/business',
    icon: 'trending_up',
    subItems: [
      {
        name: '热词洞察',
        path: '/dashboard/business/hotwords',
        icon: 'trending_flat'
      }
    ]
  },
  {
    name: '智能营销',
    path: '/dashboard/marketing',
    icon: 'campaign',
    subItems: [
      {
        name: '辅助决策',
        path: '/dashboard/marketing/decision',
        icon: 'psychology'
      },
      {
        name: '营销推广',
        path: '/dashboard/marketing/promotion',
        icon: 'ads_click'
      },
      {
        name: '商机洞察',
        path: '/dashboard/marketing/opportunity',
        icon: 'lightbulb'
      }
    ]
  },
  {
    name: '全维数据',
    path: '/dashboard/analytics',
    icon: 'data_exploration',
    subItems: [
      {
        name: '热词中心',
        path: '/dashboard/analytics/hotwords',
        icon: 'tag'
      },
      {
        name: '热度趋势',
        path: '/dashboard/analytics/trends',
        icon: 'trending_up'
      },
      {
        name: '关联分析',
        path: '/dashboard/analytics/correlation',
        icon: 'hub'
      }
    ]
  },
  {
    name: '智能体调度',
    path: '/dashboard/agent',
    icon: 'precision_manufacturing',
    subItems: [
      {
        name: '工作流编排',
        path: '/dashboard/agent/workflow',
        icon: 'account_tree'
      },
      {
        name: 'Agent管理',
        path: '/dashboard/agent/management',
        icon: 'smart_toy'
      },
      {
        name: '任务监控',
        path: '/dashboard/agent/monitor',
        icon: 'monitor'
      }
    ]
  },
  { 
    name: '系统设置', 
    path: '/dashboard/settings', 
    icon: 'settings',
    subItems: [
      {
        name: '模型中心',
        path: '/dashboard/settings/models',
        icon: 'model_training'
      },
      {
        name: '算法中心',
        path: '/dashboard/settings/algorithms',
        icon: 'schema'
      },
      {
        name: '定时任务',
        path: '/dashboard/settings/scheduler',
        icon: 'schedule'
      }
    ]
  },
];

// 修改展开状态管理，设置默认全部展开
const useExpandedState = () => {
  // 获取所有带有子菜单的路径作为初始展开状态
  const initialExpandedItems = menuItems
    .filter(item => item.subItems)
    .map(item => item.path);

  const [expandedItems, setExpandedItems] = useState<string[]>(initialExpandedItems);

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  return { expandedItems, toggleExpand };
};

export default function Sidebar() {
  const pathname = usePathname();
  const { expandedItems, toggleExpand } = useExpandedState();

  return (
    <aside className="bg-slate-900/50 backdrop-blur-xl w-64 border-r border-slate-700/50 h-full flex flex-col">
      <div className="h-4" />
      
      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.path}>
              <div
                onClick={() => item.subItems && toggleExpand(item.path)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  pathname === item.path
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`material-icons-round text-xl ${
                    pathname === item.path
                      ? 'text-blue-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.subItems && (
                  <span className={`material-icons-round text-lg transform transition-transform duration-200 ${
                    expandedItems.includes(item.path) ? 'rotate-180' : ''
                  }`}>
                    expand_more
                  </span>
                )}
              </div>

              <AnimatePresence>
                {item.subItems && expandedItems.includes(item.path) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-6 mt-1 space-y-1 overflow-hidden"
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                          pathname === subItem.path
                            ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <span className={`material-icons-round text-lg ${
                          pathname === subItem.path
                            ? 'text-blue-400'
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {subItem.icon}
                        </span>
                        <span className="font-medium text-sm">{subItem.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-slate-700/50 flex-shrink-0">
        <div className="flex items-center space-x-3 text-slate-400">
          <span className="material-icons-round text-xl">info</span>
          <span className="text-sm">版本 1.0.0</span>
        </div>
      </div>
    </aside>
  );
} 