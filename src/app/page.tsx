"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 调用初始化接口
    fetch('/api/init-db')
      .then(response => response.json())
      .then(data => {
        console.log('数据库初始化结果:', data);
      })
      .catch(error => {
        console.error('初始化数据库失败:', error);
      });
  }, []);

  return (
    <div>
      <h1>AI+全维智析数据中枢</h1>
    </div>
  );
}
