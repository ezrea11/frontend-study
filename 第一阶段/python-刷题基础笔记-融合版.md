# Python 刷题基础笔记

这份笔记整理的是当前刷题阶段最常用、最需要先掌握的 Python 语法与写法，重点是：

- 能看懂 LeetCode 基础模板
- 能理解数组、字符串、字典相关的高频写法
- 能逐步积累最常见的刷题语法

---

## 变量与赋值

```python
x = 3
name = "James"
```

含义：把右边的值赋给左边的变量。

注意：

- `=` 是**赋值**
- `==` 是**判断是否相等**

例如：

```python
x = 3      # 赋值
x == 3     # 判断 x 是否等于 3
```

---

## 常见数据类型

### 整数 `int`

```python
a = 10
b = -2
```

### 字符串 `str`

```python
s = "hello"
```

### 列表 `list`

```python
nums = [1, 2, 3]
names = ["a", "b", "c"]
```

### 字典 `dict`

```python
count = {}
```

含义：

创建一个空字典。

字典可以理解为：

> 用“键 key”找到“值 value”的结构。

例如：

```python
count = {
    "a": 2,
    "b": 1
}
```

意思是：

- `"a"` 这个字符对应次数 `2`
- `"b"` 这个字符对应次数 `1`

---

## 比较运算符

```python
==   # 等于
!=   # 不等于
>    # 大于
<    # 小于
>=   # 大于等于
<=   # 小于等于
```

例子：

```python
x = 5

print(x == 5)   # True
print(x != 5)   # False
print(x > 3)    # True
```

---

## if 判断

```python
x = 3

if x == 3:
    print("yes")
```

含义：如果 `x == 3`，就执行下面缩进的代码。

### if-else

```python
x = 4

if x == 3:
    print("x is 3")
else:
    print("x is not 3")
```

### if-elif-else

```python
x = 2

if x == 1:
    print("one")
elif x == 2:
    print("two")
else:
    print("other")
```

---

## 缩进非常重要

Python 不用大括号 `{}`，而是靠**缩进**表示代码属于哪一块。

正确：

```python
if x == 3:
    print("yes")
```

错误：

```python
if x == 3:
print("yes")
```

---

## for 循环

### 遍历一段数字

```python
for i in range(5):
    print(i)
```

输出：

```python
0
1
2
3
4
```

意思：`i` 从 0 到 4。

### 常见写法：遍历数组下标

```python
nums = [10, 20, 30]

for i in range(len(nums)):
    print(i, nums[i])
```

这里：

- `len(nums)` 表示数组长度
- `range(len(nums))` 表示下标 `0 ~ len(nums)-1`

### 同时遍历下标和元素

```python
for i, num in enumerate(nums):
    print(i, num)
```

理解：

- `i` 是下标
- `num` 是当前元素

例如：

```python
nums = [2, 7, 11]
```

遍历时相当于依次拿到：

- `i = 0, num = 2`
- `i = 1, num = 7`
- `i = 2, num = 11`

这个在刷题里很常用，尤其是既需要元素，又需要下标的时候。

---

## while 循环

```python
i = 0

while i < 5:
    print(i)
    i += 1
```

意思：只要 `i < 5`，就一直循环。

---

## len()

`len()` 用来求长度。

### 列表长度

```python
nums = [1, 2, 3]
print(len(nums))   # 3
```

### 字符串长度

```python
s = "hello"
print(len(s))   # 5
```

---

## 列表下标

```python
nums = [10, 20, 30]
print(nums[0])   # 10
print(nums[1])   # 20
print(nums[2])   # 30
```

注意：Python 下标从 **0** 开始。

---

## 字符串下标

```python
s = "hello"
print(s[0])   # h
print(s[1])   # e
```

---

## 切片

切片表示“取一部分”。

### 字符串切片

```python
s = "flower"
print(s[:2])   # fl
print(s[:4])   # flow
```

含义：从开头取到下标 2 或 4 之前。

### 列表切片

