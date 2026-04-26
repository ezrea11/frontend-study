# Day 2 DOM 列表渲染与状态筛选

## 1. 这个知识点是什么

今天学习的是 **DOM 列表渲染与条件筛选**。

核心思想是：

> HTML 先提供固定容器，JavaScript 再根据数组数据动态创建页面元素，并把这些元素插入到 DOM 树中。

在本 demo 中：

- HTML 中的 `<ul id="userList"></ul>` 负责提供列表容器。
- JavaScript 中的 `renderUsers(list)` 负责把传入的用户数组渲染成多个 `li` 元素。
- `filter` 负责根据条件筛选数组，生成新的数组。
- 按钮点击事件负责触发不同的数据渲染。

---

## 2. 今天 demo 实现了什么

今天实现了一个：

> **后台用户列表渲染与活跃状态筛选功能**

功能包括：

1. 页面初始显示全部用户。
2. 点击 `Show All` 按钮后，重新显示全部用户。
3. 点击 `Show Active Users` 按钮后，只显示 `active === true` 的用户。
4. 每次重新渲染前都会清空旧列表，避免重复追加。

---

## 3. 关键代码分别负责什么

### 3.1 `users` 数组

```js
const users = [
  { name: "Alex", role: "Admin", active: true },
  { name: "Mia", role: "Editor", active: false },
  { name: "Leo", role: "Viewer", active: true },
  { name: "Nina", role: "Editor", active: false }
];
```

`users` 是原始用户数据数组。

每一个对象代表一个用户，其中：

- `name` 表示用户名。
- `role` 表示用户角色。
- `active` 表示用户是否处于活跃 / 启用状态。

---

### 3.2 `userList`

```js
const userList = document.querySelector("#userList");
```

`userList` 保存的是 HTML 中的：

```html
<ul id="userList"></ul>
```

也就是页面中专门用来装用户列表项的 `ul` 容器。

浏览器会先根据 HTML 生成 DOM 树，JavaScript 再通过 `querySelector` 找到这个 DOM 元素对象。

---

### 3.3 `renderUsers(list)`

```js
function renderUsers(list) {
  userList.innerHTML = "";

  list.forEach(function (user) {
    const li = document.createElement("li");
    li.textContent = user.name + " - " + user.role;
    userList.appendChild(li);
  });
}
```

`renderUsers(list)` 是今天最核心的渲染函数。

它负责：

> 把传入的用户数组 `list` 渲染到页面中的 `userList` 容器里。

注意：

```js
renderUsers(users);
```

表示渲染全部用户。

```js
renderUsers(activeUsers);
```

表示渲染筛选后的活跃用户。

所以 `renderUsers(list)` 不是只能渲染 `users`，而是可以渲染任何传进来的用户数组。

---

### 3.4 `userList.innerHTML = ""`

```js
userList.innerHTML = "";
```

这一行负责清空 `ul` 里面已有的旧 `li`。

如果不清空，后续每次点击按钮重新渲染时，新的 `li` 会继续追加到旧列表后面，导致页面内容重复。

它的作用是：

> 每次重新渲染前，先清空旧列表，保证页面只显示当前这一次渲染结果。

---

### 3.5 `list.forEach(...)`

```js
list.forEach(function (user) {
  // ...
});
```

`forEach` 负责遍历传入的用户数组。

每次遍历时：

- `list` 表示当前传入的用户数组。
- `user` 表示当前遍历到的一个用户对象。

例如第一次遍历时，`user` 可能是：

```js
{ name: "Alex", role: "Admin", active: true }
```

---

### 3.6 `document.createElement("li")`

```js
const li = document.createElement("li");
```

这一行通过 DOM API 创建一个新的 `li` DOM 元素对象。

注意：

> `createElement("li")` 只是创建了一个还没有挂载到页面上的 DOM 节点。

此时这个 `li` 还没有进入 DOM 树，所以页面上看不到它。

---

### 3.7 `li.textContent`

```js
li.textContent = user.name + " - " + user.role;
```

这一行负责给 `li` 填入用户信息。

例如当前用户对象是：

```js
{ name: "Alex", role: "Admin", active: true }
```

那么这行代码会让 `li` 的显示内容变成：

```text
Alex - Admin
```

---

### 3.8 `userList.appendChild(li)`

```js
userList.appendChild(li);
```

这一行负责把创建好的 `li` 添加到 `ul` 容器中。

也就是说：

```text
createElement 创建 li
textContent 填入文字
appendChild 把 li 插入 DOM 树
```

只有执行 `appendChild(li)` 之后，页面上才会真正显示这个列表项。

---

## 4. `filter` 的作用

```js
const activeUsers = users.filter(function (user) {
  return user.active === true;
});
```

`filter` 的作用是：

> 从原数组中筛选出符合条件的元素，并返回一个新数组。

在这里：

```js
return user.active === true;
```

表示：

- 如果当前用户的 `active` 严格等于 `true`，就保留这个用户。
- 如果不是 `true`，就不保留这个用户。

所以最终得到的新数组 `activeUsers` 只包含：

```text
Alex
Leo
```

注意：

> `filter` 不会修改原来的 `users` 数组，它会返回一个新的数组。

---

## 5. 按钮点击后的执行流程

