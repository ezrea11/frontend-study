# Day 9 前端笔记：this 与 call / apply / bind

## 今天学了什么

Day 9 前端主要学习内容：

1. 普通函数里的 `this`
2. 对象方法里的 `this`
3. 把对象方法取出来单独调用时，`this` 为什么会变
4. 箭头函数里的 `this`
5. `call / apply / bind`

---

## 今天这一部分的本质

今天这部分的核心，不是单纯记住几个 API，
而是开始理解：

**函数运行时，`this` 到底是谁，是由什么决定的。**

我当前阶段可以先这样理解：

**`this` 主要看这个函数这一次是怎么被调用的。**

这和 Day 8 的“作用域”不是一回事。

- 作用域：看变量能在哪个范围被访问
- `this`：看函数运行时，当前“指向谁”

所以：

**作用域是在看变量归属范围；`this` 是在看函数运行归属。**

---

## 普通函数里的 `this`

### 1. 最小代码

```javascript
function showThis() {
  console.log("普通函数里的 this =", this);
}

showThis();
```

### 2. 当前阶段的理解

在我当前的浏览器普通脚本实验环境里：

```javascript
showThis();
```

这是**普通函数直接调用**，前面没有对象。

所以当前阶段我可以先理解成：

**普通函数直接调用时，`this` 常见是 `window`。**

### 3. 先记住的规则

- 普通函数直接调用，不会自动指向某个我想象中的对象
- 在当前浏览器普通脚本实验里，`this` 可以先理解成 `window`

---

## 对象方法里的 `this`

### 1. 最小代码

```javascript
const user = {
  name: "James",
  sayName: function () {
    console.log("对象方法里的 this =", this);
    console.log("this.name =", this.name);
  }
};

user.sayName();
```

### 2. 这一段的本质

这里的关键不是“函数写在对象里”，
而是：

```javascript
user.sayName();
```

这是**通过对象调用方法**。

我当前阶段可以先记：

**点前面是谁，`this` 通常就先看谁。**

所以这里：

- 点前面是 `user`
- 因此这次运行时的 `this` 是 `user`
- 所以 `this.name` 就是 `user.name`

### 3. 当前更准确的理解

不能简单理解成：

> 因为 `sayName` 写在 `user` 里，所以 `this` 永远是 `user`

更准确的是：

> 因为这次是 `user.sayName()` 这种调用方式，所以这次 `this` 是 `user`

这两句话差别很大。

---

## 对象的属性与方法

### 1. `name` 和 `sayName` 本质上都是什么

```javascript
const user = {
  name: "James",
  sayName: function () {
    console.log(this.name);
  }
};
```

这里：

- `name` 是对象的一个属性，值是字符串
- `sayName` 也是对象的一个属性，值是函数

### 2. 为什么 `sayName` 又叫方法

因为它这个属性里存的是函数。

所以可以这样记：

**方法，本质上就是“值为函数的属性”。**

### 3. `user.sayName` 和 `user.sayName()` 的区别

#### `user.sayName`
表示：

**取出这个函数属性本身，还没有执行。**

#### `user.sayName()`
表示：

**先取出这个函数属性，再立刻调用它。**

所以：

- 不带 `()`：拿到函数本身
- 带 `()`：执行这个函数

---

## 把对象方法取出来后，`this` 为什么会变

### 1. 最小代码

```javascript
const user = {
  name: "James",
  sayName: function () {
    console.log("sayName 里的 this =", this);
    console.log("this.name =", this.name);
  }
};

const fn = user.sayName;

console.log("fn =", fn);
user.sayName();
fn();
```

### 2. 变量和流程分别负责什么

#### `const fn = user.sayName;`
这句不是执行函数。

它是在做：

**把 `user` 身上的 `sayName` 这个函数取出来，交给变量 `fn`。**

所以 `fn` 里装的是：

**函数本身。**

#### `user.sayName();`
这是对象方法调用。

所以：

- `this` 是 `user`
- `this.name` 是 `James`