```python
nums = [1, 2, 3, 4]
print(nums[:2])   # [1, 2]
```

---

## 列表常见操作

### 追加元素

```python
res = []
res.append(10)
res.append(20)

print(res)   # [10, 20]
```

### 修改元素

```python
nums = [1, 2, 3]
nums[0] = 100

print(nums)   # [100, 2, 3]
```

这个在刷题里很常见。

例如：

```python
nums[k] = nums[i]
```

意思：把 `nums[i]` 的值放到 `nums[k]` 这个位置。

---

## 函数

### 最简单的函数

```python
def add(a, b):
    return a + b
```

调用：

```python
print(add(2, 3))   # 5
```

### 说明

- `def`：定义函数
- `return`：返回结果

---

## LeetCode 常见函数写法

你在 LeetCode 里常见的是这种：

```python
class Solution:
    def removeElement(self, nums, val):
        return 0
```

先只理解这两层：

### `class Solution:`

LeetCode 规定好的类名，先照着写就行。

### `def removeElement(self, nums, val):`

表示定义一个函数，名字叫 `removeElement`。

其中：

- `nums` 是输入数组
- `val` 是输入数字
- `self` 先不用深究，LeetCode 里先保留

---

## 另一种常见类写法

```python
class Solution(object):
```

理解：

- `class` 表示定义类
- `Solution` 是类名
- `object` 是基类

很多 LeetCode Python 模板里会看到这种写法。

你当前阶段只要记住：

**这也是 LeetCode 常见写法，本质上还是定义一个叫 `Solution` 的类。**

---

## `self` 现在怎么理解

在类里面定义方法时，Python 通常会把当前对象本身作为第一个参数，约定写成 `self`。

例如：

```python
def twoSum(self, nums, target):
```

当前阶段要求：

- 先保留
- 先会用
- 暂时不用深究底层原理

---

## return

`return` 的作用是：**把结果返回出去**。

例如：

```python
def f():
    return 3
```

如果没有 `return`，函数一般不会返回你想要的结果。

---

## 刷题里最常见的几个模板

### 模板 1：遍历数组

```python
for i in range(len(nums)):
    print(nums[i])
```

### 模板 2：判断条件

```python
if nums[i] != val:
    print("valid")
```

### 模板 3：统计个数

```python
count = 0

for i in range(len(nums)):
    if nums[i] > 0:
        count += 1
```

### 模板 4：把有效元素放到前面

```python
k = 0

for i in range(len(nums)):
    if nums[i] != val:
        nums[k] = nums[i]
        k += 1
```

这个就是 27 题的核心模板。

---

## 27 题里每一行是什么意思

```python
class Solution:
    def removeElement(self, nums, val):
        k = 0

        for i in range(len(nums)):
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1

        return k
```

解释：

- `i`：当前正在看哪个位置
- `k`：下一个有效元素应该放到哪里
- `nums[i] != val`：当前元素不是要删除的值
- `nums[k] = nums[i]`：把有效元素放到前面
- `k += 1`：有效元素数量加一
- `return k`：返回有效元素个数

---

## 你现在最容易混淆的点

### `=` 和 `==`

```python
x = 3    # 赋值
x == 3   # 判断是否等于
```

### `==` 和 `!=`

```python
==   # 等于
!=   # 不等于
```

---

## 字典 `dict`

### 最基本的写法

```python
count = {}
```

### 字典在刷题里的作用

字典经常用来做：

- 计数
- 查找某个元素是否出现过
- 统计频率
- 建立映射关系

例如：

- 字符 -> 次数
- 数字 -> 下标

---

## 访问和修改字典中的值

### 访问

```python
count["a"]
```

表示取出字典里 `"a"` 对应的值。

例如：

```python
count = {"a": 2}
print(count["a"])   # 2
```

### 修改

```python
count["a"] += 1
count["a"] -= 1
```

含义：

- 把 `"a"` 对应的值加 1
- 或者减 1

例如：

