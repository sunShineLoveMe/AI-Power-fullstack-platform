# 栉云科技

## 全栈开发规范

### 项目结构目录

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   │   └── route.ts           # 用户注册接口
│   │   │   └── verify-email/
│   │   │       └── route.ts           # 邮箱验证接口
│   │   ├── init-db/
│   │   │   └── route.ts               # 数据库初始化接口
│   │   └── users/
│   │       └── route.ts               # 用户相关接口
│   ├── signup/
│   │   └── page.tsx                   # 注册页面
│   ├── verify-email/
│   │   └── page.tsx                   # 邮箱验证页面
│   ├── verify-email-notice/
│   │   └── page.tsx                   # 验证邮件发送提示页面
│   ├── user/
│   │   ├── create/
│   │   │   └── page.tsx               # 添加用户页面
│   │   ├── page.tsx                   # 用户列表页面
│   │   └── styles.module.css          # 用户模块样式
│   ├── layout.tsx                     # 全局布局
│   └── page.tsx                       # 首页
├── components/
│   └── ui/
│       ├── button.tsx                 # 按钮组件
│       └── table.tsx                  # 表格组件
├── lib/
│   ├── db.ts                         # 数据库配置
│   ├── mail.ts                       # 邮件服务配置
│   └── initDb.ts                     # 数据库初始化
├── models/
│   ├── Account.ts                    # 账号模型（包含邮箱验证）
│   ├── User.ts                       # 用户模型
│   └── Profile.ts                    # 个人资料模型
├── services/
│   └── userService.ts                # 用户服务层
└── types/
    └── index.ts                      # 类型定义
```

### 数据库模型

#### Account 表
| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | INTEGER | 主键，自增 |
| username | STRING(50) | 用户名，唯一 |
| password | STRING(100) | 密码 |
| email | STRING(100) | 邮箱，唯一 |
| phone | STRING(20) | 手机号 |
| avatar | STRING(255) | 头像URL |
| status | ENUM | 账号状态 |
| isVerified | BOOLEAN | 邮箱是否已验证 |
| verificationToken | STRING | 邮箱验证令牌 |
| verificationTokenExpires | DATE | 验证令牌过期时间 |
| lastLoginAt | DATE | 最后登录时间 |
| roleId | INTEGER | 角色ID |
| createdAt | DATE | 创建时间 |
| updatedAt | DATE | 更新时间 |
| deletedAt | DATE | 删除时间 |

#### User 表
| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | INTEGER | 主键，自增 |
| username | STRING | 用户名 |
| email | STRING | 邮箱 |
| createdAt | DATE | 创建时间 |

#### Profile 表
| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | INTEGER | 主键，自增 |
| bio | TEXT | 个人简介 |
| userId | INTEGER | 用户ID |

### 功能模块

- 用户管理
  - 用户注册
    - 表单验证
    - 密码加密
    - 邮箱验证
  - 邮箱验证
    - 验证邮件发送
    - 邮件频率限制
    - 验证令牌管理
    - 验证状态更新
  - 用户列表（分页查询）
  - 添加用户
  - 账户管理
- 数据库初始化

### 技术栈

- Next.js 15.1.0
- React 18.3.1
- TypeScript
- Sequelize (MySQL)
- Tailwind CSS
- Shadcn UI

### 开发规范

- 代码分层
  - 展示层 (Pages)
  - 服务层 (Services)
  - 数据层 (Models)
- 类型安全
- 错误处理
- 响应式设计

### 项目结构说明

- app 
  - App Router
- pages
  - Pages Router
- public
  - 静态资源
    - font字体选择
      - 内置的google字体、本地字体
- src
  - Optional application source folder

### CSS样式在Next.js项目中的应用 

- CSS Modules
  ```typescript
  import styles from './page.module.css'
  ```
- Global CSS
- Tailwind CSS
- CSS-in-JS

### Linking and Navigation

- Link
- useRouter (client)
- redirect (server)

### Error Handling

- Error Boundaries
