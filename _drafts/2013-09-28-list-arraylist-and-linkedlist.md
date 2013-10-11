---
layout: post
title: "List, ArrayList and LinkedList"
categories:
- articles
tags:   ["java"]
comments: true
---

### List vs ArrayList

   * interface List extends Collection
   * ArrayList implements List
   * 同步list：Collections.synchronizedList(List)



### ArrayList vs LinkedList

##### 区别

  1. ArrayList是基于动态数组的数据结构，LinkedList是基于链表的数据结构
  2. get & set, ArrayList is better (LinkedList will move pointer)
  3. add & remove，LinkedList is better (ArrayList will move data)
  4. LinkedList 不支持随机访问

##### 如何选择

  1. 时间复杂度

      * 随机查找,二分查找：ArrayList > LinkedList

  2. 空间复杂度

      * LinkedList > ArrayList
