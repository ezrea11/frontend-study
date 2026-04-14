console.log("=== 1. 全局作用域 ===");
let school = "BU";
console.log(school);

console.log("=== 2. 函数作用域 ===");
function testFunctionScope(){
    let message = "inside function";
    console.log(message);
}
testFunctionScope();
//console,log(message); // 报错：函数外不能访问

console.log("=== 3. 块级作用域：let ===");
if(true){
    var score = 95;
    console.log(score);
}
console.log(score); // 报错：块外不能访问

console.log("=== 4. 块级作用域：var ===");
if (true){
    var city = "Boston";
}
console.log(city); //Boston

console.log("=== 5. var的提升 ===");
console.log(a); //undefined
//let a = 10;// 报错
var a = 10;
console.log(a); //10

console.log("=== 6. let的声明前访问 ===");
//console.log(b); //报错
let b = 20;
console.log(b);

console.log("=== 7. const的声明前访问 ===");
//console.log(pi); // 报错
const pi = 3.14;
console.log(pi);

console.log("=== 8. 实验3： 函数作用域再验证 ===");
function demo(){
    let x = 100;
    console.log(x);
}
demo();
//console.log(x); //报错        

console.log("=== 9. 实验4A： const对象属性可改 ==="); 
const user1 = {name: "James"};
user1.name = "Sky";
console.log(user1.name);

console.log("=== 10. 实验4B： const对象不能重新赋值 ===");
const user2 = {name : "James"};
//user2 = {name: "Sky"}; //报错：不能重新赋值

