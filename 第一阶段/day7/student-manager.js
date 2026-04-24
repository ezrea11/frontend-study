const students = [
    {name: "Alice", score: 85, age: 20},
    {name: "Bob",score: 61,age: 19},
    {name: "Cindy",score:91,age: 21},
    {name: "David",score: 67,age:20}
];

//1.展示所有学生
console.log("All students:");
students.forEach(function (student){
    console.log(`${student.name} :${student.score}`);
});

//2.筛选及格学生
const passedStudents = students.filter(function (student){
    return student.score >= 60;
});

console.log("Passed students:");
console.log(passedStudents);

//3.只取所有学生名字
const studentNames = students.map(function (student){
    return `${student.name}-${student.score}`;
});

console.log("Student names:");
console.log(studentNames);

//4.计算平均分
const totalScore = students.reduce(function (sum, student){
    return sum + student.score;
},0);

const averageScore = totalScore / students.length;

console.log("Average score:");
console.log(averageScore);

//5.按姓名找人
const targetName = "Cindy";

const foundStudent = students.find(function (student){
    return student.name === targetName;
});

console.log("Found student:");
console.log(foundStudent);

//6.对象增删改查练习
const adminStudent = {
    name: "Emma",
    score: 76,
    role: "student"
};

//查
console.log(adminStudent.name);

//改
adminStudent.role = "monitor";

//增
adminStudent.level =2;

//删
delete adminStudent.score;

console.log("Updated adminStudent:");
console.log(adminStudent);