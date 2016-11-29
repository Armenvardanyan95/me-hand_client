#!/bin/bash
# Use this script to install c2s client app development environment 

# sudo apt-get install nodejs-legacy
# sudo apt-get install npm
# npm install gulp -g
npm install gulp-clean
npm install wiredep
npm install gulp-useref
npm install gulp-if
npm install gulp-uglify
npm install gulp-minify-css
npm install gulp-notify
npm install gulp-newer
npm install gulp-ng-annotate
npm install del
npm install gulp-sftp
npm install run-sequence
npm install gulp-htmlmin
npm install gulp-sass
npm install gulp-jscs
npm install bower -g

bower update --allow-root

gulp
