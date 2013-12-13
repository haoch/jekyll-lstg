---
layout: post
title: "Bash Options"
categories:
- articles
comments: true
tags: [linux,shell,bash,cn]
---


getopt与getopts提供均可基于相同的规则来重新组合参数，来方便的获取命令行选项以及其值。

__getopt与getopts区别在于__：

* `getopt`是个外部binary文件，作为外部命令调用，而`getopts`是built-in bash 内置命令，可直接调用。
* `getopts` 的 shell 提供内置 __OPTARG__ 这个变量，`getopts`会依次修改这个变量，可直接通过 __$OPTARG__ 读取参数值，但是`getopt`则需要通过`set`来重新定位参数 `$1`(参数名),`$2`（参数值，如存在），并使用`shift`的方式依次获取。
	
{% highlight bash %}
# getopts
set -- `getopt -o hi: -l "help;input:" -n "$0" -- "$@"`

while [ $# -gt 0 ]
do
	case $1 in:
		-h) shift;break;;
		--) break;;
	esac
	shift
done 

# getopts
while getopts "hi:" OPTION 
do
	case "$OPTION" in
		-h) "$OPTARG";;
		\?) exit 1;;
	esace
done
{% endhighlight %}
		

* 当参数值中包含空格时，对于`getopt`会识别为多个参数，因此，这种情况下只能用`getopts`.


一般情况而言，优先选择`getopts`，当需要定义更复杂的参数规则，如长短参数等时，需使用`getopt`


getopt
------

{% highlight bash %}
#!/bin/bash

# Execute getopt
ARGS=`getopt -o"123:"-l"one,two,three:-n $0"--"$@"`

#Bad arguments
if[ $? -ne0 ];
then
	exit1
fi

# A little magic
eval set -- "$ARGS"

# Now go through all the options
while true;
do
	case "$1" in
    -1|--one)
      	echo"Uno"
      	shift;;

    -2|--two)
      	echo"Dos"
      	shift;;
       
    -3|--three)
      	echo"Tres"

      	# We need to take the option argument
      	if[ -n"$2"];
      	then
		echo"Argument: $2"
      	fi
      	shift;;

    --) shift;break;;
    esac
done
{% endhighlight %}

getopts
-------

{% highlight bash %}
#!/bin/bash

while getopts "123:" OPTION
do
	case $OPTION in
    	1) echo"Uno";;
    	2) echo"Dos";;
    	3) echo"Tres: $OPTARG";;
 	
    	# Unknown option. No need for an error, getopts informs
    	# the user itself.
    	\?) exit 1;;
    	esac
    done
{% endhighlight %}


