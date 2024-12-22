#  栉云科技
## 全栈开发规范
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
