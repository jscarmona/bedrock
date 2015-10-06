/* jshint node:true */
/* globals require */
'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var del = require('del');

var env = 'dev';

gulp.task('clean:dist', function(cb) {
  return del('dist', cb);
});

gulp.task('clean:vendor', function(cb) {
  return del('src/vendor', cb);
});

gulp.task('css', function() {
  var isProd = (env === 'prod');
  var destinationPath = isProd ? 'dist/css' : 'src/css';

  return sass('src/scss/bedrock.scss', {
        style: isProd ? 'compressed' : 'expanded',
        loadPath: 'src/vendor',
      })
      .on('error', notify.onError(function(err) {
        return 'CSS Error:' + err.message;
      }))
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false,
        remove: true,
      }))
    .pipe(gulpif(isProd, rename({ suffix: '.min' })))
    .pipe(gulp.dest(destinationPath))
    .pipe(notify('CSS Success: <%= file.relative %>'));
});

gulp.task('build', ['clean:dist'], function() {
  env = 'prod';
  return gulp.start(['css']);
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['css']);
});

gulp.task('default', ['css', 'watch']);
