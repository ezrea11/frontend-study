# Day 3 DOM 表单校验学习版 Notes

## 今日主题

今天学习的是：

**DOM 表单校验 + 页面提示状态变化**

这个知识点服务后续 React 中后台项目中的多个功能：

- 登录页用户名 / 密码校验
- 新增用户表单校验
- 编辑用户表单校验
- 搜索框输入处理
- 表单提交前的输入检查

今天完成的功能可以命名为：

**用户名非空校验与提示功能**

---

## 今天实现的 demo 功能

页面中有：

- 一个用户名输入框
- 一个 Submit 按钮
- 一个错误提示区域 `errorText`
- 一个结果提示区域 `resultText`

功能效果：

1. 用户输入有效用户名后，点击 Submit，页面显示提交成功提示。
2. 用户不输入内容，或者只输入空格，点击 Submit，页面显示错误提示。
3. 每次点击按钮时，页面会根据当前输入内容重新更新提示状态。

---

##  HTML 结构理解

HTML 中提前写好页面结构：

```html
<input id="nameInput" type="text" placeholder="Enter user name" />
<button id="submitButton">Submit</button>

<p id="errorText"></p>
<p id="resultText"></p>
```

这里需要注意：

- 输入框和按钮是开发者提前在 HTML 文件中写好的。
- 用户不是“创建输入框”，而是在输入框中输入内容。
- `errorText` 负责显示错误提示。
- `resultText` 负责显示提交成功提示。

---

##  JS 核心代码

```js
const nameInput = document.querySelector("#nameInput");
const submitButton = document.querySelector("#submitButton");
const errorText = document.querySelector("#errorText");
const resultText = document.querySelector("#resultText");

submitButton.addEventListener("click", function () {
  const name = nameInput.value.trim();

  if (name === "") {
    errorText.textContent = "Please enter a user name.";
    resultText.textContent = "";
    return;
  }

  errorText.textContent = "";
  resultText.textContent = "Submitted user: " + name;
});
```

---

##  关键代码解释

###  `document.querySelector`

```js
const nameInput = document.querySelector("#nameInput");
```

作用：

从 DOM 树中获取指定选择器对应的 DOM 元素对象。

更准确的表达是：

- `nameInput` 保存的是输入框这个 DOM 元素对象。
- `nameInput.value` 才是输入框中的文本内容。

不要说：

> `nameInput` 是用户输入的内容。

应该说：

> `nameInput` 是 input 元素对象，`nameInput.value` 是用户输入的文本内容。

---

###  `addEventListener`

```js
submitButton.addEventListener("click", function () {
  ...
});
```

作用：

给按钮注册 click 事件监听器。

重点：

- `addEventListener` 在页面加载时执行，用来登记事件规则。
- 里面的回调函数不是页面一加载就执行。
- 当用户点击 Submit 按钮时，浏览器才会执行这个回调函数。

准确表达：

> 点击按钮后，浏览器执行 `addEventListener` 里注册的 click 回调函数。

---

###  `nameInput.value`

```js
nameInput.value
```

作用：

读取输入框当前的文本内容。

例如：

用户输入：

```text
abc
```

那么：

```js
nameInput.value
```

得到的就是：

```text
"abc"
```

---

###  `trim()`

```js
const name = nameInput.value.trim();
```

作用：

去掉字符串开头和结尾的空格。

注意：

- `trim()` 不会修改输入框本身。
- 它只是返回一个去掉前后空格后的新字符串。
- 它不会删除字符串中间的空格。

例如：

```js
"   abc   ".trim()
```

结果是：

```text
"abc"
```

但是：

```js
"Alex Jin".trim()
```

结果仍然是：

```text
"Alex Jin"
```

---

##  表单校验是什么

表单校验可以先理解为：

> 在用户提交输入内容之前，先检查输入是否符合要求。

常见表单校验包括：

- 用户名不能为空
- 密码不能为空
- 密码长度不能少于 6 位
- 邮箱必须包含 `@`
- 手机号必须是数字
- 年龄不能是负数

今天做的是最基础的校验：

