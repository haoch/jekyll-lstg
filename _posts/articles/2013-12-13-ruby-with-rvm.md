---
layout: post
title: "Ruby With RVM"
categories: 
- articles
tags: [ruby, rvm]
image:
    url: "https://rvm.io/images/logo.png"
comments: true
---

__RVM__ is Ruby Version Manager allowing you to easily manage ruby environment of different versions and gemsets. It encourages to install ruby environments into user home directory `~/.rvm` instead of global system accroding to specified requirements and provides convenient methods for switching and management.

![https://rvm.io/images/logo.png](https://rvm.io/images/logo.png)

Install RVM
============

__dev__: 
    
    $ curl -sSL https://get.rvm.io | bash

__withour autolibs__: 
    
    $ curl -sSL https://get.rvm.io | bash -s -- --autolibs=read-fail

__stable__: 
  
    $ curl -sSL https://get.rvm.io | bash -s stable --ruby

More detail, please refer to [https://rvm.io/rvm/install](https://rvm.io/rvm/install)


Update RVM
==========

    rvm get stable

In case of problems try first with development version
(maybe it's already fixed):

    rvm get head

Very old installations might not support those update methods, just run the installer and reopen your terminal.


Installing Ruby
===============

Follow instructions from:

    rvm requirements

List known rubies:

    rvm list known

Install Ruby:

    rvm install 1.9.3                # Latest known patch level
    rvm install 1.9.3 -j 3           # Parallel compile, set to # of CPU cores
    rvm install 1.9.3 --patch falcon # Use a patch (falcon for performance)
    rvm install 1.9.2-p318           # Patchlevel 318
    rvm install rbx --1.9            # Rubinius with 1.9 mode set as default

List all rubies and gemsets:

    rvm list         # List rubies only
    rvm list gemsets # List rubies and gemsets
    rvm gemset list  # List gemsets for current ruby

Selecting Ruby for work:

    rvm system                 # For system ruby, with fallback to default 
    rvm use jruby              # For current session only
    rvm use --default 1.9.3    # For current and new sessions
    rvm use --ruby-version rbx # For current session and this project

RVM will automatically use a ruby and gemset when you `cd` to a project directory.

Read more on project files:

- [https://rvm.io/workflow/projects/#ruby-versions](https://rvm.io/workflow/projects/#ruby-versions)

Using ruby and gems
====================

After selecting Ruby work as usual

    ruby -v
    gem install haml
    haml

Temporarily selecting another Ruby or gemset

    rvm 1.8.7 do gem install rspec      # in the given ruby
    rvm 1.8.7,1.9.2 do gem install haml # in this two rubies
    rvm @global do gem install gist     # in @global gemset of current ruby

Gemsets
-------

RVM by default allows creating multiple environments for one ruby - called *gemsets*.

Gemsets can be specified together with ruby name using gemsets separator(@):

- ruby-1.9.3-p125@my-project

During installation of Ruby, RVM creates two gemsets:

- default - automatically selected when no @gemset specified: rvm use 1.9.3
- global  - super gemset, inherited by all other gemsets for the given ruby

Working with gemsets:

    rvm use 1.8.7                          # use the ruby to manage gemsets for
    rvm gemset create project_name         # create a gemset
    rvm gemset use project_name            # use a gemset in this ruby
    rvm gemset list                        # list gemsets in this ruby
    rvm gemset delete project_name         # delete a gemset
    rvm 1.9.1@other_project_name           # use another ruby and gemset
    rvm 1.9.3@_project --create --rvmrc    # use and create gemset & .rvmrc

Install RVM for all users
--------------------------
Discouraged; make sure to read [http://rvm.io/rvm/installation/](http://rvm.io/rvm/installation/)

Trouble shooting
================
A lot of resources is available:

- in your terminal: `rvm help`
- [https://rvm.io/](https://rvm.io/)

__Q1. getcwd: cannot access parent directories: No such file or directory__
 
     $sudo brew doctor
     sudo: cannot get working directory
     shell-init: error retrieving current directory: getcwd: cannot access parent directories: No such file or directory 

  __Reason__: The working directory you are currently in is deleted.

__Q2. rvm reinstall 1.9.3 need sudo__

      Checking requirements for osx.
      Certificates in '/usr/local/etc/openssl/cert.pem' already are up to date.

  __Reason__: Need root permission to update '/usr/local/etc/openssl/cert.pem’ 

__Q3. ruby extconf.rb error on mac osx__

  __Solution__: reinstall corresponding OSX Command Line Tools for Xcode [https://developer.apple.com/downloads/index.action](https://developer.apple.com/downloads/index.action) and reinstall your package again, if not work, reinstall rvm and ruby then retry
