# Day 8 - React Router 页面导航与菜单高亮复盘版

##  今日功能

完成 React Router 页面导航第一版：

- `/login` 显示 Login 页面
- `/dashboard` 显示 Dashboard 页面
- `/users` 显示 Users 页面
- 其他未匹配路径进入 404 NotFound 页面
- 使用 `NavLink + isActive + CSS` 实现当前导航高亮

今日功能命名：

> Router 页面导航与当前菜单高亮功能第一版

---

##  核心概念

- `BrowserRouter`：给整个 App 提供路由环境，让 React 应用可以根据浏览器 URL 渲染对应组件。
- `Routes`：在多个 `Route` 中查找当前 URL 匹配的路由。
- `Route`：定义 `path` 和 `element` 的对应关系。
- `Link`：只负责跳转路由，不提供当前页面是否 active 的判断。
- `NavLink`：负责跳转路由，并且能判断自己的 `to` 路径是否和当前 URL 匹配。
- `isActive`：React Router 传给 `NavLink` 的状态，表示当前路径是否匹配。
- `path="*"`：兜底路由，当前面的路径都匹配不上时，渲染 NotFound 页面。

---

##  关键代码链路

### main.tsx

```tsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

`BrowserRouter` 包住 `App`，让 `App` 内部可以使用 React Router 的路由功能。

### App.tsx

```tsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/users" element={<Users />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

这段代码建立了 URL 和页面组件的对应关系。

例如：

```tsx
<Route path="/dashboard" element={<Dashboard />} />
```

表示：当当前路径是 `/dashboard` 时，渲染 `Dashboard` 组件。

### NavLink 高亮

```tsx
<NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"
  }
>
  Dashboard
</NavLink>
```

这段代码的作用是：

- 点击后跳转到 `/dashboard`
- 判断当前 URL 是否匹配 `/dashboard`
- 如果匹配，返回 `"nav-link active"`
- CSS 根据 `active` 类名显示高亮

---

## 功能流程复述

用户点击 Dashboard 导航后，`NavLink` 会把浏览器 URL 改成 `/dashboard`。

URL 改变后，`Routes` 会在所有 `Route` 中查找当前路径匹配的路由。当 `path="/dashboard"` 匹配成功时，React Router 会渲染 `Dashboard` 组件。

同时，`NavLink` 会比较当前 URL 和自己的 `to="/dashboard"` 是否匹配。如果匹配，`isActive` 为 `true`，`className` 返回 `"nav-link active"`，CSS 根据 `active` 类名让 Dashboard 导航高亮。

如果用户访问不存在的路径，比如 `/abc`，前面的正式路由都无法匹配，最后 `path="*"` 会渲染 `NotFound` 页面。

这个能力以后会用于中后台项目的页面切换、Sidebar 高亮、登录跳转和 404 页面兜底。

---

## 今日小实验

实验代码：

```tsx
<NavLink
  to="/users"
  className={() => "nav-link active"}
>
  Users
</NavLink>
```

实验现象：

无论当前 URL 是 `/login`、`/dashboard` 还是 `/users`，Users 都会一直高亮。

原因：

这里的 `className` 函数不再根据 `isActive` 判断当前 URL 是否匹配，而是永远返回 `"nav-link active"`。

结论：

- `NavLink` 提供 active 判断能力。
- `isActive` 表示当前 URL 是否匹配该 `NavLink` 的 `to` 路径。
- CSS 不负责判断当前页面，只负责把 `.active` 类名显示成高亮样式。
- 如果不使用 `isActive`，而是固定返回 active 类名，导航项就会一直高亮。

---

## 今日易错点

### Link 和 NavLink 的区别

`Link` 和 `NavLink` 都能跳转路由。

区别是：

```text
Link：只负责跳转。
NavLink：跳转 + 判断当前路径是否 active。
```

所以：

- 普通跳转用 `Link`
- 导航菜单、Sidebar、Tab 高亮用 `NavLink`

### isActive 不是 CSS 给的

`isActive` 是 React Router 给 `NavLink` 的状态。

CSS 只负责视觉效果：

```css
.nav-link.active {
  color: #1677ff;
  font-weight: 700;
}
```

### NavLink 不会自动高亮

`NavLink` 只是提供 active 判断能力。

真正高亮需要完整链路：

```text
当前 URL 匹配 NavLink 的 to
→ isActive = true
→ className 返回 "nav-link active"
→ CSS 让 active 类名显示成高亮
```

### path="*" 不是 HTML 里的意思

在 React Router 里，`path="*"` 表示兜底匹配。

当前面的正式路径都匹配不上时，才会进入 `NotFound` 页面。

---

## 项目用途

今天的 Router 能力后续会用于中后台项目中的：

- 页面路由切换
- Sidebar 当前菜单高亮
- 登录成功后的页面跳转
- 404 NotFound 页面
- 后续路由守卫 Auth Guard
- 后续 Layout 和子页面组合

今天完成的是中后台项目从“组件状态切换”升级到“真实页面路由”的第一步。