#### `fn();`
这是普通函数直接调用。

所以在我当前浏览器普通脚本实验里：

- `this` 变成 `window`
- `this.name` 不再是 `user.name`

### 3. 核心结论

**同一个函数，`this` 也可能不一样。**

因为：

**`this` 更重要的是看调用方式，不是只看函数最早写在哪里。**

---

## `console.log` 和 `return` 的区别

这个点是在学习 `user.sayName` 和 `user.sayName()` 时顺带补到的，很重要。

### 1. `console.log(...)`
作用：

**打印给我看。**

它负责“显示过程”，但不会自动把这个值变成函数返回值。

### 2. `return ...`
作用：

**把结果交出去。**

函数外面可以用变量接住它。

### 3. 最小对比

#### 只有 `console.log`

```javascript
function test() {
  console.log("James");
}

const result = test();
console.log(result);
```

输出思路：

- 控制台会打印 `James`
- 但 `result` 是 `undefined`

因为只打印了，没有 `return`

#### 有 `return`

```javascript
function test() {
  return "James";
}

const result = test();
console.log(result);
```

这时 `result` 才能真正接到 `James`

### 4. 当前阶段最适合记的一句话

**`console.log` 是给人看的，`return` 是给代码外部接结果用的。**

---

## 箭头函数是什么

### 1. 箭头函数的本质

箭头函数也是函数，只是写法更简洁。

### 2. 普通函数 vs 箭头函数

#### 普通函数

```javascript
function add(a, b) {
  return a + b;
}
```

#### 箭头函数

```javascript
const add = (a, b) => {
  return a + b;
};
```

### 3. 一个最小例子

```javascript
const hello = () => {
  console.log("hello");
};

const add = (a, b) => {
  return a + b;
};

hello();
console.log(add(2, 3));
```

### 4. 当前阶段先记住

**箭头函数也是函数，只是写法不一样。**

但是：

**箭头函数在 `this` 这里，规则和普通函数不一样。**

---

## 箭头函数里的 `this`

### 1. 最小代码

```javascript
window.name = "GlobalName";

const user2 = {
  name: "Sky",
  sayNormal: function () {
    console.log("普通函数 this.name =", this.name);
  },
  sayArrow: () => {
    console.log("箭头函数 this =", this);
    console.log("箭头函数 this.name =", this.name);
  }
};

user2.sayNormal();
user2.sayArrow();
```

### 2. 普通函数为什么输出 `Sky`

```javascript
user2.sayNormal();
```

这是对象方法调用，点前面是 `user2`，
所以：

- `this === user2`
- `this.name === "Sky"`

### 3. 箭头函数为什么不是 `user2`

```javascript
user2.sayArrow();
```

表面上也像对象调用，
但箭头函数有个关键特点：

**箭头函数没有自己的 `this`。**

它不会因为 `user2.sayArrow()` 就把 `this` 改成 `user2`。

它只会去拿：

**定义时外层的 `this`。**

### 4. 在我当前实验里的理解

我当前是在浏览器普通脚本环境里写这个箭头函数，
所以它外层的 `this` 当前可以先理解成：

```javascript
this === window
```

所以 `sayArrow` 里的：

```javascript
this.name
```

拿到的不是 `user2.name`，
而是 `window.name`。

如果我写了：

```javascript
window.name = "GlobalName";
```

那箭头函数里就更明显会读到这个值。

### 5. 当前阶段最稳的总结

- 普通函数的 `this` 更看调用方式
- 箭头函数没有自己的 `this`
- 箭头函数只会沿着外层去拿 `this`

### 6. 一个重要限制

不能把它记成：

> 箭头函数的 `this` 永远是 `window`

更准确的是：

> 在我当前这个浏览器普通脚本实验环境里，如果外层没有别的特殊设计，那么箭头函数里的 `this` 常见会落到最外层，而当前最外层常见就是 `window`

---

## `call / apply / bind` 的本质

前面我已经看到一个问题：

```javascript
const fn = user.sayName;
fn();
```

