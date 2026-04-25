# Day 1 DOM Basic Demo Notes

## 1. DOM 是什么

DOM 是 **Document Object Model**，也就是**文档对象模型**。

当 HTML 文件被浏览器打开后，浏览器会自动把 HTML 解析成一棵 **DOM 树**。

DOM 树里的每个 HTML 标签，都会变成 JavaScript 可以操作的 **DOM 元素对象**。

所以可以这样理解：

```text
HTML 是我们写出来的页面结构代码；
DOM 是浏览器根据 HTML 生成出来的页面对象结构。
```

---

## 2. DOM API 是什么

DOM API 是浏览器提供给 JavaScript 的一套工具。

JavaScript 不能凭空操作页面上的某个标签。它需要先通过 DOM API 找到对应的 DOM 元素对象，然后才能读取、修改或绑定事件。

今天用到的 DOM API / DOM 属性主要有：

- `document.querySelector()`
- `value`
- `textContent`
- `addEventListener()`

---

## 3. 今天 demo 实现了什么功能

今天的 demo 实现了一个最小的 **表单输入校验 + 重置功能**。

功能包括：

1. 用户可以在输入框中输入名字。
2. 点击 `Show Name` 按钮后，页面会根据输入内容显示不同结果。
3. 如果输入为空，或者只输入了空格，页面会显示错误提示。
4. 如果输入了有效内容，页面会显示问候语。
5. 点击 `Clear` 按钮后，输入框会被清空，页面提示文字也会被重置。

这个 demo 不只是一个普通 DOM 练习，它对应后续 React 项目里的登录表单、搜索框、新增用户表单、编辑用户表单等基础能力。

---

## 4. HTML 结构分别负责什么

```html
<input id="nameInput" type="text" placeholder="Enter your name" />

<button id="showButton">Show Name</button>
<button id="clearButton">Clear</button>

<p id="resultText">Your name will appear here.</p>
```

### `input`

`input` 负责接收用户输入的数据。

在这个 demo 中，它用来接收用户输入的名字。

### `button`

`button` 本身只是页面上的按钮。

真正的点击逻辑不是 HTML 自己完成的，而是 JavaScript 通过 `addEventListener()` 给按钮绑定事件后完成的。

### `p`

`p` 标签负责显示 JavaScript 处理后的结果。

它一开始显示默认提示文字，点击按钮后，JS 会通过 `textContent` 修改它显示的内容。

---

## 5. 关键 JS 代码分别负责什么

### 5.1 `querySelector`

```js
const nameInput = document.querySelector("#nameInput");
const showButton = document.querySelector("#showButton");
const clearButton = document.querySelector("#clearButton");
const resultText = document.querySelector("#resultText");
```

`querySelector` 用来从 DOM 树中找到指定的元素对象。

例如：

```js
const nameInput = document.querySelector("#nameInput");
```

意思是：

```text
从 DOM 树中找到 id 为 nameInput 的 input 元素，
并把这个元素对象保存到 nameInput 变量中。
```

虽然浏览器会自动把 HTML 解析成 DOM 树，但 JavaScript 不会自动知道我们想操作哪个元素。

所以，如果 JS 想读取、修改或绑定某个页面元素，就需要先通过 `querySelector` 找到这个元素对象。

---

### 5.2 `value`

```js
const name = nameInput.value.trim();
```

`value` 表示输入框中用户真正输入的内容。

例如，用户输入 `James`，那么：

```js
nameInput.value
```

拿到的就是：

```text
James
```

如果写：

```js
nameInput.value = "";
```

意思是把输入框中的内容清空。

---

### 5.3 `trim()`

```js
const name = nameInput.value.trim();
```

`trim()` 用来去掉字符串前后的空白字符。

在这个 demo 中，它的作用是防止用户只输入几个空格，也被当成有效输入。

例如用户输入：

```text
"     "
```

如果不用 `trim()`，这不是空字符串，程序可能会误以为用户输入了内容。

加上 `trim()` 后：

```js
"     ".trim()
```

结果会变成：

```text
""
```

所以程序可以正确判断为空输入。

---

### 5.4 `textContent`

```js
resultText.textContent = "Hello, " + name + "!";
```

`textContent` 是 DOM 元素对象上的属性，用来获取或修改元素中的文字内容。

例如：

```js
resultText.textContent = "Hello, James!";
```

意思是把 `p` 标签在页面上显示的文字改成：

```text
Hello, James!
```

它是属性，不是函数，所以使用 `=` 赋值，而不是写成 `textContent(...)`。

