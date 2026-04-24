console.log("=== 1. let / const与基本类型 ===");

let score = 78;
const school = "BU";
let isAdmin= true;

console.log(score); //78
console.log(school); //BU
console.log(isAdmin); //true

console.log("=== 2. if / else 判断 ===");

if (score >=60){
    console.log("pass");
}else{
    console.log("fail");
}

console.log("=== 3. for循环 ===");

for(let i=1; i<=5; i++){
    console.log("for loop:",i);
}

console.log("=== 4. while循环 ===");

let count = 1;
while(count <=3){
    console.log("while loop:",count);
    count++;
}

console.log("=== 5. 函数调用 ===");

function add(a,b){
    return a + b;
}

let result = add(3,5);
console.log("add result:", result);

function isPass(scoreValue){
    if (scoreValue >= 60){
        return true;
    }else{
        return false;
    }
}

console.log("isPass(78):", isPass(78)); //true
console.log("isPass(40):", isPass(40)); //false

console.log("=== 6. 数组 ===");

let menulist = ["Dashboard","Users","Orders"];

console.log(menulist);
console.log("first item:", menulist[0]);
console.log("length:", menulist.length);

menulist.push("Settings");
console.log("after push:", menulist);


console.log("=== 7. 对象 ===");

let adminUser = {
    name:"James",
    role:"admin",
    online: true
};

console.log(adminUser);
console.log("name:", adminUser.name);

adminUser.role ="super admin";
adminUser.level = 2;

console.log("after update:", adminUser);

console.log("=== 8. 数组里放对象 ===");

let cards = [
    {title: "Users", count: 128},
    {title: "Orders", count: 56},
    {title: "Messages", count: 12}
];

console.log(cards);
console.log("first card title", cards[0].title);
console.log("second card count", cards[1].count);

console.log("=== 9. 用循环读取cards ===");

for(let i=0; i < cards.length; i++){
    console.log("card:", cards[i].title, cards[i].count);
}

console.log("=== 10. 用函数处理数据 ===");

function getTotalCount(cardList){
    let total = 0;

    for (let i = 0; i<cardList.length; i++){
        total += cardList[i].count;
    }

    return total;
}

let totalCount = getTotalCount(cards);
console.log("total count:", totalCount);