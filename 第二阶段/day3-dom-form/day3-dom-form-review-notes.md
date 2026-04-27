# Day 3 DOM 表单校验简洁复盘版

## 今日功能

今天完成的是：

**用户名非空校验与提示功能**

也就是：

- 输入为空：显示错误提示
- 输入合法：显示提交成功提示
- 只输入空格：也应该被判断为空输入

---

## 核心代码流程

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

## 必须记住的 5 个点

### 1. `querySelector`

从 DOM 树中获取 DOM 元素对象。

```js
const nameInput = document.querySelector("#nameInput");
```

注意：

- `nameInput` 是 input 元素对象
- `nameInput.value` 才是用户输入的内容

---

###  `addEventListener`

给按钮注册点击事件。

```js
submitButton.addEventListener("click", function () {
  ...
});
```

注意：

- `addEventListener` 是注册规则
- 点击后执行的是里面的回调函数

---

###  `value`

读取输入框当前内容。

```js
nameInput.value
```

---

###  `trim()`

去掉字符串开头和结尾的空格。

```js
nameInput.value.trim()
```

作用：

防止只输入空格也被当成合法输入。

---

###  `return`

提前结束当前 click 回调函数。

作用：

输入为空时，显示错误提示后直接退出，不再执行后面的成功逻辑。

---

## 页面变化逻辑

### 输入为空时

```js
errorText.textContent = "Please enter a user name.";
resultText.textContent = "";
return;
```

页面效果：

- `errorText` 显示错误提示
- `resultText` 清空

---

### 输入合法时

```js
errorText.textContent = "";
resultText.textContent = "Submitted user: " + name;
```

页面效果：

- `errorText` 清空
- `resultText` 显示成功提示

---

## 小实验结论

如果把：

```js
const name = nameInput.value.trim();
```

改成：

```js
const name = nameInput.value;
```

那么只输入空格也会被当成合法输入。

原因：

```js
"   " !== ""
```

结论：

`trim()` 是非空校验中很关键的一步。

---

##  标准复述

用户在输入框中输入内容，然后点击 Submit。

点击后，浏览器执行 `addEventListener` 中注册的 click 回调函数。

回调函数通过 `nameInput.value.trim()` 读取输入内容，并去掉前后空格。

如果结果是空字符串，说明输入无效：

- 显示错误提示
- 清空成功结果
- 用 `return` 结束函数

如果结果不是空字符串，说明输入合法：

- 清空错误提示
- 显示提交成功结果

---

## 后续用途

这个能力后续可以用于：

- React 登录页表单校验
- 用户新增表单校验
- 用户编辑表单校验
- 搜索框输入处理
