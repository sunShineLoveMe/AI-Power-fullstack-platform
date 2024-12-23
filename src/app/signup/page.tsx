"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '注册失败');
      }

      setError(null);
      router.push('/verify-email-notice');
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">创建账户</h1>
          <p className="text-sm text-muted-foreground">
            输入您的信息以创建账户
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              用户名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="请输入邮箱"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="请输入密码"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "注册中..." : "注册"}
          </Button>
        </form>

        <p className="px-8 text-center text-sm text-muted-foreground">
          已有账户？{" "}
          <Link href="/login" className="underline hover:text-primary">
            登录
          </Link>
        </p>
      </div>
    </div>
  );
}