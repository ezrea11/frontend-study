# 第二阶段 Day 4 TypeScript 学习版笔记

## 1. TypeScript 是什么

TypeScript 可以理解为 JavaScript 的“带类型版本”。

它不是替代 JavaScript，而是在 JavaScript 的基础上增加类型检查，让变量、函数参数、函数返回值、对象属性、DOM 元素等数据结构更明确。

简单理解：

```text
TypeScript = JavaScript + 类型检查
```

它的作用是：在代码运行之前，提前发现类型不匹配的问题。

例如：

```ts
let username: string = "James";
username = 123; // 报错，因为 username 被规定为 string
```

这里的重点是：

```text
如果一个变量被规定为 string，后续它就应该一直保存 string 类型的数据。
除非一开始就改变它的类型定义，或者明确允许多个类型。
```

---

## 2. TypeScript 和 JavaScript 的关系

JavaScript 关注的是：

```text
这段代码如何运行
```

TypeScript 额外关注的是：

```text
这些数据类型是否合理
```

所以 TypeScript 本质上是为 JavaScript 服务的：

- 帮助 JS 代码更安全；
- 帮助开发者提前发现低级错误；
- 帮助大型项目中的数据结构更清晰；
- 帮助 React 项目中的 props、state、表单数据、接口数据更容易维护。

最终，TypeScript 代码会被编译成 JavaScript，浏览器真正运行的仍然是 JavaScript。

---

## 3. 今天 demo 实现了什么

今天的 demo 是把 Day 3 的 DOM 表单校验逻辑改成 TypeScript 版本。

主要做了几件事：

1. 给 DOM 元素对象添加更具体的类型说明；
2. 给表单校验函数的参数和返回值添加类型；
3. 用 `interface FormResult` 规定校验结果对象的结构；
4. 通过 TypeScript 提前检查变量类型、对象属性类型、函数返回值类型是否一致。

例如：

```ts
const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
```

含义是：

```text
从 DOM 中查找 #nameInput，
并告诉 TypeScript：我预期它是一个 input 元素对象。
```

注意：

```text
nameInput 保存的不是用户输入的文字，
而是 input 这个 DOM 元素对象。
```

要拿到用户输入的文字，需要写：

```ts
nameInput.value
```

---

## 4. DOM 元素类型说明

在普通 JavaScript 中，我们可能会写：

```js
const nameInput = document.querySelector("#nameInput");
```

但在 TypeScript 中，可以写成：

```ts
const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
const submitButton = document.querySelector<HTMLButtonElement>("#submitButton");
const errorText = document.querySelector<HTMLParagraphElement>("#errorText");
const resultText = document.querySelector<HTMLParagraphElement>("#resultText");
```

这些类型表示：

- `HTMLInputElement`：输入框元素；
- `HTMLButtonElement`：按钮元素；
- `HTMLParagraphElement`：段落元素。

这样 TypeScript 就知道：

```ts
nameInput.value
```

是合理的，因为 input 元素有 `value` 属性。

---

## 5. 为什么 querySelector 可能返回 null

`querySelector` 不一定能找到元素。

例如：

```ts
const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
```

如果 HTML 里没有：

```html
<input id="nameInput" />
```

那么 `querySelector` 就会返回：

```ts
null
```

所以 TypeScript 会提醒我们，在使用 DOM 元素之前要先判断是否为 `null`。

例如：

```ts
if (nameInput === null || errorText === null || resultText === null) {
  return;
}
```

含义是：

```text
如果关键 DOM 元素没找到，就直接结束函数，避免后面访问 null 上的属性时报错。
```

---

## 6. 可选链 `?.`

代码中出现了：

```ts
submitButton?.addEventListener("click", function (): void {
  // ...
});
```

这里的 `?.` 是可选链。

它的含义是：

```text
如果 submitButton 不是 null，就执行 addEventListener；
如果 submitButton 是 null，就不执行，避免报错。
```

它防止的是这种错误：

```ts
null.addEventListener(...)
```

因为 `null` 上没有 `addEventListener` 方法。

---

## 7. interface 的作用

今天我们写了：

```ts
interface FormResult {
  username: string;
  isValid: boolean;
}
```

这里要特别注意：

```text
interface FormResult 不是创建一个真实对象，
而是创建一套对象结构规则。
```

它规定：

```text
凡是 FormResult 类型的对象，
必须有 username 属性，并且 username 是 string；
必须有 isValid 属性，并且 isValid 是 boolean。
```

真正创建对象的是：

```ts
return {
  username: username,
  isValid: username.length > 0,
};
```

可以这样记：

```text
interface = 结构规则 / 类型模板
const user 或 return {...} = 真正的数据对象
```

---

## 8. 函数参数类型和返回值类型

今天的函数：

```ts
function validateUsername(username: string): FormResult {
  return {
    username: username,
    isValid: username.length > 0,
  };
}
```

这里有两层类型限制。

