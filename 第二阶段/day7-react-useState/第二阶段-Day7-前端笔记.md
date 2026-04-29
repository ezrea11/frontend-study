# 第二阶段 Day 7 前端笔记

##  今日前端主题

今日主题：

```text
React useState 第一轮：后台菜单状态切换与内容联动功能
```

今天不是单纯学习 React 语法，而是把 Day 6 完成的静态后台 Layout 升级成一个可以交互的页面。

Day 6 的页面结构是：

```text
App
└── Layout
    ├── Sidebar
    └── Content
```

Day 6 只是静态页面：

```text
左侧 Sidebar 显示菜单
右侧 Content 固定显示 Dashboard
```

Day 7 的目标是：

```text
点击 Dashboard → 右侧显示 Dashboard
点击 Users → 右侧显示 Users
点击 Settings → 右侧显示 Settings
点击 Reports → 右侧显示 Reports
```

所以今天的项目功能点可以命名为：

```text
后台菜单状态切换与内容联动功能
```

---

##  React 和 DOM 思维的区别

之前学 DOM 时，页面变化通常是：

```text
找到 DOM 元素
→ 直接修改它的内容或样式
→ 页面变化
```

例如：

```js
title.textContent = "Users";
```

这属于：

```text
直接操作页面元素
```

但 React 的思路不是这样。

React 的核心模型是：

```text
保存状态数据
→ 页面根据状态数据生成
→ 状态数据变化
→ React 重新渲染页面
```

也可以理解为：

```text
页面 = 状态数据渲染出来的结果
```

在今天的代码中，最核心的状态数据是：

```tsx
const [activePage, setActivePage] = useState("Dashboard");
```

其中：

```text
activePage：当前选中的页面
setActivePage：修改当前选中页面的函数
```

---

##  React 里的“渲染”到底是谁做的？

今天重点理解了一个问题：

```text
到底是 React 渲染 Layout，还是 Layout 渲染页面？
```

更准确的理解是：

```text
React 负责调度和执行渲染；
组件函数负责返回 JSX，告诉 React 这一块 UI 应该长什么样。
```

也就是说：

```text
不是 Layout 主动渲染页面。
而是 React 调用 Layout 这个组件函数，
Layout 返回 JSX，
React 再根据 JSX 继续处理子组件和真实 DOM。
```

例如 React 看到：

```tsx
<Layout />
```

它会调用：

```tsx
Layout()
```

然后 `Layout` 返回 JSX：

```tsx
<div className="layout">
  <Sidebar activePage={activePage} onChangePage={setActivePage} />
  <Content title={activePage} />
</div>
```

这段 JSX 的意思是：

```text
Layout 告诉 React：
这一块页面由一个 div、一个 Sidebar、一个 Content 组成。
```

所以：

```text
组件 return JSX = 组件向 React 描述“我这块 UI 应该怎么显示”
```

完整渲染关系是：

```text
React 调用 Layout()
→ Layout return JSX
→ JSX 里包含 <Sidebar /> 和 <Content />
→ React 继续调用 Sidebar() 和 Content()
→ 它们也 return JSX
→ React 根据最终 JSX 更新页面
```

---

##  今天三个组件的职责

今天的组件关系：

```text
Layout
├── Sidebar
└── Content
```

但更重要的是它们的职责：

```text
Layout：保存当前页面状态 activePage
Sidebar：显示菜单，并在点击菜单时触发修改 activePage
Content：根据 activePage 显示右侧内容
```

### Layout

```text
Layout 是状态中心。
```

因为 `Sidebar` 和 `Content` 都依赖当前页面信息：

```text
Sidebar 需要知道哪个按钮应该高亮
Content 需要知道右侧标题应该显示什么
```

这两个问题都依赖同一个数据：

```text
activePage
```

所以 `activePage` 应该放在它们共同的父组件：

```text
Layout
```

核心原则：

```text
多个子组件共同需要的数据，应该放到它们共同的父组件里。
```

