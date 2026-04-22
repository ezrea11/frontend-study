# Day 13 前端笔记：async / await 初见面

## 今日主题

今天的核心目标不是把异步全部学完，而是先把 **async / await 第一轮** 真正吃稳。

今天已经完成的关键点：

1. `async` 函数一定返回 Promise
2. `await` 会等待 Promise 的结果
3. `await` 遇到 rejected Promise 会直接抛错
4. `try / catch` 对应 Promise 里的 `.catch()`
5. `finally` 不管成功还是失败都会执行
6. `await` 不会阻塞外面的同步代码
7. async / await 不是新异步机制，本质上还是 Promise 的更好写法

---

# 一、今日最重要的一句话

**async / await 不是新的异步机制，它本质上还是基于 Promise。**

也就是说：

- 底层仍然是 Promise
- 只是代码写法更像顺序代码
- 可读性更强

---

# 二、async 到底是什么

## 结论

**只要函数前面加了 `async`，这个函数返回的一定是 Promise。**

例如：

```javascript
async function testAsyncReturn() {
  return 123;
}
```

表面上看它返回的是 `123`，  
但本质上更接近于：

```javascript
function testAsyncReturn() {
  return Promise.resolve(123);
}
```

所以：

```javascript
console.log(testAsyncReturn());
```

打印出来的是 Promise，不是普通数字 `123`。

---

# 三、await 到底在干什么

## 结论

**`await` 等的是 Promise 的结果。**

- 如果 Promise 成功（fulfilled），就拿到值
- 如果 Promise 失败（rejected），就直接抛错

例如：

```javascript
const result = await getSuccessData();
```

这句话的过程可以理解成：

1. 调用 `getSuccessData()`
2. 它返回一个 Promise
3. `await` 在这里先让当前 async 函数停一下
4. 等 Promise 成功后，把结果值交给 `result`
5. 然后再继续往下执行

---

# 四、为什么 `await` 必须写在 `async` 里

因为 `await` 只能出现在 `async` 函数内部。

也就是说：

```javascript
async function run() {
  const result = await getData();
}
```

是合法的。

但下面这种不行：

```javascript
function run() {
  const result = await getData(); // 错误
}
```

所以更准确地说：

> 某个函数要写成 `async`，一个直接原因通常是：它里面用了 `await`

---

# 五、错误处理：try / catch 对应 Promise 的 catch

Promise 写法中，错误常见是这样接：

```javascript
getData()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

到了 async / await 里，对应写法变成：

```javascript
try {
  const res = await getData();
  console.log(res);
} catch (err) {
  console.log(err);
}
```

## 关键理解

**`await` 遇到 rejected Promise，不会正常赋值给变量，而是会直接抛错。**

所以：

```javascript
const result = await getFailData();
console.log(result);
```

如果 `getFailData()` 里是 `reject(...)`，那么：

- `result` 拿不到正常值
- `console.log(result)` 不会执行
- 程序会直接进入 `catch`

---

# 六、finally 的作用

`finally` 的意思是：

**无论成功还是失败，这里的代码最后都会执行。**

例如：

```javascript
try {
  const res = await getData();
  console.log(res);
} catch (err) {
  console.log(err);
} finally {
  console.log("finished");
}
```

不管 `getData()` 是 resolve 还是 reject，  
最后都会执行：

```javascript
console.log("finished");
```

---

# 七、await 不会阻塞外面的同步代码

这是今天非常重要的一点。

看这类代码：

```javascript
async function run() {
  console.log("A");

  const num = await getNumber();
  console.log("B", num);

  console.log("C");
}

