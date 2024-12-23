"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import NavbarLogo from '@/public/images/navbar.png';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  return (
    <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="relative flex-shrink-0 flex items-center space-x-3">
              <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur animate-pulse" />
              
              <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-blue-500/50">
                <Image
                  src="/images/narbar.png"
                  alt="AI Logo"
                  width={40}
                  height={40}
                  className="object-cover transform hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>

              <div className="w-px h-8 bg-slate-700/50" />
              
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                AI+全维智析数据中枢
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg 
                bg-slate-800/50 hover:bg-slate-700/50 
                text-slate-300 hover:text-white
                border border-slate-700/50 hover:border-slate-600/50
                transition-all duration-200"
            >
              <span className="material-icons-round text-xl">logout</span>
              <span>退出登录</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 