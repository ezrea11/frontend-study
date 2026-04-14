# Day 7 前端笔记（JS 数组与对象处理）

## 一、今日核心目标
从“会基础语法”升级到“会处理一组数据”。

---

## 二、核心数据结构

```js
const students = [
  { name: "Alice", score: 85, age: 20 },
  { name: "Bob", score: 61, age: 19 },
  { name: "Cindy", score: 91, age: 21 },
  { name: "David", score: 67, age: 20 }
];
```

理解：
- 数组：一组数据
- 对象：一个事物的多个属性
- 数组 + 对象：前端最常见结构

---

## 三、forEach

```js
students.forEach(function (student) {
  console.log(`${student.name}: ${student.score}`);
});
```

作用：
- 遍历数组
- 对每个元素执行操作

特点：
- 不返回新数组
- 侧重“逐个处理”

---

## 四、filter

```js
const passedStudents = students.filter(function (student) {
  return student.score >= 60;
});
```

作用：
- 按条件筛选元素
- 返回新数组

关键理解：
- true → 保留
- false → 去掉

实验：
- Bob: 58 → 61
- 结果：Bob 被加入筛选数组

---

## 五、map

```js
const studentNames = students.map(function (student) {
  return student.name;
});
```

作用：
- 把每个元素映射成新值
- 返回新数组

关键理解：
- return 决定结果

实验：

```js
return `${student.name} - ${student.score}`;
```

结果：
- ["Alice - 85", "Bob - 61", ...]

结论：
- map 不是“取名字”
- map 是“变成什么由 return 决定”

---

## 六、reduce

```js
const totalScore = students.reduce(function (sum, student) {
  return sum + student.score;
}, 0);
```

作用：
- 按规则累计结果

参数：
- sum：当前累计值
- student：当前元素
- 0：初始值

实验：

```js
return sum + 1;
```

结果：
- totalScore = 4
- average = 1

结论：
- reduce 不是专门求和
- 是“你定义规则，它按规则累计”

---

## 七、find（补充）

```js
const foundStudent = students.find(function (student) {
  return student.name === "Cindy";
});
```

作用：
- 找第一个符合条件的元素

---

## 八、对象操作

```js
const adminStudent = {
  name: "Emma",
  score: 76,
  role: "student"
};
```

操作：

```js
adminStudent.name          // 查
adminStudent.role = "monitor"  // 改
adminStudent.level = 2         // 增
delete adminStudent.score      // 删
```

---

## 九、模板字符串

```js
`${student.name} - ${student.score}`
```

作用：
- 更方便拼接字符串

---

## 十、解构（了解）

```js
const { name, score } = student;
```

作用：
- 直接从对象取值

---

## 十一、四个核心API总结

- forEach：遍历处理
- filter：筛选保留
- map：映射生成新数组
- reduce：按规则累计

---

## 十二、今日能力提升

已掌握：
- 能处理数组中的对象数据
- 能使用常见数组方法
- 能做小修改并解释结果

当前阶段定位：
- 可以改逻辑
- 可以解释代码
- 但还不适合独立开发复杂功能

