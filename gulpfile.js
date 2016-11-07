'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var strip = require('gulp-strip-comments');
var copy = require('gulp-contrib-copy');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

gulp.task('watch', ['all'], function () {
    gulp.watch(['./src/sass/**/*'], ['sass']);
    gulp.watch(['./src/img/**/*'], ['copy:img']);
    gulp.watch(['./src/**/*.html'], ['copy:html']);
    gulp.watch(['./src/**/*.js'], ['js']);
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/app.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(strip.text())
        .pipe(gulp.dest('./public/arqcomp_2016'))
        .pipe(connect.reload());
});

gulp.task('copy:img', function() {
    return gulp.src('./src/img/**/*', {base: "./src/img/"})
        .pipe(copy())
        .pipe(gulp.dest('./public/arqcomp_2016/img/'))
        .pipe(connect.reload());
});

gulp.task('copy:fonts', function() {
    return gulp.src('bower_components/materialize/fonts/**/*')
        .pipe(copy())
        .pipe(gulp.dest('./public/arqcomp_2016/fonts'));
});

gulp.task('copy:html', function() {
    return gulp.src('./src/**/*.html', {base: "./src/"})
        .pipe(strip())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            sortAttributes: true,
            sortClassName: true
        }))
        .pipe(copy())
        .pipe(gulp.dest('./public/arqcomp_2016'))
        .pipe(connect.reload());
});

gulp.task('copy', ['copy:img', 'copy:fonts', 'copy:html'], function() {});

gulp.task('js', function() {
    return gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/materialize/dist/js/materialize.js',
        './src/**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/arqcomp_2016/'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        port: 3000,
        host: '0.0.0.0',
        livereload: true,
        fallback: 'public/arqcomp_2016/index.html'
    });
});

gulp.task('all', ['sass', 'js', 'copy'], function() {
});

gulp.task('default', ['connect', 'watch'], function() {
});