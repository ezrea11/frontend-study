# 第二阶段 Day 6 前端笔记：React 组件、JSX、props 与后台 Layout

##  今日主题

今天的前端主题是：

> React 第一轮：组件、JSX、props，并完成后台 Layout 第一版拆分。

今日完成的项目功能点可以命名为：

> React 后台 Layout 组件拆分 + 基础左右布局样式

最终页面结构为：

```text
App
└── Layout
    ├── Sidebar
    └── Content
```

---

##  React 的基本理解

React 不是一门新语言，而是基于 JavaScript 的 UI library。

React 的核心思路是：

```text
用组件来组织页面。
```

以前 DOM 阶段更像是：

```text
先写 HTML，再用 JS 手动找到 DOM 元素并修改它。
```

React 阶段更像是：

```text
把页面拆成组件，每个组件描述自己要显示的 UI，React 负责把这些组件渲染到浏览器页面。
```

所以当前阶段可以这样理解 React：

```text
React = 用组件化方式构建 UI 的工具。
```

---

##  组件是什么

组件可以理解为：

```text
一个返回 UI 的函数。
```

例如：

```tsx
function Sidebar() {
  return (
    <aside>
      <h2>Admin Demo</h2>
    </aside>
  );
}
```

这里：

- `Sidebar` 是一个组件函数
- `return` 后面的 JSX 描述这个组件显示什么
- 最终 React 会把这个组件渲染到页面上

在今天的项目中：

```text
App：应用入口组件
Layout：整体布局组件
Sidebar：左侧菜单组件
Content：右侧主内容区组件
```

---

##  JSX 是什么

JSX 是在 JavaScript / TypeScript 中用类似 HTML 的语法描述 UI 结构。

例如：

```tsx
function Content() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>This is the main content area.</p>
    </main>
  );
}
```

这里的：

```tsx
<main>
  <h1>Dashboard</h1>
  <p>This is the main content area.</p>
</main>
```

就是 JSX。

注意：

```text
JSX 看起来像 HTML，但不是普通 HTML。
JSX 是写在 JS / TS 中的 UI 描述语法。
```

---

##  JSX 当前需要记住的规则

###  JSX 通常写在组件的 return 里

因为组件的本质是返回 UI。

```tsx
function App() {
  return <h1>Hello React</h1>;
}
```

---

###  JSX 标签必须闭合

正确：

```tsx
<div>Dashboard</div>
<input />
<img src="/logo.png" />
```

错误：

```tsx
<div>Dashboard
<input>
```

今天一开始出现大量红线，就是因为 JSX 标签没有完整闭合。

---

###  JSX 中使用 `className`，不是 `class`

HTML 中：

```html
<aside class="sidebar">
```

React JSX 中：

```tsx
<aside className="sidebar">
```

原因是：

```text
class 是 JavaScript 关键字，所以 JSX 中使用 className。
```

---

###  JSX 中用 `{}` 插入 JavaScript 表达式

例如：

```tsx
<h1>{props.title}</h1>
```

这里的 `{props.title}` 表示：

```text
读取 props 对象中的 title，并显示到 h1 中。
```

---

###  小写标签和大写组件的区别

```tsx
<div />
<main />
<aside />
```

这些是普通 HTML 标签。

```tsx
<Layout />
<Sidebar />
<Content />
```

这些是 React 组件。

React 通过首字母大小写区分：

```text
小写：HTML 标签
大写：React 组件
```

---

##  props 是什么

props 是：

```text
父组件传给子组件的数据对象。
```

也可以类比为：

```text
React 组件的参数。
```

例如普通函数：

```ts
function printTitle(title: string) {
  console.log(title);
}

printTitle("Dashboard");
```

React 组件中：

```tsx
function Content(props: { title: string }) {
  return <h1>{props.title}</h1>;
}

<Content title="Dashboard" />
```

可以近似理解为：

```ts
Content({
  title: "Dashboard"
});
```

---

##  ContentProps、props、props.title 的区别

今天重点纠正了一个理解：

