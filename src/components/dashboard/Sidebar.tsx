"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems } from '@/config/menuItems';

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
  const router = useRouter();
  const { expandedItems, toggleExpand } = useExpandedState();

  // 处理菜单项点击
  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.subItems) {
      toggleExpand(item.path);
    } else {
      // 如果是仪表盘，跳转到 /dashboard
      if (item.path === '/') {
        router.push('/dashboard');
      } else {
        router.push(item.path);
      }
    }
  };

  return (
    <aside className="bg-slate-900/50 backdrop-blur-xl w-64 border-r border-slate-700/50 h-full flex flex-col">
      <div className="h-4" />
      
      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.path}>
              <div
                onClick={() => handleMenuClick(item)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  (pathname === item.path || (item.path === '/' && pathname === '/dashboard'))
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`material-icons-round text-xl ${
                    (pathname === item.path || (item.path === '/' && pathname === '/dashboard'))
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