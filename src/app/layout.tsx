import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import StyledJsxRegistry from "./registry";


// 这两种字体都是来自next.js的字体优化系统,通过next/font/google来加载
// 好处：1. 字体加载更快 2. 字体加载更少
const geistSans = Geist({
  variable: "--font-geist-sans", // 设置css变量名
  subsets: ["latin"], //只加载拉丁字符集
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI智能Saas平台",
  description: "栉云科技加速企业数字化转型",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        {/* <StyledJsxRegistry>{children}</StyledJsxRegistry> */}
      </body>
    </html>
  );
}
