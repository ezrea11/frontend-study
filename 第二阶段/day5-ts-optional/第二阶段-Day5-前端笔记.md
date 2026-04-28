# 第二阶段 Day 5 前端笔记

## 今日目标

今天的核心目标是：

- 初始化 `React + TypeScript + Vite` 项目
- 确认项目可以正常运行
- 理解 TypeScript 可选属性 `?`
- 完成一个最小 TS 实验

---

## React + TypeScript + Vite 初始化

使用命令：

```bash
npm create vite@latest react-admin-demo -- --template react-ts
```

随后项目自动/手动完成：

```bash
cd react-admin-demo
npm install
npm run dev
```

运行成功后，浏览器可以打开：

```text
http://localhost:5173/
```

今日完成结果：

- `react-admin-demo` 项目创建成功
- `npm run dev` 运行成功
- 浏览器成功显示 React 页面
- 修改 `App.tsx` 后，浏览器页面自动更新
- 修改并保存了第一版 `README.md`

---

## HMR 是什么

`HMR` 全称是 `Hot Module Replacement`，中文可以理解为“热模块替换”。

当前阶段只需要理解：

> 开发时修改代码并保存后，浏览器不需要手动刷新，页面会自动更新。

今天修改 `App.tsx` 后，页面自动变化，说明 Vite 的 HMR 正常工作。

---

## TypeScript 可选属性

示例：

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}
```

`role?: string` 的含义是：

- `role` 这个属性可以有，也可以没有
- 如果有，必须是 `string`

区别：

```ts
role: string
```

表示 `role` 必须存在，并且必须是 `string`。

```ts
role?: string
```

表示 `role` 可以不存在，但如果存在，必须是 `string`。

---

## 函数类型理解

示例：

```ts
function getUserRole(user: User): string {
  if (user.role) {
    return user.role;
  }

  return "normal user";
}
```

这里有两个类型限制：

- `user: User`：参数 `user` 必须符合 `User` 接口结构
- `: string`：函数最终必须返回一个字符串

---

## 今日小实验

新增：

```ts
const userC: User = {
  id: 3,
  name: "Tom",
  email: "tom@example.com",
  role: "",
};

console.log(getUserRole(userC));
```

输出结果：

```text
normal user
```

原因：

```ts
if (user.role)
```

判断的不是“是否写了 `role` 属性”，而是判断 `user.role` 的值是否是有效值。

空字符串 `""` 会被判断为 `false`，所以最终返回：

```text
normal user
```

如果要严格判断 `role` 是否存在，可以写：

```ts
if (user.role !== undefined) {
  return user.role;
}
```

---

## 以后能用在哪里

TypeScript 可选属性以后可以用于中后台项目中的：

- 用户角色 `role`
- 用户头像 `avatarUrl`
- 用户部门 `department`
- 用户备注 `remark`
- 表单中的非必填字段

例如：

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  department?: string;
}
```

---

## 今日关键结论

今天最重要的结论：

1. `React + TypeScript + Vite` 项目已经成功跑起来。
2. `HMR` 让修改代码后浏览器自动更新，提高开发效率。
3. `role?: string` 表示属性可选，但如果存在，类型必须正确。
4. `if (user.role)` 判断的是值是否有效，不是严格判断属性是否存在。
5. 可选属性会在后续用户列表、用户表单、后台管理项目中频繁使用。
