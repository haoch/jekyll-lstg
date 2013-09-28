---
layout: post
title: "Java String"
categories:
- articles
tags: ["java","String"]
comments: true
---

## 如何正确使用String?

   - 不要使用new （new 每次都会创建一个新的对象）
   - 使用StringBuffer来做连接操作
      - String 是immutable类，做连接操作时，都会创建临时的对象来保存中间结果，而StringBuffer 是mutable class, 不需要临时创建对象来保存结果，从而提高性能
      - StringBuffer vs StringBuilder
         >- StringBuffer synchronized
         >- StringBuilder is not
         >- This class [StringBuilder] provides an API compatible with StringBuffer, but with no guarantee of synchronization. This class is designed for use as a drop-in replacement for StringBuffer in places where the string buffer was being used by a single thread (as is generally the case). Where possible, it is recommended that this class be used in preference to StringBuffer as it will be faster under most implementations. 


## String 对象与引用

   - new： 先创建创建对象，然后在string pool中查找是否值相同的对象，否则创建对应的string对象
   - ""：直接查找，若有直接返回引用，否则创建并返回引用
   - intern()：始终返回string object本身的引用

## String 连接

   - 常量＋常量，内存中查找是否存在值相等的对象，存在则直接返回引用，否则创建新的对象
   - 常量＋变量，创建新的字符对象存储结果，并返回引用
