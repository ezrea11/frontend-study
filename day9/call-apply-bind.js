function introduce(city,country){
    console.log("this.name=",this.name);
    console.log("city=",city);
    console.log("country=",country);
}

const user={
    name:"James"
};

introduce("Boston","USA");
console.log("-------");

introduce.call(user,"Boston","USA");
console.log("-------");

introduce.apply(user,["Boston","USA"]);
console.log("-------");

const boundFn = introduce.bind(user,"Boston","USA");
console.log("boundFn =", boundFn);
console.log("-------");

boundFn();
