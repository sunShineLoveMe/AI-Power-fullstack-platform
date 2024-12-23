import nodemailer from 'nodemailer';
import { RateLimiter } from '@/lib/rateLimiter';

// 邮件配置
const MAIL_CONFIG = {
  service: 'QQ',
  poolConfig: {
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 3
  },
  rateLimit: {
    windowMs: 60000,  // 1分钟
    maxRequests: 30   // 最大请求数
  },
  templates: {
    verification: {
      subject: '验证您的邮箱地址',
      tokenExpiry: 24 * 60 * 60 * 1000 // 24小时
    }
  }
};

// 创建频率限制器实例
const emailRateLimiter = new RateLimiter({
  windowMs: MAIL_CONFIG.rateLimit.windowMs,
  maxRequests: MAIL_CONFIG.rateLimit.maxRequests
});

// 创建邮件传输器
export const transporter = nodemailer.createTransport({
  service: MAIL_CONFIG.service,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  ...MAIL_CONFIG.poolConfig
});

// 验证邮件配置
export async function verifyMailConfig() {
  try {
    await transporter.verify();
    console.log('邮件服务器配置成功!');
    return true;
  } catch (error) {
    console.error('邮件服务器配置错误:', error);
    return false;
  }
}

// 生成验证令牌
export const generateVerificationToken = (): string => {
  const tokenLength = 32;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  
  for (let i = 0; i < tokenLength; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return token;
};

// 获取验证邮件HTML模板
function getVerificationEmailTemplate(verificationLink: string): string {
  return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
        <h1 style="color: #333; text-align: center; margin-bottom: 30px;">欢迎注册栉云科技！</h1>
        
        <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            感谢您注册我们的服务。请点击下面的按钮验证您的邮箱地址：
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background-color: #0070f3; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold;
                      display: inline-block;">
              验证邮箱
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            如果按钮无法点击，请复制以下链接到浏览器：<br/>
            <a href="${verificationLink}" style="color: #0070f3; word-break: break-all;">
              ${verificationLink}
            </a>
          </p>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            • 此链接24小时内有效<br/>
            • 如果您没有注册账号，请忽略此邮件<br/>
            • 请勿回复此邮件，如需帮助请联系客服
          </p>
        </div>
      </div>
    </div>
  `;
}

// 发送验证邮件
export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  try {
    // 检查频率限制
    if (!emailRateLimiter.tryRequest()) {
      throw new Error('发送频率超限，请稍后再试');
    }

    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: `"栉云科技" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: MAIL_CONFIG.templates.verification.subject,
      html: getVerificationEmailTemplate(verificationLink),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('邮件发送成功:', info.messageId);
    return true;
  } catch (error) {
    console.error('邮件发送失败:', error);
    throw error;
  }
}