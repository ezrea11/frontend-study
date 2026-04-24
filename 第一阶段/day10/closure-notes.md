# Day 10 前端笔记：闭包（Closure）

## 今天最核心的一句话

**闭包不是一种新语法。**  
闭包更像一种现象：

**内部函数被带到外部后，仍然能够访问外部函数里的变量。**

---

## 闭包的本质

先看最小结构：

```javascript
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}
```

这里有两层：

- 外层函数：`outer`
- 内层函数：`inner`

`count` 是定义在 `outer` 里的局部变量。

正常理解下：

- `outer()` 执行结束后
- `outer` 里的局部变量本来应该不再给外面继续直接使用

但是如果 `inner` 被带到了外部，而且 `inner` 还在继续使用 `count`，那么：

**虽然 `outer` 执行结束了，但 `count` 没有像普通情况那样失去作用。**

---

## 闭包成立的关键条件

### 不是只有 `inner` 就够了
下面这样还不够：

```javascript
function outer() {
  let count = 0;

  function inner() {
    console.log(count);
  }
}
```

因为这里 `inner` 没有被带出去，外面也没法继续调用它。

---

### 真正关键的是：
**内部函数被带到外部后，还在引用外层变量。**

最常见写法：

```javascript
function outer() {
  let count = 0;

  function inner() {
    console.log(count);
  }

  return inner;
}
```

这里的 `return inner` 只是最常见的“带出去”的方式。

---

##  闭包不要求必须 `return inner`

例如下面这样也算闭包：

```javascript
let fn;

function outer() {
  let count = 0;

  function inner() {
    console.log(count);
  }

  fn = inner;
}

outer();
fn();
```

因为这里同样满足：

- `inner` 被带到了外面
- `inner` 仍然能访问 `count`

所以你可以记：

**闭包不要求必须 `return inner`，但必须让内部函数在外部还能继续使用。**

---

## 最小闭包 demo：计数器

```javascript
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const fn = outer();

fn();
fn();
fn();
```

输出：

```javascript
1
2
3
```

---

## 为什么会输出 1、2、3

### 第一步
执行：

```javascript
const fn = outer();
```

这一步做了这些事：

1. 进入 `outer`
2. 创建：

```javascript
let count = 0;
```

3. 创建内部函数 `inner`
4. 返回 `inner`

所以：

**`fn` 里装的是返回出来的 `inner` 函数本身。**

不是执行结果。

---

### 第二步
第一次执行：

```javascript
fn();
```

本质上是在执行 `inner()`：

```javascript
count++;
console.log(count);
```

所以：

- `count` 从 `0` 变成 `1`
- 输出 `1`

---

### 第三步
第二次再执行 `fn()`：

- 不是重新回到 `count = 0`
- 而是继续使用之前那个 `count`

所以：

- `count` 从 `1` 变成 `2`
- 输出 `2`

第三次同理，输出 `3`

---

## 这里最容易说错的一点

不是说：

**“inner 把 count 带出来了”**

更准确地说是：

**被带出来的是 `inner` 函数，而 `inner` 仍然能够访问 `count`。**

---

## 同一个闭包 vs 不同闭包

看这段代码：

```javascript
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const fn1 = outer();
const fn2 = outer();

fn1();
fn1();
fn2();
fn2();
```

输出是：

```javascript
1
2
1
2
```

---

### 为什么不是 1、2、3、4
因为：

- `fn1 = outer()` 执行了一次 `outer()`，生成了一套自己的 `count`
- `fn2 = outer()` 又执行了一次 `outer()`，又生成了一套新的 `count`

所以：

- `fn1` 操作的是自己的 `count`
- `fn2` 操作的是另一份新的 `count`

结论：

**每调用一次 `outer()`，都会生成一个新的闭包环境。**

---

##  `console.log(count)` 和 `return count` 的区别

### 写法 1
```javascript
function inner() {
  count++;
  console.log(count);
}
```

含义：

**函数内部直接打印。**

---

### 写法 2
```javascript
function inner() {
  count++;
  return count;
}
```

含义：

**函数把结果交出去，由外面决定怎么处理。**

例如：

```javascript
console.log(fn());
```

这里是：

1. 先执行 `fn()`
2. 拿到返回值
3. 再由 `console.log(...)` 打印出来

---

##  闭包的用途一：计数器

```javascript
function outer() {
  let count = 0;

  function add() {
    count++;
    return count;
  }

  return add;
}

const counter = outer();

console.log(counter());
console.log(counter());
console.log(counter());
```

