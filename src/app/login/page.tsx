"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  // 新增密码显示状态

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        window.location.replace('/dashboard');
      } else {
        setError(data.message || "登录失败");
      }
    } catch (error) {
      console.error('登录错误:', error);
      setError("登录失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container relative min-h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* 动态背景 */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse delay-75" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1100px] flex items-center justify-between gap-20">
        {/* 左侧 Logo 和标题区域 */}
        <div className="flex-1 flex flex-col items-center space-y-8 animate-fade-in">
          <div className="relative w-48 h-48 group perspective-1000">
            <div className="relative w-full h-full transition-all duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-[0_8px_32px_rgb(59,130,246,0.5)] backface-hidden">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={128}
                  height={128}
                  className="object-contain drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-400 shadow-[0_8px_32px_rgb(59,130,246,0.5)] backface-hidden rotate-y-180">
                <div className="w-24 h-24 border-8 border-white rounded-full border-t-transparent animate-spin" />
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-[4px] bg-blue-500 blur-[4px]" />
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter">
              <span className="inline-block animate-text-gradient bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-[200%_auto] bg-clip-text text-transparent">
                AI+全维智析数据中枢
              </span>
            </h1>
            <div className="h-[2px] w-48 mx-auto bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <p className="text-lg text-slate-400">
              智能数据分析 · 全维度洞察 · 实时决策支持
            </p>
          </div>
        </div>

        {/* 右侧登录表单区域 */}
        <div className="w-[400px] p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 
          shadow-[0_0_30px_rgba(59,130,246,0.1)] 
          animate-fade-up">
          <div className="flex flex-col space-y-2 text-center mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-100">账号登录</h2>
            <p className="text-sm text-slate-400">
              输入您的邮箱和密码登录
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-slate-300">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 rounded-lg
                  bg-slate-800/50
                  text-slate-100
                  border border-slate-700/50
                  placeholder-slate-500
                  focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                  hover:border-slate-600/50
                  transition-all duration-200"
                placeholder="请输入邮箱"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-slate-300">
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 rounded-lg
                    bg-slate-800/50
                    text-slate-100
                    border border-slate-700/50
                    placeholder-slate-500
                    focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                    hover:border-slate-600/50
                    transition-all duration-200
                    pr-10"
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-slate-400 hover:text-slate-300
                    focus:outline-none focus:text-slate-300
                    transition-colors"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 mt-2 
                bg-gradient-to-r from-blue-600 to-blue-500 
                hover:from-blue-500 hover:to-blue-600
                text-white font-medium
                shadow-lg shadow-blue-600/20
                transition-all duration-200
                rounded-lg
                group relative overflow-hidden"
              disabled={loading}
            >
              <span className="relative z-10">
                {loading ? "登录中..." : "登录"}
              </span>
              <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-transform duration-300" />
            </Button>
          </form>

          <div className="flex flex-col space-y-2 text-center text-sm mt-6">
            <Link 
              href="/forgot-password"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              忘记密码？
            </Link>
            <p className="text-slate-400">
              还没有账号？
              <Link 
                href="/signup"
                className="text-blue-400 hover:text-blue-300 transition-colors ml-1"
              >
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}