---

### Sidebar

```text
Sidebar 负责显示菜单按钮。
```

同时，它需要在用户点击按钮时修改当前页面状态。

但是 Sidebar 自己没有创建 `activePage`，也不能直接修改 Layout 的 state。

所以 Layout 把修改 state 的函数传给 Sidebar：

```tsx
<Sidebar activePage={activePage} onChangePage={setActivePage} />
```

这样 Sidebar 就可以通过调用：

```tsx
props.onChangePage("Users")
```

间接触发：

```tsx
setActivePage("Users")
```

---

### Content

```text
Content 负责显示右侧内容。
```

它不关心 Sidebar 点击了什么。

它只关心父组件传给它的 `title` 是什么：

```tsx
<Content title={activePage} />
```

在 Content 内部：

```tsx
<h1>{props.title}</h1>
```

所以当 `activePage` 变成 `"Users"` 时，Content 收到：

```tsx
title="Users"
```

然后右侧标题显示为：

```text
Users
```

---

##  useState 的作用

今天的核心代码：

```tsx
const [activePage, setActivePage] = useState("Dashboard");
```

可以拆成三部分理解：

```text
activePage：
当前选中的页面名称

setActivePage：
修改 activePage 的函数

"Dashboard"：
activePage 的初始值
```

也就是说，页面第一次加载时：

```text
activePage = "Dashboard"
```

所以默认显示 Dashboard 页面。

如果改成：

```tsx
const [activePage, setActivePage] = useState("Users");
```

那么页面第一次加载时：

```text
activePage = "Users"
```

因此：

```text
右侧标题默认显示 Users
左侧 Users 按钮默认高亮
```

结论：

```text
useState 的初始值决定 state 第一次渲染时的值；
页面会根据这个初始值显示对应 UI。
```

---

##  activePage / setActivePage / active 的区别

今天容易混淆的是 `active` 这个词。

这里的 `active` 不是“正在调用”的意思，而是：

```text
当前选中的
当前生效的
当前正在显示的
```

### activePage

```tsx
const [activePage, setActivePage] = useState("Dashboard");
```

`activePage` 表示：

```text
当前被选中的页面
```

例如：

```text
activePage = "Dashboard"
activePage = "Users"
activePage = "Settings"
activePage = "Reports"
```

它某一刻只能是其中一个值。

---

### setActivePage

`setActivePage` 是一个函数，用来修改 `activePage`。

例如：

```tsx
setActivePage("Users");
```

意思是：

```text
把当前选中的页面改成 Users
```

---

### active class

CSS 里的 `active` 是一个 class 名字：

```css
.menu-item.active {
  background-color: #334155;
  color: white;
}
```

它表示：

```text
当前按钮处于选中状态
```

如果某个按钮的 `className` 是：

```tsx
className="menu-item active"
```

说明这个按钮同时拥有两个 class：

```text
menu-item
active
```

然后 CSS 选择器：

```css
.menu-item.active
```

就会命中这个按钮，让它高亮。

---

##  Layout.tsx 代码与理解

```tsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

function Layout() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="layout">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />
      <Content title={activePage} />
    </div>
  );
}

export default Layout;
```

逐句理解：

```tsx
const [activePage, setActivePage] = useState("Dashboard");
```

意思是：

```text
创建一个状态 activePage
它的初始值是 "Dashboard"
同时创建一个修改它的函数 setActivePage
```

---

```tsx
<Sidebar activePage={activePage} onChangePage={setActivePage} />
```

意思是：

```text
把 activePage 传给 Sidebar，让 Sidebar 知道当前哪个页面被选中；
把 setActivePage 传给 Sidebar，让 Sidebar 有能力修改当前页面。
```

注意：

```text
Sidebar 自己不能直接修改 Layout 的 state。
但 Layout 可以把修改 state 的函数传给 Sidebar。
```

---

```tsx
<Content title={activePage} />
```

意思是：

