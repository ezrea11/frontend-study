function outer(){
    let message = null;

    function getMessage(){
        if(message === null){
            message = "hello";
            console.log("第一次生层message")
        }
        return message;
      
    }

    return getMessage;

}

const fn = outer();

console.log(fn());
console.log(fn());
console.log(fn());  

for(var i = 0; i <= 3 ; i++){
    setTimeout(function(){
        console.log(i);
    },0);
}

for (let i = 0; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}