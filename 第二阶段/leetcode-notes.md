# Day 1 LeetCode 刷题笔记

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



---

# Day 2 算法刷题笔记：94 中序遍历 & 226 翻转二叉树

## 今日完成内容

- 复盘题：LeetCode 94 - Binary Tree Inorder Traversal
- 新题：LeetCode 226 - Invert Binary Tree

今日重点：

1. `root` 是整棵树的入口。
2. `root.left` / `root.right` 是左右子树的入口。
3. 二叉树递归题的 base case 通常是遇到空节点 `None`。
4. 遍历题和修改树结构的题，返回值不一样。

---

## LeetCode 94 - Binary Tree Inorder Traversal

### 题目本质

中序遍历一棵二叉树，并返回节点值的访问顺序。

中序遍历顺序：

```text
左子树 -> 当前节点 -> 右子树
```

### 核心代码

```python
class Solution:
    def inorderTraversal(self, root):
        result = []

        def helper(node):
            if node is None:
                return

            helper(node.left)
            result.append(node.val)
            helper(node.right)

        helper(root)
        return result
```

### 关键理解

#### result = []` 为什么放在外层？

`result` 要记录整棵树的遍历结果。

如果把 `result = []` 放进 `helper` 里，每次递归调用都会重新创建一个空数组，之前记录的结果会丢失。

所以：

```text
result 放在 inorderTraversal 里，所有递归过程共享同一个 result。
```

####  `helper(root)` 的作用

`helper(root)` 是启动递归。

`helper` 定义完不会自动执行，必须调用：

```python
helper(root)
```

才会从整棵树的根节点开始遍历。

#### base case

```python
if node is None:
    return
```

含义：

```text
当前节点为空，没有值需要记录，直接返回上一层。
```

这是递归停止条件。

#### 为什么 `append` 在中间？

因为中序遍历是：

```text
左子树 -> 当前节点 -> 右子树
```

所以代码顺序必须是：

```python
helper(node.left)
result.append(node.val)
helper(node.right)
```

如果 `append` 放在最前面，就是前序遍历；如果放在最后，就是后序遍历。

### 复杂度

```text
时间复杂度：O(n)
空间复杂度：O(h)，最坏 O(n)
```

其中：

- `n` 是节点数。
- `h` 是树高。
- 每个节点访问一次，所以时间复杂度是 `O(n)`。
- 递归栈深度和树高有关，所以空间复杂度是 `O(h)`。

---

## LeetCode 226 - Invert Binary Tree

### 题目本质

翻转二叉树，就是对每一个节点交换它的左右子树。

不是交换节点值，而是交换左右子树的引用 / 指针。

### 核心代码

```python
class Solution:
    def invertTree(self, root):
        if root is None:
            return None

        root.left, root.right = root.right, root.left

        self.invertTree(root.left)
        self.invertTree(root.right)

        return root
```

### 关键理解

#### 为什么返回 `root`？

226 不是遍历题，不需要返回数组。

它的目标是修改树本身的结构。

```text
root 是整棵树的入口。
通过 root.left / root.right 可以访问整棵树。
```

所以：

```python
return root
```

表示返回翻转完成后的树的根节点，也就是整棵树的入口。

####  `if root is None: return None`

这是本题的 base case。

它处理两种情况：

1. 整棵树本身为空。
2. 递归过程中走到了某个空子树。

如果没有这个判断，代码会继续访问：

```python
root.left
root.right
```

但 `None` 没有 `.left` 和 `.right`，会报错。

所以：

```text
当前子树为空，没有内容需要翻转，直接返回 None。
```

####  交换的是什么？

```python
root.left, root.right = root.right, root.left
```

这行交换的是：

```text
当前节点的左子树入口和右子树入口。
```

不是交换：

```text
root.left.val 和 root.right.val
```

所以这题是修改树结构，不是修改节点值。

####  为什么交换后还要递归？

只交换当前节点的左右子树还不够。

因为当前节点下面的左右子树内部也可能还有更深的节点。

所以还要继续递归：

```python
self.invertTree(root.left)
self.invertTree(root.right)
```

让每一棵子树内部也完成翻转。

### 复杂度

