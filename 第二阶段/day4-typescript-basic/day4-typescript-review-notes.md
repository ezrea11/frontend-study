# 第二阶段 Day 4 TypeScript 复盘版笔记

## 1. 今日学习目标

今天是第二阶段 Day 4，主题是 TypeScript 第一轮。

核心目标不是学完整个 TypeScript，而是先掌握最基础的类型意识：

```text
变量应该保存什么类型的数据；
对象应该有什么结构；
函数应该接收什么类型的参数；
函数应该返回什么类型的结果。
```

今天的功能点是：

```text
把 Day 3 的 DOM 表单校验逻辑 TypeScript 化。
```

---

## 2. 今天掌握的核心概念

### 2.1 TypeScript 的本质

TypeScript 是 JavaScript 的带类型版本。

它的核心作用是：

```text
在代码运行之前，提前发现类型不匹配的问题。
```

可以简单理解为：

```text
TypeScript = JavaScript + 类型检查
```

---

### 2.2 interface 不是创建对象

今天最重要的理解之一：

```text
interface User 不是创建一个用户对象，
而是创建一套用户对象结构规则。
```

例如：

```ts
interface User {
  name: string;
  age: number;
  isStudent: boolean;
  skills: string[];
}
```

这段代码只是规定：

```text
User 类型的对象应该长什么样。
```

真正创建对象的是：

```ts
const user: User = {
  name: "James",
  age: 20,
  isStudent: true,
  skills: ["HTML", "CSS", "JavaScript"],
};
```

可以记成：

```text
interface = 类型规则
const user = 真实对象
```

---

### 2.3 函数参数类型和返回值类型

例如：

```ts
function getUserIntro(user: User): string {
  return `${user.name} is ${user.age} years old.`;
}
```

这里有两个类型限制：

```ts
user: User
```

表示：

```text
传入函数的参数必须符合 User 结构。
```

```ts
): string
```

表示：

```text
这个函数最终必须返回 string。
```

所以：

```ts
function getUserIntro(user: User): string {
  return user.age;
}
```

会报错，因为 `user.age` 是 number，不是 string。

---

## 3. 今日 demo 复盘

### 3.1 DOM 元素类型

今天写了：

```ts
const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
```

含义是：

```text
从 DOM 树中找 #nameInput，
并告诉 TypeScript：我预期它是 HTMLInputElement 类型。
```

关键点：

```text
nameInput 保存的是 input DOM 元素对象，
不是用户输入的文字。
```

真正的用户输入内容来自：

```ts
nameInput.value
```

---

### 3.2 querySelector 为什么可能是 null

如果 HTML 中不存在对应元素：

```html
<input id="nameInput" />
```

那么：

```ts
document.querySelector<HTMLInputElement>("#nameInput")
```

可能返回：

```ts
null
```

因此代码中需要判断：

```ts
if (nameInput === null || errorText === null || resultText === null) {
  return;
}
```

这个判断是为了防止后续访问 `null.value` 或 `null.textContent` 时报错。

---

### 3.3 可选链 `?.`

```ts
submitButton?.addEventListener("click", function (): void {
  // ...
});
```

含义是：

```text
如果 submitButton 不是 null，就注册点击事件；
如果 submitButton 是 null，就什么都不做，避免报错。
```

它防止的是：

```ts
null.addEventListener(...)
```

---

## 4. 今日小实验复盘

### 实验 1：变量赋值类型检查

代码：

```ts
const userAge: number = "20";
```

报错原因：

```text
左边规定 userAge 是 number，
但右边 "20" 是 string。
```

对应检查：

```text
变量赋值类型检查
```

---

### 实验 2：对象属性类型检查 + 数组元素类型检查

代码：

```ts
skills: [100, 90],
```

但 interface 中规定：

```ts
interface User {
  skills: string[];
}
```

报错原因：

```text
skills 应该是 string[]，
也就是数组里的每一项都必须是 string；
但实际传入的是 number[]。
```

对应检查：

```text
对象属性类型检查 + 数组元素类型检查
```

---

### 实验 3：函数返回值类型检查

代码：

```ts
function getUserIntro(user: User): string {
  return user.age;
}
```

报错原因：

```text
函数声明返回值必须是 string，
但 user.age 是 number。
```

对应检查：

```text
函数返回值类型检查
```

---

## 5. 今日容易错的点

### 5.1 把 interface 误解成对象

错误理解：

```text
interface User 创建了一个 user 对象。
```

正确理解：

```text
interface User 只是定义对象结构规则，
真正的对象要用 const user = {...} 创建。
```

---

### 5.2 忘记 TypeScript 区分大小写

例如：

```ts
isValid
```

和：

```ts
isvalid
```

不是同一个属性。

如果 interface 中写的是：

```ts
isValid: boolean;
```

那么后面也必须写：

```ts
result.isValid
```

不能写成：

```ts
result.isvalid
```

---

### 5.3 把 DOM 元素对象和输入值混在一起

`nameInput` 保存的是 DOM 元素对象。

```ts
const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
```

用户输入的字符串是：

```ts
nameInput.value
```

去掉前后空格后的字符串是：

```ts
nameInput.value.trim()
```

---

### 5.4 不理解 `export {};`

当多个 demo 文件里重复声明同名变量时，TypeScript 可能会报：

```text
Cannot redeclare block-scoped variable
```

解决方式是在文件顶部加：

```ts
export {};
```

它的作用是：

```text
告诉 TypeScript：这个文件是一个独立模块，
不要把这里的顶层变量和其他文件混在同一个全局作用域里检查。
```

---

## 6. 今日代码执行流程复盘

以表单校验 demo 为例：

```text
1. 页面加载 JS / TS 编译后的 JS
2. querySelector 获取 DOM 元素
3. addEventListener 注册 click 事件
4. 用户点击 submitButton
5. 执行 click 回调函数
6. 判断 nameInput / errorText / resultText 是否为 null
7. 读取 nameInput.value.trim()
8. 调用 validateUsername(username)
9. 得到 result 对象
10. 如果 result.isValid 为 false，显示错误提示
11. 如果 result.isValid 为 true，清空错误提示，并显示成功结果
```

核心逻辑：

```text
用户输入内容 → 点击按钮 → 读取输入值 → 校验类型和内容 → 更新页面文本
```

---

## 7. 今日知识未来如何进入 React 项目

TypeScript 以后会用于 React 项目的多个位置：

1. 组件 props 类型约束；
2. state 类型约束；
3. 表单数据类型约束；
4. 用户列表、商品列表等业务数据结构约束；
5. axios 请求返回数据类型约束；
6. 函数参数和返回值类型约束。

例如以后写用户卡片组件：

```ts
interface UserCardProps {
  name: string;
  age: number;
}
```

这不是创建 props，而是规定组件接收的 props 应该是什么结构。

---

## 8. 今日最终结论

今天最重要的 4 个结论：

```text
1. TypeScript 是 JavaScript 的带类型版本，用来提前发现类型错误。
```

```text
2. interface 不是创建对象，而是定义对象结构规则。
```

```text
3. 函数参数类型限制传入值，函数返回值类型限制 return 出去的值。
```

```text
4. TypeScript 可以检查变量赋值、对象属性、数组元素、函数返回值是否类型一致。
```

---

## 9. 今日功能命名

今天这个 demo 不只是“TypeScript 练习”，更准确地命名为：

```text
DOM 表单校验逻辑 TypeScript 化
```

也可以作为后续 React 登录表单、新增用户表单、编辑用户表单的前置能力。
