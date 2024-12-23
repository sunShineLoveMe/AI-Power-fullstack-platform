export default function BottomBar() {
  return (
    <footer className="bg-[#000066]/80 backdrop-blur-lg shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-white/70">
            © 2024 栉云科技. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 