# Day 14 Event Loop 笔记

## 一、今天的核心目标

今天的目标不是把 Event Loop 学到特别深，而是先建立第一轮最关键的执行框架：

1. 同步代码先执行
2. 同步代码执行完后，先清空微任务
3. 再执行宏任务
4. 每执行完一个宏任务，也要再次清空微任务

---

## 二、什么是调用栈（Call Stack）

调用栈可以先理解为：

> **JavaScript 当前正在执行的代码和函数调用所在的地方。**

例如：

```javascript
function a() {
  console.log("A");
  b();
}

function b() {
  console.log("B");
}

console.log("start");
a();
console.log("end");
```

这里的 `console.log`、`a()`、`b()` 都是在同步执行流程中进入调用栈的。

所以当前阶段可以先记成：

> **调用栈 = 当前正在执行的同步代码的位置。**

---

## 三、什么是微任务（Microtask）

微任务可以先理解为：

> **当前还没有执行，要等调用栈清空后，优先进入调用栈执行的一批任务。**

当前阶段最常见的微任务：

- `Promise.then`
- `catch`
- `finally`
- `await` 后面恢复执行的代码

注意：

不是 `Promise.resolve()` 本身是微任务，
而是 **`then` 里面的回调函数** 会进入微任务队列。

例如：

```javascript
Promise.resolve().then(() => {
  console.log("B");
});
```

真正进入微任务队列的是：

```javascript
() => {
  console.log("B");
}
```

---

## 四、什么是宏任务（Macrotask）

宏任务可以先理解为：

> **不会立刻执行，而是要等前面的同步代码和微任务都处理完后，再轮到的一类任务。**

当前阶段最常见的宏任务：

- `setTimeout`

例如：

```javascript
setTimeout(() => {
  console.log("A");
}, 0);
```

这里的回调函数不会立刻进入调用栈执行，
而是会先进入宏任务队列，等轮到它时才进入调用栈。

---

## 五、最核心的执行顺序

今天最重要的一句话：

> **同步代码先执行；同步代码执行完后，先清空微任务；然后再执行宏任务。**

也就是：

```text
同步 -> 微任务 -> 宏任务
```

但这里还要补一个很关键的点：

> **不是只在最开始执行一次“同步 -> 微任务 -> 宏任务”。**
> **而是每执行完一个宏任务，也要再次清空微任务。**

这也是今天 Event Loop 最容易忽略、但最重要的一层理解。

---

## 六、为什么 Promise.then 比 setTimeout 更早执行

看例子：

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

### 执行过程

#### 1. 先执行同步代码

- `console.log("A")` -> 输出 `A`
- `setTimeout(...)` -> 回调进入宏任务队列
- `Promise.resolve().then(...)` -> `then` 回调进入微任务队列
- `console.log("D")` -> 输出 `D`

此时同步部分输出：

```text
A D
```

#### 2. 同步代码执行完，清空微任务

- 输出 `C`

#### 3. 最后执行宏任务

- 输出 `B`

### 最终顺序

```text
A D C B
```

所以：

> **`Promise.then` 比 `setTimeout` 更早，不是因为它更“快”，而是因为微任务在执行顺序上先于宏任务。**

---

## 七、await 的本质

看例子：

```javascript
async function test() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}

console.log("3");
test();
console.log("4");
```

### 正确输出

```text
3 1 4 2
```

### 理解重点

不是说 `await` 把整个程序都停住了。

更准确地说：

> **`await` 会暂停当前 async 函数后半段的执行，但不会阻塞外面的同步代码。**

也就是：

- `test()` 先执行到 `await` 前，所以先输出 `1`
- `await` 后面的 `console.log("2")` 不会立刻执行
- 外面的同步代码继续执行，所以 `4` 先输出
- 然后 `await` 后续代码作为后续微任务继续执行，所以最后输出 `2`

所以可以记成：

> **`await` 暂停的是当前 async 函数后半段，而不是整个程序。**

---

## 八、微任务和宏任务嵌套时要注意什么

### 例子 1：微任务里再注册宏任务

```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
  setTimeout(() => {
    console.log("4");
  }, 0);
});

console.log("5");
```

### 输出顺序

```text
1 5 3 2 4
```

### 原因

- `2` 对应的 `setTimeout` 在同步阶段就已经进入宏任务队列
- `4` 对应的 `setTimeout` 是后面在微任务执行时才进入宏任务队列
- 所以宏任务队列里 `2` 先于 `4`

因此：

> **同类任务之间也看入队先后顺序。**

---

### 例子 2：宏任务里再产生微任务

```javascript
setTimeout(() => {
  console.log("A");
  Promise.resolve().then(() => {
    console.log("B");
  });
}, 0);

setTimeout(() => {
  console.log("C");
}, 0);

console.log("D");
```

### 正确输出

```text
D A B C
```

### 关键原因

这里最重要的不是“微任务比宏任务早”这句表面结论，
而是：

> **每执行完一个宏任务，也要先清空当前产生的微任务，再去执行下一个宏任务。**

执行过程：

1. 同步输出 `D`
2. 第一个宏任务执行，输出 `A`
3. 第一个宏任务里又产生了微任务 `B`
4. 当前宏任务结束后，要先清空微任务，所以先输出 `B`
5. 然后才执行第二个宏任务，输出 `C`

---

## 九、微任务之间也看入队顺序

看例子：

```javascript
console.log("start");

async function foo() {
  console.log("foo1");
  await Promise.resolve();
  console.log("foo2");
}

setTimeout(() => {
  console.log("timer");
}, 0);

foo();

Promise.resolve().then(() => {
  console.log("then");
});

console.log("end");
```

### 输出顺序

```text
start foo1 end foo2 then timer
```

### 为什么 `foo2` 在 `then` 前面？

因为：

- `foo()` 更早执行到 `await`
- `await` 后面的 `foo2` 更早进入微任务队列
- 后面的 `then` 回调稍后才进入微任务队列

所以：

> **微任务之间不是乱序执行，而是先入队的先执行。**

---

## 十、今天最重要的最终结论

把今天 Day 14 的核心内容压缩成这 4 句：

1. **同步代码先执行**
2. **同步代码执行完后，先清空微任务，再执行宏任务**
3. **每执行完一个宏任务，也要再次清空微任务**
4. **微任务之间、宏任务之间，都看入队先后顺序**

---

## 十一、我今天最容易出错的点

今天最容易犯的错不是分不清同步、微任务、宏任务，
而是容易忽略：

> **每做完一个宏任务后，不是立刻去下一个宏任务，而是要先清空当前产生的微任务。**

这也是 `D A B C` 这类题最容易做错的根源。

---

## 十二、当前阶段的正确定位

今天 Event Loop 的学习并不是“已经学透了异步机制”，
而是已经完成了 **第一轮主骨架建立**。

当前阶段达到的目标是：

- 能区分同步 / 微任务 / 宏任务
- 能解释 `Promise.then` 为什么早于 `setTimeout`
- 能解释 `await` 为什么不会阻塞外面的同步代码
- 能判断典型输出顺序题
- 能把 Promise、async/await、Event Loop 三者串起来理解

这就已经符合 Day 14 前端主任务要求了。

---

## 十三、可直接背诵版

如果要用最短的话讲给别人听，可以直接说：

> JavaScript 先执行同步代码；同步代码执行完后，会先清空微任务，再执行宏任务；并且每执行完一个宏任务，也要再次清空微任务。`Promise.then` 和 `await` 后续代码通常属于微任务，`setTimeout` 通常属于宏任务，所以 `then` 往往比 `setTimeout` 更早执行。
