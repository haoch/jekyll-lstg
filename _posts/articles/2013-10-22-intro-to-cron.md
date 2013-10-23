---
layout: post
title: "Cron作业调度"
categories:
- articles
comments: true
tags: []
---


本文主要涵盖cron的基本特性以及如何使用的介绍。

什么是Cron？
-----------
Cron是指允许linux/unix用户自动（automatically）在特定时间或者日期执行命令或者脚本（即命令的组合）的一个程序。一般而言，被用作系统管理命令，比如makewhatis，为man -k命令创建搜索数据库， 或者运行备份脚本，当然并非仅限于此。如今还有一个很普遍的用途是自动连接网路并下载你email。本文以 Vixie Cron为例，这是Paul Vixie开发的一个版本。

如何启动Cron
-----------
Cron是一个守护进程(daemon)，只需要启动一次，然后一直保持休眠直到被调用。就像web服务器便是一个守护进程，启动后会一直休眠，当接收到页面请求时才会被唤醒。Con守护进程，即__crond__,会在某个文件配置的某个时刻被唤醒，这个配置文件称之谓 __crontabs__。

在大多数linux发行版本中crond是自动安装并添加到祁东脚本中。可通过以下命令查看，第一行显示crond正在运行：

{% highlight bash %}
$ ps aux | grep crond
root      4258  0.0  0.0 117204  1264 ?        Ss   Sep26   1:02 crond
hchen     8383  0.0  0.0 103244   876 pts/61   S+   21:58   0:00 grep crond
{% endhighlight %}


若cron被kill或者没有启动，可以将crond添加至启动脚本中，然后启动即可。若希望不重启，可以root帐户执行：

{% highlight bash%}
$ crond
{% endhighlight %}

进程将自动后台运行，不用强制添加&，此外许多守护程序，如httpd和syslogd，修改杯之后需要重启， 但Vixie Cron不需要，一旦文件被crontab命令修改后便会自动载入，其他版本的可能是每分钟一次或者重启的时候。


使用cron
--------
用许多种方式使用cron。

在/etc目录中，你也许会找到一些子目录叫'cron.hourly'，'cron.daily'，'cron.weekly' and 'cron.monthly',若将一个脚本，置于这些目录中，那么它将以每小时，每天，每周或者每个月的周期执行。

如果希望更灵活的，可以编辑一个crontab 文件（cron的配置文件）。主配置文件是/etc/crontab。在默认的RedHat安装中，crontab的内容如下：

{% highlight bash %}
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
HOME=/

# For details see man 4 crontabs

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
{% endhighlight %}

第一部分,显而易见,设置cron的环境变量

> _SHELL_ <p>....</p>
> 
> _PATH_ <p>....</p>
> 
> _MAILTO_ <p>....</p>
>
> _HOME_ <p>....</p>
> 

第二部分较为复杂，也是crontab主要定制的内容。
cron的条目是由一些列的字段组成，与/etc/passwd及其相似，只不过crontab是通过_空白_分隔。通常每个条目有七个字段：

<table>
<thead></thead>
<tbody>
<tr><td> minute </td><td></td></tr>
<tr><td> hour </td><td></td></tr>
<tr><td> dom </td><td></td></tr>
<tr><td> month </td><td></td></tr>
<tr><td> dow </td><td></td></tr>
<tr><td> user </td><td></td></tr>
<tr><td> cmd </td><td></td></tr>
</tbody>
</table>


对于不需要指定值的字段，只需填入*。

TODO >>>

参考
---
Book：__Running Linux__ (O'Reilly ISBN: 1-56592-469-X)
