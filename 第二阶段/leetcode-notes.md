Day 1 LeetCode 刷题笔记

## 今日算法任务

- 复盘题：LeetCode 104 - Maximum Depth of Binary Tree
- 新题：LeetCode 100 - Same Tree

今天的重点不是追求刷题数量，而是把二叉树递归的基本框架讲清楚：

1. 递归函数返回什么
2. base case 是什么
3. 为什么要继续递归左右子树
4. 时间复杂度和空间复杂度如何判断
5. 今日错因是什么

---

# 一、LeetCode 104 - Maximum Depth of Binary Tree

## 题目本质

这道题要求的是：

> 求一棵二叉树从根节点到最深叶子节点的最大深度。

换句话说，就是看这棵树最长的一条路径上有多少个节点。

---

## 函数含义

```python
maxDepth(node)
```

这个函数的含义是：

> 返回以当前 `node` 为根节点的这棵树的最大深度。

注意：这里的深度包括当前 `node` 自己。

例如只有一个节点时：

```text
1
```

最大深度是 `1`，不是 `0`。

---

## Base Case

```python
if node is None:
    return 0
```

这是递归停止条件，也就是 base case。

含义是：

> 如果当前节点是空节点，说明这里没有树，所以深度为 0。

空节点不贡献深度，因此返回 `0`。

---

##  递归关系

对于一个非空节点：

```python
leftDepth = maxDepth(node.left)
rightDepth = maxDepth(node.right)
```

分别求出左子树和右子树的最大深度。

然后：

```python
return max(leftDepth, rightDepth) + 1
```

原因是：

> 当前树的最大深度 = 左右子树中更深的那一边 + 当前节点自己这一层。

所以要 `+ 1`。

---

## 最小代码

```python
class Solution:
    def maxDepth(self, root):
        if root is None:
            return 0

        leftDepth = self.maxDepth(root.left)
        rightDepth = self.maxDepth(root.right)

        return max(leftDepth, rightDepth) + 1
```

---

##  时间复杂度

时间复杂度：

```text
O(n)
```

原因：

> 最坏情况下，需要访问树中的每一个节点一次。

其中 `n` 是树中节点的数量。

---

## 空间复杂度

空间复杂度：

```text
O(h)
```

原因：

> 这是递归题，额外空间主要来自递归调用栈。递归最深会走到树的高度 `h`。

其中 `h` 是树的高度。

补充：

- 如果树比较平衡，`h ≈ log n`
- 如果树退化成链表，`h ≈ n`

所以最坏情况下空间复杂度可以是：

```text
O(n)
```

---

## 104 今日理解定稿

可以这样复述：

> `maxDepth(node)` 返回以当前节点为根的树的最大深度。  
> 如果当前节点为空，返回 0。  
> 如果当前节点不为空，就分别求左子树和右子树的最大深度。  
> 当前树的最大深度等于左右子树较大值加上当前节点自己，所以是 `max(leftDepth, rightDepth) + 1`。

---

# 二、LeetCode 100 - Same Tree

##  题目本质

这道题要求判断两棵二叉树是否完全相同。

完全相同包括两层意思：

1. 树的结构相同
2. 对应位置节点的值相同

只要结构不同，或者某个对应节点的值不同，两棵树就不相同。

---

## 函数含义

```python
isSameTree(p, q)
```

这个函数的含义是：

> 返回以 `p` 和 `q` 为根节点的两棵子树是否完全相同。

返回值是：

```text
True 或 False
```

其中：

- `p` 是第一棵树当前正在比较的节点
- `q` 是第二棵树当前正在比较的节点

一开始，`p` 和 `q` 是两棵树的根节点。  
递归过程中，它们会变成各自的左子树节点或右子树节点。

---

## Base Case / 直接判断情况

### 情况 1：两个节点都为空

```python
if p is None and q is None:
    return True
```

含义：

> 当前这个位置两棵树都没有节点，说明当前位置结构相同。

所以返回 `True`。

---

### 情况 2：一个为空，一个不为空

```python
if p is None or q is None:
    return False
```

含义：

> 一个位置有节点，另一个位置没有节点，说明结构不同。

所以返回 `False`。

---

### 情况 3：两个节点都不为空，但值不同

```python
if p.val != q.val:
    return False
```

含义：

> 当前两个节点虽然都存在，但值不同，所以两棵树一定不同。

所以返回 `False`。

---

## 递归关系

如果前三种情况都没有返回，说明：

1. `p` 和 `q` 都不是空节点
2. `p.val == q.val`

