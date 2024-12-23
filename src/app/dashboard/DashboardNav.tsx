"use client";

export default function DashboardNav() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">栉云科技</span>
            </div>
          </div>
          <div className="flex items-center">
            {/* 这里可以添加用户头像和下拉菜单 */}
          </div>
        </div>
      </div>
    </nav>
  );
}