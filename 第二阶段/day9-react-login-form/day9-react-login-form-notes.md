# 第二阶段 Day9 前端复盘：React 登录表单

##  今日功能

完成 React 登录表单第一版：

- username / password 受控输入
- 空输入校验
- 固定账号密码校验
- 错误信息展示
- 登录成功后跳转到 `/dashboard`

功能命名：

```text
React 登录表单受控组件 + 固定账号校验 + 登录成功跳转
```

---

##  核心知识点：controlled input

React 受控输入框的核心是：

```text
input 显示什么，由 state 决定；
用户输入什么，通过 onChange 更新 state。
```

流程：

```text
用户输入
→ onChange 触发
→ event.target.value 拿到输入框最新内容
→ setUsername / setPassword 更新 state
→ React 重新渲染
→ input 的 value 显示最新 state
```

---

##  handleSubmit 流程

用户点击 Login 后：

1. `form` 触发 `submit` 事件
2. `handleSubmit` 执行
3. `event.preventDefault()` 阻止 HTML form 默认提交和页面刷新
4. `trim()` 去掉用户名和密码前后空格
5. 如果用户名或密码为空，显示空输入错误
6. 如果账号密码不匹配，显示账号密码错误
7. 如果校验通过，清空错误信息并 `navigate("/dashboard")`

---

##  form submit 与 preventDefault

HTML 的 `form` 默认提交时会刷新页面。

但 React 表单通常希望由 React 自己控制提交逻辑，例如：

- 校验 username / password
- 设置 errorMessage
- 登录成功后 `navigate("/dashboard")`

所以在 `handleSubmit` 里需要写：

```tsx
event.preventDefault();
```

它的作用是阻止 `form` 的默认提交和页面刷新，避免 React 应用重新加载、state 被重置。

当前不需要系统掌握完整 HTML form 体系，例如：

```text
form action / method
浏览器完整提交流程
表单序列化
原生 submit 生命周期
```

当前只需要记住：

```text
React 登录页里，form 负责触发 submit；
preventDefault 负责阻止默认刷新；
handleSubmit 负责接管校验和跳转。
```

---

##  今日关键理解

React state 存在当前页面运行时的 JS 环境中。

如果 `form` 默认提交导致页面刷新，React 应用会重新加载，state 会被重置。

所以 React 表单提交时通常要写：

```tsx
event.preventDefault();
```

让 React 自己控制校验、错误提示和页面跳转。

---

##  后续项目连接

今天的登录页以后可以升级为真实登录功能：

```text
React 登录页
→ 调用后端登录 API
→ 后端查询数据库并校验账号密码
→ 返回成功 / 失败
→ 前端根据结果保存登录状态、跳转页面或展示错误
```

注意：

```text
前端不直接连接数据库。
```

前端负责：

- 收集用户输入
- 做基础表单校验
- 调用后端 API
- 根据后端返回结果展示错误或跳转页面

后端负责：

- 接收 username / password
- 查询数据库
- 校验账号密码
- 返回登录成功或失败结果
