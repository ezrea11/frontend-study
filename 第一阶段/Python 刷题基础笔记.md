# Python 刷题基础笔记

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

```
x = 3      # 赋值
x == 3     # 判断 x 是否等于 3
```

------

##  常见数据类型

### 整数 `int`

```
a = 10
b = -2
```

### 字符串 `str`

```
s = "hello"
```

### 列表 `list`

```
nums = [1, 2, 3]
names = ["a", "b", "c"]
```

------

## 比较运算符

```
==   # 等于
!=   # 不等于
>    # 大于
<    # 小于
>=   # 大于等于
<=   # 小于等于
```

例子：

```
x = 5

print(x == 5)   # True
print(x != 5)   # False
print(x > 3)    # True
```

------

## if 判断

```
x = 3

if x == 3:
    print("yes")
```

含义：如果 `x == 3`，就执行下面缩进的代码。

### if-else

```
x = 4

if x == 3:
    print("x is 3")
else:
    print("x is not 3")
```

### if-elif-else

```
x = 2

if x == 1:
    print("one")
elif x == 2:
    print("two")
else:
    print("other")
```

------

## 缩进非常重要

Python 不用大括号 `{}`，而是靠**缩进**表示代码属于哪一块。

正确：

```
if x == 3:
    print("yes")
```

错误：

```
if x == 3:
print("yes")
```

------

## for 循环

### 遍历一段数字

```
for i in range(5):
    print(i)
```

输出：

```
0
1
2
3
4
```

意思：`i` 从 0 到 4。

### 常见写法：遍历数组下标

```
nums = [10, 20, 30]

for i in range(len(nums)):
    print(i, nums[i])
```

这里：

- `len(nums)` 表示数组长度
- `range(len(nums))` 表示下标 `0 ~ len(nums)-1`

------

## while 循环

```
i = 0

while i < 5:
    print(i)
    i += 1
```

意思：只要 `i < 5`，就一直循环。

------

##  len()

`len()` 用来求长度。

### 列表长度

```
nums = [1, 2, 3]
print(len(nums))   # 3
```

### 字符串长度

```
s = "hello"
print(len(s))   # 5
```

------

## 列表下标

```
nums = [10, 20, 30]
print(nums[0])   # 10
print(nums[1])   # 20
print(nums[2])   # 30
```

注意：Python 下标从 **0** 开始。

------

## 字符串下标

```
s = "hello"
print(s[0])   # h
print(s[1])   # e
```

------

## 切片

切片表示“取一部分”。

### 字符串切片

```
s = "flower"
print(s[:2])   # fl
print(s[:4])   # flow
```

含义：从开头取到下标 2 或 4 之前。

### 列表切片

```
nums = [1, 2, 3, 4]
print(nums[:2])   # [1, 2]
```

------

## 列表常见操作

### 追加元素

```
res = []
res.append(10)
res.append(20)

print(res)   # [10, 20]
```

### 修改元素

```
nums = [1, 2, 3]
nums[0] = 100

print(nums)   # [100, 2, 3]
```

这个在刷题里很常见。

例如：

```
nums[k] = nums[i]
```

意思：把 `nums[i]` 的值放到 `nums[k]` 这个位置。

------

## 函数

### 最简单的函数

```
def add(a, b):
    return a + b
```

调用：

```
print(add(2, 3))   # 5
```

### 说明

- `def`：定义函数
- `return`：返回结果

------

## LeetCode 常见函数写法

你在 LeetCode 里常见的是这种：

```
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

------

## return

`return` 的作用是：**把结果返回出去**。

例如：

```
def f():
    return 3
```

如果没有 `return`，函数一般不会返回你想要的结果。

------

## 刷题里最常见的几个模板

### 模板 1：遍历数组

```
for i in range(len(nums)):
    print(nums[i])
```

### 模板 2：判断条件

```
if nums[i] != val:
    print("valid")
```

### 模板 3：统计个数

```
count = 0

for i in range(len(nums)):
    if nums[i] > 0:
        count += 1
```

### 模板 4：把有效元素放到前面

```
k = 0

for i in range(len(nums)):
    if nums[i] != val:
        nums[k] = nums[i]
        k += 1
