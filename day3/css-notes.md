# Day 3 CSS 笔记

## 今天学习的主题
- CSS 是什么
- CSS 基本语法
- 标签选择器
- class 选择器
- 盒模型
- `padding`
- `margin`
- `border`
- `display`
- `margin: 0 auto`
- 父元素和子元素该改谁

---

## # 1. CSS 是什么

作用：给 HTML 页面加样式。  
HTML 管结构，CSS 管样式。

比如：
- HTML 决定页面里有什么：图片、标题、段落、按钮、列表
- CSS 决定它们长什么样：颜色、大小、间距、边框、位置

---

## # 2. CSS 基本语法

基本格式：

```css
selector {
    property: value;
}
````

例子：

```css
body {
    background-color: #4a90e2;
}
```

含义：

* `body`：选中 `body` 标签
* `background-color`：背景颜色
* `#4a90e2`：颜色值

---

## # 3. 标签选择器

作用：直接选中某种 HTML 标签。

例如：

```css
body {}
img {}
h1 {}
p {}
a {}
ul {}
li {}
```

含义：

* `body {}`：给整个页面主体加样式
* `img {}`：给图片加样式
* `h1 {}`：给一级标题加样式
* `p {}`：给段落加样式

---

## # 4. class 选择器

作用：选中带有某个 class 的标签。
写法：前面加 `.`

例如：

```css
.card {}
```

对应 HTML：

```html
<div class="card">
```

说明：

* `body` 是标签选择器
* `.card` 是 class 选择器

---

## # 5. 盒模型（最重要）

一个标签可以看成一个盒子。

从里到外顺序是：

**content -> padding -> border -> margin**

### content

内容本身，例如：

* 文字
* 图片
* 按钮里的字

### padding

内容和边框之间的距离
也就是“里面的空白”

### border

边框

### margin

元素和外界之间的距离
也就是“外面的距离”

---

## # 6. 房子比喻理解盒模型

把一个标签想成一栋房子。

### content

房子里的家具、东西

### padding

家具和墙之间的空地

### border

房子的墙

### margin

房子和外面其他房子之间的距离

所以可以记成：

* `padding`：房子里面的空地
* `margin`：房子外面的距离

---

## # 7. padding

作用：控制内容和边框之间的距离。

例如：

```css
.card {
    padding: 20px;
}
```

含义：
卡片里的图片、标题、文字，不要贴着卡片边框。

如果写：

```css
padding-left: 20px;
```

表示：
内容离左边框 20px。

如果写：

* `padding-top`
* `padding-right`
* `padding-bottom`

就是控制内容离上、右、下边框的距离。

---

## # 8. margin

作用：控制元素和外界之间的距离。

例如：

```css
img {
    margin-bottom: 20px;
}
```

含义：
图片和下面的标题之间，留 20px 距离。

如果写：

```css
margin-left: 10px;
```

表示：
这个元素和左边东西之间留 10px 距离。

---

## # 9. padding 和 margin 的核心区别

### padding

控制 **里面**
即：内容和自己边框之间的距离

### margin

控制 **外面**
即：自己和其他元素之间的距离

可以记成一句话：

**padding 管里面，margin 管外面。**

---

## # 10. 什么时候用 padding

当你想让元素“里面更松一点”时，用 `padding`。

例如：

* 按钮里的文字太贴边
* 卡片里的内容太贴边
* 页面里的内容太贴着边缘

例子：

```css
a {
    padding: 10px 16px;
}
```

作用：
让按钮里的文字不要贴着按钮边缘。

---

## # 11. 什么时候用 margin

当你想让元素和别的元素“分开一点”时，用 `margin`。

例如：

* 头像和标题太近
* 两段文字太近
* 按钮和左边的文字太近
* 两个卡片太近

例子：

```css
h1 {
    margin-bottom: 20px;
}
```

作用：
让标题和下面的段落分开一点。

---

## # 12. 父元素和子元素怎么判断

这个今天也很重要。

### 情况 1：整体都有问题

例如：

* `.card` 里的所有内容都太贴左边
* 导航栏里的所有内容都太贴上下边缘

这时优先想：
**改父元素**

而且常常会用：

* `padding`
* `padding-left`
* `padding-top`

---

### 情况 2：只有某一个元素有问题

例如：

* 只有 `h1` 想往右一点
* 只有右边按钮想离左边按钮远一点

这时优先想：
**改子元素**

而且常常会用：

* `margin-left`
* `margin-top`
* `margin-bottom`

---

## # 13. 最实用的判断口诀

### 口诀 1

**里面留白，用 padding**

### 口诀 2

**外面距离，用 margin**

### 口诀 3

**整体太贴边，先想父元素**

### 口诀 4

**单个元素要挪，先想子元素**

---

## # 14. display

作用：决定元素怎么显示。

今天接触到两个：

### `display: block`

让元素更像独立占一行的一块。

例如：

```css
img {
    display: block;
}
```

作用：
让图片更像一个独立块，和下面内容排列更自然。

---

### `display: inline-block`

让元素还能和文字在一行里，但又像一个小盒子。

例如：

```css
a {
    display: inline-block;
}
```

作用：
很适合把链接做成按钮。

可以先记成：

* `block`：像一整块
* `inline-block`：还能在一行里，但更像小盒子

---

