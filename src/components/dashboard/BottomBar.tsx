export default function BottomBar() {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-400">
            © 2024 栉云科技. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200"
            >
              隐私政策
            </a>
            <a 
              href="#" 
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200"
            >
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 