# 第二阶段 Day11 前端笔记：Users Page v1

## 今日功能

完成 Users Page v1：用户列表表格展示功能。

本日完成：

- 新增本地 mock 用户数据
- 新增 `UserTable` 组件
- 使用 `mockUsers.map` 渲染用户列表
- 使用 `table` 展示用户信息
- 展示字段包括 `name / role / status / createdAt`
- 将 `UserTable` 接入 `MainContent` 的 Users 区域
- 为用户表格添加基础样式

---

## 核心知识点

今天的核心是：**React 列表渲染 + 条件渲染 + 组件接入**。

`mockUsers` 是一个本地假数据数组，数组里的每一个对象都符合 `User` type。

```tsx
type User = {
  id: number;
  name: string;
  role: string;
  status: string;
  createdAt: string;
};
```

`mockUsers.map` 的作用是遍历用户数组，把每一个 `user object` 转换成一个 `<tr>` 表格行。

```tsx
{mockUsers.map((user) => (
  <tr key={user.id}>
    <td>{user.name}</td>
    <td>{user.role}</td>
    <td>{user.status}</td>
    <td>{user.createdAt}</td>
  </tr>
))}
```

也就是：

```text
一个 user object → 一个 table row
```

今天的 `mock` 暂时只是静态本地假数据，不涉及 `useEffect`、axios 或真实请求。

---

## 组件 / 数据职责

### MainContent

`MainContent` 负责根据父组件传来的 `activePage` 决定右侧内容区显示什么。

当 `props.activePage === "Users"` 成立时，`MainContent` 渲染 `<UserTable />`。

```tsx
{props.activePage === "Users" && (
  <UserTable />
)}
```

这里的重点是：`MainContent` 不直接管理用户数据，它只负责判断当前页面是否应该显示用户表格。

### UserTable

`UserTable` 负责展示用户列表表格。

它内部包含：

- `User` type：规定每个用户对象需要有哪些字段
- `mockUsers`：本地用户假数据数组
- `table`：负责展示表格结构
- `mockUsers.map`：负责把用户数组转换成多行表格

### mockUsers

`mockUsers` 保存的是一组用户数据数组。

数组里的每一个对象都代表一个用户，并且每个对象都符合 `User` type。

```tsx
const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Chen",
    role: "Admin",
    status: "Active",
    createdAt: "2026-05-01",
  },
];
```

---

## Users 渲染流程

用户点击 Sidebar 里的 `Users` 按钮后：

```text
用户点击 Users 按钮
→ Sidebar 中的 onClick 执行
→ props.onChangePage("Users") 被调用
→ onChangePage 实际上是 AdminLayout 传下来的 setActivePage
→ setActivePage("Users") 请求 React 更新 activePage 这份 state
→ activePage 的值变成 "Users"
→ React 重新渲染页面
→ AdminLayout 把新的 activePage 传给 MainContent
→ MainContent 判断 props.activePage === "Users"
→ 条件成立，渲染 <UserTable />
→ UserTable 使用 mockUsers.map 遍历用户数组
→ 每一个 user object 被转换成一个 <tr> 表格行
→ 页面显示用户列表表格
```

---

## 小实验结论

### 实验一：把 UserTable 的渲染条件从 Users 改成 Dashboard

把：

```tsx
{props.activePage === "Users" && (
  <UserTable />
)}
```

临时改成：

```tsx
{props.activePage === "Dashboard" && (
  <UserTable />
)}
```

结果：

- 用户表格会出现在 Dashboard 页面
- Users 页面不会再显示用户表格

结论：

```text
props.activePage === "Users" 控制的是 UserTable 的渲染条件。
当判断条件改成 Dashboard 后，UserTable 就会在 Dashboard 页面被渲染。
```

所以条件渲染的本质是：

```text
某个条件为 true → React 渲染对应组件
某个条件为 false → React 不渲染对应组件
```

---

### 实验二：观察 table 样式中的 padding

在 `index.css` 中添加：

```css
.user-table th,
.user-table td {
  padding: 12px 16px;
}
```

结果：

- 表格里的文字不会紧贴单元格边缘
- 每一行上下更松
- 每个单元格左右更舒服
- 表格整体更接近后台管理系统的视觉效果

结论：

```text
padding 不是元素与元素之间的距离，
而是盒子内部内容和盒子边界之间的距离。
```

在表格里，`th / td` 都可以理解成一个小盒子。

`padding: 12px 16px` 表示：

```text
上下留 12px
左右留 16px
```

所以它控制的是单元格内部文字和单元格边界之间的距离。

---

## 今日理解

今天最重要的理解是：`activePage` 不是普通变量，而是 React state variable。

在这段代码中：

```tsx
const [activePage, setActivePage] = useState("Dashboard");
```

可以理解为：

```text
activePage：当前 state 的值
setActivePage：更新这份 state 的函数
```

所以：

```tsx
setActivePage("Users");
```

不是普通赋值，而是告诉 React：

```text
请把 activePage 这份 state 的值更新为 "Users"，
然后根据新的 state 重新渲染页面。
```

这也是为什么点击 Sidebar 后，页面内容可以自动变化。

今天还需要明确区分：

```text
padding：内容和自己盒子边界的距离
margin：盒子和外面其他盒子的距离
gap：flex/grid 子元素之间的间距
table 列宽：表格不同列之间的空间分配
```

在今天的表格中，`Alice Chen` 和 `Admin` 之间的大距离，主要来自 `width: 100%` 后 table 自动分配列宽，而不是单纯由 padding 决定。

---

## 后续项目连接

今天完成的是 Users Page 的第一版，只负责展示用户列表。

后续可以继续扩展：

- 用户搜索
- 状态筛选
- 前端分页
- 新增用户
- 编辑用户
- 删除用户
- 接入真实 API
- loading / empty / error 状态
- 将用户数据从静态 mock 数组升级为 state
- 后续再通过 `useEffect` 和 axios 模拟页面加载时请求数据

今天的功能是后续 Users 管理模块的基础。

后面所有搜索、筛选、分页、新增、编辑功能，都会建立在这个用户列表展示能力上。
