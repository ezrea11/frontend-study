window.name="GlobalName";

function showThis(){
    console.log("普通函数里的this：",this);
}

const user={
    name:"James",
    sayName: function(){
        console.log("对象方法里的this：",this);
        console.log("name=",this.name);
    }
};

const fn =user.sayName;
console.log("fn=",fn);
//showThis();
user.sayName();
fn();

const hello = () => {
  console.log("hello");
};

const add = (a, b) => {
  return a + b;
};

hello();
console.log(add(2, 3));

const user2={
    name:"Sky",
    sayNormal:function(){
        console.log("普通函数this.name=",this.name);
    },
    sayArrow:()=>{
        console.log("箭头函数this=",this);
        console.log("箭头函数this.name=",this.name);
    }
};

user2.sayNormal();
user2.sayArrow();