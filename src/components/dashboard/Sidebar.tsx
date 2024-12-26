"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { 
    name: '仪表盘', 
    path: '/dashboard', 
    icon: 'dashboard'
  },
  { 
    name: '用户管理', 
    path: '/dashboard/users', 
    icon: 'group'
  },
  { 
    name: '数据分析', 
    path: '/dashboard/analytics', 
    icon: 'analytics'
  },
  {
    name: 'Agent调度中心',
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
    icon: 'settings'
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-slate-900/50 backdrop-blur-xl w-64 border-r border-slate-700/50 h-full flex flex-col">
      <div className="h-4" />
      
      <div className="flex-1 p-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === item.path
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className={`material-icons-round text-xl ${
                  pathname === item.path
                    ? 'text-blue-400'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>

              {item.subItems && (
                <div className="ml-6 mt-1 space-y-1">
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-slate-700/50">
        <div className="flex items-center space-x-3 text-slate-400">
          <span className="material-icons-round text-xl">info</span>
          <span className="text-sm">版本 1.0.0</span>
        </div>
      </div>
    </aside>
  );
} 