同一个函数，一旦单独调用，`this` 就变了。

所以现在要学的是：

**如果函数默认拿到的 `this` 不是我想要的，我能不能手动指定？**

答案就是：

- `call`
- `apply`
- `bind`

它们的共同本质都是：

**手动控制函数运行时的 `this`。**

---

## `call`

### 1. 最小代码

```javascript
function introduce(city, country) {
  console.log("this.name =", this.name);
  console.log("city =", city);
  console.log("country =", country);
}

const user = {
  name: "James"
};

introduce("Boston", "USA");
console.log("------");
introduce.call(user, "Boston", "USA");
```

### 2. 本质

```javascript
introduce.call(user, "Boston", "USA");
```

当前阶段可以先理解成：

**立刻执行 `introduce`，并把这一次的 `this` 强行指定成 `user`。**

### 3. 当前阶段记法

```javascript
函数.call(想让this变成谁, 参数1, 参数2, ...)
```

### 4. 核心点

- `call` 会立刻执行函数
- `call` 可以手动指定 `this`
- 后面的参数是一个一个传进去的

---

## `apply`

### 1. 最小代码

```javascript
function introduce(city, country) {
  console.log("this.name =", this.name);
  console.log("city =", city);
  console.log("country =", country);
}

const user = {
  name: "James"
};

introduce.apply(user, ["Boston", "USA"]);
```

### 2. 本质

`apply` 和 `call` 非常像。

它也会：

- 立刻执行函数
- 手动指定 `this`

### 3. 和 `call` 最主要的区别

不是 `this` 不同，
而是：

**参数的传法不同。**

#### `call`

```javascript
introduce.call(user, "Boston", "USA");
```

#### `apply`

```javascript
introduce.apply(user, ["Boston", "USA"]);
```

### 4. 当前阶段怎么记

- `call`：参数一个一个传
- `apply`：参数通常用数组传

### 5. 什么时候 `apply` 更有感觉

如果我本来就已经有一组参数：

```javascript
const info = ["Boston", "USA"];
```

那么：

```javascript
introduce.apply(user, info);
```

就会很自然。

所以：

**如果参数本来已经是一组了，`apply` 往往更方便。**

---

## `bind`

### 1. 最小代码

```javascript
function introduce(city, country) {
  console.log("this.name =", this.name);
  console.log("city =", city);
  console.log("country =", country);
}

const user = {
  name: "James"
};

const boundFn = introduce.bind(user, "Boston", "USA");
console.log("boundFn =", boundFn);
console.log("------");
boundFn();
```

### 2. 本质

`bind` 和 `call / apply` 最大的不同是：

**它不会立刻执行函数。**

它会先：

1. 把 `this` 绑定好
2. 把参数也先记住
3. 返回一个新的函数

### 3. 什么时候才真正执行

真正执行是在：

```javascript
boundFn();
```

这一句。

### 4. 当前阶段怎么记

- `bind` 不会立刻执行
- `bind` 会返回一个绑定好 `this` 的新函数
- 之后调用这个新函数，原函数才真正运行

### 5. 当前阶段最稳的一句话

**`bind` 是先把要用的 `this` 和参数预先绑好，生成一个新的函数；后面调用这个新函数时，才会真正执行原函数。**

---

## `call / apply / bind` 的整体区别

### `call`

- 立刻执行
- 手动指定 `this`
- 参数一个一个传

### `apply`

- 立刻执行
- 手动指定 `this`
- 参数通常用数组传

### `bind`

- 不立刻执行
- 先绑定 `this`
- 返回新函数
- 后续调用新函数才真正执行

---

## 今天做过的关键实验

### 实验 1：普通函数直接调用

```javascript
function showThis() {
  console.log(this);
}

showThis();
```

看到普通函数在当前环境里 `this` 常见是 `window`

### 实验 2：对象方法调用

```javascript
const user = {
  name: "James",
  sayName: function () {
    console.log(this.name);
  }
};

user.sayName();
```