```text
ContentProps 不是组件，也不是实际数据。
ContentProps 只是 TypeScript 类型规则。
```

例如：

```tsx
type ContentProps = {
  title: string;
};
```

含义是：

```text
Content 组件接收的 props 中必须有 title，并且 title 必须是 string。
```

而：

```tsx
function Content(props: ContentProps) {
  return <h1>{props.title}</h1>;
}
```

含义是：

```text
Content 接收一个 props 参数。
这个 props 参数必须符合 ContentProps 规定的结构。
Content 通过 props.title 读取 title。
```

最终关系：

```text
ContentProps = 类型规则
props = 实际收到的数据对象
props.title = 读取 props 对象里的 title 值
```

注意：

```text
title 是属性，不是函数，所以应该说“读取 props.title”，不是“调用 props.title”。
```

---

##  今天完成的组件代码

###  App.tsx

```tsx
import Layout from "./components/Layout";

function App() {
  return <Layout />;
}

export default App;
```

理解：

```text
App 是整个 React 应用的入口组件。
现在 App 不直接写页面细节，只负责渲染 Layout。
```

---

###  Layout.tsx

```tsx
import Sidebar from "./Sidebar";
import Content from "./Content";

function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <Content title="Dashboard" />
    </div>
  );
}

export default Layout;
```

理解：

```text
Layout 负责组合页面整体结构。
它导入并渲染 Sidebar 和 Content。
它通过 <Content title="Dashboard" /> 把 title 作为 props 传给 Content。
```

当前组件关系：

```text
Layout
├── Sidebar
└── Content(title = "Dashboard")
```

---

###  Sidebar.tsx

```tsx
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Admin Demo</h2>

      <nav className="sidebar-menu">
        <div className="menu-item">Dashboard</div>
        <div className="menu-item">Users</div>
        <div className="menu-item">Settings</div>
      </nav>
    </aside>
  );
}

export default Sidebar;
```

理解：

```text
Sidebar 负责渲染左侧菜单区域。
它包含 Admin Demo 标题，以及 Dashboard / Users / Settings 三个菜单项。
```

标签理解：

```text
aside：语义上表示侧边栏、辅助内容区域
h2：二级标题
nav：navigation，表示导航区域
div：这里临时作为每个菜单项的容器
```

注意：

```text
aside 只是语义上适合侧边栏，不会自动靠左。
真正决定它靠左的是 CSS 布局。
```

---

###  Content.tsx

```tsx
type ContentProps = {
  title: string;
};

function Content(props: ContentProps) {
  return (
    <main className="content">
      <h1>{props.title}</h1>
      <p>This is the main content area.</p>
    </main>
  );
}

export default Content;
```

理解：

```text
Content 负责渲染右侧主内容区域。
ContentProps 规定 Content 接收的 props 中必须有 title，并且 title 是 string。
Content 通过 props.title 读取父组件传来的 title，并显示到 h1 中。
```

---

##  props 的传递流程

代码：

```tsx
<Content title="Dashboard" />
```

传递流程：

```text
Layout 是父组件
Layout 渲染 Content 时写了 title="Dashboard"
React 把 title="Dashboard" 整理成 props 对象
Content 的参数 props 接收到这个对象
Content 内部通过 props.title 读取 "Dashboard"
{props.title} 在 JSX 中把它显示到 h1 里
```

最终页面中会显示：

```text
Dashboard
```

---

##  className 和 CSS 的关系

在 JSX 中：

```tsx
<aside className="sidebar">
```

在 CSS 中：

```css
.sidebar {
  width: 220px;
  background-color: #111827;
  color: white;
}
```

关系是：

```text
JSX 里写 className
CSS 里用同名 class 选择器
浏览器根据这个类名找到元素并应用样式
```

今天出现过一个错误：

```tsx
<aside className="siderbar">
```

但 CSS 中写的是：

```css
.sidebar {
  ...
}
```

因为 `siderbar` 和 `sidebar` 拼写不一致，所以样式没有生效。

结论：

```text
className 必须和 CSS 选择器名字完全一致。
多一个字母、少一个字母都会导致样式匹配失败。
```

