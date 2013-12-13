---
layout: post
title: "Practical Pig Tutorial"
categories:
- articles
comments: true
image:
    feature: "pig.gif"
tags: [hadoop,pig]
---

__TALK__: [http://haoch.me/talks/practical_pig](http://haoch.me/talks/practical_pig)

![Hadoop](http://hadoop.apache.org/images/hadoop-logo.jpg)
<img width="60" height="90" alt="Pig" src="http://hortonworks.com/wp-content/uploads/2013/10/pig.gif"/> 

Practical Pig 
=============
__Agenda__

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
* Increases productivity
    - 10 lines of Pig Latin = 200 lines of Java
    - 4 hours of writing in java took 15 mins in Pig Latin
* Face to no only java programmers
* Provides common operations like join, group,filter,sort

Why new languages
=================
* Pig Latin is procedural, where SQL is declarative
* Pig Latin allows pipeline developers to decide where to checkpoint data in the pipeline
* Pig Latin allows the developer to select specific operator implementations directly rather than relying on the optimizer
* Pig Latin supports splits in the pipeline
* Pig Latin allows developers to insert their own code and existing binaries almost anywhere in the data pipeline
* Metadata not requireds, but used when available

How Pig Work
============
* __Pig Engine__: provides an execution engine atop Hadoop
    - Removes need for users to tune Hadoop for their needs
    - Insulates users from changes in Hadoop interfaces
* __$PIG_HOME/lib/pig.jar__
    - parses
    - checks
    - optimizes
    - plans execution
    - submits jar to Hadoop
    - monitors job progress 

How Pig is being Used
=====================
* Web log processing
* Data processing for web search platforms
* Ad hoc queries across large data sets
* Rapid prototyping of algorithms for processing large data sets

Performance
========
__Pig Mix__

PigMix is a set of queries used test pig performance from release to release: [https://cwiki.apache.org/confluence/display/PIG/PigMix
](https://cwiki.apache.org/confluence/display/PIG/PigMix)

Data Types
=======
* Scalar types:
     - __int__
     - __long__
     - __double__
     - __chararray__
     - __bytearray__
* Complex types:
     - __map__: associative array
     - __tuple__: ordered list of data, elements may be of any scalar or complex type
     - __bag__: unordered collection of tuples

Example
=======
* __Pig__: `$pig` / `$pig -x local`
* __Grunt__: gun readline interactive tool
* Data
     - [https://svn.apache.org/repos/asf/pig/trunk/tutorial/data/](https://svn.apache.org/repos/asf/pig/trunk/tutorial/data/)
     - [https://raw.github.com/somoso/basedbible/master/bible.txt](https://raw.github.com/somoso/basedbible/master/bible.txt)
     - [http://SHAKESPEARElib.ru/SHAKESPEARE/sonnets.txt_Contents](https://raw.github.com/somoso/basedbible/master/bible.txt)
     - [http://www.ccel.org/ccel/bible/kjv.txt](https://raw.github.com/somoso/basedbible/master/bible.txt)

Operation
======
* __Illustrate Operation__
	- DESCRIBE
	- EXPLAIN
	- ILLUSTRATE
* __Relation Operation__
	- LOAD
	- STORE
	- FOREACH
	- FILTER
	- GROUP / COGROUP
	- JOIN
	- ORDER
	- DISTINCT
	- UNION
	- SPLIT
	- STREAM
	- DUMP
	- LIMIT

Aggregation
========
__GROUP ... BY ...__

Count number of times each user appears in the excite data set;

{% highlight python %}

log = LOAD '/test/pig/tutorial/data/excite-small.log' AS (user, timestamp, query);
grpd = GROUP log BY user;
cntd = FOREACH grpd GENERATE group, COUNT(log);
STORE cntd INTO 'group_output';

{% endhighlight %}

Grouping
======
* Separate operation from applying aggregate functions
* Output : (key,bag), bag contains a tuple of every records with the key

		alan     1
		bob      9     => alan, {(alan,1),(alan,3)}
		alan     3        bob,{(bob,9)}

Filtering
=====
__FILTER ... BY ...__

Get high frequency users whose count is great than 50

{% highlight python %}

log = LOAD '/test/pig/tutorial/data/excite-small.log' AS (user, time, query);
grpd = GROUP log BY user;
cntd = FOREACH grpd GENERATE group, COUNT(log) AS cnt;
fltrd = FILTER cntd BY cnt > 50;
STORE fltrd INTO 'filter_output'; 

{% endhighlight %}

Sorting
=======
__ORDER ... BY ...__

Sort high frequency users by frequency

{% highlight python %}
log = LOAD '/test/pig/tutorial/data/excite-small.log' AS (user, time, query);
grpd = GROUP log BY user;
cntd = FOREACH grpd GENERATE
group, COUNT(log) AS cnt;
fltrd = FILTER cntd BY cnt > 50;
srtd = ORDER fltrd BY cnt;
STORE srtd INTO 'sort_output';
{% endhighlight %}

Word Count
========
Word count on King James Bible data and Shakespeare's works

* King James Bible
    - INPUT:'/test/bible-kjv.txt'
    - OUTPUT: 'bible_freq'
* Shakespeare's works
    - INPUT:'/test/shakespeare_sonnets.txt'
    - OUTPUT:'shake_freq'

Word Count - Continue
===============

{% highlight python %}

A = load '/test/bible-kjv.txt' ;
B = foreach A generate flatten(TOKENIZE((chararray)$0)) as word;
C = filter B by word matches '\\w+';
D = group C by word;
E = foreach D generate COUNT(C), group;
store E into 'bible_freq';

A = load '/test/shakespeare_sonnets.txt';
B = foreach A generate flatten(TOKENIZE((chararray)$0)) as word;
C = filter B by word matches '\\w+';
D = group C by word;
E = foreach D generate COUNT(C), group;
store E into 'shake_freq';

{% endhighlight %}

Join
===
Find words that are in both the King James Version of Bible and Shakespeare's sonnets

{% highlight python %}

bible = LOAD 'bible_freq' AS (cnt,word);
shake = LOAD 'shake_freq' AS (cnt,word);
both = JOIN bible BY word, shake BY word;
STORE both INTO 'both_words'

{% endhighlight %}

Anti-Join
======
Find words that are in the Bible that are not in Shakespeare.

{% highlight python %}

cogrp = COGROUP  bible BY word, shake BY word;
noshake_grp = FILTER cogrp BY count(shake) == 0;
noshake = FOREACH noshake_grp GENERATE FLATTEN(bible);
STORE  noshake INTO 'noshake'

{% endhighlight %}

Cogrouping
========
* A generalization of grouping
* Keys of two (or more ) inputs are collected
* OUTPUT: (key,bag1,bag2,...), contains multi bags with records in the key

		alan     1    alan     5 
		bob      9    bob      9  =>  {alan, {(alan,1),(alan,3)},{alan,5}}
		alan     3                    bob,{(bob,9),},{}

Nested Operations
============
__FOREACH .. { ... }__

{% highlight python %}
FOREACH pipe {
    operation 1;
     operation 2;
     -- more;
};
{% endhighlight %}

Splitting
=========
Data flow need not be linear, can be split explicitly:

{% highlight python %}
A = LOAD 'data';
B = FILTER A BY $0 > 0;
C = FILTER A BY $0 > 0;

A = LOAD 'data';
SPLIT A INTO B IF $0 <0, C IF $0 > 0;
{% endhighlight %}

Function
======
__Piggy Bank__: [https://cwiki.apache.org/confluence/display/PIG/PiggyBank](https://cwiki.apache.org/confluence/display/PIG/PiggyBank)

* __Eval function__: MAX, AVG, TKENIZE, etc.
* __Filter function__: IsEmpty, etc.
* __Load function__: TextLoader, etc.
* __Store function__: PigStorage, etc.


User Defined Functions
===============
* __Definition__:
	- org.apache.pig.EvalFunc
	- org.apache.pig.FilterFunc
	- org.apache.pig.LoadFunc
	- org.apache.pig. StoreFunc  
* __Usage__:

{% highlight python %} 
REGISTER 'pig-udf.jar';
FILTER A BY  com.ebay.hchen9.pig.MyUDF($0);

DEFINE myUDF com.ebay.hchen9.pig.MyUDF();
FILTER A BY  myUDF($0);
{% endhighlight %}

Stream          
=====
__STREAM ... THROUGH script AS schema__

{% highlight python %} 
STREAM A THROUGH `cut -f 2` AS (schema)
     
DEFINE script `script_file_name` SHIP ('script_file_path');
STREAM A THROUGH script AS (schema)
{% endhighlight %}
          
Custom Load & Store
==============
* Default: data is tab separated UTF-8
* User can set delimiter
* Customize load/store function to handle de/serialization of the data

Parameter
=======
* Parameters:
     - Command arguments: pig -param input=&lt;INPUT&gt;
     - Parameters file : pig -param_file &lt;PARAM_FILE&gt;
* Usage: $input
* Example: [capman-data/hql/capman/hadoop_cpmn_env.param](https://github.scm.corp.ebay.com/hchen9/capman-data/blob/master/hql/capman/hadoop_cpmn_env.param)

Macro
====
* __Definition__: 

{% highlight python %} 
DEFINE macro(param) RETURNS ret_val{
    $ret_val=...;
}
{% endhighlight %}

* __Import__:

{% highlight python %} 
IMPORT 'pig.macro';
A = macr(param);
{% endhighlight %}

* Example: [capman-data/hql/capman/hadoop_cpmn_macro.pig](https://github.scm.corp.ebay.com/hchen9/capman-data/blob/master/hql/capman/hadoop_cpmn_macro.pig)

Case Study
=======
* Hadoop mapreduce job summary log : /logs/hadoop-mapreduce.jobsummary.log.2013-10-02
     - [log_spliter.py](https://github.scm.corp.ebay.com/hchen9/hadoop-learning/blob/master/pig/src/main/pig/log_spliter.py)
     - [job_summary_log.pig](https://github.scm.corp.ebay.com/hchen9/hadoop-learning/blob/master/pig/src/main/pig/jobsummary_log.pig)
* Capman data process: [capman-data](https://github.scm.corp.ebay.com/hchen9/capman-data)

Advanced References & Topics
====================
* Why Pig Latin instead of SQL<br /> [http://infolab.stanford.edu/~olston/publications/sigmod08.pdf](http://infolab.stanford.edu/~olston/publications/sigmod08.pdf)
* Pig performance<br />[https://cwiki.apache.org/confluence/display/PIG/PigMix](https://cwiki.apache.org/confluence/display/PIG/PigMix)
* Pig UDF Manual <br />[http://wiki.apache.org/pig/UDFManual](http://wiki.apache.org/pig/UDFManual)
* Programming Pig <br />[http://www.amazon.com/Programming-Pig-Otx-Alan-Gates/dp/1449302645](http://www.amazon.com/Programming-Pig-Otx-Alan-Gates/dp/1449302645)
* Apache Pig Document <br />[https://cwiki.apache.org/confluence/display/PIG/Index](https://cwiki.apache.org/confluence/display/PIG/Index)

Thanks you
==========
Hao Chen

eBay Inc.<br />
[haoch.me](http://haoch.me)
