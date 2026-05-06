# 第二阶段 Day10 前端笔记：React 后台 Layout

##  今日功能

React 后台页面 Layout 演示与内容切换。

本日完成：

- Topbar 顶部信息栏
- Sidebar 左侧菜单栏
- MainContent 右侧内容区
- 点击 Sidebar 菜单后切换 activePage
- 当前菜单高亮
- 右侧内容同步变化

---

##  核心知识点

今天的核心是：**React 父子组件通信 + 共享 state 管理**。

AdminLayout 作为父组件，用 `useState` 管理共享状态 `activePage`。

```tsx
const [activePage, setActivePage] = useState("Dashboard");
```

`activePage` 控制当前选中的页面。

当用户点击 Sidebar 菜单时，Sidebar 调用父组件传下来的 `onChangePage(item)`，实际执行的是 `setActivePage(item)`。

`activePage` 更新后，React 重新渲染页面，Sidebar 高亮和 MainContent 内容会同步变化。

---

##  组件职责

### AdminLayout

负责组织后台页面的整体结构：

- Topbar
- Sidebar
- MainContent

同时管理共享状态 `activePage`。

### Topbar

负责显示后台系统顶部的全局信息，例如系统名称、当前用户等。

### Sidebar

负责显示左侧菜单。

它通过：

```tsx
props.activePage === item
```

判断哪个菜单需要高亮。

它通过：

```tsx
props.onChangePage(item)
```

通知父组件切换当前页面。

### MainContent

负责根据父组件传来的 `activePage` 显示右侧内容。

---

##  activePage 流程

用户点击 `Users` 按钮后：

```text
用户点击 Users 按钮
→ Sidebar 中的 onClick 执行
→ props.onChangePage("Users") 被调用
→ onChangePage 实际上是父组件传下来的 setActivePage
→ setActivePage("Users") 请求 React 更新 activePage
→ activePage 变成 "Users"
→ React 重新渲染 AdminLayout、Sidebar、MainContent
→ Sidebar 根据 activePage === item 判断 Users 按钮加 active class
→ MainContent 根据 activePage === "Users" 显示 Users 页面内容
```

---

##  小实验结论

### 实验一：把 onChangePage 改成空函数

把：

```tsx
<Sidebar activePage={activePage} onChangePage={setActivePage} />
```

改成：

```tsx
<Sidebar activePage={activePage} onChangePage={() => {}} />
```

结果：

- 点击菜单后，左侧高亮不会变化
- 右侧内容不会变化
- 点击事件虽然触发了，但没有真正更新 `activePage`

结论：

```text
Sidebar 自己不能直接修改 activePage。
它只能通过 onChangePage 通知父组件修改 activePage。
如果 onChangePage 不是 setActivePage，页面状态就不会变化。
```

### 实验二：把 Sidebar 的 activePage 固定成 "Dashboard"

把：

```tsx
<Sidebar activePage={activePage} onChangePage={setActivePage} />
```

改成：

```tsx
<Sidebar activePage={"Dashboard"} onChangePage={setActivePage} />
```

结果：

- 左侧高亮一直固定在 Dashboard
- 右侧 MainContent 内容仍然会变化

结论：

```text
Sidebar 的高亮依赖它自己收到的 activePage prop。
MainContent 的内容依赖它自己收到的 activePage prop。

如果 Sidebar 收到的是固定值，它的高亮就不会变化。
但 MainContent 仍然收到真实 activePage，所以内容可以正常切换。
```

---

##  后续项目连接

今天的 Layout 能力可以继续连接到后续中后台项目功能：

- Dashboard 页面
- Users 用户列表页
- Reports 报表页
- Analytics 数据分析页
- 后续路由守卫
- 后续权限菜单
- 后续真实后台管理系统结构

今天的核心不是页面样式，而是理解：

```text
一个共享 state 如何同时控制多个组件的 UI 联动。
```