```python
count = {"a": 2}
count["a"] += 1
print(count)   # {"a": 3}
```

---

## `in` 和 `not in`

### 在字典里判断一个键是否存在

```python
if ch not in count:
    count[ch] = 0
```

含义：

如果字符 `ch` 还没有出现在字典里，就先给它一个初始值 `0`。

### 判断某个键是否已经出现

```python
if need in seen:
```

意思就是：

**检查 `need` 这个键是否已经在字典 `seen` 里。**

注意：

在字典里，`in` 和 `not in` 默认判断的是**键**，不是值。

---

## 遍历字符串中的每个字符

```python
for ch in s:
    print(ch)
```

如果：

```python
s = "abc"
```

那么会依次输出：

```python
a
b
c
```

这里：

- `ch` 表示当前遍历到的字符
- `s` 是字符串

这和遍历数组有点像，但这里拿到的是**字符本身**，不是下标。

---

## 为什么有时更适合 `for ch in s`

因为有些题处理的是：

> 每个字符本身

而不是字符所在的下标位置。

例如 242 题里，我们关心的是：

- 当前字符是谁
- 这个字符出现了几次

所以写：

```python
for ch in s:
```

会比写：

```python
for i in range(len(s)):
```

更直接、更自然。

---

## `count` 不是固定语法

```python
count = {}
```

这里的 `count` 只是变量名，不是 Python 规定必须这么写。

例如也可以写成：

```python
freq = {}
mp = {}
```

只是 `count` 更直观，因为它表示“计数”。

同样：

```python
seen = {}
```

也不是固定语法。

- `seen` 只是变量名
- 通常表示“之前见过的东西”

---

## 字典在计数题里的一个典型理解

可以把它想成“记账”：

- 第一个字符串负责加账
- 第二个字符串负责减账

如果中途出现两种情况，就直接返回 `False`：

### 情况 1：出现了不在字典里的字符

```python
if ch not in count:
    return False
```

说明两个字符串的字符种类不同。

### 情况 2：某个字符减完后变成负数

```python
if count[ch] < 0:
    return False
```

说明这个字符在第二个字符串中出现次数更多，数量不匹配。

---

## 字典在查找题里的一个典型理解

有些题重点不是计数，而是：

**快速查找某个数字之前是否出现过。**

例如：

```python
seen = {}
```

这里可以存：

```python
数字 -> 下标
```

比如：

```python
seen[2] = 0
seen[7] = 1
```

表示：

- 数字 2 出现在下标 0
- 数字 7 出现在下标 1

---

## `seen[num] = i`

```python
seen[num] = i
```

含义：

- 把当前数字 `num` 作为键
- 把当前下标 `i` 作为值

这个写法在需要返回下标的题里很常见。

---

## `need = target - num`

```python
need = target - num
```

理解：

- `target` 已知
- 当前 `num` 已知
- 所以可以立刻算出：还差哪个数

这一步很关键。

不是“去找任意另一个数”，而是：

**我当前最需要的数是谁。**

---

## 先查再存

有些哈希表题最关键的流程是：

```python
if need in seen:
    return [seen[need], i]

seen[num] = i
```

理解：

1. 先算出 `need`
2. 先查 `need` 之前有没有出现过
3. 如果出现过，直接返回答案
4. 如果没出现过，再把当前数字和下标存进去

为什么不能先存再查？

因为那样当前元素可能会和自己配对。

所以要记住：

**先查，再存。**

---

## 列表返回值

```python
return [seen[need], i]
```

理解：

- 方括号 `[]` 表示列表
- 这里返回的是两个下标组成的列表

例如：

```python
[0, 1]
```

表示答案在下标 0 和下标 1。

注意：

有些题返回的是值，有些题返回的是下标，必须看题目要求。

---

## 整数除法 `//`

在二分查找里经常看到：

```python
mid = (left + right) // 2
```

理解：

- `//` 表示整除
- 结果只保留整数部分

例如：

```python
5 // 2 = 2
7 // 2 = 3
```