```text
时间复杂度：O(n)
空间复杂度：O(h)，最坏 O(n)
```

原因：

- 每个节点都要访问并交换一次，所以时间复杂度是 `O(n)`。
- 递归栈深度等于树高，所以空间复杂度是 `O(h)`。
- 如果树退化成链表，`h = n`，最坏空间复杂度是 `O(n)`。

---

## 今日重点疑惑整理

### 疑惑 1：为什么 94 返回数组，226 返回 root？

94 是遍历题，目标是得到节点值的访问顺序，所以返回：

```python
return result
```

226 是修改树结构，目标是翻转整棵树，所以返回：

```python
return root
```

总结：

```text
94：输出遍历结果 -> 返回数组
226：修改树结构 -> 返回树的入口 root
```

---

### 疑惑 2：为什么返回 root 就等于返回整棵树？

因为二叉树是由节点引用连接起来的。

每个节点有：

```text
val：当前节点的值
left：左子树入口
right：右子树入口
```

所以 `root` 不是一个孤立节点，而是整棵树的入口。

拿到 `root`，就可以通过：

```python
root.left
root.right
root.left.left
root.left.right
```

继续访问整棵树。

---

### 疑惑 3：`self.val = val` 里的 self 是什么？

在 `TreeNode` 类里，`self` 表示当前正在创建的这个节点对象本身。

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

含义：

```text
self.val = val      保存当前节点自己的值
self.left = left    保存左子树入口
self.right = right  保存右子树入口
```

注意：

```text
self.val 不是永远代表整棵树的根节点值。
它代表当前这个 TreeNode 节点自己的值。
```

如果当前节点是 `root`，那么 `root.val` 才是根节点值。

---

### 疑惑 4：226 是不是没有 base case？

不是。

226 有 base case：

```python
if root is None:
    return None
```

递归不是靠“还没反转的节点数变成 0”来停止。

真正的停止条件是：

```text
递归走到了空子树 None。
```

比如叶子节点没有左右子树，所以继续调用：

```python
self.invertTree(root.left)
```

可能就是：

```python
self.invertTree(None)
```

这时命中 base case，递归停止并返回上一层。

---

## 今日最终记忆版

### 94

```text
94 的本质是中序遍历。
helper(node) 按照左子树 -> 当前节点 -> 右子树的顺序访问节点。
result 负责收集节点值。
最后返回 result。
```

### 226

```text
226 的本质是翻转每一个节点的左右子树。
root.left 和 root.right 不是普通值，而是左右子树的入口。
每个节点交换一次 left 和 right，然后递归处理左右子树。
最后返回翻转后的 root。
```

---

## 今日容易错的点

1. 把 226 误以为要返回数组。
2. 把 `return root` 理解成只返回一个孤立节点。
3. 把交换左右子树误解成交换左右节点的值。
4. 忘记 `root is None` 就是 226 的 base case。
5. 把“左子树”说成“左子节点”，但递归处理的是整棵子树，不只是一个节点。



---



# Day 3 算法笔记

## 今日完成情况

今天算法部分完成：

1. 复盘题：LeetCode 145 - Binary Tree Postorder Traversal  
   - 已确认掌握，因此今天不再展开。
2. 新题：LeetCode 112 - Path Sum  
   - 已完成代码理解、手写代码、复杂度分析和错因总结。

---

# LeetCode 112 - Path Sum

## 题目本质

题目要求判断：

> 二叉树中是否存在一条从根节点到叶子节点的路径，使得路径上所有节点值之和等于 `targetSum`。

关键点：

- 必须从根节点开始
- 必须到叶子节点结束
- 不能只在中间节点凑到 `targetSum` 就返回 `True`
- 只要存在一条合法路径，就返回 `True`

---

##  重要概念

### 2.1 `root` 的含义

在函数初始调用时：

```text
root 表示整棵二叉树的根节点。
```

在递归过程中：

```text
root 表示当前子树的根节点。
```

所以不能把 `root` 固定理解成“永远是最开始那个节点”。

更准确的理解是：

```text
root 是当前这一次递归正在处理的树 / 子树的入口节点。
```

---

### 2.2 叶子节点的含义

叶子节点指：

```python
root.left is None and root.right is None
```

