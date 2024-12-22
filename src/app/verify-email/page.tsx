"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('正在验证邮箱...');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('无效的验证链接');
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('邮箱验证成功！');
        } else {
          setStatus('error');
          setMessage(data.message || '验证失败，请重试');
        }
      } catch (error) {
        setStatus('error');
        setMessage('验证过程中发生错误');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">邮箱验证</h1>
          
          <div className={`p-4 rounded-md ${
            status === 'verifying' ? 'bg-blue-50 text-blue-700' :
            status === 'success' ? 'bg-green-50 text-green-700' :
            'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>

          {status !== 'verifying' && (
            <div className="flex flex-col space-y-4 mt-4">
              <Button
                onClick={() => router.push('/login')}
                className="w-full"
              >
                {status === 'success' ? '前往登录' : '返回首页'}
              </Button>
              
              {status === 'error' && (
                <p className="text-sm text-muted-foreground">
                  如果您需要重新验证，请联系管理员或重新注册
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}