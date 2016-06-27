require "rubygems"
require "json"

task :default => [:install]

# Configuration
dep = [
  "es6-promise",
  "browser-sync",
  "del",
  "gulp",
  "gulp-autoprefixer",
  "gulp-coffee",
  "gulp-concat",
  "gulp-cssmin",
  "gulp-data",
  "gulp-header",
  "gulp-jade",
  "gulp-plumber",
  "gulp-sass",
  "gulp-sitemap",
  "gulp-sitemap-files",
  "gulp-uglify",
  "run-sequence"]
dir_structure = [
  "_site",
    "_site/assets/js",
    "_site/assets/img",
    "_site/assets/css",
  "source",
    "source/css",
      "source/css/0-tools",
      "source/css/1-base",
      "source/css/2-modules",
      "source/css/3-sections",
      "source/css/4-layouts",
    "source/jade",
      "source/jade/_partial",
    "source/js"]

# Main install task
desc "Task that runs installation"
task :install do
  puts "Creating directory structure for project"
  dir_structure.each do |dir|
    system "mkdir " + dir
  end

  puts "Downloading files for local usage"
  Rake::Task[":devbuild"].invoke

  puts "Building dependencies"
  Rake::Task["package:builddep"].invoke
end

# Package control
namespace :package do
  desc "Update package.json version (arg: version)"
  task :version, [:number] do |t, args|
    package = File.read("package.json")
    content = JSON.parse(package)
    content["version"] = args[:number]
    
    # Exporting changes back to package.json
    open("package.json", "w+") do |f|
      f.puts JSON.pretty_generate content
    end
    
    puts "Version in package.json has been changed to " + content["version"]
  end


  desc "Build dependencies from ground-up"
  task :builddep do
    dep.each do |d|
      system "npm install --save-dev " + d
    end
  end

  desc "Full --save-dev update"
  task :update do
    dep.each do |d|
      system "npm uninstall --save-dev " + d
      system "npm install --save-dev " + d
    end
  end
end

desc "Build that helps to run developement environment"
task :devbuild do
  system "mkdir _site/assets/tmp"
  system "wget -O _site/assets/tmp/jquery.js \
          https://code.jquery.com/jquery-2.2.4.min.js"
  system "wget -O _site/assets/tmp/bootstrap.css \
          https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap.css"
  system "wget -O _site/assets/tmp/bootstrap.js \
          https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/js/bootstrap.js"
end