也就是：

```text
当前节点没有左子树，也没有右子树。
```

本题必须走到叶子节点时，才说明一条从根到叶子的路径完整了。

---

##  函数含义 / 变量含义

### `hasPathSum(root, targetSum)`

返回值是 `bool`：

- `True`：存在一条从根节点到叶子节点的路径，使路径和等于 `targetSum`
- `False`：不存在这样的路径

### `root`

含义：

- 初始调用时：整棵树的根节点
- 递归调用时：当前子树的根节点

### `targetSum`

含义：

- 初始调用时：题目给定的目标路径和
- 递归过程中：当前路径剩余还需要凑出的和

例如目标和是 `22`，路径是：

```text
5 -> 4 -> 11 -> 2
```

递归过程中可以理解为：

```text
到 5：还需要 22
走向 4：还需要 22 - 5 = 17
走向 11：还需要 17 - 4 = 13
走向 2：还需要 13 - 11 = 2
```

到了叶子节点 `2` 时，判断：

```python
targetSum == root.val
```

也就是：

```text
2 == 2
```

成立，因此这条路径合法。

### `remaining`

```python
remaining = targetSum - root.val
```

含义：

```text
经过当前节点后，下一层子树还需要凑出的路径和。
```

---

##  核心判断顺序

这题的递归判断顺序是：

1. 如果 `root is None`，说明当前子树为空，不能构成有效路径，返回 `False`
2. 如果当前节点是叶子节点，就判断 `targetSum == root.val`
3. 如果当前节点不是叶子节点，就计算 `remaining = targetSum - root.val`
4. 分别递归检查左子树和右子树
5. 左右子树只要有一边存在合法路径，就返回 `True`

---

##  最小代码

```python
class Solution:
    def hasPathSum(self, root, targetSum):
        if root is None:
            return False

        if root.left is None and root.right is None:
            return targetSum == root.val

        remaining = targetSum - root.val

        return self.hasPathSum(root.left, remaining) or self.hasPathSum(root.right, remaining)
```

---

##  带类型标注版本

LeetCode 中常见写法：

```python
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if root is None:
            return False

        if root.left is None and root.right is None:
            return targetSum == root.val

        remaining = targetSum - root.val

        return (
            self.hasPathSum(root.left, remaining)
            or self.hasPathSum(root.right, remaining)
        )
```

---

## 关键代码解释

### 7.1 空节点判断

```python
if root is None:
    return False
```

含义：

当前子树为空。空节点不能构成一条从根节点到叶子节点的有效路径，所以返回 `False`。

这是一个 base case，但它是“失败结束”。

---

### 7.2 叶子节点判断

```python
if root.left is None and root.right is None:
    return targetSum == root.val
```

含义：

如果当前节点是叶子节点，就到了完整路径的末尾。

此时需要判断：

```text
当前剩余需要凑出的路径和，是否正好等于当前叶子节点的值。
```

如果相等，说明这条路径合法，返回 `True`。  
如果不相等，说明这条路径不合法，返回 `False`。

---

### 7.3 为什么可以直接 `return targetSum == root.val`

```python
return targetSum == root.val
```

`targetSum == root.val` 是一个比较表达式，结果只有两种：

```python
True
False
```

所以这句等价于：

```python
if targetSum == root.val:
    return True
else:
    return False
```

只是更简洁。

---

### 7.4 计算剩余目标和

```python
remaining = targetSum - root.val
```

含义：

当前节点已经被路径使用了，所以接下来左右子树需要凑出的值要减去当前节点值。

---

### 7.5 递归左右子树

```python
return self.hasPathSum(root.left, remaining) or self.hasPathSum(root.right, remaining)
```

含义：

分别检查左子树和右子树中是否存在合法路径。

这里使用 `or`，因为题目只要求存在一条合法路径。

也就是说：

```text
左子树有合法路径，返回 True；
右子树有合法路径，也返回 True；
两边都没有，才返回 False。
```

不能用 `and`，因为 `and` 表示左右两边都必须存在合法路径，这不符合题意。

---

##  复杂度分析

### 时间复杂度

```text
O(n)
```

其中 `n` 是二叉树的节点总数。

原因：

