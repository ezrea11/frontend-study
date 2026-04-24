# Day 8 前端笔记：作用域与变量提升

## 今日主题

今天的主线不是做页面交互，而是理解 JavaScript 中：

1. 变量能在哪个范围里被访问
2. 为什么有些变量在“声明前访问”时会表现不同

Day 7 学的是“如何处理一组数据”。
Day 8 学的是“变量什么时候能用、在哪儿能用”。

这属于 JavaScript 的底层运行规则，后面学 `this`、闭包、异步时还会反复用到。

---

## 什么是作用域（scope）

作用域的本质：

**变量能在哪个范围内被访问。**

当前阶段先记三种最核心的：

1. 全局作用域
2. 函数作用域
3. 块级作用域

---

## 全局作用域

定义在最外层的变量，通常可以在后面的全局代码中直接访问。

```javascript
console.log("=== 1. 全局作用域 ===");
let school = "BU";
console.log(school);
```

输出：

```javascript
=== 1. 全局作用域 ===
BU
```

我的当前理解：

- `school` 定义在最外层
- 所以后面的代码可以直接访问它

---

## 函数作用域

函数内部定义的变量，只能在函数内部使用。

```javascript
console.log("=== 2. 函数作用域 ===");
function testFunctionScope() {
    let message = "inside function";
    console.log(message);
}
testFunctionScope();
// console.log(message); // 打开会报错
```

输出：

```javascript
=== 2. 函数作用域 ===
inside function
```

我的当前理解：

- `message` 是在函数内部定义的
- 所以函数内部可以访问它
- 函数外部不能访问它
- 不是 `console.log` 不能写到外面，而是外面拿不到这个变量

### 我对这个点的关键修正

不能说：

> `console.log(message)` 不能拿到外面去

更准确地说：

> 如果 `console.log` 想打印的变量只存在函数内部，那么函数外面就拿不到它

---

## 块级作用域

`if`、`for`、`while`、普通大括号 `{}`` 这些块，也可以形成局部范围。

但要区分：

- `let` / `const` 有块级作用域
- `var` 没有块级作用域

###  `let` 受块级作用域影响

```javascript
console.log("=== 3. 块级作用域：let ===");
if (true) {
    let score = 95;
    console.log(score);
}
// console.log(score); // 打开会报错
```

输出：

```javascript
=== 3. 块级作用域：let ===
95
```

我的当前理解：

- `score` 只活在 `if` 的大括号里
- 在块外不能访问

###  `var` 不受块级作用域影响

```javascript
console.log("=== 4. var 没有块级作用域 ===");
if (true) {
    var city = "Boston";
}
console.log(city);
```

输出：

```javascript
=== 4. var 没有块级作用域 ===
Boston
```

我的当前理解：

- 虽然 `city` 写在 `if` 里面
- 但因为它是 `var`
- 所以在块外仍然可以访问

---

##  `var` 不是完全没有作用域

这是今天一个很重要的修正点。

我最开始容易把它理解成：

> `var` 不受作用域影响

这个说法不对。

更准确的是：

> `var` 不受块级作用域影响，但仍然受函数作用域影响。

验证代码：

```javascript
console.log("===== 11. var 也受函数作用域限制 =====");
function demoVarScope() {
    var x = 10;
    console.log(x);
}
demoVarScope();
// console.log(x); // 打开会报错
```

我的当前理解：

- `var` 不是“到处都能访问”
- 它只是比 `let` 更容易从块里跑出来
- 但如果写在函数里面，函数外仍然拿不到

---

##  什么是变量提升（先按当前阶段理解）

当前阶段先不要背太重的定义。
先记住这一句：

**JavaScript 在真正逐行执行前，会先处理一部分声明。**

但不同声明的表现不一样。

---

##  `var` 的声明前访问

```javascript
console.log("=== 5. var 的提升 ===");
console.log(a);
var a = 10;
console.log(a);
```

输出：

```javascript
=== 5. var 的提升 ===
undefined
10
```

我的当前理解：

- `var` 在声明前访问时，不是直接报错
- 因为系统像是先知道“有这个变量”
- 但赋值还没发生
- 所以先输出 `undefined`
- 等执行到 `a = 10` 后，再打印就是 `10`

### 当前阶段的通用理解

可以先粗略理解成：

```javascript
var a;
console.log(a);
a = 10;
console.log(a);
```

### 关键修正

不能理解成：

> `var` 把值 10 提前拿来了

更准确的是：

> 只是声明像是先被处理了，赋值没有提前

---

##  `let` 的声明前访问

```javascript
console.log("=== 6. let 的声明前访问 ===");
// console.log(b); // 打开会报错
let b = 20;
console.log(b);
```

正常输出：

```javascript
=== 6. let 的声明前访问 ===
20
```

如果把前面的 `console.log(b)` 打开，就会直接报错。

我的当前理解：

- `let` 不能在声明前访问
- 必须等代码真正执行到 `let b = 20` 这一行之后，才能访问 `b`

### 关键修正

不能简单理解成：

> 系统完全找不到 `b`

更准确地说：

> `b` 在声明前还不能被访问

---

##  `const` 在这一点上和 `let` 类似

```javascript
console.log("=== 7. const 的声明前访问 ===");
// console.log(pi); // 打开会报错
const pi = 3.14;
console.log(pi);
```

我的当前理解：

- `const` 在声明前访问，也会报错
- 这一点和 `let` 类似
- 不是像 `var` 那样先给一个 `undefined`

---

##  `let` 与 `var` 在声明前访问上的本质区别（当前阶段版本）

### `var`

```javascript
console.log(a);
var a = 10;
```

结果：

```javascript
undefined
```

原因：

- 声明像是先被处理了
- 系统知道有 `a`
- 但赋值还没发生
- 所以拿到的是 `undefined`

### `let`

```javascript
console.log(a);
let a = 10;
```

结果：报错

原因：

- 必须等代码执行到 `let a = 10` 这一行后才能访问
- 不能提前访问

### 我现在最实用的一句话总结

**`let` 要等执行到声明这一行后才能访问；`var` 在声明前也能被访问到，但只能先拿到 `undefined`，因为只是声明先被处理了，不是值提前到了。`**