```

这个就是 27 题的核心模板。

------

## 27 题里每一行是什么意思

```
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

------

## 你现在最容易混淆的点

### `=` 和 `==`

```
x = 3    # 赋值
x == 3   # 判断是否等于
```

### `==` 和 `!=`

```
==   # 等于
!=   # 不等于
```


------

## 字典 `dict`

### 最基本的写法

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

------

## 字典在刷题里的作用

在今天的 242 题中，字典的作用是：

> 记录每个字符出现的次数。

所以字典经常用来做：

- 计数
- 查找某个元素是否出现过
- 统计频率

------

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

------

##  `not in`

### 在字典里判断一个键是否存在

```python
if ch not in count:
    count[ch] = 0
```

含义：

如果字符 `ch` 还没有出现在字典里，就先给它一个初始值 `0`。

这里的：

```python
ch not in count
```

可以理解成：

> `ch` 这个键不在字典 `count` 里。

------

##  遍历字符串中的每个字符

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

------

##  为什么有时更适合 `for ch in s`

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

------

##  `count` 不是固定语法

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

------

## 242 题里最重要的新理解

这题可以把它想成“记账”：

- 第一个字符串 `s` 负责加账
- 第二个字符串 `t` 负责减账

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

说明这个字符在 `t` 中出现次数比在 `s` 中更多，字符数量不匹配。

这是我今天很容易漏掉、但必须记住的判断点。

------

## 今日最值得补进脑子的 Python 小点

1. `{}` 可以创建空字典  
2. 字典常用于记录出现次数  
3. `if ch not in count:` 用来判断键是否存在  
4. `for ch in s:` 是直接遍历字符串中的字符  
5. `count[ch] += 1` 和 `count[ch] -= 1` 是常见计数写法



---

# Day 10 Python 重点语法笔记

## 1. `str.isalnum()`

### 作用

判断一个字符是否是：

- 字母
- 或数字

如果是，返回 `True`；否则返回 `False`。

---

### 例子

```python
"a".isalnum()   # True
"7".isalnum()   # True
" ".isalnum()   # False
",".isalnum()   # False
```

---

### 今天在题里的作用

在 125 题里，它用来判断当前字符是不是题目允许参与比较的字符。

例如：

```python
if not s[left].isalnum():
    left += 1
```

意思就是：

**如果左边这个字符不是字母或数字，就跳过它。**

---

## 2. `str.lower()`

### 作用

把字符串变成小写。

---

### 例子

```python
"A".lower()   # "a"
"B".lower()   # "b"
```

---

### 今天在题里的作用

在 125 题里，题目要求忽略大小写，所以比较前要统一成小写。

```python
if s[left].lower() == s[right].lower():
```

---

## 3. `if / elif / else`

### 作用

表示一整组“只选一个分支”的条件判断结构。

---

### 基本结构

```python
if 条件1:
    ...
elif 条件2:
    ...
else:
    ...
```

含义是：

1. 先判断 `if`
2. 如果 `if` 成立，后面的 `elif` 和 `else` 都不执行
3. 如果 `if` 不成立，再判断 `elif`
4. 如果前面都不成立，最后执行 `else`

---

### 和多个并列 `if` 的区别

#### 并列 `if`

```python
if 条件1:
    ...

if 条件2:
    ...
```

表示：

**第一个判断执行完后，第二个还会继续判断。**

---

#### `if / elif / else`

表示：

**这一整组里，只会执行一个分支。**

---

### 今天在题里的作用

在 125 题里：

```python
if not s[left].isalnum():
    left += 1
elif not s[right].isalnum():
    right -= 1
else:
    ...
```

含义是：

- 左边不合法，就只处理左边
- 否则右边不合法，就只处理右边
- 否则才去比较

这样才能保证：  
**每一轮循环只处理一种情况。**

---

## 4. `while left < right`

### 作用

当条件成立时，持续循环。

---

### 例子

```python
left = 0
right = 5

while left < right:
    left += 1
    right -= 1
```

---

### 今天在题里的作用

#### 在 125 题里

表示只要左右指针还没有交错，就继续比较。

#### 在 541 题里