---

### 5.5 `addEventListener`

```js
showButton.addEventListener("click", function () {
  // 点击按钮后执行
});
```

`addEventListener` 是 DOM 元素对象上的方法，用来给元素绑定事件监听。

它的结构是：

```js
元素.addEventListener("事件类型", 事件发生后要执行的函数);
```

在这个 demo 中：

```js
showButton.addEventListener("click", function () {
  console.log("button clicked");
});
```

意思是：

```text
给 showButton 绑定 click 事件。
当用户点击 showButton 时，浏览器执行 function 里面的代码。
```

注意：

`addEventListener` 不会立刻执行里面的函数。它只是先登记一个事件规则。

只有当用户真正触发对应事件时，回调函数才会执行。

---

## 6. Show Name 功能的执行流程

```js
showButton.addEventListener("click", function () {
  const name = nameInput.value.trim();

  if (name === "") {
    resultText.textContent = "Please enter your name first.";
  } else {
    resultText.textContent = "Hello, " + name + "!";
  }
});
```

执行流程：

1. 用户在输入框中输入内容。
2. 用户点击 `Show Name` 按钮。
3. `click` 事件触发。
4. 浏览器执行 `addEventListener` 里的回调函数。
5. JS 读取 `nameInput.value`。
6. `trim()` 去掉输入内容前后的空格。
7. 如果结果为空字符串，说明用户没有输入有效内容。
8. 页面显示错误提示：`Please enter your name first.`
9. 如果结果不为空，页面显示问候语：`Hello, 用户输入的名字!`

---

## 7. Clear 功能的执行流程

```js
clearButton.addEventListener("click", function () {
  nameInput.value = "";
  resultText.textContent = "Your name will appear here.";
});
```

执行流程：

1. 用户点击 `Clear` 按钮。
2. `click` 事件触发。
3. 浏览器执行 `clearButton` 绑定的回调函数。
4. `nameInput.value = ""` 清空输入框内容。
5. `resultText.textContent = "Your name will appear here."` 把页面提示文字重置为初始状态。

---

## 8. 今天做的小实验

### 实验：在事件监听函数中加入 `console.log`

代码：

```js
console.log("JS file loaded");

showButton.addEventListener("click", function () {
  console.log("button clicked");
});
```

观察结果：

1. 页面刷新时，控制台会立刻输出：

```text
JS file loaded
```

2. 只有点击 `Show Name` 按钮后，控制台才会输出：

```text
button clicked
```

结论：

普通 JS 代码会在页面加载时按照顺序执行。

但是 `addEventListener` 里面的函数不会立刻执行。它只有在指定事件真正发生时才会执行。

---

## 9. 今日完整链路

今天这个 DOM demo 的完整链路是：

```text
HTML 文件
↓
浏览器解析成 DOM 树
↓
JS 通过 querySelector 找到 DOM 元素对象
↓
JS 通过 addEventListener 绑定点击事件
↓
用户点击按钮
↓
JS 读取 input.value
↓
JS 根据输入内容判断状态
↓
JS 通过 textContent 修改页面显示
```

---

## 10. 和后续 React 项目的关系

这个 demo 对应后续 React 项目中的表单和交互能力。

以后这些功能都会用到类似思想：

- 登录页输入校验
- 注册页输入校验
- 搜索框读取关键词
- 新增用户表单
- 编辑用户表单
- 表单重置功能
- 根据用户输入显示不同页面反馈

虽然 React 中通常不会直接频繁使用 `querySelector` 操作 DOM，但今天这个 demo 让我们先理解了最基础的页面交互逻辑：

```text
用户输入
↓
程序读取数据
↓
程序判断状态
↓
页面反馈变化
```

这条链路会在 React 的 `useState`、受控组件、表单校验中继续出现。

---

## 11. 可复述版本

可以用下面这段话复述今天内容：

> DOM 是浏览器把 HTML 解析后生成的页面对象树。JavaScript 如果想操作页面元素，需要先通过 `querySelector` 找到 DOM 元素对象。找到之后，可以用 `value` 读取输入框内容，用 `textContent` 修改页面文字，用 `addEventListener` 给按钮绑定点击事件。今天的 demo 实现了一个表单输入校验和重置功能：用户输入名字后点击按钮，JS 读取输入内容并判断是否为空；如果为空就显示错误提示，如果有效就显示问候语；点击 Clear 后会清空输入框并重置页面文字。这个能力以后可以迁移到 React 项目里的登录页、搜索框和用户表单中。
