# Day 6 前端学习笔记：JavaScript 基础语法入门

## 今日目标

今天的目标不是做复杂交互，也不是独立开发页面，而是：

- 从 Day 5 的“页面结构与布局”过渡到 Day 6 的“页面背后的逻辑”
- 初步理解 JavaScript 最基础的语法和数据结构
- 能看懂并运行最小 JS 代码
- 能通过删改实验观察代码变化
- 能解释最基础的 `if / for / while / function / array / object`

---

## 一、Day 6 和 Day 5 的衔接

### 1. Day 5 解决的问题

Day 5 主要解决的是：

- 页面怎么分层
- 子元素怎么排
- 元素站在哪里
- `flex` 和 `position` 分别解决什么问题

### 2. Day 6 新增的问题

Day 6 开始解决的是：

- 页面背后要存什么数据
- 条件怎么判断
- 重复逻辑怎么写
- 数据怎么组织
- 怎么把一段逻辑封装起来

### 3. 一句话理解

- HTML：负责结构
- CSS：负责样式和布局
- JavaScript：负责逻辑和数据

---

## 二、今天学到的核心语法

### 1. `let` / `const`

作用：用来存值。

```js
let score = 78;
const school = "BU";
let isAdmin = true;
```

当前理解：

- `let`：后面可能会改
- `const`：一般不打算重新赋值

### 2. 基本类型

今天先接触了三种最基础的类型：

- `number`：数字
- `string`：字符串
- `boolean`：布尔值（`true / false`）

例子：

```js
let score = 78;
const school = "BU";
let isAdmin = true;
```

### 3. `if / else`

作用：根据条件决定走哪条分支。

```js
if (score >= 60) {
  console.log("pass");
} else {
  console.log("fail");
}
```

当前理解：

- `if` 本质不是为了输出
- `if` 的本质是：**根据条件选分支**
- 条件成立，走 `if`
- 条件不成立，走 `else`

### 4. `for` 循环

作用：当大概知道要循环多少次时，用 `for`。

```js
for (let i = 1; i <= 5; i++) {
  console.log("for loop:", i);
}
```

当前理解：

- `i` 是循环变量
- 它表示“当前进行到第几轮”
- `for` 适合“已知大概要做多少次”的情况

### 5. `while` 循环

作用：只要条件还成立，就继续执行。

```js
let count = 1;
while (count <= 3) {
  console.log("while loop:", count);
  count++;
}
```

当前理解：

- `while` 会不断检查条件
- 如果条件成立，就继续执行
- 必须手动推进变量，比如 `count++`
- 否则就可能死循环

### 6. 函数 `function`

作用：把一段逻辑打包起来，以后反复用。

```js
function add(a, b) {
  return a + b;
}
```

当前理解：

- 参数：输入
- 函数体：处理过程
- `return`：输出结果

例子：

```js
let result = add(3, 5);
console.log(result);
```

### 7. 数组 `array`

作用：存放一组有顺序的数据。

```js
let menuList = ["Dashboard", "Users", "Orders"];
```

当前理解：

- 数组适合存“一组东西”
- 可以通过下标访问元素
- 可以看长度
- 可以往后追加新元素

例子：

```js
console.log(menuList[0]);
console.log(menuList.length);
menuList.push("Settings");
```

### 8. 对象 `object`

作用：描述一个事物有哪些属性。

```js
let adminUser = {
  name: "James",
  role: "admin",
  online: true
};
```

当前理解：

- 对象适合表示“一个东西”
- 这个东西可以有多个属性
- 属性可以读取、修改，也可以后续新增

例子：

```js
console.log(adminUser.name);

adminUser.role = "super admin";
adminUser.level = 2;
```

---

## 三、今天最重要的理解：点号 `.`

### 1. 基本理解

`xx.yy` 可以先理解成：

- 左边 `xx`：一个值 / 对象
- 右边 `yy`：这个值身上的一个属性名

这个属性有两种可能。

#### 第一种：普通属性

比如：

```js
adminUser.name
adminUser.role
adminUser.level
```

这些属性里装的是普通值，比如字符串、数字、布尔值。

#### 第二种：装着函数的属性

比如：

```js
console.log
menuList.push
```

这些属性里装的是函数。  
如果后面再跟上 `()`，就表示调用这个函数。

所以：

```js
console.log(score);
menuList.push("Settings");
```

本质上都是在调用方法。

### 2. 当前可用的统一理解

```js
对象.属性
对象.属性 = 新值
对象.方法(参数)
```

例如：

```js
adminUser.name         // 访问属性
adminUser.level = 2    // 新增属性
console.log(score)     // 调用方法
menuList.push("A")     // 调用方法
```

### 3. 对 `console` 的理解

`console` 不是关键字，也不是我自己创建的变量。  
它是：

**浏览器提供的一个控制台工具对象**

它的作用是：

- 帮助开发者在控制台里查看数据
- 调试代码
- 确认某段逻辑是否执行到

例如：

```js
console.log(score);
```

含义：

- `console`：对象
- `log`：这个对象上的一个方法
- `(score)`：把 `score` 传进去打印

---

## 四、今天写过的主要代码结构

### 1. 变量和基本类型

```js
let score = 78;
const school = "BU";
let isAdmin = true;
```

### 2. 条件判断

```js
if (score >= 60) {
  console.log("pass");
} else {
  console.log("fail");
}
```

### 3. `for` 循环

```js
for (let i = 1; i <= 5; i++) {
  console.log("for loop:", i);
}
```

### 4. `while` 循环

```js
let count = 1;
while (count <= 3) {
  console.log("while loop:", count);
  count++;
}
```

### 5. 函数

```js
function add(a, b) {
  return a + b;
}
```

### 6. 数组

