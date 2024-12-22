import nodemailer from 'nodemailer';

// 创建邮件传输器
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// 验证邮件配置
transporter.verify(function (error, success) {
    if (error) {
        console.log('邮件服务器配置错误:', error);
    } else {
        console.log('邮件服务器配置成功!');
    }
});

// 生成验证令牌
export const generateVerificationToken = () => {
    return Math.random().toString(36).substring(2, 15) + 
        Math.random().toString(36).substring(2, 15);
};

// 发送验证邮件
export async function sendVerificationEmail(email: string, token: string) {
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
    
    try {
        const mailOptions = {
            from: `"栉云科技" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '验证您的邮箱地址',
            html: `
                <h1>欢迎注册！</h1>
                <p>请点击下面的链接验证您的邮箱地址：</p>
                <a href="${verificationLink}">${verificationLink}</a>
                <p>此链接24小时内有效。</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('邮件发送成功:', info.messageId);
        return true;
    } catch (error) {
        console.error('邮件发送失败:', error);
        throw error;
    }
}