"use client";

import React, { useEffect, useState } from 'react';

const DiagnosticPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // 检查脚本是否已加载
    if (document.getElementById('dify-script')) {
      setIsScriptLoaded(true);
      return;
    }

    // 加载主脚本
    const script = document.createElement('script');
    script.id = 'dify-script';
    script.src = 'http://localhost/embed.min.js';
    script.defer = true;
    
    // 配置脚本
    const config = document.createElement('script');
    config.textContent = `
      window.difyChatbotConfig = {
        token: '6R4m3gYV1zXcTVLz',
        baseUrl: 'http://localhost',
        // 添加自动打开配置
        open: ${isOpen},
        // 添加事件处理
        onLoaded: () => {
          console.log('Dify chatbot loaded');
        },
        onOpen: () => {
          console.log('Dify chatbot opened');
        },
        onClose: () => {
          setIsOpen(false);
        }
      };
    `;

    // 样式配置
    const style = document.createElement('style');
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #19223c !important;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5) !important;
        transition: all 0.3s ease !important;
      }
      #dify-chatbot-bubble-button:hover {
        background-color: #2563eb !important;
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.8) !important;
        transform: scale(1.05) !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        border-radius: 1rem !important;
        background: rgba(30, 41, 59, 0.95) !important;
        backdrop-filter: blur(16px) !important;
        border: 1px solid rgba(71, 85, 105, 0.5) !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
      }
    `;

    // 按顺序添加配置和脚本
    document.head.appendChild(config);
    document.head.appendChild(style);
    document.body.appendChild(script);

    script.onload = () => {
      setIsScriptLoaded(true);
    };

    return () => {
      // 清理函数
      document.head.removeChild(config);
      document.head.removeChild(style);
      document.body.removeChild(script);
    };
  }, []); // 只在组件挂载时加载一次

  // 处理对话框打开
  const handleOpenChat = () => {
    if (isScriptLoaded && window.difyChatbot) {
      window.difyChatbot.open();
    }
    setIsOpen(true);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          诊断智能专家问答
        </h1>
        <p className="text-slate-400">
          欢迎使用AI诊断助手，点击下方按钮开始咨询。
        </p>
      </div>

      {/* 发起对话按钮 */}
      {/* <button
        onClick={handleOpenChat}
        className="group flex items-center space-x-2 px-6 py-3
          bg-gradient-to-r from-blue-500 to-blue-600
          hover:from-blue-600 hover:to-blue-700
          text-white rounded-lg
          shadow-[0_0_20px_rgba(59,130,246,0.5)]
          hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]
          transition-all duration-300 hover:scale-105
          border border-blue-400/20 backdrop-blur-sm"
      >
        <span className="material-icons-round text-2xl group-hover:rotate-12 transition-transform">
          smart_toy
        </span>
        <span className="font-medium">发起智能诊断对话</span>
      </button> */}

      {/* 功能说明卡片 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
          <div className="text-blue-400 mb-4">
            <span className="material-icons-round text-3xl">psychology</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">智能诊断</h3>
          <p className="text-slate-400">通过AI技术，为您提供专业的诊断建议和解决方案</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
          <div className="text-blue-400 mb-4">
            <span className="material-icons-round text-3xl">history_edu</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">知识库支持</h3>
          <p className="text-slate-400">基于海量专业知识库，确保诊断建议的准确性和可靠性</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
          <div className="text-blue-400 mb-4">
            <span className="material-icons-round text-3xl">support_agent</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">实时互动</h3>
          <p className="text-slate-400">支持多轮对话，深入理解您的需求，提供个性化建议</p>
        </div>
      </div>
    </div>
  );
};

// 添加全局类型声明
declare global {
  interface Window {
    difyChatbotConfig: any;
    difyChatbot: {
      open: () => void;
      close: () => void;
    };
  }
}

export default DiagnosticPage; 