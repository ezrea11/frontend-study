// ==============================
// Case 1: 只有同步代码
// Expected:
// case1-A
// case1-B
// ==============================
console.log("case1-A");
console.log("case1-B");


// ==============================
// Case 2: 同步 + 宏任务
// Expected:
// case2-A
// case2-C
// case2-B
// ==============================
console.log("case2-A");
setTimeout(() => {
    console.log("case2-B");
}, 0);
console.log("case2-C");


// ==============================
// Case 3: 同步 + 微任务
// Expected:
// case3-A
// case3-C
// case3-B
// ==============================
console.log("case3-A");
Promise.resolve().then(() => {
    console.log("case3-B");
});
console.log("case3-C");


// ==============================
// Case 4: 微任务中再注册宏任务
// Expected:
// case4-1
// case4-5
// case4-3
// case4-2
// case4-4
// ==============================
console.log("case4-1");
setTimeout(() => {
    console.log("case4-2");
}, 0);
Promise.resolve().then(() => {
    console.log("case4-3");
    setTimeout(() => {
        console.log("case4-4");
    }, 0);
});
console.log("case4-5");


// ==============================
// Case 5: 宏任务中再产生微任务
// Expected:
// case5-D
// case5-A
// case5-B
// case5-C
// ==============================
setTimeout(() => {
    console.log("case5-A");
    Promise.resolve().then(() => {
        console.log("case5-B");
    });
}, 0);

setTimeout(() => {
    console.log("case5-C");
}, 0);

console.log("case5-D");


// ==============================
// Case 6: async / await + then + setTimeout
// Expected:
// case6-start
// case6-foo1
// case6-end
// case6-foo2
// case6-then
// case6-timer
// ==============================
console.log("case6-start");

async function foo() {
    console.log("case6-foo1");
    await Promise.resolve();
    console.log("case6-foo2");
}

setTimeout(() => {
    console.log("case6-timer");
}, 0);

foo();

Promise.resolve().then(() => {
    console.log("case6-then");
});

console.log("case6-end");