var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');

gulp.task('default', ['build'], function () {
});

gulp.task('build', function () {
  return gulp.src('static/javascripts/**/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/static/javascripts/'));
});