表示只要当前这一小段的左右边界还没碰到，就继续交换字符。

---

## 5. `list(s)`

### 作用

把字符串拆成字符列表。

---

### 例子

```python
s = "abcd"
chars = list(s)
print(chars)
```

输出：

```python
['a', 'b', 'c', 'd']
```

---

### 为什么要这样做

因为 Python 里的字符串 `str` 不能直接修改某个位置的字符。

比如下面这种写法不行：

```python
s[0] = "z"
```

但列表可以修改：

```python
chars[0] = "z"
```

---

### 今天在题里的作用

541 题要交换字符位置，所以必须先写：

```python
chars = list(s)
```

把字符串变成可以修改的列表。

---

## 6. 字符交换写法

### 最简洁写法

```python
chars[left], chars[right] = chars[right], chars[left]
```

---

### 含义

把左右两个位置的字符直接交换。

---

### 例子

```python
chars = ['a', 'b', 'c', 'd']
left = 0
right = 3

chars[left], chars[right] = chars[right], chars[left]
print(chars)
```

输出：

```python
['d', 'b', 'c', 'a']
```

---

### 今天在题里的作用

在 541 题中，用它来反转当前块里的前 `k` 个字符。

---

## 7. `"".join(chars)`

### 作用

把字符串列表重新拼接成一个完整字符串。

---

### 例子

```python
chars = ['b', 'a', 'c', 'd']
result = "".join(chars)
print(result)
```

输出：

```python
bacd
```

---

### 为什么前面是 `""`

因为 `join` 的意思其实是：

**用某个“连接符”把列表里的字符串连起来。**

#### 不加任何连接符

```python
"".join(['a', 'b', 'c'])
# "abc"
```

#### 用 `-` 连接

```python
"-".join(['a', 'b', 'c'])
# "a-b-c"
```

---

### 今天在题里的作用

541 题最后得到的是字符列表 `chars`，  
但题目要求返回字符串，所以必须写：

```python
return "".join(chars)
```

---

## 8. `range(start, end, step)`

### 作用

生成一组按固定步长变化的数字。

---

### 例子

```python
range(0, 10, 2)
```

表示：

- 从 `0` 开始
- 每次加 `2`
- 一直取到小于 `10` 为止

得到的数字是：

```python
0, 2, 4, 6, 8
```

注意：**不会取到 `10` 本身。**

---

### 今天在题里的作用

541 题中：

```python
for start in range(0, len(chars), 2 * k):
```

表示：

- 从下标 `0` 开始
- 每次跳 `2 * k`
- 逐个拿到每一个块的起点 `start`

所以它不是逐个字符扫描，  
而是在逐个找到“每一块的开头”。

---

## 9. `min(a, b)`

### 作用

返回两个值中较小的那个。

---

### 例子

```python
min(3, 5)   # 3
min(8, 2)   # 2
```

---

### 今天在题里的作用

在 541 题里：

```python
right = min(start + k - 1, len(chars) - 1)
```

含义是：

- 正常情况下，右边界取 `start + k - 1`
- 如果这个位置已经超过最后一个下标，就退到 `len(chars) - 1`

这样可以避免数组越界。

---

## 10. `len(chars)` 和 `len(chars) - 1` 的区别

### `len(chars)`

表示长度。

例如：

```python
chars = ['a', 'b', 'c', 'd']
len(chars)   # 4
```

---

### `len(chars) - 1`

表示最后一个合法下标。

例如：

```python
chars[3]   # 最后一个元素
```

因为下标从 `0` 开始，所以长度是 `4` 时，最后一个下标是 `3`。

---

### 今天在题里的区别

#### `range(0, len(chars), 2 * k)`

这里的 `len(chars)` 是上限，不会被真正取到。

#### `min(..., len(chars) - 1)`

这里的 `len(chars) - 1` 是最后一个可以访问的位置。

---

## 今日最重要的 4 个记忆点

1. **`isalnum()`**：判断是不是字母或数字  
2. **`lower()`**：统一大小写  
3. **`list(s)`**：把字符串变成可修改的字符列表  
4. **`"".join(chars)`**：把字符列表重新拼回字符串