### 5.1 点击 `Show All`

```js
showAllButton.addEventListener("click", function () {
  renderUsers(users);
});
```

执行流程：

```text
用户点击 Show All
↓
click 事件触发回调函数
↓
执行 renderUsers(users)
↓
renderUsers 先用 userList.innerHTML = "" 清空 ul 里的旧 li
↓
遍历 users 数组
↓
每个 user 创建一个新的 li
↓
把 user.name 和 user.role 写进 li
↓
appendChild 把 li 加到 userList 这个 ul 里
↓
页面显示全部用户
```

---

### 5.2 点击 `Show Active Users`

```js
showActiveButton.addEventListener("click", function () {
  const activeUsers = users.filter(function (user) {
    return user.active === true;
  });

  renderUsers(activeUsers);
});
```

执行流程：

```text
用户点击 Show Active Users
↓
click 事件触发回调函数
↓
users.filter(...) 遍历 users
↓
只保留 active === true 的用户，生成新数组 activeUsers
↓
执行 renderUsers(activeUsers)
↓
renderUsers 先清空 ul 里的旧 li
↓
遍历 activeUsers
↓
每个 user 创建一个新的 li
↓
把 user.name 和 user.role 写进 li
↓
appendChild 把 li 加到 userList 这个 ul 里
↓
页面只显示 Alex 和 Leo
```

---

## 6. 我做的小实验是什么，结论是什么

### 实验内容

把 `renderUsers` 里的这一行注释掉：

```js
userList.innerHTML = "";
```

改成：

```js
// userList.innerHTML = "";
```

然后依次点击：

1. `Show Active Users`
2. `Show All`
3. `Show Active Users`

---

### 实验现象

页面上的用户列表会不断叠加。

旧的列表项不会消失，新的列表项会继续追加到旧列表后面。

---

### 实验原因

每次 `renderUsers` 被调用时，都会执行：

```js
const li = document.createElement("li");
li.textContent = user.name + " - " + user.role;
userList.appendChild(li);
```

也就是说，每次都会：

```text
创建新的 li
↓
填入文字
↓
追加到 ul 后面
```

如果不先清空旧的 `li`，页面就会把旧结果和新结果都堆在一起。

---

### 实验结论

`userList.innerHTML = ""` 的作用是：

> 每次重新渲染前清空旧列表，保证页面只显示当前这一次渲染结果，而不是把每次旧结果都堆在页面上。

这说明：

> `renderUsers` 是“重新渲染”，不是“在旧列表后面继续补充”。

---

## 7. HTML、DOM、JavaScript 的关系

今天还理解了 HTML、DOM 和 JavaScript 的关系：

```text
HTML：写在文件里的页面源码
DOM：浏览器根据 HTML 解析出来的页面对象结构
DOM 树：DOM 对象之间形成的父子层级关系
JavaScript：通过 DOM API 操作这棵树
```

例如：

```html
<ul id="userList"></ul>
```

浏览器会把它解析成 DOM 树里的一个 `ul` 节点。

然后 JS 通过：

```js
const userList = document.querySelector("#userList");
```

找到这个节点。

再通过：

```js
const li = document.createElement("li");
userList.appendChild(li);
```

动态创建新的 `li` 节点，并把它插入到 `ul` 下面。

---

## 8. 这个能力以后能用在 React 项目的哪里

这个能力以后可以用在 React 中后台项目的 `Users` 用户列表页中。

具体对应功能包括：

1. 用户列表展示。
2. 按用户状态筛选 active / inactive 用户。
3. 搜索或筛选后重新渲染列表。
4. 分页前的数据过滤。
5. 表格数据展示前的数据处理。

---

## 9. 今日功能点名称

今天这个 demo 最终可以命名为：

```text
后台用户列表渲染与活跃状态筛选功能
```

这个名字说明了三件事：

1. 它属于后台项目能力。
2. 它负责展示用户列表。
3. 它支持按用户 active 状态筛选。

---

## 10. 今日完整代码参考

### `dom-list-demo.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>DOM List Demo</title>
</head>
<body>
  <h1>User List</h1>

  <button id="showAllButton">Show All</button>
  <button id="showActiveButton">Show Active Users</button>

  <ul id="userList"></ul>

  <script src="./dom-list-demo.js"></script>
</body>
</html>
```

---

### `dom-list-demo.js`

```js
const users = [
  { name: "Alex", role: "Admin", active: true },
  { name: "Mia", role: "Editor", active: false },
  { name: "Leo", role: "Viewer", active: true },
  { name: "Nina", role: "Editor", active: false }
];

const userList = document.querySelector("#userList");
const showAllButton = document.querySelector("#showAllButton");
const showActiveButton = document.querySelector("#showActiveButton");

function renderUsers(list) {
  userList.innerHTML = "";

  list.forEach(function (user) {
    const li = document.createElement("li");
    li.textContent = user.name + " - " + user.role;
    userList.appendChild(li);
  });
}

showAllButton.addEventListener("click", function () {
  renderUsers(users);
});

showActiveButton.addEventListener("click", function () {
  const activeUsers = users.filter(function (user) {
    return user.active === true;
  });

  renderUsers(activeUsers);
});

renderUsers(users);
```

