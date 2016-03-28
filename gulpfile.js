'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');

gulp.task('clean', function () {
  return del(['./build/**/*']);;
});

gulp.task('copy', ['clean'], function () {
  return gulp.src(['img/**/*', 'mock/**/*'], {base: '.'})
    .pipe(gulp.dest('build/'));
});

