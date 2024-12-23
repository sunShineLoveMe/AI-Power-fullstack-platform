"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function VerifyEmailNoticePage() {
    const router = useRouter();

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">验证邮件已发送</h1>
                    <p className="text-sm text-muted-foreground">
                        我们已向您的邮箱发送了验证链接，请查收并点击链接完成验证。
                    </p>
                    
                    <div className="bg-blue-50 text-blue-700 p-4 rounded-md mt-4">
                        <p>提示：</p>
                        <ul className="text-sm list-disc list-inside">
                            <li>验证邮件可能会被归类到垃圾邮件文件夹</li>
                            <li>验证链接24小时内有效</li>
                            <li>如果长时间未收到，可以尝试重新注册</li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-4 mt-6">
                        <Button
                            onClick={() => router.push('/login')}
                            variant="outline"
                            className="w-full"
                        >
                            返回登录
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 