**用户名不能为空，而且不能只输入空格。**

---

##  `if (name === "")` 的作用

```js
if (name === "") {
  errorText.textContent = "Please enter a user name.";
  resultText.textContent = "";
  return;
}
```

作用：

判断用户输入经过 `trim()` 处理后是否为空字符串。

如果为空：

1. `errorText` 显示错误提示。
2. `resultText` 被清空。
3. `return` 提前结束当前 click 回调函数。

---

##  `return` 的作用

这里的 `return` 不是 `if / else` 本身。

它的作用是：

> 提前结束当前函数，阻止后面的成功提交逻辑继续执行。

也就是说：

如果输入为空，执行完错误提示后，函数直接结束，不会继续执行：

```js
errorText.textContent = "";
resultText.textContent = "Submitted user: " + name;
```

这种写法可以理解为：

```text
先处理错误情况；
如果错误发生，就提前退出；
剩下的代码默认处理合法情况。
```

---

##  合法输入时页面如何变化

```js
errorText.textContent = "";
resultText.textContent = "Submitted user: " + name;
```

如果输入合法：

- `errorText` 被清空。
- `resultText` 显示提交成功提示。

例如用户输入：

```text
abc
```

页面显示：

```text
Submitted user: abc
```

---

##  小实验：去掉 `trim()`

实验代码：

把：

```js
const name = nameInput.value.trim();
```

改成：

```js
const name = nameInput.value;
```

然后测试：

1. 输入 `abc`
2. 只输入几个空格

实验结果：

- 输入 `abc` 时，页面显示提交成功。
- 只输入空格时，页面仍然显示提交成功。

原因：

```js
"   " !== ""
```

只输入空格时，字符串并不是空字符串，而是由空格组成的字符串。

结论：

`trim()` 在表单校验中很重要，因为它能把“只输入空格”的情况处理成空字符串，从而让系统正确显示错误提示。

---

##  今日标准流程复述

完整流程：

1. 开发者先在 HTML 文件中写好输入框、按钮、错误提示区和结果提示区。
2. 页面加载后，JS 通过 `document.querySelector` 获取这些 DOM 元素对象。
3. JS 使用 `addEventListener` 给按钮注册 click 事件监听器。
4. 用户在输入框中输入用户名，并点击 Submit。
5. 点击发生后，浏览器执行 click 回调函数。
6. 回调函数通过 `nameInput.value.trim()` 读取输入内容并去掉前后空格。
7. 如果处理后的输入为空字符串：
   - `errorText` 显示错误提示
   - `resultText` 清空
   - `return` 提前结束函数
8. 如果输入合法：
   - `errorText` 清空
   - `resultText` 显示提交成功提示

---

##  今日容易混淆的表达

### 错误表达 1

> 用户创建了输入框。

正确表达：

> 输入框是开发者提前在 HTML 中写好的，用户只是在输入框中输入内容。

---

### 错误表达 2

> `nameInput` 是用户输入的内容。

正确表达：

> `nameInput` 是 input DOM 元素对象，`nameInput.value` 才是用户输入的文本内容。

---

### 错误表达 3

> `addEventListener` 点击后执行。

更准确：

> `addEventListener` 在页面加载时执行，用来注册事件监听器；点击后执行的是它里面注册的回调函数。

---

### 错误表达 4

> `trim()` 清空字符串前后空格。

更准确：

> `trim()` 去掉字符串开头和结尾的空格。

---

##  这个能力以后能用在哪里

今天学到的能力后续可以用于：

1. React 登录页用户名非空校验
2. React 登录页密码非空校验
3. 新增用户表单校验
4. 编辑用户表单校验
5. 搜索框输入内容处理
6. 表单提交前的基础输入检查

今天的 demo 虽然很小，但它对应的是中后台项目中非常常见的表单校验逻辑。

---

##  今日功能命名

今天这个 demo 不应该只叫：

```text
DOM demo
```

更准确的功能名是：

```text
用户名非空校验与提示功能
```

或者：

```text
文本输入合法性校验与提示功能
```
