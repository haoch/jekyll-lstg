# Usage: rake minify
desc "Minify files"
task :minify do
  system "java -jar _build/htmlcompressor.jar -r --type html --compress-js -o _site _site"
end # task :minify

# Usage: rake drafts
desc "Build Jekyll site with _drafts posts"
task :drafts do
  system "jekyll build --drafts --limit_posts 10"
end # task :draftsrequire "rubygems"

require 'rake'
require 'yaml'
require 'time'
require 'open-uri'
# require 'RMagick'
require "digest/md5"

SOURCE = "."
CONFIG = {
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts")
}

###
# Based on jekyll-bootstrap's Rakefile.
# Thanks, @plusjade
# https://github.com/plusjade/jekyll-bootstrap
###

task :default => [:tasks]

desc "Tasks"
task :tasks do
    puts "rake post [tile='YOUR TITLE']"
    puts "rake pull"
    puts "rake push"
    puts "rake icons"
end

# Usage: rake post title="A Title" [date="2012-02-09"]
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.
    directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  category = ENV['category'] || 'articles'
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue Exception => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'],"/#{category}/", "#{date}-#{slug}.md")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?",
      ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "categories:"
    post.puts "- articles"
    post.puts "comments: true"
    post.puts "tags: []"
    post.puts "---"
  end
end # task :post

desc "Launch preview environment"
task :preview do
  system "jekyll serve --watch --safe"
end # task :preview

desc "Pull from Github"
task :pull do
    system "git pull"
end

desc "Publish into Github"
task :push do
  comment = ENV["c"] || ENV["comment"]  || "push through rake automatically"
  puts "Git status:"
  puts "=============================================="
  system "git status"
  puts "Git commit and push"
  puts "=============================================="
  system "git commit -am'#{comment}';git push "
end # task :push

desc "Update icons based on your gravatar (define owner email in _config.yml)!"
task :icons do
  puts "Getting owner email from _config.yml..."
  config = YAML.load_file('_config.yml')
  owner_email = config['owner']['email']
  gravatar_id = Digest::MD5.hexdigest(owner_email)
  base_url = "http://www.gravatar.com/avatar/#{gravatar_id}?s=150"

  origin = "origin.png"
  File.delete origin if File.exist? origin

  puts "Downloading base image file from gravatar..."
  open(origin, 'wb') do |file|
    file << open(base_url).read
  end

  name_pre = "apple-touch-icon-%dx%d-precomposed.png"

  FileList["*apple-touch-ico*.png"].each do |img|
    File.delete img
  end

  FileList["*favicon.ico"].each do |img|
    File.delete img
  end

  puts "Creating favicon.ico..."
  Magick::Image::read(origin).first.resize(16, 16).write("favicon.ico")

  [230, 144, 114, 72, 57].each do |size|
    puts "Creating #{name_pre} icon..." % [size, size]
    Magick::Image::read(origin).first.resize(size, size).
      write(name_pre % [size, size])
  end
  puts "Cleaning up..."
  File.delete origin
end