看到对象方法调用时，`this` 是 `user`

### 实验 3：方法取出后单独调用

```javascript
const fn = user.sayName;
fn();
```

看到调用方式一变，`this` 也会变

### 实验 4：箭头函数里的 `this`

```javascript
window.name = "GlobalName";

const user2 = {
  name: "Sky",
  sayArrow: () => {
    console.log(this.name);
  }
};

user2.sayArrow();
```

看到箭头函数没有自己的 `this`，读到的是外层 `this.name`

### 实验 5：`call`

```javascript
introduce.call(user, "Boston", "USA");
```

看到 `call` 可以立刻执行并手动指定 `this`

### 实验 6：`apply`

```javascript
introduce.apply(user, ["Boston", "USA"]);
```

看到 `apply` 和 `call` 本质接近，主要差别在参数传法

### 实验 7：`bind`

```javascript
const boundFn = introduce.bind(user, "Boston", "USA");
boundFn();
```

看到 `bind` 会先返回新函数，不会立刻执行

---

## 今天最容易混淆的点

### 1. 误区：函数写在对象里，所以 `this` 永远是这个对象

错误。

更准确的是：

**函数这一次怎么被调用，更重要。**

### 2. 误区：`user.sayName` 和 `user.sayName()` 是一回事

错误。

- `user.sayName`：拿函数本身
- `user.sayName()`：执行函数

### 3. 误区：`console.log` 打印了什么，函数返回值就是什么

错误。

打印不等于返回。

### 4. 误区：箭头函数的 `this` 永远是 `window`

错误。

更准确的是：

**箭头函数没有自己的 `this`，它拿的是外层的 `this`。**

只是在我当前这个浏览器普通脚本实验环境里，外层常见是 `window`。

### 5. 误区：`bind` 和 `call / apply` 一样都会立刻执行

错误。

`bind` 不会立刻执行，它先返回一个新函数。

---

## 今天这一部分我当前已经理解的核心点

1. `this` 主要看函数这一次怎么被调用。
2. 普通函数直接调用时，在我当前浏览器实验里，`this` 常见是 `window`。
3. 对象方法调用时，点前面是谁，`this` 通常就是谁。
4. 同一个函数，调用方式一变，`this` 也可能变。
5. 箭头函数没有自己的 `this`，它拿的是外层的 `this`。
6. `call / apply / bind` 的共同本质，都是手动控制函数运行时的 `this`。
7. `call` 和 `apply` 都是立刻执行，主要差别在参数传法。
8. `bind` 不会立刻执行，而是先返回一个绑定好的新函数。

---

## 今天最适合我的口头复述模板

```text
this 主要看函数这次怎么被调用。
普通函数直接调用，在我当前浏览器实验里 this 常见是 window。
对象方法调用时，点前面是谁，this 通常就是谁。
如果把对象方法拿出来单独调用，调用方式变了，this 也会变。
箭头函数没有自己的 this，它拿的是外层 this。
call 和 apply 都能立刻执行并手动指定 this，区别主要是参数传法不同；
bind 不会立刻执行，而是先返回一个绑定好 this 的新函数。
```

---

## 我当前这部分的真实状态

- 我已经不只是会写函数调用形式，而是开始理解 `this` 的运行规则。
- 我能区分：
  - 普通函数直接调用
  - 对象方法调用
  - 方法取出后再调用
- 我已经能理解：
  - 箭头函数和普通函数在 `this` 上的根本区别
  - `call / apply / bind` 是在手动控制 `this`
- 但我当前仍不适合立刻进入特别抽象或特别复杂的 `this` 场景。
- 当前更适合继续通过：
  - 最小代码
  - 小实验
  - 调用方式对比
  - 自己复述
  来巩固理解。

---

## 今天这一部分的验收结论

Day 9 前端前后两部分的核心学习要求已完成：

- 已理解普通函数、对象方法、箭头函数里的 `this`
- 已理解 `call / apply / bind` 的共同点与区别
- 已通过最小 demo 和实验建立初步规则感

