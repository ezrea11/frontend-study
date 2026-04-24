# Day 12 前端学习笔记：Promise

## 1. 今日主线

今天学习的核心是：

- 同步与异步
- Promise 的作用
- Promise 三种状态
- `resolve` / `reject`
- `then` / `catch` / `finally`
- 链式调用
- `throw error` 与错误传播
- `Promise.resolve(...)` 和 `new Promise(...)`

---

## 2. Promise 是什么

Promise 可以先理解为：

**一个“未来才会有结果”的对象。**

它不是结果本身，而是：

- 结果现在还没来
- 但以后会来
- 来了以后，再交给后续代码处理

Promise 主要是为了解决：

**异步任务的结果处理问题。**

例如：

- 发送请求
- 定时器
- 读取文件

这些任务都不是立刻拿到结果的。

---

## 3. 同步与异步

### 同步
代码按照顺序立刻执行。

```js
console.log("A");
console.log("B");
```

输出：

```js
A
B
```

### 异步
某些任务不会立刻完成，而是先挂出去，之后再回来执行。

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 1000);

console.log("C");
```

输出：

```js
A
C
B
```

---

## 4. Promise 三种状态

Promise 只有三种状态：

- `pending`：等待中
- `fulfilled`：成功
- `rejected`：失败

### 状态变化规则

Promise 一开始一定是：

```js
pending
```

之后只会变成下面两种之一：

```js
fulfilled
```

或

```js
rejected
```

并且：

**状态一旦确定，就不会再变。**

---

## 5. `resolve` 和 `reject`

### `resolve(value)`

表示：

**把 Promise 变成成功，并交出成功结果。**

### `reject(error)`

表示：

**把 Promise 变成失败，并交出失败原因。**

示例：

```js
const p1 = new Promise((resolve, reject) => {
  resolve("success");
});

const p2 = new Promise((resolve, reject) => {
  reject(new Error("failed"));
});
```

---

## 6. executor 是什么

在下面这段代码里：

```js
new Promise((resolve, reject) => {
  console.log("executor runs");
});
```

这里的：

```js
(resolve, reject) => {
  console.log("executor runs");
}
```

就叫 **executor**。

### executor 的特点

1. 它会在 `new Promise(...)` 时立刻执行  
2. 它会拿到 `resolve` 和 `reject` 两个参数  
3. 它通常负责启动异步任务

---

## 7. `then`、`catch`、`finally`

### `then`
处理成功结果。

```js
Promise.resolve("ok").then((value) => {
  console.log(value);
});
```

### `catch`
处理失败结果，或者处理中途抛出的错误。

```js
Promise.reject(new Error("wrong")).catch((err) => {
  console.log(err.message);
});
```

### `finally`
不管成功还是失败，最后都会执行。

```js
Promise.resolve("ok")
  .finally(() => {
    console.log("finished");
  });
```

---

## 8. Promise 执行顺序中最关键的点

### 1）`new Promise(...)` 里的同步代码会立刻执行

```js
console.log("1");

new Promise((resolve) => {
  console.log("2");
  resolve();
});

console.log("3");
```

输出：

```js
1
2
3
```

### 2）`then / catch / finally` 不会立刻执行

```js
console.log("1");

new Promise((resolve) => {
  console.log("2");
  resolve();
}).then(() => {
  console.log("4");
});

console.log("3");
```

输出：

```js
1
2
3
4
```

### 3）`then / catch / finally` 都要等当前同步代码先跑完

这是今天最重要的执行顺序结论之一。

---

## 9. 链式调用

### 9.1 前一个 `then` 的 `return` 会传给下一个 `then`

```js
Promise.resolve(10)
  .then((x) => {
    return x + 1;
  })
  .then((y) => {
    console.log(y);
  });
```

输出：

```js
11
```

### 9.2 如果 `then` 里返回的是 Promise

后面的 `then` 会等这个 Promise 完成。

```js
Promise.resolve(10)
  .then((x) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x + 5);
      }, 1000);
    });
  })
  .then((y) => {
    console.log(y);
  });
