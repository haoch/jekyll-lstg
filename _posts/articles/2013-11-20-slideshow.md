---
layout: post
title: "Slide Show (S9) - A Free Web Alternative to PowerPoint and Keynote in Ruby"
description: "利用纯文本(wiki-style markdown)创建幻灯片"
categories: 
- articles
image:
    url: "https://0.gravatar.com/avatar/3d0992109f4581ea0e898e37fb48af39?d=https%3A%2F%2Fidenticons.github.com%2F92a03b30888f1885fd275110ed3a6dda.png&r=x&s=150 "
tags: [app,ruby,gem]
comments: true
---

Slideshow(S9) 是一个ruby gem，允许你使用类wiki标记语言(markdown)创建和编辑幻灯片，修改和阅读都非常方便。这个项目内置支持非gem "out-of-gem" 的无损向量图主题扩展，并提供许多很漂亮的[主题库](http://slideshow-s9.github.io/gallery.html)，当然也可以自己定义自己的主题。

![Slideshow S9](https://0.gravatar.com/avatar/3d0992109f4581ea0e898e37fb48af39?d=https%3A%2F%2Fidenticons.github.com%2F92a03b30888f1885fd275110ed3a6dda.png&r=x&s=150)

开始使用
=======
- 第一步，安装 [`slideshow`](https://rubygems.org/gems/slideshow) gem,在终端作为命令中使用，为了更方便的管理ruby环境和gemsets，推荐使用[`rvm`](http://www.haoch.me/articles/ruby-with-rvm.html)
	
		$ gem install slideshow
		
		SYNOPSIS
	    slideshow [global options] command [command options] [arguments...]
		
		GLOBAL OPTIONS
		    -c, --config=PATH - Configuration Path (default: /home/hchen9/.slideshow)
		    --help            - Show this message
		    -q, --quiet       - Only show warnings, errors and fatal messages
		    --verbose         - (Debug) Show debug messages
		    --version         - Display the program version
		
		COMMANDS
		    about, a           - (Debug) Show more version info
		    build, b           - Build slideshow
		    help               - Shows a list of commands or help for one command
		    install, i         - Install template pack
		    list, ls, l        - List installed template packs
		    new, n             - Generate quick starter sample
		    plugins, plugin, p - (Debug) List plugin scripts in load path
		    test               - (Debug) Show global options, options, arguments for test command
		    update, u          - Update shortcut index for template packs 'n' plugins


- 第二步，创建初始slide，并使用类wiki标记语言（[Markdown](http://daringfireball.net/projects/markdown/) 或 [Textile](http://redcloth.org/textile)）编辑纯文本的slides,以 [pig.md](https://raw.github.com/haoch/haoch.github.io/master/talks/practical_pig/index.md) 为例
	
	可使用`slide`或者手动创建，文件类型可以是md,markdown,textile等
	
		slide new
	
	使用 `#` 或 `===`（markdown）, 或者 `h1`(textile)，即编译成HTML后对应 `h1` 的元素，作为新的slide的开始，其内容为Slide的标题，示例内容如下:
		
		Title: Practical Pig
		
		Practical Pig 
		=============
		Agenda
		
		* Why pig
		* Components
		* How it works with Map Reduce
		* Pig Latin
		* Advanced References and topics
		
		Why Pig
		=======
		* Map Reduce is very powerful, but:
		    - requires a Java programmer
		    - re-invent common functionality (join, filter,etc)
		* Pig provides a higher level language
			 
	或者

		Title: Practical Pig

		h1. Practical Pig 
		
		Agenda
		
		* Why pig
		* Components
		* How it works with Map Reduce
		* Pig Latin
		* Advanced References and topics
		
		h1. Why Pig

		* Map Reduce is very powerful, but:
		    - requires a Java programmer
		    - re-invent common functionality (join, filter,etc)
		* Pig provides a higher level language

- 第三步，使用`slideshow build`命令编译slides，`-t`后跟参数指定主题，默认主题为[S6](http://slideshow-s9.github.io/gallery.html)
 
		$ slideshow build index

		=> Preparing slideshow 'index.html'...
		=> Done.

- 第四步，浏览器中打开生成的html文件即可预览 (实例：[Pratical Pig](http://www.haoch.me/talks/practical_pig/#slide2)，基于[google-html5](https://github.com/slideshow-s9/slideshow-google-html5-slides)主题: `slideshow build index -t g5`);


使用主题模板
===========

* 选择:[Slideshow (S9) Template Gallery](http://slideshow-s9.github.io/gallery.html)
* 安装
		
		slideshow install g5

	或

		$ cd ~/.slideshow/templates
		$ git clone git://github.com/slideshow-s9/slideshow-google-html5-slides.git
	
	查看已安装模板

		$ slideshow list
		
* 使用

		$ slideshow build tutorial -t g5

相关资料
=======
* Slideshow (S9): <http://slideshow-s9.github.io>
* Template Gallery:<http://slideshow-s9.github.io/gallery.html>
* Github Repository : <https://github.com/slideshow-s9>
* Markdown: <http://daringfireball.net/projects/markdown/syntax>
* Textile: <http://redcloth.org/textile/>
* reStructuredText:　<http://docutils.sourceforge.net/rst.html>

Q & A
======
* Group & Maillist: <https://groups.google.com/forum/#!forum/webslideshow>

