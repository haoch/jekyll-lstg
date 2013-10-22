---
layout: post
title: "关于本站"
categories: 
- articles
tags: [jekyll,github]
comments: true
feature:
    image: so-simple-sample-image-4.jpg
---


本站的建立得益于多种开源免费的软件或服务，正因为如此强大的开源社区文化，如此多拥有开源共享精神的天才工程师们，才能创建如此多优秀的开源软件服务大众。

页面生成器 - Jekyll
-------------------
**[Jekyll](http://jekyllrb.com/)**,这是一个精简的可适用于博客的静态站点生成器，由Github 联合创始人之一 [Tom Preston-Werner](https://github.com/mojombo/) 利用ruby开发，提供功能完善的静态页面模版和编程框架，目前社区较为活跃，许多非常不错的扩展或分支不断发展中，如[Jekyll-Bootstrap](jekyllbootstrap.com/)等，Gsithub page同样基于Jekyll。

![Jekyll](http://jekyllrb.com/img/logo-2x.png)

Jekyll主题 - So simple jekyll theme
-----------------------------------
本站主题基于**[So simple Jekyll](http://mademistakes.com/articles/so-simple-jekyll-theme.html)**修改，感谢 [Michael Rose](https://github.com/mmistakes)独特而具有品位的设计 ，该主题以黑白为基调，幽雅纯粹，纯文本为内容，页面元素朴质，非常符合个人的审美和分享真实有价值内容的初衷。
![so-simple-theme-preview](/images/so-simple-theme-preview.jpg)

部署 - Github Page
------------------
本站部署基于[Github Page](https://help.github.com/articles/using-jekyll-with-pages) 服务原生运行于Jekyll 之上，Repository中的内容通过Jekyll解析后生成HTML页面然后展示出来，当只有静态页面或者文件时，可作为静态服务器使用，但同时因为可以利用Ruby结合Jekyll编程，所以也可以根据需求去自定义定制和扩展网站的功能，同时Github的核心git repository可以提供非常强劲的版本控制功能。

DNS域名  - Github DNS
---------------------
Github Page 免费提供以`{USERNAME}.github.com`(或`{USERNAME}.github.io`)的二级域名映射至用户特定Repository的服务，只需要创建一个名为`{USERNAME}.github.com`(或`{USERNAME}.github.io`)的Repository即可，对应的二级域名即会以该Repository作为其根目录。此外Github 还提供**DNS**映射服务，可以自己拥有的自定义域名指向Github page站点 [＃](https://help.github.com/articles/setting-up-a-custom-domain-with-pages)：

* 首先设置Gihub Repo：在Github repository的根目录添加文件`CNAME`,并输入自定义的域名

		example.com
* 然后设置域名DNS：具体设置在于使用`顶级域名`还是`子域名`。
	* 若是**顶级域名(domain)**时，应该使用**A记录**指向**`204.232.175.78`**
	* 若时**子域名(subdomain)**，最好使用**CNAME**记录，可以在Github服务器IP改变时，自动适应，而A记录无法自动更新。
	* 当使用自定义域名时,服务器会添加以下**自动跳转**
		- `username.github.io` ⇒ `example.com` for user pages
		- `www.example.com` ⇒ `example.com` for top-level domains
		- `example.com` ⇒ `www.example.com` if the www subdomain is used

* 查看当前DNS状态(DNS更改到最终更新可能需要一天时间，需耐心等待)：
	
	`$ dig example.com +nostats +nocomments +nocmd`
