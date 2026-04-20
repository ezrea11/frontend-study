/*function Person(name) {
  this.name = name;
  this.sayHi = function () {
    console.log("Hi, I am " + this.name);
  };
}*///实例写法

function Person(name) {
  this.name = name;
}

const p1 = new Person("James");
//const p2 = new Person("Sky");

console.log(p1.name);
//console.log(p2.name);
//console.log(p1.hasOwnProperty("name"));
//console.log(p2.hasOwnProperty("sayHi"));
//console.log(Person.prototype);
//console.log(p1.__proto__);
console.log(p1.__proto__ === Person.prototype);
//console.log(p1.name);
//console.log(p1.sayHi);

Person.prototype.sayHi = function () {
  console.log("Hi, I am " + this.name);
};

console.log(p1.hasOwnProperty("name"));
console.log(p1.hasOwnProperty("sayHi"));
p1.sayHi();
//p2.sayHi();