这个在二分题里很常见。

---

## 一个常见环境差异

有时你会看到这种写法：

```python
def mySqrt(self, x: int) -> int:
```

这里的：

- `x: int`
- `-> int`

是 **Python 3 的类型注解写法**。

但有些 OJ 平台如果语言选的是 `Python`，实际可能是 Python 2，就会报语法错误。

所以如果平台环境不确定，先用更稳的写法：

```python
def mySqrt(self, x):
```

---

## 最值得补进脑子的 Python 小点

1. `{}` 可以创建空字典  
2. 字典常用于记录出现次数，也常用于快速查找  
3. `if ch not in count:` 用来判断键是否存在  
4. `if need in seen:` 用来检查某个键之前是否已经出现过  
5. `for ch in s:` 是直接遍历字符串中的字符  
6. `for i, num in enumerate(nums):` 是同时遍历下标和元素  
7. `count[ch] += 1` 和 `count[ch] -= 1` 是常见计数写法  
8. `seen[num] = i` 是建立“数字 -> 下标”的映射  
9. `//` 表示整除  
10. `return [a, b]` 表示返回一个列表

---

## 当前阶段最该会的，不是很多，而是这些

现在不要求你立刻非常熟练地掌握很多 Python 语法细节。

当前更重要的是：

- 能看懂最小代码
- 能知道每一行在干什么
- 能慢慢积累刷题中最高频的写法
- 能区分“计数型字典”和“查找型字典”

---

## 当前阶段总结

你现在已经开始从“几乎不会 Python 刷题语法”，进入到：

- 能看懂 LeetCode 最小函数模板
- 能理解 `dict` / 哈希表的基本作用
- 能理解 `enumerate(nums)` 的用途
- 能看懂 `if need in seen`
- 能理解 `seen[num] = i`
- 能理解 `return [seen[need], i]`
- 能看懂二分里的 `//`

这已经是很有效的一步。

---

# Day 8 Python 刷题语法笔记

## 1. `for num in nums`

```python
nums = [1, 2, 3]
for num in nums:
    print(num)
```

含义：

- 从 `nums` 中一个一个取元素
- 每次当前取到的元素，暂时叫做 `num`
- `num` 不是提前定义好的，而是 `for` 循环遍历时自动赋值的变量名

适用场景：

- 只关心元素本身
- 不关心下标

例如 `Contains Duplicate`：

```python
for num in nums:
    if num in seen:
        return True
    seen.add(num)
```

---

## 2. `for i, num in enumerate(nums)`

```python
nums = [10, 20, 30]
for i, num in enumerate(nums):
    print(i, num)
```

含义：

- `i` 是下标
- `num` 是当前元素

适用场景：

- 既关心元素本身
- 也关心它的位置

例如 `Two Sum`：

```python
for i, num in enumerate(nums):
    need = target - num
    if need in seen:
        return [seen[need], i]
    seen[num] = i
```

---

## 3. `for i in range(len(nums))`

```python
nums = [10, 20, 30]
for i in range(len(nums)):
    print(i, nums[i])
```

含义：

- `i` 会依次取数组下标
- 再通过 `nums[i]` 拿到对应元素

适用场景：

- 必须通过下标操作数组
- 需要看前后位置关系

---

## 4. `dict` 和 `set` 的区别

### `dict`

```python
seen = {}
seen[2] = 0
seen[7] = 1
```

含义：

- 存的是键值对
- 常见形式是：`值 -> 信息`
- 在算法题里常用来存：`数字 -> 下标`

适用场景：

- 不只是判断元素是否出现过
- 还想知道它对应的额外信息

例如 `Two Sum`：

```python
seen[num] = i
```

---

### `set`

```python
seen = set()
seen.add(19)
seen.add(82)
```

含义：

- 只存值本身
- 不存额外信息
- 更适合判断“这个值以前出现过没有”

适用场景：

- 只需要查重
- 不需要下标、次数等附加信息