最坏情况下，递归需要访问整棵树的所有节点。

例如：

- 不存在合法路径
- 合法路径在最后才找到

这些情况下都可能检查所有节点。

---

### 空间复杂度

```text
O(h)
```

其中 `h` 是树高。

原因：

递归栈最多同时保存从根节点到当前节点的一条路径，这条路径长度和树高有关。

如果树是平衡的：

```text
h ≈ log n
空间复杂度 O(log n)
```

如果树退化成链表：

```text
h = n
空间复杂度 O(n)
```

所以标准表达是：

```text
空间复杂度 O(h)，最坏 O(n)。
```

---

## 今日错因总结

今天最容易卡住的是这段代码：

```python
if root.left is None and root.right is None:
    return targetSum == root.val
```

已经理解的点：

- 这题必须走到叶子节点，才能判断路径是否完整
- 不能只在中间节点判断是否凑到 `targetSum`
- 叶子节点是最终判断合法路径的关键位置

一开始没想到的点：

```python
return targetSum == root.val
```

这句可以直接返回布尔值。

原因是：

- 递归过程中，`targetSum` 已经不断减去了前面路径上的节点值
- 到叶子节点时，`targetSum` 表示当前剩余还需要凑出的值
- 如果这个剩余值等于叶子节点值，就说明整条路径和等于原始目标值

---

##  今日需要记住的一句话

```text
Path Sum 不是问“中途有没有凑到 targetSum”，而是问“从根节点到某个叶子节点的完整路径和是否等于 targetSum”。
```

---

##  树题递归通用复盘模板

以后做树题时，可以先问自己：

1. 这个函数返回什么？
2. `root` 在当前递归层代表什么？
3. base case 是什么？
4. 当前节点要做什么？
5. 左子树和右子树分别怎么递归？
6. 左右递归结果之间用 `and` 还是 `or`？
7. 时间复杂度是看访问多少节点，还是看树高？
8. 空间复杂度是否来自递归栈高度？

---

## 今日算法收口

今天算法部分完成：

```text
复盘：LeetCode 145 - Binary Tree Postorder Traversal
新题：LeetCode 112 - Path Sum
```

其中 112 已完成：

- 题目本质理解
- 递归函数含义
- 叶子节点判断
- `return targetSum == root.val` 的理解
- 手写代码
- 时间复杂度 / 空间复杂度分析
- 错因总结



---

# 第二阶段 Day 4 算法笔记

## 今日算法内容

今天完成两部分：

1. 复盘题：LeetCode 125 - Valid Palindrome
2. 新题：LeetCode 20 - Valid Parentheses

今天的重点是区分两类题的本质：

- 125 是“首尾对称问题”，适合双指针。
- 20 是“最近左括号匹配问题”，适合栈。

---

# LeetCode 125 - Valid Palindrome

## 题目本质

这题要求判断字符串是否是回文串，但要忽略：

- 大小写差异
- 非字母数字字符

核心动作是：

> 从左右两端开始，跳过无效字符，只比较有效字符是否相同。

---

## 核心思路：双指针

使用两个指针：

```python
left = 0
right = len(s) - 1
```

含义：

- `left` 从左往右走；
- `right` 从右往左走；
- 每次找到左右两个有效字符进行比较；
- 如果不相等，直接返回 `False`；
- 如果相等，两个指针继续向中间移动。

---

## 多个 while 的逻辑

标准写法中会出现三个 `while`：

```python
while left < right:
    while left < right and not s[left].isalnum():
        left += 1

    while left < right and not s[right].isalnum():
        right -= 1

    if s[left].lower() != s[right].lower():
        return False

    left += 1
    right -= 1
```

三个 `while` 的职责不同：

1. 外层 `while left < right`  
   控制整体双指针过程，只要左右指针还没有相遇，就继续比较。

2. 第一个内层 `while`  
   清理左边连续的无效字符。

3. 第二个内层 `while`  
   清理右边连续的无效字符。

两个内层 `while` 可以理解为：

> 在真正比较之前，先保证 `left` 和 `right` 尽量停在有效字符上。

---

