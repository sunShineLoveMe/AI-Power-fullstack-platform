"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { 
    name: '仪表盘', 
    path: '/dashboard', 
    icon: 'dashboard'  // 仪表盘图标
  },
  { 
    name: '用户管理', 
    path: '/dashboard/users', 
    icon: 'group'  // 用户组图标
  },
  { 
    name: '数据分析', 
    path: '/dashboard/analytics', 
    icon: 'analytics'  // 数据分析图标
  },
  { 
    name: '系统设置', 
    path: '/dashboard/settings', 
    icon: 'settings'  // 设置图标
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#000044]/50 backdrop-blur-lg w-64 shadow-lg">
      <div className="p-4">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                pathname === item.path
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="material-icons-round text-2xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
} 