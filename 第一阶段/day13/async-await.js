/*
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("James");
    }, 1000);
  });
}

getUser()
  .then((name) => {
    console.log("user:", name);
    return name + " is online";
  })
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.log("error:", err);
  })
  .finally(() => {
    console.log("finished");
  }); */
  //原本promise写法
function getUser(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("James");
        },1000);
    });
}

async function run(){
    try{
        const name = await getUser();
        console.log("User:",name);

        const msg = name + "is online";
        console.log(msg);
    }catch(err){
        console.log("error:", err)
    }finally{
        console.log("finished");
    }
}

run();