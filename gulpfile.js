'use strict';

require('es6-promise').polyfill();

var gulp = require('gulp');

var browserSync = require('browser-sync'),
    reload = browserSync.reload;

var data = require('gulp-data'),
    plumber = require('gulp-plumber');

var sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    prefixer = require('gulp-autoprefixer');

var jade = require('gulp-jade');

var sitemap = require('gulp-sitemap');

var del = require('del'),
    runSequence = require('run-sequence'),
    header  = require('gulp-header');

var coffee  = require('gulp-coffee'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
];
var pkg = require('./package.json');
var BANNER = [
  '@charset "utf-8";',
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @link <%= pkg.url %>',
  ' * @version v<%= pkg.version %>',
  ' * @Author <%= pkg.author %>',
  ' * @Author URI <%= pkg.author %>',
  ' */',
  ''
].join('\n');

gulp.task('default', function () {
  browserSync({
    notify: false,
    port: 3000,
    server: {
      baseDir: ['./_site/']
    }
  });
  gulp.watch(['./source/css/*.scss','./source/css/**/_*.scss'],['sass']);
  gulp.watch(['./source/css/*.sass','./source/css/**/_*.sass'],['sass']);
  gulp.watch(['./source/jade/*.jade', './source/jade/**/_*.jade'],['jade']);
  gulp.watch(['./source/js/*.js'],['compile-js']);
});

gulp.task('sass', function () {
  gulp.src(['./source/css/*.scss','./source/css/**/_*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefixer())
    .on('error', console.error.bind(console))
    .pipe(header('@charset "utf-8";\n'))
    .pipe(gulp.dest('./_site/assets/css'))
    .on('end', reload);
});

gulp.task('sass:deproy', function () {
  gulp.src(['./source/css/main.scss'])
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(header(BANNER, { pkg : pkg } ))
    .pipe(gulp.dest('./_site/assets/css'));
});

gulp.task('jade', function () {
  gulp.src(['./source/jade/*.jade'])
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./_site/'))
    .on('end', reload);

    //.pipe(data(function(file) {
    //  return require('./data.json');
    //}))
});


// Currently not using coffe
//gulp.task('coffee', function () {
//  gulp.src(['./src/coffee/*.coffee','./src/coffee/**/_*.coffee'])
//    .pipe(plumber())
//    .pipe(coffee({ bare: true }))
//    .on('error', console.error.bind(console))
//    .pipe(gulp.dest('./src/js/'))
//});


gulp.task('compile-js',function () {
  var compileFileName = 'application.js'
  gulp.src(['./source/js/*.js','!source/js/' + compileFileName])
    .pipe(uglify())
    .pipe(concat(compileFileName))
    .pipe(gulp.dest('./_site/assets/js'))
    .on('end', reload);
});

gulp.task('sitemap', function () {
  gulp.src('./_site/*.html')
    .pipe(sitemap({
      siteUrl: ''
    }))
    .pipe(gulp.dest('./_site/'));
});

gulp.task('clean', function(cb) {
  del(['./_site/**/*.html','./_site/**/*.css','./_site/**/*.xml'], cb);
});

// ['clean'] の後サイトマップはうまく出力されない。タイミングの問題だろうけど特に使うこと無かったからこのまま
gulp.task('deproy',['clean'],function(cb) {
  runSequence(
    ['sass:deproy','jade'],
    'sitemap',
    cb
  );
});