### 8.1 参数类型

```ts
username: string
```

限制的是：

```text
传入 validateUsername 函数的 username 参数必须是 string。
```

因为参数已经被规定为 string，所以 TypeScript 知道：

```ts
username.length
```

是合法的，因为字符串有 `.length` 属性。

### 8.2 返回值类型

```ts
): FormResult
```

限制的是：

```text
这个函数最终返回的结果必须符合 FormResult 这套 interface 规则。
```

也就是说，返回对象必须包含：

- `username: string`
- `isValid: boolean`

---

## 9. 基础类型

### 9.1 string / number / boolean

```ts
const userName: string = "James";
const userAge: number = 20;
const isStudent: boolean = true;
```

含义：

- `string` 表示字符串；
- `number` 表示数字；
- `boolean` 表示 `true / false`。

如果变量声明了某种类型，后续赋值就必须匹配该类型。

---

### 9.2 数组类型

```ts
const scores: number[] = [95, 88, 76];
const skills: string[] = ["HTML", "CSS", "JavaScript"];
```

含义：

- `number[]` 表示数组里的每一项都必须是 number；
- `string[]` 表示数组里的每一项都必须是 string。

例如：

```ts
const skills: string[] = [100, 90]; // 报错
```

因为 `skills` 被规定为字符串数组，但实际传入的是数字数组。

---

## 10. User interface 示例

```ts
interface User {
  name: string;
  age: number;
  isStudent: boolean;
  skills: string[];
}
```

`interface User` 不是创建一个真实的用户对象，而是创建一套“用户对象结构规则”。

也就是说，凡是被标记为 `User` 类型的对象，都必须符合这套规则：

- `name` 必须是 string；
- `age` 必须是 number；
- `isStudent` 必须是 boolean；
- `skills` 必须是 string[]。

真正创建对象的是：

```ts
const user: User = {
  name: "James",
  age: 20,
  isStudent: true,
  skills: ["HTML", "CSS", "JavaScript"],
};
```

这里的 `: User` 表示：

```text
让 TypeScript 按照 interface User 的规则检查这个对象。
```

---

## 11. 函数返回值示例

```ts
function getUserIntro(user: User): string {
  return `${user.name} is ${user.age} years old and knows ${user.skills.length} skills.`;
}
```

这里：

```ts
user: User
```

表示传入函数的参数必须符合 `User` 结构。

```ts
): string
```

表示这个函数最终必须返回 string。

如果写成：

```ts
function getUserIntro(user: User): string {
  return user.age;
}
```

就会报错，因为 `user.age` 是 number，但函数声明要求返回 string。

---

## 12. 类型推断

有些时候，即使不手动写类型，TypeScript 也能自动推断。

例如：

```ts
const intro = getUserIntro(user);
```

因为 `getUserIntro(user)` 的返回值已经被规定为 string，所以 TypeScript 能自动推断：

```text
intro 是 string 类型。
```

这叫类型推断。

所以并不是每个变量都必须手动写类型，但在学习阶段，先显式写出来有助于理解。

---

## 13. 完整 demo 代码

```ts
export {};

const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
const submitButton = document.querySelector<HTMLButtonElement>("#submitButton");
const errorText = document.querySelector<HTMLParagraphElement>("#errorText");
const resultText = document.querySelector<HTMLParagraphElement>("#resultText");

interface FormResult {
  username: string;
  isValid: boolean;
}

function validateUsername(username: string): FormResult {
  return {
    username: username,
    isValid: username.length > 0,
  };
}

submitButton?.addEventListener("click", function (): void {
  if (nameInput === null || errorText === null || resultText === null) {
    return;
  }

  const username: string = nameInput.value.trim();
  const result: FormResult = validateUsername(username);

  if (result.isValid === false) {
    errorText.textContent = "Please enter your username.";
    resultText.textContent = "";
    return;
  }

  errorText.textContent = "";
  resultText.textContent = `Hello, ${result.username}!`;
});

const userName: string = "James";
const userAge: number = 20;
const isStudent: boolean = true;

const scores: number[] = [95, 88, 76];
const skills: string[] = ["HTML", "CSS", "JavaScript"];

interface User {
  name: string;
  age: number;
  isStudent: boolean;
  skills: string[];
}

const user: User = {
  name: userName,
  age: userAge,
  isStudent: isStudent,
  skills: skills,
};

function getUserIntro(user: User): string {
  return `${user.name} is ${user.age} years old and knows ${user.skills.length} skills.`;
}

const intro: string = getUserIntro(user);
console.log(intro);
```

---

## 14. 今日核心结论

```text
TypeScript 是给 JavaScript 加类型检查。
```

```text
interface 不是创建对象，而是定义对象结构规则。
```

```text
函数里的 参数类型 管传入值，返回值类型 管 return 出去的值。
```

```text
TypeScript 能提前发现变量赋值、对象属性、数组元素、函数返回值中的类型错误。
```