---

##  `const` 的补充实验

###  `const` 对象内部属性可以改

```javascript
console.log("===== 9. 实验4A：const 对象属性可改 =====");
const user1 = { name: "James" };
user1.name = "Sky";
console.log(user1.name);
```

输出：

```javascript
Sky
```

###  `const` 不能整体重新赋值

```javascript
console.log("===== 10. 实验4B：const 不能重新赋值 =====");
const user2 = { name: "James" };
// user2 = { name: "Sky" }; // 打开会报错
```

我的当前理解：

- `const` 不是说对象内部内容完全不能改
- 而是这个变量本身不能再指向新的值

---

##  今天做过的关键实验

### 实验 1：函数作用域验证

```javascript
function testFunctionScope() {
    let message = "inside function";
    console.log(message);
}
testFunctionScope();
// console.log(message);
```

结论：

- 函数内部变量可以在函数内部打印
- 函数外部不能访问函数内部变量

### 实验 2：块级作用域验证

```javascript
if (true) {
    let score = 95;
    console.log(score);
}
// console.log(score);
```

结论：

- `let` 受块级作用域影响
- 块外不能访问

### 实验 3：`var` 不受块级作用域影响

```javascript
if (true) {
    var city = "Boston";
}
console.log(city);
```

结论：

- `var` 写在块里，外面仍可能访问到

### 实验 4：`var` 的声明前访问

```javascript
console.log(a);
var a = 10;
console.log(a);
```

结论：

- 第一次是 `undefined`
- 第二次是 `10`
- 说明只是声明先被处理，赋值没有提前

### 实验 5：`let` 的声明前访问

```javascript
// console.log(b);
let b = 20;
console.log(b);
```

结论：

- `let` 必须等执行到声明这一行后，才能访问

### 实验 6：`var` 仍然受函数作用域影响

```javascript
function demoVarScope() {
    var x = 10;
    console.log(x);
}
demoVarScope();
// console.log(x);
```

结论：

- `var` 不是完全没有作用域
- 它仍然受函数作用域限制

---

##  今天踩到或容易踩的坑

### 坑 1：把“函数外不能访问变量”理解成 `console.log` 不能写外面

错误理解：

> `console.log(message)` 不能放外面

正确理解：

> 如果变量只存在函数内部，那么函数外拿不到这个变量

### 坑 2：把 `var` 理解成完全没有作用域

错误理解：

> `var` 不受作用域影响

正确理解：

> `var` 没有块级作用域，但仍然受函数作用域影响

### 坑 3：把 `var` 的声明前访问理解成“值提前了”或“跳过去取值了”

错误理解：

> `var` 跳过去把值拿来了

正确理解：

> 只是声明像是先被处理了，赋值没有提前

### 坑 4：把 `let` 报错理解成“变量完全不存在”

更准确的理解：

> 变量在声明前还不能被访问

---

##  我当前最重要的最终结论

### 结论 1

**作用域是在看变量能在哪个范围里被访问。**

### 结论 2

**`let` / `const` 有块级作用域，`var` 没有块级作用域。**

### 结论 3

**`var` 声明前访问常见结果是 `undefined`，因为声明先被处理，赋值还没执行。**

### 结论 4

**`let` / `const` 要等执行到声明那一行后才能访问。**

### 结论 5

**`var` 不是完全没有作用域，它仍然受函数作用域影响。**

---

##  我现在能讲清的内容

我现在已经可以讲清：

1. 什么是全局作用域
2. 什么是函数作用域
3. 为什么函数里的变量不能在函数外访问
4. 为什么 `let` 会受块级作用域影响
5. 为什么 `var` 更容易“跑到外面”
6. 为什么 `var` 在声明前访问会得到 `undefined`
7. 为什么 `let` / `const` 在声明前会报错
8. 为什么不能说 `var` 完全不受作用域影响

---

##  当前还需要继续巩固的点

1. 对“变量提升”还只是当前阶段理解，后面需要继续深化
2. 现在能看懂最小示例，但还需要通过更多输出题巩固
3. 需要继续练习把“作用域问题”和“声明前访问问题”区分开

---

##  今天一句话总结

**Day 8 的核心不是背定义，而是先分清：变量在哪儿能访问，以及为什么 `var`、`let`、`const` 在声明前访问时表现不同。**
