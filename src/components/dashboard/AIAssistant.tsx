"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: 实现与AI大模型的实际通信
      const response = await new Promise(resolve => 
        setTimeout(() => resolve("这是AI助手的模拟回复"), 1000)
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response as string,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI响应错误:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* AI助手图标 */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 h-16 rounded-full 
          bg-gradient-to-r from-blue-500 to-blue-600 text-white
          shadow-[0_0_20px_rgba(59,130,246,0.5)] 
          hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]
          transition-all duration-500 hover:scale-110 
          flex items-center justify-center group
          border border-blue-400/20 backdrop-blur-sm
          animate-pulse-subtle relative"
      >
        {/* 背景发光效果 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r 
          from-blue-500/40 to-blue-600/40 blur-md" />
        
        {/* 图标容器 */}
        <div className="relative flex items-center justify-center">
          {/* 主图标 */}
          <span className="material-icons-round text-3xl group-hover:scale-90 
            transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            data_exploration
          </span>
          
          {/* 辅助图标 - 小圆点装饰 */}
          <div className="absolute -top-1 -right-1 w-3 h-3 
            bg-green-400 rounded-full animate-pulse 
            shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
          
          {/* 辅助图标 - 环绕圆环 */}
          <div className="absolute inset-[-4px] rounded-full border-2 
            border-white/20 border-dashed animate-spin-slow" />
        </div>
      </button>

      {/* 对话界面 - 修改定位方式 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed right-0 top-0 w-[400px] h-[calc(100vh-theme(spacing.16))] 
              bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 
              shadow-2xl z-50 flex flex-col"
            style={{
              marginTop: 'var(--navbar-height)', // 需要在全局CSS中定义这个变量
            }}
          >
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-4 py-3 
              border-b border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-100">AI 助手</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <span className="material-icons-round text-slate-400">close</span>
              </button>
            </div>

            {/* 对话内容区 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600/20 border border-blue-500/20 text-blue-100'
                        : 'bg-slate-800/50 border border-slate-700/50 text-slate-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/50 border border-slate-700/50 
                    rounded-lg p-3 text-slate-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t border-slate-700/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="输入您的问题..."
                  className="flex-1 bg-slate-800/50 border border-slate-700/50 
                    rounded-lg px-4 py-2 text-slate-200 placeholder-slate-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg
                    hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors flex items-center space-x-2"
                >
                  <span className="material-icons-round text-sm">send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 