## # 15. margin: 0 auto

例如：

```css
.card {
    width: 450px;
    margin: 0 auto;
}
```

作用：让固定宽度盒子水平居中。

原因：

* `width: 450px` 说明盒子宽度固定
* 左右 `margin` 都自动分配
* 所以盒子会居中

可以记成一句话：

**固定宽度盒子 + `margin: 0 auto` = 水平居中**

---

## # 16. 今天代码中的 body

```css
body {
    background-color: #4a90e2;
    padding: 40px;
    font-family: Arial, sans-serif;
}
```

### `background-color`

设置页面背景色

### `padding: 40px`

表示：
`body` 里面的内容，离 `body` 边缘四周各 40px

所以页面里的白色 `.card` 不会贴着边缘。

### `font-family`

设置整页默认字体

---

## # 17. 今天代码中的 .card

```css
.card {
    background-color: white;
    width: 450px;
    padding: 20px;
    border: 1px solid #dddddd;
    margin: 0 auto;
}
```

### `background-color: white`

卡片背景白色

### `width: 450px`

卡片宽度 450 像素

### `padding: 20px`

卡片里的图片、标题、文字不要贴着边框

### `border`

给卡片加一圈浅灰边框

### `margin: 0 auto`

让卡片水平居中

---

## # 18. 今天代码中的 img

```css
img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    margin-bottom: 20px;
}
```

### `width` 和 `height`

控制图片大小

### `border-radius: 50%`

让图片变圆
前提通常是宽高相等

### `display: block`

让图片更像独立的一块

### `margin-bottom: 20px`

让头像和下面标题分开一点

---

## # 19. 今天代码中的 h1

```css
h1 {
    font-size: 36px;
    margin-top: 0;
    margin-bottom: 20px;
    color: rgb(10, 111, 111);
}
```

### `font-size`

标题大小

### `margin-top: 0`

去掉默认上边距

### `margin-bottom: 20px`

让标题和下面段落分开一点

### `color`

设置标题颜色

---

## # 20. 今天代码中的 a

```css
a {
    background-color: #4a90e2;
    color: white;
    text-decoration: none;
    padding: 10px 16px;
    border-radius: 8px;
    margin-left: 10px;
    display: inline-block;
}
```

### `background-color`

按钮背景色

### `color`

按钮文字颜色

### `text-decoration: none`

去掉链接默认下划线

### `padding: 10px 16px`

让按钮内部更松
这是按钮像按钮的关键之一

### `border-radius: 8px`

让按钮边角变圆

### `margin-left: 10px`

让按钮和左边文字拉开距离

### `display: inline-block`

让链接还在一行里，但更像按钮

---

## # 21. 今天代码中的 p

```css
p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 20px;
}
```

### `font-size`

正文大小

### `line-height`

行距，让多行文字更舒服

### `margin-bottom`

让段落和下面内容分开一点

---

## # 22. 今天代码中的 h2

```css
h2 {
    font-size: 22px;
    margin-top: 30px;
    margin-bottom: 15px;
    color: rgb(10, 111, 111);
}
```

### `font-size`

小标题大小

### `margin-top`

和上面内容拉开距离

### `margin-bottom`

和下面列表拉开距离

### `color`

设置小标题颜色

---

## # 23. 今天代码中的 ul 和 li

```css
ul {
    padding-left: 24px;
}

li {
    margin-bottom: 8px;
}
```

### `ul { padding-left: 24px; }`

让整个列表往右一点
因为这是列表内部留白，所以用 `padding-left`

### `li { margin-bottom: 8px; }`

让每个列表项和下面的列表项拉开距离
因为这是元素之间的距离，所以用 `margin-bottom`

---

## # 24. 最容易混淆的地方

### 情况 1：按钮太小

先问：

* 是按钮里面太挤？ -> `padding`
* 是按钮和别的元素太近？ -> `margin`

---

### 情况 2：标题离左边太近

先问：

* 只想让标题自己右移 -> 改 `h1` 的 `margin-left`
* 想让整个卡片里的内容都别贴左边 -> 改 `.card` 的 `padding-left`

---

### 情况 3：body 的 padding 为什么看起来像“外部距离”

因为 `body` 很大，几乎包住整个页面。
但本质上仍然是：

**body 里面的内容离 body 边缘的距离**

所以它仍然是 `padding`。

---

## # 25. 我今天真正会了什么

我已经开始会用：

* `background-color`
* `width`
* `height`
* `color`
* `font-size`
* `padding`
* `margin-bottom`
* `border-radius`

我大概理解但还不稳：

* `margin: 0 auto`
* `display: block`
* `display: inline-block`
* `line-height`
* 父元素和子元素该改谁

---

## # 26. 今天最重要的 5 个结论

1. HTML 管结构，CSS 管样式
2. `padding` 管里面，`margin` 管外面
3. 盒模型顺序是：`content -> padding -> border -> margin`
4. 整体太贴边，先想父元素
5. 单个元素要挪，先想子元素

---

## # 27. 今天一句话总结

**我现在还不能独立设计整页样式，但我已经能理解并修改基础 CSS，并开始分清 `padding` 和 `margin` 的区别。**

```

你下一步可以直接新建一个 `css-notes.md`，把这份贴进去。然后我们再切 Day 3 的算法部分。
```