run();
console.log("D");
```

很多时候容易误以为顺序会是：

```text
A
B
C
D
```

其实不是。

更真实的顺序是：

```text
A
D
B 100
C
```

## 为什么

因为：

- `await` 只会暂停当前这个 async 函数
- 它不会让外面的同步代码停住

所以你要记住：

**`await` 不是让整个程序停下，而是让当前 async 函数先停一下。**

---

# 八、今日练习代码（修正版）

你今天写的代码强度已经足够 Day 13 第一轮使用了。  
只需要修正一个小问题：

- 你定义的是 `runSuccess()`
- 但调用写成了 `runSuccessDemo()`

这两个名字要统一，否则会直接报错。

下面是整理后的修正版：

```javascript
// -----------------------------
// 1. async 函数一定返回 Promise
// -----------------------------
async function testAsyncReturn() {
  return 123;
}

console.log("1.", testAsyncReturn());
// 这里打印出来的是 Promise，不是普通的 123


// ---------------------------------------------
// 2. await 等待 Promise 成功，并拿到 resolve 的值
// ---------------------------------------------
function getSuccessData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success data");
    }, 1000);
  });
}

async function runSuccessDemo() {
  console.log("2. runSuccessDemo start");

  const result = await getSuccessData();
  console.log("3. result =", result);

  console.log("4. runSuccessDemo end");
}


// -------------------------------------------------
// 3. await 遇到 rejected Promise，会直接抛错
//    所以要用 try / catch
// -------------------------------------------------
function getFailData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("something wrong");
    }, 1000);
  });
}

async function runFailDemo() {
  console.log("5. runFailDemo start");

  try {
    const result = await getFailData();
    console.log("6. result =", result);
    // 这一行不会执行，因为上面的 await 遇到了 reject
  } catch (error) {
    console.log("6. caught error =", error);
  } finally {
    console.log("7. finally always runs");
  }

  console.log("8. runFailDemo end");
}


// -------------------------------------------------
// 4. 看 await 不会阻塞外面的同步代码
// -------------------------------------------------
function getNumber() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
}

async function runOrderDemo() {
  console.log("9. A");

  const num = await getNumber();
  console.log("11. B", num);

  console.log("12. C");
}

console.log("start");

runSuccessDemo();
runFailDemo();
runOrderDemo();

console.log("10. D");

console.log("end");
```

---

# 九、这份代码为什么已经够 Day 13

因为它已经覆盖了今天最关键的 4 类情况：

## 1. async 返回 Promise
```javascript
async function testAsyncReturn() {
  return 123;
}
```

## 2. await 成功拿值
```javascript
const result = await getSuccessData();
```

## 3. await 失败抛错，再由 try/catch 接住
```javascript
try {
  const result = await getFailData();
} catch (error) {
  console.log(error);
}
```

## 4. await 不阻塞外面同步代码
```javascript
runOrderDemo();
console.log("10. D");
```

所以从 Day 13 的学习目标来说，这份代码已经足够了，不需要再继续加更复杂的异步内容。

---

# 十、今天最容易错的点

## 1. 以为 async 只是语法标签
不是。  
**它会让函数返回 Promise。**

## 2. 以为 await 等的是 setTimeout
不是。  
**await 等的是 Promise 的结果。**

`setTimeout` 只是常见的异步演示工具。

## 3. 以为 rejected Promise 会把值赋给变量
不是。  
**rejected Promise 会让 `await` 直接抛错。**

## 4. 以为 await 会阻塞整个程序
不是。  
**它只暂停当前 async 函数，不会挡住外面的同步代码。**

## 5. 以为 try/catch 是额外机制
不是。  
它只是 async / await 风格下，对 Promise `.catch()` 的对应写法。

---

# 十一、今天最短记忆版

你今天只要记住下面这 6 句就够了：

1. **`async` 函数一定返回 Promise**
2. **`await` 等 Promise 的结果**
3. **Promise 成功，`await` 拿值**
4. **Promise 失败，`await` 抛错**
5. **`try / catch` 对应 Promise 的 `.catch()`**
6. **`await` 不会阻塞外面的同步代码**

---

# 十二、今日一句话总结

> 今天学到的核心不是“会写 async / await 了”，而是：我已经能把 async / await 和 Promise 对上，知道 `async` 为什么返回 Promise，知道 `await` 为什么能拿值，知道 rejected 为什么会进 `catch`，也知道 `await` 不会让整个程序停住。
