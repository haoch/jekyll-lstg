---
layout: post
title: "JAVA 不可更改类 Immutable class"
categories:
- articles
tags:   ["java","immutable class"]
comments: true
---

# Java 不可更改类 Immutable class

## 特性：

   * 实例创建后状态不会再发生变化的类

   * 可能也有改变状态的方法

      * 并非修改现有实例的状态，而是每次都是新建一个immutable 对象
	

## 好处：
- 线程安全（状态不变，线程共享无需同步）
- 不变类的instance可以被reuse
   	- 将常用实例缓存，减少对象创建，节省cpu
    - public final class Boolean implements java.io.Serializable 
    - String, the primitive wrapper classes, and BigInteger, BigDecimal

- 不变类的某些方法（比如返回hashCode）可以缓存计算的结果，提高性能，避免不必要的运算
