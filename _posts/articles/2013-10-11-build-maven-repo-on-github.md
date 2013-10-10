---
layout: post
title: "Github搭建个人Maven仓库最佳实践"
categories:
- articles
comments: true
tags: [maven,github]
---


## 背景

__Maven Repository__ 

__Github__ RAW服务

## 准备

* github帐号:[http://github.com](http://github.com)
* git:[http://git-scm.com](http://git-scm.com)
* mvn:[http://maven.apache.org](http://maven.apache.org)

## 构建过程

1.利用[github](http://github.com)网站中创建一个新的仓库，记下仓库地址，如`git@github.com:hchen9/maven.git`

![github-create-new-repo.png](/images/github-create-new-repo.png)

2.进入`${HOME}/.m2/repository/`,初始化git本地仓库，添加员段地址。

	{% highlight bash %}git init
git add remote origin git@github.com:hchen9/maven.git
{% endhighlight %}

3.创建`.gitignore`将文件匹配规则`*`加入其中，

	{% highlight bash %}*{% endhighlight %}
  
  并将本文家加入git本地仓库中
	
	{% highlight bash %}git add .gitgnore{% endhighlight %}

4.创建两个分支`snapshot`与`release`，分别用于区分snapshot和release两个不同的分支。
{% highlight bash %}git branch snapshot
git branch release
{% endhighlight %}

5.创建新的maven项目如"com.github.haoch:TestModule:version"时，利用`mvn install`，即会将变异后的jar程序拷贝纸｀~/.m2/repository｀中



----
［未完待续］
