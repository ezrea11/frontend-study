console.log("=== Demo 1: executor 和 then 的执行时机 ===");

console.log("A. script start");

const timingPromise = new Promise((resolve) => {
  console.log("B. promise executor runs now");
  resolve("timing ok");
});

timingPromise.then((value) => {
  console.log("D. then:", value);
});

console.log("C. script end");

// 预期核心顺序：A -> B -> C -> D


function fakeRequest(shouldSucceed) {
  return new Promise((resolve, reject) => {
    console.log("request started");

    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ message: "ok", code: 200 });
      } else {
        reject(new Error("request failed"));
      }
    }, 1000);
  });
}


function runMainDemo() {
  console.log("\n=== Demo 2: 成功链 + return 值 + return Promise + throw + catch 恢复 ===");

  fakeRequest(true)
    .then((res) => {
      console.log("1. first then:", res.message, res.code);
      return res.code + 1; // 返回普通值，传给下一个 then
    })
    .then((num) => {
      console.log("2. second then:", num);

      // 返回一个新的 Promise，后面的 then 会等它 resolve
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("3. inner promise resolved");
          resolve(num + 10);
        }, 1000);
      });
    })
    .then((finalNum) => {
      console.log("4. third then:", finalNum);

      // 主动抛错，后面会直接进 catch
      throw new Error("boom");
    })
    .catch((err) => {
      console.log("5. catch:", err.message);

      // catch 里正常 return，一个新值会传给后面的 then
      return 999;
    })
    .then((recoveredValue) => {
      console.log("6. after catch then:", recoveredValue);
    })
    .finally(() => {
      console.log("7. finally: main demo finished");
    });
}


function runRejectDemo() {
  console.log("\n=== Demo 3: 直接 reject 的情况 ===");

  fakeRequest(false)
    .then((res) => {
      console.log("this line will not run:", res);
    })
    .catch((err) => {
      console.log("direct reject catch:", err.message);
    })
    .finally(() => {
      console.log("direct reject finally");
    });
}


runMainDemo();

// 等前一个 demo 基本跑完，再开始 reject demo，避免日志混在一起
setTimeout(() => {
  runRejectDemo();
}, 2500);