```js
let menuList = ["Dashboard", "Users", "Orders"];
menuList.push("Settings");
```

### 7. 对象

```js
let adminUser = {
  name: "James",
  role: "admin",
  online: true
};

adminUser.role = "super admin";
adminUser.level = 2;
```

### 8. 数组里放对象

```js
let cards = [
  { title: "Users", count: 128 },
  { title: "Orders", count: 56 },
  { title: "Messages", count: 12 }
];
```

当前理解：

- 外层是数组：因为有很多张 card
- 内层是对象：因为每张 card 有多个属性，比如 `title`、`count`

### 9. 用循环读取数据

```js
for (let i = 0; i < cards.length; i++) {
  console.log("card:", cards[i].title, cards[i].count);
}
```

当前理解：

- `cards[i]` 表示第 i 个对象
- `cards[i].title` 表示第 i 个对象的 `title`
- `cards[i].count` 表示第 i 个对象的 `count`

### 10. 用函数处理数据

```js
function getTotalCount(cardList) {
  let total = 0;

  for (let i = 0; i < cardList.length; i++) {
    total += cardList[i].count;
  }

  return total;
}
```

当前理解：

- 这个函数不是记固定答案
- 它是在根据传进来的数据动态计算总和

---

## 五、今天做过的删改实验与结论

### 实验 1：改 `score`

把：

```js
let score = 78;
```

改成：

```js
let score = 40;
```

#### 结果

- 第 1 部分输出从 `78` 变成 `40`
- `pass` 变成了 `fail`

#### 原因

- `console.log(score)` 使用了 `score`
- `if (score >= 60)` 也使用了 `score`
- 后面没有继续依赖这个变量 `score` 的地方，所以其他结果不变

#### 学到的点

**改一个变量，只会影响真正使用这个变量的地方。**

### 实验 2：改 `for` 的停止条件

把：

```js
for (let i = 1; i <= 5; i++)
```

改成：

```js
for (let i = 1; i < 5; i++)
```

#### 结果

- 循环从原来的 5 次变成了 4 次
- 只少了最后一次 `5`

#### 原因

- 当 `i = 5` 时，`i < 5` 不成立，所以循环停止

#### 学到的点

**循环边界一改，执行次数就会变。**

### 实验 3：数组 `push`

原本：

```js
menuList.push("Settings");
```

实验时临时加过：

```js
menuList.push("Reports");
```

#### 结果

- 数组元素数量增加
- `after push` 里的结果发生变化

#### 原因

- `push` 会把新元素追加到数组末尾

#### 学到的点

- 数组适合存一组可以继续扩展的数据
- 代码按顺序执行
- `console.log` 打印的是执行到那一刻的数据状态

### 实验 4：对象新增属性

在对象实验里临时加过：

```js
adminUser.department = "Tech";
```

#### 结果

- `adminUser` 对象里新增了 `department: "Tech"`

#### 原因

- JS 对象允许后续新增属性

#### 额外发现

控制台里打印对象时，经常默认折叠显示。  
需要点开左侧小三角，才能看到完整属性。

#### 学到的点

- 对象可以新增属性
- `console.log(对象)` 时要注意控制台可能会折叠显示对象内容

---

## 六、今天踩过的坑

### 1. `<script>` 引错文件

一开始 html 里 `<script src="...">` 指向错了文件，导致 JS 没有正常执行。

#### 学到的点

- `html` 和 `js` 文件名必须对应
- `<script src="./js-basic-1.js"></script>` 要写对

### 2. 控制台对象默认折叠

我一开始以为对象没有变化，其实是因为控制台里的对象没有展开。

#### 学到的点

- `console.log(对象)` 和 `console.log(数字/字符串)` 显示方式不一样
- 对象通常要点开小三角才看得完整

### 3. 实验是否保留修改

今天中间一度没有统一实验规则，导致自己在判断时有点混乱。

#### 后续固定规则

以后做这种小实验时，默认采用：

**恢复基线 → 只改一处 → 看结果 → 说原因 → 再恢复基线**

这样更容易看清单个改动带来的影响。

---

## 七、今天前端部分的阶段性收获

今天不是“学会了 JavaScript”，而是：

- 第一次正式进入 JS 逻辑层
- 能把最小 JS 文件跑起来
- 能理解最基础的变量、判断、循环、函数、数组、对象
- 能通过删改实验观察代码变化
- 对 `console.log`、点号 `.`、属性、方法有了第一轮理解

---

## 八、我现在对 Day 6 前端的真实状态

### 我已经能做到

- 看懂并运行最小 JS 基础代码
- 理解 `if / for / while / function / array / object`
- 初步理解 `xx.yy` 的结构
- 知道 `console` 是浏览器提供的对象
- 知道 `log` / `push` 这种方法，本质上是“装着函数的属性”
- 能做小删改实验并解释变化原因

### 我暂时还不适合

- 直接进入复杂 DOM 操作
- 一下子切到完整交互开发
- 在没有引导的情况下独立设计较完整的 JS 逻辑

### 当前最适合的方式

- 继续先讲概念
- 再做最小代码
- 再删改实验
- 再中文复述
- 再逐步增加一点独立判断

---

## 九、今天的最简总结

今天 Day 6 前端部分，我完成了 JavaScript 基础语法第一轮入门。

我现在可以这样理解：

- `let / const`：存值
- `if`：根据条件选分支
- `for / while`：重复执行逻辑
- `function`：封装逻辑
- `array`：存一组数据
- `object`：描述一个事物的多个属性
- `console.log(...)`：调用浏览器控制台对象的方法
- `对象.属性`：访问或修改数据
- `对象.方法(...)`：调用功能

这意味着我已经从“只会页面布局”开始进入“能理解页面背后逻辑”的阶段。