```text
把 activePage 作为 title 传给 Content；
Content 根据 title 显示右侧标题。
```

---

##  Sidebar.tsx 代码与理解

### 第一版：手写多个 button

```tsx
type SidebarProps = {
  activePage: string;
  onChangePage: (page: string) => void;
};

function Sidebar(props: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>Admin Demo</h2>

      <button
        className={props.activePage === "Dashboard" ? "menu-item active" : "menu-item"}
        onClick={() => props.onChangePage("Dashboard")}
      >
        Dashboard
      </button>

      <button
        className={props.activePage === "Users" ? "menu-item active" : "menu-item"}
        onClick={() => props.onChangePage("Users")}
      >
        Users
      </button>

      <button
        className={props.activePage === "Settings" ? "menu-item active" : "menu-item"}
        onClick={() => props.onChangePage("Settings")}
      >
        Settings
      </button>

      <button
        className={props.activePage === "Reports" ? "menu-item active" : "menu-item"}
        onClick={() => props.onChangePage("Reports")}
      >
        Reports
      </button>
    </aside>
  );
}

export default Sidebar;
```

### SidebarProps

```tsx
type SidebarProps = {
  activePage: string;
  onChangePage: (page: string) => void;
};
```

这不是数据本身，而是 TypeScript 类型规则。

意思是：

```text
Sidebar 这个组件必须接收两个 props：

activePage：字符串
onChangePage：一个函数，这个函数接收字符串，不返回内容
```

此时 `props` 大概长这样：

```ts
{
  activePage: "Dashboard",
  onChangePage: setActivePage
}
```

---

### onClick

以 Users 按钮为例：

```tsx
onClick={() => props.onChangePage("Users")}
```

这不是页面一加载就执行。

它的意思是：

```text
先登记一个点击事件函数。
等用户点击 Users 按钮时，再执行这个函数。
```

点击后执行：

```tsx
props.onChangePage("Users")
```

而 `props.onChangePage` 本质上是父组件传来的：

```tsx
setActivePage
```

所以它等价于：

```tsx
setActivePage("Users")
```

于是 React 知道：

```text
activePage 要从 "Dashboard" 改成 "Users"
```

---

##  Content.tsx 代码与理解

```tsx
type ContentProps = {
  title: string;
};

function Content(props: ContentProps) {
  return (
    <main className="content">
      <h1>{props.title}</h1>
      <p>This is the {props.title} page.</p>
    </main>
  );
}

export default Content;
```

### ContentProps

```tsx
type ContentProps = {
  title: string;
};
```

表示：

```text
Content 组件需要接收一个 title；
title 的类型必须是 string。
```

### props.title

```tsx
<h1>{props.title}</h1>
```

意思是：

```text
显示父组件传进来的 title。
```

当 Layout 写：

```tsx
<Content title={activePage} />
```

如果当前：

```text
activePage = "Users"
```

那么 Content 收到：

```tsx
title="Users"
```

页面就会显示：

```text
Users
```

---

##  index.css 中 active 样式

```css
.menu-item {
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
}

.menu-item.active {
  background-color: #334155;
  color: white;
}
```

### `.menu-item`

表示普通菜单按钮样式。

### `.menu-item.active`

表示：

```text
同时拥有 menu-item 和 active 两个 class 的元素
```

例如：

```tsx
className="menu-item active"
```

这个按钮就会被 `.menu-item.active` 命中，因此显示高亮样式。

---

##  点击 Users 后完整执行流程

这是今天最重要的流程。

