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
    name: '系统设置', 
    path: '/dashboard/settings', 
    icon: 'settings'
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-slate-900/50 backdrop-blur-xl w-64 border-r border-slate-700/50">
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
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
          ))}
        </div>
      </div>
    </aside>
  );
} 