输出：

```javascript
1
2
3
```

为什么它像计数器？

因为它满足三件事：

1. 有一个记录数字的变量 `count`
2. 每次调用都会 `count++`
3. `count` 不会每次重新变成 0，而是会记住上一次的结果

所以：

**闭包的典型用途之一，就是做“带记忆的函数”。**

---

##  闭包的用途二：缓存函数

```javascript
function outer() {
  let message = null;

  function getMessage() {
    if (message === null) {
      message = "hello";
      console.log("第一次生成 message");
    }

    return message;
  }

  return getMessage;
}

const fn = outer();

console.log(fn());
console.log(fn());
console.log(fn());
```

---

### 输出逻辑
第一次执行 `fn()`：

- `message` 还是 `null`
- 所以进入 `if`
- 执行：

```javascript
message = "hello";
console.log("第一次生成 message");
```

然后返回 `"hello"`

第二次和第三次执行时：

- `message` 已经是 `"hello"`
- 所以不会再进入 `if`
- 直接返回之前保存的 `"hello"`

---

### 它为什么像缓存
缓存函数的本质不是“少打印一次”，而是：

**第一次生成结果后，把结果存住；以后再要同一个结果时，不重新生成，直接复用。**

所以这里真正被缓存的是：

```javascript
message
```

结论：

**闭包的另一个典型用途，是把结果记住，避免重复生成。**

---

##  闭包的常见坑：循环里的 `var`

```javascript
for (var i = 0; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}
```

这里实际输出是：

```javascript
4
4
4
4
```

浏览器 Console 可能会把它折叠显示成一行 `4`，右边带一个重复次数标记。

---

## 为什么不是 0、1、2、3

### 第一步：`for` 本身会先跑完
这段代码里，循环一共跑 4 次：

- `i = 0`
- `i = 1`
- `i = 2`
- `i = 3`

每一轮做的都不是“立刻打印”，而是：

**先登记一个稍后执行的回调函数。**

---

### 第二步：`setTimeout` 不是立刻执行
所以在这 4 个回调真正开始执行之前，`for` 循环已经结束了。

而循环结束时：

```javascript
i = 4
```

因为当 `i = 3` 那一轮执行完后，还会执行一次：

```javascript
i++
```

于是 `i` 变成 4，接着判断：

```javascript
4 <= 3
```

不成立，循环退出。

---

### 第三步：为什么 4 个回调都打印 4
因为这里用的是：

```javascript
var i
```

你当前阶段先这样理解就够：

**多个回调看到的是同一个 `i`。**

等它们真正执行时，这个 `i` 已经变成 4 了，所以都打印 4。

---

##  改成 `let` 后为什么会变

```javascript
for (let i = 0; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}
```

这次输出会是：

```javascript
0
1
2
3
```

你当前阶段先这样理解：

**`let` 在这里会让每一轮循环更像有自己单独的一份 `i`。**

所以：

- 第一轮回调看到 0
- 第二轮回调看到 1
- 第三轮回调看到 2
- 第四轮回调看到 3

---

## 这个坑最重要的结论

**`var` 版：多个回调共用同一个变量。**  
**`let` 版：每轮循环更像各自有一份独立的变量。**

---

##  今天最容易出错的点

### 错点 1
以为闭包必须写成 `return inner`

纠正：  
不是必须，但这是最常见、最适合当前阶段理解的写法。

---

### 错点 2
以为 `outer` 没有结束

纠正：  
`outer` 的执行其实已经结束了。  
特殊的是：内部函数还在引用 `outer` 里的变量，所以这些变量还能继续用。

---

### 错点 3
以为缓存函数的本质是“少打印一次”

纠正：  
缓存函数的本质是：  
**第一次生成结果，后面直接复用结果。**

---

### 错点 4
以为 `var` + `setTimeout` 会输出 0、1、2、3

纠正：    
因为回调不是立刻执行，而 `var` 又让它们看到同一个最终变成 4 的变量。

---

## 今天的最小总结

### 闭包到底是什么
**内部函数被带到外部后，仍然能够访问外部函数里的变量。**

### 为什么会形成闭包
因为内部函数还在继续引用外层变量。

### 闭包有什么用
1. 做计数器
2. 做缓存函数
3. 在回调场景中形成“记住变量”的效果

### 闭包常见坑
循环里 `var` 和 `setTimeout` 容易让多个回调共用同一个变量。

---

## 一句话最终版

**闭包 = 被带出去的内部函数，仍然记着并继续使用外层函数的变量。**
