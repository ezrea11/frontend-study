# 第二阶段 React Admin Demo Progress Log

## Day8 - React Router

### 今日功能
完成 React Router 基础页面跳转。

### 修改文件
- `react-admin-demo/src/App.tsx`
- `react-admin-demo/src/pages/Login.tsx`
- `react-admin-demo/src/pages/Dashboard.tsx`
- `react-admin-demo/src/pages/Users.tsx`
- `react-admin-demo/src/pages/NotFound.tsx`

### 核心变化
- 新增 `/login`
- 新增 `/dashboard`
- 新增 `/users`
- 新增 404 页面

---

## Day9 - React Login Form

### 今日功能
完成 React 登录表单受控组件 + 固定账号校验 + 登录成功跳转。

### 修改文件
- `react-admin-demo/src/pages/Login.tsx`
- `react-admin-demo/src/App.tsx`
- `react-admin-demo/src/index.css`

### 核心变化
- 使用 `useState` 管理 username / password / errorMessage
- 使用 `value + onChange` 实现 controlled input
- 使用 `onSubmit + preventDefault` 接管表单提交
- 登录成功后跳转到 `/dashboard`

---

## Day10 - React Admin Layout

### 今日功能
完成后台 Layout 壳子 + Sidebar 菜单高亮 + MainContent 内容切换。

### 修改文件
- `react-admin-demo/src/layouts/AdminLayout.tsx`
- `react-admin-demo/src/components/Topbar.tsx`
- `react-admin-demo/src/components/Sidebar.tsx`
- `react-admin-demo/src/components/MainContent.tsx`
- `react-admin-demo/src/pages/Dashboard.tsx`
- `react-admin-demo/src/App.tsx`
- `react-admin-demo/src/index.css`

### 核心变化
- 新增后台页面整体 Layout
- 新增 Topbar / Sidebar / MainContent 三个组件
- 用 `activePage` state 管理当前选中页面
- Sidebar 根据 `activePage` 判断菜单高亮
- MainContent 根据 `activePage` 显示对应内容

---

## Day11 - Users Page v1

### 今日功能
完成 Users Page v1：用户列表表格展示功能。

### 修改文件
- `第二阶段/react-admin-demo/src/components/UserTable.tsx`
- `第二阶段/react-admin-demo/src/components/MainContent.tsx`
- `第二阶段/react-admin-demo/src/index.css`
- `第二阶段/progress-log.md`

### 核心变化
- 新增本地 mock 用户数据
- 新增 `UserTable` 组件
- 使用 `mockUsers.map` 渲染用户列表
- 使用 `table` 展示 `name / role / status / createdAt` 四个字段
- 将 `UserTable` 接入 `MainContent` 的 Users 区域
- 新增 `.user-table` 相关样式，让表格更接近后台管理系统页面