```text
1. 用户点击 Users 按钮。

2. 触发 Sidebar 中 Users 按钮的 onClick 函数。

3. onClick 执行：
   props.onChangePage("Users")

4. 因为 Layout 中写了：
   onChangePage={setActivePage}

5. 所以 props.onChangePage("Users") 本质上等价于：
   setActivePage("Users")

6. activePage 从 "Dashboard" 变成 "Users"。

7. React 发现 Layout 中的 state 变化了。

8. React 重新调用 Layout 组件函数。

9. 此时 activePage 的值已经是 "Users"。

10. Layout 重新返回 JSX：
    <Sidebar activePage={activePage} onChangePage={setActivePage} />
    <Content title={activePage} />

11. Sidebar 收到新的 activePage="Users"。

12. Users 按钮判断：
    props.activePage === "Users"

13. 判断结果为 true，所以 Users 按钮的 className 变成：
    "menu-item active"

14. Users 按钮高亮。

15. Content 收到新的 title="Users"。

16. Content 显示 Users 标题和文本。
```

压缩版：

```text
点击 Users
→ Sidebar 执行 props.onChangePage("Users")
→ 本质上执行 setActivePage("Users")
→ Layout 中的 activePage 变成 "Users"
→ React 重新渲染 Layout
→ Sidebar 根据新的 activePage 高亮 Users
→ Content 根据新的 title 显示 Users
```

---

##  用 map 渲染菜单

手写多个 button 有重复问题：

```text
Dashboard / Users / Settings / Reports 四个按钮结构几乎完全一样
只有文字和传入的值不同
```

React 中常见做法是：

```text
把变化的数据放进数组
再用 map 把数组渲染成 UI
```

### 改造后的 Sidebar.tsx

```tsx
type SidebarProps = {
  activePage: string;
  onChangePage: (page: string) => void;
};

const menuItems = ["Dashboard", "Users", "Settings", "Reports", "Analytics"];

function Sidebar(props: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>Admin Demo</h2>

      {menuItems.map((item) => (
        <button
          key={item}
          className={props.activePage === item ? "menu-item active" : "menu-item"}
          onClick={() => props.onChangePage(item)}
        >
          {item}
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;
```

---

##  map 渲染菜单的理解

### menuItems

```tsx
const menuItems = ["Dashboard", "Users", "Settings", "Reports", "Analytics"];
```

表示：

```text
侧边栏菜单项的名称列表。
```

每一个字符串都会被渲染成一个按钮。

---

### item

```tsx
menuItems.map((item) => (...))
```

执行时：

```text
第 1 轮：item = "Dashboard"
第 2 轮：item = "Users"
第 3 轮：item = "Settings"
第 4 轮：item = "Reports"
第 5 轮：item = "Analytics"
```

所以：

```text
map 的作用是把数组里的每一项转换成一个 React button。
```

---

### className 为什么可以不用写死？

原来手写时是：

```tsx
props.activePage === "Dashboard"
props.activePage === "Users"
props.activePage === "Settings"
```

使用 map 后可以写成：

```tsx
props.activePage === item
```

因为每一轮的 `item` 都代表当前按钮的名称。

所以：

```text
当前按钮是谁，就用谁和 activePage 比较。
```

---

### onClick 为什么可以切换不同页面？

```tsx
onClick={() => props.onChangePage(item)}
```

虽然代码只写了一份，但每一轮 `item` 不同。

所以：

```text
点击 Dashboard → props.onChangePage("Dashboard")
点击 Users → props.onChangePage("Users")
点击 Settings → props.onChangePage("Settings")
点击 Reports → props.onChangePage("Reports")
点击 Analytics → props.onChangePage("Analytics")
```

因此不同按钮能切换到不同页面。

---

##  key={item} 的理解

```tsx
key={item}
```

`key` 是给 React 自己用的。

作用是：

```text
帮助 React 识别列表里的每一个元素。
```

因为 map 会生成一组按钮，React 需要知道：

```text
这个按钮是谁？
哪个按钮新增了？
哪个按钮删除了？
哪个按钮位置变了？
```

所以写：

```tsx
key={item}
```

表示：

```text
用 item 作为这个按钮的身份标识。
```

当前数组里：

```tsx
["Dashboard", "Users", "Settings", "Reports", "Analytics"]
```

每个值都不重复，所以可以用 `item` 当 key。

先记住：

```text
map 渲染列表时，最外层元素通常要加 key；
key 要尽量稳定且唯一。
```