例如 `Happy Number` 和 `Contains Duplicate`

---

## 5. 为什么空字典是 `{}`，空集合是 `set()``

### 空字典

```python
d = {}
```

### 空集合

```python
s = set()
```

注意：

- Python 中 `{}` 默认是空字典，不是空集合
- 所以不能用 `set = {}` 创建空集合

### 非空集合

```python
s = {1, 2, 3}
```

### 非空字典

```python
d = {1: "a", 2: "b"}
```

区分方法：

- 有冒号 `:` 的通常是字典
- 没有冒号、只有值的是集合
- 但空的大括号 `{}` 默认是字典

---

## 6. `in`

```python
if num in seen:
    ...
```

含义：

- 判断某个值是否已经存在于容器中

常见用法：

### 字典中

```python
if need in seen:
```

表示判断 `need` 是否是字典中的键

### 集合中

```python
if n in seen:
```

表示判断 `n` 是否已经出现在集合中

---

## 7. `set.add(x)`

```python
seen.add(n)
```

含义：

- 把 `n` 加入集合 `seen`
- 在算法题里可以理解成：把当前值记录进“已出现过的名单”

例如：

```python
seen = set()
seen.add(19)
```

执行后：

```python
seen = {19}
```

---

## 8. `% 10` 和 `// 10`

这两个在拆数字题里非常常见。

### `% 10`

```python
digit = n % 10
```

含义：

- 取出当前数字的最后一位

例如：

```python
82 % 10 = 2
```

---

### `// 10`

```python
n = n // 10
```

含义：

- 去掉当前数字的最后一位
- `//` 表示整除，只保留整数部分

例如：

```python
82 // 10 = 8
8 // 10 = 0
```

---

### 在一起看

```python
while n > 0:
    digit = n % 10
    n = n // 10
```

含义：

- 每次取最后一位
- 再删掉最后一位
- 直到 `n == 0`，说明所有位都取完了

---

## 9. `while n > 0`

```python
while n > 0:
    ...
```

含义：

- 只要 `n` 还没有被拆空，就继续循环
- 常用于逐位处理整数

在 `Happy Number` 中：

```python
while n > 0:
    digit = n % 10
    total += digit * digit
    n //= 10
```

表示：

- 逐位取数字
- 每位平方后累加
- 直到数字被拆完

---

## 10. `class Solution(object):`

```python
class Solution(object):
```

含义：

- 这是 LeetCode 常见模板写法
- 表示下面的函数写在 `Solution` 这个类里面

当前阶段可先这样理解：

- 这是平台固定模板
- 不需要现在深挖类本身
- 先会在模板下写题即可

---

## 11. `self.get_next(n)`

```python
n = self.get_next(n)
```

当前阶段先这样理解：

- 本质上就是调用 `get_next` 这个辅助函数
- 把 `n` 传进去
- 再把返回结果重新赋值给 `n`

在 `Happy Number` 中：

- `isHappy` 负责整体流程
- `get_next` 负责算“下一步数字”

所以这句可以直接翻译成：

> 把当前数字 `n` 按快乐数规则处理一下，并把结果更新给 `n`

---

## 12. 刷题阶段当前最常用的遍历模板

### 只看元素

```python
for num in nums:
    ...
```

### 同时看下标和元素

```python
for i, num in enumerate(nums):
    ...
```

### 按下标访问

```python
for i in range(len(nums)):
    ...
```

当前阶段先把这三个用熟即可。

---

## 13. 今日最重要的 Python 语法收获

1. `for num in nums` 表示依次遍历数组中的元素
2. `dict` 更适合存“值 -> 额外信息”
3. `set` 更适合只做查重
4. 空字典是 `{}`，空集合必须是 `set()`
5. `% 10` 取最后一位，`// 10` 去掉最后一位
6. `while n > 0` 常用于逐位处理整数
7. `self.get_next(n)` 当前可先理解为调用辅助函数
8. LeetCode 的 `class Solution(object):` 目前先按固定模板使用