```

输出会在 1 秒后打印：

```js
15
```

---

## 10. `throw error` 与错误传播

### 10.1 `then` 里 `throw error` 会直接跳到 `catch`

```js
Promise.resolve(10)
  .then((x) => {
    throw new Error("boom");
  })
  .catch((err) => {
    console.log(err.message);
  });
```

输出：

```js
boom
```

### 10.2 `catch` 里如果 `return 值`

后面的链会恢复到成功分支。

```js
Promise.resolve(10)
  .then((x) => {
    throw new Error("boom");
  })
  .catch((err) => {
    return 99;
  })
  .then((value) => {
    console.log(value);
  });
```

输出：

```js
99
```

### 10.3 `catch` 里如果继续 `throw error`

后面的链仍然按失败走。

---

## 11. `Promise.resolve(x)` 和 `new Promise(...)` 的区别

### `Promise.resolve(x)`

作用：

**快速得到一个成功的 Promise。**

```js
const p = Promise.resolve(123);
```

适合：

- 已经有一个现成值
- 只想快速包装成 Promise

### `new Promise((resolve, reject) => { ... })`

作用：

**手动创建 Promise，并自己控制什么时候成功、什么时候失败。**

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
});
```

适合：

- 要自己启动异步任务
- 要控制 `resolve / reject` 的时机

### 一句话总结

- `Promise.resolve(x)`：快速包装现成值
- `new Promise(...)`：自己定义 Promise 的运行过程

---

## 12. 今日最容易混淆的点

### 1）executor 会立刻执行，但 `then` 不会立刻执行

### 2）`resolve(...)` 不等于“马上执行 then”
它只是把 Promise 变成成功；`then` 的回调仍要等同步代码结束后才执行

### 3）`catch` 不只是接 `reject`
它也能接住 `then` 里抛出的错误

### 4）`catch` 后不一定结束
如果 `catch` 里正常 `return` 一个值，后面的链还能继续走 `then`

### 5）分开写：

```js
p.catch(...)
p.then(...)
```

不是一条链，而是两条分支

更标准的写法通常是：

```js
p.then(...).catch(...).finally(...)
```

---

## 13. 今日干净版 `promise.js`

```js
console.log("0. script start");

function fakeRequest(shouldSucceed) {
  return new Promise((resolve, reject) => {
    console.log("1. request started");

    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ message: "ok", code: 200 });
      } else {
        reject(new Error("request failed"));
      }
    }, 1000);
  });
}

fakeRequest(true)
  .then((res) => {
    console.log("2. first then:", res.message, res.code);
    return res.code + 1;
  })
  .then((num) => {
    console.log("3. second then:", num);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("4. inner promise resolved");
        resolve(num + 10);
      }, 1000);
    });
  })
  .then((finalNum) => {
    console.log("5. third then:", finalNum);
    throw new Error("boom");
  })
  .catch((err) => {
    console.log("6. catch:", err.message);
    return 999;
  })
  .then((recoveredValue) => {
    console.log("7. after catch then:", recoveredValue);
  })
  .finally(() => {
    console.log("8. finally");
  });

console.log("9. script end");
```

---

## 14. 今天最终真正掌握的内容

今天已经完成 Promise 第一轮骨架理解：

- Promise 是处理异步结果的
- Promise 有三种状态
- `resolve` / `reject` 分别负责成功和失败
- `executor` 会立刻执行
- `then / catch / finally` 不会立刻执行
- `then` 可以链式传值
- `then` 里 `throw error` 会进 `catch`
- `catch` 可以恢复链
- `Promise.resolve(...)` 和 `new Promise(...)` 的定位不同

---

## 15. 明天和 Day 13 的衔接

明天学习 `async / await` 时，可以直接把它理解成：

**Promise 的更好写法。**

也就是说：

- 底层仍然是 Promise
- 只是写法更直观
- 不是新的异步机制
