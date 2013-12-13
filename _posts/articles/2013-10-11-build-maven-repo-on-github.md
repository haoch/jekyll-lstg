---
layout: post
title: "基于Github搭建Maven仓库"
categories:
- articles
comments: true
image:
    feature: "maven_log.gif"
tags: [maven,github]
---


  [__Maven__](http://maven.apache.org) 是一个项目管理和构建自动化工具， __Maven仓库__ 是用于存放不同编译的artifacts和dependencies（依赖）的模块集合。严格而言，主要有两类仓库： __local（本地）__ 和 __remote（远端）__ 。
  
  本地仓库存放本地安装的来自远端仓库的模块，可看作远端模块在本地的一份缓存，同时也包含本地编译尚未发布的模块。远端仓库指任何类型的仓库，能够通过许多不同的协议访问，如file://和http://，可以是“真正的”类似[repo.maven.org](http://repo.maven.org)由第三方提供的远程仓库用于提供公开模块下载，也可用于团队内部基于文件或者http服务器分享私有模块。
  
  不论本地还是远端仓库都是满足相同的结构规则，因此远端模块很容易共享到任何地方，也可以同步到本地以离线环境下使用。一般而言这些仓库的构造对于maven用户是完全透明的。
  
  一般而言，业界已经有许多成熟的maven仓库解决方案，如Nexus等，只需拥有一台服务器，并下载并安装maven仓库服务软件，然后启动即可。但对于个人开发者而言，若需要搭建用于分享和发布个人开发artifacts的公开maven仓库，选择之一自然是购买一台vps服务器，然后安装maven仓库服务软件，然而另外一种完全免费的选择则是完全基于github实现，本文将为您详细介绍后一种更为极客的实践方案。其原理是利用github的git push来发布artifects，利用github提供的公开raw服务提供对外下载服务。当向开源社区共享自己开发的artifects时，只需要提供模块pom信息和个人独一无二的仓库地址即可：

{% highlight bash %}
https://raw.github.com/${github_account}/maven/snapshot/
https://raw.github.com/${github_account}/maven/release/
{% endhighlight %}

----

## 准备

* 申请Github帐号并配置ssh public key: [http://github.com](http://github.com)
* 安装Git工具: [http://git-scm.com](http://git-scm.com)
* 安装Maven工具: [http://maven.apache.org](http://maven.apache.org)

----

## 搭建过程

__1.__ 利用[github](http://github.com)网站中创建一个新的仓库，记下仓库地址: 
{% highlight bash %}
git@github.com:${github_account}/maven.git
{% endhighlight %}

__2.__ 进入 ${HOME}/.m2/repository/,初始化git本地仓库，添加员段地址。

	{% highlight bash %}
$ cd ~/.m2/repository
$ git init
$ git add remote origin git@github.com:hchen9/maven.git
{% endhighlight %}

__3.__ 创建.gitignore 将文件匹配符`*`加入其中， 并将.gitignore提交git本地仓库master分支
	
{% highlight bash %}
$ echo "*" >> .gitignore
$ git add .gitgnore
$ git commit -m 'add .gitignore by ignoring all'
{% endhighlight %}

__4.__ 分别创建分支`snapshot`与`release`并push至远端仓库，用于发布不同状态的artifects，默认情况切换至`snapshot`
{% highlight bash %}
$ git branch snapshot
$ git branch release

$ git push origin snapshot
$ git push origin release

$ git checkout snapshot
{% endhighlight %}

__5.__ 当开发完成发布新的artifects（例如com.github.${github_account}:${artifactId}:${version}）时，首先利用`mvn install` 将artifects安装至本地maven仓库中 `~/.m2/repository/`
{% highlight bash %}
$ cd ${project_root}
$ mvn install
{% endhighlight %}

然后，将需要发布对应版本的artifects所闻提交至本地git仓库中，然后push至对应的分支snapshot 或 release.
{% highlight bash %}
$ cd ~/.m2/repository
$ git add -f com/github/${github_account}/${artifactId}/${version}
$ git commit -m 'snapshot of com.github.${github_account}:${artifactId}:${version}'
$ git push origin snapshot
{% endhighlight %}

__6.__ 在pom.xml中使用maven artifact添加以下配置：
{% highlight xml %}
<project>
<!--Add repositories-->
    <repositories>
        <repository>
            <id>haoch-maven-snapshot-repository</id>
            <name>haoch-maven-snapshot-repository</name>
            <url>https://raw.github.com/${github_account}/maven/snapshot/</url>
        </repository>
        <repository>
            <id>haoch-maven-release-repository</id>
            <name>haoch-maven-release-repository</name>
            <url>https://raw.github.com/${github_account}/maven/release/</url>
        </repository>
    </repositories>
<!-- Add dependencies -->
    <dependencies>
        <dependency>
            <artifactId>${artifactId}</artifactId>
            <groupId>com.github.${github_account}</groupId>
            <version>${version}</version>
        </dependency>
    </dependencies>
</project>
{% endhighlight %}

----
w
## 总结
Github 目前为止也许是最好的代码托管服务和社交编程平台，拥有非常好的开源分享文化，在这里分享可复用的maven artifact自然也是最佳选择，Git原生提供的强大版本控制能力，在日常开发中必不可少，加上Github免费的git repository的静态raw访问服务，Github作为maven remote repository可以和日常开发工作有效的融合。
