# bento-kit [![Build Status][status-img]][status]

 By default, bento-kit is building a project that uses Gulp, Jade,
 Sass and CoffeScript to build sites. It also downloads jQuery and
 Bootstrap do build directory, for local usage. 

 You can change directory structure and used dependencies in 
 Rakefile under `# Configuration` comment.

 Note: bento-kit is using ES6 Promise.

## Instalation
 Before starting you need to have Ruby, Rake (ruby make), node.js 
 and npm installed. In order to start your project with bento-kit, 
 do the following:

 - Clone the repository using 
   ```
   git clone https://github.com/kh0p/bento-kit site-project
   ```
   where `site-project` is a name of your projects directory.
 - Run the `rake` command in your terminal. It will start default
   :install rake task that creates directory structure for your
   project, makes npm dependencies and saves newest versions of 
   used packages into package.json dependencies.
 - Edit `package.json` - change name, description, keywords, author,
   license and add link to repository if you would like to use one.
 - Start gulpfile using `gulp` command in your terminal. When you
   run it, all Jade, Sass and JS files are being built.

 If after running `gulp` command you get message similar to this:
 ```
 [13:37:09] Starting 'default'...
 [13:37:10] Finished 'default' after 128 ms
 [BS] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.0.104:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.0.104:3001
 --------------------------------------
 [BS] Serving files from: ./_site/
 ```
 You're ready to go!

## Workflow
 Running `gulp` creates local server that you can access on your
 browser under `localhost:3000` address. Gulp is watching for 
 changes that you made to Jade, Sass and JS and builds them. Then
 it refresh the site to show changes that you made using 
 Browser-Sync.

 You can check `localhost:3001` to access Browser-Sync UI and
 experiment with it.

## Package management
 After making changes you may like to change version in your 
 `package.json` file. To do this, simply run:
 ```
 rake package:version["1.1.4"]
 ```
 Where `1.1.4` is the version you would like to change to.
 
 If you would like to check for more tasks, that can help you with
 package management type:
 ```
 rake -T
 ```
 It will return list of task and their description.

## License
 This software is available under the MIT License.

[status]: https://travis-ci.org/kh0p/bento-kit
[status-img]: https://travis-ci.org/kh0p/bento-kit.svg?branch=master
