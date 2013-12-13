---
layout: post
title: "Java String 内存模型"
categories:
- articles
tags: ["java","String"]
image:
    feature: "java.gif"
comments: true
---

String 对象与引用
----------------
- new： 先创建创建对象，然后在string pool中查找是否值相同的对象，否则创建对应的string对象
- ""：直接查找，若有直接返回引用，否则创建并返回引用
- intern()：始终返回string object本身的引用

String 连接
-----------
- 常量＋常量，内存中查找是否存在值相等的对象，存在则直接返回引用，否则创建新的对象
- 常量＋变量，创建新的字符对象存储结果，并返回引用

如何正确使用String?
-----------------
1. 不要使用new （new 每次都会创建一个新的对象,而不会寻找值相同的引用）。

2. 使用StringBuffer来做连接操作
	
	String 是immutable类，做连接操作时，都会创建临时的对象来保存中间结果，而StringBuffer 是mutable class, 不需要临时创建对象来保存结果，从而提高性能
3. StringBuffer vs StringBuilder
	- StringBuffer 是线程安全的(synchronized), StringBuilder 不是，因此在非多线程情景中，使用StringBuilder性能会更好
    - StringBuilder类提供除了异步之外，完整兼容StringBuffer的API，这个类被设计用来在String缓存被单线程中时作为StringBuffer的替换。This class [StringBuilder] provides an API compatible with StringBuffer, but with no guarantee of synchronization. This class is designed for use as a drop-in replacement for StringBuffer in places where the string buffer was being used by a single thread (as is generally the case). Where possible, it is recommended that this class be used in preference to StringBuffer as it will be faster under most implementations. 