但这还不够。

还必须继续比较：

```python
self.isSameTree(p.left, q.left)
```

以及：

```python
self.isSameTree(p.right, q.right)
```

也就是：

- `p` 的左子树和 `q` 的左子树是否相同
- `p` 的右子树和 `q` 的右子树是否相同

最后：

```python
return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

这里使用 `and` 的原因是：

> 左子树和右子树必须都相同，整棵树才相同。

如果左边相同但右边不同：

```text
True and False = False
```

整棵树仍然不同。

---

## 最小代码

```python
class Solution:
    def isSameTree(self, p, q):
        if p is None and q is None:
            return True

        if p is None or q is None:
            return False

        if p.val != q.val:
            return False

        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

---

## 今日错因 1：`p.value` 应该写成 `p.val`

一开始写成了：

```python
if p.value != q.value:
    return False
```

这是错误的。

原因是 LeetCode 给出的 `TreeNode` 定义中，节点值字段叫：

```python
self.val
```

不是：

```python
self.value
```

所以应该写：

```python
if p.val != q.val:
    return False
```

---

##  今日错因 2：不能直接用 `p == q`

不能写成：

```python
if p != q:
    return False
```

原因是：

> 在 Python 中，如果类没有自定义 `__eq__`，`p == q` 通常比较的是两个变量是否指向同一个对象，而不是比较两个节点的值和子树结构是否相同。

例如：

```python
p = TreeNode(1)
q = TreeNode(1)
```

虽然 `p.val == q.val` 是 `True`，但 `p == q` 通常是 `False`。

因为它们是两个不同的节点对象。

只有这种情况：

```python
q = p
```

`p == q` 才通常是 `True`，因为它们指向同一个对象。

所以在 Same Tree 这道题中，必须手动比较：

1. 当前节点是否都为空
2. 是否一个为空一个不为空
3. 当前节点值是否相同
4. 左子树是否相同
5. 右子树是否相同

---

## 时间复杂度

时间复杂度：

```text
O(n)
```

原因：

> 最坏情况下，需要比较两棵树中的每一个对应节点。

其中 `n` 是节点数量。

---

## 空间复杂度

空间复杂度：

```text
O(h)
```

原因：

> 这是递归题，额外空间主要来自递归调用栈。递归最深取决于树的高度 `h`。

补充：

- 如果树比较平衡，`h ≈ log n`
- 如果树退化成链表，`h ≈ n`

所以最坏情况下空间复杂度可以是：

```text
O(n)
```

---

## 100 今日理解定稿

可以这样复述：

> `isSameTree(p, q)` 返回以 `p` 和 `q` 为根的两棵子树是否完全相同。  
> 如果两个节点都为空，说明当前位置结构相同，返回 `True`。  
> 如果一个为空一个不为空，说明结构不同，返回 `False`。  
> 如果两个节点都存在但值不同，返回 `False`。  
> 如果当前节点值相同，还要递归比较左子树和右子树。  
> 只有左子树和右子树都相同，整棵树才相同，所以最后用 `and`。

---

# 三、Base Case、时间复杂度、空间复杂度总结

## Base Case 是什么

Base case 可以理解成：

> 递归停止条件 / 最基本情况。

它的作用是：

> 告诉递归什么时候可以停止，并直接返回结果。

如果没有 base case，递归会一直调用自己，最终报错。

---

## 时间复杂度怎么看

时间复杂度看：

> 随着输入规模变大，代码大概要执行多少步。

在树题中，最常用的问题是：

> 这个算法最多会访问多少个节点？

如果每个节点最多访问一次，通常就是：

```text
O(n)
```

---

## 空间复杂度怎么看

空间复杂度看：

> 代码运行时额外使用了多少空间。

在递归题中，最主要的额外空间是：

> 递归调用栈。

树递归题通常看树高：

```text
O(h)
```

如果树退化成链表，最坏情况下是：

```text
O(n)
```

---

# 四、今日算法总复述

今天算法主要围绕二叉树递归展开。

104 的核心是：

> 当前树的最大深度 = 左右子树最大深度的较大值 + 当前节点自己。

100 的核心是：

> 判断两棵树是否相同，需要同时比较结构和值。  
> 当前节点相同还不够，必须继续递归比较左右子树。  
> 左右子树都相同，整棵树才相同。

这两题共同训练的是：

1. 明确递归函数返回什么
2. 找到 base case
3. 写出递归关系
4. 理解递归返回值如何一层层传回去
5. 用时间复杂度和空间复杂度描述算法成本
