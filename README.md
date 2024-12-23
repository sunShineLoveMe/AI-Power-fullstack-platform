# 项目目录结构

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts           # 登录接口
│   │   │   ├── signup/
│   │   │   │   └── route.ts           # 注册接口
│   │   │   └── verify-email/
│   │   │       └── route.ts           # 邮箱验证接口
│   │   ├── init-db/
│   │   │   └── route.ts               # 数据库初始化接口
│   │   └── users/
│   │       └── route.ts               # 用户相关接口
│   ├── login/
│   │   ├── page.tsx                   # 登录页面
│   │   └── styles.module.css          # 登录页样式
│   ├── signup/
│   │   ├── page.tsx                   # 注册页面
│   │   └── styles.module.css          # 注册页样式
│   ├── verify-email/
│   │   └── page.tsx                   # 邮箱验证页面
│   ├── verify-email-notice/
│   │   └── page.tsx                   # 验证邮件发送提示页面
│   ├── dashboard/                     # 新增：仪表板模块
│   │   ├── layout.tsx                 # 仪表板布局
│   │   └── page.tsx                   # 仪表板首页
│   ├── user/
│   │   ├── create/
│   │   │   └── page.tsx               # 添加用户页面
│   │   ├── page.tsx                   # 用户列表页面
│   │   └── styles.module.css          # 用户模块样式
│   ├── layout.tsx                     # 全局布局
│   └── page.tsx                       # 首页
├── components/
│   ├── auth/                          # 新增：认证相关组件
│   │   ├── LoginForm.tsx              # 登录表单组件
│   │   └── AuthGuard.tsx              # 认证守卫组件
│   └── ui/
│       ├── button.tsx                 # 按钮组件
│       └── table.tsx                  # 表格组件
├── lib/
│   ├── auth.ts                        # 新增：认证工具函数
│   ├── db.ts                          # 数据库配置
│   ├── mail.ts                        # 邮件服务配置
│   ├── rateLimiter.ts                 # 频率限制工具
│   └── initDb.ts                      # 数据库初始化
├── middleware.ts                       # 新增：认证中间件
├── models/
│   ├── Account.ts                     # 账号模型
│   ├── User.ts                        # 用户模型
│   └── Profile.ts                     # 个人资料模型
├── services/
│   ├── authService.ts                 # 新增：认证服务
│   └── userService.ts                 # 用户服务
├── types/
│   └── index.ts                       # 类型定义
└── utils/                             # 新增：工具函数目录
    ├── auth.ts                        # 认证相关工具
    └── validation.ts                  # 验证相关工具
```

## 新增文件说明

### 认证相关
1. `/app/login/*` - 登录模块
   - 登录页面和样式
   - 表单验证和提交
   - 错误处理

2. `/app/api/auth/login/*` - 登录API
   - 用户认证
   - JWT令牌生成
   - Cookie设置

3. `/middleware.ts` - 认证中间件
   - 路由保护
   - Token验证
   - 重定向处理

### 组件
1. `/components/auth/*` - 认证组件
   - 登录表单
   - 认证守卫

### 工具和服务
1. `/lib/auth.ts` - 认证工具
   - Token处理
   - 用户会话管理

2. `/services/authService.ts` - 认证服务
   - 登录逻辑
   - 用户验证

3. `/utils/*` - 通用工具
   - 认证辅助函数
   - 数据验证

## 环境变量
```env
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your-secure-secret-key
EMAIL_USER=your_qq_email@qq.com
EMAIL_PASSWORD=your_qq_email_auth_code
DB_NAME=next_demo
DB_USER=next_user
DB_PASSWORD=your_strong_password
DB_HOST=localhost
DB_PORT=3306
```

## 主要功能模块

### 用户认证
- 登录
- 注册
- 邮箱验证
- 会话管理

### 用户管理
- 用户列表
- 添加用户
- 账户管理

### 安全特性
- JWT认证
- 密码加密
- Cookie安全
- XSS防护
- CSRF防护

### 数据库
- 用户表
- 账号表
- 个人资料表