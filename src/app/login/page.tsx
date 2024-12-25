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

      console.log("请求响应....");
      console.log(response);

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
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse delay-75" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1100px] flex items-center justify-between gap-20">
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
              <input
                type="password"
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
                  transition-all duration-200"
                placeholder="请输入密码"
              />
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