## 最小代码

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left = 0
        right = len(s) - 1

        while left < right:
            while left < right and not s[left].isalnum():
                left += 1

            while left < right and not s[right].isalnum():
                right -= 1

            if s[left].lower() != s[right].lower():
                return False

            left += 1
            right -= 1

        return True
```

---

## 另一种可理解写法

也可以用 `if / elif / else` 写：

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left = 0
        right = len(s) - 1

        while left < right:
            if not s[left].isalnum():
                left += 1
            elif not s[right].isalnum():
                right -= 1
            else:
                if s[left].lower() == s[right].lower():
                    left += 1
                    right -= 1
                else:
                    return False

        return True
```

区别：

- `if / elif / else` 版本：每一轮处理一个当前情况。
- 三个 `while` 版本：先一次性清理左右无效字符，再比较有效字符。

两种都可以，但三个 `while` 版本更接近标准算法写法。

---

## 复杂度

### 时间复杂度：O(n)

虽然有多个 `while`，但每个字符最多被 `left` 或 `right` 访问、跳过或比较一次。

所以时间复杂度是：

```text
O(n)
```

### 空间复杂度：O(1)

只使用了 `left` 和 `right` 两个指针变量，没有创建额外数组、栈、字典等随输入规模增长的数据结构。

所以空间复杂度是：

```text
O(1)
```

---

## 今日复盘错因

这题今天主要错因不是思路，而是：

1. Python `if / else` 的缩进和分行语法还不够熟；
2. 一开始对多个 `while` 的职责不够清楚；
3. 容易把“清理无效字符”和“比较有效字符”混在一起。

---

# LeetCode 20 - Valid Parentheses

## 题目本质

这题要求判断括号字符串是否合法。

合法的关键不是左右对称，而是：

> 当前出现的右括号，必须匹配最近还没有被匹配掉的左括号。

例如：

```text
"({})"  是合法的
"([)]"  是不合法的
```

`"([)]"` 不合法的原因是：  
当遇到 `)` 时，最近的左括号是 `[`，但 `)` 应该匹配 `(`。

---

## 核心数据结构：stack

这题使用栈。

栈的特点是：

```text
后进先出 Last In, First Out
```

这正好对应括号匹配规则：

> 最近出现的左括号，必须最先被右括号匹配掉。

---

## stack 的基本操作

在 Python 中，可以用 list 模拟 stack。

### 入栈：append

```python
stack.append("(")
```

含义：

> 把左括号放入栈顶。

### 出栈：pop

```python
top = stack.pop()
```

含义：

1. 取出 stack 最后一个元素；
2. 同时把它从 stack 中删除。

例如：

```python
stack = ["(", "["]
top = stack.pop()
```

执行后：

```python
top = "["
stack = ["("]
```

---

## 字典 pairs 的 key / value 设计

代码中使用字典：

```python
pairs = {
    ")": "(",
    "}": "{",
    "]": "["
}
```

这里的设计是：

- `key`：当前遇到的右括号；
- `value`：它应该匹配的左括号。

这样当遍历到右括号 `ch` 时，可以直接写：

```python
pairs[ch]
```

查出当前右括号应该匹配哪个左括号。

例如：

```python
ch = ")"
pairs[ch]  # 得到 "("
```

一句话记忆：

> key 是查询入口，value 是查询结果。

---

## 核心判断流程

遍历字符串中的每个字符 `ch`：

1. 如果 `ch` 是左括号：
   - 放入 `stack`。

2. 如果 `ch` 是右括号：
   - 先检查 `stack` 是否为空；
   - 如果为空，说明没有左括号可以匹配它，返回 `False`。

3. 如果 `stack` 不为空：
   - 用 `stack.pop()` 取出最近出现的左括号；
   - 用 `pairs[ch]` 查出当前右括号应该匹配的左括号；
   - 如果两者不相等，返回 `False`。

4. 遍历结束后：
   - 如果 `stack` 为空，说明所有左括号都被匹配完；
   - 如果 `stack` 不为空，说明还有左括号没有闭合。

---

## 最小代码

```python
class Solution:
    def isValid(self, s: str) -> bool:
        pairs = {
            ")": "(",
            "}": "{",
            "]": "["
        }

        stack = []

        for ch in s:
            if ch in "({[":
                stack.append(ch)
            else:
                if not stack:
                    return False

                top = stack.pop()

                if top != pairs[ch]:
                    return False

        return len(stack) == 0
```

