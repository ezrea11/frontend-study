// -----------------------------
// 1. async 函数一定返回 Promise
// -----------------------------
async function testAsyncReturn(){
    return 123;
}

console.log("1.",testAsyncReturn());
//这里打印出来的是Promise，不是普通的123


// ---------------------------------------------
// 2. await 等待 Promise 成功，并拿到 resolve 的值
// ---------------------------------------------
function getSuccessData(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("success data");
        },1000);
    });
}

async function runSuccessDemo(){
    console.log("2.runSuccessDemo start");

    const result = await getSuccessData();
    console.log("3.result = ",result);

    console.log("4.runSuccessDemo end");
}



// -------------------------------------------------
// 3. await 遇到 rejected Promise，会直接抛错
//    所以要用 try / catch
// -------------------------------------------------
function getFailData(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            reject("something wrong")
        },1000);
    });
}

async function runFailDemo(){
    console.log("5.runFailDemo start");

    try{
        const result = await getFailData();
        console.log("6.result = ", result);
        //这一行不会执行，因为上面的的await遇到的reject
    }catch(error){
        console.log("6.caught error =", error);
    }finally{
        console.log("7.finally always runs");
    }

    console.log("8.runFailDemo end");
}


// -------------------------------------------------
// 4. 看 await 不会阻塞外面的同步代码
// -------------------------------------------------
function getNumber(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(100);
        },1000);
    });
}

async function runOrderDemo(){
    console.log("9. A");

    const num = await getNumber();
    console.log("11.B", num)

    console.log("12.C");
}

console.log("start");

runSuccessDemo();
runFailDemo();
runOrderDemo();

console.log("10. D");

console.log("end");


