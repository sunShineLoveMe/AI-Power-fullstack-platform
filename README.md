#  栉云科技
## 全栈开发规范

### 项目结构目录
src/
├── app/
│ ├── api/
│ │ ├── init-db/
│ │ │ └── route.ts # 数据库初始化接口
│ │ └── users/
│ │ └── route.ts # 用户相关接口
│ ├── user/
│ │ ├── create/
│ │ │ └── page.tsx # 添加用户页面
│ │ ├── page.tsx # 用户列表页面
│ │ └── styles.module.css # 用户模块样式
│ ├── layout.tsx # 全局布局
│ └── page.tsx # 首页
├── components/
│ └── ui/
│ ├── button.tsx # 按钮组件
│ └── table.tsx # 表格组件
├── lib/
│ ├── db.ts # 数据库配置
│ └── initDb.ts # 数据库初始化
├── models/
│ ├── User.ts # 用户模型
│ └── Profile.ts # 个人资料模型
├── services/
│ └── userService.ts # 用户服务层
└── types/
└── index.ts # 类型定义

### 数据库模型

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

### 运行项目



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
### css样式在next.js项目中的应用 
- css modules
  - 在单个路由文件中使用css modules
  ``` typescript
  import styles from './page.module.css'
  ```
- global css
  - 全局样式应用在路由中
- tailwindcss
- css-in-js
### Linking and navigation
- Link
- useRouter (client)
- redirect (server)
### error handling
- Error Boundaries