最后一行也可以写成：

```python
return not stack
```

两者等价。

---

##  `if not stack` 和 `return not stack`

Python 中：

- 空列表 `[]` 在条件判断里会被当成 `False`；
- 非空列表会被当成 `True`。

所以：

```python
if not stack:
    return False
```

等价于：

```python
if len(stack) == 0:
    return False
```

同理：

```python
return not stack
```

等价于：

```python
return len(stack) == 0
```

当前阶段如果觉得 `len(stack) == 0` 更直观，可以继续写它；熟练之后可以写 `return not stack`。

---

##  `if ch in "({["` 的含义

```python
if ch in "({[":
```

意思是：

> 如果当前字符 `ch` 是 `"("`、`"{"`、`"["` 中的任意一个。

也可以写成：

```python
if ch in ["(", "{", "["]:
```

或者：

```python
if ch in {"(", "{", "["}:
```

如果要判断多个候选值，需要把它们放在一个容器里，比如字符串、列表或集合。

---

##  复杂度

### 时间复杂度：O(n)

因为需要遍历字符串中的每个字符一次。

每个字符最多进行一次：

- `append`
- `pop`
- 字典查询
- 比较

这些操作平均都是 `O(1)`，所以整体时间复杂度是：

```text
O(n)
```

---

### 空间复杂度：O(n)

这题额外使用了 `stack`。

最坏情况下，字符串全是左括号：

```python
s = "((((("
```

所有字符都会进入 `stack`。

如果字符串长度是 `n`，那么 `stack` 最多可能存 `n` 个元素。

所以空间复杂度是：

```text
O(n)
```

注意：`pairs` 字典只有 3 组固定映射，不会随着输入长度增加而变大，所以它是 `O(1)`；但整体空间复杂度要看增长更大的结构，因此最终是 `O(n)`。

---

# 空间复杂度补充理解

##  时间复杂度看什么？

时间复杂度看：

> 随着输入规模 n 增大，代码操作次数如何增长。

---

##  空间复杂度看什么？

空间复杂度看：

> 随着输入规模 n 增大，程序额外使用的内存如何增长。

重点是“额外空间”。

---

##  O(1) 空间

如果只使用固定数量的变量，不管输入多大，额外空间都不明显增长，就是 `O(1)`。

例如 125 Valid Palindrome：

```python
left = 0
right = len(s) - 1
```

只用了两个指针变量，所以空间复杂度是 `O(1)`。

---

##  O(n) 空间

如果创建了一个数组、栈、队列、字典或 set，并且它最多可能存下与输入规模 n 成正比的元素，就是 `O(n)`。

例如 20 Valid Parentheses：

```python
stack = []
```

最坏情况下 stack 可能存下 n 个左括号，所以空间复杂度是 `O(n)`。

---

##  递归空间

递归题即使没有手动创建数组，也会占用系统调用栈。

例如二叉树题中经常写：

```text
空间复杂度 O(h)
```

其中 `h` 是树高。

原因是递归调用最深会走到树的高度。

---

##  判断空间复杂度的简单问题

以后可以这样判断：

1. 我有没有创建新的数组 / 栈 / 队列 / 字典 / set？
2. 这个结构会不会随着输入 n 变大而变大？
3. 最坏情况下最多会存多少个元素？
4. 有没有递归？递归最深是多少层？

---

# 今日算法总结

今天两题的最大收获是区分题目本质：

```text
125 Valid Palindrome：
首尾对称问题 → 双指针

20 Valid Parentheses：
最近左括号匹配问题 → 栈
```

今天的新知识点：

1. 栈的后进先出；
2. `append` 入栈；
3. `pop` 取出并删除栈顶元素；
4. 字典 key/value 的设计；
5. `if not stack` 和 `return not stack`；
6. 空间复杂度如何判断。

今日主要问题：

1. Python 语法缩进和 if/else 分行需要继续熟悉；
2. 多个 while 的分工需要通过复盘巩固；
3. 栈和字典的组合使用是新内容，需要后续多练。
