# AI+泛大数据平台

## UI 设计规范

### 1. 色彩系统

#### 主色调
- 背景渐变：`from-slate-900 via-slate-800 to-slate-900`
- 主题蓝：`from-blue-400 to-blue-600`
- 边框色：`border-slate-700/50`

#### 文字颜色
- 主要文字：`text-slate-100`
- 次要文字：`text-slate-400`
- 渐变文字：`bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text`

### 2. 设计元素

#### 玻璃态效果
```css
bg-slate-900/50 backdrop-blur-xl
```

#### 光效装饰
```css
blur-3xl bg-gradient-to-tr from-[#1e40af] to-[#3b82f6] opacity-20
```

#### 边框效果
```css
border border-slate-700/50
```

#### 交互状态
- 默认：`text-slate-400`
- 悬停：`hover:text-slate-200 hover:bg-slate-800/50`
- 选中：`bg-blue-600/10 text-blue-400 border border-blue-500/20`

### 3. 组件设计

#### Navbar（顶部导航）
- 半透明背景配合模糊效果
- 渐变标题文字
- 精致的按钮设计
- 平滑的过渡动画

#### Sidebar（侧边栏）
- 优雅的菜单项布局
- 醒目的选中状态
- 图标与文字协调
- 细腻的悬停效果

#### BottomBar（底部栏）
- 简约的分隔设计
- 舒适的间距
- 优雅的链接样式
- 流畅的交互效果

### 4. 设计原则

1. **简洁性**
   - 减少视觉干扰
   - 突出重要信息
   - 保持界面整洁

2. **专业性**
   - 深色主题基调
   - 科技感视觉元素
   - 数据可视化友好

3. **一致性**
   - 统一的颜色系统
   - 一致的交互模式
   - 协调的组件样式

4. **可用性**
   - 清晰的视觉层次
   - 直观的操作反馈
   - 舒适的视觉体验

### 5. 响应式设计

- 断点设置：
  ```css
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px
  ```

- 布局适配
  - 弹性布局：`flex`
  - 网格布局：`grid`
  - 响应式间距：`space-y-{size}`

### 6. 动画效果

- 过渡动画：
  ```css
  transition-all duration-200
  ```

- 悬停效果：
  ```css
  hover:bg-slate-700/50
  hover:text-slate-200
  ```

## 项目结构

[原有的项目结构保持不变...]

## 开发指南

在开发新组件或修改现有组件时，请遵循上述设计规范，确保：

1. 使用规定的色彩系统
2. 保持一致的视觉风格
3. 实现响应式设计
4. 添加适当的交互动效
5. 保持代码的可维护性

## 最佳实践

1. 使用 Tailwind CSS 类名组合
2. 提取常用样式为组件
3. 保持样式的一致性
4. 注意性能优化
5. 维护设计文档

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
│   ├── User.ts                        # 用��模型
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