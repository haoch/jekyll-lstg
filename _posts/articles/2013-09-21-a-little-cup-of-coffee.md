---
layout: post
title: "A little cup of CoffeeScript"
categories:
- articles
tags: ["coffeescript"]
image:
    url: "http://coffeescript.org/documentation/images/logo.png"
comments: true
---

  本文并非真正的介绍咖啡或者与咖啡有关的任何东西，而是对coffeescript这门语言的设计哲学，特性以及弊端等做一个简短的介绍。
  
## 背景

  一直以来JavaScript认为一个浏览器的脚本语言而已，然后随着互联网的发展，前端技术的成熟，富客户端的应用越来越多，而且node js等server 端javascript框架的出现，使得javascript已然成为一种可应用于任何场景的语言，应用开发中JavaScript的开发比重也越来越大，然而JavaScript作为一门古老的语言，长期以来却未有过较大发展，然后其语法本身较为冗余罗嗦，编程过程中，需要书写大量重复代码，而且部分语法语义模糊怪异，模菱两可，很容易无意之间为代码质量留下隐患，同时JavaScript语法本身类c语言，语义性和可读性方面都较为古老，针对这些问题，更为现代的语言如ruby和python中均给出了更为幽雅的解决方案。因此，如果你希望如python或者ruby般幽雅的写javascript，coffeescript会是一个不错的选择。

----

## Coffee is just JavaScript

Coffee Script 并非是JavaScript的超集或者独立于javascript的语言，“Coffee script is just javascript“，更准确的说是javascript的子集，针对javascript的所有特性，取其精华，去其糟粕，进一步融合ruby和python的优秀语法加以适当改写而成。

其主要**优点**在于:
	
- **Coffee Script 是编译的JavaScript**，coffeescript中可以原生使用任何javascript生态系统中前端framework和npm仓库中的package。
- **引入了诸多Ruby和Python的优秀特性**，其中最大的特点之一是以类Python的强制缩进和空白分割语法，取代了大量花括号“｛｝”的使用，使代码层次更为清晰可读。
- **更少代码量**， 经过coffeescript作者统计，使用coffeescript比使用javascript平均可减少三分之一到二分之一的代码量。
- **Javascript的精简子集**，去除了诸多费解的语法，以类自然语言如is，isnt，off，on等代替。

其主要**缺点**在于:

- **运行较慢**, 因为coffee运行前需要先通过coffee解析器编译成javascript，然后再通过javascript引擎执行，因此一般而言，部署的时候会预先先将coffee script 编译成javascript。当然随着coffee解析器的进一步优化，运行速度的差距必然越来越小。
- **运行时不方便调试**，除非是coffee解析器解析过程中语法错误，coffeescript运行时报错显示的是javascript的错误栈信息，这样可能不易于很快的定位出错误的地方。
 
----

## Coffee 语法


#### 1. **强制缩进与空白分割** 
Coffee 语法的主要特点是利用了仿照Python的强制缩进和空白来做代码块分割。

#### 2. **不使用分号** 
Javascript 中句尾分号可选，但是js引擎运行前是会自动补充上的，在CoffeeScript中强制不允许使用分号。

#### 3. **注释 #** 

类ruby和python的注释“＃”
	
- 单行注释
	
	{% highlight python %}#comments{% endhighlight %}
	
- 多行注释
	
{% highlight python %}
###
comments
###
{% endhighlight %}

#### 4. 变量声明无需var
	
{% highlight python %}name = "hao"{% endhighlight %}

#### 5. 函数声明无需function
	
- 无参数函数
	
{% highlight python %}
name = ->"hao"
name = ()->"hao"
var name = function(){return "hao";}
{% endhighlight %}

- 固定参数函数
	
{% highlight python %}
sum = (a,b)->a+b
var sum = function(a,b){return a+b;}
{% endhighlight %}
	
- 不固定参数函数
	
{% highlight python %}
sum = (a …)-> 
	result = 0
	a.forEach (n)-> result+=n
	result
{% endhighlight %}
	
- 默认值参数函数
	
{% highlight python %}
sum = (a=1,b=2)->a+b
{% endhighlight %}

#### 6. __函数调用__,使用小括号是可选的
	
{% highlight python %}
sum 1,2
sum(1,2)
{% endhighlight %}
	
扩展函数调用方法（至少传入一个参数）：
	
- parents()
- apply()
- call()
	

#### 7. 流程控制(flow control)
	
- __->__: 函数内部上下文，函数域外无效

- __=>__: 本地（local）上下文，可调用函数作用域以外变量
	
- __if … then … else … then …__
	
后缀式条件判断: `it's code if heat < 5`
	
- __!__ & __not__
	
- __unless__ & __if not__
	
- __is__ & __==__
	
- __isnt__ & __!=__
	
- _more …_
	

#### 8. 字符串模板
	
{% highlight python %}
name = "Chen,Hao"
console.log ""
{% endhighlight %}
	

#### 9. 循环和遍历
{% highlight python %}for index in []
	
for name,index in []
	
for key,value of {}
	
__method__ num with num  for num in [] when __condition__
{% endhighlight %}	

#### 10. 数组声明与访问
	
声明
	
{% highlight python %}
arr = [1,2,3,4,5] 
arr = [1
		2
		3
		4
		5
	] 
{% endhighlight %}
	
访问
	
- 单索引访问：`arr[0]`
- 区间访问
	
{% highlight python %}
arr[0..2]
arr[..2]
aarr[..]
{% endhighlight %}
	

#### 11. 特殊操作符
	
- __@__ => *this*,常用于类的实例变量或者方法声明中，作为this 关键字的缩写。
	
- __::__ => *prototype* ，常用语类的静态变量或者方法申明中，作为prototype关键字的缩写。
	
- __?__:  存在操作符，若前面返回对象不为*null*,""或者undefined的条件下，继续执行，否则返回 *undefined* 。
	

#### 12. 类定义与使用

关键字：`class`,`@property`,`@method`
	