---

##  className 和 id 的区别

`className` 对应 HTML 中的 `class`。

```tsx
<div className="menu-item">Dashboard</div>
```

CSS 中用：

```css
.menu-item {
  padding: 10px 12px;
}
```

`id` 用于唯一标识某个元素。

```tsx
<div id="root"></div>
```

CSS 中用：

```css
#root {
  ...
}
```

区别：

```text
id：这个元素是谁，强调唯一身份
className：这个元素属于哪一类，强调共享样式
```

React 项目中，大多数样式优先使用 `className`。

---

##  今日 CSS 核心理解

###  `.layout { display: flex; }`

```css
.layout {
  min-height: 100vh;
  display: flex;
}
```

作用：

```text
让 .layout 的直接子元素从默认上下排列，变成左右排列。
```

在今天的代码中：

```tsx
<div className="layout">
  <Sidebar />
  <Content title="Dashboard" />
</div>
```

`Sidebar` 和 `Content` 是 `.layout` 的直接子元素。

没有 `display: flex` 时：

```text
Sidebar
Content
```

加上 `display: flex` 后：

```text
Sidebar | Content
```

---

###  `.sidebar { width: 220px; }`

```css
.sidebar {
  width: 220px;
}
```

作用：

```text
让左侧 Sidebar 有固定宽度。
```

这样右侧 Content 才能从固定位置开始显示，布局更稳定。

---

###  `.content { flex: 1; }`

```css
.content {
  flex: 1;
}
```

作用：

```text
让 Content 在 flex 布局中占满剩余空间。
```

当前布局可以理解为：

```text
Sidebar 固定 220px
Content 占满剩余宽度
```

---

##  今日小实验

实验内容：

```text
把 .layout 中的 display: flex 注释掉。
```

观察结果：

```text
Sidebar 和 Content 从左右排列变成上下排列。
```

原因：

```text
没有 display: flex 时，普通块级元素按默认文档流上下排列。
display: flex 作用在父容器 .layout 上，可以控制它的直接子元素 Sidebar 和 Content 的排列方向。
```

结论：

```text
display: flex 在这里解决的是 Sidebar 和 Content 的左右布局问题。
```

---

##  今日最终复述

今天完成了 React 后台 Layout 的第一版拆分。

App 是整个 React 应用的入口组件，现在只负责渲染 Layout。

Layout 负责组合页面结构，内部包含 Sidebar 和 Content。Layout 通过 `<Content title="Dashboard" />` 把 title 作为 props 传给 Content。

Sidebar 负责渲染左侧菜单区域，包含 Admin Demo 标题，以及 Dashboard / Users / Settings 三个菜单项。

Content 负责渲染右侧主内容区域。ContentProps 定义 Content 接收的 props 类型规则，要求 props 中必须有 title，并且 title 是 string。Content 通过 `props.title` 读取父组件传来的 title，并在 h1 中显示。

JSX 里的 `className` 用来给元素添加 CSS class。`index.css` 通过 `.layout`、`.sidebar`、`.content` 等选择器设置样式。其中 `.layout { display: flex; }` 让 Sidebar 和 Content 这两个直接子元素左右排列，`.sidebar { width: 220px; }` 固定左侧宽度，`.content { flex: 1; }` 让右侧内容区占满剩余空间。

---

##  今日核心链路

```text
React 组件拆分
→ JSX 描述结构
→ props 传递 title
→ className 连接 CSS
→ display: flex 实现左右布局
```

---

##  今日易错点

1. JSX 标签必须闭合，否则会出现大量红线。
2. `ContentProps` 是类型规则，不是组件，也不是实际数据。
3. `props` 是实际收到的数据对象。
4. `props.title` 是读取属性，不是调用函数。
5. `className` 对应 CSS class，不是 id。
6. `className` 和 CSS 选择器名字必须完全一致。
7. `display: flex` 要加在父容器 `.layout` 上，才能影响它的直接子元素。
8. `App.css` 中 Vite 默认样式可能会干扰页面布局；今天布局样式统一放在 `index.css` 中。