---

##  今日小实验与结论

### 实验 1：修改 useState 初始值

把：

```tsx
const [activePage, setActivePage] = useState("Dashboard");
```

改成：

```tsx
const [activePage, setActivePage] = useState("Users");
```

观察结果：

```text
页面一开始右侧标题显示 Users；
左侧 Users 按钮高亮。
```

结论：

```text
useState 的初始值决定 state 第一次渲染时的值；
页面会根据这个初始值显示对应 UI。
```

---

### 实验 2：新增 Reports 菜单项

在 Sidebar 中新增一个按钮：

```tsx
<button
  className={props.activePage === "Reports" ? "menu-item active" : "menu-item"}
  onClick={() => props.onChangePage("Reports")}
>
  Reports
</button>
```

结果：

```text
Sidebar 多了 Reports 按钮；
点击 Reports 后，右侧标题显示 Reports；
Reports 按钮高亮。
```

结论：

```text
只要 Sidebar 调用 props.onChangePage("Reports")，
本质上就是调用 setActivePage("Reports")，
activePage 改变后，Content 会根据新的 activePage 显示 Reports。
```

---

### 实验 3：用 map 后新增 Analytics

将数组改成：

```tsx
const menuItems = ["Dashboard", "Users", "Settings", "Reports", "Analytics"];
```

观察结果：

```text
左侧自动多了 Analytics 按钮；
点击 Analytics 后，右侧标题显示 Analytics；
Analytics 按钮高亮。
```

结论：

```text
使用 map 渲染菜单后，只需要维护 menuItems 数组；
不需要手写多个重复 button；
提高了代码可读性和可维护性。
```

---

##  今天最重要的 React 思维

今天最重要的不是记住某个 API，而是理解 React 的数据流。

核心模型：

```text
state 变化 → React 重新渲染 → UI 变化
```

在今天代码中：

```text
activePage 变化 → Layout 重新渲染 → Sidebar 和 Content 收到新的 props → 页面变化
```

组件之间的关系：

```text
Layout 保存状态
Sidebar 触发修改状态
Content 显示状态
```

更项目化地理解：

```text
Layout 是状态中心；
Sidebar 是用户操作入口；
Content 是状态显示结果。
```

---

##  今天应该记住的 5 句话

```text
1. React 不是直接改 DOM，而是通过修改 state 让页面重新渲染。

2. 组件函数的 return JSX 是在告诉 React：这一块 UI 应该怎么显示。

3. state 通常放在多个子组件共同的父组件里。

4. 子组件想修改父组件的 state，需要父组件把 setState 函数通过 props 传下来。

5. map 可以把数组数据渲染成一组相似的 UI，适合菜单、列表、卡片等重复结构。
```

---

##  今日功能点总结

今日前端完成的功能点：

```text
后台菜单状态切换与内容联动功能
```

具体完成：

```text
1. 使用 useState 创建 activePage 状态；
2. 使用 setActivePage 修改当前选中页面；
3. Layout 把 activePage 传给 Sidebar 和 Content；
4. Sidebar 点击菜单后修改 activePage；
5. Content 根据 activePage 显示右侧内容；
6. 使用 active class 高亮当前选中菜单；
7. 使用 map 将 menuItems 数组渲染成菜单按钮；
8. 新增菜单项时，只需要修改数组。
```

---

##  后续可以接上的内容

今天的能力后续可以用于：

```text
1. 后台菜单切换
2. React Router 路由切换
3. 用户列表 / 设置页 / 报表页切换
4. Tab 切换组件
5. 侧边栏高亮
6. 中后台项目页面结构管理
```

今天只是先用 `useState` 模拟页面切换。

后面接入 `React Router` 后，页面切换会从：

```text
activePage 状态切换
```

升级为：

```text
路由路径切换
```

但今天学到的核心思想仍然有用：

```text
数据或路径变化 → React 重新渲染 → 页面更新
```
